"use client";

import { useEffect, useState } from "react";
import { Command } from "cmdk";
import { useRouter } from "next/navigation";
import { Home, Briefcase, Code, Award, FileText, Mail, Search } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export function CommandMenu() {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  // Toggle the menu when ⌘K is pressed
  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  const runCommand = (command: () => void) => {
    setOpen(false);
    command();
  };

  return (
    <AnimatePresence>
      {open && (
        <Command.Dialog
          open={open}
          onOpenChange={setOpen}
          label="Global Command Menu"
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-background/95"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="w-full max-w-2xl bg-background border-2 border-border overflow-hidden"
          >
            <div className="flex items-center border-b border-border/50 px-4">
              <Search className="w-5 h-5 text-muted-foreground mr-2" />
              <Command.Input
                placeholder="Type a command or search..."
                className="flex-1 bg-transparent py-4 text-foreground outline-none placeholder:text-muted-foreground text-lg font-medium"
              />
            </div>
            
            <Command.List className="max-h-[60vh] overflow-y-auto p-2">
              <Command.Empty className="py-6 text-center text-muted-foreground">
                No results found.
              </Command.Empty>

              <Command.Group heading="Navigation" className="text-xs font-bold uppercase tracking-widest text-muted-foreground/70 mb-2 px-2 py-2">
                <Command.Item
                  onSelect={() => runCommand(() => router.push("/"))}
                  className="flex items-center gap-3 px-3 py-3 cursor-pointer aria-selected:bg-accent aria-selected:text-accent-foreground text-foreground hover:bg-accent/10 transition-colors"
                >
                  <Home className="w-5 h-5" />
                  <span className="font-medium">Home</span>
                </Command.Item>
                <Command.Item
                  onSelect={() => runCommand(() => router.push("/projects"))}
                  className="flex items-center gap-3 px-3 py-3 cursor-pointer aria-selected:bg-accent aria-selected:text-accent-foreground text-foreground hover:bg-accent/10 transition-colors"
                >
                  <Briefcase className="w-5 h-5" />
                  <span className="font-medium">Projects</span>
                </Command.Item>
                <Command.Item
                  onSelect={() => runCommand(() => router.push("/skills"))}
                  className="flex items-center gap-3 px-3 py-3 cursor-pointer aria-selected:bg-accent aria-selected:text-accent-foreground text-foreground hover:bg-accent/10 transition-colors"
                >
                  <Code className="w-5 h-5" />
                  <span className="font-medium">Skills</span>
                </Command.Item>
                <Command.Item
                  onSelect={() => runCommand(() => router.push("/certificates"))}
                  className="flex items-center gap-3 px-3 py-3 cursor-pointer aria-selected:bg-accent aria-selected:text-accent-foreground text-foreground hover:bg-accent/10 transition-colors"
                >
                  <Award className="w-5 h-5" />
                  <span className="font-medium">Certificates</span>
                </Command.Item>
                <Command.Item
                  onSelect={() => runCommand(() => router.push("/resume"))}
                  className="flex items-center gap-3 px-3 py-3 cursor-pointer aria-selected:bg-accent aria-selected:text-accent-foreground text-foreground hover:bg-accent/10 transition-colors"
                >
                  <FileText className="w-5 h-5" />
                  <span className="font-medium">Resume</span>
                </Command.Item>
                <Command.Item
                  onSelect={() => runCommand(() => router.push("/contact"))}
                  className="flex items-center gap-3 px-3 py-3 cursor-pointer aria-selected:bg-accent aria-selected:text-accent-foreground text-foreground hover:bg-accent/10 transition-colors"
                >
                  <Mail className="w-5 h-5" />
                  <span className="font-medium">Contact</span>
                </Command.Item>
              </Command.Group>
            </Command.List>
          </motion.div>
        </Command.Dialog>
      )}
    </AnimatePresence>
  );
}
