"use client";

import React, { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { requestHandler } from "@/utils/client/requestHandler";
import { toast } from "sonner";
import { AppSidebar } from "@/components/app-sidebar";
import {
  SidebarProvider,
  SidebarInset,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import { UserProvider, useUser, User } from "@/context/UserContext";

// Main layout wrapper
export default function VerifiedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <UserProvider>
      <VerifiedContent>{children}</VerifiedContent>
    </UserProvider>
  );
}

// Handles loading and fetching user data
function VerifiedContent({ children }: { children: React.ReactNode }) {
  const [isLoading, setIsLoading] = useState(true);
  const { user, setUser } = useUser();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    async function fetchUserData() {
      try {
        const data = await requestHandler<{ user: User }>({
          method: "GET",
          url: "/api/getUserData",
          protected: true,
        });
        setUser(data.user);

        if (!data.user.verified) {
          router.replace("/dashboard/onboarding");
        }
      } catch (error) {
        toast.error((error as Error).message || "Failed to fetch user data");
        router.replace("/auth/login");
      } finally {
        setIsLoading(false);
      }
    }

    fetchUserData();
  }, [router, setUser]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <img
          src="/icon.png"
          alt="Logo"
          className="h-12 w-auto animate-bounce"
        />
      </div>
    );
  }

  if (!user || !user.verified) {
    return null; // Avoid rendering if user is not available or verified
  }

  // Generate breadcrumbs based on pathname
  const pathSegments = pathname.split("/").filter((segment) => segment);

  const breadcrumbs = pathSegments.map((segment, index) => {
    const href = "/" + pathSegments.slice(0, index + 1).join("/");
    const isLast = index === pathSegments.length - 1;
    const isFirst = index === 0;

    return (
      <React.Fragment key={href}>
        <BreadcrumbItem>
          {isFirst ? (
            <BreadcrumbPage className="text-muted-foreground">
              {segment.charAt(0).toUpperCase() + segment.slice(1)}
            </BreadcrumbPage>
          ) : isLast ? (
            <BreadcrumbLink href={href}>
              {segment.charAt(0).toUpperCase() + segment.slice(1)}
            </BreadcrumbLink>
          ) : (
            <BreadcrumbLink href={href}>
              {segment.charAt(0).toUpperCase() + segment.slice(1)}
            </BreadcrumbLink>
          )}
        </BreadcrumbItem>
        {!isLast && <BreadcrumbSeparator />}
      </React.Fragment>
    );
  });

  return (
    <SidebarProvider>
      <AppSidebar user={user} />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 h-4" />
            <Breadcrumb>
              <BreadcrumbList>{breadcrumbs}</BreadcrumbList>
            </Breadcrumb>
          </div>
        </header>
        <main className="flex flex-1 flex-col gap-4 pt-0">{children}</main>
      </SidebarInset>
    </SidebarProvider>
  );
}
