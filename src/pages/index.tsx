// import { useState } from "react";
import ProfileToken from "../components/profile-token";
// import { useUserStore } from "../store/use-store";
import { useTranslation } from "react-i18next";
import { Outlet } from "react-router-dom";
import { TabBar } from "../components/TabBar";

export default function Index() {
  //   const [count, setCount] = useState(0);
  //   const navigate = useNavigate();
  //   const [UID, language] = useUserStore((state) => [state.UID, state.language]);
  const { t } = useTranslation();

  return (
    <div>
      <div className={"min-h-screen flex flex-col"}>
        {/*<Profile />*/}
        <ProfileToken />

        <div className="sticky z-20 top-0 bg-gradient-to-r h-[115.6px] from-[#2852A3] to-[#183670] w-full overflow-hidden">
          <div className="min-h-[35.6px]" />
          <div className="relative h-[78px] flex flex-row items-center">
            <img
              src="/logo.png"
              className="object-cover h-[130%] absolute -left-[2%] top-1/2 -translate-y-1/2"
            />
            <h1 className="text-white absolute right-7 text-3xl font-extrabold">
              {t("title")}
            </h1>
          </div>
        </div>
        <div className="py-[20px] px-[17px] h-full flex-grow">
          <TabBar />
          <div className="flex flex-col flex-grow py-4">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
}
