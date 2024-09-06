import config from "../../package.json";
import {
  GoCommentDiscussion,
  GoGear,
  GoInfo,
  GoPerson,
  GoShareAndroid,
  GoTools,
  GoTrash,
  GoXCircle,
} from "react-icons/go";
import { IoRefreshSharp } from "react-icons/io5";
import { useActionSheetMenuStore } from "../store/action-sheet-menu-store";
import React, { type ReactNode, useEffect, useState } from "react";
import { useUserStore } from "../store/use-store";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

interface ActionSheetButtonProps {
  title: string;
  icon: ReactNode;
  onClick: () => void;
}

interface ButtonData {
  title: string;
  icon: ReactNode;
  onClick?: () => void | Window | null;
}

interface DevModalProps {
  visible: boolean;
  setDevModal: (value: boolean) => void;
}

const ActionSheetButton: React.FC<ActionSheetButtonProps> = ({
  title,
  icon,
  onClick,
}) => {
  return (
    <div className={"flex flex-col items-center"}>
      <button
        className={
          "flex flex-col items-center justify-center bg-gray-100 w-12 h-12 rounded-lg cursor-pointer"
        }
        onClick={onClick}
      >
        {icon}
      </button>
      <div className={"text-xs mt-1 text-gray-500"}>{title}</div>
    </div>
  );
};

const DevModal: React.FC<DevModalProps> = ({ visible, setDevModal }) => {
  const [url, setUrl] = useState<string>("");
  const [UID, lang, token] = useUserStore((state) => [
    state.UID,
    state.language,
    state.token,
  ]);
  const textAreaRow = 4;

  useEffect(() => {
    setUrl(window.location.href);
  }, []);
  return (
    <div
      className={`fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2  bg-[#ffffff] 
                        ${visible ? "block" : "hidden"}
                        shadow w-[calc(100vw*0.8)] h-[calc(100vh/2)] rounded text-xs`}
    >
      <div
        className={"flex justify-end p-2"}
        onClick={() => setDevModal(false)}
      >
        <GoXCircle className={"w-[20px] h-[20px]"} />
      </div>
      <hr />
      <div className={"h-full overflow-auto p-2"}>
        <div className={"my-1"}>
          <span className={"font-bold"}>UID: </span>
          <input
            defaultValue={UID ?? ""}
            className={"border border-black w-full"}
          />
        </div>
        <div className={"my-1"}>
          <span className={"font-bold"}>Language: </span>
          <span>{lang}</span>
        </div>
        <div className={"my-1"}>
          <h3 className={"font-bold"}>URL</h3>
          <textarea
            defaultValue={url}
            rows={textAreaRow}
            className={`w-full border border-black`}
          />
        </div>
        <div className={"my-1"}>
          <h3 className={"font-bold"}>Local DEV URL</h3>
          <textarea
            defaultValue={
              token
                ? "http://localhost:3000/?token=" + token + "&language=" + lang
                : ""
            }
            rows={textAreaRow}
            className={`w-full border border-black`}
          />
        </div>
        <div>
          <h3 className={"font-bold"}>Token</h3>
          <textarea
            defaultValue={token ?? ""}
            rows={textAreaRow}
            className={`w-full border border-black`}
          />
        </div>
      </div>
    </div>
  );
};

export default function ActionSheetMenu() {
  const [showMenu, setShowMenu] = useActionSheetMenuStore((state) => [
    state.showMenu,
    state.setShowMenu,
  ]);
  const [token, lang] = useUserStore((state) => [state.token, state.language]);
  const buttonStyle = "w-[28px] h-[28px]";
  const { t } = useTranslation();
  const [devModal, setDevModal] = useState<boolean>(false);
  const navigate = useNavigate();

  function copyToClipboard() {
    navigator.clipboard
      .writeText(window.location.href)
      .then(() => {
        console.log("Copied to clipboard");
      })
      .catch((reason) => {
        console.error("Failed to copy to clipboard", reason);
      });
  }

  const buttonsData: ButtonData[] = [
    {
      title: t("Feedback"),
      icon: <GoCommentDiscussion className={buttonStyle} />,
      onClick: () =>
        window.open(
          `https://miniapp-feedback.vercel.app/?app=${config.app_id}?token=${token}&&language=${lang}`,
          "_self"
        ),
    },
    {
      title: t("Re-enter"),
      icon: <IoRefreshSharp className={buttonStyle} />,
      onClick: () => window.location.reload(),
    },
    {
      title: t("Clean Cache"),
      icon: <GoTrash className={buttonStyle} />,
      onClick: () => {
        localStorage.clear();
        window.location.reload();
      },
    },
    {
      title: t("Settings"),
      icon: <GoGear className={buttonStyle} />,
      onClick: () => {
        setShowMenu(false);
        navigate("/settings");
      },
    },
    {
      title: t("Profile"),
      icon: <GoPerson className={buttonStyle} />,
      onClick: () =>
        window.open("https://fga-accounts-center.pages.dev/", "_self"),
    },
    {
      title: t("About"),
      icon: <GoInfo className={buttonStyle} />,
      onClick: () => {
        setShowMenu(false);
        navigate("/about");
      },
    },
    {
      title: t("Share"),
      icon: config.shared ? (
        <GoShareAndroid className={buttonStyle} />
      ) : (
        <GoShareAndroid className={`${buttonStyle} text-gray-300`} />
      ),
      // @ts-expect-error this a different type of onClick
      onClick: !config.shared ? null : copyToClipboard,
    },
    {
      title: t("DEV"),
      icon: <GoTools className={buttonStyle} />,
      onClick: () => {
        setDevModal(true);
        setShowMenu(false);
      },
    },
  ];

  useEffect(() => {
    if (showMenu) {
      document.body.classList.add("overflow-hidden");
    } else document.body.classList.remove("overflow-hidden");
  }, [showMenu]);

  return (
    <>
      <DevModal visible={devModal} setDevModal={setDevModal} />
      <div
        className={`fixed top-0 min-h-screen w-full transition duration-300 ease-in-out
            ${showMenu ? "z-[999] bg-[#00000030]" : "-z-10 bg-[#00000000]"}`}
        onClick={() => setShowMenu(false)}
      ></div>
      <div
        className={`fixed -bottom-0 ease-in-out duration-300 w-full z-[9999]
            ${
              showMenu
                ? "transition-transform -translate-y-0"
                : "transition-transform translate-y-full"
            }`}
      >
        <div
          className={`flex flex-col border shadow-lg rounded-t-3xl bg-white`}
        >
          <div className={"text-center p-3 border-b "}>
            {lang === "zh" && config.name_zh}
            {lang === "en" && config.name}
          </div>
          <div className={"grid grid-cols-4 gap-2 p-4 w-full"}>
            {buttonsData.map((button, index) => (
              <ActionSheetButton
                key={index}
                title={button.title}
                icon={button.icon}
                onClick={button.onClick ?? (() => console.log("NO FUNC"))} // Provide a default handler if onClick is undefined
              />
            ))}
          </div>
          <div
            className={"text-center p-5 border-t cursor-pointer"}
            onClick={() => setShowMenu(false)}
          >
            {t("Cancel")}
          </div>
        </div>
        {/*<div className={`absolute bottom-0 h-screen w-full bg-red-200`}>*/}
        {/*    /!*    ${!showMenu && 'hidden'}*!/*/}

        {/*</div>*/}
      </div>
    </>
  );
}
