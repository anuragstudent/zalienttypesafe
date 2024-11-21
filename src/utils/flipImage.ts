// utils/flipImage.ts

/**
 * Flips an image horizontally.
 * @param dataURL - The data URL of the image to be flipped.
 * @returns A promise that resolves to the flipped image's data URL.
 */
export const flipImageHorizontally = (dataURL: string): Promise<string> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext("2d");
      if (!ctx) {
        reject(new Error("Unable to get canvas context"));
        return;
      }

      // Flip the image horizontally
      ctx.translate(img.width, 0);
      ctx.scale(-1, 1);
      ctx.drawImage(img, 0, 0);

      resolve(canvas.toDataURL("image/png"));
    };
    img.onerror = (error) => reject(error);
    img.src = dataURL;
  });
};
