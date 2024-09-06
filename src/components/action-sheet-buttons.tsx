import { GoKebabHorizontal, GoX } from "react-icons/go";
import { useActionSheetMenuStore } from "../store/action-sheet-menu-store";

export default function ActionSheetButtons() {
  const [showMenu, setShowMenu] = useActionSheetMenuStore((state) => [
    state.showMenu,
    state.setShowMenu,
  ]);

  function switchMenu() {
    setShowMenu(!showMenu);
  }

  function handleClose() {
    window.open("https://back.fgacyc.com/", "_self");
  }

  return (
    <div
      className={`flex flex-row fixed top-2 right-2 justify-around border border-gray-200 shadow-sm rounded-full w-[80px] p-1 bg-white ${
        !showMenu && "z-[9990]"
      }`}
    >
      <GoKebabHorizontal
        className={"w-[20px] h-[20px] cursor-pointer"}
        onClick={switchMenu}
      />
      <GoX
        className={"w-[20px] h-[20px] cursor-pointer"}
        onClick={handleClose}
      />
    </div>
  );
}
