import { FunctionComponent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMessages } from "../store/useMessages";

interface MessageCardProps {
  id: number;
}

export const MessageCard: FunctionComponent<MessageCardProps> = ({ id }) => {
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();
  const messageStore = useMessages();
  const setMessage = messageStore.setMessage;

  useEffect(() => {
    void fetch(`${import.meta.env["VITE_API_URL"]}messages/${id}`, {
      method: "GET",
    }).then((res) =>
      res.json().then((data) => {
        if (res.ok) {
          //   console.log(data.data);
          setLoading(false);
          setMessage(id, data.data);
        }
      })
    );
  }, [id, setMessage]);

  return (
    <button
      onClick={() => navigate(`/message/${id}`)}
      className={`aspect-video ${
        loading ? "gradient-loading" : ""
      } rounded-[10px] w-full overflow-hidden relative`}
    >
      {/* {!loading ? (
        <>
          <div className="absolute gap-1 left-5 bottom-5 flex flex-col items-start">
            <p className="text-xl text-left w-[200px] text-white font-extrabold leading-none">
              {messageStore[id].title}
            </p>
            <p className="text-white text-base font-thin">
              {messageStore[id].subtitle}
            </p>
          </div>
          <img
            src={messageStore[id].cover}
            className="w-full h-full object-contain"
          />
        </>
      ) : null} */}
    </button>
  );
};
