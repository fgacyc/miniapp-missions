import { useRef, useState } from "react";
import { useMusics } from "../../store/useMusics";
import { FaPlay } from "react-icons/fa";
import Drawer from "react-modern-drawer";
import {
  IoInformationCircleOutline,
  IoChevronDownSharp,
} from "react-icons/io5";

import "react-modern-drawer/dist/index.css";
import { PlayRateProgress } from "@/components/AudioPlayer";

// interface MusicDrawerProps {
//   visible?: boolean;
// }

export const MusicDrawer = () => {
  const [drawerVisible, setDrawerVisible] = useState(false);
  const musicStore = useMusics();
  const currentlyPlaying = musicStore.currentlyPlaying;
  const setPlayRate = musicStore.setPlayRate;
  const setPlay = musicStore.play;

  const ref = useRef<HTMLAudioElement>(null);

  return currentlyPlaying.id ? (
    <>
      {/* Floating Button */}
      <button
        onClick={() => setDrawerVisible(true)}
        className="rounded-md bg-[#2852A3] shadow-md flex flex-row justify-between items-center z-10 fixed bottom-3 left-1/2 -translate-x-1/2 p-2 w-[95%]"
      >
        <div className="flex flex-row items-center">
          <img
            className="rounded-[4px] w-[50px] h-[50px] object-cover object-center"
            src={musicStore[currentlyPlaying.id].cover}
          />
          <div className="flex flex-col items-start pl-2 text-white gap-0.5 w-full">
            <p className="font-bold text-[14px]">
              {musicStore[currentlyPlaying.id].name}
            </p>
            <p className="text-[13px]">
              {musicStore[currentlyPlaying.id].band}
            </p>
          </div>
        </div>
        <FaPlay size={20} color="white" className="mr-4" />
      </button>

      {/* Drawer - Bottom */}
      <Drawer
        overlayClassName="!opacity-30 !z-[99]"
        className="!h-[90vh] flex flex-col items-center gap-6 rounded-t-[20px] !z-[999] p-6 !bg-gradient-to-b !from-[#2852A3] !to-[#0F1F3D]"
        open={drawerVisible}
        direction="bottom"
        onClose={() => setDrawerVisible(false)}
      >
        <div className="w-full flex flex-row items-center justify-between">
          <IoChevronDownSharp color="white" size={40} />
          <IoInformationCircleOutline size={40} color="white" />
        </div>
        <img
          src={musicStore[currentlyPlaying.id].cover}
          className="rounded-lg w-[75%] aspect-square max-w-[400px] max-h-[400px] object-cover object-center"
        />
        <div className="flex text-white flex-col w-full items-start gap-1.5">
          <p
            className="font-bold text-3xl"
            onClick={() => {
              if (!ref.current) return;
              ref.current.play();
            }}
          >
            {musicStore[currentlyPlaying.id].name}
          </p>
          <p className="font-bold text-base">
            {musicStore[currentlyPlaying.id].band}
          </p>
        </div>
        {/* <div className="mt-2" /> */}
        <PlayRateProgress
          id={currentlyPlaying.id}
          loop={currentlyPlaying.loop}
          setPlay={setPlay}
          //   isPlaying={musicStore.currentlyPlaying.isPlaying}
          onDurationChange={(e) => setPlayRate(e.currentTarget.duration)}
          audioRef={ref}
          src={musicStore[currentlyPlaying.id].chorus}
        />
      </Drawer>
    </>
  ) : null;
};
