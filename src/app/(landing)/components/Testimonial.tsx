"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";

const Testimonial: React.FC = () => {
  return (
    <div className="relative w-full h-full mx-auto middle">
      <div className="relative flex flex-col gap-10 px-6 lg:gap-20">
        {/* Section Header */}
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
              className="lucide lucide-message-square"
            >
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
            </svg>
          </div>
          <div className="flex flex-col gap-10">
            <div className="text-4xl flex flex-col gap-0.5 font-medium">
              Fuel Growth with Feedback
              <p className="w-2/3 mt-4 text-sm font-normal opacity-50 lg:text-base lg:w-full lg:mt-0 lg:text-nowrap">
                Gather insights and suggest features that can help grow your
                business with NFC cards.
              </p>
            </div>
          </div>
        </div>

        {/* Main Testimonial Section */}
        <div className="relative flex items-center h-[40rem] lg:h-[28rem] rounded-xl">
          <div className="flex flex-col items-center w-full h-full gap-8 lg:flex-row">
            {/* Image Section */}
            <div className="relative z-10 w-full h-full lg:w-1/2">
              <Image
                alt="Feedback"
                fetchPriority="high"
                decoding="async"
                fill
                className="object-contain object-center"
                src="/home/feedback.webp"
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
                className="lucide lucide-sparkles"
              >
                <path d="M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z"></path>
                <path d="M20 3v4"></path>
                <path d="M22 5h-4"></path>
                <path d="M4 17v2"></path>
                <path d="M5 18H3"></path>
              </svg>
              <div className="inline-block text-3xl font-medium">
                360° Feedback Ecosystem
              </div>
              <p className="max-w-xl text-sm opacity-50 lg:text-base">
                Gather detailed feedback from customers and share insightful
                suggestions with us to improve the platform.
              </p>
              <div className="z-50 flex gap-4 -top-4 lg:top-40">
                <a
                  className="inline-flex items-center justify-center px-4 py-1 text-sm text-black transition duration-300 bg-white select-none whitespace-nowrap rounded-xl focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 active:scale-95 hover:bg-black/75 dark:hover:bg-white/80 h-9"
                  href="/contact"
                >
                  Provide Feedback
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="ml-2 lucide lucide-chevron-right"
                  >
                    <path d="m9 18 6-6-6-6"></path>
                  </svg>
                </a>
                <Link
                  className="inline-flex items-center justify-center px-4 py-1 text-sm transition duration-300 border select-none whitespace-nowrap rounded-xl focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 active:scale-95 border-white/15 hover:bg-white/10 h-9"
                  href="/auth/register"
                >
                  Sign Up
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="ml-2 lucide lucide-chevron-right"
                  >
                    <path d="m9 18 6-6-6-6"></path>
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Testimonial;
