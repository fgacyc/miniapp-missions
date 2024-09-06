import { FunctionComponent, useEffect, useState } from "react";
import Skeleton from "react-loading-skeleton";
import { useMusics } from "../store/useMusics";

import "react-loading-skeleton/dist/skeleton.css";
import { useTabsStore } from "../store/useTabs.ts";

interface MusicCardProps {
  id: number;
  openDrawer: () => void;
}

export const MusicCard: FunctionComponent<MusicCardProps> = ({
  id,
  openDrawer,
}) => {
  const [loading, setLoading] = useState(true);
  const musicTab = useTabsStore((state) => state.musicTab);

  const musicStore = useMusics();
  const setMessage = musicStore.setMusics;
  const setSelectedPart = musicStore.setSelectedPart;
  const play = musicStore.play;

  useEffect(() => {
    void fetch(`${import.meta.env["VITE_API_URL"]}musics/${id}`, {
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
      onClick={() => {
        play(id);
        setSelectedPart(
          musicStore[id].instrumental
            ? "instrumental"
            : musicStore[id].chorus
            ? "chorus"
            : musicStore[id].intro
            ? "intro"
            : musicStore[id].verse
            ? "verse"
            : musicStore[id].pre_chorus
            ? "pre_chorus"
            : "low_chorus"
        );
        openDrawer();
      }}
      className={`flex flex-col gap-1.5 w-full truncate
      ${
        musicTab === "All"
          ? ""
          : musicTab !== musicStore[id].tag
          ? "hidden"
          : ""
      }
      `}
      key={id}
    >
      {loading ? (
        <div className="aspect-square w-full rounded-md gradient-loading" />
      ) : (
        <div className="aspect-square rounded-md w-full gradient-loading flex flex-col items-center justify-center overflow-hidden">
          <img
            className="object-cover w-full object-center"
            src={musicStore[id].cover}
          />
        </div>
      )}
      <div className="flex flex-col gap-0.5 w-full">
        {loading ? (
          <Skeleton baseColor="#bbbbbb" />
        ) : (
          <p className="font-bold text-base text-left truncate w-full">
            {musicStore[id].name}
          </p>
        )}
        {loading ? (
          <Skeleton baseColor="#bbbbbb" />
        ) : (
          <p className="text-[#92969D] text-xs text-left truncate">
            {musicStore[id].band}
          </p>
        )}
      </div>
    </button>
  );
};
