"use client";

import React from "react";
import Marquee from "react-fast-marquee";

interface Logo {
  src: string;
  alt: string;
}

const Hero: React.FC = () => {
  const logos: Logo[] = [
    { src: "/payments/Stripe.svg", alt: "Stripe" },
    { src: "/payments/Paypal.svg", alt: "PayPal" },
    { src: "/payments/Klarna.svg", alt: "Klarna" },
    { src: "/payments/Visa.svg", alt: "Visa" },
    { src: "/payments/Skrill.svg", alt: "Skrill" },
    { src: "/payments/Bitcoin.svg", alt: "Bitcoin" },
  ];

  return (
    <div className="relative w-full overflow-hidden lg:h-dvh lg:items-center">
      <div className="flex flex-col justify-between w-full h-full gap-8 px-6 mt-20 middle lg:flex-row lg:gap-0 lg:-mt-6">
        {/* Text Content */}
        <div className="flex flex-col justify-center h-full gap-6 lg:w-2/3 lg:max-w-xl">
          <div className="inline-block text-4xl font-medium lg:text-5xl">
            Smart NFC-Enabled Cards for Modern Networking
          </div>
          <p className="max-w-2xl text-sm opacity-50 lg:text-base">
            Revolutionize the way you share your portfolio with our NFC-enabled
            business cards. Just a tap, and people can instantly access your
            personalized portfolio link. Perfect for professionals and creators
            who want to leave a lasting impression.
          </p>
          <div className="z-50 flex gap-4 -top-4 md:top-40">
            <button className="inline-flex items-center justify-center px-4 py-1 text-sm text-black transition duration-300 bg-white select-none whitespace-nowrap rounded-xl focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 active:scale-95 hover:bg-black/75 dark:hover:bg-white/80 h-9">
              Order Your NFC Card
            </button>
            <button className="inline-flex items-center justify-center px-4 py-1 text-sm transition duration-300 border select-none whitespace-nowrap rounded-xl focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 active:scale-95 border-white/15 hover:bg-white/10 h-9">
              Demo Profile
            </button>
          </div>
          {/* Marquee Section */}
          <div className="mt-10">
            <div className="flex overflow-hidden [mask-image:linear-gradient(to_right,transparent_0,_black_128px,_black_calc(100%-128px),transparent_100%)]">
              <Marquee pauseOnHover={true} autoFill={true} speed={50}>
                {logos.map((logo, index) => (
                  <img
                    key={index}
                    src={logo.src}
                    alt={logo.alt}
                    className="object-contain w-auto h-4 mx-6"
                    style={{ color: "transparent" }}
                  />
                ))}
              </Marquee>
            </div>
          </div>
        </div>
        {/* Image Section */}
        <div className="w-full lg:w-1/3 h-[28rem] lg:h-full relative">
          <img
            alt="hero"
            fetchPriority="high"
            decoding="async"
            data-nimg="fill"
            className="object-contain object-center h-full rounded-2xl lg:object-right"
            style={{
              position: "absolute",
              height: "100%",
              width: "100%",
              left: "0",
              top: "0",
              right: "0",
              bottom: "0",
            }}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            src="home/banner.webp"
          />
        </div>
      </div>
      {/* Video Background */}
      <div className="absolute top-0 w-full h-[calc(100%+5rem)] -z-50 pt-20">
        <video
          autoPlay
          muted
          playsInline
          preload="auto"
          className="absolute object-cover w-full h-full blur-2xl"
        >
          <source src="/home/hero.mp4" type="video/mp4" />
        </video>
        <div className="absolute top-0 left-0 w-full h-full opacity-100 pointer-events-none bg-gradient-to-b from-transparent to-black"></div>
      </div>
    </div>
  );
};

export default Hero;
