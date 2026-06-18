"use client";

import { useState, useRef } from "react";
import { uploadMedia } from "@/app/actions/media";
import { UploadCloud, Loader2 } from "lucide-react";
import { toast } from "sonner";

export function MediaUploader() {
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = async (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      await handleUpload(e.dataTransfer.files[0]);
    }
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      await handleUpload(e.target.files[0]);
    }
  };

  const handleUpload = async (file: File) => {
    setIsUploading(true);
    const formData = new FormData();
    formData.append("file", file);
    
    const result = await uploadMedia(formData);
    if (result.error) {
      toast.error("Upload failed", { description: result.error });
    } else {
      toast.success("File uploaded successfully");
    }
    
    setIsUploading(false);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div
      className={`border-2 border-dashed p-12 text-center transition-colors cursor-pointer ${
        isDragging ? "border-accent bg-accent/10" : "border-border hover:border-muted-foreground"
      }`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      onClick={() => fileInputRef.current?.click()}
    >
      <input 
        type="file" 
        className="hidden" 
        ref={fileInputRef} 
        onChange={handleFileChange}
        accept="image/*,application/pdf"
      />
      
      <div className="flex flex-col items-center justify-center gap-4">
        {isUploading ? (
          <Loader2 className="w-10 h-10 animate-spin text-accent" />
        ) : (
          <UploadCloud className="w-10 h-10 text-muted-foreground" />
        )}
        <div>
          <p className="font-bold uppercase tracking-widest text-lg">
            {isUploading ? "UPLOADING..." : "DRAG AND DROP OR CLICK TO UPLOAD"}
          </p>
          <p className="text-sm text-muted-foreground mt-2">
            Supports Images and PDFs. Files will be uploaded directly to Supabase Storage.
          </p>
        </div>
      </div>
    </div>
  );
}
