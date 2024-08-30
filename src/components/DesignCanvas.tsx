import { useEffect, useRef } from "react";

interface DesignCanvasProps {
  src: string;
  className: string;
}

export const DesignCanvas: React.FC<DesignCanvasProps> = ({
  src,
  className,
}) => {
  const ref = useRef<HTMLCanvasElement | null>(null);
  const img = new Image();

  useEffect(() => {
    if (!ref.current) return;

    const ctx = ref.current.getContext("2d");
    if (!ctx) return;

    img.onload = () => {
      if (!ref.current) return;
      // Draw the original image so that you can fetch the colour data
      ctx.drawImage(img, 0, 0, ref.current.width, ref.current.height);
      const imgData = ctx.getImageData(
        0,
        0,
        ref.current.width,
        ref.current.height
      );

      /*
      imgData.data is a one-dimensional array which contains 
      the respective RGBA values for every pixel 
      in the selected region of the context 
      (note i+=4 in the loop)
      */

      // for (let i = 0; i < imgData.data.length; i += 4) {
      //   imgData.data[i] = 255; // Red, 0-255
      //   imgData.data[i + 1] = 255; // Green, 0-255
      //   imgData.data[i + 2] = 255; // Blue, 0-255
      //   // imgData.data[i + 3] contains the alpha value which we are ignoring
      // }1

      ctx.clearRect(0, 0, ref.current!.width, ref.current!.height); // Clear the original image
      ctx.putImageData(imgData, 0, 0); // Paint the new colorised image
    };

    // Load the image
    img.src = src;
  }, [src, img]);

  return <canvas ref={ref} className={className} width={1080} height={1080} />;
};
