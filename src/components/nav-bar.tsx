import type { PropsWithChildren } from "react";
import { BsChevronLeft } from "react-icons/bs";
import { useNavigate } from "react-router-dom";

interface PropsWithChildrenAndArrow extends PropsWithChildren<object> {
  ifShowBackArrow?: boolean;
}

export default function NavBar({
  children,
  ifShowBackArrow = true,
}: PropsWithChildrenAndArrow) {
  const navigate = useNavigate();

  return (
    <>
      <div
        className={"h-[45px] px-3 flex items-center justify-between bg-white"}
      >
        <div onClick={() => navigate(-1)} className={"cursor-pointer"}>
          {ifShowBackArrow && <BsChevronLeft className={"h-6 w-6"} />}
        </div>
        <div className={"text-lg"}>{children}</div>
        <div className={"h-6 w-6"}></div>
      </div>
    </>
  );
}
