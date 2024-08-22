import { useNavigate, useParams } from "react-router-dom";
import { useMessages } from "../../store/useMessages";
import { IoChevronBackSharp, IoChevronForwardSharp } from "react-icons/io5";
import { useTranslation } from "react-i18next";
import Markdown from "react-markdown";
// import { t } from "i18next";

const MessageContent = () => {
  const params = useParams();
  const id = Number(params.id);
  const messages = useMessages();
  const content = messages[id];
  const allIds = Object.keys(messages)
    .filter((key) => !isNaN(Number(key)))
    .map((key) => Number(key));

  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <div className="py-3 flex flex-col w-full gap-5">
      <div>
        <div className="flex relative flex-row items-center justify-between">
          {allIds.includes(Number(id - 1)) ? (
            <IoChevronBackSharp
              onClick={() => navigate(`/message/${id - 1}`)}
              size={30}
              className="-translate-x-1/2"
            />
          ) : (
            <div className="w-[30px] h-[30px]" />
          )}
          <h1 className="font-extrabold text-3xl text-center w-[70%]">
            {content.title}
          </h1>
          {allIds.includes(Number(id + 1)) ? (
            <IoChevronForwardSharp
              onClick={() => navigate(`/message/${id + 1}`)}
              size={30}
              className="translate-x-1/2"
            />
          ) : (
            <div className="w-[30px] h-[30px]" />
          )}
        </div>
        {/* {console.log(content)} */}
        <div className="w-full text-lg text-[#92969D] text-center pt-2">
          {content.verse}
        </div>
      </div>
      <div className="flex flex-col w-full">
        {/* <h2 className="font-bold text-2xl">{t("messagetab.introduction")}</h2> */}
        <Markdown className="text-justify prose">{content.content}</Markdown>
      </div>

      <button
        onClick={() => alert("placeholder")}
        className="bg-black text-white text-lg rounded-full w-full py-3"
      >
        {t("messagetab.save_this_sermon")}
      </button>
    </div>
  );
};

export default MessageContent;
