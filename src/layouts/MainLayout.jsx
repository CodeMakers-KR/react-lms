import MainHeader from "../components/headers/MainHeader.jsx";
import { Outlet } from "react-router-dom";
import { useDispatch } from "react-redux";
import { mainHeaderAction } from "../store/slices/mainHeaderSlice.jsx";
import { headers } from "../assets/mocks/headers.json.js";

const MainLayout = () => {
  const dispatcher = useDispatch();
  dispatcher(mainHeaderAction.init(headers));

  return (
    <div>
      <div>
        <MainHeader />
      </div>
      <div>
        <Outlet />
      </div>
    </div>
  );
};

export default MainLayout;
