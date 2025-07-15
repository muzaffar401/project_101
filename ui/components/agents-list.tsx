"use client";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Bot, Users, Zap, Activity } from "lucide-react";
import { PanelSection } from "./panel-section";
import type { Agent } from "@/lib/types";

interface AgentsListProps {
  agents: Agent[];
  currentAgent: string;
}

export function AgentsList({ agents, currentAgent }: AgentsListProps) {
  const activeAgent = agents.find((a) => a.name === currentAgent);
  
  return (
    <PanelSection
      title="Wellness Specialists"
      icon={<Users className="h-5 w-5 text-primary" />}
    >
      <div className="grid grid-cols-1 gap-4">
        {agents.map((agent, index) => (
          <Card
            key={agent.name}
            className={`card-hover transition-all duration-500 border-2 ${
              agent.name === currentAgent
                ? "border-primary/50 shadow-xl shadow-primary/20 bg-gradient-to-br from-primary/5 to-primary/10 animate-glow"
                : activeAgent?.handoffs.includes(agent.name)
                ? "border-primary/30 shadow-lg shadow-primary/10 bg-primary/5"
                : "border-border/50 opacity-70 grayscale hover:grayscale-0 hover:opacity-100"
            }`}
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <CardHeader className="p-6 pb-3">
              <CardTitle className="text-base flex items-center gap-3 text-card-foreground">
                <div className={`p-2 rounded-xl ${
                  agent.name === currentAgent 
                    ? "bg-primary text-primary-foreground animate-pulse" 
                    : "bg-primary/10 text-primary"
                }`}>
                  <Bot className="h-4 w-4" />
                </div>
                <span className="font-semibold">{agent.name}</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6 pt-0">
              <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                {agent.description}
              </p>
              <div className="flex items-center justify-between">
                {agent.name === currentAgent && (
                  <Badge className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg animate-pulse">
                    <Activity className="h-3 w-3 mr-1" />
                    Active Now
                  </Badge>
                )}
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <Zap className="h-3 w-3" />
                  <span>{agent.tools.length} tools</span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </PanelSection>
  );
}