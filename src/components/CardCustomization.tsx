"use client";
import { saveAs } from "file-saver";
import React, { useState, useEffect } from "react";
import { RefreshCw } from "lucide-react";
import useMediaQuery from "@/hooks/useMediaQuery";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Poppins } from "next/font/google";
import Card from "./Card";
import { useUser } from "@/context/UserContext"; // Import useUser hook
import { requestHandler } from "@/utils/client/requestHandler"; // Adjust the import path as needed

const poppins = Poppins({ subsets: ["latin"], weight: ["400", "700"] });

export default function CardCustomization() {
  const { user } = useUser(); // Get user data from context

  // State for form fields
  const [fullName, setFullName] = useState<string>("Your Full Name");
  const [role, setRole] = useState<string>("Your Role");
  const [contactNumber, setContactNumber] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [website, setWebsite] = useState<string>(""); // Default to empty
  const [address, setAddress] = useState<string>(""); // Default to empty

  // Logo files and display URLs
  const [frontLogoFile, setFrontLogoFile] = useState<File | null>(null);
  const [backLogoFile, setBackLogoFile] = useState<File | null>(null);
  const [frontLogoDataURL, setFrontLogoDataURL] = useState<string | null>(null);
  const [backLogoDataURL, setBackLogoDataURL] = useState<string | null>(null);

  // State for card flipping
  const [isFlipped, setIsFlipped] = useState<boolean>(false);
  const [disableHover, setDisableHover] = useState<boolean>(false);
  const [downloading, setDownloading] = useState<boolean>(false);

  const isMobile = useMediaQuery("(max-width: 767px)");

  // Prefill form fields with user data from context
  useEffect(() => {
    if (user) {
      setFullName(user.name || "Your Full Name");
      setRole("Founder & CEO"); // Default role if not provided
      setContactNumber(user.contact?.toString() || ""); // Map `contact`
      setEmail(user.email || ""); // Map `email`
      setWebsite(""); // No website in the user data
      setAddress(""); // No address in the user data
    }
  }, [user]);

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

      // Flip the card and disable hover for 3 seconds
      setIsFlipped(true);
      setDisableHover(true);

      setTimeout(() => {
        setIsFlipped(false);
        setDisableHover(false);
      }, 3000); // 3 seconds
    } else {
      setBackLogoFile(null);
      setBackLogoDataURL(null);
    }
  };

  const formattedNumber = contactNumber ? `+977 ${contactNumber}` : "";

  const handleCardFlip = () => {
    setIsFlipped(!isFlipped);
  };

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
        fullName,
        role,
        contactNumber: formattedNumber,
        email,
        website,
        address,
        frontLogoBase64,
        backLogoBase64,
      };

      // Send payload to the server
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
        {/* Form Section */}
        <div className="flex flex-col gap-4 w-full">
          {/* Full Name */}

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

          {/* Download Button */}
          <Button onClick={handleDownload} className="mt-4">
            {downloading ? "Preparing Download..." : "Download Card Images"}
          </Button>
        </div>

        {/* Card Preview Section */}
        <div className="flex flex-col items-center w-full">
          <Card
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
