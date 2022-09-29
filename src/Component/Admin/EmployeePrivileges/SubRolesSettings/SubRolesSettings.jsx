import {Grid} from "@mui/material";
import CustomSelect from "../../../UI/CustomSelect/CustomSelect";
import Typography from "@mui/material/Typography";
import React, {useContext, useEffect, useState} from "react";
import CustomSwitchButton from "../../../UI/CustomSwitchButton/CustomSwitchButton";
import {MenuItem, TableCell, TableRow} from "@material-ui/core";
import Button from "@mui/material/Button";
import useStylesMain from "../../../../Styles/MainStyles";
import CustomInput from "../../../UI/CustomInput/CustomInput";
import api from '../../../../Services/api'
import Cookies from "js-cookie";
import Divider from "@mui/material/Divider";
import CustomTable from "../../../UI/CustomTable/CustomTable";
import CustomAutocomplete from "../../../UI/CustomAutocomplete/CustomAutocomplete";
import getSubrolesByUser from "../../../Modules/Functions/getSubrolesByUser";

const SubRolesSettings = () => {


    const classesMain = useStylesMain()
    const [pages, setPages] = useState([{}])
    const token = Cookies.get("auth-token");
    const userId = Cookies.get("userId");
    const [chosenPage, setChosenPage] = useState('')
    const [chosenPageToBackend, setChosenPageToBackend] = useState('')
    const [chosenLinkToBackend, setChosenLinkToBackend] = useState('')
    const [chosenSubRole, setChosenSubRole] = useState('')
    const [chosenSubRoleForDelete, setChosenSubRoleForDelete] = useState('')
    const [subRoles, setSubRoles] = useState([{}])
    const [employees, setEmployees] = useState([])
    const [chosenEmployee, setChosenEmployee] = useState('')
    const [subroleToBackend, setSubroleToBackend] = useState('')
    const [chosenGroupToPages, setChosenGroupToPages] = useState('')
    const [page, setPage] = useState(0)
    const [pageToDelete, setPageToDelete] = useState('')
    const [rowsPerPage, setRowsPerPage] = useState(10)
    const [employeeSubRolesLinks, setemployeeSubRolesLinks] = useState([])
    const [option,setOption] = useState({userId: -1, name: '', lastname: '', patronymic: ''})
    const [groups, setGroups] = useState([])
    const [chosenGroup, setChosenGroup] = useState('')


    const addPageToBackend = async()=>{
        const object = {}
        object.token = token
        object.link = chosenLinkToBackend
        object.namePage = chosenPageToBackend
        object.idGroupPage = chosenGroup.id
        await api.auth.postPageLink(object)
    }

    useEffect(async () => {
        const {data:Groups} = await api.auth.getPagesGroup()
        setGroups(Groups)
        const {data: SubRoles} = await api.auth.getSubroles()
        setSubRoles(SubRoles)
        let array = await getSubrolesByUser()

        
        const {data:Pages} = await api.auth.getPagesLinks()
        setPages(Pages)
        const {data: Employees} = await api.auth.getEmployees()

        let tmpArray = [];

        function itemCheck(item) {
            if (tmpArray.indexOf(item.userId) === -1) {
                tmpArray.push(item.userId);
                return true
            }
            return false;
        }

        setEmployees(Employees.filter((item) => itemCheck(item)))
        setOption(Employees.filter(el=>el.userId===Number(userId))[0])

        const {data: EmployeeSuboles} = await api.auth.getUserSubroles(userId)
        setemployeeSubRolesLinks(EmployeeSuboles)

    }, [])
    const getSubrolesByEmployee = async(id)=>{
        const {data: EmployeeSuboles} = await api.auth.getUserSubroles(id)
        setemployeeSubRolesLinks(EmployeeSuboles)
    }
    const addSubroleToBackend = async () => {
        if (subroleToBackend.length > 1) {
            const object = {}
            object.token = token
            object.name = subroleToBackend
            await api.auth.postSubrole(object)
            setSubroleToBackend('')
        }

    }
    const removeSubrole = async () => {
        await api.auth.deleteSubrole(chosenSubRoleForDelete)
    }
    const addLinkForSubrole = async () => {
        const object = {}
        object.token = token
        object.nameSubRole = chosenSubRole
        object.idLinkPage = chosenPage
        object.create = create
        object.read = read
        object.update = update
        object.delete = del
        await api.auth.postLinkForSubrole(object)
        // const {data: links} = await api.auth.getLinksForSubroles()
    }
    const [create, setCreate] = useState(false)
    const [read, setRead] = useState(false)
    const [update, setUpdate] = useState(false)
    const [del, setDel] = useState(false)


    const addSubroleForUser = async () => {
        const object = {}
        object.token = token
        object.userId = chosenEmployee
        object.subRole = chosenSubroleForAddSubRole
        await api.auth.postUserSubrole(object)
    }
    const [chosenSubroleForAddSubRole, setChosenSubroleForAddSubRole] = useState('')
    const addGroup = async() =>{
        await api.auth.postPagesGroup({token:Cookies.get('auth-token'), name:chosenGroupToPages})
        setChosenGroupToPages('')
    }
    const deletePage = async()=>{
        await api.auth.deletePageLink(pageToDelete.idLinkPage)
        setPageToDelete('')
    }
    return (
        <Grid container>



            <Grid container mt={2} mb={2} display={'flex'} flexDirection={'row'}>

                <Grid item xs={5} flexDirection={'column'}>
                    <Grid item xs={6}>
                        <Typography variant='h5' className={classesMain.Text}>Создание суброли</Typography>
                    </Grid>

                    <Grid container spacing={3}>
                        <Grid item xs={5}>
                            <CustomInput
                                label='Суброль'
                                customValueInput={subroleToBackend}
                                setCustomValueInput={(e) => setSubroleToBackend(e.target.value)}
                            />
                        </Grid>
                        <Grid item>
                            <Button className={classesMain.button} onClick={addSubroleToBackend}>Добавить
                                суброль</Button>
                        </Grid>

                    </Grid>
                    <Grid item xs={6}>
                        <Typography variant='h5' className={classesMain.Text}>Удаление суброли</Typography>
                    </Grid>
                    <Grid container spacing={3}>
                        <Grid item xs={5}>
                            <CustomSelect
                                contentCustomSelect={'Суброль'}
                                valueSelect={chosenSubRoleForDelete}
                                setValueSelect={(e) => {
                                    setChosenSubRoleForDelete(e.target.value)
                                }}
                            >
                                {subRoles.map(item =>
                                    item.name !== 'Сотрудник вуза' ?
                                        <MenuItem
                                            key={item.id + 'employeeSubrolesSettingsdelete' + Math.random(1000, 1500)}
                                            value={item.id}>
                                            <Typography style={{color: '#000'}}>{item.name}</Typography>
                                        </MenuItem>
                                        : ''
                                )

                                }
                            </CustomSelect>
                        </Grid>
                        <Grid item>
                            <Button className={classesMain.button} onClick={removeSubrole}>Удалить суброль</Button>
                        </Grid>

                    </Grid>
                </Grid>
                <Grid item style={{display: 'flex', justifyContent: 'center'}} xs={1}>

                    <Divider orientation="vertical" flexItem/>
                </Grid>
                <Grid item xs={5} flexDirection={'column'}>
                    <Grid item xs={12}>
                        <Typography variant='h5' className={classesMain.Text}>Добавление страницы для
                            суброли</Typography>
                    </Grid>

                    <Grid container spacing={3}>
                        <Grid item xs={6}>
                            <CustomSelect
                                contentCustomSelect={'Страница'}
                                valueSelect={chosenPage}
                                setValueSelect={(e) => setChosenPage(e.target.value)}
                            >
                                {pages?.map(item =>

                                    <MenuItem
                                        key={item.idLinkPage + 'pagesforSubrolesSettings'}
                                        value={item.idLinkPage}>
                                        <Typography style={{color: '#000'}}>{item.namePage}</Typography>
                                    </MenuItem>
                                )
                                }
                            </CustomSelect>
                        </Grid>
                        <Grid item xs={6}>
                            <CustomSelect
                                contentCustomSelect={'Суброль'}
                                valueSelect={chosenSubRole}
                                setValueSelect={(e) => {
                                    setChosenSubRole(e.target.value)
                                    console.log(chosenSubRole)
                                }}
                            >
                                {subRoles.map(item =>
                                    // item.name !== 'Сотрудник вуза' ?
                                        <MenuItem key={item.id + 'subrolesForSubrolesSettings'}
                                                  value={item.name}>
                                            <Typography style={{color: '#000'}}>{item.name}</Typography>
                                        </MenuItem>
                                        // : ''
                                )
                                }
                            </CustomSelect>
                        </Grid>

                        <Grid item xs={12}>
                            <CustomSwitchButton checked={create} onChange={() => setCreate(!create)} label='Создание'/>
                            <CustomSwitchButton checked={read} onChange={() => setRead(!read)} label='Просмотр'/>
                            <CustomSwitchButton checked={update} onChange={() => setUpdate(!update)}
                                                label='Редактирование'/>
                            <CustomSwitchButton checked={del} onChange={() => setDel(!del)} label='Удаление'/>
                        </Grid>
                        <Grid style={{display: 'flex', justifyContent: 'flex-end'}} item xs={12}>
                            <Button className={classesMain.button} onClick={addLinkForSubrole}>Добавить</Button>
                        </Grid>

                    </Grid>
                    <Grid mt={3} container spacing={3}>
                        <Grid item xs={12}>
                            <Typography className={classesMain.Text} variant='h5'>Добавление страницы</Typography>
                        </Grid>
                        <Grid item xs={6}>
                            <CustomInput
                                customValueInput={chosenPageToBackend}
                                setCustomValueInput={(e)=>setChosenPageToBackend(e.target.value)}
                                label={'Название страницы'}
                            />

                        </Grid>
                        <Grid item xs={6}>
                            <CustomInput
                                customValueInput={chosenLinkToBackend}
                                setCustomValueInput={(e)=>setChosenLinkToBackend(e.target.value)}
                                label={'Ссылка'}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <CustomAutocomplete
                                options={groups}
                                label={'Группа'}
                                getOptionLabel={option=>option.name}
                                onChange={(event,value)=>setChosenGroup(value)}
                            />
                        </Grid>
                        <Grid item xs={12} style={{display: 'flex', justifyContent: 'flex-end'}}>
                            <Button className={classesMain.button} onClick={addPageToBackend}>Добавить</Button>
                        </Grid>
                    </Grid>
                    <Grid mt={3} container spacing={3}>
                        <Grid item xs={12}>
                            <Typography className={classesMain.Text} variant='h5'>Добавление группы</Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <CustomInput
                                customValueInput={chosenGroupToPages}
                                setCustomValueInput={(e)=>setChosenGroupToPages(e.target.value)}
                                label={'Название группы'}
                            />

                        </Grid>
                        
                        <Grid item xs={12} style={{display: 'flex', justifyContent: 'flex-end'}}>
                            <Button className={classesMain.button} onClick={addGroup}>Добавить</Button>
                        </Grid>
                    </Grid>
                    <Grid mt={3} container spacing={3}>
                        <Grid item xs={12}>
                            <Typography className={classesMain.Text} variant='h5'>Удаление страницы</Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <CustomAutocomplete
                                label={'Страница'}
                                options={pages}
                                getOptionLabel={option=>option.namePage}
                                onChange={(event,value)=>setPageToDelete(value)}
                            />

                        </Grid>

                        <Grid item xs={12} style={{display: 'flex', justifyContent: 'flex-end'}}>
                            <Button className={classesMain.button} onClick={deletePage}>Удалить</Button>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
            <Grid container>
                <Grid item xs={12}
                >
                    <Divider/>
                </Grid>
            </Grid>
            <Grid container spacing={3}>
                <Grid item xs={6}>
                    <Grid item xs={12}>
                        <Typography variant='h5' className={classesMain.Text}>Выдать суброль</Typography>
                        <Grid container spacing={3}>
                            <Grid item xs={6}>
                                <CustomSelect
                                    contentCustomSelect={'Сотрудник'}
                                    valueSelect={chosenEmployee}
                                    setValueSelect={(e) => {
                                        setChosenEmployee(e.target.value)
                                    }}
                                >
                                    {employees.map(item =>

                                        <MenuItem key={item.id + 'emp' + Math.random(0, 1000)}
                                                  value={item.userId}>
                                            <Typography
                                                style={{color: '#000'}}>{`${item.lastname} ${item.name} ${item.patronymic}`}</Typography>
                                        </MenuItem>
                                    )
                                    }
                                </CustomSelect>
                            </Grid>
                            <Grid item xs={6}>
                                <CustomSelect
                                    contentCustomSelect={'Суброль'}
                                    valueSelect={chosenSubroleForAddSubRole}
                                    setValueSelect={(e) => {
                                        console.log(chosenSubroleForAddSubRole)
                                        setChosenSubroleForAddSubRole(e.target.value)
                                    }}
                                >
                                    {subRoles.map(item =>
                                        <MenuItem key={item.id + 'sub'}
                                                  value={item.name}>
                                            <Typography style={{color: '#000'}}>{item.name}</Typography>
                                        </MenuItem>
                                    )
                                    }
                                </CustomSelect>
                            </Grid>
                            <Grid item xs={4}>
                                <Button className={classesMain.button} onClick={addSubroleForUser}>Добавить</Button>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>

                <Grid item xs={12}
                >
                    <Divider/>
                </Grid>

                <Grid container>
                    <Grid item xs={12}>
                        <Typography variant='h5' className={classesMain.Text}>Саброли сотрудника</Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <CustomAutocomplete
                            value={option}
                            label='Суброль'
                            options={employees}
                            getOptionLabel={(option)=>option.name + ' ' + option.lastname + ' ' + option.patronymic}
                            onChange={(e,value)=>getSubrolesByEmployee(value.userId)}
                        />
                    </Grid>
                    <Grid item xs={12}>

                        <CustomTable page={page} setPage={setPage} rows={employeeSubRolesLinks} rowsPerPage={rowsPerPage}
                                     setRowsPerPage={setRowsPerPage}>
                            {
                                <TableRow>
                                    <TableCell>Саброль</TableCell>
                                </TableRow>

                            }
                            {
                                (rowsPerPage > 0 ? employeeSubRolesLinks.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage) : employeeSubRolesLinks).map((row) => (
                                    <TableRow key={row}>
                                        <TableCell className={classesMain.Text}>{row.subRole.name}</TableCell>

                                    </TableRow>
                                ))
                            }
                        </CustomTable>
                    </Grid>
                </Grid>


            </Grid>

        </Grid>
    )
}
export default SubRolesSettings