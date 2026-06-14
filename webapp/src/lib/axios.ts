import axios from "axios";
import type { AxiosInstance } from "axios";

const url = import.meta.env.VITE_API_URL;

export const api: AxiosInstance = axios.create({
  baseURL: url,
  timeout: 5000,
});
