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
import { updateExperienceOrder } from "@/app/actions/experiences";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { Pencil, Trash2, GripVertical } from "lucide-react";

interface Experience {
  id: string;
  title: string;
  organization: string;
  type?: string;
}

interface SortableExperienceItemProps {
  experience: Experience;
  isGrid: boolean;
  onDelete: (id: string) => void;
}

function SortableExperienceItem({ experience, isGrid, onDelete }: SortableExperienceItemProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: experience.id });

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
      <div className={`flex gap-4 items-center ${isGrid ? "flex-col items-start" : ""}`}>
        <button
          {...attributes}
          {...listeners}
          className="cursor-grab active:cursor-grabbing p-1 hover:text-accent text-muted-foreground transition-colors"
          title="Drag to reorder"
        >
          <GripVertical className="w-5 h-5" />
        </button>
        <div>
          <h3 className="text-lg font-bold uppercase tracking-tighter">{experience.title}</h3>
          <span className="text-xs font-bold uppercase tracking-widest text-muted-foreground">{experience.organization} · {experience.type}</span>
        </div>
      </div>
      <div className={`flex items-center gap-3 ${isGrid ? "justify-end w-full" : ""}`}>
        <Badge variant="accent">{experience.type?.toUpperCase()}</Badge>
        <Button variant="ghost" size="icon" asChild>
          <Link href={`/admin/experiences/${experience.id}/edit`}><Pencil className="w-4 h-4 text-muted-foreground hover:text-accent" /></Link>
        </Button>
        <Button variant="ghost" size="icon" onClick={() => onDelete(experience.id)}>
          <Trash2 className="w-4 h-4 text-muted-foreground hover:text-accent" />
        </Button>
      </div>
    </div>
  );
}

export function SortableExperiences({ initialExperiences, isGrid }: { initialExperiences: Experience[], isGrid: boolean }) {
  const [experiences, setExperiences] = useState(initialExperiences);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  async function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      const oldIndex = experiences.findIndex((e) => e.id === active.id);
      const newIndex = experiences.findIndex((e) => e.id === over.id);

      const newExperiences = arrayMove(experiences, oldIndex, newIndex);
      setExperiences(newExperiences);

      await updateExperienceOrder(newExperiences.map(e => e.id));
    }
  }

  async function handleDelete(id: string) {
    if (confirm("Are you sure you want to delete this experience?")) {
      setExperiences(experiences.filter(e => e.id !== id));
      const { deleteExperience } = await import("@/app/actions/experiences");
      await deleteExperience(id);
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
          items={experiences.map((e) => e.id)}
          strategy={isGrid ? rectSortingStrategy : verticalListSortingStrategy}
        >
          {experiences.map((e) => (
            <SortableExperienceItem key={e.id} experience={e} isGrid={isGrid} onDelete={handleDelete} />
          ))}
        </SortableContext>
      </div>
    </DndContext>
  );
}
