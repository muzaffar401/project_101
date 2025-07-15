"use client";

import { Bot, Sparkles, Activity } from "lucide-react";
import type { Agent, AgentEvent, GuardrailCheck } from "@/lib/types";
import { AgentsList } from "./agents-list";
import { Guardrails } from "./guardrails";
import { ConversationContext } from "./conversation-context";
import { RunnerOutput } from "./runner-output";

interface AgentPanelProps {
  agents: Agent[];
  currentAgent: string;
  events: AgentEvent[];
  guardrails: GuardrailCheck[];
  context: {
    name?: string;
    uid?: number;
    goal?: any;
    diet_preferences?: string;
    workout_plan?: any;
    meal_plan?: string[];
    injury_notes?: string;
    handoff_logs?: string[];
    progress_logs?: any[];
  };
}

export function AgentPanel({
  agents,
  currentAgent,
  events,
  guardrails,
  context,
}: AgentPanelProps) {
  const activeAgent = agents.find((a) => a.name === currentAgent);
  const runnerEvents = events.filter((e) => e.type !== "message");

  return (
    <div className="h-full flex flex-col glass-effect rounded-3xl shadow-2xl border animate-scale-in overflow-hidden">
      <div className="gradient-bg text-white px-8 py-6 rounded-t-3xl">
        <div className="flex items-center gap-4">
          <div className="relative">
            <div className="w-12 h-12 rounded-2xl bg-white/20 flex items-center justify-center">
              <Bot className="h-6 w-6 animate-pulse" />
            </div>
            <Sparkles className="h-4 w-4 absolute -top-1 -right-1 animate-bounce" />
          </div>
          <div>
            <h1 className="font-bold text-xl text-shadow">AI Wellness Panel</h1>
            <p className="text-white/90 text-sm">Agent Orchestration Dashboard</p>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-8 space-y-8 bg-gradient-to-b from-background/50 to-background/30">
        <div className="animate-slide-up" style={{ animationDelay: "0.1s" }}>
          <AgentsList agents={agents} currentAgent={currentAgent} />
        </div>
        <div className="animate-slide-up" style={{ animationDelay: "0.2s" }}>
          <Guardrails
            guardrails={guardrails}
            inputGuardrails={activeAgent?.input_guardrails ?? []}
          />
        </div>
        <div className="animate-slide-up" style={{ animationDelay: "0.3s" }}>
          <ConversationContext context={context} />
        </div>
        <div className="animate-slide-up" style={{ animationDelay: "0.4s" }}>
          <RunnerOutput runnerEvents={runnerEvents} />
        </div>
      </div>
    </div>
  );
}