import axios from "../axios";
import Cookies from "js-cookie";

const config = {
    headers: {
        'Content-Type': 'application/json;charset=utf-8',
        'Accept': 'text/plain'
    },
};


const endpoints = {
    login: (data) => axios.post("/v1/AUser", data),
    getProfile: () => axios.get("/v1/auth/me"),
    getStuffId:()=>axios.get(`Staff/api/v1/Employee/StaffIdByToken`, {
        params:{
            token:Cookies.get("auth-token")
        }
    }),
    getStuffFullName:(stuffId)=>axios.get(`Staff/api/v1/Employee/FullName`, {
        params:{
            employeeId:stuffId
        }
    })
};

export default endpoints;
