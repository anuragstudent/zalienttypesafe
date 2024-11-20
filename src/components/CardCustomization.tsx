"use client";

import React, { useState, useEffect, useRef } from "react";
import { QRCodeCanvas } from "qrcode.react";
import { toPng } from "html-to-image";
import JSZip from "jszip";
import { saveAs } from "file-saver";
import styles from "./CardCustomization.module.css";
import Head from "next/head";
import { RefreshCw } from "lucide-react";
import useMediaQuery from "@/hooks/useMediaQuery";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

export default function CardCustomization() {
  const [brandName, setBrandName] = useState<string>("Your Brand Name");
  const [contactNumber, setContactNumber] = useState<string>("");
  const [address, setAddress] = useState<string>("");
  const [frontLogo, setFrontLogo] = useState<string | null>(null);
  const [backLogo, setBackLogo] = useState<string | null>(null);
  const [isFlipped, setIsFlipped] = useState<boolean>(false);
  const [disableHover, setDisableHover] = useState<boolean>(false);
  const [downloading, setDownloading] = useState<boolean>(false);

  const isMobile = useMediaQuery("(max-width: 767px)");

  const frontRef = useRef<HTMLDivElement | null>(null);
  const backRef = useRef<HTMLDivElement | null>(null);

  const convertToBase64 = (file: File): Promise<string> =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
      reader.readAsDataURL(file);
    });

  const handleFrontLogoUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (event.target.files && event.target.files[0]) {
      const base64Image = await convertToBase64(event.target.files[0]);
      setFrontLogo(base64Image);
    } else {
      setFrontLogo(null);
    }
  };

  const handleBackLogoUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (event.target.files && event.target.files[0]) {
      const base64Image = await convertToBase64(event.target.files[0]);
      setBackLogo(base64Image);
    } else {
      setBackLogo(null);
    }
  };

  const formattedNumber = contactNumber ? `+977 ${contactNumber}` : "";

  const handleCardFlip = () => {
    setIsFlipped(!isFlipped);
  };

  useEffect(() => {
    if (backLogo) {
      setIsFlipped(true);
      setDisableHover(true);
      const timer = setTimeout(() => {
        setIsFlipped(false);
        setDisableHover(false);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [backLogo]);

  const handleDownload = async () => {
    if (frontRef.current && backRef.current) {
      try {
        setDisableHover(true);
        setDownloading(true); // Apply plain black background

        // Generate images
        const frontDataUrl = await toPng(frontRef.current, {
          cacheBust: true,
          width: frontRef.current.offsetWidth,
          height: frontRef.current.offsetHeight,
        });

        const backDataUrl = await toPng(backRef.current, {
          cacheBust: true,
          width: backRef.current.offsetWidth,
          height: backRef.current.offsetHeight,
        });

        // Create a zip file
        const zip = new JSZip();
        zip.file("card-front.png", frontDataUrl.split(",")[1], {
          base64: true,
        });
        zip.file("card-back.png", backDataUrl.split(",")[1], { base64: true });

        const zipBlob = await zip.generateAsync({ type: "blob" });
        saveAs(zipBlob, "card-images.zip");
      } catch (error) {
        console.error("Error generating images:", error);
      } finally {
        setDownloading(false);
      }
    }
  };

  return (
    <div className="flex flex-col items-center justify-center p-4">
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Poppins&family=Pacifico&display=swap"
          rel="stylesheet"
        />
      </Head>
      <h1 className="text-2xl font-bold mb-4">Customize Your Card</h1>
      <div
        className={`flex ${
          isMobile ? "flex-col-reverse" : "flex-row"
        } gap-8 w-full max-w-screen-lg`}
      >
        <div className="flex flex-col gap-4 w-full">
          <div className="flex flex-col">
            <Label htmlFor="brandName" className="font-semibold">
              Brand Name:
            </Label>
            <Input
              id="brandName"
              type="text"
              value={brandName}
              onChange={(e) => setBrandName(e.target.value)}
              placeholder="Enter your brand name"
            />
          </div>
          <div className="flex flex-col">
            <Label htmlFor="contactNumber" className="font-semibold">
              Contact Number:
            </Label>
            <Input
              id="contactNumber"
              type="text"
              value={contactNumber}
              onChange={(e) => setContactNumber(e.target.value)}
              placeholder="Enter your contact number"
            />
          </div>
          <div className="flex flex-col">
            <Label htmlFor="address" className="font-semibold">
              Address:
            </Label>
            <Input
              id="address"
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="Enter your address"
            />
          </div>
          <div className="flex flex-col">
            <Label htmlFor="frontLogo" className="font-semibold">
              Upload Front Logo (Black & White):
            </Label>
            <Input
              id="frontLogo"
              type="file"
              accept="image/*"
              onChange={handleFrontLogoUpload}
            />
          </div>
          <div className="flex flex-col">
            <Label htmlFor="backLogo" className="font-semibold">
              Upload Back Logo (White):
            </Label>
            <Input
              id="backLogo"
              type="file"
              accept="image/*"
              onChange={handleBackLogoUpload}
            />
          </div>
          <Button onClick={handleDownload} className="mt-4">
            Download Card Images
          </Button>
        </div>
        <div className={styles.cardPreviewContainer}>
          <div
            className={`${styles.cardContainer} ${
              isFlipped ? styles.isFlipped : ""
            } ${disableHover ? styles.disableHover : ""}`}
          >
            <div
              className={`${styles.card} ${
                downloading ? styles.downloading : ""
              }`}
            >
              <div
                ref={frontRef}
                className={`${styles.cardFace} ${styles.cardFaceFront}`}
              >
                <div className={styles.cardContent}>
                  <div className={styles.qrCode}>
                    <QRCodeCanvas
                      value={`https://zalient.me/username`}
                      size={48}
                      bgColor="#ffffff"
                      fgColor="#000000"
                      level="H"
                    />
                  </div>
                  {frontLogo && (
                    <div className={styles.brandLogo}>
                      <img
                        src={frontLogo}
                        alt="Front Logo"
                        className={`${styles.logoImage} object-contain w-16 h-16`}
                      />
                    </div>
                  )}
                  <h2
                    className={styles.brandName}
                    style={{
                      marginTop: frontLogo ? "8px" : "24px",
                    }}
                  >
                    {brandName}
                  </h2>
                  {formattedNumber && (
                    <p className={styles.contactInfo}>{formattedNumber}</p>
                  )}
                  {address && <p className={styles.contactInfo}>{address}</p>}
                </div>
              </div>
              <div
                ref={backRef}
                className={`${styles.cardFace} ${styles.cardFaceBack}`}
              >
                <div className={styles.cardContent}>
                  {backLogo && (
                    <div className="flex items-center justify-center h-full">
                      <img
                        src={backLogo}
                        alt="Back Logo"
                        className={`${styles.logoImage} object-contain w-32 h-32 opacity-75`}
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
          {isMobile && (
            <button
              className="mt-2 flex items-center text-blue-500 hover:text-blue-700 swapButton"
              onClick={handleCardFlip}
              aria-label="Flip Card"
            >
              <RefreshCw className="mr-1" />
              Flip Card
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
