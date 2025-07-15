"use client";

import { ScrollArea } from "@/components/ui/scroll-area";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { AgentEvent } from "@/lib/types";
import {
  ArrowRightLeft,
  Wrench,
  WrenchIcon,
  RefreshCw,
  MessageSquareMore,
  Activity,
  Clock,
  Zap,
} from "lucide-react";
import { PanelSection } from "./panel-section";

interface RunnerOutputProps {
  runnerEvents: AgentEvent[];
}

function renderValue(value: any): string {
  if (value === null || value === undefined) {
    return "null";
  }
  
  if (typeof value === "object") {
    if (Array.isArray(value)) {
      return value.length > 0 ? `${value.length} items` : "empty array";
    }
    return Object.keys(value).length > 0 ? `${Object.keys(value).length} properties` : "empty object";
  }
  
  return String(value);
}

function formatEventName(type: string) {
  return (type.charAt(0).toUpperCase() + type.slice(1)).replace("_", " ");
}

function EventIcon({ type }: { type: string }) {
  const className = "h-4 w-4 text-primary";
  switch (type) {
    case "handoff":
      return <ArrowRightLeft className={className} />;
    case "tool_call":
      return <Wrench className={className} />;
    case "tool_output":
      return <WrenchIcon className={className} />;
    case "context_update":
      return <RefreshCw className={className} />;
    default:
      return <Activity className={className} />;
  }
}

function getEventColor(type: string) {
  switch (type) {
    case "handoff":
      return "from-blue-500/10 to-blue-600/5 border-blue-200 dark:border-blue-800";
    case "tool_call":
      return "from-green-500/10 to-green-600/5 border-green-200 dark:border-green-800";
    case "tool_output":
      return "from-purple-500/10 to-purple-600/5 border-purple-200 dark:border-purple-800";
    case "context_update":
      return "from-orange-500/10 to-orange-600/5 border-orange-200 dark:border-orange-800";
    default:
      return "from-primary/10 to-primary/5 border-primary/20";
  }
}

function EventDetails({ event }: { event: AgentEvent }) {
  let details = null;
  const className = "border-2 bg-gradient-to-br from-muted/30 to-muted/10 text-xs p-4 rounded-2xl flex flex-col gap-3 mt-4 shadow-lg";
  
  switch (event.type) {
    case "handoff":
      details = event.metadata && (
        <div className={className}>
          <div className="flex items-center gap-3">
            <span className="font-semibold text-card-foreground">From:</span>
            <Badge variant="outline" className="text-xs border-2 bg-blue-50 dark:bg-blue-950/20">
              {event.metadata.source_agent}
            </Badge>
          </div>
          <div className="flex items-center gap-3">
            <span className="font-semibold text-card-foreground">To:</span>
            <Badge variant="outline" className="text-xs border-2 bg-green-50 dark:bg-green-950/20">
              {event.metadata.target_agent}
            </Badge>
          </div>
        </div>
      );
      break;
    case "tool_call":
      details = event.metadata && event.metadata.tool_args && (
        <div className={className}>
          <div className="font-semibold text-card-foreground mb-2 flex items-center gap-2">
            <Zap className="h-4 w-4 text-primary" />
            Arguments
          </div>
          <pre className="text-xs text-muted-foreground bg-background/80 p-3 rounded-xl overflow-x-auto border-2 font-mono">
            {JSON.stringify(event.metadata.tool_args, null, 2)}
          </pre>
        </div>
      );
      break;
    case "tool_output":
      details = event.metadata && event.metadata.tool_result && (
        <div className={className}>
          <div className="font-semibold text-card-foreground mb-2 flex items-center gap-2">
            <Activity className="h-4 w-4 text-primary" />
            Result
          </div>
          <pre className="text-xs text-muted-foreground bg-background/80 p-3 rounded-xl overflow-x-auto border-2 font-mono">
            {JSON.stringify(event.metadata.tool_result, null, 2)}
          </pre>
        </div>
      );
      break;
    case "context_update":
      details = event.metadata?.changes && (
        <div className={className}>
          <div className="font-semibold text-card-foreground mb-3 flex items-center gap-2">
            <RefreshCw className="h-4 w-4 text-primary" />
            Context Changes
          </div>
          {Object.entries(event.metadata.changes).map(([key, value]) => (
            <div key={key} className="flex items-center gap-3 p-2 bg-background/50 rounded-lg">
              <span className="font-semibold text-card-foreground">{key}:</span>
              <span className="text-muted-foreground font-mono text-xs">{renderValue(value)}</span>
            </div>
          ))}
        </div>
      );
      break;
    default:
      return null;
  }

  return (
    <div className="mt-3">
      {event.content && (
        <div className="text-sm text-card-foreground font-mono mb-3 p-3 bg-gradient-to-r from-muted/20 to-muted/10 rounded-xl border-2">
          {event.content}
        </div>
      )}
      {details}
    </div>
  );
}

function TimeBadge({ timestamp }: { timestamp: Date }) {
  const date = timestamp && typeof (timestamp as any)?.toDate === "function"
    ? (timestamp as any).toDate()
    : timestamp;
  const formattedDate = new Date(date).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });
  return (
    <Badge variant="outline" className="text-xs bg-background/80 border-2">
      <Clock className="h-3 w-3 mr-1" />
      {formattedDate}
    </Badge>
  );
}

export function RunnerOutput({ runnerEvents }: RunnerOutputProps) {
  return (
    <div className="flex-1 overflow-hidden">
      <PanelSection 
        title="Runner Output" 
        icon={<MessageSquareMore className="h-5 w-5 text-primary" />}
      >
        <ScrollArea className="h-96 rounded-2xl border-2 glass-effect shadow-xl">
          <div className="p-6 space-y-6">
            {runnerEvents.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-16 text-center">
                <div className="w-16 h-16 rounded-3xl gradient-bg flex items-center justify-center mb-6 animate-glow">
                  <Activity className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-lg font-semibold gradient-text mb-2">No Events Yet</h3>
                <p className="text-muted-foreground max-w-sm">
                  Runner events will appear here as the AI processes your requests and coordinates between agents.
                </p>
              </div>
            ) : (
              runnerEvents.map((event, index) => (
                <Card
                  key={event.id}
                  className={`glass-card border-2 shadow-xl card-hover animate-slide-up bg-gradient-to-br ${getEventColor(event.type)}`}
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <CardHeader className="flex flex-row justify-between items-start p-6 pb-3">
                    <div className="flex items-center gap-3">
                      <Badge className="bg-primary/10 text-primary hover:bg-primary/20 border-2 border-primary/20 font-semibold">
                        {event.agent}
                      </Badge>
                    </div>
                    <TimeBadge timestamp={event.timestamp} />
                  </CardHeader>

                  <CardContent className="p-6 pt-0">
                    <div className="flex items-start gap-4">
                      <div className="flex items-center gap-3 bg-gradient-to-r from-primary/10 to-primary/20 rounded-2xl px-4 py-3 shadow-lg">
                        <EventIcon type={event.type} />
                        <span className="text-sm font-semibold text-primary">
                          {formatEventName(event.type)}
                        </span>
                      </div>
                      <div className="flex-1">
                        <EventDetails event={event} />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        </ScrollArea>
      </PanelSection>
    </div>
  );
}