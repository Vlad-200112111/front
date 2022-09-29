import axios from "../axios";

const endpoints = {
    login: (data) => axios.post("/v1/AUser", data),
    getProfile: () => axios.get("/v1/auth/me")
};

export default endpoints;
