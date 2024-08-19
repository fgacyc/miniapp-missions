import { useState } from "react";
import ProfileToken from "../components/profile-token";
import { useUserStore } from "../store/use-store";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

export default function Index() {
  const [count, setCount] = useState(0);
  const navigate = useNavigate();
  const [UID, language] = useUserStore((state) => [state.UID, state.language]);
  const { t } = useTranslation();

  return (
    <div>
      <div className={"h-screen flex flex-col justify-center items-center"}>
        {/*<Profile />*/}
        <ProfileToken />
        <div
          className={"flex flex-row justify-between items-center w-[300px] "}
        >
          <div
            onClick={() => {
              navigate("/about");
            }}
          >
            <img
              src={"/fga_tech.png"}
              className="cursor-pointer h-28 w-28"
              alt="Vite logo"
            />
          </div>
          <div
            onClick={() => {
              navigate("/about");
            }}
          >
            <img
              src={"next-js.svg"}
              className="cursor-pointer h-28 w-28"
              alt="React logo"
            />
          </div>
        </div>
        <h1 className={"text-black font-bold text-4xl text-center my-8"}>
          {t("MiniApp Framework")}
        </h1>
        <div>
          {UID} | {language}
        </div>
        <div className="text-center p-8">
          <button
            className={`text-white rounded-lg bg-[#1a1a1a] py-2 px-4 border-2
                cursor-pointer border-transparent hover:border-[#192F8A] transition duration-300 ease-in-out`}
            onClick={() => setCount((count) => count + 1)}
          >
            {t("count is")} {count}
          </button>
          <p className={"my-4"}>
            Edit <code>src/App.jsx</code> and save to test HMR
          </p>
        </div>
        <p className="text-[#888888] text-center my-4">
          {t("Click on the logos to learn more")}
        </p>
      </div>
    </div>
  );
}
