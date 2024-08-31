import { extractDateTime } from "@/helpers";
import { useDesign } from "@/store/useDesign";
import { useEffect, useRef } from "react";

type DesignVariant = 1 | 2 | 3;
type FontPosition = {
  x: number;
  y: number;
  fillStyle: string;
  fontStyle: string;
};
type VariantObj = {
  src: string;
  titlePos: FontPosition;
  // subtitlePos?: FontPosition;
  datetimePos: FontPosition;
  venuePos: FontPosition;
};
interface DesignCanvasProps {
  className: string;
  variant?: DesignVariant;
}

const variantMap: Record<DesignVariant, VariantObj> = {
  1: {
    src: "/posts/1.jpg",
    titlePos: {
      x: 124,
      y: 522,
      fillStyle: "#F89029",
      fontStyle: "84px Neuton",
    },
    datetimePos: {
      x: 124,
      y: 930,
      fillStyle: "#F89029",
      fontStyle: "24px SF-Pro",
    },
    venuePos: {
      x: 124,
      y: 970,
      fillStyle: "#F89029",
      fontStyle: "24px SF-Pro",
    },
  },
  2: {
    src: "/posts/1.jpg",
    titlePos: {
      x: 124,
      y: 522,
      fillStyle: "#F89029",
      fontStyle: "84px Neuton",
    },
    datetimePos: {
      x: 124,
      y: 930,
      fillStyle: "#F89029",
      fontStyle: "24px SF-Pro",
    },
    venuePos: {
      x: 124,
      y: 970,
      fillStyle: "#F89029",
      fontStyle: "24px SF-Pro",
    },
  },
  3: {
    src: "/posts/1.jpg",
    titlePos: {
      x: 124,
      y: 522,
      fillStyle: "#F89029",
      fontStyle: "84px Neuton",
    },
    datetimePos: {
      x: 124,
      y: 930,
      fillStyle: "#F89029",
      fontStyle: "24px SF-Pro",
    },
    venuePos: {
      x: 124,
      y: 970,
      fillStyle: "#F89029",
      fontStyle: "24px SF-Pro",
    },
  },
};

export const DesignCanvas: React.FC<DesignCanvasProps> = ({
  className,
  variant = 1,
}) => {
  const ref = useRef<HTMLCanvasElement | null>(null);
  const { form } = useDesign();
  const pos = variantMap[variant];

  const { date, time } = extractDateTime(form.datetime);

  useEffect(() => {
    const img = new Image();
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

      ctx.clearRect(0, 0, ref.current.width, ref.current.height); // Clear the original image
      ctx.putImageData(imgData, 0, 0); // Paint the new colorised image
      // Title
      ctx.fillStyle = pos.titlePos.fillStyle;
      ctx.font = pos.titlePos.fontStyle;
      ctx.textAlign = "left";
      ctx.textBaseline = "top";
      ctx.fillText(form.theme, pos.titlePos.x, pos.titlePos.y);

      // Datetime
      ctx.textAlign = "left";
      ctx.textBaseline = "top";
      ctx.fillStyle = pos.datetimePos.fillStyle;
      ctx.font = pos.datetimePos.fontStyle;
      ctx.fillText(`${date} | ${time}`, pos.datetimePos.x, pos.datetimePos.y);

      // Venue
      ctx.textAlign = "left";
      ctx.textBaseline = "top";
      ctx.fillStyle = pos.venuePos.fillStyle;
      ctx.font = pos.venuePos.fontStyle;
      ctx.fillText(form.venue, pos.venuePos.x, pos.venuePos.y);
    };

    // Load the image
    img.src = pos.src;
  }, [form, pos, variant, date, time]);

  return <canvas ref={ref} className={className} width={1164} height={1164} />;
};
