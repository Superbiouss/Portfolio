"use client";

import { useState } from "react";
import { Button } from "./button";
import { AlertCircle, Trash2 } from "lucide-react";

interface DeleteDialogProps {
  title?: string;
  description?: string;
  onConfirm: () => Promise<void> | void;
  trigger?: React.ReactNode;
}

export function DeleteDialog({ 
  title = "ARE YOU SURE?", 
  description = "This action cannot be undone. This will permanently delete this data.", 
  onConfirm, 
  trigger 
}: DeleteDialogProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleConfirm = async () => {
    setIsDeleting(true);
    try {
      await onConfirm();
      setIsOpen(false);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <>
      <div onClick={() => setIsOpen(true)}>
        {trigger || (
          <Button variant="ghost" size="icon" title="Delete">
            <Trash2 className="w-4 h-4 text-red-500 hover:text-red-600" />
          </Button>
        )}
      </div>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/95">
          <div className="w-full max-w-md bg-background border-2 border-border p-6">
            <div className="flex gap-4 items-start mb-6">
              <AlertCircle className="w-6 h-6 text-red-500 shrink-0 mt-1" />
              <div>
                <h2 className="text-xl font-bold uppercase tracking-widest text-foreground">{title}</h2>
                <p className="text-sm text-muted-foreground mt-2 font-medium">{description}</p>
              </div>
            </div>
            
            <div className="flex items-center justify-end gap-4 mt-8">
              <Button variant="outline" onClick={() => setIsOpen(false)} disabled={isDeleting}>
                CANCEL
              </Button>
              <Button 
                variant="primary" 
                className="bg-red-500 hover:bg-red-600 text-white" 
                onClick={handleConfirm}
                disabled={isDeleting}
              >
                {isDeleting ? "DELETING..." : "DELETE ITEM"}
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
