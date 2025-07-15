"use client";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Shield, CheckCircle, XCircle, AlertTriangle, Zap } from "lucide-react";
import { PanelSection } from "./panel-section";
import type { GuardrailCheck } from "@/lib/types";

interface GuardrailsProps {
  guardrails: GuardrailCheck[];
  inputGuardrails: string[];
}

export function Guardrails({ guardrails, inputGuardrails }: GuardrailsProps) {
  const guardrailNameMap: Record<string, string> = {
    goal_validation_guardrail: "Goal Validation Guardrail",
    health_relevance_guardrail: "Health Relevance Guardrail",
  };

  const guardrailDescriptionMap: Record<string, string> = {
    "Goal Validation Guardrail": "Validates health goal format (quantity, metric, duration)",
    "Health Relevance Guardrail": "Ensures messages are relevant to health, fitness, and wellness topics",
  };

  const extractGuardrailName = (rawName: string): string =>
    guardrailNameMap[rawName] ?? rawName;

  const guardrailsToShow: GuardrailCheck[] = inputGuardrails.map((rawName) => {
    const existing = guardrails.find((gr) => gr.name === rawName);
    if (existing) {
      return existing;
    }
    return {
      id: rawName,
      name: rawName,
      input: "",
      reasoning: "",
      passed: false,
      timestamp: new Date(),
    };
  });

  return (
    <PanelSection
      title="Safety Guardrails"
      icon={<Shield className="h-5 w-5 text-primary" />}
    >
      <div className="grid grid-cols-1 gap-4">
        {guardrailsToShow.map((gr, index) => (
          <Card
            key={gr.id}
            className={`card-hover transition-all duration-500 border-2 ${
              !gr.input 
                ? "border-muted/50 opacity-70" 
                : gr.passed 
                ? "border-green-200 bg-gradient-to-br from-green-50/50 to-green-100/30 dark:border-green-800 dark:from-green-950/20 dark:to-green-900/10 shadow-lg shadow-green-500/10" 
                : "border-red-200 bg-gradient-to-br from-red-50/50 to-red-100/30 dark:border-red-800 dark:from-red-950/20 dark:to-red-900/10 shadow-lg shadow-red-500/10"
            }`}
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <CardHeader className="p-6 pb-3">
              <CardTitle className="text-base flex items-center gap-3 text-card-foreground">
                <div className={`p-2 rounded-xl ${
                  !gr.input 
                    ? "bg-muted/50 text-muted-foreground" 
                    : gr.passed 
                    ? "bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400" 
                    : "bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400"
                }`}>
                  <Shield className="h-4 w-4" />
                </div>
                <span className="font-semibold">{extractGuardrailName(gr.name)}</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6 pt-0">
              <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                {(() => {
                  const title = extractGuardrailName(gr.name);
                  return guardrailDescriptionMap[title] ?? gr.input;
                })()}
              </p>
              <div className="flex items-center justify-between">
                {!gr.input ? (
                  <Badge variant="outline" className="text-xs border-2 bg-muted/30">
                    <AlertTriangle className="h-3 w-3 mr-1" />
                    Standby
                  </Badge>
                ) : gr.passed ? (
                  <Badge className="bg-green-500 hover:bg-green-600 text-white text-xs shadow-lg border-0">
                    <CheckCircle className="h-3 w-3 mr-1" />
                    Passed
                  </Badge>
                ) : (
                  <Badge className="bg-red-500 hover:bg-red-600 text-white text-xs shadow-lg border-0">
                    <XCircle className="h-3 w-3 mr-1" />
                    Failed
                  </Badge>
                )}
                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                  <Zap className="h-3 w-3" />
                  <span>Active</span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </PanelSection>
  );
}