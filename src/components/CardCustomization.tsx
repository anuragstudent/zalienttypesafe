// components/CardCustomization.tsx

"use client";
import React, { useState, useEffect, useRef } from "react";
import { RefreshCw } from "lucide-react";
import useMediaQuery from "@/hooks/useMediaQuery";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Poppins } from "next/font/google";
import Card from "./Card";
import { useUser } from "@/context/UserContext"; // Import useUser hook
import * as htmlToImage from "html-to-image"; // Import html-to-image
import styles from "./Card.module.css"; // Import styles to access downloadBackground class

const poppins = Poppins({ subsets: ["latin"], weight: ["400", "700"] });

export default function CardCustomization() {
  const { user } = useUser(); // Get user data from context

  // State for form fields
  const [fullName, setFullName] = useState<string>("Your Full Name");
  const [role, setRole] = useState<string>("Founder & CEO"); // Default role
  const [contactNumber, setContactNumber] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [website, setWebsite] = useState<string>(""); // Default to empty
  const [address, setAddress] = useState<string>(""); // Default to empty

  // Logo display URLs
  const [frontLogoDataURL, setFrontLogoDataURL] = useState<string | null>(null);
  const [backLogoDataURL, setBackLogoDataURL] = useState<string | null>(null);

  // State for card flipping
  const [isFlipped, setIsFlipped] = useState<boolean>(false);
  const [disableHover, setDisableHover] = useState<boolean>(false);
  const [downloading, setDownloading] = useState<boolean>(false);

  const isMobile = useMediaQuery("(max-width: 767px)");

  // Refs to the front and back cards
  const frontCardRef = useRef<HTMLDivElement>(null);
  const backCardRef = useRef<HTMLDivElement>(null);

  // Prefill form fields with user data from context
  useEffect(() => {
    if (user) {
      setFullName(user.name || "Your Full Name");
      setRole("Founder & CEO"); // Default role if not provided
      setContactNumber(user.contact?.toString() || ""); // Map `contact`
      setEmail(user.email || ""); // Map `email`
      setWebsite(""); // No website in the user data
      setAddress(user.address || ""); // Map `address` if available
    }
  }, [user]);

  const handleFrontLogoUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      try {
        const base64 = await convertToBase64(file);
        setFrontLogoDataURL(base64);
      } catch (error) {
        console.error("Error converting front logo to base64:", error);
      }
    } else {
      setFrontLogoDataURL(null);
    }
  };

  const handleBackLogoUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      try {
        const base64 = await convertToBase64(file);
        setBackLogoDataURL(base64);

        // Flip the card and disable hover for 3 seconds
        setIsFlipped(true);
        setDisableHover(true);

        setTimeout(() => {
          setIsFlipped(false);
          setDisableHover(false);
        }, 3000); // 3 seconds
      } catch (error) {
        console.error("Error converting back logo to base64:", error);
      }
    } else {
      setBackLogoDataURL(null);
    }
  };

  const convertToBase64 = (file: File): Promise<string> => {
    return new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        if (typeof reader.result === "string") {
          resolve(reader.result);
        } else {
          reject(new Error("Failed to convert file to base64"));
        }
      };
      reader.onerror = (error) => reject(error);
    });
  };

  const formattedNumber = contactNumber ? `+977 ${contactNumber}` : "";

  const handleCardFlip = () => {
    setIsFlipped(!isFlipped);
  };

  const handleDownloadFront = async () => {
    if (frontCardRef.current) {
      try {
        setDownloading(true);
        setDisableHover(true);

        // Add the download background class to change background to pure dark
        frontCardRef.current.classList.add(styles.downloadBackground);

        // Wait a moment for the class to apply
        await new Promise((resolve) => setTimeout(resolve, 100));

        // Use html-to-image to convert the front card to image
        const dataUrl = await htmlToImage.toPng(frontCardRef.current, {
          cacheBust: true,
        });

        // Create a link and trigger download
        const link = document.createElement("a");
        link.href = dataUrl;
        link.download = "front-card.png";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        // Remove the download background class
        frontCardRef.current.classList.remove(styles.downloadBackground);
      } catch (error) {
        console.error("Error generating image:", error);
      } finally {
        setDownloading(false);
        setDisableHover(false);
      }
    }
  };

  const handleDownloadBack = async () => {
    if (backCardRef.current) {
      try {
        setDownloading(true);
        setDisableHover(true);

        // Add the download background class to change background to pure dark
        backCardRef.current.classList.add(styles.downloadBackground);

        // Wait a moment for the class to apply
        await new Promise((resolve) => setTimeout(resolve, 100));

        // Use html-to-image to convert the back card to image
        const dataUrl = await htmlToImage.toPng(backCardRef.current, {
          cacheBust: true,
        });

        // Create a link and trigger download
        const link = document.createElement("a");
        link.href = dataUrl;
        link.download = "back-card.png";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        // Remove the download background class
        backCardRef.current.classList.remove(styles.downloadBackground);
      } catch (error) {
        console.error("Error generating image:", error);
      } finally {
        setDownloading(false);
        setDisableHover(false);
      }
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
        {/* Form Section */}
        <div className="flex flex-col gap-4 w-full">
          {/* Full Name */}
          <div className="flex flex-col">
            <Label htmlFor="fullName" className="font-semibold">
              Full Name:
            </Label>
            <Input
              id="fullName"
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="Enter your full name"
            />
          </div>

          {/* Role */}
          <div className="flex flex-col">
            <Label htmlFor="role" className="font-semibold">
              Role:
            </Label>
            <Input
              id="role"
              type="text"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              placeholder="Enter your role"
            />
          </div>

          {/* Contact Number */}
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

          {/* Email */}
          <div className="flex flex-col">
            <Label htmlFor="email" className="font-semibold">
              Email:
            </Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
            />
          </div>

          {/* Website */}
          <div className="flex flex-col">
            <Label htmlFor="website" className="font-semibold">
              Website:
            </Label>
            <Input
              id="website"
              type="url"
              value={website}
              onChange={(e) => setWebsite(e.target.value)}
              placeholder="Enter your website"
            />
          </div>

          {/* Address */}
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

          {/* Front Logo Upload */}
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

          {/* Back Logo Upload */}
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

          {/* Download Buttons */}
          <div className="flex flex-col">
            {/* Download Front Side */}
            <Button
              onClick={handleDownloadFront}
              className="mt-4"
              disabled={downloading}
            >
              {downloading ? "Preparing Download..." : "Download Front Side"}
            </Button>

            {/* Download Back Side */}
            <Button
              onClick={handleDownloadBack}
              className="mt-2"
              disabled={downloading}
            >
              {downloading ? "Preparing Download..." : "Download Back Side"}
            </Button>
          </div>
        </div>

        {/* Card Preview Section */}
        <div className="flex flex-col items-center w-full">
          <Card
            frontRef={frontCardRef} // Attach frontRef
            backRef={backCardRef} // Attach backRef
            isFlipped={isFlipped}
            disableHover={disableHover}
            frontLogoDataURL={frontLogoDataURL}
            backLogoDataURL={backLogoDataURL}
            fullName={fullName}
            role={role}
            formattedNumber={formattedNumber}
            email={email}
            website={website}
            address={address}
          />

          {/* Flip Button for Mobile */}
          {isMobile && (
            <button
              className="mt-2 flex items-center text-blue-500 hover:text-blue-700"
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
