import Cookies from "js-cookie";
import {useMemo} from "react";
import getSubrolesByUser from "./getSubrolesByUser";
import {useNavigate} from "react-router-dom";

const CRUD = async (
    role,
    namePage,
    urlId,
    idToCheck,
    roleUrlId,
    setCanCreate,
    setCanRead,
    setCanUpdate,
    setCanDelete) => {

    let canRead = false
    const Subroles = await getSubrolesByUser()

    setCanUpdate(false)
    setCanDelete(false)
    setCanCreate(false)
    setCanRead(false)
    if(role === 'Администратор'){
        setCanCreate(true)
        setCanRead(true)
        setCanUpdate(true)
        setCanDelete(true)
        canRead = true
        return canRead
    }
    if (Number(urlId) === Number(idToCheck) && role === roleUrlId) {
        setCanUpdate(true)
        setCanDelete(true)
        setCanCreate(true)
        setCanRead(true)
        canRead = true
    } else if (role === 'Студент' && (Number(urlId) !== Number(idToCheck) || role !== roleUrlId)) {
        setCanRead(true)
        setCanUpdate(false)
        setCanDelete(false)
        setCanCreate(false)
        canRead = true
    } else if ((role === 'Сотрудник' && (Number(urlId) !== Number(idToCheck) || role !== roleUrlId))) {
           // if(namePage === 'Портфолио'){
           //     setCanUpdate(true)
           //     setCanDelete(true)
           //     setCanCreate(true)
           //     setCanRead(true)
           // }
           // else if (namePage === 'Профиль студента'){
           //     setCanUpdate(true)
           //     setCanDelete(true)
           //     setCanCreate(true)
           //     setCanRead(true)
           // }else{
           //     setCanRead(true)
           //     setCanUpdate(false)
           //     setCanDelete(false)
           //     setCanCreate(false)
           // }
        for (const subroleElement of Subroles) {
            for (const link of subroleElement.links) {

                if (link.namePage === namePage) {

                    if (link.create === true) {
                        setCanCreate(link.create)
                    }
                    if (link.update === true) {
                        setCanUpdate(link.update)
                    }
                    if (link.delete === true) {
                        setCanDelete(link.delete)
                    }
                    if (link.read === true) {
                        setCanRead(link.read)
                        canRead = true
                    }
                }
            }
        }
    }
    else {
        setCanCreate(false)
        setCanRead(false)
        setCanUpdate(false)
        setCanDelete(false)
    }

    return canRead
    
}
export default CRUD