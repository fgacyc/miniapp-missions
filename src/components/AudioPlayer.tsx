import { FunctionComponent, RefObject, SyntheticEvent, useState } from "react";
import { AudioProgressBar } from "./AudioProgressBar";
import { formatDurationDisplay } from "@/helpers";

interface PlayRateProgressProps {
  id: number;
  loop: boolean;
  setPlay: (
    id: number,
    loop: boolean,
    isPlaying: boolean,
    playRate?: number
  ) => void;
  src: string;
  //   isPlaying?: boolean;
  audioRef: RefObject<HTMLAudioElement>;
  onDurationChange: (e: SyntheticEvent<HTMLAudioElement, Event>) => void;
}

export const PlayRateProgress: FunctionComponent<PlayRateProgressProps> = ({
  src,
  setPlay,
  audioRef,
  id,
  onDurationChange,
  loop,
}) => {
  const [currrentProgress, setCurrrentProgress] = useState(0);
  const [buffered, setBuffered] = useState(0);
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
        className="w-full progress-bar appearance-none focus:outline-none overflow-hidden"
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
      <audio
        onProgress={handleBufferProgress}
        onTimeUpdate={(e) => {
          handleBufferProgress(e);
          setCurrrentProgress(e.currentTarget.currentTime);
        }}
        onPlaying={() => setPlay(id, loop, true)}
        onPause={() => setPlay(id, loop, false)}
        onDurationChange={onDurationChange}
        src={src}
        ref={audioRef}
        preload="metadata"
      />
    </div>
  );
};
