import React from "react";

export const metadata = {
  title: "Dashboard",
  description: "Dashboard page",
};
export default function VerifiedDashboardPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold">Welcome to Your Dashboard</h1>
      <p>You have successfully completed onboarding and are now verified!</p>
    </div>
  );
}