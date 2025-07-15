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
    <div className="mb-8">
      <h2
        className="text-xl font-bold mb-6 text-card-foreground flex items-center justify-between cursor-pointer group transition-all duration-300 hover:text-primary"
        onClick={() => setShow(!show)}
      >
        <div className="flex items-center gap-4">
          <div className="bg-gradient-to-br from-primary/10 to-primary/20 p-3 rounded-2xl shadow-lg group-hover:shadow-xl group-hover:shadow-primary/20 transition-all duration-300 group-hover:scale-110">
            {icon}
          </div>
          <span className="font-poppins gradient-text group-hover:text-primary transition-all duration-300">{title}</span>
        </div>
        <div className="transition-transform duration-300 p-2 rounded-xl hover:bg-primary/10">
          {show ? (
            <ChevronDown className="h-5 w-5 text-muted-foreground group-hover:text-primary" />
          ) : (
            <ChevronRight className="h-5 w-5 text-muted-foreground group-hover:text-primary" />
          )}
        </div>
      </h2>
      <div className={`transition-all duration-500 overflow-hidden ${
        show ? "opacity-100 max-h-none" : "opacity-0 max-h-0"
      }`}>
        {show && children}
      </div>
    </div>
  );
}