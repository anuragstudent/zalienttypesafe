// uploadCard/route.ts

import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { v4 as uuidv4 } from "uuid";

export async function POST(request: Request) {
  try {
    const {
      frontImage,
      backImage,
      fullName,
      role,
      contactNumber,
      email,
      website,
      address,
    }: {
      frontImage: string;
      backImage: string;
      fullName: string;
      role: string;
      contactNumber: string;
      email: string;
      website: string;
      address: string;
    } = await request.json();

    // Validate required fields
    if (!frontImage || !backImage || !fullName || !contactNumber || !email) {
      return NextResponse.json(
        {
          error:
            "Front and back images, full name, contact number, and email are required.",
        },
        { status: 400 }
      );
    }

    // Extract Base64 data for front image
    const frontMatches = frontImage.match(
      /^data:image\/([a-zA-Z]+);base64,(.+)$/
    );
    if (!frontMatches || frontMatches.length !== 3) {
      return NextResponse.json(
        { error: "Invalid front image data." },
        { status: 400 }
      );
    }

    const frontImageType = frontMatches[1];
    const frontImageData = frontMatches[2];
    const frontBuffer = Buffer.from(frontImageData, "base64");

    // Extract Base64 data for back image
    const backMatches = backImage.match(
      /^data:image\/([a-zA-Z]+);base64,(.+)$/
    );
    if (!backMatches || backMatches.length !== 3) {
      return NextResponse.json(
        { error: "Invalid back image data." },
        { status: 400 }
      );
    }

    const backImageType = backMatches[1];
    const backImageData = backMatches[2];
    const backBuffer = Buffer.from(backImageData, "base64");

    // Nodemailer transporter setup
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "smile4meplease3@gmail.com", // Your Gmail address
        pass: "ksiuauuzyzngpgil", // Your Gmail app password
      },
    });

    // Prepare email options
    const mailOptions = {
      from: '"Card Uploader" <smile4meplease3@gmail.com>',
      to: ["anuragsubedi180@gmail.com", "veshrajho3@gmail.com"], // Receiver's email addresses
      subject: "New Card Uploaded",
      text: `
        A new card has been uploaded with the following details:

        Full Name: ${fullName}
        Role: ${role}
        Contact Number: ${contactNumber}
        Email: ${email}
        Website: ${website}
        Address: ${address}
      `,
      attachments: [
        {
          filename: `front-image-${uuidv4()}.${frontImageType}`,
          content: frontBuffer,
          contentType: `image/${frontImageType}`,
        },
        {
          filename: `back-image-${uuidv4()}.${backImageType}`,
          content: backBuffer,
          contentType: `image/${backImageType}`,
        },
      ],
    };

    // Send email
    const info = await transporter.sendMail(mailOptions);

    console.log("Message sent: %s", info.messageId);

    return NextResponse.json(
      { message: "Email sent successfully." },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error sending email:", error);
    return NextResponse.json(
      { error: "Internal Server Error." },
      { status: 500 }
    );
  }
}
