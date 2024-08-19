import config from "../../../package.json";
import { GoChevronRight } from "react-icons/go";
import Block from "../../components/block.tsx";
import NavBar from "../../components/nav-bar.tsx";
import { useUserStore } from "../../store/use-store.ts";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

export default function About() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const lang = useUserStore((state) => state.language);

  return (
    <div className={"h-screen"}>
      <NavBar>{t("About")}</NavBar>
      <div className={"flex flex-col items-center p-8 bg-white mb-2"}>
        <img
          src="/app_icon.png"
          alt="app logo"
          className={"rounded-full h-12 w-12"}
        />
        <h1 className={"text-black text-xl text-center mt-4 capitalize"}>
          {lang === "zh" && config.name_zh}
          {lang === "en" && config.name}
        </h1>
      </div>

      <Block title={undefined}>
        <div className={"flex justify-between items-center"}>
          <div>
            {t("Version")}: V{config.version}
          </div>
          <div className={"bg-gray-100 px-1 py-[1px] rounded text-gray-600"}>
            {t("Latest Version")}
          </div>
        </div>
      </Block>

      <Block title={undefined}>
        <div className={"flex justify-between items-center"}>
          <div>
            {t("Developer")}: {config.author}
          </div>
          <div className={"flex"}>
            {config.instagram && (
              <a href={config.instagram} className={"px-2"}>
                <img
                  src={"/instagram.png"}
                  alt="instagram"
                  className={"h-6 w-6"}
                />
              </a>
            )}
            {config.github && (
              <a href={config.github} target={"_blank"}>
                <img src={"/github.png"} alt="github" className={"h-6 w-6"} />
              </a>
            )}
          </div>
        </div>
      </Block>

      <Block title={undefined}>
        <div
          className={"pb-2 flex flex-row justify-between  items-center"}
          onClick={() => navigate("/terms-of-service")}
        >
          <div>{t("Terms of Service")}</div>
          <GoChevronRight className={"w-[18px] h-[18px]"} />
        </div>
        <hr />
        <div
          className={"pt-2 flex flex-row justify-between items-center"}
          onClick={() => navigate("/privacy-policy")}
        >
          <div>{t("Privacy Policy")}</div>
          <GoChevronRight className={"w-[18px] h-[18px]"} />
        </div>
      </Block>
    </div>
  );
}
