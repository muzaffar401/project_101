"use client";

import { useState } from "react";
import { ChevronDown, ChevronRight } from "lucide-react";

interface PanelSectionProps {
  title: string;
  icon: React.ReactNode;
  children: React.ReactNode;
}

export function PanelSection({ title, icon, children }: PanelSectionProps) {
  const [show, setShow] = useState(true);

  return (
    <div className="mb-6">
      <h2
        className="text-lg font-semibold mb-4 text-card-foreground flex items-center justify-between cursor-pointer group transition-all duration-200 hover:text-primary"
        onClick={() => setShow(!show)}
      >
        <div className="flex items-center gap-3">
          <div className="bg-primary/10 p-2 rounded-lg shadow-sm group-hover:bg-primary/20 transition-colors duration-200">
            {icon}
          </div>
          <span className="font-poppins">{title}</span>
        </div>
        <div className="transition-transform duration-200">
          {show ? (
            <ChevronDown className="h-4 w-4 text-muted-foreground group-hover:text-primary" />
          ) : (
            <ChevronRight className="h-4 w-4 text-muted-foreground group-hover:text-primary" />
          )}
        </div>
      </h2>
      <div className={`transition-all duration-300 overflow-hidden ${
        show ? "opacity-100 max-h-none" : "opacity-0 max-h-0"
      }`}>
        {show && children}
      </div>
    </div>
  );
}