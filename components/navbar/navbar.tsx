"use client";

import {
  Gauge,
  GaugeCircle,
  Grid2X2Icon,
  LucideIcon,
  MousePointerClick,
  PersonStandingIcon,
} from "lucide-react";
import { NavItem } from "./item";
import { Root } from "./root";
import { AppSwitcher } from "./app-switcher";
import { AppSelectorItem, AppSelectorRoot } from "./app-selector";
import { NavList } from "./list";

export type NavItem = {
  title: string;
  icon: LucideIcon;
  path?: string;
};

export const PRIMARY_APP_SWITCHER_ITEMS: NavItem[] = [
  {
    title: "Dashboard",
    icon: Gauge,
    path: "/dashboard",
  },
  {
    title: "Our Apps",
    icon: Grid2X2Icon,
    path: "/our-apps",
  },
  {
    title: "Benchmarks",
    icon: GaugeCircle,
    path: "/benchmarks",
  },
  {
    title: "UTM Builder",
    icon: MousePointerClick,
    path: "/utm-builder",
  },
  {
    title: "Onboarding",
    icon: PersonStandingIcon,
    path: "/",
  },
];

export function Navbar() {
  function renderItems(items: NavItem[]) {
    return items.map((item) => (
      <NavItem
        key={item.title}
        title={item.title}
        icon={item.icon}
        navigation={
          item.path
            ? {
                path: item.path,
              }
            : undefined
        }
        active={item.title === "Onboarding"}
      />
    ));
  }

  return (
    <Root>
      <AppSwitcher open disabled />
      <AppSelectorRoot>
        <AppSelectorItem appName="Back In Stock" onClick={() => ({})} />
        <AppSelectorItem appName="Lifetimely" onClick={() => ({})} />
        <AppSelectorItem appName="Upsell" onClick={() => ({})} />
      </AppSelectorRoot>
      <NavList name="AMP HUB">
        {renderItems(PRIMARY_APP_SWITCHER_ITEMS)}
      </NavList>
    </Root>
  );
}
