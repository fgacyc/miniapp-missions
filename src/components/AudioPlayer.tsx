import { FunctionComponent, RefObject, useEffect, useState } from "react";
import { AudioProgressBar } from "./AudioProgressBar";
import { formatDurationDisplay } from "@/helpers";

import { IoPlay, IoPause, IoPlayForward } from "react-icons/io5";
import { LoopIcon } from "./graphics/LoopIcon";
import { useMusics } from "@/store/useMusics";

interface PlayRateProgressProps {
  src: string;
  //   isPlaying?: boolean;
  audioRef: RefObject<HTMLAudioElement>;
}

export const PlayRateProgress: FunctionComponent<PlayRateProgressProps> = ({
  src,
  audioRef,
}) => {
  const musicStore = useMusics();
  const setSelectedPart = musicStore.setSelectedPart;
  const currentlyPlaying = musicStore.currentlyPlaying;
  const play = musicStore.play;
  const setPaused = musicStore.setPaused;

  const allIds = Object.keys(musicStore)
    .filter((key) => !isNaN(Number(key)))
    .map((key) => Number(key));

  const [currrentProgress, setCurrrentProgress] = useState(0);
  const [buffered, setBuffered] = useState(0);
  const [loop, setLoop] = useState(false);

  // useEffect(() => {
  //   if (!audioRef.current) return;

  //   audioRef.current.src = musicStore[Number(currentlyPlaying.id)].instrumental;
  //   audioRef.current.play();
  // }, [currentlyPlaying.id, audioRef, musicStore]);

  // TODO: Enable this later
  useEffect(() => {
    if (!audioRef.current || currentlyPlaying.paused) return;
    audioRef.current
      .play()
      .then(() => setPaused(false))
      .catch(() => setPaused(true));
  }, [audioRef, src, setPaused, currentlyPlaying.paused]);

  useEffect(() => {
    if (audioRef.current) {
      // Reapply loop property and update src
      audioRef.current.loop = loop;
    }
  }, [audioRef, loop]);
  // handler
  const handleBufferProgress: React.ReactEventHandler<HTMLAudioElement> = (
    e
  ) => {
    const audio = e.currentTarget;
    const dur = audio.duration;
    if (dur > 0) {
      for (let i = 0; i < audio.buffered.length; i++) {
        if (
          audio.buffered.start(audio.buffered.length - 1 - i) <
          audio.currentTime
        ) {
          const bufferedLength = audio.buffered.end(
            audio.buffered.length - 1 - i
          );
          setBuffered(bufferedLength);
          break;
        }
      }
    }
  };
  return (
    // <div className="relative w-full h-[2px] bg-white/40 rounded-full">

    //   <div style={{

    //   }} className="h-[4px] bg-white left-0 top-1/2 -translate-y-1/2"/>

    //   <div
    //     style={{
    //       left: `${15}%`,
    //     }}
    //     className="rounded-full w-4 h-4 absolute bg-white top-1/2 -translate-y-1/2"
    //   />
    // </div>
    <div className="w-full flex flex-col mt-2">
      <AudioProgressBar
        className="w-full progress-bar appearance-none focus:outline-none overflow-hidden relative"
        fullDuration={audioRef?.current ? audioRef.current.duration : 0}
        buffered={buffered}
        currentProgress={currrentProgress}
        onChange={(e) => {
          if (!audioRef.current) return;
          audioRef.current.currentTime = e.currentTarget.valueAsNumber;
          setCurrrentProgress(e.currentTarget.valueAsNumber);
        }}
      />
      <div className="mt-4 text-base font-bold text-[rgba(255,255,255,0.6)] flex flex-row items-center justify-between">
        <p>{formatDurationDisplay(currrentProgress)}</p>
        <p>
          {formatDurationDisplay(
            audioRef?.current ? audioRef.current.duration : 0
          )}
        </p>
      </div>
      <div className="py-4 px-6 flex flex-row items-center justify-between">
        <LoopIcon
          role="button"
          onClick={() => {
            if (!audioRef.current) return;
            // console.log("before", audioRef.current.loop);
            setLoop((prev) => !prev);
          }}
          className={`cursor-pointer h-[30px] ${
            audioRef.current && audioRef.current.loop
              ? "fill-white"
              : "fill-[#606060]"
          }`}
        />
        {audioRef.current?.paused ? (
          <IoPlay
            color="white"
            size={45}
            className="cursor-pointer"
            role="button"
            onClick={() => {
              if (!audioRef.current) return;
              audioRef.current.play();
              setPaused(false);
            }}
          />
        ) : (
          <IoPause
            color="white"
            size={45}
            className="cursor-pointer"
            role="button"
            onClick={() => {
              if (!audioRef.current) return;
              audioRef.current.pause();
              setPaused(true);
            }}
          />
        )}
        <IoPlayForward
          className="cursor-pointer"
          size={40}
          color="white"
          role="button"
          onClick={() => {
            const idToPlay = allIds.includes(Number(currentlyPlaying.id) + 1)
              ? Number(currentlyPlaying.id) + 1
              : 1;

            play(idToPlay);

            setSelectedPart(
              musicStore[idToPlay].instrumental
                ? "instrumental"
                : musicStore[idToPlay].chorus
                ? "chorus"
                : musicStore[idToPlay].intro
                ? "intro"
                : musicStore[idToPlay].verse
                ? "verse"
                : musicStore[idToPlay].pre_chorus
                ? "pre_chorus"
                : "low_chorus"
            );
          }}
        />
      </div>

      {/* Hidden Audio Layer */}
      <audio
        onProgress={handleBufferProgress}
        onTimeUpdate={(e) => {
          handleBufferProgress(e);
          setCurrrentProgress(e.currentTarget.currentTime);
        }}
        src={src}
        loop={loop}
        ref={audioRef}
        preload="metadata"
      />
    </div>
  );
};
