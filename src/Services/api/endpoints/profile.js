import axios from "../axios";
import Cookies from "js-cookie";
import profile from "../../../Component/Student/Profile/Profile";

const config = {
    headers: {

        'Content-Type': 'application/json;charset=utf-8', 'Accept': '/*/'
    },
};

const endpoints = {
    GetUserProfile: () => axios.get(`Profile/api/v1/user-profiles/`, {params: {token: Cookies.get("auth-token")}}),
    GetUserProfileByStudentId: (studentId) => axios.get(`Profile/api/v1/user-profiles/by-student/${studentId}`, {params: {token: Cookies.get("auth-token")}}),
    GetUserProfileByStuffId: (stuffId) => axios.get(`Profile/api/v1/user-profiles/by-staff/${stuffId}`, {params: {token: Cookies.get("auth-token") }}),
    GetUserProfileIdByStudent: (studentId) => axios.get(`Profile/api/v1/user-profiles/profile-id/by-student`, {params: {token: Cookies.get("auth-token"), studentId:studentId}}),
    GetUserProfileIdByStuff: (stuffId) => axios.get(`Profile/api/v1/user-profiles/profile-id/by-staff`, {params: {token: Cookies.get("auth-token"), staffId:stuffId}}),
    PostNewUserProfile: () => axios.post('Profile/api/v1/user-profiles', JSON.stringify({token: Cookies.get("auth-token")}), config),
    GetLanguages: () => axios.get('Profile/api/v1/languages', {params: {token: Cookies.get("auth-token")}}),
    GetUserLanguages: (profileId) => axios.get(`Profile/api/v1/user-profiles/${profileId}/languages`, {params: {token: Cookies.get("auth-token")}}),
    DeleteUserLanguage: (userLangId, profileId) => axios.delete(`Profile/api/v1/user-profiles/${profileId}/languages/${userLangId}`, {params: {token: Cookies.get("auth-token")}}),
    SendLanguage: (data, profileId) => axios.post(`Profile/api/v1/user-profiles/${profileId}/languages`, JSON.stringify(data), config),
    GetProficiencyLevels: () => axios.get('Profile/api/v1/proficiency-levels', {params: {token: Cookies.get("auth-token")}}),

    GetUserAbout: (profileId) => axios.get(`Profile/api/v1/user-profiles/${profileId}/about-me`, {params: {token: Cookies.get("auth-token")}}),
    EditUserAbout: (data, profileId) => axios.put(`Profile/api/v1/user-profiles/${profileId}/about-me`, JSON.stringify(data), config),
    GetUserHardSkills: (profileId) => axios.get(`Profile/api/v1/user-profiles/${profileId}/hardskills`, {params: {token: Cookies.get("auth-token")}}),
    GetHardSkillsList: () => axios.get(`Profile/api/v1/skills/hardskills/top5`, {params: {token: Cookies.get("auth-token")}}),
    PostUserHardSkill: (data, profileId) => axios.post(`Profile/api/v1/user-profiles/${profileId}/hardskills`, JSON.stringify(data), config),
    EditUserHardSkill: (data, profileId) => axios.put(`Profile/api/v1/user-profiles/${profileId}/hardskills`, JSON.stringify(data), config),
    DeleteUserHardSkill: (userHardSkillId, profileId) => axios.delete(`Profile/api/v1/user-profiles/${profileId}/hardskills/${userHardSkillId}`, {params: {token: Cookies.get("auth-token")}}),
    GetUserSoftSkills: (profileId) => axios.get(`Profile/api/v1/user-profiles/${profileId}/softskills`, {params: {token: Cookies.get("auth-token")}}),
    GetSoftSkillsList: () => axios.get(`Profile/api/v1/skills/softskills/top5`, {params: {token: Cookies.get("auth-token")}}),
    PostUserSoftSkill: (data, profileId) => axios.post(`Profile/api/v1/user-profiles/${profileId}/softskills`, JSON.stringify(data), config),
    EditUserSoftSkill: (data, profileId)=>axios.put(`Profile/api/v1/user-profiles/${profileId}/softskills`, JSON.stringify(data), config),
    DeleteUserSoftSkill: (userSoftSkillId, profileId) => axios.delete(`Profile/api/v1/user-profiles/${profileId}/softskills/${userSoftSkillId}`, {params: {token: Cookies.get("auth-token")}}),
    GetStudentProjects: (profileId) => axios.get(`Profile/api/v1/user-profiles/${profileId}/project-activity`, {params: {token: Cookies.get("auth-token")}}),
    PostStudentProject: (data, profileId) => axios.post(`Profile/api/v1/user-profiles/${profileId}/project-activity`, JSON.stringify(data), config),
    DeleteStudentProject: (userProjectId, profileId) => axios.delete(`Profile/api/v1/user-profiles/${profileId}/project-activity/${userProjectId}`, {params: {token: Cookies.get("auth-token")}}),
    EditStudentProject: (data, userProjectId, profileId) => axios.put(`Profile/api/v1/user-profiles/${profileId}/project-activity/${userProjectId}`, JSON.stringify(data), config),
    GetPublicationsTypes: () => axios.get(`Profile/api/v1/publication-types`, {params: {token: Cookies.get("auth-token")}}),
    GetEmployeePublications: (profileId) => axios.get(`Profile/api/v1/user-profiles/${profileId}/scientific-publications`, {params: {token: Cookies.get("auth-token")}}),
    PostEmployeePublication: (data, profileId) => axios.post(`Profile/api/v1/user-profiles/${profileId}/scientific-publications`, JSON.stringify(data), config),
    DeleteEmployeePublication: (EmployeePublicationId, profileId) => axios.delete(`Profile/api/v1/user-profiles/${profileId}/scientific-publications/${EmployeePublicationId}`, {params: {token: Cookies.get("auth-token")}}),
    EditEmployeePublication: (data, EmployeePublicationId, profileId) => axios.put(`Profile/api/v1/user-profiles/${profileId}/scientific-publications/${EmployeePublicationId}`, JSON.stringify(data), config),
    GetStudentPublications:(profileId)=>axios.get(`Profile/api/v1/user-profiles/${profileId}/publications`,{
        params:{
            token:Cookies.get('auth-token')
        }
    }),
    EditStudentPublication:(data, StudentPublicationId, profileId)=>axios.put(`Profile/api/v1/user-profiles/${profileId}/publications/${StudentPublicationId}`, JSON.stringify(data), config),
    PostStudentPublication:(profileId, data)=>axios.post(`Profile/api/v1/user-profiles/${profileId}/publications`,JSON.stringify(data), config),
    DeleteStudentPublication:(StudentPublicationId, ProfileId)=>axios.delete(`Profile/api/v1/user-profiles/${ProfileId}/publications/${StudentPublicationId}`,{params:{token:Cookies.get('auth-token')}}),
    GetEmployeeAdditionalInfo: (profileId) => axios.get(`Profile/api/v1/user-profiles/${profileId}/additional-info`, {params: {token: Cookies.get("auth-token")}}),
    EditEmployeeAdditionalInfo: (data, profileId) => axios.put(`Profile/api/v1/user-profiles/${profileId}/additional-info`, JSON.stringify(data), config),
    GetUserPhoto: (profileId) => axios.get(`Profile/api/v1/user-profiles/${profileId}/photo`, {params: {token: Cookies.get("auth-token")}}).catch(function (error) {
        if (error.response) {
            // Request made and server responded
            console.log(error.response.data);
            console.log(error.response.status);
            console.log(error.response.headers);
        } else if (error.request) {
            // The request was made but no response was received
            console.log(error.request);
        } else {
            // Something happened in setting up the request that triggered an Error
            console.log('Error', error.message);
        }}),
    EditUserPhoto: (data, profileId) => axios.put(`Profile/api/v1/user-profiles/${profileId}/photo`, JSON.stringify(data), config),
    DeleteUserPhoto: (profileId) => axios.delete(`Profile/api/v1/user-profiles/${profileId}/photo`, {params: {token: Cookies.get("auth-token")}}),
    PostSocialMedia: (data) => axios.post(`Profile/api/v1/social-medias`, JSON.stringify(data), config),
    GetSocialMedias: (data) => axios.get(`Profile/api/v1/social-medias`, {params: {token: Cookies.get("auth-token")}}),
    DeleteSocialMedia: (SocialMediaId) => axios.delete(`Profile/api/v1/social-medias/${SocialMediaId}`, {params: {token: Cookies.get("auth-token")}}),
    GetUserSocialMedias: (profileId) => axios.get(`Profile/api/v1/user-profiles/${profileId}/social-medias`, {params: {token: Cookies.get("auth-token")}}),
    PostUserSocialMedia: (data, profileId) => axios.post(`Profile/api/v1/user-profiles/${profileId}/social-medias`, JSON.stringify(data), config),
    DeleteUserSocialMedia: (UserSocialMediaId, profileId) => axios.delete(`Profile/api/v1/user-profiles/${profileId}/social-medias/${UserSocialMediaId}`, {params: {token: Cookies.get("auth-token")}}),
    SearchHardSkills:(skillName)=>axios.get(`Profile/api/v1/skills/hardskills`, {params:{token:Cookies.get("auth-token"), skillname:skillName}}),
    SearchSoftSkills:(skillName)=>axios.get(`Profile/api/v1/skills/softskills`, {params:{token:Cookies.get("auth-token"), skillname:skillName}}),
};

export default endpoints;
