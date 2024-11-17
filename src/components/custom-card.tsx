"use client";

import React, { useState, MouseEvent } from "react";
import Image from "next/image";
import Link from "next/link";

interface CardProps {
  href?: string;
  imageSrc: string;
  title: string;
  description: string;
}

const Card: React.FC<CardProps> = ({
  href = "",
  imageSrc,
  title,
  description,
}) => {
  const [gradientPosition, setGradientPosition] = useState({
    x: "-200px",
    y: "-200px",
  });

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setGradientPosition({ x: `${x}px`, y: `${y}px` });
  };

  const handleMouseLeave = () => {
    setGradientPosition({ x: "-200px", y: "-200px" });
  };

  return (
    <div
      className="relative h-full group"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div className="z-10 h-full">
        <Link href={href}>
          <div className="relative z-10 flex flex-col justify-between h-full transition-all duration-500 border cursor-pointer group rounded-xl border-black/10 dark:border-white/10">
            <div className="relative w-full h-full duration-500 gradient-mask-b-70">
              <Image
                alt={title}
                src={imageSrc}
                fill
                className="top-0 object-cover object-top"
              />
            </div>
            <div className="z-50 flex flex-col justify-end gap-2 p-6 h-fit">
              <div className="flex items-center gap-2 text-xl font-medium">
                {title}
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
                  className="hidden group-hover:block"
                >
                  <path d="m9 18 6-6-6-6"></path>
                </svg>
              </div>
              <p className="text-sm opacity-50">{description}</p>
            </div>
          </div>
        </Link>
      </div>
      <div
        className="absolute transition-opacity duration-300 opacity-0 pointer-events-none -inset-px rounded-xl group-hover:opacity-100"
        style={{
          opacity: 0.8,
          background: `radial-gradient(200px at ${gradientPosition.x} ${gradientPosition.y}, rgb(38, 38, 38), transparent 100%)`,
        }}
      ></div>
    </div>
  );
};

export default Card;
