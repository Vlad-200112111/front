import axios from "./../axiosForMainSite/index";
const config = {
    headers: {

        'Content-Type': 'application/json;charset=utf-8',
        'Accept': '/*/'
    },
};
const endpoints = {
    getSchedule: (group, day) => axios.get(`modules/raspisanie/get_shedule.php`, {params: {group: group, day: day}}),
};

export default endpoints;
