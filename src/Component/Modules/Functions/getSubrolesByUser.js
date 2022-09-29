import api from "../../../Services/api";
import Cookies from "js-cookie";

const getSubrolesByUser = async() =>{
    const {data:SubRoles} = await api.auth.getUserSubroles()
    let array = []
    for (const SubRole of SubRoles) {
        const {data:links} = await api.auth.getLinksForSubrole(SubRole.subRole.name)
        array.push({subRole:SubRole.subRole.name,links:links.map(item=>({...item, subRole:SubRole.subRole}))})
    }
    return array
}
export default getSubrolesByUser