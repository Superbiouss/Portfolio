"use client";

import Marquee from "react-fast-marquee";

const ticker = [
  "AAKASH YADAV",
  "FULL-STACK DEVELOPER",
  "ENGINEER",
  "PROBLEM SOLVER",
  "AVAILABLE FOR WORK",
];

export function TopBar() {
  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-accent text-accent-foreground border-b-2 border-accent-foreground/20 h-10 overflow-hidden flex items-center">
      <Marquee speed={60} gradient={false} autoFill>
        {ticker.map((item) => (
          <span key={item} className="flex items-center gap-0">
            <span className="text-xs font-extrabold uppercase tracking-[0.25em] px-6 whitespace-nowrap">
              {item}
            </span>
            <span className="text-xs font-bold opacity-40 pr-2" aria-hidden="true">✦</span>
          </span>
        ))}
      </Marquee>
    </div>
  );
}
