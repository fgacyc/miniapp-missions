import { MusicParts, useMusics } from "@/store/useMusics";
import React from "react";
import { IoPlay } from "react-icons/io5";

interface SongGridProps {
  parts: Record<MusicParts, string>;
}

export const SongGrid: React.FC<SongGridProps> = ({ parts }) => {
  const partKeys = Object.keys(parts) as Array<MusicParts>;
  const partEntries = Object.entries(parts);

  const { setSelectedPart } = useMusics();

  return (
    <div className={`grid grid-cols-6 grid-rows-3 gap-3`}>
      {partKeys.map((data, i) => {
        return (
          <button
            disabled={!partEntries[i][1]}
            className={`bg-black rounded-md text-[18px] flex flex-row items-center justify-center gap-2.5 capitalize ${
              i <= 2 ? "col-span-2" : "col-span-3"
            } w-full py-[10px] text-white disabled:opacity-60`}
            key={i}
            onClick={() => setSelectedPart(data)}
          >
            <IoPlay size={23} />
            <p>
              {data === "pre_chorus"
                ? "Pre-Chorus"
                : data === "low_chorus"
                ? "Low-Chorus"
                : data}
            </p>
          </button>
        );
      })}
    </div>
  );
};
