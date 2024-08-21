import { FunctionComponent } from "react";

interface ChipProps {
  label: string;
  selected?: boolean;
  onClick: () => void;
  activeColor: string;
  activeTextColor: string;
  unactiveTextColor: string;
  unactiveColor: string;
}

export const Chip: FunctionComponent<ChipProps> = ({
  label,
  selected,
  onClick,
  activeTextColor,
  unactiveTextColor,
  activeColor,
  unactiveColor,
}) => {
  return (
    <button
      type="button"
      style={{
        color: selected ? activeTextColor : unactiveTextColor,
        background: selected ? activeColor : unactiveColor,
      }}
      onClick={onClick}
      className={`rounded-full border px-4 py-2 font-bold text-sm`}
    >
      {label}
    </button>
  );
};
