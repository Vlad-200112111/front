import axios from "axios";

const axiosInstance = axios.create({
    baseURL: "https://eos.zabgu.ru/",
});

export default axiosInstance;
