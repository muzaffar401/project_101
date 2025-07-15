"use client";

import { PanelSection } from "./panel-section";
import { Card, CardContent } from "@/components/ui/card";
import { BookText, User, Target, Utensils, Dumbbell, Heart, TrendingUp } from "lucide-react";

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
  const iconClass = "h-4 w-4 text-primary";
  switch (key) {
    case 'name':
      return <User className={iconClass} />;
    case 'goal':
      return <Target className={iconClass} />;
    case 'diet_preferences':
      return <Utensils className={iconClass} />;
    case 'workout_plan':
      return <Dumbbell className={iconClass} />;
    case 'injury_notes':
      return <Heart className={iconClass} />;
    case 'progress_logs':
      return <TrendingUp className={iconClass} />;
    default:
      return <div className="w-4 h-4 rounded-full bg-primary/60"></div>;
  }
}

function getContextColor(key: string, hasValue: boolean) {
  if (!hasValue) return "bg-muted/50 border-muted";
  
  switch (key) {
    case 'name':
      return "bg-blue-50 border-blue-200 dark:bg-blue-950/20 dark:border-blue-800";
    case 'goal':
      return "bg-green-50 border-green-200 dark:bg-green-950/20 dark:border-green-800";
    case 'diet_preferences':
      return "bg-orange-50 border-orange-200 dark:bg-orange-950/20 dark:border-orange-800";
    case 'workout_plan':
      return "bg-purple-50 border-purple-200 dark:bg-purple-950/20 dark:border-purple-800";
    case 'injury_notes':
      return "bg-red-50 border-red-200 dark:bg-red-950/20 dark:border-red-800";
    default:
      return "bg-primary/5 border-primary/20";
  }
}

export function ConversationContext({ context }: ConversationContextProps) {
  return (
    <PanelSection
      title="User Session Context"
      icon={<BookText className="h-5 w-5 text-primary" />}
    >
      <Card className="glass-card border-2 shadow-xl">
        <CardContent className="p-6">
          <div className="grid grid-cols-1 gap-4">
            {Object.entries(context).map(([key, value], index) => {
              const hasValue = value !== null && value !== undefined && value !== "";
              return (
                <div
                  key={key}
                  className={`flex items-center gap-4 p-4 rounded-2xl border-2 transition-all duration-300 hover:shadow-lg card-hover ${getContextColor(key, hasValue)}`}
                  style={{ animationDelay: `${index * 0.05}s` }}
                >
                  <div className="flex-shrink-0 p-2 rounded-xl bg-white/80 dark:bg-gray-800/80 shadow-sm">
                    {getContextIcon(key)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-semibold text-card-foreground capitalize mb-1">
                      {key.replace('_', ' ')}
                    </div>
                    <div className={`text-sm truncate ${
                      hasValue ? "text-muted-foreground font-medium" : "text-muted-foreground/60 italic"
                    }`}>
                      {renderContextValue(value)}
                    </div>
                  </div>
                  {hasValue && (
                    <div className="w-2 h-2 rounded-full bg-primary animate-pulse"></div>
                  )}
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </PanelSection>
  );
}