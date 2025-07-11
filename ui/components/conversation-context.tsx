"use client";

import { PanelSection } from "./panel-section";
import { Card, CardContent } from "@/components/ui/card";
import { BookText, User, Target, Utensils, Dumbbell, Heart } from "lucide-react";

interface ConversationContextProps {
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

function renderContextValue(value: any): string {
  if (value === null || value === undefined) {
    return "Not set";
  }
  
  if (typeof value === "object") {
    if (Array.isArray(value)) {
      return value.length > 0 ? `${value.length} items` : "empty";
    }
    return Object.keys(value).length > 0 ? `${Object.keys(value).length} properties` : "empty";
  }
  
  return String(value);
}

function getContextIcon(key: string) {
  switch (key) {
    case 'name':
      return <User className="h-3 w-3 text-primary" />;
    case 'goal':
      return <Target className="h-3 w-3 text-primary" />;
    case 'diet_preferences':
      return <Utensils className="h-3 w-3 text-primary" />;
    case 'workout_plan':
      return <Dumbbell className="h-3 w-3 text-primary" />;
    case 'injury_notes':
      return <Heart className="h-3 w-3 text-primary" />;
    default:
      return <div className="w-3 h-3 rounded-full bg-primary/60"></div>;
  }
}

export function ConversationContext({ context }: ConversationContextProps) {
  return (
    <PanelSection
      title="User Session Context"
      icon={<BookText className="h-4 w-4 text-primary" />}
    >
      <Card className="glass-effect border shadow-lg">
        <CardContent className="p-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
            {Object.entries(context).map(([key, value], index) => (
              <div
                key={key}
                className="flex items-center gap-3 bg-card/50 p-3 rounded-lg border transition-all duration-200 hover:shadow-md card-hover"
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                <div className="flex-shrink-0">
                  {getContextIcon(key)}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-xs font-medium text-card-foreground capitalize mb-1">
                    {key.replace('_', ' ')}
                  </div>
                  <div className={`text-xs truncate ${
                    value ? "text-muted-foreground" : "text-muted-foreground/60 italic"
                  }`}>
                    {renderContextValue(value)}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </PanelSection>
  );
}