import { enqueueSnackbar } from "notistack";
import axiosInstance from "../../utils/axiosInstance";

export const getProducts = async () => {
  const config = {
    method: "GET",
    maxBodyLength: Infinity,
    url: "/allproducts/all",
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

export const getProductById = async (productId) => {
  const config = {
    method: "GET",
    maxBodyLength: Infinity,
    url: `/product/${productId}`,
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

export const getProductsCategoryById = async (categoryId) => {
  const config = {
    method: "GET",
    maxBodyLength: Infinity,
    url: `/product/category/all`,
    headers: {
      "Content-Type": "application/json",
    },
    params: {
      categoryId,
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

export const getfilterProducts = async (search) => {
  const config = {
    method: "GET",
    maxBodyLength: Infinity,
    url: `/products/filter`,
    headers: {
      "Content-Type": "application/json",
    },
    params: {
      filter: search,
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
