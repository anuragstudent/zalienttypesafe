// components/Card.tsx

"use client";

import React from "react";
import styles from "./Card.module.css";
import { QRCode } from "react-qrcode-logo";

// Example Base64 images (Replace these with your actual Base64 strings)
const NFC_ICON_BASE64 =
  "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";
const LOCATION_ICON_BASE64 =
  "iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAACXBIWXMAAAsTAAALEwEAmpwYAAACa0lEQVR4nO2ZO2sVQRSAJz5QMYpIJIqCIAqCgqlM/AF2ol3UylqwUsHCQiIh2EliYWJ+QQot7MRG8RVFtAloq4RgjIJilBtfnxzuEcI1LGfWM7N7xQ8Glt3lDB8zc3bOTgj/+RNgHXAcuAY8Ad4CX7XJ9WN9dkzeDXUD2AJcBT5jR94dB3bWQWAVcBGYpzwyWpckVqhIogu4ix8Pgc25JfYCr/HnlcTOJdGdSGKxTHdqidU6BVLzIOma0YWdi6GUKfZvslMsC8COFCLyncjNmLdEJ/CpApF56dtTRLYdMTSAYaAXWKtNrkf0WQz9niKyP7IyDewriNWj71gZ9RSRDaCFRpFEi4x1ZCY9ReaMnQ5HxLxijDnrKSKp0ML+iJh9xpgNTxHrNOiMzIQWvniKvEkgst4Yc8ZT5EWFU2vKU+SmsdORBIv9uqfIkLFTWUs9xvRrTSADniL92JkukinxQTzsKbIJ+BHR+YJOnT7NTtIO6D3rSAjfJCm4iajMc/Jzz1WigqLqN2dTiOwmLz+B7e4iKvMso8idJBIqcjKjyNGUIpJ9PmSQmAFWJhNRmcsZRM4nlVCRbSXK1Rg+AhuSi6jMaEKRwSwSKrI10T+u98DGbCIqM5BA5FRWCRVZ4/wz+2XyTFUgc8JR5FAlEiqyDHjqIHG7MomW+kKOz8oiZ4m7Qh3AXkEuxelQF2geik6VkJDj6uWhTtCsBr9HSMjuYE+oI8BghMiZUFeAFcB9g8QtyXihztDcVL4rkJiVY7zQDgBHtFRtRdbQwdBOABeWEDkX2g2gA5hYJHFD7oV2hGZpPAk8cj3UDP8wvwAJyd2FGPUONgAAAABJRU5ErkJggg==";
const NUMBER_ICON_BASE64 =
  "iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAACXBIWXMAAAsTAAALEwEAmpwYAAACD0lEQVR4nO3ZzYtNYRzA8R/GexbyMuVtZeEf8LKgplhMohQLjWJFsbPzDyiJ7ayVl8U0WBApWU2YLMxsFCI7QgxGRmk+ut2z0DTDPed67n1mup/1qXu/99xzn+f53YiOjrkNG3AcAxjBV7zBGSyMnGE+9uAWJs3sIdZGbjAPh/FK456hO3KBHRhWzQhWtDtgCc7hl+bcRVe7Irbiuf/nYjsiTmLC/zWJ3lYFLMNl6Qy1IqK7iQe6UWOpIzbjhfQep4zYhU8tiBjD9lQRPfjWgog72JgqYi9+JA74jBNJAoqIg/iZOGIw6fYE+ypEvC32WdcbuPYdDiULKCJ2V/g6DWHdlH3XoxmuHcDq1BE7MV4yonYHFs+wlT+GJ/iOp9ifNKB44S0VfmKvtG2jN53arcbLkhH9tU89cqG+dyq77TgbucGluRBxqmREf+RG/VBU5jxxLatn4o/jae3Q36h7WBS5wYUSEbV1YGnkRn3VbXRQ8B6bItO503CJu9EXOUKfcm5EbtCF18rriZyony+qTgEXRC7wQHVHI6PR/mSWk40yiv8nmjEeOVA/lTVjNHKA0SZDDkQO8KWJiKuRC9XWj5oPWBO5wOmKIWlHNhVX9fslIwYjR1hZrNKN+JjVH5RTYVVxvviXI5E7LMfNv0TcjtlCfQp4fpptS20yvj5mG/QWM9qJ4sC1rd3vqaMjWuM3bBJQsMfD4T4AAAAASUVORK5CYII=";
