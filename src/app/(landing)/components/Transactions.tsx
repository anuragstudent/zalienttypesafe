"use client";

import React from "react";
import Image from "next/image";

const Transactions: React.FC = () => {
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
              className="lucide lucide-check"
            >
              <path d="M20 6 9 17l-5-5"></path>
            </svg>
          </div>
          <div className="flex flex-col gap-10">
            <div className="text-4xl flex flex-col gap-0.5 font-medium">
              Provide Seamless Transactions
              <p className="w-2/3 mt-4 text-sm font-normal opacity-50 lg:text-base lg:w-full lg:mt-0 lg:text-nowrap">
                Ensure smooth payment experiences with our NFC-enabled
                technology.
              </p>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="relative flex flex-col-reverse lg:flex-row items-center lg:p-20 mt-6 lg:mt-0 h-[40rem] lg:h-[28rem] rounded-xl">
          {/* Left Section */}
          <div className="z-10 w-full lg:w-1/2">
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
                className="lucide lucide-nfc"
              >
                <path d="M6 8.32a7.43 7.43 0 0 1 0 7.36"></path>
                <path d="M9.46 6.21a11.76 11.76 0 0 1 0 11.58"></path>
                <path d="M12.91 4.1a15.91 15.91 0 0 1 .01 15.8"></path>
                <path d="M16.37 2a20.16 20.16 0 0 1 0 20"></path>
              </svg>
              <div className="inline-block text-3xl font-medium">
                Accept Faster Payments
              </div>
              <p className="max-w-xl text-sm opacity-50 lg:text-base">
                Revolutionize your payment processes with NFC-enabled cards,
                making every transaction faster and more secure.
              </p>
            </div>
          </div>

          {/* Video Section */}
          <div className="lg:absolute lg:overflow-hidden lg:right-0 lg:h-[28rem] h-full w-full lg:w-1/2 gradient-mask-l-60-d lg:scale-[1.6] lg:-bottom-10">
            <div className="h-full gradient-mask-t-10">
              <video
                autoPlay
                playsInline
                loop
                muted
                preload="auto"
                className="object-cover w-full h-full gradient-mask-b-80"
              >
                <source src="/home/payments.mp4" type="video/mp4" />
              </video>
            </div>
          </div>
        </div>

        {/* Second Section */}
        <div className="relative flex items-center h-[40rem] lg:h-[28rem] rounded-xl">
          <div className="flex flex-col items-center w-full h-full gap-8 lg:flex-row">
            {/* Image Section */}
            <div className="relative z-10 w-full h-full lg:w-1/2">
              <Image
                alt="payments2"
                fetchPriority="high"
                decoding="async"
                fill
                className="object-contain object-center lg:scale-125"
                src="/home/payments2.png"
              />
            </div>

            {/* Text Content */}
            <div className="flex flex-col w-full gap-6 lg:w-1/2">
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
                className="lucide lucide-dollar-sign"
              >
                <line x1="12" x2="12" y1="2" y2="22"></line>
                <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
              </svg>
              <div className="inline-block text-3xl font-medium">
                Multiple Payment Gateways
              </div>
              <p className="max-w-xl text-sm opacity-50 lg:text-base">
                Compatible with all major payment systems, allowing your
                customers to pay seamlessly using their preferred methods.
              </p>
            </div>
          </div>
          {/* Background Gradient */}
          <div className="absolute top-0 w-full h-full -z-10 blur-bg bg-gradient-to-tr from-green-800 to-black"></div>
        </div>

        {/* Third Section */}
        <div className="relative flex flex-col-reverse lg:flex-row items-center lg:p-20 mt-6 lg:mt-0 h-[40rem] lg:h-[28rem] rounded-xl">
          {/* Left Section */}
          <div className="z-10 w-full lg:w-1/2">
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
                className="lucide lucide-plus"
              >
                <path d="M5 12h14"></path>
                <path d="M12 5v14"></path>
              </svg>
              <div className="inline-block text-3xl font-medium">
                Add Payment Methods
              </div>
              <p className="max-w-xl text-sm opacity-50 lg:text-base">
                Easily integrate new payment methods with our flexible
                customization options to suit your business needs.
              </p>
            </div>
          </div>

          {/* Video Section */}
          <div className="lg:absolute lg:overflow-hidden lg:right-0 lg:h-[28rem] h-full w-full lg:w-1/2 gradient-mask-l-60-d lg:scale-[1.6] lg:-bottom-10">
            <div className="h-full gradient-mask-t-10">
              <video
                autoPlay
                playsInline
                loop
                muted
                preload="auto"
                className="object-cover w-full h-full gradient-mask-b-80"
              >
                <source src="/home/payments3.mp4" type="video/mp4" />
              </video>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Transactions;
