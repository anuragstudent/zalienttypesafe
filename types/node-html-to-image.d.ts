declare module "node-html-to-image" {
  interface NodeHtmlToImageOptions {
    html: string; // The HTML content to render
    quality?: number; // Image quality (default: 100)
    type?: "png" | "jpeg"; // Output file type
    transparent?: boolean; // Whether the image has a transparent background
    puppeteerArgs?: {
      args?: string[]; // Puppeteer-specific arguments
    };
    puppeteer?: {
      viewport?: {
        width?: number; // Width of the viewport
        height?: number; // Height of the viewport
        deviceScaleFactor?: number; // Pixel density scaling
      };
    };
  }

  export default function nodeHtmlToImage(
    options: NodeHtmlToImageOptions
  ): Promise<Buffer>;
}
