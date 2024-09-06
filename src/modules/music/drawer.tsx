import { useRef, useState } from "react";
import { useMusics } from "../../store/useMusics";
import { FaPause, FaPlay } from "react-icons/fa";
import Drawer from "react-modern-drawer";
import {
  IoInformationCircleOutline,
  IoChevronDownSharp,
  IoPlay,
  IoCloseCircleOutline,
  IoPlayForward,
} from "react-icons/io5";

import "react-modern-drawer/dist/index.css";
import { PlayRateProgress } from "@/components/AudioPlayer";
import { SongGrid } from "@/components/SongGrid";
import { LoopIcon } from "@/components/graphics/LoopIcon";

// interface MusicDrawerProps {
//   visible?: boolean;
// }

export const MusicDrawer = () => {
  // const [selectedPart, setSelectedPart] = useState<MusicParts>("instrumental");
  const musicStore = useMusics();
  const selectedPart = musicStore.selectedPart;
  const currentlyPlaying = musicStore.currentlyPlaying;
  const drawerVisible = musicStore.drawer;
  const setDrawerVisible = musicStore.setDrawer;
  const setPaused = musicStore.setPaused;

  const ref = useRef<HTMLAudioElement>(null);
  const [infoOverlay, setInfoOverlay] = useState(false);

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
        {currentlyPlaying.paused ? (
          <FaPlay
            size={20}
            color="white"
            className="mr-4"
            role="button"
            onClick={(e) => {
              if (!ref.current) return;
              ref.current.play();
              setPaused(false);
              e.stopPropagation();
            }}
          />
        ) : (
          <FaPause
            size={25}
            color="white"
            className="mr-4"
            role="button"
            onClick={(e) => {
              if (!ref.current) return;
              ref.current.pause();
              setPaused(true);
              e.stopPropagation();
            }}
          />
        )}
      </button>

      {/* Drawer - Bottom */}
      <Drawer
        overlayClassName="!opacity-30 !z-[99]"
        className="!h-[94vh] relative overflow-y-auto rounded-t-[20px] !z-[999] p-6 flex flex-col justify-between !bg-gradient-to-b !from-[#2852A3] !to-[#0F1F3D]"
        open={drawerVisible}
        direction="bottom"
        onClose={() => setDrawerVisible(false)}
      >
        {infoOverlay && (
          <div className="bg-black/90 z-[99] px-12 py-20 absolute top-0 left-0 rounded-t-[20px] h-full w-full flex-grow">
            <IoCloseCircleOutline
              size={45}
              onClick={() => setInfoOverlay(false)}
              color="white"
              role="button"
              className="absolute right-6 top-5"
            />
            <p className="text-white font-bold text-3xl">User Manual</p>
            <p className="text-white font-bold text-lg mt-1">
              How to use this music player?
            </p>
            <div className="py-4 px-6 flex flex-row my-14 items-center justify-between">
              <div className="flex flex-col relative justify-center gap-1.5">
                <div className="w-[40px] h-[40px] flex flex-col items-center justify-center">
                  <LoopIcon />
                </div>
                <p className="font-bold text-lg absolute -bottom-12 left-1/2 -translate-x-1/2 text-white text-center">
                  Loop
                </p>
              </div>
              <div className="flex relative flex-col justify-center gap-1.5">
                <IoPlay color="white" size={65} />
                <p className="absolute -bottom-[35.5px] font-bold text-lg left-1/2 -translate-x-1/2 text-white text-center">
                  Play
                </p>
              </div>
              <div className="flex flex-col relative justify-center gap-1.5">
                <IoPlayForward size={40} color="white" />
                <p className="font-bold text-lg absolute -bottom-12 left-1/2 -translate-x-1/2 text-white text-center">
                  Next
                </p>
              </div>
            </div>
            <div className="px-2 flex flex-col">
              <p className="text-white text-lg font-bold text-justify w-full">
                This media player is designed to help you lead praise & worship
                and sustain a worship atmosphere in your Connect Group. You will
                have full control over the song, for each song section.
              </p>
            </div>
            <div className="mt-12 prose text-justify">
              <ol className="text-white marker:text-white marker:font-bold marker:text-lg font-bold text-lg">
                <li>
                  Select the{" "}
                  <span>
                    <button
                      className={`mx-1 bg-black border-white border rounded-md text-sm inline-flex flex-row items-center justify-center gap-1 px-2 py-[5px] align-middle`}
                    >
                      <IoPlay size={20} />
                      <p className="m-0">Intro</p>
                    </button>
                  </span>{" "}
                  section that you want to play.
                </li>
                <li>
                  If you want to repeat the section, press the loop button.
                  <span className="align-middle ml-1">
                    <img
                      className="m-0 w-[28px] h-[28px] align-middle inline-block"
                      src="/small-loop.svg"
                    />
                  </span>
                </li>
              </ol>
            </div>
          </div>
        )}
        <div className="flex flex-col items-center gap-6">
          <div className="w-full flex flex-row items-center justify-between">
            <IoChevronDownSharp
              onClick={() => setDrawerVisible(false)}
              role="button"
              color="white"
              size={40}
            />
            <IoInformationCircleOutline
              onClick={() => setInfoOverlay(true)}
              size={40}
              color="white"
            />
          </div>
          <img
            src={musicStore[currentlyPlaying.id].cover}
            className="rounded-lg w-[65%] aspect-square max-w-[400px] max-h-[400px] object-cover object-center"
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
            //   isPlaying={musicStore.currentlyPlaying.isPlaying}
            audioRef={ref}
            // setSelectedPart={setSelectedPart}
            src={
              musicStore[currentlyPlaying.id][selectedPart] ??
              musicStore[currentlyPlaying.id].instrumental
            }
          />
        </div>
        <SongGrid
          // setSelectedParts={setSelectedPart}
          parts={{
            intro: musicStore[currentlyPlaying.id].intro,
            verse: musicStore[currentlyPlaying.id].verse,
            chorus: musicStore[currentlyPlaying.id].chorus,
            pre_chorus: musicStore[currentlyPlaying.id].pre_chorus,
            end: musicStore[currentlyPlaying.id].end,
            instrumental: musicStore[currentlyPlaying.id].instrumental,
            low_chorus: musicStore[currentlyPlaying.id].low_chorus,
          }}
        />
      </Drawer>
    </>
  ) : null;
};
