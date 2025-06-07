import axios from "axios";
import { BASEURL } from "../config";

const axiosInstance = axios.create({
  baseURL: BASEURL,
  withCredentials: true,
});

export default axiosInstance;
