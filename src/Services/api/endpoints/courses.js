import axios from "./../axios";
import Cookies from "js-cookie";
const config = {
    headers: {
        'Content-Type': 'application/json;charset=utf-8',
        'Accept': '/*/'
    },
};
const endpoints = {
    // getMoodleToken: () => axios.get(`DistanceLearning/api/v1/moodleuser/get-token?username=ws_user&password=A12345a%21`
    // ),
    getCourses: () => axios.get(`DistanceLearning/api/v1/moodlecourse/get-enrolled`, {
        params: {
            moodletoken: '196b006fa8b5a88f9e6cc1b390ab5aea'
        }
    }),








    getDisciplineEmployee: (idGroup, idSemester) => axios.get(`DistanceLearning/api/v1/DisciplineEmployee`, {
        params: {
            token: Cookies.get("auth-token"),
            idGroup: idGroup,
            idSemestr: idSemester
        }
    }),
    getDisciplineStudent: (idDiscipline) => axios.get(`DistanceLearning/api/v1/StudyLoadStudent`, {
        params: {
            token: Cookies.get("auth-token"),
            idDiscipline: idDiscipline
        }
    }),
    getStudyLoadStudent: (idGroup, idSemester) => axios.get(`DistanceLearning/api/v1/DisciplineStudent`, {
        params: {
            token: Cookies.get("auth-token"),
            idGroup: idGroup,
            idSemestr: idSemester
        }
    }),
    getDisciplineEmployeeGroup: () => axios.get(`DistanceLearning/api/v1/DisciplineEmployee/Group`, {
        params: {
            token: Cookies.get("auth-token")
        }
    }),
    getDisciplineEmployeeSemester: (idGroup) => axios.get(`DistanceLearning/api/v1/DisciplineEmployee/Semestr`, {
        params: {
            token: Cookies.get("auth-token"),
            idGroup: idGroup
        }
    }),
    getEmploy: () => axios.get(`DistanceLearning/api/v1/DisciplineHeadDepartment/Employee`, {
        params: {
            token: Cookies.get("auth-token")
        }
    }),
    getDisciplineEmployeeSemesterZAV: (idGroup, userId) => axios.get(`DistanceLearning/api/v1/DisciplineHeadDepartment/Semestr`, {
        params: {
            token: Cookies.get("auth-token"),
            idGroup: idGroup,
            userId: userId
        }
    }),
    getDisciplineEmployeeGroupZAV: (userId) => axios.get(`DistanceLearning/api/v1/DisciplineHeadDepartment/Group`, {
        params: {
            token: Cookies.get("auth-token"),
            userId: userId
        }
    }),
    getStudyLoadStudentZAV: (idGroup, idSemester, userId) => axios.get(`DistanceLearning/api/v1/DisciplineHeadDepartment`, {
        params: {
            token: Cookies.get("auth-token"),
            idGroup: idGroup,
            idSemestr: idSemester,
            userId: userId
        }
    }),
    getDisciplineStudentSemester: (idGroup) => axios.get(`DistanceLearning/api/v1/DisciplineStudent/Semestr`, {
        params: {
            token: Cookies.get("auth-token"),
            idGroup: idGroup
        }
    }),
    getTopic: (idCourse) => axios.get(`DistanceLearning/api/v1/Topic`, {
        params: {
            token: Cookies.get("auth-token"),
            idCourse: idCourse
        }
    }),
    deleteTopic: (idCourse) => axios.delete(`DistanceLearning/api/v1/Topic`, {
        params: {
            token: Cookies.get("auth-token"),
            idCourse: idCourse
        }
    }),
    getStudyLoad: (idTopic) => axios.get(`DistanceLearning/api/v1/StudyLoad`, {
        params: {
            token: Cookies.get("auth-token"),
            idTopic: idTopic
        }
    }),
    getTopicById: (idTopic) => axios.get(`DistanceLearning/api/v1/Topic/TopicById`, {
        params: {
            token: Cookies.get("auth-token"),
            idTopic: idTopic
        }
    }),
    getOccupations: () => axios.get(`DistanceLearning/api/v1/Occupations`, {
        params: {
            token: Cookies.get("auth-token")
        }
    }),
    postLoadDisciplines1C: (data) => axios.post(`DistanceLearning/api/v1/LoadData1C/LoadDisciplines`, JSON.stringify(data), config),
    postLoadControlPoints1C: (data) => axios.post(`DistanceLearning/api/v1/LoadData1C/LoadControlPoints`, JSON.stringify(data), config),
    postTopic: (data) => axios.post(`DistanceLearning/api/v1/Topic`, JSON.stringify(data), config),
    postStudyLoad: (data) => axios.post(`DistanceLearning/api/v1/StudyLoad`, JSON.stringify(data), config),

    // postLoadControlPoints1C: (data) => axios.post(`DistanceLearning/api/v1/LoadData1C/LoadControlPoints`, JSON.stringify(data), config),









    // getCoursesThemes: (Token, Courseid) => axios.get(`DistanceLearning/api/v1/moodlecourse/get-course-topics`, {
    //     params: {
    //         moodletoken: Token,
    //         courseid: Courseid
    //     }
    // }),
    getThemeElements: (Token,Courseid, Topicid) => axios.get(`DistanceLearning/api/v1/moodlecourse/get-topic`, {
        params: {
            moodletoken:Token,
            courseid:Courseid,
            topicid:Topicid
        }
    }),
    getListSemesters:( groupId)=>axios.get(`DistanceLearning/api/v1/Education/semesters`, {
        params:{
            token:Cookies.get('auth-token'),
            groupId:groupId
        }

    }),
    getCoursesDisciplines:(groupId,semesterId)=>axios.get(`DistanceLearning/api/v1/Education/get-disciplines`,{
        params:{
            token:Cookies.get('auth-token'),
            groupId:groupId,
            semesterId:semesterId
        }

    }),
    postCourseTheme:(data)=>axios.post(`DistanceLearning/api/v1/Topic/create`, JSON.stringify(data), config),
    getCoursesThemes:(disciplineId)=>axios.get(`DistanceLearning/api/v1/Topic`, {params:{
            token:Cookies.get('auth-token'),
            disciplineId:disciplineId
        }}) ,
    getDisciplineById:(disciplineId)=>axios.get(`/DistanceLearning/api/v1/Education/discipline`, {
        params:{
            token:Cookies.get('auth-token'),
            disciplineId:disciplineId
        }
    }),
    postLection:(data)=>axios.post(`/DistanceLearning//api/v1/Lection/add`, JSON.stringify(data), config),

}
export default endpoints