import * as React from "react";

interface ProgressCSSProps extends React.CSSProperties {
  "--progress-width": number;
  "--buffered-width": number;
}

interface AudioProgressBarProps
  extends React.ComponentPropsWithoutRef<"input"> {
  fullDuration: number;
  currentProgress: number;
  buffered: number;
}

export const AudioProgressBar: React.FunctionComponent<
  AudioProgressBarProps
> = (props) => {
  const { fullDuration, currentProgress, buffered, ...rest } = props;

  const progressBarWidth = isNaN(currentProgress / fullDuration)
    ? 0
    : currentProgress / fullDuration;
  const bufferedWidth = isNaN(buffered / fullDuration)
    ? 0
    : buffered / fullDuration;

  const progressStyles: ProgressCSSProps = {
    "--progress-width": progressBarWidth,
    "--buffered-width": bufferedWidth,
  };

  return (
    <div className="group w-full">
      <input
        type="range"
        name="progress"
        style={progressStyles}
        min={0}
        max={fullDuration}
        value={currentProgress}
        {...rest}
      />
    </div>
  );
};
