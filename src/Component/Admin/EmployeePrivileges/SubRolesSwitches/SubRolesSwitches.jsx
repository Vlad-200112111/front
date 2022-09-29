import {Grid, TableCell} from "@mui/material";
import Typography from "@mui/material/Typography";
import CloseIcon from "@mui/icons-material/Close";
import CustomItemsMenu from "../../../UI/CustomItemsMenu/CustomItemsMenu";
import CustomSwitchButton from "../../../UI/CustomSwitchButton/CustomSwitchButton";
import React, {useEffect, useState, useReducer} from "react";
import useStylesMain from "../../../../Styles/MainStyles";
import api from "../../../../Services/api";
import Cookies from "js-cookie";
import CustomTable from "../../../UI/CustomTable/CustomTable";
import SortOutlinedIcon from "@mui/icons-material/SortOutlined";
import {TableRow} from "@material-ui/core";
import CustomAutocomplete from "../../../UI/CustomAutocomplete/CustomAutocomplete";
import CustomInput from "../../../UI/CustomInput/CustomInput";
import getSubrolesByUser from "../../../Modules/Functions/getSubrolesByUser";

const SubRolesSwitches = () =>{
    const classesMain = useStylesMain()
    const token = Cookies.get("auth-token");
    const [subrolesLinks, setSubrolesLinks] = useState([])
    const [subRoles,setSubRoles] = useState([{}])
    const [page, setPage] = useState(0)
    const [rowsPerPage, setRowsPerPage] = useState(subrolesLinks.length)
    const [chosenPage, setChosenPage] = useState('')
    const [option,setOption] = useState({subRole:'', links:[]})


    const myReducer = (prevState, action) => {
        let array;
        switch (action.type) {
            case 'create':
                array = [...prevState];
                array.filter(el=>el.idCRUDLinksForSubRole === action.payload.id)[0].create = !array.filter(el=>el.idCRUDLinksForSubRole === action.payload.id)[0].create;
                return array;
            case 'read':
                array = [...prevState];
                array.filter(el=>el.idCRUDLinksForSubRole === action.payload.id)[0].read = !array.filter(el=>el.idCRUDLinksForSubRole === action.payload.id)[0].read;
                return array;
            case 'update':
                array = [...prevState];
                array.filter(el=>el.idCRUDLinksForSubRole === action.payload.id)[0].update = !array.filter(el=>el.idCRUDLinksForSubRole === action.payload.id)[0].update;
                return array;
            case 'delete':
                array = [...prevState];
                array.filter(el=>el.idCRUDLinksForSubRole === action.payload.id)[0].delete = !array.filter(el=>el.idCRUDLinksForSubRole === action.payload.id)[0].delete;
                return array;
            case 'SET':
                array = [...action.payload];
                console.log(action.payload, 'pay')
                return array;
            case 'CLEAR':
                return prevState = [];
            default:
                break;
        }
    };
    const [chosenSubRolesLinks, setChosenSubRolesLinks] = useReducer(myReducer,[])
    useEffect(async()=>{
        const {data: SubRoles} = await api.auth.getSubroles()
        setSubRoles(SubRoles)
        let array = []
        for (const SubRole of SubRoles) {
            if(SubRole.name.length>1){
                const {data:links} = await api.auth.getLinksForSubrole(SubRole.name)
                array.push({subRole:SubRole.name,links:links.map(item=>({...item, subRole:SubRole}))})
            }
        }

        setSubrolesLinks(array)
        console.log(array)
        chooseSubRolesLinks(array[0])
    },[])
    const handleSwitch = async(link,subroleName, crud)=>{
        let object = {}
        object.token = token
        object.nameSubRole = link.subRole.name
        object.idLinkPage = link.linkPage.id
        object.create = crud === 'create'?!link.create:link.create
        object.read = crud === 'read'?!link.read:link.read
        object.update = crud === 'update'?!link.update:link.update
        object.delete = crud === 'delete'?!link.delete:link.delete
        await api.auth.postLinkForSubrole(object)
        setSubrolesLinks(subrolesLinks.map(element=>
            element.subRole.name === subroleName?
                {subRole:element.subRole, links: element.links.map(elem=>
                        link.id === elem.id?
                            crud === 'create'?
                                {...elem, create:!elem.create}
                                :
                                crud === 'update'?
                                    {...elem, update:!elem.update}
                                    :
                                    crud === 'read'?
                                        {...elem, read:!elem.read}
                                        :
                                        {...elem, delete:!elem.delete}
                            :elem
                    )}
                :element
        ))

    }
    const handleTableSwitch = async(link,subroleName, crud)=>{
        let object = {}
        console.log(link)
        console.log(chosenSubRolesLinks)
        object.token = token
        object.nameSubRole = link.subRole.name
        object.idLinkPage = link.idLinkPage
        object.create = crud === 'create'?!link.create:link.create
        object.read = crud === 'read'?!link.read:link.read
        object.update = crud === 'update'?!link.update:link.update
        object.delete = crud === 'delete'?!link.delete:link.delete
        await api.auth.postLinkForSubrole(object)
        setChosenSubRolesLinks({type:crud, payload:{id:link.idCRUDLinksForSubRole}})
        // setChosenSubRolesLinks(chosenSubRolesLinks.map(elem=>
        //                 link.idCRUDLinksForSubRole === elem.idCRUDLinksForSubRole?
        //                     crud === 'create'?
        //                         {...elem, create:!elem.create}
        //                         :
        //                         crud === 'update'?
        //                             {...elem, update:!elem.update}
        //                             :
        //                             crud === 'read'?
        //                                 {...elem, read:!elem.read}
        //                                 :
        //                                 {...elem, delete:!elem.delete}
        //                     :elem
        // ))

    }


    const chooseSubRolesLinks = (value)=>{
        setOption(value)
        setChosenSubRolesLinks({type:'SET', payload:value.links})
    }
    const searchByPage = (event)=>{
        setChosenPage(event.target.value)
        setChosenSubRolesLinks(subrolesLinks.filter(e=>e.subRole === chosenSubRolesLinks[0].subRole.name)[0].links.filter(el => el.namePage.includes(event.target.value)),'ss')
    }
    return(
        <Grid container>
            <Grid item xs={12}>
                <Typography variant={'h5'} className={classesMain.Title}>Привилегии субролей</Typography>
            </Grid>

            <Grid item xs={12}>
                <CustomAutocomplete
                    value={option}
                    label='Суброль'
                    options={subrolesLinks}
                    getOptionLabel={(option)=>option.subRole}
                    onChange={(e,value)=>chooseSubRolesLinks(value)}
                />
                <CustomInput
                    label={"Поиск страницы у суброли..."}
                    customValueInput={chosenPage}
                    setCustomValueInput={searchByPage}
                />
            </Grid>
            <Grid display={'flex'} flexDirection='row' flexWrap='wrap' justifyContent={'flex-start'} container spacing={1}>
                <CustomTable showFooter={false} page={page} setPage={setPage} rows={chosenSubRolesLinks} rowsPerPage={rowsPerPage}
                             setRowsPerPage={setRowsPerPage}>
                    {
                        <TableRow>
                            <TableCell>Группа</TableCell>
                            <TableCell>Страница</TableCell>
                            <TableCell>Создание</TableCell>
                            <TableCell>Просмотр</TableCell>
                            <TableCell>Редактирование</TableCell>
                            <TableCell>Удаление</TableCell>
                        </TableRow>

                    }
                    {
                        (rowsPerPage > 0 ? chosenSubRolesLinks.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage) : chosenSubRolesLinks).map((row) => (
                            <TableRow key={row}>
                                <TableCell className={classesMain.Text}>{row.nameGroupLinkPage}</TableCell>
                                <TableCell className={classesMain.Text}>{row.namePage}</TableCell>
                                <TableCell className={classesMain.Text}> <CustomSwitchButton checked={row.create} onChange={()=>handleTableSwitch(row,row.subRole.name, 'create')}  label='Создание'/></TableCell>
                                <TableCell className={classesMain.Text}> <CustomSwitchButton checked={row.read} onChange={()=>handleTableSwitch(row,row.subRole.name, 'read')}  label='просмотр'/></TableCell>
                                <TableCell className={classesMain.Text}><CustomSwitchButton checked={row.update} onChange={()=>handleTableSwitch(row,row.subRole.name, 'update')}  label='Редактирование'/></TableCell>
                                <TableCell className={classesMain.Text}><CustomSwitchButton checked={row.delete} onChange={()=>handleTableSwitch(row,row.subRole.name, 'delete')}  label='Удаление'/></TableCell>
                            </TableRow>
                            ))
                    }
                </CustomTable>
            </Grid>
        </Grid>
    )
}
export default SubRolesSwitches