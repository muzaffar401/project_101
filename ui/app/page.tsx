"use client";

import { useEffect, useState, useRef } from "react";
import { AgentPanel } from "@/components/agent-panel";
import { Chat } from "@/components/Chat";
import { LandingPage } from "@/components/landing-page";
import { ThemeToggle } from "@/components/theme-toggle";
import { Activity, Sparkles, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
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
  const [showLanding, setShowLanding] = useState(true);
  const msgCounter = useRef(0);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Boot the conversation when entering chat
  const initializeChat = async () => {
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
  };

  const handleGetStarted = () => {
    setShowLanding(false);
    // Initialize chat after showing the main app
    setTimeout(() => {
      initializeChat();
    }, 500);
  };

  const handleBackToLanding = () => {
    setShowLanding(true);
    // Reset chat state
    setMessages([]);
    setEvents([]);
    setContext({});
    setConversationId(null);
  };

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
        <div className="text-center space-y-4">
          <div className="spinner mx-auto"></div>
          <p className="text-muted-foreground">Loading your wellness journey...</p>
        </div>
      </div>
    );
  }

  if (showLanding) {
    return <LandingPage onGetStarted={handleGetStarted} />;
  }

  return (
    <main className="flex h-screen bg-gradient-to-br from-background via-primary/5 to-background transition-all duration-1000">
      {/* Floating background elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-32 h-32 bg-primary/5 rounded-full animate-float"></div>
        <div className="absolute top-40 right-20 w-24 h-24 bg-emerald-400/5 rounded-full animate-float" style={{ animationDelay: '-2s' }}></div>
        <div className="absolute bottom-40 left-1/4 w-20 h-20 bg-blue-400/5 rounded-full animate-float" style={{ animationDelay: '-4s' }}></div>
      </div>

      {/* Header */}
      <div className="absolute top-0 left-0 right-0 z-50 glass-effect border-b">
        <div className="flex items-center justify-between px-6 py-4">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleBackToLanding}
              className="hover:bg-primary/10 transition-all duration-200"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Home
            </Button>
            <div className="h-6 w-px bg-border"></div>
            <div className="flex items-center gap-3 animate-slide-in-left">
              <div className="relative">
                <Activity className="h-8 w-8 text-primary animate-pulse" />
                <Sparkles className="h-4 w-4 text-primary/60 absolute -top-1 -right-1 animate-bounce" />
              </div>
              <div>
                <h1 className="text-xl font-bold gradient-text">
                  Health & Wellness AI
                </h1>
                <p className="text-xs text-muted-foreground">Your Personal Wellness Assistant</p>
              </div>
            </div>
          </div>
          <div className="animate-slide-in-right">
            <ThemeToggle />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex w-full pt-20 p-6 gap-6 animate-fade-in">
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