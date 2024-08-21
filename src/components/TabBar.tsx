import { useTranslation } from "react-i18next";
import { useLocation, useNavigate } from "react-router-dom";

// export type Tab = "design" | "message" | "music";

// interface TabBarProps {
//   selectedTab: Tab;
//   setSelectedTab: Dispatch<SetStateAction<TabBarProps["selectedTab"]>>;
// }

export const TabBar = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div className="gap-[10px] rounded-[10px] px-[10px] py-[9px] bg-white flex flex-row items-center justify-between">
      <button
        onClick={() => navigate("/design")}
        className={`${
          location.pathname.includes("design")
            ? "bg-[#2852A3] text-white"
            : "bg-transparent"
        } w-full text-[15px] transition-colors duration-150 font-bold capitalize py-[15px] rounded-[5px] text-center`}
      >
        {t("design")}
      </button>
      <button
        onClick={() => navigate("/message")}
        className={`${
          location.pathname.includes("message")
            ? "bg-[#2852A3] text-white"
            : "bg-transparent"
        } w-full text-[15px] transition-colors duration-150 font-bold capitalize py-[15px] rounded-[5px] text-center`}
      >
        {t("message")}
      </button>
      <button
        onClick={() => navigate("/music")}
        className={`${
          location.pathname.includes("music")
            ? "bg-[#2852A3] text-white"
            : "bg-transparent"
        } w-full text-[15px] transition-colors duration-150 font-bold capitalize py-[15px] rounded-[5px] text-center`}
      >
        {t("music")}
      </button>
    </div>
  );
};
