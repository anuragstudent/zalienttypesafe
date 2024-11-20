import React from "react";

export const metadata = {
  title: "Onboarding",
  description: "Onboarding page",
};

export default function OnboardingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
