import { useEffect, useState } from "react";
import { Chip } from "../../components/Chip";
import { useTranslation } from "react-i18next";
import { MusicCard } from "../../components/MusicCard";
import { useMusics } from "@/store/useMusics";

type MusicsTab = 1 | 2 | 3 | 4 | 5;

const MusicTab = () => {
  const { t } = useTranslation();
  const [tab, setTab] = useState<MusicsTab>(1);

  const [count, setCount] = useState<number>(0);

  const { setDrawer } = useMusics();

  useEffect(() => {
    void fetch(`${import.meta.env["VITE_API_URL"]}musics/count`, {
      method: "GET",
    }).then((res) =>
      res.json().then((data) => {
        if (res.ok && data.status) {
          // console.log(data);
          setCount(data.data as number);
        }
      })
    );
  }, []);

    // One Hour
    // Welcome Vibes
    // Praise
    // Worship

  return (
    <div className="flex flex-col gap-5 w-full">
      <div className="gap-3 w-full whitespace-nowrap overflow-x-auto inline-flex flex-row items-center hide-scroll">
        {([1, 2, 3, 4, 5] as MusicsTab[]).map((no) => (
          <Chip
            selected={tab === no}
            activeColor="#2852A3"
            activeTextColor="#FFF"
            unactiveTextColor="#000"
            unactiveColor="#DBDBDB"
            label={t(`musictab.${no}`)}
            onClick={() => setTab(no)}
            key={no}
          />
        ))}
      </div>
      <div className="grid grid-cols-2 gap-5">
        {Array.from({ length: count }, (_, i) => i + 1).map((no) => (
          <MusicCard openDrawer={() => setDrawer(true)} id={no} key={no} />
        ))}
      </div>
    </div>
  );
};

export default MusicTab;
