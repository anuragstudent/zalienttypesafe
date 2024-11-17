"use client";

import React from "react";
import Card from "@/components/custom-card";

interface CardData {
  imageSrc: string;
  title: string;
  description: string;
}

const Body: React.FC = () => {
  const cards: CardData[] = [
    {
      imageSrc: "/home/analytics.webp",
      title: "Enhanced Networking",
      description:
        "Revolutionize your connections with our NFC-enabled cards. Share your profile with a simple tap.",
    },
    {
      imageSrc: "/home/uiux.webp",
      title: "Seamless Design",
      description:
        "Our NFC cards boast a sleek, modern design that ensures you leave a lasting impression.",
    },
    {
      imageSrc: "/home/support.webp",
      title: "24/7 Assistance",
      description:
        "We’re here to help anytime. Get support whenever you need assistance with your NFC card.",
    },
    {
      imageSrc: "/home/security.webp",
      title: "Data Security",
      description:
        "Your information is safe with us. NFC cards are designed to provide secure and instant sharing.",
    },
  ];

  return (
    <div className="relative w-full h-full mx-auto middle">
      {/* Left SVG Section */}
      <div className="hidden lg:block absolute -left-4 md:-left-[6.5rem] top-3">
        <div
          className="ml-[31px]"
          style={{
            willChange: "auto",
            boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
          }}
        >
          <div
            className="w-2 h-2 border border-white rounded-full"
            style={{
              willChange: "auto",
              backgroundColor: "white",
            }}
          ></div>
        </div>
        <svg
          viewBox="0 0 20 4698"
          width="20"
          height="4698"
          className="block ml-4"
          aria-hidden="true"
        >
          <path
            d="M 1 0V -36 l 18 24 V 9396 l -18 24V 4698"
            fill="none"
            stroke="#9091A0"
            strokeOpacity="0.16"
          ></path>
          <path
            d="M 1 0V -36 l 18 24 V 9396 l -18 24V 4698"
            fill="none"
            stroke="url(#gradient)"
            strokeWidth="1.25"
            className="motion-reduce:hidden"
          ></path>
          <defs>
            <linearGradient
              id="gradient"
              gradientUnits="userSpaceOnUse"
              x1="0"
              x2="0"
              y1="1"
              y2="1"
            >
              <stop stopColor="#18CCFC" stopOpacity="0"></stop>
              <stop stopColor="#18CCFC"></stop>
              <stop offset="0.325" stopColor="#6344F5"></stop>
              <stop offset="1" stopColor="#AE48FF" stopOpacity="0"></stop>
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* Main Content */}
      <div className="flex flex-col gap-20">
        {/* Section: NFC Card Benefits */}
        <div className="flex flex-col justify-center w-full gap-10 px-6 middle lg:gap-20">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center">
            <div className="flex border bg-white/5 border-white/10 items-center justify-center w-16 h-16 p-2.5 rounded-lg">
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
                className="text-blue-100 lucide lucide-thumbs-up"
              >
                <path d="M7 10v12"></path>
                <path d="M15 5.88 14 10h5.83a2 2 0 0 1 1.92 2.56l-2.33 8A2 2 0 0 1 17.5 22H4a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2h2.76a2 2 0 0 0 1.79-1.11L12 2a3.13 3.13 0 0 1 3 3.88Z"></path>
              </svg>
            </div>
            <div className="flex flex-col gap-10">
              <div className="text-4xl flex flex-col gap-0.5 font-medium">
                NFC Cards: Modern Networking Made Easy
                <p className="w-2/3 mt-4 text-sm font-normal opacity-50 lg:text-base lg:w-full lg:mt-0 lg:text-nowrap">
                  Share your portfolio instantly and seamlessly with NFC-enabled
                  cards.
                </p>
              </div>
            </div>
          </div>

          {/* NFC Card Sections */}
          <div className="relative w-full flex flex-col lg:flex-row items-center gap-8 lg:h-[800px]">
            <div className="flex flex-col h-full gap-8 lg:w-1/3">
              <div className="h-96 lg:h-full">
                <Card
                  imageSrc={cards[0].imageSrc}
                  title={cards[0].title}
                  description={cards[0].description}
                />
              </div>
            </div>
            <div className="flex flex-col h-full gap-8 lg:w-1/3">
              {cards.slice(1, 3).map((card, index) => (
                <div className="h-96 lg:h-1/2" key={index}>
                  <Card
                    imageSrc={card.imageSrc}
                    title={card.title}
                    description={card.description}
                  />
                </div>
              ))}
            </div>
            <div className="flex flex-col h-full gap-8 lg:w-1/3">
              <div className="h-96 lg:h-full">
                <Card
                  imageSrc={cards[3].imageSrc}
                  title={cards[3].title}
                  description={cards[3].description}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Body;
