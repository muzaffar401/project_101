"use client";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Shield, CheckCircle, XCircle, AlertTriangle } from "lucide-react";
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
      icon={<Shield className="h-4 w-4 text-primary" />}
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {guardrailsToShow.map((gr, index) => (
          <Card
            key={gr.id}
            className={`card-hover transition-all duration-300 ${
              !gr.input ? "opacity-60" : ""
            } ${
              gr.input && gr.passed 
                ? "border-green-200 bg-green-50/50 dark:border-green-800 dark:bg-green-950/20" 
                : gr.input && !gr.passed
                ? "border-red-200 bg-red-50/50 dark:border-red-800 dark:bg-red-950/20"
                : "bg-card"
            }`}
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <CardHeader className="p-4 pb-2">
              <CardTitle className="text-sm flex items-center gap-2 text-card-foreground">
                <Shield className="h-4 w-4 text-primary" />
                {extractGuardrailName(gr.name)}
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4 pt-0">
              <p className="text-xs text-muted-foreground leading-relaxed mb-3">
                {(() => {
                  const title = extractGuardrailName(gr.name);
                  return guardrailDescriptionMap[title] ?? gr.input;
                })()}
              </p>
              <div className="flex items-center justify-between">
                {!gr.input ? (
                  <Badge variant="outline" className="text-xs">
                    <AlertTriangle className="h-3 w-3 mr-1" />
                    Standby
                  </Badge>
                ) : gr.passed ? (
                  <Badge className="bg-green-500 hover:bg-green-600 text-white text-xs shadow-sm">
                    <CheckCircle className="h-3 w-3 mr-1" />
                    Passed
                  </Badge>
                ) : (
                  <Badge className="bg-red-500 hover:bg-red-600 text-white text-xs shadow-sm">
                    <XCircle className="h-3 w-3 mr-1" />
                    Failed
                  </Badge>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </PanelSection>
  );
}