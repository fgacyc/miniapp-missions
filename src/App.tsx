import {BrowserRouter as Router} from "react-router-dom";
import ActionSheetButtons from "./components/action-sheet-buttons.tsx";
import ActionSheetMenu from "./components/action-sheet-menu.tsx";
import MainRoutes from "./routes/routers.tsx";
import {useUserStore} from "./store/use-store.ts";
import {useEffect} from "react";


function App() {
    const initUser = useUserStore(state => state.initUser);
    useEffect(() => {
        void initUser();
    }, [initUser]);

    return (
        <Router>
            <ActionSheetButtons/>
            <ActionSheetMenu/>
            <MainRoutes/>
        </Router>

    )
}

export default App
