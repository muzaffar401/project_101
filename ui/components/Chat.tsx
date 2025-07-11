"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import type { Message } from "@/lib/types";
import ReactMarkdown from "react-markdown";
import { WorkoutSelector } from "./workout-selector";
import { Send, MessageCircle, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ChatProps {
  messages: Message[];
  onSendMessage: (message: string) => void;
  isLoading?: boolean;
}

export function Chat({ messages, onSendMessage, isLoading }: ChatProps) {
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [inputText, setInputText] = useState("");
  const [isComposing, setIsComposing] = useState(false);
  const [showWorkoutSelector, setShowWorkoutSelector] = useState(false);
  const [selectedWorkout, setSelectedWorkout] = useState<string | undefined>(undefined);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  useEffect(() => {
    const hasTrigger = messages.some(
      (m) => m.role === "assistant" && m.content === "DISPLAY_WORKOUT_SELECTOR"
    );
    if (hasTrigger && !selectedWorkout) {
      setShowWorkoutSelector(true);
    }
  }, [messages, selectedWorkout]);

  const handleSend = useCallback(() => {
    if (!inputText.trim()) return;
    onSendMessage(inputText);
    setInputText("");
  }, [inputText, onSendMessage]);

  const handleWorkoutSelect = useCallback(
    (workout: string) => {
      setSelectedWorkout(workout);
      setShowWorkoutSelector(false);
      onSendMessage(`I would like to do ${workout} workout`);
    },
    [onSendMessage]
  );

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
      if (e.key === "Enter" && !e.shiftKey && !isComposing) {
        e.preventDefault();
        handleSend();
      }
    },
    [handleSend, isComposing]
  );

  return (
    <div className="flex flex-col h-full glass-effect rounded-2xl shadow-xl border animate-scale-in">
      <div className="gradient-bg text-white px-6 py-4 rounded-t-2xl">
        <div className="flex items-center gap-3">
          <div className="relative">
            <MessageCircle className="h-6 w-6 animate-pulse" />
            <Sparkles className="h-3 w-3 absolute -top-1 -right-1 animate-bounce" />
          </div>
          <div>
            <h2 className="font-bold text-lg">Wellness Chat</h2>
            <p className="text-white/80 text-sm">AI-Powered Health Assistant</p>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-background/50 dark:bg-background/30">
        {messages.length === 0 && (
          <div className="flex flex-col items-center justify-center h-full text-center animate-bounce-in">
            <div className="w-16 h-16 rounded-full gradient-bg flex items-center justify-center mb-4">
              <MessageCircle className="h-8 w-8 text-white" />
            </div>
            <h3 className="text-lg font-semibold text-foreground mb-2">Welcome to Your Wellness Journey!</h3>
            <p className="text-muted-foreground max-w-md">
              Start by sharing your health goals, dietary preferences, or ask any wellness-related questions.
            </p>
          </div>
        )}

        {messages.map((msg, idx) => {
          if (msg.content === "DISPLAY_WORKOUT_SELECTOR") return null;
          return (
            <div
              key={idx}
              className={`flex mb-4 animate-slide-up ${
                msg.role === "user" ? "justify-end" : "justify-start"
              }`}
              style={{ animationDelay: `${idx * 0.1}s` }}
            >
              {msg.role === "user" ? (
                <div className="max-w-[80%] lg:max-w-[70%]">
                  <div className="gradient-bg text-white rounded-2xl rounded-br-md px-4 py-3 shadow-lg card-hover">
                    <ReactMarkdown className="text-sm leading-relaxed">
                      {msg.content}
                    </ReactMarkdown>
                  </div>
                </div>
              ) : (
                <div className="max-w-[80%] lg:max-w-[70%]">
                  <div className="bg-card border rounded-2xl rounded-bl-md px-4 py-3 shadow-lg card-hover">
                    <ReactMarkdown className="text-sm leading-relaxed text-card-foreground">
                      {msg.content}
                    </ReactMarkdown>
                  </div>
                  {msg.agent && (
                    <p className="text-xs text-muted-foreground mt-1 ml-2">
                      {msg.agent}
                    </p>
                  )}
                </div>
              )}
            </div>
          );
        })}

        {showWorkoutSelector && (
          <div className="flex justify-start mb-4 animate-bounce-in">
            <div className="max-w-[90%]">
              <WorkoutSelector
                onWorkoutSelect={handleWorkoutSelect}
                selectedWorkout={selectedWorkout}
              />
            </div>
          </div>
        )}

        {isLoading && (
          <div className="flex justify-start mb-4 animate-pulse">
            <div className="bg-card border rounded-2xl rounded-bl-md px-4 py-3 shadow-lg">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-primary rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: "0.1s" }}></div>
                <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: "0.2s" }}></div>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input area */}
      <div className="p-6 border-t bg-background/50 dark:bg-background/30 rounded-b-2xl">
        <div className="flex items-end gap-3">
          <div className="flex-1">
            <textarea
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyDown={handleKeyDown}
              onCompositionStart={() => setIsComposing(true)}
              onCompositionEnd={() => setIsComposing(false)}
              placeholder="Share your wellness goals or ask me anything..."
              className="w-full resize-none border-0 bg-card rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all duration-200 shadow-sm"
              rows={2}
              disabled={isLoading}
            />
          </div>
          <Button
            onClick={handleSend}
            disabled={!inputText.trim() || isLoading}
            className="gradient-bg hover:opacity-90 text-white rounded-xl px-4 py-3 transition-all duration-200 hover:scale-105 shadow-lg"
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}