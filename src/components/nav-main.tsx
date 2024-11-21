"use client";

import { ChevronRight, type LucideIcon } from "lucide-react";
import { useState, useEffect } from "react";

import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar";
import Link from "next/link";
import { useSidebar } from "@/components/ui/sidebar";
type NavMainProps = {
  items: {
    title: string;
    url?: string;
    icon?: LucideIcon;
    items?: {
      title: string;
      url: string;
      icon?: LucideIcon;
    }[];
  }[];
  currentPageUrl: string;
};

export function NavMain({ items, currentPageUrl }: NavMainProps) {
  const { toggleSidebar, isMobile } = useSidebar();
  const [expandedParent, setExpandedParent] = useState<string | null>(null);

  useEffect(() => {
    // Expand the parent menu if any sub-item is active
    const parentWithActiveSubItem = items.find((item) =>
      item.items?.some((subItem) => subItem.url === currentPageUrl)
    );
    if (parentWithActiveSubItem) {
      setExpandedParent(parentWithActiveSubItem.title);
    }
  }, [items, currentPageUrl]);

  return (
    <SidebarGroup>
      <SidebarGroupLabel>Platform</SidebarGroupLabel>
      <SidebarMenu className="overflow-hidden">
        {items.map((item) => {
          const hasSubItems = item.items && item.items.length > 0;
          const isExpanded = expandedParent === item.title;
          const isActive = item.url === currentPageUrl;
          const isSubItemActive = item.items?.some(
            (subItem) => subItem.url === currentPageUrl
          );

          const topLevelClass = `flex items-center mt-1 ${
            isActive || isSubItemActive
              ? "bg-primary hover:bg-primary/80 text-white"
              : "text-muted-foreground hover:text-white"
          }`;

          return (
            <div key={item.title}>
              <SidebarMenuItem className="">
                {hasSubItems ? (
                  <SidebarMenuButton
                    tooltip={item.title}
                    onClick={() =>
                      setExpandedParent(isExpanded ? null : item.title)
                    }
                    className={topLevelClass}
                  >
                    {item.icon && <item.icon className="mr-2 flex-shrink-0" />}
                    <span className="flex-grow">{item.title}</span>
                    <ChevronRight
                      className={`ml-auto transition-transform duration-200 ${
                        isExpanded ? "rotate-90" : ""
                      }`}
                    />
                  </SidebarMenuButton>
                ) : (
                  <Link
                    onClick={() => {
                      if (isMobile) {
                        toggleSidebar();
                      }
                    }}
                    href={item.url || "#"}
                  >
                    <SidebarMenuButton
                      tooltip={item.title}
                      className={topLevelClass}
                    >
                      {item.icon && (
                        <item.icon className="mr-2 flex-shrink-0" />
                      )}
                      <span className="flex-grow">{item.title}</span>
                    </SidebarMenuButton>
                  </Link>
                )}
              </SidebarMenuItem>

              {hasSubItems && isExpanded && (
                <SidebarMenuSub className="ml-4 w-full overflow-hidden">
                  {item.items?.map((subItem, index) => {
                    const isSubActive = subItem.url === currentPageUrl;
                    const subItemClass = `flex items-center text-sm mr-2 hover:bg-sidebar-accent p-2 rounded-md ${
                      isSubActive
                        ? "text-[--brand-color] hover:text-white"
                        : "text-muted-foreground hover:text-white"
                    }`;

                    return (
                      <SidebarMenuSubItem
                        key={subItem.title}
                        className="opacity-0 translate-x-[-20px] animate-fadeInLeft"
                        style={{
                          animationDelay: `${index * 0.1}s`,
                          animationFillMode: "forwards",
                        }}
                      >
                        <SidebarMenuSubButton asChild>
                          <Link
                            href={subItem.url}
                            onClick={() => {
                              if (isMobile) {
                                toggleSidebar();
                              }
                            }}
                          >
                            <p className={subItemClass}>
                              {subItem.icon && (
                                <subItem.icon className="mr-2 flex-shrink-0 h-4 w-4" />
                              )}
                              <span>{subItem.title}</span>
                            </p>
                          </Link>
                        </SidebarMenuSubButton>
                      </SidebarMenuSubItem>
                    );
                  })}
                </SidebarMenuSub>
              )}
            </div>
          );
        })}
      </SidebarMenu>
    </SidebarGroup>
  );
}
