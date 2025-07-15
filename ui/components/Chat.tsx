"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import type { Message } from "@/lib/types";
import ReactMarkdown from "react-markdown";
import { WorkoutSelector } from "./workout-selector";
import { Send, MessageCircle, Sparkles, Bot, User } from "lucide-react";
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
    <div className="flex flex-col h-full glass-effect rounded-3xl shadow-2xl border animate-scale-in overflow-hidden">
      <div className="gradient-bg text-white px-8 py-6 rounded-t-3xl">
        <div className="flex items-center gap-4">
          <div className="relative">
            <div className="w-12 h-12 rounded-2xl bg-white/20 flex items-center justify-center">
              <MessageCircle className="h-6 w-6 animate-pulse" />
            </div>
            <Sparkles className="h-4 w-4 absolute -top-1 -right-1 animate-bounce" />
          </div>
          <div>
            <h2 className="font-bold text-xl text-shadow">Wellness Chat</h2>
            <p className="text-white/90 text-sm">AI-Powered Health Assistant</p>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-8 space-y-6 bg-gradient-to-b from-background/50 to-background/30">
        {messages.length === 0 && (
          <div className="flex flex-col items-center justify-center h-full text-center animate-bounce-in">
            <div className="w-20 h-20 rounded-3xl gradient-bg flex items-center justify-center mb-6 animate-glow">
              <MessageCircle className="h-10 w-10 text-white" />
            </div>
            <h3 className="text-2xl font-bold gradient-text mb-4">Welcome to Your Wellness Journey!</h3>
            <p className="text-muted-foreground max-w-md text-lg leading-relaxed">
              I'm your AI wellness coach, ready to help you achieve your health goals. 
              Let's start by getting to know you better!
            </p>
            <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-lg">
              {[
                "What are your fitness goals?",
                "Tell me about your diet preferences",
                "Do you have any injuries?",
                "How can I help you today?"
              ].map((suggestion, index) => (
                <button
                  key={index}
                  onClick={() => onSendMessage(suggestion)}
                  className="p-3 text-sm bg-primary/10 hover:bg-primary/20 rounded-xl border border-primary/20 hover:border-primary/40 transition-all duration-200 text-primary hover:scale-105"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  {suggestion}
                </button>
              ))}
            </div>
          </div>
        )}

        {messages.map((msg, idx) => {
          if (msg.content === "DISPLAY_WORKOUT_SELECTOR") return null;
          return (
            <div
              key={idx}
              className={`flex mb-6 animate-slide-up ${
                msg.role === "user" ? "justify-end" : "justify-start"
              }`}
              style={{ animationDelay: `${idx * 0.1}s` }}
            >
              {msg.role === "user" ? (
                <div className="max-w-[80%] lg:max-w-[70%] flex items-start gap-3">
                  <div className="flex-1">
                    <div className="gradient-bg text-white rounded-3xl rounded-br-lg px-6 py-4 shadow-xl card-hover">
                      <ReactMarkdown className="text-sm leading-relaxed">
                        {msg.content}
                      </ReactMarkdown>
                    </div>
                  </div>
                  <div className="w-10 h-10 rounded-2xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <User className="h-5 w-5 text-primary" />
                  </div>
                </div>
              ) : (
                <div className="max-w-[80%] lg:max-w-[70%] flex items-start gap-3">
                  <div className="w-10 h-10 rounded-2xl gradient-bg flex items-center justify-center flex-shrink-0 animate-glow">
                    <Bot className="h-5 w-5 text-white" />
                  </div>
                  <div className="flex-1">
                    <div className="glass-card border rounded-3xl rounded-bl-lg px-6 py-4 shadow-xl card-hover">
                      <ReactMarkdown className="text-sm leading-relaxed text-card-foreground prose prose-sm max-w-none">
                        {msg.content}
                      </ReactMarkdown>
                    </div>
                    {msg.agent && (
                      <p className="text-xs text-muted-foreground mt-2 ml-4 font-medium">
                        {msg.agent}
                      </p>
                    )}
                  </div>
                </div>
              )}
            </div>
          );
        })}

        {showWorkoutSelector && (
          <div className="flex justify-start mb-6 animate-bounce-in">
            <div className="max-w-[90%]">
              <WorkoutSelector
                onWorkoutSelect={handleWorkoutSelect}
                selectedWorkout={selectedWorkout}
              />
            </div>
          </div>
        )}

        {isLoading && (
          <div className="flex justify-start mb-6 animate-pulse">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-2xl gradient-bg flex items-center justify-center animate-glow">
                <Bot className="h-5 w-5 text-white" />
              </div>
              <div className="glass-card border rounded-3xl rounded-bl-lg px-6 py-4 shadow-xl">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-primary rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: "0.1s" }}></div>
                  <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: "0.2s" }}></div>
                  <span className="text-sm text-muted-foreground ml-2">AI is thinking...</span>
                </div>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input area */}
      <div className="p-8 border-t bg-gradient-to-r from-background/80 to-background/60 rounded-b-3xl">
        <div className="flex items-end gap-4">
          <div className="flex-1">
            <textarea
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyDown={handleKeyDown}
              onCompositionStart={() => setIsComposing(true)}
              onCompositionEnd={() => setIsComposing(false)}
              placeholder="Share your wellness goals or ask me anything..."
              className="w-full resize-none border-0 bg-card/80 backdrop-blur-sm rounded-2xl px-6 py-4 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all duration-300 shadow-lg placeholder:text-muted-foreground/70"
              rows={2}
              disabled={isLoading}
            />
          </div>
          <Button
            onClick={handleSend}
            disabled={!inputText.trim() || isLoading}
            className="gradient-bg hover:opacity-90 text-white rounded-2xl px-6 py-4 transition-all duration-300 hover:scale-105 shadow-xl button-glow group"
          >
            <Send className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>
        <div className="flex items-center justify-center mt-4 text-xs text-muted-foreground/70">
          <span>Press Enter to send • Shift + Enter for new line</span>
        </div>
      </div>
    </div>
  );
}