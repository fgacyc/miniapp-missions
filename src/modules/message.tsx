import { useState } from "react";
import { Chip } from "../components/Chip";
import { useTranslation } from "react-i18next";
import { MessageCard } from "../components/MessageCard";

type MessageTab = 1 | 2 | 3 | 4;

const MessageTab = () => {
  const { t } = useTranslation();
  const [tab, setTab] = useState<MessageTab>(1);
  return (
    <div className="flex flex-col gap-5 w-full">
      <div className="flex flex-row items-center gap-3">
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
      {[1, 2, 3].map((no) => (
        <MessageCard id={no} key={no} />
      ))}
    </div>
  );
};

export default MessageTab;
