"use client";

import React, { useRef } from "react";
import { QRCodeCanvas } from "qrcode.react";
import html2canvas from "html2canvas";

interface CardPreviewProps {
  brandName: string;
  contactNumber?: string;
  address?: string;
  frontLogo?: File | null;
  backLogo?: File | null;
}

export default function CardPreview({
  brandName,
  contactNumber,
  address,
  frontLogo,
  backLogo,
}: CardPreviewProps) {
  const frontRef = useRef<HTMLDivElement>(null);
  const backRef = useRef<HTMLDivElement>(null);

  // Function to download card images
  const downloadCards = async () => {
    if (frontRef.current && backRef.current) {
      // Download front side
      const frontCanvas = await html2canvas(frontRef.current, {
        backgroundColor: null,
      });
      const frontDataUrl = frontCanvas.toDataURL("image/png");
      const frontLink = document.createElement("a");
      frontLink.href = frontDataUrl;
      frontLink.download = "card_front.png";
      frontLink.click();

      // Download back side
      const backCanvas = await html2canvas(backRef.current, {
        backgroundColor: null,
      });
      const backDataUrl = backCanvas.toDataURL("image/png");
      const backLink = document.createElement("a");
      backLink.href = backDataUrl;
      backLink.download = "card_back.png";
      backLink.click();
    }
  };

  // Format contact number
  const formattedNumber = contactNumber ? `+977 ${contactNumber}` : "";

  return (
    <div className="flex flex-col items-center gap-4">
      {/* Card Previews */}
      <div className="flex flex-col md:flex-row gap-8">
        {/* Front Side */}
        <div
          ref={frontRef}
          className="relative w-[320px] h-[200px] rounded-lg overflow-hidden shadow-lg card-metallic text-white"
        >
          {/* Content */}
          <div className="relative p-4 flex flex-col h-full">
            {/* Front Logo */}
            {frontLogo ? (
              <div className="mb-2">
                <img
                  src={URL.createObjectURL(frontLogo)}
                  alt="Front Logo"
                  className="object-contain w-20 h-20"
                />
              </div>
            ) : null}
            {/* Brand Name */}
            <h2 className="text-xl font-semibold">{brandName}</h2>
            {/* Contact Info */}
            {formattedNumber && <p>{formattedNumber}</p>}
            {address && <p>{address}</p>}
            {/* QR Code */}
            <div className="mt-auto">
              <QRCodeCanvas
                value={`https://zalient.me/username`}
                size={64}
                bgColor="#ffffff"
                fgColor="#000000"
                level="H"
              />
            </div>
          </div>
        </div>
        {/* Back Side */}
        <div
          ref={backRef}
          className="relative w-[320px] h-[200px] rounded-lg overflow-hidden shadow-lg card-metallic text-white"
        >
          {/* Back Logo */}
          <div className="flex items-center justify-center h-full">
            {backLogo ? (
              <img
                src={URL.createObjectURL(backLogo)}
                alt="Back Logo"
                className="object-contain w-32 h-32 opacity-75"
              />
            ) : null}
          </div>
        </div>
      </div>
      {/* Download Button */}
      <button
        onClick={downloadCards}
        className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        Download Card Images
      </button>
    </div>
  );
}
