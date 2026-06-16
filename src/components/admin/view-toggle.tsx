"use client";

import { LayoutGrid, LayoutList } from "lucide-react";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";

export function ViewToggle() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentView = searchParams.get("view") || "list";

  const createQueryString = (name: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set(name, value);
    return params.toString();
  };

  return (
    <div className="flex items-center border-2 border-border p-1 gap-1">
      <Button
        variant={currentView === "list" ? "primary" : "ghost"}
        size="icon"
        asChild
        className="rounded-none w-10 h-10"
      >
        <Link href={pathname + "?" + createQueryString("view", "list")} prefetch={false}>
          <LayoutList className="w-5 h-5" />
          <span className="sr-only">List View</span>
        </Link>
      </Button>
      <Button
        variant={currentView === "grid" ? "primary" : "ghost"}
        size="icon"
        asChild
        className="rounded-none w-10 h-10"
      >
        <Link href={pathname + "?" + createQueryString("view", "grid")} prefetch={false}>
          <LayoutGrid className="w-5 h-5" />
          <span className="sr-only">Grid View</span>
        </Link>
      </Button>
    </div>
  );
}
