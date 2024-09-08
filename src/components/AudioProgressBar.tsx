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

  const progressBarWidth = currentProgress / fullDuration;
  const bufferedWidth = buffered / fullDuration;

  const progressStyles: ProgressCSSProps = {
    "--progress-width": progressBarWidth,
    "--buffered-width": bufferedWidth,
  };

  React.useEffect(() => {
    console.log("progress width", progressBarWidth);
    console.log("buffered width", bufferedWidth);
    console.log("current progress", currentProgress);
  }, [progressBarWidth, bufferedWidth, currentProgress]);

  return (
    <div className="group w-full">
      <input
        type="range"
        name="progress"
        style={progressStyles}
        min={0}
        max={fullDuration || 1}
        value={currentProgress}
        {...rest}
      />
    </div>
  );
};
