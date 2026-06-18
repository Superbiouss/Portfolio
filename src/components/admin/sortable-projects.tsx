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
import { updateProjectOrder } from "@/app/actions/projects";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { Pencil, Trash2, GripVertical } from "lucide-react";

interface Project {
  id: string;
  title: string;
  slug: string;
  featured: boolean;
  status?: string;
}

interface SortableProjectItemProps {
  project: Project;
  isGrid: boolean;
  onDelete: (id: string) => void;
}

function SortableProjectItem({ project, isGrid, onDelete }: SortableProjectItemProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: project.id });

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
      <div className={`flex items-center gap-4 ${isGrid ? "flex-col items-start" : ""}`}>
        <button
          {...attributes}
          {...listeners}
          className="cursor-grab active:cursor-grabbing p-1 hover:text-accent text-muted-foreground transition-colors"
          title="Drag to reorder"
        >
          <GripVertical className="w-5 h-5" />
        </button>
        <div>
          <h3 className="text-lg font-bold uppercase tracking-tighter">{project.title}</h3>
          <span className="text-xs font-bold uppercase tracking-widest text-muted-foreground">{project.slug}</span>
        </div>
      </div>
      <div className={`flex items-center gap-3 ${isGrid ? "justify-end w-full" : ""}`}>
        {project.status === "draft" && <Badge variant="outline" className="border-muted-foreground text-muted-foreground">DRAFT</Badge>}
        {project.featured && <Badge variant="accent">FEATURED</Badge>}
        <Button variant="ghost" size="icon" asChild>
          <Link href={`/admin/projects/${project.id}/edit`}><Pencil className="w-4 h-4 text-muted-foreground hover:text-accent" /></Link>
        </Button>
        <Button variant="ghost" size="icon" onClick={() => onDelete(project.id)}>
          <Trash2 className="w-4 h-4 text-muted-foreground hover:text-accent" />
        </Button>
      </div>
    </div>
  );
}

export function SortableProjects({ initialProjects, isGrid }: { initialProjects: Project[], isGrid: boolean }) {
  const [projects, setProjects] = useState(initialProjects);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  async function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      const oldIndex = projects.findIndex((p) => p.id === active.id);
      const newIndex = projects.findIndex((p) => p.id === over.id);

      const newProjects = arrayMove(projects, oldIndex, newIndex);
      setProjects(newProjects);

      // Save to DB
      await updateProjectOrder(newProjects.map(p => p.id));
    }
  }

  async function handleDelete(id: string) {
    if (confirm("Are you sure you want to delete this project?")) {
      setProjects(projects.filter(p => p.id !== id));
      const { deleteProject } = await import("@/app/actions/projects");
      await deleteProject(id);
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
          items={projects.map((p) => p.id)}
          strategy={isGrid ? rectSortingStrategy : verticalListSortingStrategy}
        >
          {projects.map((p) => (
            <SortableProjectItem key={p.id} project={p} isGrid={isGrid} onDelete={handleDelete} />
          ))}
        </SortableContext>
      </div>
    </DndContext>
  );
}
