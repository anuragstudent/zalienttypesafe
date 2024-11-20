"use client";
import { saveAs } from "file-saver";

import React, { useState, useEffect } from "react";
import styles from "./CardCustomization.module.css";
import { RefreshCw } from "lucide-react";
import useMediaQuery from "@/hooks/useMediaQuery";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { requestHandler } from "@/utils/client/requestHandler"; // Adjust the import path as needed

// Import fonts using next/font/google
import { Poppins, Pacifico } from "next/font/google";

const poppins = Poppins({ subsets: ["latin"], weight: ["400", "700"] });
const pacifico = Pacifico({ subsets: ["latin"], weight: ["400"] });

export default function CardCustomization() {
  const [brandName, setBrandName] = useState<string>("Your Brand Name");
  const [contactNumber, setContactNumber] = useState<string>("");
  const [address, setAddress] = useState<string>("");

  const [frontLogoFile, setFrontLogoFile] = useState<File | null>(null);
  const [backLogoFile, setBackLogoFile] = useState<File | null>(null);

  const [frontLogoDataURL, setFrontLogoDataURL] = useState<string | null>(null);
  const [backLogoDataURL, setBackLogoDataURL] = useState<string | null>(null);

  const [isFlipped, setIsFlipped] = useState<boolean>(false);
  const [disableHover, setDisableHover] = useState<boolean>(false);
  const [downloading, setDownloading] = useState<boolean>(false);

  const isMobile = useMediaQuery("(max-width: 767px)");

  const handleFrontLogoUpload = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      setFrontLogoFile(file);

      const objectUrl = URL.createObjectURL(file);
      setFrontLogoDataURL(objectUrl);
    } else {
      setFrontLogoFile(null);
      setFrontLogoDataURL(null);
    }
  };

  const handleBackLogoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      setBackLogoFile(file);

      const objectUrl = URL.createObjectURL(file);
      setBackLogoDataURL(objectUrl);
    } else {
      setBackLogoFile(null);
      setBackLogoDataURL(null);
    }
  };

  const formattedNumber = contactNumber ? `+977 ${contactNumber}` : "";

  const handleCardFlip = () => {
    setIsFlipped(!isFlipped);
  };

  useEffect(() => {
    if (backLogoDataURL) {
      setIsFlipped(true);
      setDisableHover(true);
      const timer = setTimeout(() => {
        setIsFlipped(false);
        setDisableHover(false);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [backLogoDataURL]);

  const handleDownload = async () => {
    try {
      setDisableHover(true);
      setDownloading(true); // Apply plain black background

      // Convert image files to base64 data URLs
      const getBase64 = (file: File) => {
        return new Promise<string>((resolve, reject) => {
          const reader = new FileReader();
          reader.onload = () => resolve(reader.result as string);
          reader.onerror = () =>
            reject(new Error("Failed to convert image to base64"));
          reader.readAsDataURL(file);
        });
      };

      const frontLogoBase64 = frontLogoFile
        ? await getBase64(frontLogoFile)
        : null;
      const backLogoBase64 = backLogoFile
        ? await getBase64(backLogoFile)
        : null;

      const payload = {
        brandName,
        contactNumber: formattedNumber,
        address,
        frontLogoBase64,
        backLogoBase64,
      };

      // Use the requestHandler to make the POST request
      const response = await requestHandler<Blob>({
        method: "POST",
        url: "/api/generate-card",
        body: payload,
        headers: { "Content-Type": "application/json" },
        responseType: "blob",
        protected: true,
      });

      // Save the received ZIP file
      saveAs(response, "card-images.zip");
    } catch (error) {
      console.error("Error generating images:", error);
      // Handle errors (e.g., show a notification to the user)
    } finally {
      setDownloading(false);
      setDisableHover(false);
    }
  };

  return (
    <div
      className={`flex flex-col items-center justify-center p-4 ${poppins.className}`}
    >
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
            {downloading ? "Preparing Download..." : "Download Card Images"}
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
              <div className={`${styles.cardFace} ${styles.cardFaceFront}`}>
                <div className={`${styles.cardContent}`}>
                  <div className={styles.qrCode}>
                    <img
                      src={`https://api.qrserver.com/v1/create-qr-code/?size=48x48&data=${encodeURIComponent(
                        "https://zalient.me/username"
                      )}`}
                      alt="QR Code"
                    />
                  </div>
                  {frontLogoDataURL && (
                    <div className={styles.brandLogo}>
                      <img
                        src={frontLogoDataURL}
                        alt="Front Logo"
                        className={`${styles.logoImage} frontLogo object-contain w-16 h-16`}
                        style={{ filter: "brightness(0) invert(1)" }}
                      />
                    </div>
                  )}
                  <h2
                    className={`${styles.brandName} ${pacifico.className}`}
                    style={{
                      marginTop: frontLogoDataURL ? "8px" : "24px",
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
              <div className={`${styles.cardFace} ${styles.cardFaceBack}`}>
                <div className={`${styles.cardContent}`}>
                  {backLogoDataURL && (
                    <div className="flex items-center justify-center h-full">
                      <img
                        src={backLogoDataURL}
                        alt="Back Logo"
                        className={`${styles.logoImage} backLogo object-contain w-32 h-32 opacity-75`}
                        style={{ filter: "brightness(0) invert(1)" }}
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
