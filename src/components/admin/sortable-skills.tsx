"use client";

import { useState } from "react";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
  rectSortingStrategy,
  useSortable,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { updateSkillOrder } from "@/app/actions/skills";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { Pencil, Trash2, GripVertical } from "lucide-react";

interface Skill {
  id: string;
  name: string;
  category: string;
}

interface SortableSkillItemProps {
  skill: Skill;
  isGrid: boolean;
  onDelete: (id: string) => void;
}

function SortableSkillItem({ skill, isGrid, onDelete }: SortableSkillItemProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: skill.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? 10 : 1,
    opacity: isDragging ? 0.8 : 1,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`border-2 border-border p-4 md:p-6 flex hover:border-accent transition-colors duration-300 bg-background ${isGrid ? "flex-col justify-between h-full gap-6" : "items-center justify-between border-t-0 first:border-t-2"} ${isDragging ? "border-accent bg-accent/10" : ""}`}
    >
      <div className={`flex gap-4 ${isGrid ? "flex-col items-start" : "items-center"}`}>
        <button
          {...attributes}
          {...listeners}
          className="cursor-grab active:cursor-grabbing p-1 hover:text-accent text-muted-foreground transition-colors"
          title="Drag to reorder"
        >
          <GripVertical className="w-5 h-5" />
        </button>
        <Badge variant="accent">{skill.category}</Badge>
        <span className="text-lg font-bold uppercase tracking-tighter">{skill.name}</span>
      </div>
      <div className={`flex items-center gap-3 ${isGrid ? "justify-end w-full" : ""}`}>
        <Button variant="ghost" size="icon" asChild>
          <Link href={`/admin/skills/${skill.id}/edit`}><Pencil className="w-4 h-4 text-muted-foreground hover:text-accent" /></Link>
        </Button>
        <Button variant="ghost" size="icon" onClick={() => onDelete(skill.id)}>
          <Trash2 className="w-4 h-4 text-muted-foreground hover:text-accent" />
        </Button>
      </div>
    </div>
  );
}

export function SortableSkills({ initialSkills, isGrid }: { initialSkills: Skill[], isGrid: boolean }) {
  const [skills, setSkills] = useState(initialSkills);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  async function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      const oldIndex = skills.findIndex((s) => s.id === active.id);
      const newIndex = skills.findIndex((s) => s.id === over.id);

      const newSkills = arrayMove(skills, oldIndex, newIndex);
      setSkills(newSkills);

      // Save to DB
      await updateSkillOrder(newSkills.map(s => s.id));
    }
  }

  async function handleDelete(id: string) {
    if (confirm("Are you sure you want to delete this skill?")) {
      setSkills(skills.filter(s => s.id !== id));
      const { deleteSkill } = await import("@/app/actions/skills");
      await deleteSkill(id);
    }
  }

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      <div className={isGrid ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" : "space-y-0"}>
        <SortableContext
          items={skills.map((s) => s.id)}
          strategy={isGrid ? rectSortingStrategy : verticalListSortingStrategy}
        >
          {skills.map((s) => (
            <SortableSkillItem key={s.id} skill={s} isGrid={isGrid} onDelete={handleDelete} />
          ))}
        </SortableContext>
      </div>
    </DndContext>
  );
}
