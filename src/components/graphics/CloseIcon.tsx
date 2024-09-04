import { SVGProps } from "react";
export const CloseIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={20}
    height={20}
    fill="none"
    {...props}
  >
    <path
      stroke="#fff"
      d="m6.354 6.047 7.214 7.214M13.568 6.354l-7.214 7.214"
    />
    <circle cx={10} cy={10} r={9.5} stroke="#fff" />
  </svg>
);
