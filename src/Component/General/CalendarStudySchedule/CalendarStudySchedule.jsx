import React, {useEffect, useState} from 'react';
import {Button, Grid, Stack} from "@mui/material";
import {Link, useParams} from "react-router-dom";
import useStylesMain from "../../../Styles/MainStyles";
import Typography from "@mui/material/Typography";
import api from "../../../Services/api";
import Cookies from "js-cookie";
import CustomAlert from "../../UI/CustomAlert/CustomAlert";
import CustomAutocomplete from "../../UI/CustomAutocomplete/CustomAutocomplete";
import CloseIcon from "@mui/icons-material/Close";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Radio from "@mui/material/Radio";
import NotEditableCalendarStudySchedule from "./NotEditableCalendarStudySchedule";
import {IconButton} from "@material-ui/core";
import EditIcon from '@mui/icons-material/Edit';
import CheckIcon from "@mui/icons-material/Check";
import EditCalendarStudySchedule from "../../Employee/CalendarStudySchedule/EditCalendarStudySchedule";
import {useSnackbar} from "notistack";
import CircularProgress from "@mui/material/CircularProgress";
import loagingGif from '../../../Assets/Image/loading.gif'

import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import CRUD from "../../Modules/Functions/CRUD";

function CalendarStudySchedule(props) {
    const params = useParams()

    const classesMain = useStylesMain()
    const {enqueueSnackbar} = useSnackbar();

    const [role, setRole] = useState()
    const [years, setYears] = useState([])
    const [days, setDays] = useState([])
    const [weeks, setWeeks] = useState([])
    const [months, setMonths] = useState([])
    const [studyForms, setStudyForms] = useState([])
    const [specialities, setSpecialities] = useState([])
    const [chosenYear, setChosenYear] = useState()
    const [chosenSpeciality, setChosenSpeciality] = useState(specialities[0])
    const [chosenStudyForm, setChosenStudyForm] = useState([])
    const [calendarEmployee, setCalendarEmployee] = useState([])
    const [groupsToDel, setGroupsToDel] = useState([])
    const [calendarStudent, setCalendarStudent] = useState([])
    const [showEdit, setShowEdit] = useState(false)
    const [loadingToBack, setLoadingToBack] = useState(false)
    const [groups, setGroups] = useState()
    const [marks, setMarks] = useState([])
    const [chosenMark, setChosenMark] = useState()
    const [canUpdate, setCanUpdate] = useState(false)
    const [canCreate, setCanCreate] = useState(false)
    const [canDelete, setCanDelete] = useState(false)
    const [canRead, setCanRead] = useState(false)

    const getRole = async () => {
        const {data: result} = await api.auth.getAssigningRole({token: Cookies.get('auth-token')})
        const {data: MyStuffId} = await api.staff.getStuffId()

        CRUD(result.role, 'Календарный учебный график', MyStuffId.employeeId-1, MyStuffId.employeeId,'Сотрудник', setCanCreate, setCanRead, setCanUpdate, setCanDelete)
        return result.role
    }
    useEffect(async () => {

        const {data: Years} = await api.educationalProcess.getCalendarStudyScheduleYaers()
        setYears(Years)

        const {data: StudyForms} = await api.educationalProcess.getCalendarStudyStudyForms()
        setStudyForms(StudyForms)

    }, [])

    useEffect(async () => {
        getRole().then(async Role => {
            setRole(Role)
            const {data: Years} = await api.educationalProcess.getCalendarStudyScheduleYaers()
            setYears(Years)
            if (Role === 'Сотрудник') {
                const {data: StudyForms} = await api.educationalProcess.getCalendarStudyStudyForms()
                setStudyForms(StudyForms)
                const {data: Marks} = await api.educationalProcess.getCalendarStudyMarks()
                setMarks(Marks)
                setChosenMark(Marks[0].name)
                const {data: Groups} = await api.educationalProcess.getCalendarStudyGroups(chosenYear?.idYearStart, chosenYear?.idYearEnd, chosenStudyForm?.idStudyForm, chosenSpeciality?.idSpeciality)
                setGroups(Groups)
            }
            if (Role === 'Студент') {
                const {data: Groups} = await api.educationalProcess.getListGroups()
                setGroups(Groups)
                const {data: Marks} = await api.educationalProcess.getCalendarStudyMarks()
                setMarks(Marks)
            }
        })

    }, [chosenYear,chosenStudyForm,chosenSpeciality])

    function getWeeksInMonth(year, month) {
        const weeks = [],
            firstDate = new Date(year, month, 0),
            lastDate = new Date(year, month + 1, 0),
            numDays = lastDate.getDate();

        let dayOfWeekCounter = firstDate.getDay();

        for (let date = 1; date <= numDays; date++) {
            if (dayOfWeekCounter === 0 || weeks.length === 0) {
                weeks.push([]);
            }
            weeks[weeks.length - 1].push(date);
            dayOfWeekCounter = (dayOfWeekCounter + 1) % 7;
        }
        return weeks
            .filter((w) => !!w.length)
            .map((w) => ({
                start: w[0],
                end: w[w.length - 1],
                dates: w,
            }));


    }

    const changeMark = (event) => {
        setChosenMark(event.target.value)
    }

    const getDaysOfMonthsAndYears = (months) => {

        let array = []
        for (const el of months) {
            array.push(getWeeksInMonth(el.year, el.id - 1))

        }
        for (let i = 0; i < array.length - 1; i++) {
            if (array[i][array[i].length - 1].dates.length < 7) {
                array[i + 1][0].dates = [...array[i][array[i].length - 1].dates, ...array[i + 1][0].dates]
                array[i + 1][0].start = array[i + 1][0].dates[0]
                array[i + 1][0].end = array[i + 1][0].dates[array[i + 1][0].dates.length - 1]
                array[i].splice(array[i].length - 1)
            }
        }
        return array
    }


    const getWeeksOfDays = (days) => {
        let weeks = []
        let counter = 0;
        for (let i = 0; i <= days.length - 1; i++) {
            let weekspermonth = []
            for (let j = 0; j <= days[i].length - 1; j++) {
                counter += 1
                if (j === days[i].length - 1) {
                    weekspermonth.push(counter)
                    weeks.push(weekspermonth)
                    weekspermonth = []
                }
                weekspermonth.push(counter)

            }


        }
        return weeks
    }
    const chooseYear = async (year) => {
        const Month =
            [
                {id: 9, name: 'сентябрь', year: Number(year.nameYear.slice(0, 4))},
                {id: 10, name: 'октябрь', year: Number(year.nameYear.slice(0, 4))},
                {id: 11, name: 'ноябрь', year: Number(year.nameYear.slice(0, 4))},
                {id: 12, name: 'декабрь', year: Number(year.nameYear.slice(0, 4))},
                {id: 1, name: 'январь', year: Number(year.nameYear.slice(7, 11))},
                {id: 2, name: 'февраль', year: Number(year.nameYear.slice(7, 11))},
                {id: 3, name: 'март', year: Number(year.nameYear.slice(7, 11))},
                {id: 4, name: 'апрель', year: Number(year.nameYear.slice(7, 11))},
                {id: 5, name: 'май', year: Number(year.nameYear.slice(7, 11))},
                {id: 6, name: 'июнь', year: Number(year.nameYear.slice(7, 11))},
                {id: 7, name: 'июль', year: Number(year.nameYear.slice(7, 11))},
                {id: 8, name: 'август', year: Number(year.nameYear.slice(7, 11))}
            ]

        setMonths(Month)
        let Days = getDaysOfMonthsAndYears(Month)
        setDays(Days)
        setWeeks(getWeeksOfDays(Days))
        if (role === 'Сотрудник') {
            if (chosenStudyForm) {
                const {data: Specialities} = await api.educationalProcess.getCalendarStudySpeciality(year.idYearStart, year.idYearEnd, chosenStudyForm.idStudyForm)
                setSpecialities(Specialities)
                setChosenSpeciality(Specialities[0])
            }


            setChosenSpeciality()
        } else if (role === 'Студент') {
            const {data: Calendar} = await api.educationalProcess.getCalendarStudyStudent(year.idYearStart, year.idYearEnd, groups[0].idGroup)
            setCalendarStudent(Calendar)
        }
        setChosenYear(year)

    }
    const chooseStudyForm = async (studyForm) => {
        const {data: Specialities} = await api.educationalProcess.getCalendarStudySpeciality(chosenYear.idYearStart, chosenYear.idYearEnd, studyForm.idStudyForm)
        setSpecialities(Specialities)
        setChosenSpeciality()

        setChosenStudyForm(studyForm)
    }
    const chooseSpeciality = async (speciality) => {
        const {data: Calendar} = await api.educationalProcess.getCalendarStudyEmployee(chosenYear.idYearStart, chosenYear.idYearEnd, chosenStudyForm.idStudyForm, speciality.idSpeciality)
        setCalendarEmployee(Calendar)
        setChosenSpeciality(speciality)

    }
    const chooseGroup = async (Group) => {
        const {data: Calendar} = await api.educationalProcess.getCalendarStudyStudent(chosenYear.idYearStart, chosenYear.idYearEnd, Group.idGroup)
        setCalendarStudent(Calendar)
    }
    const editCalendar = async () =>{
        setShowEdit(true)
        if(showEdit){
            setLoadingToBack(true)
            let array = []
            for (let i = 0; i <= calendarEmployee.length-1 ; i++) {
                 let obj = {
                     token: Cookies.get('auth-token'),
                     idCalendarSchedule:calendarEmployee[i].idCalendar,
                     CellValues:calendarEmployee[i].cellValues
                 }
                 array.push(obj)
            }
            for (let i = 0; i <= groupsToDel.length-1 ; i++) {
                await api.educationalProcess.deleteCalendarStudyById(groupsToDel[i].idCalendar)
            }
            await api.educationalProcess.editCalendarStudyById(array).then(() => {
                setLoadingToBack(false)
                enqueueSnackbar('Данные сохранены', {variant: 'info'})
                setShowEdit(false)
                setGroupsToDel([])

            })
        }
    }
    return (
        <Grid container spacing={3}>
            <Grid item xs={12}>
                <Typography className={classesMain.Title}>Календарный учебный график</Typography>
            </Grid>
            <Grid item xs={12}>
                <CustomAlert
                    severity="info"
                    title='Информация!'
                    content='Сервис "Календарный учебный график" находится на стадии разработки!'
                    activeAlert={true}
                />
            </Grid>
            {
                role === 'Сотрудник' ?
                    <Box
                sx={{
                width: '90%', typography: 'body1', ml: 'auto', mr: 'auto'
            }}>
                        <Grid item xs={12} style={{display:'flex', flexDirection:'column', justifyContent:'space-around', height:'200px'}}>
                            <CustomAutocomplete
                                width={'40%'}
                                label={'Год'}
                                options={years}
                                getOptionLabel={option => option.nameYear}
                                onChange={(event, value) => chooseYear(value)}
                            />
                            {
                                chosenYear ?
                                    <CustomAutocomplete
                                        label={'Форма обучения'}
                                        width={'40%'}
                                        options={studyForms}
                                        getOptionLabel={option => option.nameStudyForm}
                                        onChange={(event, value) => chooseStudyForm(value)}
                                    />
                                    : ''
                            }
                            {
                                specialities.length > 0 ?
                                    <CustomAutocomplete
                                        value={chosenSpeciality}
                                        label={'Направленность'}
                                        width={'40%'}
                                        options={specialities}
                                        getOptionLabel={option => option.nameSpeciality}
                                        onChange={(event, value) => chooseSpeciality(value)}
                                    />
                                    : ''
                            }


                        </Grid>
                        <Grid item xs={12}>
                            <Typography className={classesMain.Title}>
                                {chosenSpeciality ? chosenSpeciality.nameFaculty : ''}
                            </Typography>
                        </Grid>
                        <>

                            {
                                chosenSpeciality ?
                                    <>
                                        {canUpdate?
                                            !loadingToBack?
                                                <Grid item xs={12} display={'flex'} justifyContent={'end'}>
                                                    <div onClick={editCalendar}
                                                         style={{
                                                             display: 'flex', alignItems: 'center', cursor: 'pointer'
                                                         }}>

                                                        <Typography className={classesMain.Text}>
                                                            {!showEdit?'Редактировать':'Сохранить'}
                                                        </Typography>
                                                        <IconButton className={classesMain.Text}>
                                                            {!showEdit? <EditIcon/>:<CheckIcon/>}
                                                        </IconButton>
                                                    </div>

                                                </Grid>
                                                :''
                                            :''
                                        }
                                        {
                                            !showEdit?
                                                <NotEditableCalendarStudySchedule
                                                    role={role}
                                                    months={months}
                                                    days={days}
                                                    weeks={weeks}
                                                    chosenYear={chosenYear}
                                                    calendar={calendarEmployee}
                                                    chosenSpeciality={chosenSpeciality}
                                                />
                                                :
                                                <>
                                                    {
                                                        !loadingToBack?
                                                            <>
                                                                <EditCalendarStudySchedule
                                                                    groups={groups}
                                                                    setGroups={setGroups}
                                                                    months={months}
                                                                    days={days}
                                                                    groupsToDel={groupsToDel}
                                                                    setGroupsToDel={setGroupsToDel}
                                                                    chosenMark={chosenMark}
                                                                    marks={marks}
                                                                    calendarArray={calendarEmployee}
                                                                    setCalendarArray={setCalendarEmployee}
                                                                    weeks={weeks}
                                                                    chosenSpeciality={chosenSpeciality}
                                                                />
                                                                <Grid item xs={12} display={'flex'} alignItems={'center'}>
                                                                    <FormControl>
                                                                        <FormLabel id="demo-row-radio-buttons-group-label">Отметка</FormLabel>
                                                                        <RadioGroup
                                                                            row
                                                                            aria-labelledby="demo-row-radio-buttons-group-label"
                                                                            name="row-radio-buttons-group"
                                                                            value={chosenMark}
                                                                            onChange={changeMark}
                                                                        >
                                                                            {
                                                                                marks.map(item =>
                                                                                    <FormControlLabel value={item.name} control={<Radio/>}
                                                                                                      label={`${item.description} - "${item.name}"`}/>
                                                                                )
                                                                            }

                                                                        </RadioGroup>
                                                                    </FormControl>

                                                                </Grid>

                                                            </>
                                                            :
                                                            <Grid item xs={12} display={'flex'} justifyContent={'center'} alignItems={'center'}
                                                                  flexDirection={'column'}>
                                                                <Typography variant={'h6'} className={classesMain.Text} style={{margin: '10px'}}>
                                                                    Идёт загрузка данных. Пожалуйста, не покидайте страницу
                                                                </Typography>
                                                                <img src={loagingGif} alt=""/>
                                                            </Grid>
                                                    }

                                                </>
                                            

                                        }

                                                

                                    </>

                                    : ''

                            }
                        </>
                        {canCreate?
                            !showEdit?
                                <Grid item xs={12} display={'flex'} justifyContent={'end'}>
                                    <Link style={{textDecoration: 'none'}} to={'/create-general-schedule'}>
                                        <Button className={classesMain.button}>
                                            Создать
                                        </Button>
                                    </Link>
                                </Grid>
                                :''
                            :''
                        }

                    </Box>

                    :
                    role === 'Студент' ?
                        <>
                            <Grid item xs={12}>
                                <CustomAutocomplete
                                    width={'40%'}
                                    label={'Год'}
                                    options={years}
                                    getOptionLabel={option => option.nameYear}
                                    onChange={(event, value) => chooseYear(value)}
                                />
                                {
                                    groups?.length > 1 ?
                                        <CustomAutocomplete
                                            width={'40%'}
                                            label={'Группа'}
                                            options={groups}
                                            getOptionLabel={option => option.groupName}
                                            onChange={(event, value) => chooseGroup(value)}
                                        />
                                        : ''
                                }
                            </Grid>
                            {
                                chosenYear ?
                                    <>
                                    <NotEditableCalendarStudySchedule
                                        months={months}
                                        days={days}
                                        weeks={weeks}
                                        calendar={calendarStudent}
                                        chosenSpeciality={chosenSpeciality}
                                    />
                                        <Grid item xs={12} >
                                            <FormLabel id="demo-row-radio-buttons-group-label">Отметка</FormLabel>
                                            <div style={{display:'flex', flexWrap:'wrap'}}>


                                                    {
                                                        marks?.map(item =>
                                                            <Typography style={{margin:'10px'}}>
                                                                {`${item.description} - `}" {item.name} "
                                                            </Typography>
                                                        )
                                                    }


                                            </div>

                                        </Grid>
                                    </>
                                    : ''
                            }

                        </>
                        : ''
            }

        </Grid>
    );
}

export default CalendarStudySchedule;