import { extractDateTime } from "@/helpers";
import { useDesign } from "@/store/useDesign";
import { useEffect, useRef } from "react";

type DesignVariant = 1 | 2 | 3;
export type TypeVariant =
  | "mid_autumn"
  | "food"
  | "games"
  | "parentkid"
  | "outing"
  | "";
type FontPosition = {
  x: number;
  y: number;
  fillStyle?: string;
  fontStyle: string;
  textAlign?: CanvasTextAlign;
  noUppercase?: boolean;
  lineHeight?: number;
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
  variant: DesignVariant;
}

const variantMap: Omit<
  Record<TypeVariant, Record<DesignVariant, VariantObj>>,
  ""
> = {
  mid_autumn: {
    1: {
      src: "/1.jpg",
      titlePos: {
        x: 124,
        y: 520,
        fillStyle: "#F89029",
        fontStyle: "84px Neuton, chi1",
        lineHeight: 70,
      },
      datetimePos: {
        x: 124,
        y: 927,
        fillStyle: "#F89029",
        fontStyle: "900 30px SF-Pro",
      },
      venuePos: {
        x: 124,
        y: 970,
        fillStyle: "#F89029",
        fontStyle: "26px SF-Pro",
      },
    },
    2: {
      src: "/2.jpg",
      titlePos: {
        x: 582,
        y: 340,
        fillStyle: "#555553",
        fontStyle: "110px dmserif, chi2",
        textAlign: "center",
        lineHeight: 100,
      },
      datetimePos: {
        x: 582,
        y: 862,
        textAlign: "center",
        fillStyle: "#B3856C",
        fontStyle: "900 30px SF-Pro",
      },
      venuePos: {
        x: 582,
        y: 910,
        textAlign: "center",
        fillStyle: "#B3856C",
        fontStyle: "26px SF-Pro",
      },
    },
    3: {
      src: "/3.jpg",
      titlePos: {
        x: 134,
        y: 250,
        fontStyle: "900 110px poppins, chi3",
        lineHeight: 105,
      },
      datetimePos: {
        x: 134,
        y: 835,
        fillStyle: "#fff",
        fontStyle: "900 30px SF-Pro",
      },
      venuePos: {
        x: 134,
        y: 880,
        fillStyle: "#fff",
        fontStyle: "26px SF-Pro",
      },
    },
  },
  food: {
    1: {
      src: "/1.jpg",
      titlePos: {
        x: 124,
        y: 540,
        fillStyle: "rgba(255,255,255,0.7)",
        fontStyle: "140px war-is-over, chi4",
        lineHeight: 140,
      },
      datetimePos: {
        x: 124,
        y: 930,
        fillStyle: "#FF3C35",
        fontStyle: "900 24px SF-Pro",
      },
      venuePos: {
        x: 124,
        y: 970,
        fillStyle: "#fff",
        fontStyle: "24px SF-Pro",
      },
    },
    2: {
      src: "/2.jpg",
      titlePos: {
        x: 582,
        y: 300,
        fillStyle: "#fff",
        fontStyle: "150px league-spartan, chi3",
        textAlign: "center",
        lineHeight: 120,
      },
      datetimePos: {
        x: 582,
        y: 862,
        textAlign: "center",
        fillStyle: "#ffa242",
        fontStyle: "900 30px SF-Pro",
      },
      venuePos: {
        x: 582,
        y: 910,
        textAlign: "center",
        fillStyle: "#fff",
        fontStyle: "26px SF-Pro",
      },
    },
    3: {
      src: "/3.jpg",
      titlePos: {
        x: 134,
        y: 250,
        fillStyle: "#C79562",
        fontStyle: "900 110px tenor-sans, chi6",
        lineHeight: 115,
      },
      datetimePos: {
        x: 134,
        y: 835,
        fillStyle: "#C79562",
        fontStyle: "900 30px SF-Pro",
      },
      venuePos: {
        x: 134,
        y: 880,
        fillStyle: "#fff",
        fontStyle: "26px SF-Pro",
      },
    },
  },
  games: {
    1: {
      src: "/1.jpg",
      titlePos: {
        x: 124,
        y: 510,
        fillStyle: "#fff",
        fontStyle: "140px archivo, chi3",
        lineHeight: 110,
      },
      datetimePos: {
        x: 124,
        y: 930,
        fillStyle: "#fff",
        fontStyle: "900 24px SF-Pro",
      },
      venuePos: {
        x: 124,
        y: 970,
        fillStyle: "#fff",
        fontStyle: "24px SF-Pro",
      },
    },
    2: {
      src: "/2.jpg",
      titlePos: {
        x: 582,
        y: 310,
        fillStyle: "#fff",
        fontStyle: "700 150px roboto-condensed, chi8",
        textAlign: "center",
        lineHeight: 150,
      },
      datetimePos: {
        x: 582,
        y: 862,
        textAlign: "center",
        fillStyle: "#fff",
        fontStyle: "900 30px SF-Pro",
      },
      venuePos: {
        x: 582,
        y: 910,
        textAlign: "center",
        fillStyle: "#fff",
        fontStyle: "26px SF-Pro",
      },
    },
    3: {
      src: "/3.jpg",
      titlePos: {
        x: 134,
        y: 250,
        fontStyle: "800 140px raleway, chi3",
        lineHeight: 120,
      },
      datetimePos: {
        x: 134,
        y: 835,
        fillStyle: "#7C7DE3",
        fontStyle: "900 30px SF-Pro",
      },
      venuePos: {
        x: 134,
        y: 880,
        fillStyle: "#7C7DE3",
        fontStyle: "26px SF-Pro",
      },
    },
  },
  parentkid: {
    1: {
      src: "/1.jpg",
      titlePos: {
        x: 124,
        y: 540,
        fillStyle: "#462718",
        noUppercase: true,
        fontStyle: "114px feeling-passionate, chi10",
        lineHeight: 120,
      },
      datetimePos: {
        x: 124,
        y: 930,
        fillStyle: "#1d1d1b",
        fontStyle: "900 24px SF-Pro",
      },
      venuePos: {
        x: 124,
        y: 970,
        fillStyle: "#1d1d1b",
        fontStyle: "24px SF-Pro",
      },
    },
    2: {
      src: "/2.jpg",
      titlePos: {
        x: 582,
        y: 280,
        fillStyle: "#fff",
        fontStyle: "800 150px raleway, chi3",
        textAlign: "center",
        lineHeight: 135,
      },
      datetimePos: {
        x: 582,
        y: 862,
        textAlign: "center",
        fillStyle: "#fff",
        fontStyle: "900 30px SF-Pro",
      },
      venuePos: {
        x: 582,
        y: 910,
        textAlign: "center",
        fillStyle: "#fff",
        fontStyle: "26px SF-Pro",
      },
    },
    3: {
      src: "/3.jpg",
      titlePos: {
        x: 134,
        y: 250,
        fillStyle: "#1d1d1b",
        fontStyle: "800 140px advent-pro, chi8",
        lineHeight: 125,
      },
      datetimePos: {
        x: 134,
        y: 835,
        fillStyle: "#1d1d1b",
        fontStyle: "900 30px SF-Pro",
      },
      venuePos: {
        x: 134,
        y: 880,
        fillStyle: "#1d1d1b",
        fontStyle: "26px SF-Pro",
      },
    },
  },
  outing: {
    1: {
      src: "/1.jpg",
      titlePos: {
        x: 124,
        y: 540,
        fillStyle: "#fff",
        // noUppercase: true,
        fontStyle: "900 114px montserrat, chi3",
        lineHeight: 120,
      },
      datetimePos: {
        x: 124,
        y: 930,
        fillStyle: "#fff",
        fontStyle: "900 24px SF-Pro",
      },
      venuePos: {
        x: 124,
        y: 970,
        fillStyle: "#fff",
        fontStyle: "24px SF-Pro",
      },
    },
    2: {
      src: "/2.jpg",
      titlePos: {
        x: 582,
        y: 300,
        noUppercase: true,
        fillStyle: "#fff",
        fontStyle: "700 150px montserrat",
        textAlign: "center",
        lineHeight: 150,
      },
      datetimePos: {
        x: 582,
        y: 862,
        textAlign: "center",
        fillStyle: "#fff",
        fontStyle: "900 30px SF-Pro",
      },
      venuePos: {
        x: 582,
        y: 910,
        textAlign: "center",
        fillStyle: "#fff",
        fontStyle: "26px SF-Pro",
      },
    },
    3: {
      src: "/3.jpg",
      titlePos: {
        x: 134,
        y: 250,
        noUppercase: true,
        fillStyle: "#E69375",
        lineHeight: 140,
        fontStyle: "150px pinyon, chi15",
      },
      datetimePos: {
        x: 134,
        y: 835,
        fillStyle: "#748E7E",
        fontStyle: "900 30px SF-Pro",
      },
      venuePos: {
        x: 134,
        y: 880,
        fillStyle: "#748E7E",
        fontStyle: "26px SF-Pro",
      },
    },
  },
};

