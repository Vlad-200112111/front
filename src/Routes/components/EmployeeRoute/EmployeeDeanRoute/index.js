import {useLocation, useNavigate} from "react-router-dom";
import Cookies from "js-cookie";
import api from "./../../../../Services/api";
import {useEffect, useState} from "react";


function EmployeeDeanRoute(props) {
    const [result, setResult] = useState('')
    const navigate = useNavigate();

    useEffect(async ()=>{
        const object = new Object()
        object.token = Cookies.get("auth-token");
        const {data: Result} = await api.auth.getAssigningRole(object).catch(response => {
            if(response.status !== '200' || typeof (Cookies.get("auth-token")) === "undefined") {
                Cookies.remove("auth-token");
                Cookies.remove("userId");
                navigate('/login')
            }
        })
        setResult(Result)
    }, [])

    const location = useLocation();
    const url = new URLSearchParams();
    url.set("redirect", location.pathname + location.search);

    return result.role === 'Сотрудник' ? ( props.children
    ) : false;
}

export default EmployeeDeanRoute;
