"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Trash2, Copy, Check, FileIcon } from "lucide-react";
import { deleteMedia } from "@/app/actions/media";
import { toast } from "sonner";

interface MediaFile {
  name: string;
  url: string;
  created_at: string;
  metadata?: any;
}

export function MediaGrid({ initialFiles }: { initialFiles: MediaFile[] }) {
  const [copiedUrl, setCopiedUrl] = useState<string | null>(null);

  const copyToClipboard = async (url: string) => {
    try {
      await navigator.clipboard.writeText(url);
      setCopiedUrl(url);
      toast.success("URL copied to clipboard");
      setTimeout(() => setCopiedUrl(null), 2000);
    } catch {
      toast.error("Failed to copy URL");
    }
  };

  const handleDelete = async (name: string) => {
    if (confirm("Are you sure you want to delete this file? This will break any links using it!")) {
      const result = await deleteMedia(`uploads/${name}`);
      if (result.error) {
        toast.error("Failed to delete file", { description: result.error });
      } else {
        toast.success("File deleted successfully");
      }
    }
  };

  if (!initialFiles || initialFiles.length === 0) {
    return (
      <div className="border-2 border-border p-12 text-center text-muted-foreground">
        NO MEDIA FILES UPLOADED YET.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {initialFiles.map((file) => {
        const isImage = file.name.match(/\.(jpeg|jpg|gif|png|webp|svg)$/i);
        
        return (
          <div key={file.name} className="border-2 border-border flex flex-col hover:border-accent transition-colors group bg-background">
            <div className="aspect-square relative border-b-2 border-border overflow-hidden bg-muted/20 p-4 flex items-center justify-center">
              {isImage ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={file.url} alt={file.name} className="max-w-full max-h-full object-contain" />
              ) : (
                <FileIcon className="w-16 h-16 text-muted-foreground" />
              )}
              
              <div className="absolute inset-0 bg-background/80 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4">
                <Button variant="outline" size="icon" onClick={() => copyToClipboard(file.url)} title="Copy URL">
                  {copiedUrl === file.url ? <Check className="w-4 h-4 text-accent" /> : <Copy className="w-4 h-4" />}
                </Button>
                <Button variant="outline" size="icon" onClick={() => handleDelete(file.name)} title="Delete">
                  <Trash2 className="w-4 h-4 text-red-500 hover:text-red-600" />
                </Button>
              </div>
            </div>
            <div className="p-3">
              <p className="text-xs font-bold uppercase tracking-widest truncate" title={file.name}>
                {file.name.split("-").slice(1).join("-") || file.name}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
