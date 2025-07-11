"use client";

import { Bot, Sparkles } from "lucide-react";
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
    <div className="h-full flex flex-col glass-effect rounded-2xl shadow-xl border animate-scale-in">
      <div className="gradient-bg text-white px-6 py-4 rounded-t-2xl">
        <div className="flex items-center gap-3">
          <div className="relative">
            <Bot className="h-6 w-6 animate-pulse" />
            <Sparkles className="h-3 w-3 absolute -top-1 -right-1 animate-bounce" />
          </div>
          <div>
            <h1 className="font-bold text-lg">AI Wellness Panel</h1>
            <p className="text-white/80 text-sm">Agent Orchestration Dashboard</p>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-background/50 dark:bg-background/30 rounded-b-2xl">
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