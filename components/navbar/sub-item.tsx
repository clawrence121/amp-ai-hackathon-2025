"use client";

import { cn } from "@/lib/utils";

export interface SubNavItemProps {
  title: string;
  active?: boolean;
  navigation: {
    path: string;
    matchablePath?: string;
    external?: boolean;
  };
  onClick?: () => void;
  isLocked: boolean;
}

export function SubNavItem(props: SubNavItemProps) {
  const { title, active = false, onClick, isLocked } = props;

  function handleClick() {
    onClick && onClick();
  }

  return (
    <li className="flex">
      <button
        className={cn(
          "flex grow items-center gap-3 rounded-sm px-10 py-2.5",
          active 
            ? "bg-[hsl(var(--amp-lime-100)_/_0.1)]" 
            : "hover:bg-[hsl(var(--amp-lime-100)_/_0.05)]",
        )}
        onClick={handleClick}
      >
        <div
          className={cn(
            !active && "text-[hsl(var(--amp-white-50))]",
            "flex items-center gap-2 text-left text-sm leading-4",
          )}
        >
          {title}
        </div>
      </button>
    </li>
  );
}