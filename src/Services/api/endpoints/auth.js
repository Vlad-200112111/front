import axios from "../axios";
import Cookies from "js-cookie";

const config = {
    headers: {

        'Content-Type': 'application/json;charset=utf-8',
        'Accept': '/*/'
    },
};

const endpoints = {
    login: (data) => axios.post("Authorization/api/v1/AUser", data).catch(() => {
        return "ERROR"
    }),
    checkAuth: () => axios.post("Authorization/api/v1/AUser/SessionVerification", {token: Cookies.get("auth-token")}),
    assigningRole: (data) => axios.post("Authorization/api/v1/ARole/RoleSelection", data),
    getAssigningRole: (data) => axios.post("Authorization/api/v1/ARole/GetSelectedRoles", data),
    getProfile: (userId) => axios.get("Authorization/api/v1/APerson", {
        params: {
            userId: userId,
            token: Cookies.get("auth-token")
        }
    }),
    logOut: (token) => axios.delete("Authorization/api/v1/AUser", {params: {token: token}}),
    getInformationAboutIndividual: (id) => axios.get("Authorization/api/v1/APerson", {
        params: {
            userId: id,
            token: Cookies.get("auth-token")
        }
    }),
    getEmployees: () => axios.get(`/Authorization/api/v1/AUser/GetUserEmployee`, {params: {token: Cookies.get("auth-token")}}),
    postPageLink: (data) => axios.post(`/Authorization/api/v1/ALinkPage`, JSON.stringify(data), config),
    deletePageLink:(id)=>axios.delete(`/Authorization/api/v1/ALinkPage/Delete`, {
        params:{
            token:Cookies.get('auth-token'),
            id:id
        }
    }),
    getPagesGroup:()=>axios.get(`/Authorization/api/v1/GroupLinkPage/`, {
        params:{
            token:Cookies.get('auth-token')
        }
    }),
    postPagesGroup:(data)=>axios.post(`/Authorization/api/v1/GroupLinkPage/`,JSON.stringify(data),config),
    getPagesLinks: () => axios.get(`/Authorization/api/v1/ALinkPage`, {params: {token: Cookies.get("auth-token")}}),
    postSubrole: (data) => axios.post(`/Authorization/api/v1/ASubRole`, JSON.stringify(data), config),
    deleteSubrole: (id) => axios.delete(`/Authorization/api/v1/ASubRole/Delete`, {
        params:{
            token:Cookies.get('auth-token'),
            id:id
        }}),
    getSubroles: () => axios.get(`/Authorization/api/v1/ASubRole`, {params: {token: Cookies.get("auth-token")}}),
    postLinkForSubrole: (data) => axios.post(`/Authorization/api/v1/ACRUDLinksForSubRole`, JSON.stringify(data), config),
    getLinksForSubrole: (data) => axios.get(`/Authorization/api/v1/ACRUDLinksForSubRole`, {
        params: {
            token: Cookies.get("auth-token"),
            nameSubRole: data
        }
    }),
    getLinksForSubroleByCrudId: (id) => axios.get(`/Authorization/api/v1/ACRUDLinksForSubRole/CRUDCurrentPage`, {
        params: {
            token: Cookies.get("auth-token"),
            idCRUD: id
        }
    }),
    getUserSubroles: (id) => axios.get(`/Authorization/api/v1/ASubRoleUser`, {
        params: {
            token: Cookies.get("auth-token"),
        }
    }),
    postUserSubrole: (data) => axios.post(`/Authorization/api/v1/ASubRoleUser`, JSON.stringify(data), config),
    resetPassword: (email) => axios.get('/Authorization/api/v1/AUser/ResetPassword', {params: {email: email}})
};

export default endpoints;
