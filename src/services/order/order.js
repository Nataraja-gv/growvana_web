import { enqueueSnackbar } from "notistack";
import axiosInstance from "../../utils/axiosInstance";

export const postOrder = async (data) => {
  const config = {
    method: "POST",
    maxBodyLength: Infinity,
    url: "/user/order/places",
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

export const postOrderRazorPay = async (data) => {
  const config = {
    method: "POST",
    maxBodyLength: Infinity,
    url: "/user/order/razorpay/create",
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
