import { enqueueSnackbar } from "notistack";
import axiosInstance from "../../utils/axiosInstance";

export const AddToCart = async (data) => {
  const config = {
    method: "POST",
    maxBodyLength: Infinity,
    url: "/user/cart/update",
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

export const UpdateQuantity = async (data) => {
  const config = {
    method: "POST",
    maxBodyLength: Infinity,
    url: "/user/cart",
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

export const getCartitem = async () => {
  const config = {
    method: "GET",
    maxBodyLength: Infinity,
    url: "/user/cart/all",
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

export const DeleteCartitem = async (data) => {
  const config = {
    method: "POST",
    maxBodyLength: Infinity,
    url: "/user/cart/remove",
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

export const clearCartitems = async () => {
  const config = {
    method: "POST",
    maxBodyLength: Infinity,
    url: "/user/cart/clear",
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

export const cartItemQuantity = async (data) => {
  const config = {
    method: "POST",
    maxBodyLength: Infinity,
    url: "/user/cart",
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

export const getUserAddress = async () => {
  const config = {
    method: "GET",
    maxBodyLength: Infinity,
    url: "/user/address/all",
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

export const newAddress = async (data) => {
  const config = {
    method: "POST",
    maxBodyLength: Infinity,
    url: "/user/address/new",
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
