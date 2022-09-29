import axios from "../axiosForModernDigitalEducationalEnvironment/index";
import Cookies from "js-cookie";


const userId = Cookies.get("userId");

const endpoints = {
    checkConnection: () => axios.get(`InteractionWithGISSCOS/api/v1/Temporary/TestConection`).catch(function (error) {
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
        }

    }),
    getListStudents: (OrganizationId, studyPlanId, snils, inn, email, filter, page, fromDate, pageSize) => axios.get(`InteractionWithGISSCOS/api/v1/Temporary/GetStudent`, {
        params: {
            organization_id: OrganizationId,
            study_plan_id: studyPlanId,
            snils: snils,
            inn: inn,
            email: email,
            filter: filter,
            page: 2,
            from_date: fromDate,
            page_size: pageSize
        }
    }),
    getListContingentMovements: (idStudent) => axios.get(`InteractionWithGISSCOS/api/v1/Temporary/GetTrafficStudent`, {
        params: {
            idStudent: idStudent,
        }
    }),
    getListCurricula: (idStudent) => axios.get(`InteractionWithGISSCOS/api/v1/Temporary/GetStudyPlansStudent`, {
        params: {
            idStudent: idStudent,
        }
    }),
    getListDisciplines: (OrganizationId, studyPlanId, snils, inn, email, filter, page, fromDate, pageSize) => axios.get(`vam/api/v2/students`, {
        params: {
            organization_id: OrganizationId,
            study_plan_id: studyPlanId,
            snils: snils,
            inn: inn,
            email: email,
            filter: filter,
            page: page,
            from_date: fromDate,
            page_size: pageSize
        }
    }),
    getListEducationalPrograms: (OrganizationId, studyPlanId, snils, inn, email, filter, page, fromDate, pageSize) => axios.get(`vam/api/v2/students`, {
        params: {
            organization_id: OrganizationId,
            study_plan_id: studyPlanId,
            snils: snils,
            inn: inn,
            email: email,
            filter: filter,
            page: page,
            from_date: fromDate,
            page_size: pageSize
        }
    }),
    getListMarks: (idStudent) => axios.get(`InteractionWithGISSCOS/api/v1/Temporary/GetMarkStudent`, {
        params: {
            idStudent: idStudent,
        }
    }),


    deleteItemContingentMovements: (trafficStudent) => axios.get("InteractionWithGISSCOS/api/v1/Temporary/DeleteTrafficStudent", {
        params: {
            trafficStudent: trafficStudent
        }
    }),
    deleteItemCurricula: (data) => axios.delete("Portfolio/api/v1/SendDocuments/Delete", {
        params: {
            token: Cookies.get("auth-token"),
            id: data
        }
    }),
    deleteConnectionPlansWithStudents: (idStudent, studyPlan) => axios.get("InteractionWithGISSCOS/api/v1/Temporary/DeleteStudyPlansStudent", {
        params: {
            idStudent: idStudent,
            studyPlans: studyPlan
        }
    }),
    deleteItemDisciplines: (data) => axios.delete("Portfolio/api/v1/SendDocuments/Delete", {
        params: {
            token: Cookies.get("auth-token"),
            id: data
        }
    }),
    deleteItemEducationalPrograms: (data) => axios.delete("Portfolio/api/v1/SendDocuments/Delete", {
        params: {
            token: Cookies.get("auth-token"),
            id: data
        }
    }),
    deleteItemMarks: (markStudent) => axios.get("InteractionWithGISSCOS/api/v1/Temporary/DeleteMarkStudent", {
        params: {
            markStudent: markStudent
        }
    }),
    deleteItemStudent: (idStudent) => axios.get("InteractionWithGISSCOS/api/v1/Temporary/DeleteStudents", {
        params: {
            params: {
                idStudent: idStudent
            }
        }
    }),

};

export default endpoints;
