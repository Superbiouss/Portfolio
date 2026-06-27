"use client";

import { useState, useRef, useEffect } from "react";

interface LogEntry {
  command?: string;
  output: string;
}

export function CLITerminal() {
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<LogEntry[]>(() => {
    // Lazy initializer: runs only on client mount — safe for sessionStorage access
    if (typeof window !== "undefined") {
      try {
        const saved = sessionStorage.getItem("cli_history");
        if (saved) return JSON.parse(saved) as LogEntry[];
      } catch { /* ignore */ }
    }
    return [{ output: "WELCOME TO AAKASH'S INTERACTIVE SHELL (v1.0.0)\nTYPE 'help' FOR A LIST OF AVAILABLE COMMANDS." }];
  });

  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Persist history to sessionStorage and auto-scroll whenever it changes
  useEffect(() => {
    if (history.length === 0) return;
    try {
      sessionStorage.setItem("cli_history", JSON.stringify(history));
    } catch { /* quota exceeded or private browsing — ignore */ }
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [history]);


  const handleTerminalClick = () => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  const handleCommandSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmedInput = input.trim();
    if (!trimmedInput) return;

    const cmd = trimmedInput.toLowerCase();
    let reply = "";

    switch (cmd) {
      case "help":
        reply = 
          "AVAILABLE COMMANDS:\n" +
          "  about    - Learn more about my developer background\n" +
          "  skills   - See my core technical stack\n" +
          "  contact  - Get social profiles and contact info\n" +
          "  theme    - Learn about the Strict Neo-Brutalist design tokens\n" +
          "  clear    - Clear terminal logs";
        break;
      case "about":
        reply = 
          "I am a Full-Stack Software Engineer passionate about crafting digital products\n" +
          "that are robust under the hood and beautiful on the surface. My approach bridges the gap\n" +
          "between complex backend logic and pixel-perfect micro-animations.";
        break;
      case "skills":
        reply = 
          "CORE TECH STACK:\n" +
          "  Frontend: Next.js (App Router), React, TypeScript, Tailwind CSS, Framer Motion\n" +
          "  Backend: Node.js, Express, PostgreSQL, Supabase, Python\n" +
          "  AI Tools: OpenAI API, RAG Pipelines, Vector DBs, LangChain";
        break;
      case "contact":
        reply = 
          "CONTACT DETAILS:\n" +
          "  GitHub: https://github.com/Superbiouss\n" +
          "  Email:  aakash@example.com (Available for freelance / full-time contracts)";
        break;
      case "theme":
        reply = 
          "STRICT NEO-BRUTALIST THEME DESIGN:\n" +
          "  Solid dark backgrounds (#09090B), 2px flat borders, flat depth (no blurs),\n" +
          "  acid yellow accents (#DFE104) and kinetic sans-serif typography (Space Grotesk).";
        break;
      case "clear":
        setHistory([]);
        sessionStorage.removeItem("cli_history");
        setInput("");
        return;
      default:
        reply = `bash: command not found: ${trimmedInput}. Type 'help' for options.`;
    }

    setHistory((prev) => [...prev, { command: trimmedInput, output: reply }]);
    setInput("");
  };

  return (
    <div
      onClick={handleTerminalClick}
      className="border-2 border-border p-6 bg-black font-mono text-xs md:text-sm text-[#FAFAFA] rounded-none shadow-[6px_6px_0px_0px_var(--color-border)] hover:border-accent hover:shadow-[6px_6px_0px_0px_var(--color-accent)] transition-all duration-300 h-[320px] flex flex-col justify-between overflow-hidden cursor-text"
    >
      {/* Terminal Title Bar */}
      <div className="flex items-center justify-between border-b border-border/50 pb-2 mb-4 shrink-0">
        <span className="text-[10px] uppercase tracking-widest text-muted-foreground">guest@aakash: ~</span>
        <div className="flex gap-1.5">
          <div className="w-2.5 h-2.5 bg-muted-foreground/30 rounded-full" />
          <div className="w-2.5 h-2.5 bg-muted-foreground/30 rounded-full" />
          <div className="w-2.5 h-2.5 bg-emerald-400 rounded-full" />
        </div>
      </div>

      {/* Terminal Output Area */}
      <div
        ref={containerRef}
        className="flex-1 overflow-y-auto scrollbar-none space-y-3 pr-2 mb-4"
      >
        {history.map((entry, index) => (
          <div key={index} className="space-y-1">
            {entry.command && (
              <div className="text-muted-foreground font-bold">
                guest@aakash:~$ <span className="text-[#FAFAFA]">{entry.command}</span>
              </div>
            )}
            <div className="whitespace-pre-wrap leading-relaxed text-emerald-400">{entry.output}</div>
          </div>
        ))}
      </div>

      {/* Terminal Input Line */}
      <form onSubmit={handleCommandSubmit} className="flex items-center shrink-0 border-t border-border/30 pt-3">
        <span className="text-muted-foreground font-bold mr-2">guest@aakash:~$</span>
        <input
          ref={inputRef}
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="flex-1 bg-transparent text-[#FAFAFA] outline-none border-none caret-accent font-mono text-xs md:text-sm"
          autoFocus
          maxLength={40}
          autoComplete="off"
          autoCorrect="off"
          autoCapitalize="off"
          spellCheck="false"
        />
      </form>
    </div>
  );
}
