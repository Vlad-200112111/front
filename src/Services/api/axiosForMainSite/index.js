import axios from "axios";

const axiosInstance = axios.create({
    baseURL: "https://zabgu.ru/",
});

export default axiosInstance;
