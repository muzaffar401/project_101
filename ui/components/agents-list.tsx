"use client";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Bot, Users, Zap } from "lucide-react";
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
      icon={<Users className="h-4 w-4 text-primary" />}
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
        {agents.map((agent, index) => (
          <Card
            key={agent.name}
            className={`card-hover transition-all duration-300 ${
              agent.name === currentAgent ||
              activeAgent?.handoffs.includes(agent.name)
                ? "border-primary/50 shadow-lg shadow-primary/10"
                : "opacity-60 grayscale"
            } ${
              agent.name === currentAgent 
                ? "ring-2 ring-primary/30 bg-primary/5" 
                : "bg-card"
            }`}
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <CardHeader className="p-4 pb-2">
              <CardTitle className="text-sm flex items-center gap-2 text-card-foreground">
                <Bot className="h-4 w-4 text-primary" />
                {agent.name}
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4 pt-0">
              <p className="text-xs text-muted-foreground leading-relaxed mb-3">
                {agent.description}
              </p>
              <div className="flex items-center justify-between">
                {agent.name === currentAgent && (
                  <Badge className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-sm">
                    <Zap className="h-3 w-3 mr-1" />
                    Active
                  </Badge>
                )}
                <div className="text-xs text-muted-foreground">
                  {agent.tools.length} tools
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </PanelSection>
  );
}