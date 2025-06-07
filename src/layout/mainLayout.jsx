import { Outlet } from "react-router-dom";
import NavBarPage from "./NavBarPage";

const MainLayout = () => {
  return (
    <div >
      <NavBarPage />
      <Outlet/>
    </div>
  );
};

export default MainLayout;
