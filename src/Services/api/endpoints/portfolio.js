import axios from "../axios";
import Cookies from "js-cookie";


const config = {
    headers: {
        'Content-Type': 'application/json;charset=utf-8', 'Accept': '/*/'
    },
};

const endpoints = {
    getListCategoriesAchievements: () => axios.get("Portfolio/api/v1/categories", {params: {token: Cookies.get("auth-token")}}),
    getCountAchievementsByStudentId: (studentId, documentCategoryId) => axios.get(`Portfolio/api/v1/pagination/users/by-student/${studentId}`, {
        params: {
            token: Cookies.get("auth-token"), categoryId: documentCategoryId
        }
    }),
    getListAchievementsByStudentId: (studentId, page, count, categoryId, uploadDate,updateDate) => axios.get(`Portfolio/api/v1/documents/by-student/${studentId}`, {
        params: {
            page: page, count: count, categoryId: categoryId, token: Cookies.get("auth-token"), uploadDate:uploadDate,updateDate:updateDate,orderBy:'uploadDate',descending:true
        }
    }),
    sendAchievement: (data, studentId) => axios.post(`Portfolio/api/v1/documents/by-student/${studentId}`, JSON.stringify(data), config),
    deleteAchievement: (documentId) => axios.delete(`Portfolio/api/v1/documents/${documentId}`, {
        params: {
            token: Cookies.get("auth-token")
        }
    }),
    changesAchievement: (data, id) => axios.put(`Portfolio/api/v1/documents/${id}`, JSON.stringify(data), config),
    getShowCaseByStudentId: (studentId) => axios.get(`Portfolio/api/v1/usershowcase/by-student/${studentId}`, {params: {token: Cookies.get("auth-token")}}),
    postShowCase: (data, studentId) => axios.post(`Portfolio/api/v1/usershowcase/by-student/${studentId}`, JSON.stringify(data), config),
    deleteShowCase: (id) => axios.delete(`Portfolio/api/v1/usershowcase/${id}`, {params: {token: Cookies.get("auth-token")}})
};

export default endpoints;
