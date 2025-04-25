"use client";

import { cn } from "@/lib/utils";
import { ChevronDown, ChevronUp, LucideIcon } from "lucide-react";
import { useState } from "react";

export interface NavItemProps {
  title: string;
  icon: LucideIcon;
  active?: boolean;
  children?: React.ReactNode;
  secondary?: boolean;
  subnavActive?: boolean;
  navigation?: {
    path: string;
    matchablePath?: string;
    external?: boolean;
  };
  onClick?: () => void;
}

export function NavItem(props: NavItemProps) {
  const {
    onClick,
    secondary,
    title,
    active = false,
    children,
    icon: Icon,
  } = props;

  const [showSubnav, setShowSubnav] = useState(props.subnavActive);
  const hasSubnav = !onClick;

  function handleClick() {
    if (onClick) {
      onClick();
    } else {
      setShowSubnav(!showSubnav);
    }
  }

  return (
    <li className="flex flex-col px-4">
      <button
        className={cn(
          "flex items-center justify-between rounded-sm px-2 py-2 transition-all",
          active 
            ? "bg-[hsl(var(--amp-lime-100)_/_0.1)]" 
            : "hover:bg-[hsl(var(--amp-lime-100)_/_0.05)]",
        )}
        onClick={handleClick}
      >
        <div className="flex items-center gap-3">
          <Icon
            size={20}
            className={cn(
              secondary 
                ? "text-[hsl(var(--upsell-purple-500))]" 
                : "text-[hsl(var(--upsell-green-500))]",
            )}
          />

          <div
            className={cn(
              !active && "text-[hsl(var(--upsell-gray-100))]",
              "text-left text-sm font-semibold leading-4",
              secondary && "text-[hsl(var(--upsell-gray-200))] font-medium",
            )}
          >
            {title}
          </div>
        </div>

        {hasSubnav &&
          (showSubnav ? <ChevronUp size="16" /> : <ChevronDown size="16" />)}
      </button>

      {showSubnav && children && (
        <div>
          <ul>{children}</ul>
        </div>
      )}
    </li>
  );
}