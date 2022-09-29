import axios from "../axiosForMoodle";
import Cookies from "js-cookie";

const config = {
    headers: {
        'Content-Type': 'application/json;charset=utf-8',
        'Accept': 'text/plain, */*',
        'mode': "cors",
        'Referrer-Policy': 'unsafe-url',
    },
};

const endpoints = {
    getYears: () => axios.get("local/working_program/api/getYearsList.php", config),
    getSpecialities: (year_id) => axios.get("local/working_program/api/getSpecialities.php", {params: {year_id: year_id}}),
    getProfiles: (year_id, speciality_id) => axios.get("local/working_program/api/getProfiles.php", {
        params: {
            year_id: year_id,
            speciality_id: speciality_id
        }
    }),
    getEducationalForms: (year_id, speciality_id, profile_id) => axios.get("local/working_program/api/getEducationalForms.php", {
        params: {
            year_id: year_id,
            speciality_id: speciality_id,
            profile_id: profile_id
        }
    }),
    getWorkPrograms: (year_id, speciality_id, profile_id, educational_form_id) => axios.get("local/working_program/api/getWorkingPrograms.php", {
        params: {
            year_id: year_id,
            speciality_id: speciality_id,
            profile_id: profile_id,
            educational_form_id: educational_form_id
        }
    }),
};

export default endpoints;
