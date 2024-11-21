// components/Card.tsx

"use client";

import React from "react";
import styles from "./Card.module.css";

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
              <div className="absolute left-10 top-14 z-10 qrCode">
                <img
                  src={`https://api.qrserver.com/v1/create-qr-code/?size=120x120&data=${encodeURIComponent(
                    "https://zalient.me/username"
                  )}`}
                  alt="QR Code"
                  className="w-20 h-20"
                  crossOrigin="anonymous"
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
