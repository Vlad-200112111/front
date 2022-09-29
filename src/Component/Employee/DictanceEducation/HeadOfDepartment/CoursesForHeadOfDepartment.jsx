import React, {useLayoutEffect} from 'react';
import {useEffect, useState} from "react";
import useStylesMain from "../../../../Styles/MainStyles";
import useStylesCourses from "../../../../Styles/CoursesStyles";
import {useThrottle} from "../../../../Hooks/useThrottle/useThrottle";
import api from "../../../../Services/api";
import {Grid, MenuItem, Typography} from "@material-ui/core";
import CircularProgress from "@mui/material/CircularProgress";
import CustomSelect from "../../../UI/CustomSelect/CustomSelect";
import CustomAlert from "../../../UI/CustomAlert/CustomAlert";
import ItemViewGrid from "../../../General/DictanceEducation/ItemViewGrid";

function CoursesForHeadOfDepartment(props) {
    const [view, setView] = useState('grid')
    const [sortBy, setSortBy] = useState('')
    const classesMain = useStylesMain()
    const classesCourses = useStylesCourses()
    const [token, setToken] = useState('')
    const [courses, setCourses] = useState([])
    const [grow, setGrow] = useState(true)
    const [listGroups, setListGroups] = useState([]);
    const [listDisciplines, setListDisciplines] = useState([]);
    const [open, setOpen] = useState(true)
    const [loading, setLoading] = useState(false)
    const [loadingSemesters, setLoadingSemesters] = useState(false)
    const [progress, setProgress] = useState(0)
    const updatedWidth = useThrottle(progress, 400)
    const [semesters, setSemesters] = useState([])
    const [employs, setEmploys] = useState([])
    const [chosenEmploy, setEmploy] = useState('');
    const [chosenGroup, setChosenGroup] = useState('');
    const [chosenSemester, setChosenSemester] = useState('')
    const [chosenDiscipline, setChosenDiscipline] = useState('')

    useEffect(async () => {
        setLoading(true)

        const {data: Employ} = await api.courses.getEmploy();
        setEmploys(Employ)
        setEmploy(Employ[0].userId)


        const {data: ListGroups} = await api.courses.getDisciplineEmployeeGroupZAV(Employ[0].userId);
        setListGroups(ListGroups)
        setChosenGroup(ListGroups[0].idGroup)

        const {data: Semesters} = await api.courses.getDisciplineEmployeeSemesterZAV(ListGroups[0].idGroup, Employ[0].userId)
        setSemesters(Semesters)
        setChosenSemester(Semesters[0].idSemestr)

        const {data: ListDisciplines} = await api.courses.getStudyLoadStudentZAV(ListGroups[0].idGroup, Semesters[0].idSemestr, Employ[0].userId)
        setListDisciplines(ListDisciplines)
        setChosenDiscipline(ListDisciplines[0].discipline)
        setLoading(false)
    }, [])

    const handleChangeView = (event, newValue) => {
        setView(newValue)
    }

    // const sortByKey = (key) => {
    //     courses.sort(function (a, b) {
    //         if (key === 'date') {
    //             let dateA = new Date(a.startdate), dateB = new Date(b.startdate)
    //             return dateA - dateB
    //         }
    //         let nameA = a[key].toLowerCase(), nameB = b[key].toLowerCase()
    //         if (nameA < nameB) //сортируем строки по возрастанию
    //             return -1
    //         if (nameA > nameB) return 1
    //         return 0 // Никакой сортировки
    //     })
    // }

    async function changeGroup(e) {
        setListDisciplines([])
        setChosenGroup(e.target.value)
        const {data: ListSemester} = await api.courses.getDisciplineEmployeeSemesterZAV(e.target.value, chosenEmploy)
        setSemesters(ListSemester)
    }

    async function changeSemester(e) {
        setListDisciplines([])
        setChosenSemester(e.target.value)
        const {data: ListDisciplines} = await api.courses.getStudyLoadStudentZAV(chosenGroup, e.target.value, chosenEmploy)
        setListDisciplines(ListDisciplines)
    }

    async function changeEmploy(e){
        setListDisciplines([])
        setEmploy(e.target.value)
        const {data: ListGroups} = await api.courses.getDisciplineEmployeeGroupZAV(e.target.value);
        setListGroups(ListGroups)
    }

    return (
        <Grid container spacing={3}>

            <Grid item xs={12}>
                <Typography className={classesMain.Title}>Курсы по кафедре</Typography>
                <CustomAlert
                    severity="info"
                    title='Информация!'
                    content='Сервис "Дистанционное обучение" находится в стадии разработки!'
                    activeAlert={true}
                />
            </Grid>

            <CustomSelect xs={4} contentCustomSelect="Преподаватель"
                          setValueSelect={changeEmploy}
                          valueSelect={chosenEmploy}
            >
                {
                    employs.map(item =>
                        <MenuItem className={classesMain.SelectItems}
                                  value={item.userId} key={item.userId}>{item.fio}</MenuItem>
                    )
                }
            </CustomSelect>
            <CustomSelect xs={4} contentCustomSelect="Группы"
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
            <CustomSelect xs={4} contentCustomSelect="Семестры"
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
            {!loading ?
                    listDisciplines?.map((item, index) =>
                        <Grid key={item.id} item xs={12} md={6} xl={4}>
                            <ItemViewGrid
                                headDepartment={true}
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

export default CoursesForHeadOfDepartment;