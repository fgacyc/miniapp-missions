import { createBrowserRouter } from "react-router-dom";
import Frame from "../modules/Frame";
import Index from "../pages";
import DesignTab from "../modules/design";
import MessageTab from "../modules/message";
import MusicTab from "../modules/music";
import About from "../pages/framework/about";
import PrivacyPolicy from "../pages/framework/privacy-policy";
import TermsOfService from "../pages/framework/terms-of-service";
import Settings from "../pages/framework/settings";
import MessageContent from "../modules/message/content";
import DesignContent from "@/modules/design/content";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Frame />,
    children: [
      {
        path: "/",
        element: <Index />,
        children: [
          {
            path: "design",
            element: <DesignTab />,
          },
          { path: "design/complete", element: <DesignContent /> },
          {
            path: "message",
            element: <MessageTab />,
          },
          {
            path: "message/:id",
            element: <MessageContent />,
          },
          {
            path: "music",
            element: <MusicTab />,
          },
        ],
      },
      {
        path: "/about",
        element: <About />,
      },
      {
        path: "/privacy-policy",
        element: <PrivacyPolicy />,
      },
      {
        path: "/terms-of-service",
        element: <TermsOfService />,
      },
      {
        path: "/settings",
        element: <Settings />,
      },
    ],
  },
]);
