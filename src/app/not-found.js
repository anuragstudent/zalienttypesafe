import Link from "next/link";
import Image from "next/image";

export const metadata = {
  title: "404 - Zalient",
  description: "Page not found",
};
export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background text-foreground">
      {/* Logo Section */}
      <div className="flex flex-row items-center gap-4 p-3 ">
        <div className="flex flex-row items-center gap-4 p-3 bg-white/10 rounded-xl">
          <Image
            alt="logo"
            width={40}
            height={40}
            src="/icon.png"
            className="h-[20px] w-[20px] object-contain"
          />
        </div>
        <h2 className="text-lg font-semibold text-black dark:text-white">
          Zalient
        </h2>
      </div>
      {/* Main Content */}
      <h1 className="text-6xl font-extrabold text-primary">404</h1>
      <p className="mt-4 text-lg text-muted-foreground">
        Oops! The page you’re looking for doesn’t exist.
      </p>
      {/* Return Home Button */}
      <Link href="/" legacyBehavior>
        <a className="mt-6 px-6 py-3 bg-primary text-primary-foreground rounded-lg shadow hover:bg-primary/80 focus:outline-none focus:ring focus:ring-primary/50">
          Return Home
        </a>
      </Link>
    </div>
  );
}
