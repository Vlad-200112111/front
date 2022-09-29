import axios from "../axios";
import Cookies from "js-cookie";

const config = {
    headers: {
        'Content-Type': 'application/json;charset=utf-8',
        'Accept': 'text/plain'
    },
};

const endpoints = {
    getOrders: (idStudent) => axios.get("StudentOrder/api/v1/Order/OrdersStudent", {
        params: {
            token: Cookies.get("auth-token"),
            idStudent: idStudent
        }
    })
};

export default endpoints;
