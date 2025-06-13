import React, { useState, useRef, useEffect } from "react";
import { ShoppingCart, Search, Percent, UserRound } from "lucide-react";
import LoginModal from "../pages/loginpage";
import { useDispatch, useSelector } from "react-redux";
import { useSnackbar } from "notistack";
import { userLogout } from "../services/auth/loginAuth";
import { removeUser } from "../utils/feature/userData";
import { useNavigate } from "react-router-dom";
import { getCartitem } from "../services/cart/cart";

const NavBarPage = () => {
  const [dropDown, setDropDown] = useState(false);
  const [loginOpen, setLoginOpen] = useState(false);
  const { enqueueSnackbar } = useSnackbar();
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const naviagte = useNavigate();

  const dropdownRef = useRef();

  const handleDropDown = () => {
    setDropDown((prev) => !prev);
  };

  useEffect(() => {
    const fetchProductsCart = async () => {
      try {
        const res = await getCartitem();
        if (res) {
          setCart(res?.data);
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchProductsCart();
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropDown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const fetchLogout = async () => {
    try {
      const res = await userLogout();
      if (res) {
        dispatch(removeUser());
        enqueueSnackbar("logout successfully", { variant: "success" });
      }
    } catch (error) {
      enqueueSnackbar(error?.message, { variant: "error" });
    }
  };

  return (
    <div className="w-full font-sans fixed top-0 z-10 ">
      {/* Main Navbar */}
      <div className="bg-gray-100 shadow px-6 flex flex-col items-center">
        <div className="w-[80%] mx-auto flex items-center justify-between ">
          {/* Logo */}
          <div className="w-[100px]">
            <img
              src="https://freshcartdev.s3.eu-north-1.amazonaws.com/growvana_logo.png"
              alt="Growvana"
              className="h-auto w-full"
            />
          </div>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-6 text-sm font-medium text-gray-700">
            <span className="flex items-center cursor-pointer hover:text-green-700 font-bold text-[16px]">
              <span className="w-2 h-2 bg-orange-500 rounded-full mr-1"></span>
              SHOP
            </span>
            <span className="cursor-pointer hover:text-green-700 font-bold text-[16px]">
              MY ORDERS
            </span>
            <span className="cursor-pointer hover:text-green-700 font-bold text-[16px]">
              TRACK YOUR ORDER
            </span>
          </div>

          {/* Icons */}
          <div
            className="flex items-center space-x-4 text-gray-700 relative"
            ref={dropdownRef}
          >
            <Search className="w-5 h-5 cursor-pointer hover:text-green-700" />
            <div className="relative">
              <UserRound
                className="w-5 h-5 cursor-pointer hover:text-green-700"
                onClick={handleDropDown}
              />
              {dropDown && (
                <div className="absolute right-0 top-8 z-20 w-56 rounded border border-gray-300 bg-white shadow-md">
                  <a
                    href="#"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    role="menuitem"
                  >
                    Profile
                  </a>
                  <a
                    href="#"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    role="menuitem"
                  >
                    My Orders
                  </a>
                  <a
                    href="#"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    role="menuitem"
                  >
                    Premium
                  </a>
                  {user?.name ? (
                    <button
                      type="button"
                      onClick={fetchLogout}
                      className="w-full text-left px-4 py-2 text-sm text-red-700 hover:bg-red-50  cursor-pointer"
                    >
                      Logout
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={() => setLoginOpen(!loginOpen)}
                      className="w-full text-left px-4 py-2 text-sm text-red-700 hover:bg-red-50  cursor-pointer"
                    >
                      Login
                    </button>
                  )}
                </div>
              )}
            </div>

            <div
              className="relative cursor-pointer"
              onClick={() => naviagte("/cart")}
            >
              <ShoppingCart className="w-5 h-5 hover:text-green-700" />
              <span className="absolute -top-2 -right-2 bg-black text-white text-xs w-4 h-4 rounded-full flex items-center justify-center">
                0
              </span>
            </div>
          </div>
        </div>
      </div>
      {loginOpen && <LoginModal onClose={() => setLoginOpen(false)} />}
    </div>
  );
};

export default NavBarPage;
