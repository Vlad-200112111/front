import axios from "./../axios/index";
import Cookies from "js-cookie";


const config = {
    headers: {
        'Content-Type': 'application/json;charset=utf-8', 'Accept': '/*/'
    },
};

const endpoints = {
    getScheduleCall: () => axios.get(`CallSchedule/api/v1/schedules`, {params: {token: Cookies.get("auth-token")}}),
    getScheduleCallById: (id) => axios.get(`CallSchedule/api/v1/schedules/${id}`, {params: {token: Cookies.get("auth-token")}}),
    sendScheduleCall: (data) => axios.post(`CallSchedule/api/v1/schedules`, JSON.stringify(data), config),
    deleteScheduleCall: (scheduleId) => axios.delete(`CallSchedule/api/v1/schedules/${scheduleId}`, {
        params: {
            token: Cookies.get("auth-token")
        },
        headers: {
            'Content-Type': 'application/json;charset=utf-8', 'Accept': '/*/'
        },
    }),
    getBuildingsWithSchedule: (scheduleId) => axios.get(`CallSchedule/api/v1/buildings/excluding-schedule`, {params: {token: Cookies.get("auth-token"), scheduleId:scheduleId}}),
    getBuildingsWithoutSchedule: () => axios.get(`CallSchedule/api/v1/buildings/without-schedule`, {params: {token: Cookies.get("auth-token")}}),
    getRelativeBuildings: (id) => axios.get(`CallSchedule/api/v1/schedules/${id}/relative-buildings`, {params: {token: Cookies.get("auth-token")}}),
    updateScheduleCall: (data, scheduleId) => axios.put(`CallSchedule/api/v1/schedules/${scheduleId}`, JSON.stringify(data), config),
    updateScheduleCallLessons: (data, scheduleId, lessonId) => axios.put(`CallSchedule/api/v1/schedules/${scheduleId}/lessons/${lessonId}`, JSON.stringify(data), config),
    deleteScheduleCallLessons: (scheduleId, lessonId) => axios.delete(`CallSchedule/api/v1/schedules/${scheduleId}/lessons/${lessonId}`, {
        params: {
            token: Cookies.get("auth-token")
        }
    }),
    sendScheduleCallLessons: (data, scheduleId) => axios.post(`CallSchedule/api/v1/schedules/${scheduleId}/lessons`, JSON.stringify(data), config),
    getBuilding: () => axios.get(`CallSchedule/api/v1/buildings`, {params: {token: Cookies.get("auth-token")}}),
    sendBuilding: (data) => axios.post(`CallSchedule/api/v1/buildings`, JSON.stringify(data), config),
    deleteBuilding: (buildId) => axios.delete(`CallSchedule/api/v1/buildings/${buildId}`, {
        params: {
            token: Cookies.get("auth-token")
        }
    }),
    updateBuilding: (data, buildId) => axios.put(`CallSchedule/api/v1/buildings/${buildId}`, JSON.stringify(data), config),
};

export default endpoints;
