import { Outlet } from "react-router-dom";
// import MainRoutes from "./routes/routers.tsx";
import { useEffect } from "react";
import { useUserStore } from "../store/use-store";
import ActionSheetMenu from "../components/action-sheet-menu";
import ActionSheetButtons from "../components/action-sheet-buttons";
function Frame() {
  const initUser = useUserStore((state) => state.initUser);
  useEffect(() => {
    void initUser();
  }, [initUser]);

  return (
    <div className="h-full">
      <ActionSheetButtons />
      <ActionSheetMenu />
      <Outlet />
    </div>
  );
}

export default Frame;
