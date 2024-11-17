"use client";

import { ReactNode } from "react";

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex max-h-screen min-h-screen flex-row bg-[--card-background-dark]">
      {/* Left Side: Form Section */}
      <div className="flex items-center justify-center w-full px-4 md:w-1/2">
        <div className="w-full max-w-md">{children}</div>
      </div>

      {/* Right Side: Image/Video Section */}
      <div className="items-center justify-center hidden md:flex md:w-1/2 bg-border/40">
        <div className="relative w-full h-full overflow-hidden rounded-xl">
          {/* Background Video */}
          <video
            autoPlay
            playsInline
            muted
            loop
            preload="auto"
            className="absolute top-0 left-0 object-cover w-full h-full rounded-xl"
          >
            <source src="/home/banner-video.mp4" type="video/mp4" />
          </video>
          {/* Overlay Content */}
          <div className="relative z-10 flex items-center justify-center h-full">
            <div className="px-4 text-center text-white">
              <h2 className="text-2xl font-bold">Welcome to Zalient</h2>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
