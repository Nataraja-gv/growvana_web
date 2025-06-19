import { useSnackbar } from "notistack";
import React, { useState } from "react";
import { LoginAuth, signupAuth } from "../services/auth/loginAuth";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/feature/userData";
import { useNavigate } from "react-router-dom";

const LoginModal = ({ onClose }) => {
  const [mode, setMode] = useState("login");
  const { enqueueSnackbar } = useSnackbar();
  const dispatch = useDispatch();
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();
  const handleChange = (key, value) => {
    setUserData((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = {
        email: userData.email,
        password: userData.password,
      };

      if (mode === "login") {
        const res = await LoginAuth(data);
        if (res) {
          dispatch(addUser(res?.data));
          enqueueSnackbar("Login successful", { variant: "success" });
          onClose?.();
        }
      } else {
        const res = await signupAuth({ ...data, name: userData.name });
        if (res) {
          dispatch(addUser(res?.data));
          enqueueSnackbar("Registration successful", { variant: "success" });
          onClose?.();
        }
      }
    } catch (error) {
      enqueueSnackbar(error?.message || "Something went wrong", {
        variant: "error",
      });
    }
  };

  const toggleMode = () => {
    setMode((prev) => (prev === "login" ? "register" : "login"));
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-8 w-full max-w-md shadow-xl relative">
        <button
          className="absolute top-3 right-3 text-gray-500 hover:text-black text-xl font-bold"
          onClick={() => {
            navigate("/");
            onClose();
          }}
        >
          ×
        </button>
        <h2 className="text-2xl font-bold mb-4 text-center">
          {mode === "register" ? "Register" : "Login"}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {mode === "register" && (
            <div>
              <label className="block mb-1 text-sm font-medium text-gray-700">
                Name
              </label>
              <input
                type="text"
                name="name"
                value={userData.name}
                onChange={(e) => handleChange("name", e.target.value)}
                required
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>
          )}

          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={userData.email}
              onChange={(e) => handleChange("email", e.target.value)}
              required
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={userData.password}
              onChange={(e) => handleChange("password", e.target.value)}
              required
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-700 transition"
          >
            {mode === "register" ? "Register" : "Login"}
          </button>
        </form>

        <div className="mt-4 text-center text-sm text-gray-600">
          {mode === "login" ? (
            <>
              Don’t have an account?{" "}
              <button
                onClick={toggleMode}
                className="text-green-600 hover:underline"
              >
                Register
              </button>
            </>
          ) : (
            <>
              Already have an account?{" "}
              <button
                onClick={toggleMode}
                className="text-green-600 hover:underline"
              >
                Login
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default LoginModal;
