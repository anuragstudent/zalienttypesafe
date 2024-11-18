"use client";

import React from "react";

import { NavMain } from "@/components/nav-main";
import { NavUser } from "@/components/nav-user";
import { TeamSwitcher } from "@/components/team-switcher";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";
import {
  AudioWaveform,
  BookOpen,
  Bot,
  Command,
  Frame,
  GalleryVerticalEnd,
  LayoutDashboardIcon,
  Map,
  PieChart,
  Settings2Icon,
  SquareTerminal,
} from "lucide-react";

// Sidebar data structure
const data = {
  sidebar: {
    items: [
      {
        title: "Dashboard",
        url: "/dashboard",
        icon: LayoutDashboardIcon,
        items: [
          { title: "Overview", url: "/dashboard/overview", icon: Frame },
          { title: "Reports", url: "/dashboard/reports", icon: PieChart },
        ],
      },
      {
        title: "Profiles",
        url: "/profiles",
        icon: AudioWaveform,
        items: [
          { title: "Manage Profiles", url: "/profiles/manage", icon: BookOpen },
          { title: "Create New Profile", url: "/profiles/new", icon: Bot },
        ],
      },
      {
        title: "Settings",
        url: "/settings",
        icon: Settings2Icon,
        items: [
          {
            title: "Profile Settings",
            url: "/settings/profile",
            icon: SquareTerminal,
          },
          { title: "Account Settings", url: "/settings/account", icon: Map },
        ],
      },
    ],
  },
  teams: [
    {
      name: "Anurag Subedi",
      logo: GalleryVerticalEnd,
      plan: "Zalient",
    },
    {
      name: "Zalient Corp.",
      logo: AudioWaveform,
      plan: "Startup",
    },
    {
      name: "Zalient s.",
      logo: Command,
      plan: "Free",
    },
  ],
};

type User = {
  name: string;
  email: string;
  avatar: string;
};

export function AppSidebar({
  user,
  ...props
}: { user: User } & React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain
          items={data.sidebar.items}
          currentPageUrl={"/dashboard/overview"}
        />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
