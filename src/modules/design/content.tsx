import { DesignCanvas } from "@/components/DesignCanvas";
import { extractDateTime } from "@/helpers";
import { useDesign } from "@/store/useDesign";
import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { Splide, SplideSlide, SplideTrack } from "react-splide-ts";
import "react-splide-ts/css/core";

const DesignContent = () => {
  const { t } = useTranslation();
  const { form } = useDesign();
  const swiperRef = useRef(null);
  const [loading, setLoading] = useState(true);
  const [currentActiveIndex, setCurrentActiveIndex] = useState<number>(0);

  const handleShareImage = (href: string) => {
    // @ts-expect-error no flutter_inappwebview in typical Window, this is injected in webview
    if (!window.flutter_inappwebview) return;
    // @ts-expect-error no flutter_inappwebview in typical Window, this is injected in webview
    window.flutter_inappwebview
      .callHandler(
        "share",
        "image",
        `${form.theme}-${extractDateTime(form.datetime).date}.jpg`,
        href
      )
      .then((result: string) => {
        console.log(result);
      });
  };

  useEffect(() => {
    const dmSerif = new FontFace(
      "dmserif",
      "url(/fonts/dm-serif/regular.ttf)",
      {
        weight: "400",
      }
    );
    const poppinsBlack = new FontFace(
      "poppins",
      "url(/fonts/poppins/black.ttf)",
      {
        weight: "900",
      }
    );
    const warIsOver = new FontFace(
      "war-is-over",
      "url(/fonts/war-is-over/all.ttf)"
    );
    const leagueSpartan = new FontFace(
      "league-spartan",
      "url(/fonts/league-spartan/bold.ttf)"
    );
    const tenorSans = new FontFace(
      "tenor-sans",
      "url(/fonts/tenor-sans/regular.ttf)"
    );
    const archivo = new FontFace("archivo", "url(/fonts/archivo/regular.ttf)");
    const robotoCondensed = new FontFace(
      "roboto-condensed",
      "url(/fonts/roboto-condensed/bold.ttf)",
      {
        weight: "700",
      }
    );
    const raleway = new FontFace(
      "raleway",
      "url(/fonts/raleway/extrabold.ttf)",
      {
        weight: "800",
      }
    );
    const feelingPassionate = new FontFace(
      "feeling-passionate",
      "url(/fonts/feeling-passionate/all.otf)"
    );
    const adventPro = new FontFace(
      "advent-pro",
      "url(/fonts/advent-pro/bold.ttf)",
      {
        weight: "700",
      }
    );

    const montserratBlack = new FontFace(
      "montserrat",
      "url(/fonts/montserrat/black.ttf)",
      { weight: "900" }
    );
    const montserratBold = new FontFace(
      "montserrat",
      "url(/fonts/montserrat/bold.ttf)",
      { weight: "700" }
    );

    const pinyonScript = new FontFace(
      "pinyon",
      "url(/fonts/pinyon-script/regular.ttf)"
    );

    document.fonts.add(dmSerif);
    document.fonts.add(poppinsBlack);
    document.fonts.add(warIsOver);
    document.fonts.add(leagueSpartan);
    document.fonts.add(tenorSans);
    document.fonts.add(archivo);
    document.fonts.add(robotoCondensed);
    document.fonts.add(raleway);
    document.fonts.add(feelingPassionate);
    document.fonts.add(adventPro);
    document.fonts.add(montserratBlack);
    document.fonts.add(montserratBold);
    document.fonts.add(pinyonScript);
    dmSerif.load();
    poppinsBlack.load();
    warIsOver.load();
    leagueSpartan.load();
    tenorSans.load();
    archivo.load();
    robotoCondensed.load();
    raleway.load();
    feelingPassionate.load();
    adventPro.load();
    montserratBlack.load();
    montserratBold.load();
    pinyonScript.load();
    document.fonts.ready.then(() => setLoading(false));
  }, []);

  return (
    <div className="h-full w-full p-5 flex flex-col justify-center">
      <h1 className="font-bold text-4xl text-center w-full">
        {t("designtab.generated.title")}
      </h1>
      <p className="text-[#92969D] text-base mt-1 text-center w-full">
        {t("designtab.generated.subtitle")}
      </p>

      {loading ? (
        <div
          style={{
            boxShadow: "0px 4px 8px 0px #00000040",
          }}
          className="shad rounded-xl flex flex-col items-center justify-center w-full aspect-square mt-7"
        >
          <span className="loader" />
        </div>
      ) : (
        <Splide
          ref={swiperRef}
          hasTrack={false}
          options={{
            pagination: true,
            arrows: false,
            gap: 50,
          }}
          onMoved={(splide) => setCurrentActiveIndex(splide.index)}
          // onScrolled={(splide) => console.log(splide.index)}
        >
          <SplideTrack>
            <SplideSlide className="w-screen">
              <div
                style={{
                  boxShadow: "0px 4px 8px 0px #00000040",
                }}
                className="shad rounded-xl flex flex-col items-center justify-center w-full mt-7"
              >
                <div
                  style={{
                    WebkitMaskImage:
                      "url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAIAAACQd1PeAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAA5JREFUeNpiYGBgAAgwAAAEAAGbA+oJAAAAAElFTkSuQmCC)",
                  }}
                  className="overflow-none relative rounded-xl"
                >
                  <DesignCanvas className="w-full h-full" variant={1} />
                </div>
              </div>
            </SplideSlide>
            <SplideSlide className="w-screen">
              <div
                style={{
                  boxShadow: "0px 4px 8px 0px #00000040",
                }}
                className="shad rounded-xl flex flex-col items-center justify-center w-full mt-7"
              >
                <div
                  style={{
                    WebkitMaskImage:
                      "url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAIAAACQd1PeAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAA5JREFUeNpiYGBgAAgwAAAEAAGbA+oJAAAAAElFTkSuQmCC)",
                  }}
                  className="overflow-none relative rounded-xl"
                >
                  <DesignCanvas className="w-full h-full" variant={2} />
                </div>
              </div>
            </SplideSlide>
            <SplideSlide className="w-screen">
              <div
                style={{
                  boxShadow: "0px 4px 8px 0px #00000040",
                }}
                className="shad rounded-xl flex flex-col items-center justify-center w-full mt-7"
              >
                <div
                  style={{
                    WebkitMaskImage:
                      "url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAIAAACQd1PeAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAA5JREFUeNpiYGBgAAgwAAAEAAGbA+oJAAAAAElFTkSuQmCC)",
                  }}
                  className="overflow-none relative rounded-xl"
                >
                  <DesignCanvas className="w-full h-full" variant={3} />
                </div>
              </div>
            </SplideSlide>
          </SplideTrack>
          <ul className="splide__pagination mt-3 !flex-nowrap w-full gap-2"></ul>
        </Splide>
      )}
      <button
        className="rounded-full w-full bg-[#191D1A] py-2 text-lg mt-10 text-white"
        onClick={() => {
          try {
            const canvas = document.getElementById(
              `${currentActiveIndex + 1}`
            ) as HTMLCanvasElement;
            const image = canvas
              .toDataURL("image/jpg", 1)
              .replace("image/jpg", "image/octet-stream");
            const link = document.createElement("a");
            link.download = `${form.theme}-${
              extractDateTime(form.datetime).date
            }.jpg`;
            link.href = image;
            link.click();

            handleShareImage(image);
          } catch (err) {
            alert(err);
          }
        }}
      >
        {t("designtab.start_invite")}
      </button>
    </div>
  );
};

export default DesignContent;
