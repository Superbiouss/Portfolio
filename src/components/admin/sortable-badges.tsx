"use client";

import Image from "next/image";
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
import { updateBadgeOrder } from "@/app/actions/badges";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Pencil, Trash2, GripVertical } from "lucide-react";

interface BadgeType {
  id: string;
  title: string;
  issuer: string;
  image_url?: string;
}

interface SortableBadgeItemProps {
  badge: BadgeType;
  isGrid: boolean;
  onDelete: (id: string) => void;
}

function SortableBadgeItem({ badge, isGrid, onDelete }: SortableBadgeItemProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: badge.id });

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
        {badge.image_url && (
          <div className="w-16 h-16 relative bg-muted/20 border-2 border-border p-1 shrink-0 flex items-center justify-center">
            <Image src={badge.image_url} alt={badge.title} fill className="object-contain p-1" unoptimized />
          </div>
        )}
        <div>
          <h3 className="text-lg font-bold uppercase tracking-tighter">{badge.title}</h3>
          <span className="text-xs font-bold uppercase tracking-widest text-muted-foreground">{badge.issuer}</span>
        </div>
      </div>
      <div className={`flex items-center gap-3 ${isGrid ? "justify-end w-full" : ""}`}>
        <Button variant="ghost" size="icon" asChild>
          <Link href={`/admin/badges/${badge.id}/edit`}><Pencil className="w-4 h-4 text-muted-foreground hover:text-accent" /></Link>
        </Button>
        <Button variant="ghost" size="icon" onClick={() => onDelete(badge.id)}>
          <Trash2 className="w-4 h-4 text-muted-foreground hover:text-accent" />
        </Button>
      </div>
    </div>
  );
}

export function SortableBadges({ initialBadges, isGrid }: { initialBadges: BadgeType[], isGrid: boolean }) {
  const [badges, setBadges] = useState(initialBadges);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  async function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      const oldIndex = badges.findIndex((b) => b.id === active.id);
      const newIndex = badges.findIndex((b) => b.id === over.id);

      const newBadges = arrayMove(badges, oldIndex, newIndex);
      setBadges(newBadges);

      await updateBadgeOrder(newBadges.map(b => b.id));
    }
  }

  async function handleDelete(id: string) {
    if (confirm("Are you sure you want to delete this badge?")) {
      setBadges(badges.filter(b => b.id !== id));
      const { deleteBadge } = await import("@/app/actions/badges");
      await deleteBadge(id);
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
          items={badges.map((b) => b.id)}
          strategy={isGrid ? rectSortingStrategy : verticalListSortingStrategy}
        >
          {badges.map((b) => (
            <SortableBadgeItem key={b.id} badge={b} isGrid={isGrid} onDelete={handleDelete} />
          ))}
        </SortableContext>
      </div>
    </DndContext>
  );
}
