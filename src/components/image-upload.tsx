"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { IoCloudUploadOutline } from "react-icons/io5";
import Image from "next/image";
import Link from "next/link";

interface ImageUploadProps {
  onUploadComplete?: (url: string | null) => void;
  initialImage?: string | null;
}

const ImageUpload: React.FC<ImageUploadProps> = ({
  onUploadComplete,
  initialImage = null,
}) => {
  const [uploadedImagePath, setUploadedImagePath] = useState<string | null>(
    initialImage
  );

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files?.length) {
      const image = event.target.files[0];

      // Simulate image upload by creating a local URL
      const imageUrl = URL.createObjectURL(image);
      setUploadedImagePath(imageUrl);

      // Call the onUploadComplete callback with the image URL
      if (onUploadComplete) {
        onUploadComplete(imageUrl);
      }
    }
  };

  const removeSelectedImage = () => {
    setUploadedImagePath(null);

    // Call the onUploadComplete callback with null
    if (onUploadComplete) {
      onUploadComplete(null);
    }
  };

  return (
    <div className="space-y-3 h-full">
      <label
        htmlFor="dropzone-file"
        className="relative flex flex-col items-center justify-center p-6 border-2 border-dashed rounded-lg cursor-pointer bg-muted hover:bg-accent text-muted-foreground w-full h-full"
      >
        {!uploadedImagePath && (
          <div className="text-center">
            <div className="border p-2 rounded-md max-w-min mx-auto">
              <IoCloudUploadOutline size="1.6em" />
            </div>
            <p className="mt-2 text-sm">
              <span className="font-semibold">Drag an image</span>
            </p>
            <p className="text-xs">Select an image or drag here to upload</p>
          </div>
        )}

        {uploadedImagePath && (
          <div className="text-center space-y-2">
            <Image
              width={1000}
              height={1000}
              src={uploadedImagePath}
              className="w-full object-contain max-h-16 opacity-70"
              alt="uploaded image"
            />
            <div className="space-y-1">
              <p className="text-sm font-semibold">Image Uploaded</p>
              <p className="text-xs">Click here to upload another image</p>
            </div>
          </div>
        )}
      </label>

      <Input
        id="dropzone-file"
        accept="image/png, image/jpeg"
        type="file"
        className="hidden"
        onChange={handleImageChange}
      />

      {!!uploadedImagePath && (
        <div className="flex items-center justify-between">
          <Link href={uploadedImagePath} className="text-sm underline">
            View uploaded image
          </Link>

          <Button
            onClick={removeSelectedImage}
            type="button"
            variant="secondary"
          >
            Remove
          </Button>
        </div>
      )}
    </div>
  );
};

export default ImageUpload;
