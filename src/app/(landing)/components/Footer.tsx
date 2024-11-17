"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";

const Footer: React.FC = () => {
  return (
    <div className="pt-12 middle">
      {/* Main Call to Action Section */}
      <div className="relative flex flex-col items-center justify-center w-full gap-10 p-8 mb-40 text-white dark rounded-xl md:px-6">
        <div className="w-full text-4xl font-medium text-center lg:text-8xl">
          All Set. Let&apos;s Go!
        </div>
        <p className="w-full max-w-2xl text-sm text-center opacity-50 lg:text-base">
          Revolutionize networking with NFC cards. Share your portfolio with a
          single tap, and launch your professional journey effortlessly.
        </p>
        <div>
          <Link href="/auth/register" legacyBehavior>
            <a className="inline-flex items-center justify-center px-4 py-1 text-sm text-black transition duration-300 bg-white select-none whitespace-nowrap rounded-xl focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 active:scale-95 hover:bg-black/75 dark:hover:bg-white/80 h-9">
              Get Started
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
          </Link>
        </div>
      </div>

      {/* Footer Section */}
      <div className="relative flex flex-col w-full gap-8 px-6 py-10 middle lg:px-0 lg:flex-row lg:justify-between">
        {/* Background Video */}
        <video
          autoPlay
          playsInline
          muted
          loop
          preload="auto"
          className="bottom-0 object-cover -z-50 h-[600px] left-0 w-full absolute gradient-mask-t-60-d"
        >
          <source src="/home/footer.mp4" type="video/mp4" />
        </video>

        {/* Content */}
        <div className="flex flex-col items-center justify-between w-full gap-8 px-6 lg:flex-row lg:gap-0">
          {/* Logo Section */}
          <div className="flex flex-col items-center justify-center w-full gap-4 lg:flex-row lg:justify-start">
            <Link href="/" legacyBehavior>
              <a className="flex flex-row items-center gap-4 p-3 bg-white/10 backdrop-blur-xl rounded-xl">
                <Image
                  alt="logo"
                  fetchPriority="high"
                  width={40}
                  height={40}
                  decoding="async"
                  className="h-[14px] w-[14px] object-contain"
                  src="/icon.png"
                />
              </a>
            </Link>
            <div className="flex flex-col">
              <div className="hidden text-sm font-medium lg:block">NFC Hub</div>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="flex justify-center w-full gap-8 lg:justify-end">
            <Link href="/about" legacyBehavior>
              <a className="text-xs hover:underline underline-offset-4">
                About
              </a>
            </Link>
            <Link href="/terms" legacyBehavior>
              <a className="text-xs hover:underline underline-offset-4">
                Terms of Service
              </a>
            </Link>
            <Link href="/contact" legacyBehavior>
              <a className="text-xs hover:underline underline-offset-4">
                Contact
              </a>
            </Link>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default Footer;
