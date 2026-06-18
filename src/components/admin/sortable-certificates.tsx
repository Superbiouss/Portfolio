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
import { updateCertificateOrder } from "@/app/actions/certificates";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Pencil, Trash2, GripVertical } from "lucide-react";

interface Certificate {
  id: string;
  title: string;
  issuer: string;
}

interface SortableCertificateItemProps {
  certificate: Certificate;
  isGrid: boolean;
  onDelete: (id: string) => void;
}

function SortableCertificateItem({ certificate, isGrid, onDelete }: SortableCertificateItemProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: certificate.id });

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
      className={`border-2 border-border p-4 md:p-6 flex hover:border-accent transition-colors duration-300 bg-background ${isGrid ? "flex-col justify-between h-full gap-6" : "items-center justify-between border-t-0 first:border-t-2"} ${isDragging ? "border-accent shadow-2xl scale-105" : ""}`}
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
          <h3 className="text-lg font-bold uppercase tracking-tighter">{certificate.title}</h3>
          <span className="text-xs font-bold uppercase tracking-widest text-muted-foreground">{certificate.issuer}</span>
        </div>
      </div>
      <div className={`flex items-center gap-3 ${isGrid ? "justify-end w-full" : ""}`}>
        <Button variant="ghost" size="icon" asChild>
          <Link href={`/admin/certificates/${certificate.id}/edit`}><Pencil className="w-4 h-4 text-muted-foreground hover:text-accent" /></Link>
        </Button>
        <Button variant="ghost" size="icon" onClick={() => onDelete(certificate.id)}>
          <Trash2 className="w-4 h-4 text-muted-foreground hover:text-accent" />
        </Button>
      </div>
    </div>
  );
}

export function SortableCertificates({ initialCertificates, isGrid }: { initialCertificates: Certificate[], isGrid: boolean }) {
  const [certificates, setCertificates] = useState(initialCertificates);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  async function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      const oldIndex = certificates.findIndex((c) => c.id === active.id);
      const newIndex = certificates.findIndex((c) => c.id === over.id);

      const newCertificates = arrayMove(certificates, oldIndex, newIndex);
      setCertificates(newCertificates);

      await updateCertificateOrder(newCertificates.map(c => c.id));
    }
  }

  async function handleDelete(id: string) {
    if (confirm("Are you sure you want to delete this certificate?")) {
      setCertificates(certificates.filter(c => c.id !== id));
      const { deleteCertificate } = await import("@/app/actions/certificates");
      await deleteCertificate(id);
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
          items={certificates.map((c) => c.id)}
          strategy={isGrid ? rectSortingStrategy : verticalListSortingStrategy}
        >
          {certificates.map((c) => (
            <SortableCertificateItem key={c.id} certificate={c} isGrid={isGrid} onDelete={handleDelete} />
          ))}
        </SortableContext>
      </div>
    </DndContext>
  );
}
