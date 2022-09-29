import {Navigate, useLocation} from "react-router-dom";
import api from './../../../Services/api'
import {useState} from "react";
import Cookies from "js-cookie";

function PrivateRoute({children}) {
    const location = useLocation();
    const url = new URLSearchParams();
    const [redirect, setRedirect] = useState(false)
    url.set("redirect", location.pathname + location.search);

    setInterval(async () => {
        await api.auth.checkAuth().then(resp => {
                if (resp.status === 200) {
                    setRedirect(false)
                } else {
                    Cookies.remove("auth-token")
                    setRedirect(true)
                }
            }
        ).catch(resp => {
                Cookies.remove("auth-token")
                setRedirect(true)
            }
        )
    }, 50000);

    return !redirect ? (
        children
    ) : (
        <Navigate
            to={{
                pathname: "/login",
                search: url.toString(),
            }}
        />
    );
}

export default PrivateRoute;
