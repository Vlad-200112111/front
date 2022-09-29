import axios from "../axios";
import Cookies from "js-cookie";

const config = {
    headers: {
        'Content-Type': 'application/json;charset=utf-8',
        'Accept': 'text/plain'
    },
};

const endpoints = {
    getDisciplines: (groupId, studentId) => axios.get("ElectiveDisciplines/api/v1/Student/ElectiveDiscipline", {
        params: {
            studentId: studentId,
            token: Cookies.get("auth-token"),
            groupId: groupId
        }
    }),
    sendDisciplines: (data) => axios.post("ElectiveDisciplines/api/v1/Student", data),
    updateDisciplines: (data) => axios.put("ElectiveDisciplines/api/v1/Student", data)
};

export default endpoints;
