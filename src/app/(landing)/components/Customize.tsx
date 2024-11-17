"use client";

import React from "react";
import Image from "next/image";

const Customize: React.FC = () => {
  return (
    <div className="relative w-full h-full mx-auto middle">
      <div className="relative flex flex-col gap-10 px-6 lg:gap-20">
        {/* Header Section */}
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center">
          <div className="border bg-white/5 border-white/10 flex items-center justify-center w-16 h-16 p-2.5 rounded-lg">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="30"
              height="30"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-app-window-mac"
            >
              <rect width="20" height="16" x="2" y="4" rx="2"></rect>
              <path d="M6 8h.01"></path>
              <path d="M10 8h.01"></path>
              <path d="M14 8h.01"></path>
            </svg>
          </div>
          <div className="flex flex-col gap-10">
            <div className="text-4xl flex flex-col gap-0.5 font-medium">
              Customize profile like never before.
              <p className="w-2/3 mt-4 text-sm font-normal opacity-50 lg:text-base lg:w-full lg:mt-0 lg:text-nowrap">
                Get your NFC card tailored exactly to your style and
                preferences.
              </p>
            </div>
          </div>
        </div>

        {/* Main Section */}
        <div className="relative flex items-center h-[40rem] lg:h-[28rem] rounded-xl">
          <div className="flex flex-col items-center w-full h-full gap-8 lg:flex-row">
            {/* Image Section */}
            <div className="relative z-10 w-full h-full lg:w-1/2">
              <Image
                alt="editor"
                fetchPriority="high"
                decoding="async"
                fill
                className="object-contain object-center"
                src="/home/editor.png"
              />
            </div>

            {/* Text Content */}
            <div className="flex flex-col gap-6">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="30"
                height="30"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-code"
              >
                <polyline points="16 18 22 12 16 6"></polyline>
                <polyline points="8 6 2 12 8 18"></polyline>
              </svg>
              <div className="inline-block text-3xl font-medium">
                Personalize Your NFC Card
              </div>
              <p className="max-w-xl text-sm opacity-50 lg:text-base">
                Use our intuitive editor to design your NFC card. Adjust colors,
                styles, and add your logo or profile for a unique touch.
              </p>
              <div className="z-50 flex gap-4 -top-4 lg:top-40">
                <button className="inline-flex items-center justify-center px-4 py-1 text-sm text-black transition duration-300 bg-white select-none whitespace-nowrap rounded-xl focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 active:scale-95 hover:bg-black/75 dark:hover:bg-white/80 h-9">
                  Start Customizing
                </button>
                <button className="inline-flex items-center justify-center px-4 py-1 text-sm transition duration-300 border select-none whitespace-nowrap rounded-xl focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 active:scale-95 border-white/15 hover:bg-white/10 h-9">
                  Learn More
                </button>
              </div>
            </div>
          </div>

          {/* Background Gradient */}
          <div className="absolute top-0 w-full h-full -z-10 blur-bg bg-gradient-to-tr from-indigo-800 to-black"></div>
        </div>
      </div>
    </div>
  );
};

export default Customize;
