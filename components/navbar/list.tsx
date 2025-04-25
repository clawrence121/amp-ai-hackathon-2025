"use client";

import React from "react";
import { NavItem, NavItemProps } from "./item";
import { cn } from "@/lib/utils";
import { SubNavItem, SubNavItemProps } from "./sub-item";

interface NavListProps {
  children: React.ReactNode;
  secondary?: boolean;
  name?: string;
}

function enrichedSubnavs(
  subNavItems: React.ReactNode,
  navigate: (path: string, external: boolean | undefined) => void,
) {
  const children = React.Children.map(subNavItems, (child: React.ReactNode) => {
    if (
      React.isValidElement<SubNavItemProps>(child) &&
      child.type === SubNavItem
    ) {
      const navConfig = child.props.navigation;
      const match = window.location.pathname.includes(
        navConfig.matchablePath || navConfig.path,
      );
      const active = !!match;

      return React.cloneElement(child, {
        active,
        onClick: navConfig
          ? () => navigate(navConfig.path, navConfig.external)
          : undefined,
      });
    }

    return child;
  });

  return children;
}

export function NavList(props: NavListProps) {
  const { children, secondary, name } = props;

  function navigate(path: string, external: boolean | undefined) {
    //
  }

  return (
    <div className={cn(!secondary && "grow")}>
      {name && (
        <div className="px-6 pt-6 text-xs font-bold uppercase leading-[14px] text-[hsl(var(--upsell-gray-400))]">
          {name}
        </div>
      )}
      <div>
        <ul className={cn("flex flex-col gap-1 py-4")}>
          {React.Children.map(children, (child: React.ReactNode) => {
            if (
              React.isValidElement<NavItemProps>(child) &&
              child.type === NavItem
            ) {
              const navConfig = child.props.navigation;
              const onClick = child.props.onClick;
              const active = false;
              const subnavs = child.props.children;
              const anySubnavActive = React.Children.map(
                subnavs,
                (subnav: React.ReactNode) => {
                  if (
                    React.isValidElement<SubNavItemProps>(subnav) &&
                    subnav.type === SubNavItem
                  ) {
                    const navConfig = subnav.props.navigation;
                    const match = window.location.pathname.includes(
                      navConfig.matchablePath || navConfig.path,
                    );
                    return !!match;
                  }
                },
              )?.find((active) => active);

              return React.cloneElement(child, {
                secondary,
                active,
                subnavActive: anySubnavActive,
                onClick:
                  navConfig && !onClick
                    ? () => navigate(navConfig.path, navConfig.external)
                    : onClick,
                children: child.props.children
                  ? enrichedSubnavs(child.props.children, navigate)
                  : undefined,
              });
            }
          })}
        </ul>
      </div>
    </div>
  );
}