import styles from "./MainLayout.module.css";

import { Outlet } from "react-router-dom";
import { useDispatch } from "react-redux";
import { mainHeaderAction } from "../store/slices/mainHeaderSlice.jsx";
import { headers } from "../assets/mocks/headers.json.js";
import { MainMenuList } from "../components/asides/MainMenu.jsx";

const MainLayout = () => {
  const dispatcher = useDispatch();
  dispatcher(mainHeaderAction.init(headers));

  return (
    <div className={styles.mainLayout}>
      <MainMenuList />
      <div className={styles.mainContent}>
        <Outlet />
      </div>
    </div>
  );
};

export default MainLayout;
