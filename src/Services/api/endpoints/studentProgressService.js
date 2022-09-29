import axios from "../axios";
import Cookies from "js-cookie";

const config = {
    headers: {
        'Content-Type': 'application/json;charset=utf-8',
        'Accept': 'text/plain'
    },
};


const endpoints = {
    getListSemester: (studentId) => axios.get("StudentProgress/api/v1/Student/StudentSemestr", {
        params: {
            token: Cookies.get("auth-token"),
            idStudent: studentId
        }
    }, config),
    getListAcademicPerformance: (semestrId, studentId) => axios.get("StudentProgress/api/v1/Student/MarkStudent", {
        params: {
            token: Cookies.get("auth-token"),
            semestrId: semestrId,
            idStudent: studentId
        }
    }, config)
};

export default endpoints;