const EMAIL_ICON_BASE64 =
  "iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAACXBIWXMAAAsTAAALEwEAmpwYAAABA0lEQVR4nO2UPW/CMBBAjw9VSIiFqRK/JmLu1JGlsHZj6V9gKFtHmBjZ2Ji6Zu3QuSu/AChfr7J0kSLLBByShfpJVpLz5V7k2CcSCNwtwCPwRXl8Ax1b2tVrG4hLkMamdtqViH+BZ71vAssCpZ9AS2s/AZu02HAABvr8AMwLkC6AhtbsAXsTtMWGEzDUWA2Y3CCdAXWt9QockwmXOGGk8QrwnkP6AVS1xps9mSW++HIG6Y8euxLkgjhzuRzYv2l6LlGuELs2yM6R47Ux5Uqx60isU3Nb36MoHmK7CUTAj47It/mIp9jd9nK0W8khNqyAF5WZ0dcYZYtvRoL4/yx1IHBX/AG/q0LoX+ZMUgAAAABJRU5ErkJggg==";
const WEBSITE_ICON_BASE64 =
  "iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAACXBIWXMAAAsTAAALEwEAmpwYAAAD/UlEQVR4nO2aW4hOURTHP6JxKXId3nghyYMSHhSlXGKQkGs88aJp3EKheXGXolwehLzIPGISHsgLY1yT2xi33MqtSAyGn5bW0e7Y3zln73O+Oci/vvq+fdZee//PXnvttdb+CoX/+EcBdAWmAFuBWuAO8Bb4rB/5fluficxkoEvhTwDQDpgHnAK+4Y5m4CQwFyjLg0B7YBnwnOzwDFgqL6elSEwA7lM6NALjS21GO2g5HAI6ZE2iF3CZlkc9UJ4Vib663EnxEDgIzAf6ACOBsynI3JM5ZLESAYm7wHZgqraPB86FJ15ET3V4dqHnA1XmZgSZ8jR7IjCnS0BnTz2/kQgTiSBVrWMHZubu0YC9quAB0M2ThEzKCgcdvYFH2m2Xj4sVfAQGO/QL9kN11Googjc+MIHeQUCT9hvnctgF58SKpCQsE4+y+TBk//WL0b3G2C/xJgYs1w5XgTYuRLS/L07G6G0LXFfZqrhJlGmoIJjoSiIlEcG0GN0SlKKhUfFV0eBNcAVo5UigB1CTksiTmDFaA7dUdnaUoESxgkWOJKYDL8kAhfixFqnoiah8olm9g9OZEeOdsiZSrinDV+s8Dfs740JC+0ookhWGJxjvvMpOsj3cpg/XeRBZkCGRBqBjzHjHVHaL7aGkoIIpHkQOkC12RYw1ypA7ahOQNyEY4EFEAscs8R0YGwpzzmrkcMaQu2ObzBt92A0YAZzW39MtG/tXGzCD0uCZOqAoR/LSRkQqHYINYWE5IwwSv9r0k4nbLYLDMWFOUxQRG2osb6YmgwMwLZpsRF6nsOdaw1mUCkc0mTOzzVdRmz0JrhgmJabYocREbhjzlM3/JWqzH3dQ/AEYrflKMbwANumKCd55kjgWjsK1UlnU/QYHYlIsNGKzMGTvdFe9q9Q99wfeexC5YJnr5qgDMQhR0kBc+EyL7p9FCWC1j87C7/okfxdU2Ih00aAxDaoSFDQee+hdaAluJWjsVGwgKSinwfooIjpGpYfe/Ub/JdpWGzXInJRE9pUgUm4GhmrfVoZ3nRW39EGq64N6TZc7AouBPcCw0BgbfVcZqNC2J7HXEFraT4OrocP1Y1DC0X3o4oYvStFB+5YZq1EZt/LBqrjUepNAwp/1jjXgD2aJCFhrlI6SXQppKJA3VhrzGQp80vYxiUgYnXfnTGSEUTKVPSHY6UTCMLHg4MkDQzSFvqa/67zvGTXfkNvZvNGY+sJHL3qk3poXGordu/iQKc/JzOqAnpmQMMiU5XAZ2j5TEiFC40psag3OLjYFGfFoVcDTDAmIi63M6x8QYm6zpaDsmQJ81RR5Vi4EbJCCsgZ1WzQ9va0xV/Cnmtd6JXBUZSqK5hP/Ufj78QNzYnJ0dIOSbwAAAABJRU5ErkJggg==";

