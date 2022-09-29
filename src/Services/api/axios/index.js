import axios from "axios";
import Cookies from "js-cookie";

const baseURL = window.location.host.indexOf("localhost") !== -1 ? `https://cabinet.zabgu.ru/` : `https://${window.location.host}/`

const axiosInstance = axios.create({
    baseURL: baseURL,
});

axiosInstance.interceptors.request.use(
  (config) => {
    const authToken = Cookies.get("auth-token");

    if (authToken) {
      config.headers.authorization = `Bearer ${authToken}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

export default axiosInstance;
