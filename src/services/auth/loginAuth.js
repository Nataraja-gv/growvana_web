import { enqueueSnackbar } from "notistack";
import axiosInstance from "../../utils/axiosInstance";

export const LoginAuth = async (data) => {
  const config = {
    method: "POST",
    maxBodyLength: Infinity,
    url: "/userauth/login",
    headers: {
      "Content-Type": "application/json",
    },
    data,
  };
  try {
    const res = await axiosInstance.request(config);
    return res?.data;
  } catch (error) {
    enqueueSnackbar(error.response.data.message, {
      variant: "error",
    });
  }
};

export const signupAuth = async (data) => {
  const config = {
    method: "POST",
    maxBodyLength: Infinity,
    url: "/userauth/signup",
    headers: {
      "Content-Type": "application/json",
    },
    data,
  };
  try {
    const res = await axiosInstance.request(config);
    return res?.data;
  } catch (error) {
    enqueueSnackbar(error.response.data.message, {
      variant: "error",
    });
  }
};

export const userProfile = async () => {
  const config = {
    method: "GET",
    maxBodyLength: Infinity,
    url: "/user/auth/profile",
    headers: {
      "Content-Type": "application/json",
    },
  };
  try {
    const res = await axiosInstance.request(config);
    return res?.data;
  } catch (error) {
    // enqueueSnackbar(error.response.data.message, {
    //   variant: "error",
    // });
    console.log(error.message)
  }
};

export const userLogout = async () => {
  const config = {
    method: "POST",
    maxBodyLength: Infinity,
    url: "/userauth/logout",
    headers: {
      "Content-Type": "application/json",
    },
  };
  try {
    const res = await axiosInstance.request(config);
    return res?.data;
  } catch (error) {
    enqueueSnackbar(error.response.data.message, {
      variant: "error",
    });
  }
};
