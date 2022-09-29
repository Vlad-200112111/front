import axios from "../axios";
import Cookies from "js-cookie";

const config = {
    headers: {
        'Content-Type': 'application/json;charset=utf-8',
        'Accept': 'text/plain, */*'
    },
};

const configMultipart = {
    headers: {
        'Content-Type': 'multipart/form-data',
        'Accept': '*/*'
    },
};

const userId = Cookies.get("userId");

const endpoints = {
    getPosts: () => axios.get("Wiki/api/v1/Posts", {params: {token: Cookies.get("auth-token")}}),
    getPostsByUserId: () => axios.get("Wiki/api/v1/Posts", {params: {id: userId, token: Cookies.get("auth-token")}}),
    createPost: (data) => axios.post("Wiki/api/v1/Posts", JSON.stringify(data), config),
    deletePost: (idPost) => axios.delete("Wiki/api/v1/Posts/Delete", {
        params: {
            token: Cookies.get("auth-token"),
            id: idPost
        }
    }),
    getCategoriesForPosts: () => axios.get("Wiki/api/v1/Categories", {params: {token: Cookies.get("auth-token")}}),
    getSubCategoriesForPosts: (categoriesId) => axios.get("Wiki/api/v1/SubCategories", {
        params: {
            token: Cookies.get("auth-token"),
            categoriesId: categoriesId
        } , config
    }),
    addCategoriesForPost: (data) => axios.post("Wiki/api/v1/Categories", JSON.stringify(data), config),
    addSubCategoriesForPost: (data) => axios.post("Wiki/api/v1/SubCategories", JSON.stringify(data), config),
    addTextPartForPost: (data) => axios.post("Wiki/api/v1/TextPost", JSON.stringify(data), config),
    updateTextPartForPost: (data) => axios.put("Wiki/api/v1/TextPost/Update", JSON.stringify(data), config),
    deleteTextPartForPost: (data) => axios.delete("Wiki/api/v1/TextPost", JSON.stringify(data), config),
    getTextPartForPost: (idPost) => axios.get("Wiki/api/v1/TextPost", {
        params: {
            token: Cookies.get("auth-token"),
            idPost: idPost
        }
    }),
    addFilePartForPost: (data) => axios.post("Wiki/api/v1/FilesPosts", JSON.stringify(data), config),
    updateFilePartForPost: (data) => axios.put("Wiki/api/v1/AFilesPosts/Update", data, config),
    deleteFilePartForPost: (idDocument) => axios.delete("Wiki/api/v1/AFilesPosts/Delete", {
        params: {
            token: Cookies.get("auth-token"),
            id: idDocument
        }
    }),
    getFilePartForPost: (idPost) => axios.get("Wiki/api/v1/FilesPosts", {
        params: {
            token: Cookies.get("auth-token"),
            idPost: idPost
        }
    }),
    checkUserPost: (idPost) => axios.get("Wiki/api/v1/APosts/CheckUserPost", {
        params: {
            token: Cookies.get("auth-token"),
            postId: idPost,
            userId: userId
        }
    }),
};

export default endpoints;
