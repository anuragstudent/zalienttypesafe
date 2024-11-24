"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import React, { useRef } from "react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import {
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaLinkedin,
  FaGithub,
  FaEnvelope,
  FaBirthdayCake,
  FaPhone,
  FaMapMarkerAlt,
  FaExternalLinkAlt,
  FaWhatsapp,
  FaAddressBook,
} from "react-icons/fa";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons"; // optional

function Page() {
  // Simulated JSON data coming from the backend
  const profileData = {
    name: "Anurag Subedi",
    role: "CEO",
    email: "johndoe@example.com",
    coverPhoto: "/portfolio/no_background.jpg",
    website: "www.zalient.me",
    profilePhoto: "https://example.com/profilephoto.jpg", // Dummy URL
    contactNumber: "+1234567890",
    bio: "Full Stack Developer with a passion for building user-centric applications.",
    location: "San Francisco, CA",
    hobby: "Photography",
    socialLinks: [
      {
        name: "Facebook",
        url: "https://www.facebook.com/anuragsubedi",
      },

      {
        name: "Instagram",
        url: "https://www.instagram.com/anuragsubedi",
      },
      {
        name: "LinkedIn",
        url: "https://www.linkedin.com/in/anuragsubedi",
      },
      {
        name: "Github",
        url: "https://github.com/anuragsubedi",
      },
      {
        name: "WhatsApp",
        url: "https://wa.me/1234567890",
      },
    ],
    additionalInfo: [
      {
        title: "Email address",
        value: "rachel@gmail.com",
      },
      {
        title: "Birth Date",
        value: "01/01/1990",
      },
      {
        title: "Phone Number",
        value: "+1 97399 97930",
      },
      {
        title: "Location",
        value: "Washington, USA",
      },
    ],
  };

  const handleAddToContact = () => {
    const vCard = `BEGIN:VCARD
VERSION:3.0
FN;CHARSET=UTF-8:${profileData.name}
N;CHARSET=UTF-8:${profileData.name};;;
TITLE:${profileData.role}
EMAIL:${profileData.email}
URL:${profileData.website}
TEL:${profileData.contactNumber}
ADR;TYPE=WORK:;;${profileData.location}
END:VCARD`;

    const blob = new Blob([vCard], { type: "text/vcard" });
    const url = URL.createObjectURL(blob);
    const isIOS =
      /iPad|iPhone|iPod/.test(navigator.userAgent) && !("MSStream" in window);

    if (isIOS) {
      const reader = new FileReader();
      reader.onload = function (e) {
        if (e.target && typeof e.target.result === "string") {
          const link = document.createElement("a");
          link.href = e.target.result;
          link.download = `${profileData.name.replace(/ /g, "_")}.vcf`;
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
          URL.revokeObjectURL(url);
        }
      };
      reader.readAsDataURL(blob);
    } else {
      const link = document.createElement("a");
      link.href = url;
      link.download = `${profileData.name.replace(/ /g, "_")}.vcf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    }
  };

  const getIcon = (title: string) => {
    const lowerTitle = title.toLowerCase();
    if (lowerTitle.includes("email")) {
      return <FaEnvelope />;
    }
    if (lowerTitle.includes("birth")) {
      return <FaBirthdayCake />;
    }
    if (lowerTitle.includes("phone")) {
      return <FaPhone />;
    }
    if (lowerTitle.includes("location")) {
      return <FaMapMarkerAlt />;
    }
    return null; // Default case, no icon
  };

  const nameInitialsFallback = profileData.name
    .split(" ")
    .map((name) => name.charAt(0))
    .join("")
    .toUpperCase();
  const url = "https://zalient.me";

  const FormSchema = z.object({
    username: z.string().min(2, {
      message: "Username must be at least 2 characters.",
    }),
    email: z.string().email("Invalid email address.").min(2, {
      message: "Email must be at least 2 characters.",
    }),
    message: z.string().min(10, {
      message: "Message should be at least 10 characters.",
    }),
  });

  const formRef = useRef<HTMLFormElement | null>(null);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      username: "",
      email: "",
      message: "",
    },
  });

  const onSubmit = (data: z.infer<typeof FormSchema>) => {
    console.log("Form Data:", data);
    // You can add further actions here, such as sending the data to a backend
  };

  const getSocialIcon = (name: string) => {
    switch (name) {
      case "Facebook":
        return <FaFacebook />;
      case "Twitter":
        return <FaTwitter />;
      case "Instagram":
        return <FaInstagram />;
      case "LinkedIn":
        return <FaLinkedin />;
      case "Github":
        return <FaGithub />;
      case "WhatsApp":
        return <FaWhatsapp />;
      default:
        return null;
    }
  };

  const hasWhatsApp = profileData.socialLinks.some(
    (social) => social.name === "WhatsApp"
  );

  return (
    <main className="relative mx-auto flex min-h-screen w-full flex-1 flex-col bg-gray-100 dark:bg-gray-900">
      <div className="font-profile relative mx-auto w-full max-w-3xl md:pt-2">
        {/* Cover Photo */}
        <div className="relative">
          <img
            className="aspect-[21/9] object-cover md:rounded-xl w-full"
            src={profileData.coverPhoto}
            alt="Cover"
          />
        </div>
        {/* Profile Section */}
        <div className="flex w-full flex-col items-center">
          <div className="relative mt-[-70px]">
            <Avatar className="h-36 w-36 border-4 border-white dark:border-gray-800">
              <AvatarImage
                src={profileData.profilePhoto}
                alt={profileData.name}
              />
              <AvatarFallback className="text-blue-600 font-bold text-5xl bg-blue-50 rounded-full">
                {nameInitialsFallback}
              </AvatarFallback>
            </Avatar>
          </div>
        </div>
        <div className="mt-4 flex flex-col items-center">
          <h1 className="text-4xl font-bold text-center mb-3 text-gray-800 dark:text-gray-100">
            {profileData.name}
          </h1>
          {profileData.role && (
            <h2 className="text-center font-semibold mb-3 text-gray-500 dark:text-gray-400">
              {profileData.role}
            </h2>
          )}
          {profileData.bio && (
            <p className="text-center text-gray-600 dark:text-gray-300 mb-3 px-4">
              {profileData.bio}
            </p>
          )}
        </div>
        {/* Social Links Section */}
        <div className="mt-6 flex justify-center space-x-6">
          {profileData.socialLinks?.map((social) => (
            <a
              key={social.name}
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center w-12 h-12 bg-gray-600 rounded-full shadow-lg hover:bg-blue-500 hover:text-white transition-colors duration-300"
              title={social.name}
            >
              <div className="text-xl">{getSocialIcon(social.name)}</div>
            </a>
          ))}
        </div>
        {/* Additional Info Section */}
        <div className="grid grid-cols-2 gap-2 mt-8 p-2">
          {profileData.additionalInfo.map((info, index) => (
            <div
              key={index}
              className="flex flex-col md:flex-row items-center p-4 bg-white dark:bg-gray-800 shadow-xl rounded-lg transition-all duration-300 transform hover:-translate-y-1 hover:shadow-2xl"
            >
              <div className="flex items-center justify-center w-12 h-12 bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300 rounded-full shadow-md mb-2 md:mb-0 md:mr-4">
                {getIcon(info.title)}
              </div>
              <div className="text-center md:text-left">
                <h4 className="hidden md:block text-gray-600 dark:text-gray-300 font-bold">
                  {info.title}
                </h4>
                <p className="text-gray-800 dark:text-gray-200">{info.value}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Contact Me Section */}
        <div className="mt-8 p-2">
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100 mb-4">
            Contact Me
          </h2>
          <div className="flex flex-col items-center space-y-4">
            {/* Contact Form */}
            <Form {...form}>
              <form
                ref={formRef}
                onSubmit={form.handleSubmit(onSubmit)}
                className="w-full space-y-6 bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg"
              >
                <FormField
                  name="username"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-lg">Name</FormLabel>
                      <FormControl>
                        <Input
                          className="border-primary dark:border-gray-700"
                          placeholder="Your Name"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage className="text-xs text-red-600" />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-lg">Email</FormLabel>
                      <FormControl>
                        <Input
                          className="border-primary dark:border-gray-700"
                          placeholder="Email Address"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage className="text-xs text-red-600" />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-lg">Message</FormLabel>
                      <FormControl>
                        <Textarea
                          className="border-primary dark:border-gray-700"
                          placeholder="Type your message here."
                          id="message"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage className="text-xs text-red-600" />
                    </FormItem>
                  )}
                />
                <Button
                  type="submit"
                  className="w-full flex items-center justify-center text-md text-white bg-blue-600 hover:bg-blue-700 transition-colors duration-300"
                >
                  Send{" "}
                  <FontAwesomeIcon
                    icon={faPaperPlane}
                    size="lg"
                    className="ml-2 p-2"
                  />
                </Button>
              </form>
            </Form>
          </div>
        </div>
        {/* Add Me Section */}
        <div className="mt-12 p-2">
          <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-4">
            Join Yourself
          </h3>
          <p className=" text-gray-600 dark:text-gray-300 mb-4">
            For more info, add my contact to your device.
          </p>
          <div className="flex flex-col items-center space-y-4">
            <div className="flex items-center justify-between w-full p-4 bg-white dark:bg-gray-800 shadow-xl rounded-lg">
              <a
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 dark:text-blue-300 text-center text-lg font-semibold hover:underline flex items-center"
              >
                {url} <FaExternalLinkAlt className="ml-2" />
              </a>
            </div>
            {/* Add to Contact CTA Button */}
          </div>
        </div>
        <div className="mt-12">
          <div className="bg-white dark:bg-gray-800 rounded-t-2xl shadow-xl p-6 text-center">
            <h3 className="text-2xl font-semibold text-gray-800 dark:text-gray-100 mb-4">
              Add Me
            </h3>
            <p className="text-center text-gray-600 dark:text-gray-300 mb-6">
              For more info, add my contact to your device.
            </p>
            <Button
              onClick={handleAddToContact}
              className="flex items-center mx-auto justify-center bg-gradient-to-r from-green-400 to-green-600 hover:from-green-500 hover:to-green-700 text-white px-6 py-3 rounded-full shadow-lg transition-all duration-300 transform hover:scale-105"
            >
              <FaAddressBook className="mr-3 text-xl" />
              Add to Contact
            </Button>
          </div>
        </div>
        {/* Join Yourself Section */}

        {/* Floating Action Buttons */}
        <div className="fixed bottom-4 right-4 flex flex-col space-y-3">
          {hasWhatsApp && (
            <a
              href={
                profileData.socialLinks.find((s) => s.name === "WhatsApp")?.url
              }
              target="_blank"
              rel="noopener noreferrer"
              className="w-14 h-14 bg-green-500 rounded-full flex items-center justify-center shadow-lg hover:scale-105 transition-all duration-300"
              title="WhatsApp"
            >
              <FaWhatsapp className="text-white text-2xl" />
            </a>
          )}
          <button
            onClick={handleAddToContact}
            className="w-14 h-14 bg-blue-600 rounded-full flex items-center justify-center shadow-lg hover:scale-105 transition-all duration-300"
            title="Add to Contact"
          >
            <FaAddressBook className="text-white text-2xl" />
          </button>
        </div>
      </div>
    </main>
  );
}

export default Page;
