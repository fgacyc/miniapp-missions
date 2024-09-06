import { RouterProvider } from "react-router-dom";
import { router } from "./routes/Routes";

const thinSF = new FontFace("SF-Pro", "url(/fonts/sf-pro/thin.otf)", {
  weight: "100",
});
const thinItalicSF = new FontFace(
  "SF-Pro",
  "url(/fonts/sf-pro/thinitalic.otf)",
  {
    weight: "100",
    style: "italic",
  }
);
const ultralightSF = new FontFace(
  "SF-Pro",
  "url(/fonts/sf-pro/ultralight.otf)",
  {
    weight: "200",
  }
);

const ultralightItalicSF = new FontFace(
  "SF-Pro",
  "url(/fonts/sf-pro/ultralightitalic.otf)",
  {
    weight: "200",
    style: "italic",
  }
);
const lightSF = new FontFace("SF-Pro", "url(/fonts/sf-pro/light.otf)", {
  weight: "300",
});
const lightItalicSF = new FontFace(
  "SF-Pro",
  "url(/fonts/sf-pro/lightitalic.otf)",
  {
    weight: "300",
    style: "italic",
  }
);

const normalSF = new FontFace("SF-Pro", "url(/fonts/sf-pro/regular.otf)", {
  weight: "400",
});

const normalItalicSF = new FontFace(
  "SF-Pro",
  "url(/fonts/sf-pro/regularitalic.otf)",
  {
    weight: "400",
    style: "italic",
  }
);

const mediumSF = new FontFace("SF-Pro", "url(/fonts/sf-pro/medium.otf)", {
  weight: "500",
});

const mediumItalicSF = new FontFace(
  "SF-Pro",
  "url(/fonts/sf-pro/mediumitalic.otf)",
  {
    weight: "500",
    style: "italic",
  }
);

const semiboldSF = new FontFace("SF-Pro", "url(/fonts/sf-pro/semibold.otf)", {
  weight: "600",
});

const semiboldItalicSF = new FontFace(
  "SF-Pro",
  "url(/fonts/sf-pro/semibolditalic.otf)",
  {
    weight: "600",
    style: "italic",
  }
);

const boldSF = new FontFace("SF-Pro", "url(/fonts/sf-pro/bold.otf)", {
  weight: "700",
});

const boldItalicSF = new FontFace(
  "SF-Pro",
  "url(/fonts/sf-pro/bolditalic.otf)",
  {
    weight: "700",
    style: "italic",
  }
);

const heavySF = new FontFace("SF-Pro", "url(/fonts/sf-pro/heavy.otf)", {
  weight: "800",
});

const heavyItalicSF = new FontFace(
  "SF-Pro",
  "url(/fonts/sf-pro/heavyitalic.otf)",
  {
    weight: "800",
    style: "italic",
  }
);

const blackSF = new FontFace("SF-Pro", "url(/fonts/black.otf)", {
  weight: "900",
});
const blackItalicSF = new FontFace("SF-Pro", "url(/fonts/blackitalic.otf)", {
  weight: "900",
  style: "italic",
});

document.fonts.add(thinSF);
document.fonts.add(thinItalicSF);
document.fonts.add(ultralightSF);
document.fonts.add(ultralightItalicSF);
document.fonts.add(lightSF);
document.fonts.add(lightItalicSF);
document.fonts.add(normalSF);
document.fonts.add(normalItalicSF);
document.fonts.add(mediumSF);
document.fonts.add(mediumItalicSF);
document.fonts.add(semiboldSF);
document.fonts.add(semiboldItalicSF);
document.fonts.add(boldSF);
document.fonts.add(boldItalicSF);
document.fonts.add(heavySF);
document.fonts.add(heavyItalicSF);
document.fonts.add(blackSF);
document.fonts.add(blackItalicSF);
thinSF.load();
thinItalicSF.load();
ultralightSF.load();
ultralightItalicSF.load();
lightSF.load();
lightItalicSF.load();
normalSF.load();
normalItalicSF.load();
mediumSF.load();
mediumItalicSF.load();
semiboldSF.load();
semiboldItalicSF.load();
boldSF.load();
boldItalicSF.load();
heavySF.load();
heavyItalicSF.load();
blackSF.load();
blackItalicSF.load();

function App() {
  return <RouterProvider router={router} />;
}

export default App;
