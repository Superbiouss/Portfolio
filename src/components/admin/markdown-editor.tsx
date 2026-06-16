"use client";

import dynamic from "next/dynamic";
import { useState } from "react";
import "@uiw/react-md-editor/markdown-editor.css";
import "@uiw/react-markdown-preview/markdown.css";

const MDEditor = dynamic(
  () => import("@uiw/react-md-editor").then((mod) => mod.default),
  { ssr: false }
);

interface MarkdownEditorProps {
  name: string;
  defaultValue?: string;
}

export function MarkdownEditor({ name, defaultValue = "" }: MarkdownEditorProps) {
  const [value, setValue] = useState(defaultValue);

  return (
    <div data-color-mode="dark" className="border-2 border-border focus-within:border-accent transition-colors duration-300">
      <input type="hidden" name={name} value={value} />
      <MDEditor
        value={value}
        onChange={(val) => setValue(val || "")}
        preview="live"
        height={400}
        style={{
          borderRadius: 0,
          border: 'none',
          backgroundColor: 'transparent',
        }}
      />
    </div>
  );
}
