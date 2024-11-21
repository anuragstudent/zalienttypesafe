import { NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";
import path from "path";
import { promises as fs } from "fs";

export async function POST(request: Request) {
  try {
    const { image, type }: { image: string; type: string } =
      await request.json();

    if (!image || !type) {
      return NextResponse.json(
        { error: "Image data and type are required." },
        { status: 400 }
      );
    }

    // Validate type
    if (type !== "front" && type !== "back") {
      return NextResponse.json(
        { error: "Type must be either 'front' or 'back'." },
        { status: 400 }
      );
    }

    // Extract Base64 data
    const matches = image.match(/^data:image\/([a-zA-Z]+);base64,(.+)$/);
    if (!matches || matches.length !== 3) {
      return NextResponse.json(
        { error: "Invalid image data." },
        { status: 400 }
      );
    }

    const imageType = matches[1];
    const imageData = matches[2];

    // Generate a unique filename
    const filename = `${type}-card-${uuidv4()}.${imageType}`;

    // Define the path to save the image
    const uploadPath = path.join(process.cwd(), "public", "uploads", filename);

    // Decode Base64 data
    const buffer = Buffer.from(imageData, "base64");

    // Ensure the uploads directory exists
    const uploadsDir = path.join(process.cwd(), "public", "uploads");
    try {
      await fs.access(uploadsDir);
    } catch {
      await fs.mkdir(uploadsDir, { recursive: true });
    }

    // Save the image to the uploads directory
    await fs.writeFile(uploadPath, buffer);

    // Construct the URL to access the uploaded image
    const imageUrl = `/uploads/${filename}`;

    return NextResponse.json({ url: imageUrl }, { status: 200 });
  } catch (error: unknown) {
    console.error("Error uploading card:", error);
    return NextResponse.json(
      { error: "Internal Server Error." },
      { status: 500 }
    );
  }
}
