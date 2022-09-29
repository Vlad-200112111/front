import axios from "../axios";
import Cookies from "js-cookie";

const config = {
    headers: {
        'Content-Type': 'application/json;charset=utf-8',
        'Accept': 'text/plain'
    },
};

const token = Cookies.get("auth-token");
const userId = Cookies.get("userId");

const endpoints = {
    getListGroups: () => axios.get("EducationalProcess/api/v1/Student/GroupStudent", {params: {token: Cookies.get("auth-token")}}),
    getListDecree: (data) => axios.post("StudentOrderService/api/v1/OrderStudent/OrdersStudent", JSON.stringify(data), config),
    GetStudents: () => axios.get(`EducationalProcess/api/v1/WorkStudent/StudenStaff`, {params: {token: Cookies.get("auth-token")}}),
    getStudentId:()=>axios.get(`EducationalProcess/api/v1/WorkStudent/StudentIdByToken`, {
        params:{
            token:Cookies.get("auth-token")
        }
    }),
    getStudentFullName:(studentId)=>axios.get(`EducationalProcess/api/v1/Document/FullName`,{
        params:{
            studentId:studentId
        }
    }),
    getStudentProfileInformationByStudentId:(studentId)=>axios.get(`EducationalProcess/api/v1/ProfileInformation/StudentInfoByStudentId`,{
        params:{
            studentId:studentId
        }
    }),
    getCalendarStudyScheduleYaers:()=>axios.get(`EducationalProcess/api/v1/CalendarScheduleEducationalProcess/Year`, {
        params:{
            token: Cookies.get("auth-token")
        }
    }),
    getCalendarStudyStudyForms:()=>axios.get(`EducationalProcess/api/v1/CalendarScheduleEducationalProcess/StudyForm`, {
        params:{
            token: Cookies.get("auth-token")
        }
    }),
    getCalendarStudySpeciality:(startYear,endYear, idStudyForm)=>axios.get(`EducationalProcess/api/v1/CalendarScheduleEducationalProcess/Speciality`, {
        params:{
            token: Cookies.get("auth-token"),
            startYear:startYear,
            endYear:endYear,
            idStudyForm:idStudyForm

        }
    }),
    getCalendarStudyGroups:(startYear,endYear, idStudyForm, idSpeciality)=>axios.get(`EducationalProcess/api/v1/CalendarScheduleEducationalProcess/Group`, {
            params:{
                token: Cookies.get("auth-token"),
                startYear:startYear,
                endYear:endYear,
                idStudyForm:idStudyForm,
                idSpeciality:idSpeciality
            }
        }),
    postCalendarStudyMark:(data)=>axios.post(`/CalendarScheduleEducationalProcess/api/v1/GraphNotation`, JSON.stringify(data),config),
    getCalendarStudyMarks:()=>axios.get(`/CalendarScheduleEducationalProcess/api/v1/GraphNotation/GraphNotation`, {
        params:{
            token:Cookies.get('auth-token')
        }
    }),
    getCalendarStudyEmployee:(startYear,endYear,idStudyForm,idSpeciality)=>axios.get(`/CalendarScheduleEducationalProcess/api/v1/CalendarSchedule/Employee`, {
        params:{
            token:Cookies.get('auth-token'),
            startYear:startYear,
            endYear:endYear,
            idStudyForm:idStudyForm,
            idSpeciality:idSpeciality
        }
    }),
    postCalendarStudy:(data)=>axios.post(`/CalendarScheduleEducationalProcess/api/v1/CalendarSchedule`,JSON.stringify(data), config),
    getCalendarStudyStudent:(startYear,endYear,idGroup)=>axios.get(`/CalendarScheduleEducationalProcess/api/v1/CalendarSchedule/Student`,{
        params:{
            token:Cookies.get('auth-token'),
            startYear:startYear,
            endYear:endYear,
            idGroup:idGroup
        }
    }),
    getCalendarStudyEmployeeById:(id)=>axios.get(`/CalendarScheduleEducationalProcess/api/v1/Calendar/Student`,{
        params:{
            token:  Cookies.get('auth-token'),
            idCalendarSchedule:id

        }
    }),
    editCalendarStudyById:(data)=>axios.put(`/CalendarScheduleEducationalProcess/api/v1/CalendarSchedule`,JSON.stringify(data), config),
    deleteCalendarStudyById:(idCalendarSchedule)=>axios.delete(`/CalendarScheduleEducationalProcess/api/v1/CalendarSchedule`, {
       params:{
           token:Cookies.get('auth-token'),
           id:idCalendarSchedule
       }
    }),
    getAllFaculty:()=>axios.get(`EducationalProcess/api/v1/WorkStudent/Faculty`,{
        params:{
            token:  Cookies.get('auth-token'),
        }
    }),
    getAllSpecalityByFaculty:(idFaculty)=>axios.get(`EducationalProcess/api/v1/WorkStudent/SpecalityByFaculty`,{
        params:{
            token:  Cookies.get('auth-token'),
            idFaculty: idFaculty
        }
    }),
    getAllStudents:(idGroup)=>axios.get(`EducationalProcess/api/v1/WorkStudent/StudentByGroup`,{
        params:{
            token:  Cookies.get('auth-token'),
            idGroup: idGroup
        }
    }),
    getAllSpecialities:()=>axios.get(`EducationalProcess/api/v1/WorkStudent/SpecalityByEmployee`,{
        params:{
            token:  Cookies.get('auth-token'),
        }
    }),
    getAllGroup:(idSpeciality, idFaculty)=>axios.get(`EducationalProcess/api/v1/WorkStudent/GroupBySpeciality`,{
        params:{
            token:  Cookies.get('auth-token'),
            idSpeciality: idSpeciality,
            idFaculty: idFaculty
        }
    }),
    getGroups:(idSpeciality)=>axios.get(`EducationalProcess/api/v1/WorkStudent/GroupBySpecalityEmployee`,{
        params:{
            token:  Cookies.get('auth-token'),
            idSpeciality: idSpeciality
        }
    }),
    getStudents:(groupId)=>axios.get(`EducationalProcess/api/v1/WorkStudent/StudentByEmployee`,{
        params:{
            token:  Cookies.get('auth-token'),
            idGroup: groupId
        }
    }),
};

export default endpoints;
