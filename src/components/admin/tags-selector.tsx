"use client";

import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

interface TagsSelectorProps {
  availableSkills: string[];
  initialSelected?: string[];
}

export function TagsSelector({ availableSkills, initialSelected = [] }: TagsSelectorProps) {
  const [selected, setSelected] = useState<string[]>(initialSelected);
  const [customTag, setCustomTag] = useState("");

  const toggleSkill = (skill: string) => {
    if (selected.includes(skill)) {
      setSelected(selected.filter((s) => s !== skill));
    } else {
      setSelected([...selected, skill]);
    }
  };

  const addCustomTag = (e: React.KeyboardEvent | React.MouseEvent) => {
    // Only trigger on Enter key if it's a keyboard event
    if ('key' in e && e.key !== 'Enter') return;
    e.preventDefault();
    
    const tag = customTag.trim();
    if (tag && !selected.includes(tag)) {
      setSelected([...selected, tag]);
    }
    setCustomTag("");
  };

  // Ensure custom tags from initialSelected that aren't in availableSkills are rendered
  const allUniqueTags = Array.from(new Set([...availableSkills, ...selected]));

  return (
    <div className="space-y-4">
      {/* Hidden input to seamlessly integrate with existing Server Actions */}
      <input type="hidden" name="tech_stack" value={selected.join(", ")} />
      
      <div className="flex flex-wrap gap-3">
        {allUniqueTags.map((skill) => {
          const isSelected = selected.includes(skill);
          return (
            <button
              key={skill}
              type="button"
              onClick={() => toggleSkill(skill)}
              className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent group"
            >
              <Badge 
                variant={isSelected ? "accent" : "muted"} 
                className={`cursor-pointer transition-colors duration-300 hover:border-accent ${isSelected ? "bg-accent/20" : ""}`}
              >
                {skill}
              </Badge>
            </button>
          );
        })}
      </div>

      <div className="flex items-center gap-2 max-w-md mt-4">
        <Input 
          placeholder="TYPE CUSTOM TAG & PRESS ENTER" 
          value={customTag}
          onChange={(e) => setCustomTag(e.target.value)}
          onKeyDown={addCustomTag}
          className="text-sm"
        />
        <Button type="button" variant="outline" size="icon" onClick={addCustomTag}>
          <Plus className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
}
