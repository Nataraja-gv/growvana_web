 import { Outlet } from "react-router-dom";
import NavBarPage from "./NavBarPage";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { userProfile } from "../services/auth/loginAuth";
import { addUser } from "../utils/feature/userData";
import FooterPage from "./FooterPage";

const MainLayout = () => {
  const user = useSelector((state) => state?.user);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await userProfile();
        if (res?.data) {
          dispatch(addUser(res?.data));
        }
      } catch (error) {
        console.error("Failed to fetch user profile:", error);
      }
    };

    if (!user?.name) {
      fetchProfile();
    }
  }, [user?.name, dispatch]);

  return (
    <div>
      <NavBarPage />
       <div className=" mt-[100px]">
        <Outlet />
       </div>
      <FooterPage/>
    </div>
  );
};

export default MainLayout;
