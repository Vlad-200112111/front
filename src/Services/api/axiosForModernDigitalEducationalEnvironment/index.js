import axios from "axios";
import Cookies from "js-cookie";

const axiosInstance = axios.create({
    baseURL: "https://cabinet.zabgu.ru/",
});

axiosInstance.interceptors.request.use(
    (config) => {
        const nameParam = "d408e44f-aa44-44b1-a14c-bac77ad0ec5c";

        if (nameParam) {
            config.headers['X-CN-UUID'] = nameParam;
            config.headers['mode'] = 'cors';
        }

        return config;
    },
    (error) => Promise.reject(error)
);

export default axiosInstance;
