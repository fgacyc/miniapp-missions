import { FunctionComponent, useEffect, useState } from "react";
import Skeleton from "react-loading-skeleton";
import { useMusics } from "../store/useMusics";

import "react-loading-skeleton/dist/skeleton.css";

interface MusicCardProps {
  id: number;
}

export const MusicCard: FunctionComponent<MusicCardProps> = ({ id }) => {
  const [loading, setLoading] = useState(true);

  const musicStore = useMusics();
  const setMessage = musicStore.setMusics;
  const currentlyPlaying = musicStore.currentlyPlaying;
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
      onClick={() =>
        play(id, currentlyPlaying.loop, currentlyPlaying.isPlaying)
      }
      className="flex flex-col gap-1.5 w-full"
      key={id}
    >
      {loading ? (
        <div className="aspect-square rounded-md gradient-loading" />
      ) : (
        <img
          className="aspect-square rounded-md object-cover object-center"
          src={musicStore[id].cover}
        />
      )}
      <div className="flex flex-col gap-0.5 justify-start">
        {loading ? (
          <Skeleton baseColor="#bbbbbb" />
        ) : (
          <p className="font-bold text-base truncate">{musicStore[id].name}</p>
        )}
        {loading ? (
          <Skeleton baseColor="#bbbbbb" />
        ) : (
          <p className="text-[#92969D] text-xs truncate">
            {musicStore[id].band}
          </p>
        )}
      </div>
    </button>
  );
};
