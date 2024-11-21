// components/Card.tsx

"use client";

import React from "react";
import styles from "./Card.module.css";

interface CardProps {
  isFlipped: boolean;
  disableHover: boolean;
  frontLogoDataURL: string | null;
  backLogoDataURL: string | null;
  fullName: string;
  role: string;
  formattedNumber: string;
  email: string;
  website: string;
  address: string;
}

const Card: React.FC<CardProps> = ({
  isFlipped,
  disableHover,
  frontLogoDataURL,
  backLogoDataURL,
  fullName,
  role,
  formattedNumber,
  email,
  website,
  address,
}) => {
  return (
    <div
      className={`relative w-[336px] h-[192px] m-auto perspective-1000 ${styles.cardContainer}`}
    >
      <div
        className={`${
          styles.card
        } transform-gpu transition-transform duration-600 ${
          isFlipped ? styles.isFlipped : ""
        } ${disableHover ? styles.disableHover : ""}`}
      >
        {/* Front Face */}
        <div
          className={`absolute w-full h-full rounded-lg overflow-hidden shadow-lg ${styles.cardFace} ${styles.cardFaceFront}`}
        >
          <div
            className={`w-full h-full p-4 relative text-white ${styles.cardContent}`}
          >
            {/* QR Code */}
            {!isFlipped && (
              <div className="absolute left-10 top-14 z-10">
                <img
                  src={`https://api.qrserver.com/v1/create-qr-code/?size=120x120&data=${encodeURIComponent(
                    "https://zalient.me/username"
                  )}`}
                  alt="QR Code"
                  className="w-20 h-20"
                />
              </div>
            )}

            {!isFlipped && (
              <div className="absolute top-4 right-4 z-10">
                <img src={`/nfc/nfc.png`} alt="NFC Icon" className="w-6 h-6" />
              </div>
            )}
            {/* Front Logo */}
            {frontLogoDataURL && (
              <div className="absolute top-4 left-4 z-10">
                <img
                  src={frontLogoDataURL}
                  alt="Front Logo"
                  className="object-contain h-8 "
                />
              </div>
            )}
            {/* Full Name and Role */}
            <div className="absolute top-12 left-36">
              <span className={`text-md font-thin mb-1 text-left uppercase `}>
                {fullName}
                {role && (
                  <p className={`text-[10px] leading-none mt-[-2px] mb-2`}>
                    {role.charAt(0).toUpperCase() + role.slice(1)}
                  </p>
                )}
              </span>
              {address && (
                <div className="flex items-center text-[8px] mb-0.5 text-left">
                  <img
                    src="/nfc/location.png"
                    alt="Location Icon"
                    className="w-3 h-3 mr-1"
                  />
                  <span>{address}</span>
                </div>
              )}
              {/* Contact Number */}
              {formattedNumber && (
                <div className="flex items-center text-[8px] mb-0.5 text-left">
                  <img
                    src="/nfc/number.png"
                    alt="Number Icon"
                    className="w-3 h-3 mr-1"
                  />
                  <span>{formattedNumber}</span>
                </div>
              )}
              {/* Email */}
              {email && (
                <div className="flex items-center text-[8px] mb-0.5 text-left">
                  <img
                    src="/nfc/email.png"
                    alt="Email Icon"
                    className="w-3 h-3 mr-1"
                  />
                  <span>{email}</span>
                </div>
              )}
              {/* Website */}
              {website && (
                <div className="flex items-center text-[8px] mb-0.5 text-left">
                  <img
                    src="/nfc/website.png"
                    alt="Website Icon"
                    className="w-3 h-3 mr-1"
                  />
                  <span>{website}</span>
                </div>
              )}
              {/* Address */}
            </div>
          </div>
        </div>

        {/* Back Face */}
        <div
          className={`absolute w-full h-full rounded-lg overflow-hidden shadow-lg ${styles.cardFace} ${styles.cardFaceBack}`}
        >
          <div
            className={`w-full h-full p-4 relative text-white ${styles.cardContent}`}
          >
            {/* Back Logo */}
            {backLogoDataURL && (
              <div className="flex items-center justify-center h-full">
                <img
                  src={backLogoDataURL}
                  alt="Back Logo"
                  className="object-contain w-32 h-32 opacity-75 "
                />
              </div>
            )}

            <div className="absolute top-4 left-4 z-10">
              <img
                src={`/nfc/nfc.png`}
                alt="NFC Icon"
                className="w-6 h-6 transform scale-x-[-1]"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