export const DesignCanvas: React.FC<DesignCanvasProps> = ({
  className,
  variant,
}) => {
  const ref = useRef<HTMLCanvasElement | null>(null);
  const { form } = useDesign();
  // @ts-expect-error there will not be a index with "" its just a small hack for now
  const pos = variantMap[form.type][variant];

  const { date, time } = extractDateTime(form.datetime);

  useEffect(() => {
    const img = new Image();
    if (!ref.current) return;

    const ctx = ref.current.getContext("2d");
    if (!ctx) return;

    // printAtWordWrap( txt, 10, 20, 15, 90 );

    function printAtWordWrap(
      text: string,
      x: number,
      y: number,
      lineHeight: number,
      fitWidth: number
    ) {
      if (!ctx) return;
      fitWidth = fitWidth || 0;

      if (fitWidth <= 0) {
        ctx.fillText(text, x, y);
        return;
      }
      let words = text.split(" ");
      let currentLine = 0;
      let idx = 1;
      while (words.length > 0 && idx <= words.length) {
        const str = words.slice(0, idx).join(" ");
        const w = ctx.measureText(str).width;
        if (w > fitWidth) {
          if (idx == 1) {
            idx = 2;
          }
          ctx.fillText(
            words.slice(0, idx - 1).join(" "),
            x,
            y + lineHeight * currentLine
          );
          currentLine++;
          words = words.splice(idx - 1);
          idx = 1;
        } else {
          idx++;
        }
      }
      if (idx > 0)
        ctx.fillText(words.join(" "), x, y + lineHeight * currentLine);
    }

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
      let gradient: CanvasGradient;

      if (form.type === "mid_autumn") {
        gradient = ctx.createLinearGradient(0, 0, 0, 1200);
        gradient.addColorStop(0.24, "#73CFD5");
        gradient.addColorStop(0.5, "#6876B8");
      } else if (form.type === "games") {
        gradient = ctx.createLinearGradient(134, -200, 1200, 200);
        gradient.addColorStop(1, "#B387EF");
        gradient.addColorStop(0.5, "#A0A4E4");
        gradient.addColorStop(0, "#9DE6BB");
      }
      const drawText = () => {
        // Title
        ctx.fillStyle = pos.titlePos.fillStyle ?? gradient;
        ctx.font = pos.titlePos.fontStyle;
        ctx.textAlign = pos.titlePos.textAlign ?? "left";
        ctx.textBaseline = "top";
        // ctx.fillText(
        //   !pos.titlePos.noUppercase ? form.theme.toUpperCase() : form.theme,
        //   pos.titlePos.x,
        //   pos.titlePos.y
        // );
        printAtWordWrap(
          !pos.titlePos.noUppercase ? form.theme.toUpperCase() : form.theme,
          pos.titlePos.x,
          pos.titlePos.y,
          pos.titlePos.lineHeight,
          600
        );

        // Datetime
        ctx.textAlign = pos.datetimePos.textAlign ?? "left";
        ctx.textBaseline = "top";
        ctx.fillStyle = pos.datetimePos.fillStyle ?? gradient;
        ctx.font = pos.datetimePos.fontStyle;
        ctx.fillText(
          `${date} | ${time}`.toUpperCase(),
          pos.datetimePos.x,
          pos.datetimePos.y
        );

        // Venue
        ctx.textAlign = pos.venuePos.textAlign ?? "left";
        ctx.textBaseline = "top";
        ctx.fillStyle = pos.venuePos.fillStyle ?? gradient;
        ctx.font = pos.venuePos.fontStyle;
        ctx.fillText(form.venue.toUpperCase(), pos.venuePos.x, pos.venuePos.y);
      };

      document.fonts.ready.then(() => drawText());
      // window.addEventListener("load", () => drawText());
    };

    // Load the image
    img.src = `/types/${form.type}/${pos.src}`;

    // console.log(form.type);
  }, [form, pos, variant, date, time]);

  return (
    <canvas
      id={String(variant)}
      ref={ref}
      className={className}
      width={1164}
      height={1164}
    />
  );
};
