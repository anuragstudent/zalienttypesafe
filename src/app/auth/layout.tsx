"use client";

import { ReactNode, FC } from "react";
import dynamic from "next/dynamic";

interface AuthLayoutProps {
  children: ReactNode;
}

const AuthLayout: FC<AuthLayoutProps> = ({ children }) => {
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
          <LazyBackgroundVideo src="/home/banner-video.mp4" />
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
};

// Lazy-loaded Video Component
const LazyBackgroundVideo = dynamic<{ src: string }>(
  async () => {
    const VideoComponent: FC<{ src: string }> = ({ src }) => (
      <video
        autoPlay
        playsInline
        muted
        loop
        preload="metadata"
        className="absolute top-0 left-0 object-cover w-full h-full rounded-xl"
      >
        <source src={src} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    );

    VideoComponent.displayName = "LazyBackgroundVideo"; // Adding a display name
    return VideoComponent;
  },
  { ssr: false } // Prevent server-side rendering
);

// Set a display name for the main component to avoid ESLint warnings
AuthLayout.displayName = "AuthLayout";

export default AuthLayout;
