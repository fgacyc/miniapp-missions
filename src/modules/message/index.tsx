import { useEffect, useState } from "react";
import { Chip } from "../../components/Chip";
import { useTranslation } from "react-i18next";
import { MessageCard } from "../../components/MessageCard";

type MessageTab = 1 | 2 | 3 | 4;

const MessageTab = () => {
  useEffect(() => {
    void fetch(`${import.meta.env["VITE_API_URL"]}messages/count`, {
      method: "GET",
    }).then((res) =>
      res.json().then((data) => {
        if (res.ok && data.status) {
          setCount(data.data as number);
        }
      })
    );
  }, []);

  const { t } = useTranslation();
  const [count, setCount] = useState<number>(0);
  const [tab, setTab] = useState<MessageTab>(1);
  return (
    <div className="flex flex-col gap-5 w-full">
      <div className="inline-flex flex-row items-center gap-3 hide-scroll overflow-x-auto whitespace-nowrap">
        {([1, 2, 3, 4] as MessageTab[]).map((no) => (
          <Chip
            selected={tab === no}
            activeColor="#2852A3"
            activeTextColor="#FFF"
            unactiveTextColor="#000"
            unactiveColor="#DBDBDB"
            label={t(`messagetab.${no}`)}
            onClick={() => setTab(no)}
            key={no}
          />
        ))}
      </div>
      {Array.from({ length: count }, (_, i) => i + 1).map((no) => (
        <MessageCard id={no} key={no} />
      ))}
    </div>
  );
};

export default MessageTab;
