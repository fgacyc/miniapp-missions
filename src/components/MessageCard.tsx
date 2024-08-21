import { FunctionComponent, useEffect, useState } from "react";

interface MessageCardProps {
  id: number;
}

export const MessageCard: FunctionComponent<MessageCardProps> = ({ id }) => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<Record<string, string>>();

  useEffect(() => {
    void fetch(`https://uni.api.fgacyc.com/miniapp_missions/messages/${id}`, {
      method: "GET",
    }).then((res) =>
      res.json().then((data) => {
        if (res.ok) {
          console.log(data.data);
          setLoading(false);
          setData(data.data);
        }
      })
    );
  }, [id]);

  return (
    <div
      className={`aspect-video ${
        loading ? "gradient-loading" : ""
      } rounded-[10px] w-full overflow-hidden`}
    >
      {!loading ? (
        <>
          <img src={data?.cover} />
        </>
      ) : null}
    </div>
  );
};
