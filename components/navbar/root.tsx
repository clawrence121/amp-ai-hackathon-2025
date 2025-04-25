import { cn } from "@/lib/utils";
import React from "react";

interface RootProps {
  children: React.ReactNode;
}

export function Root(props: RootProps) {
  return (
    <nav
      className={cn(
        "hidden fixed md:flex h-screen w-[255px] flex-col overflow-auto bg-[hsl(var(--upsell-gray-900))] text-[hsl(var(--upsell-white-100))] transition-all ease-in",
      )}
    >
      {props.children}
    </nav>
  );
}
