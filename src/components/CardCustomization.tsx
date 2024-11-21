"use client";
import React, { useState, useEffect, useRef } from "react";
import { RefreshCw } from "lucide-react";
import useMediaQuery from "@/hooks/useMediaQuery";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Poppins } from "next/font/google";
import { toast } from "sonner";
import Card from "./Card";
import { useUser } from "@/context/UserContext";
import html2canvas from "html2canvas";
import styles from "./Card.module.css";
import { requestHandler } from "@/utils/client/requestHandler";
import { flipImageHorizontally } from "@/utils/flipImage"; // Import the helper function

const poppins = Poppins({ subsets: ["latin"], weight: ["400", "700"] });

export default function CardCustomization() {
  const { user } = useUser();

  const [fullName, setFullName] = useState<string>("Your Full Name");
  const [role, setRole] = useState<string>("Founder & CEO");
  const [contactNumber, setContactNumber] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [website, setWebsite] = useState<string>("");
  const [address, setAddress] = useState<string>("");

  const [frontLogoDataURL, setFrontLogoDataURL] = useState<string | null>(null);
  const [backLogoDataURL, setBackLogoDataURL] = useState<string | null>(null);

  const [isFlipped, setIsFlipped] = useState<boolean>(false);
  const [disableHover, setDisableHover] = useState<boolean>(false);
  const [uploading, setUploading] = useState<boolean>(false);
  const [uploadMessage, setUploadMessage] = useState<string>("");

  const isMobile = useMediaQuery("(max-width: 767px)");

  const frontCardRef = useRef<HTMLDivElement>(null);
  const backCardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (user) {
      setFullName(user.name || "Your Full Name");
      setRole("Founder & CEO");
      setContactNumber(user.contact?.toString() || "");
      setEmail(user.email || "");
      setWebsite("");
      setAddress(user.address || "");
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

  // Unified upload handler with image flipping
  const handleUploadAll = async () => {
    if (!frontLogoDataURL || !backLogoDataURL) {
      setUploadMessage("Please upload both front and back logos.");
      return;
    }

    try {
      setUploading(true);
      setUploadMessage("");

      // Ensure the card is in the front view during upload
      setIsFlipped(false);
      setDisableHover(true);

      // Wait for the state to update
      await new Promise((resolve) => setTimeout(resolve, 300));

      // Capture front card
      frontCardRef.current?.classList.add(styles.downloadBackground);
      await document.fonts.ready;
      const frontCanvas = await html2canvas(frontCardRef.current!, {
        scale: 4,
        useCORS: true,
        allowTaint: true,
        logging: false,
        backgroundColor: null,
      });
      const frontDataUrl = frontCanvas.toDataURL("image/png");
      frontCardRef.current?.classList.remove(styles.downloadBackground);

      // Capture back card
      backCardRef.current?.classList.add(styles.downloadBackground);
      await document.fonts.ready;
      const backCanvas = await html2canvas(backCardRef.current!, {
        scale: 4,
        useCORS: true,
        allowTaint: true,
        logging: false,
        backgroundColor: null,
      });
      let backDataUrl = backCanvas.toDataURL("image/png");
      backCardRef.current?.classList.remove(styles.downloadBackground);

      // Flip the back image horizontally to correct orientation
      backDataUrl = await flipImageHorizontally(backDataUrl);

      // Prepare payload
      const payload = {
        frontImage: frontDataUrl,
        backImage: backDataUrl,
        fullName,
        role,
        contactNumber,
        email,
        website,
        address,
      };

      // Send request
      const result = await requestHandler<{ message: string }>({
        method: "POST",
        url: "/api/uploadCard",
        body: payload,
        protected: true,
      });

      toast.success(result.message);
    } catch (error) {
      console.error("Upload Error:", error);
      toast.error((error as Error).message || "Something went wrong");
    } finally {
      // Ensure cleanup happens regardless of success or failure
      setDisableHover(false);
      setUploading(false);
      frontCardRef.current?.classList.remove(styles.downloadBackground);
      backCardRef.current?.classList.remove(styles.downloadBackground);
    }
  };

  return (
    <div
      className={`flex flex-col items-center justify-center p-4 ${poppins.className}`}
    >
      <h1 className="text-2xl font-bold mb-4 text-muted-foreground">
        Customize Your Card
      </h1>
      <div
        className={`flex ${
          isMobile ? "flex-col-reverse" : "flex-row"
        } gap-8 w-full max-w-screen-lg`}
      >
        {/* Form Section */}
        <div className="flex flex-col gap-4 w-full">
          {/* Role */}
          <div className="flex flex-col">
            <Label
              htmlFor="role"
              className="font-semibold text-muted-foreground"
            >
              Role:
            </Label>
            <Input
              id="role"
              type="text"
              className="text-muted-foreground"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              placeholder="Enter your role"
            />
          </div>

          {/* Contact Number */}
          <div className="flex flex-col">
            <Label
              htmlFor="contactNumber"
              className="font-semibold text-muted-foreground"
            >
              Contact Number:
            </Label>
            <Input
              id="contactNumber"
              type="text"
              className="text-muted-foreground"
              value={contactNumber}
              onChange={(e) => setContactNumber(e.target.value)}
              placeholder="Enter your contact number"
            />
          </div>

          {/* Email */}
          <div className="flex flex-col">
            <Label
              htmlFor="email"
              className="font-semibold text-muted-foreground"
            >
              Email:
            </Label>
            <Input
              id="email"
              type="email"
              className="text-muted-foreground"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
            />
          </div>

          {/* Website */}
          <div className="flex flex-col">
            <Label
              htmlFor="website"
              className="font-semibold text-muted-foreground"
            >
              Website:
            </Label>
            <Input
              id="website"
              type="url"
              className="text-muted-foreground"
              value={website}
              onChange={(e) => setWebsite(e.target.value)}
              placeholder="Enter your website"
            />
          </div>

          {/* Address */}
          <div className="flex flex-col">
            <Label
              htmlFor="address"
              className="font-semibold text-muted-foreground"
            >
              Address:
            </Label>
            <Input
              id="address"
              type="text"
              className="text-muted-foreground"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="Enter your address"
            />
          </div>

          {/* Front Logo Upload */}
          <div className="flex flex-col">
            <Label
              htmlFor="frontLogo"
              className="font-semibold text-muted-foreground"
            >
              Upload Front Logo (Black & White):
            </Label>
            <Input
              id="frontLogo"
              type="file"
              className="text-muted-foreground"
              accept="image/*"
              onChange={handleFrontLogoUpload}
            />
          </div>

          {/* Back Logo Upload */}
          <div className="flex flex-col">
            <Label
              htmlFor="backLogo"
              className="font-semibold text-muted-foreground"
            >
              Upload Back Logo (White):
            </Label>
            <Input
              id="backLogo"
              type="file"
              className="text-muted-foreground"
              accept="image/*"
              onChange={handleBackLogoUpload}
            />
          </div>

          {/* Upload Button */}
          <div className="flex flex-col">
            <Button
              onClick={handleUploadAll}
              className="mt-4"
              disabled={uploading}
            >
              {uploading ? "Uploading..." : "Upload Cards"}
            </Button>
          </div>

          {/* Upload Message */}
          {uploadMessage && (
            <div className="mt-4 text-center text-sm text-green-500">
              {uploadMessage}
            </div>
          )}
        </div>

        {/* Card Preview Section */}
        <div className="flex flex-col w-full">
          <Card
            frontRef={frontCardRef}
            backRef={backCardRef}
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
