"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";

// Define navigation item type
interface NavItem {
  title: string;
  url: string;
}

// Navigation items
const navItems: NavItem[] = [
  { title: "About", url: "#" },
  { title: "Features", url: "#" },
  { title: "Documentation", url: "#" },
  { title: "Support", url: "#" },
];

export default function Header() {
  const [isScrolled, setIsScrolled] = useState<boolean>(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
    if (!isSidebarOpen) {
      document.body.style.overflow = "hidden"; // Prevent scrolling when sidebar is open
    } else {
      document.body.style.overflow = ""; // Restore scrolling
    }
  };

  return (
    <div
      className={`h-[80px] fixed top-0 flex items-center px-6 w-full z-[99] transition duration-500 ${
        isSidebarOpen
          ? "bg-transparent" // No backdrop blur when sidebar is open
          : isScrolled
          ? "bg-black/90" // Backdrop blur only when scrolled and sidebar is closed
          : "bg-transparent" // Transparent otherwise
      }`}
    >
      <div className="flex items-center justify-between w-full middle">
        {/* Sidebar Trigger for Mobile */}
        <div className="sm:hidden">
          <button
            className="text-2xl focus:outline-none"
            aria-label="Open menu"
            onClick={toggleSidebar}
          >
            ☰
          </button>
        </div>

        {/* Logo */}
        <div className="flex flex-row items-center gap-4 p-3 bg-white/10 rounded-xl">
          <Image
            alt="logo"
            width={40}
            height={40}
            src="/icon.png"
            className="h-[20px] w-[20px] object-contain"
          />
        </div>

        {/* Desktop Navigation */}
        <div className="hidden gap-6 sm:flex">
          <nav>
            <ul className="flex items-center gap-6">
              {navItems.map((item) => (
                <li key={item.title}>
                  <Button asChild variant="ghost">
                    <Link href={item.url}>{item.title}</Link>
                  </Button>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        {/* Desktop Call-to-Actions */}
        <div className="items-center hidden gap-2 sm:flex">
          <Link href="/auth/login">
            <Button variant="outline">Login</Button>
          </Link>
          <Link href="/auth/register">
            <Button variant="default">Get Started</Button>
          </Link>
        </div>
      </div>

      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 h-full w-3/4 sm:max-w-sm z-[100] bg-white/80 dark:bg-black/80 backdrop-blur-xl border-r border-white/15 shadow-lg transform transition-all duration-500 ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
        style={{
          WebkitBackdropFilter: "blur(16px)", // iOS-specific
          backdropFilter: "blur(16px)", // Other browsers
        }}
      >
        {/* Sidebar Header */}
        <div className="flex items-center justify-between p-4 border-b dark:border-gray-800">
          <h2 className="text-lg font-semibold text-black dark:text-white">
            Menu
          </h2>
          <button
            className="text-xl text-black focus:outline-none dark:text-white"
            aria-label="Close menu"
            onClick={toggleSidebar}
          >
            ✕
          </button>
        </div>

        {/* Sidebar Navigation */}
        <nav className="p-4">
          <ul className="flex flex-col gap-2">
            {navItems.map((item) => (
              <li key={item.title}>
                <Button
                  asChild
                  variant="ghost"
                  className="w-full hover:bg-black/5 dark:hover:bg-white/10"
                  onClick={toggleSidebar}
                >
                  <Link href={item.url}>{item.title}</Link>
                </Button>
              </li>
            ))}
          </ul>
        </nav>

        {/* Sidebar Call-to-Actions */}
        <div className="p-4 border-t dark:border-gray-800">
          <Link href="/auth/login">
            <Button variant="outline" className="w-full mb-2">
              Login
            </Button>
          </Link>
          <Link href="/auth/register">
            <Button
              variant="default"
              className="w-full"
              onClick={toggleSidebar}
            >
              Get Started
            </Button>
          </Link>
        </div>
      </div>

      {/* Sidebar Overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-[99] transition-opacity duration-500 ease-in-out"
          onClick={toggleSidebar}
        />
      )}
    </div>
  );
}
