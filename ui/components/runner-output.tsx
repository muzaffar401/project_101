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

function EventDetails({ event }: { event: AgentEvent }) {
  let details = null;
  const className = "border bg-muted/30 text-xs p-3 rounded-lg flex flex-col gap-2 mt-2";
  
  switch (event.type) {
    case "handoff":
      details = event.metadata && (
        <div className={className}>
          <div className="flex items-center gap-2">
            <span className="font-medium text-card-foreground">From:</span>
            <Badge variant="outline" className="text-xs">
              {event.metadata.source_agent}
            </Badge>
          </div>
          <div className="flex items-center gap-2">
            <span className="font-medium text-card-foreground">To:</span>
            <Badge variant="outline" className="text-xs">
              {event.metadata.target_agent}
            </Badge>
          </div>
        </div>
      );
      break;
    case "tool_call":
      details = event.metadata && event.metadata.tool_args && (
        <div className={className}>
          <div className="font-medium text-card-foreground mb-2">Arguments</div>
          <pre className="text-xs text-muted-foreground bg-background/50 p-2 rounded overflow-x-auto border">
            {JSON.stringify(event.metadata.tool_args, null, 2)}
          </pre>
        </div>
      );
      break;
    case "tool_output":
      details = event.metadata && event.metadata.tool_result && (
        <div className={className}>
          <div className="font-medium text-card-foreground mb-2">Result</div>
          <pre className="text-xs text-muted-foreground bg-background/50 p-2 rounded overflow-x-auto border">
            {JSON.stringify(event.metadata.tool_result, null, 2)}
          </pre>
        </div>
      );
      break;
    case "context_update":
      details = event.metadata?.changes && (
        <div className={className}>
          <div className="font-medium text-card-foreground mb-2">Context Changes</div>
          {Object.entries(event.metadata.changes).map(([key, value]) => (
            <div key={key} className="flex items-center gap-2">
              <span className="font-medium text-card-foreground">{key}:</span>
              <span className="text-muted-foreground">{renderValue(value)}</span>
            </div>
          ))}
        </div>
      );
      break;
    default:
      return null;
  }

  return (
    <div className="mt-2">
      {event.content && (
        <div className="text-sm text-card-foreground font-mono mb-2 p-2 bg-muted/20 rounded border">
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
    <Badge variant="outline" className="text-xs bg-background/50">
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
        icon={<MessageSquareMore className="h-4 w-4 text-primary" />}
      >
        <ScrollArea className="h-80 rounded-xl border glass-effect shadow-lg">
          <div className="p-4 space-y-4">
            {runnerEvents.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <Activity className="h-12 w-12 text-muted-foreground/50 mb-4" />
                <p className="text-muted-foreground">No runner events yet</p>
                <p className="text-xs text-muted-foreground/70 mt-1">
                  Events will appear here as the AI processes your requests
                </p>
              </div>
            ) : (
              runnerEvents.map((event, index) => (
                <Card
                  key={event.id}
                  className="glass-effect border shadow-sm card-hover animate-slide-up"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <CardHeader className="flex flex-row justify-between items-start p-4 pb-2">
                    <div className="flex items-center gap-2">
                      <Badge className="bg-primary/10 text-primary hover:bg-primary/20">
                        {event.agent}
                      </Badge>
                    </div>
                    <TimeBadge timestamp={event.timestamp} />
                  </CardHeader>

                  <CardContent className="p-4 pt-0">
                    <div className="flex items-start gap-3">
                      <div className="flex items-center gap-2 bg-primary/10 rounded-lg px-3 py-2">
                        <EventIcon type={event.type} />
                        <span className="text-xs font-medium text-primary">
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