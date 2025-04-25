"use client";

import { cn } from "@/lib/utils";

interface AppSelectorProps {
  children: React.ReactNode;
}

interface AppSelectorItemProps {
  appName: string;
  selected?: boolean;
  onClick: () => void;
}

export function AppSelectorItem(props: AppSelectorItemProps) {
  return (
    <div className="px-4 py-2">
      <button
        onClick={props.onClick}
        className={cn(
          "flex w-full grow rounded-sm px-2 py-2 text-xl font-bold leading-6 text-[hsl(var(--upsell-gray-200))]",
          props.selected
            ? "bg-[hsl(var(--amp-lime-100)_/_0.3)] text-[hsl(var(--upsell-white-100))]"
            : "hover:bg-[hsl(var(--amp-lime-100)_/_0.1)]",
        )}
      >
        {props.appName}
      </button>
    </div>
  );
}

export function AppSelectorRoot(props: AppSelectorProps) {
  return (
    <div className="flex flex-col border-b border-[hsl(var(--upsell-white-100)_/_0.1)] pb-2">
      {props.children}
    </div>
  );
}