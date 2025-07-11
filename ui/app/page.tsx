"use client";

import { useEffect, useState, useRef } from "react";
import { AgentPanel } from "@/components/agent-panel";
import { Chat } from "@/components/Chat";
import { ThemeToggle } from "@/components/theme-toggle";
import { Activity, Sparkles } from "lucide-react";
import type { Agent, AgentEvent, GuardrailCheck, Message } from "@/lib/types";
import { callChatAPI } from "@/lib/api";

export default function Home() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [events, setEvents] = useState<AgentEvent[]>([]);
  const [agents, setAgents] = useState<Agent[]>([]);
  const [currentAgent, setCurrentAgent] = useState<string>("");
  const [guardrails, setGuardrails] = useState<GuardrailCheck[]>([]);
  const [context, setContext] = useState<Record<string, any>>({});
  const [conversationId, setConversationId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [mounted, setMounted] = useState(false);
  const msgCounter = useRef(0);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Boot the conversation
  useEffect(() => {
    if (!mounted) return;
    
    (async () => {
      const data = await callChatAPI("", conversationId ?? "");
      if (!data) {
        console.error("No data returned from chat API");
        return;
      }

      if (!conversationId) setConversationId(data.conversation_id);
      setCurrentAgent(data.current_agent);
      setContext(data.context);
      const initialEvents = (data.events || []).map((e: any, idx: number) => ({
        ...e,
        id: e.id || idx.toString(),
        timestamp: e.timestamp ? new Date(e.timestamp) : new Date(),
      }));
      setEvents(initialEvents);
      setAgents(data.agents || []);
      setGuardrails(data.guardrails || []);
      if (Array.isArray(data.messages)) {
        setMessages(
          data.messages.map((m: any, idx: number) => ({
            id: m.id || idx.toString(),
            content: m.content,
            role: "assistant",
            agent: m.agent,
            timestamp: m.timestamp ? new Date(m.timestamp) : new Date(0),
          }))
        );
      }
    })();
  }, [mounted]);

  // Send a user message
  const handleSendMessage = async (content: string) => {
    const userMsg: Message = {
      id: `user-${msgCounter.current++}`,
      content,
      role: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMsg]);
    setIsLoading(true);

    const data = await callChatAPI(content, conversationId ?? "");
    if (!data) {
      console.error("No data returned from chat API");
      setIsLoading(false);
      return;
    }

    if (!conversationId) setConversationId(data.conversation_id);
    setCurrentAgent(data.current_agent);
    setContext(data.context);

    if (data.events) {
      const stamped = data.events.map((e: any, idx: number) => ({
        ...e,
        id: e.id || idx.toString(),
        timestamp: e.timestamp ? new Date(e.timestamp) : new Date(),
      }));
      setEvents((prev) => [...prev, ...stamped]);
    }

    if (data.agents) setAgents(data.agents);
    if (data.guardrails) setGuardrails(data.guardrails);

    if (data.messages) {
      const responses: Message[] = data.messages.map((m: any, idx: number) => ({
        id: m.id || `assistant-${msgCounter.current++}`,
        content: m.content,
        role: "assistant",
        agent: m.agent,
        timestamp: m.timestamp ? new Date(m.timestamp) : new Date(0),
      }));
      setMessages((prev) => [...prev, ...responses]);
    }

    setIsLoading(false);
  };

  if (!mounted) {
    return (
      <div className="flex h-screen items-center justify-center bg-gradient-to-br from-primary/5 to-primary/10">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <main className="flex h-screen bg-gradient-to-br from-primary/5 via-background to-primary/10 dark:from-primary/10 dark:via-background dark:to-primary/5 transition-all duration-500">
      {/* Header */}
      <div className="absolute top-0 left-0 right-0 z-50 glass-effect border-b">
        <div className="flex items-center justify-between px-6 py-4">
          <div className="flex items-center gap-3 animate-slide-in-left">
            <div className="relative">
              <Activity className="h-8 w-8 text-primary animate-pulse" />
              <Sparkles className="h-4 w-4 text-primary/60 absolute -top-1 -right-1 animate-bounce" />
            </div>
            <div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
                Health & Wellness AI
              </h1>
              <p className="text-xs text-muted-foreground">Your Personal Wellness Assistant</p>
            </div>
          </div>
          <div className="animate-slide-in-right">
            <ThemeToggle />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex w-full pt-20 p-4 gap-4 animate-fade-in">
        <div className="w-2/5 animate-slide-in-left">
          <AgentPanel
            agents={agents}
            currentAgent={currentAgent}
            events={events}
            guardrails={guardrails}
            context={context}
          />
        </div>
        <div className="flex-1 animate-slide-in-right">
          <Chat
            messages={messages}
            onSendMessage={handleSendMessage}
            isLoading={isLoading}
          />
        </div>
      </div>
    </main>
  );
}