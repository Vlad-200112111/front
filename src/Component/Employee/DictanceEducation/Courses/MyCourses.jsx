import React, {useLayoutEffect} from 'react';
import {useEffect, useState} from "react";
import useStylesMain from "../../../../Styles/MainStyles";
import useStylesCourses from "../../../../Styles/CoursesStyles";
import {useThrottle} from "../../../../Hooks/useThrottle/useThrottle";
import api from "../../../../Services/api";
import {Grid, MenuItem, Typography} from "@material-ui/core";
import {ToggleButton, ToggleButtonGroup} from "@mui/material";
import ViewHeadlineIcon from "@mui/icons-material/ViewHeadline";
import GridViewIcon from "@mui/icons-material/GridView";
import CircularProgress from "@mui/material/CircularProgress";
import ItemViewGrid from "../../../General/DictanceEducation/ItemViewGrid";
import CustomSelect from "../../../UI/CustomSelect/CustomSelect";
import CustomAlert from "../../../UI/CustomAlert/CustomAlert";

function MyCourses(props) {
    const classesMain = useStylesMain()
    const classesCourses = useStylesCourses()
    const [token, setToken] = useState('')
    const [grow, setGrow] = useState(true)
    const [listGroups, setListGroups] = useState([]);
    const [listDisciplines, setListDisciplines] = useState([]);
    const [open, setOpen] = useState(true)
    const [loading, setLoading] = useState(false)
    const [semesters, setSemesters] = useState([])
    const [chosenGroup, setChosenGroup] = useState('');
    const [chosenSemester, setChosenSemester] = useState('')
    const [chosenDiscipline, setChosenDiscipline] = useState('')

    useEffect(async () => {
        setLoading(true)
        const {data: ListGroups} = await api.courses.getDisciplineEmployeeGroup();
        setListGroups(ListGroups)
        setChosenGroup(ListGroups[0].idGroup)

        const {data: Semesters} = await api.courses.getDisciplineEmployeeSemester(ListGroups[0].idGroup)
        setSemesters(Semesters)
        setChosenSemester(Semesters[0].idSemestr)

        const {data: ListDisciplines} = await api.courses.getDisciplineEmployee(ListGroups[0].idGroup, Semesters[0].idSemestr)
        setListDisciplines(ListDisciplines)
        setChosenDiscipline(ListDisciplines[0].discipline)
        setLoading(false)
    }, [])

    async function changeGroup(e) {
        setListDisciplines([])
        setChosenGroup(e.target.value)
        const {data: ListSemester} = await api.courses.getDisciplineEmployeeSemester(e.target.value)
        setSemesters(ListSemester)
    }

    async function changeSemester(e) {
        setListDisciplines([])
        setChosenSemester(e.target.value)
        const {data: ListDisciplines} = await api.courses.getDisciplineEmployee(chosenGroup, e.target.value)
        setListDisciplines(ListDisciplines)
    }

    return (
        <Grid container spacing={3}>

            <Grid item xs={12}>
                <Typography className={classesMain.Title}>Мои курсы</Typography>
                <CustomAlert
                    severity="info"
                    title='Информация!'
                    content='Сервис "Дистанционное обучение" находится в стадии разработки!'
                    activeAlert={true}
                />
            </Grid>
            <CustomSelect xs={6} contentCustomSelect="Группы"
                          setValueSelect={changeGroup}
                          valueSelect={chosenGroup}
            >
                {
                    listGroups.map(item =>
                        <MenuItem className={classesMain.SelectItems}
                                  value={item.idGroup} key={item.idGroup}>{item.nameGroup}</MenuItem>
                    )
                }
            </CustomSelect>
            <CustomSelect xs={6} contentCustomSelect="Семестры"
                          setValueSelect={changeSemester}
                          valueSelect={chosenSemester}
            >
                {
                    semesters.map(item =>
                        <MenuItem className={classesMain.SelectItems}
                                  value={item.idSemestr} key={item.idSemestr}>{item.nameSemestr}</MenuItem>
                    )
                }
            </CustomSelect>
            {
                !loading ?

                    listDisciplines?.map((item, index) =>
                        <Grid key={item.id} item xs={12} md={6} xl={4}>
                            <ItemViewGrid
                                create={true}
                                grow={grow}
                                timeout={index * 200}
                                Token={token}
                                key={item.name}
                                item={item}/>
                        </Grid>
                    )

                :
                <Grid style={{display: 'flex', justifyContent: 'center'}} item xs={12}>
                    <CircularProgress/>
                    {/*<img src={loadingimg} alt=""/>*/}
                </Grid>

            }

        </Grid>
    )
}

export default MyCourses;