interface CardProps {
  isFlipped: boolean;
  disableHover: boolean;
  frontLogoDataURL: string | null;
  backLogoDataURL: string | null;
  fullName: string;
  username: string;
  role: string;
  formattedNumber: string;
  email: string;
  website: string;
  address: string;
  frontRef: React.RefObject<HTMLDivElement>;
  backRef: React.RefObject<HTMLDivElement>;
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
  username,
  frontRef,
  backRef,
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
          ref={frontRef}
          className={`absolute w-full h-full rounded-lg overflow-hidden shadow-lg ${styles.cardFace} ${styles.cardFaceFront}`}
        >
          <div
            className={`w-full h-full p-4 relative text-white ${styles.cardContent}`}
          >
            {/* QR Code */}
            {!isFlipped && (
              <div className="absolute left-10 top-[52] z-10 qrCode">
                <QRCode
                  bgColor="transparent"
                  fgColor="white"
                  // logoImage={`data:image/png;base64,${NFC_ICON_BASE64}`}
                  // logoWidth={40}
                  // logoHeight={40}
                  removeQrCodeBehindLogo={true} // Ensures the area behind the logo is transparent
                  qrStyle="dots"
                  value={`https://zalient.me/${username}`}
                  size={80}
                  quietZone={2} // Adds padding to the QR code for better readability
                />
              </div>
            )}

            {/* NFC Icon */}
            {!isFlipped && (
              <div className="absolute top-4 right-4 z-10">
                <img
                  src={`data:image/png;base64,${NFC_ICON_BASE64}`}
                  alt="NFC Icon"
                  className="nfcIcon h-6 w-6"
                  crossOrigin="anonymous"
                />
              </div>
            )}

            {/* Front Logo */}
            {frontLogoDataURL && !isFlipped && (
              <div className="absolute top-4 left-4 z-10">
                <img
                  src={frontLogoDataURL}
                  alt="Front Logo"
                  className="object-contain h-8"
                  crossOrigin="anonymous"
                />
              </div>
            )}

            {/* Full Name and Role */}
            <div className="absolute top-12 left-36">
              {fullName && (
                <div className="flex items-center  text-left uppercase font-medium text-base">
                  <span>{fullName}</span>
                </div>
              )}
              {role && (
                <div className="flex items-center text-left uppercase font-medium text-[10px] mt-[-5px] mb-1">
                  <span>{role}</span>
                </div>
              )}

              {/* Address */}
              {address && (
                <div className="flex items-center text-[8px] text-left">
                  <img
                    src={`data:image/png;base64,${LOCATION_ICON_BASE64}`}
                    alt="Location Icon"
                    className="locationIcon w-2 h-2 mr-1"
                    crossOrigin="anonymous"
                  />
                  <span>{address}</span>
                </div>
              )}

              {/* Contact Number */}
              {formattedNumber && (
                <div className="flex items-center text-[8px] text-left">
                  <img
                    src={`data:image/png;base64,${NUMBER_ICON_BASE64}`}
                    alt="Number Icon"
                    className="numberIcon  w-2 h-2  mr-1"
                    crossOrigin="anonymous"
                  />
                  <span>{formattedNumber}</span>
                </div>
              )}

              {/* Email */}
              {email && (
                <div className="flex items-center  text-[8px] text-left">
                  <img
                    src={`data:image/png;base64,${EMAIL_ICON_BASE64}`}
                    alt="Email Icon"
                    className="emailIcon  w-2 h-2  mr-1"
                    crossOrigin="anonymous"
                  />
                  <span>{email}</span>
                </div>
              )}

              {/* Website */}
              {website && (
                <div className="flex items-center text-[8px] mb-0.5 text-left">
                  <img
                    src={`data:image/png;base64,${WEBSITE_ICON_BASE64}`}
                    alt="Website Icon"
                    className="websiteIcon  w-2 h-2  mr-1"
                    crossOrigin="anonymous"
                  />
                  <span>{website}</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Back Face */}
        <div
          ref={backRef}
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
                  className="h-16 mb-4"
                  crossOrigin="anonymous"
                />
              </div>
            )}

            {/* NFC Icon */}
            <div className="absolute top-4 left-4 z-10">
              <img
                src={`data:image/png;base64,${NFC_ICON_BASE64}`}
                alt="NFC Icon"
                className="nfcIcon transform w-6 h-6  scale-x-[-1]"
                crossOrigin="anonymous"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
