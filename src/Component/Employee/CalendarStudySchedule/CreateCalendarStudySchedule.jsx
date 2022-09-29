import React, {useEffect, useState} from 'react';
import {Grid} from "@mui/material";
import Typography from "@mui/material/Typography";
import useStylesMain from "../../../Styles/MainStyles";
import api from '../../../Services/api';
import CustomAutocomplete from "../../UI/CustomAutocomplete/CustomAutocomplete";
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import AddIcon from "@mui/icons-material/Add";
import CloseIcon from "@mui/icons-material/Close";
import Button from "@mui/material/Button";
import Cookies from "js-cookie";
import {useNavigate} from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";
import loagingGif from '../../../Assets/Image/loading.gif'

import {useSnackbar} from "notistack";
import EditableCalendarStudySchedule from "./EditableCalendarStudySchedule";
import Box from "@mui/material/Box";

function CreateCalendarStudySchedule(props) {
    const classesMain = useStylesMain()
    const {enqueueSnackbar} = useSnackbar();

    const [years, setYears] = useState([])
    const [days, setDays] = useState([])
    const [weeks, setWeeks] = useState([])
    const [months, setMonths] = useState([])
    const [studyForms, setStudyForms] = useState([])
    const [specialities, setSpecialities] = useState([])
    const [groups, setGroups] = useState([])
    const [marks, setMarks] = useState([])
    const [chosenMark, setChosenMark] = useState()
    const [calendarArray, setCalendarArray] = useState([])
    const [loadingToBack, setLoadingToBack] = useState(false)
    const [chosenYear, setChosenYear] = useState()
    const [chosenSpeciality, setChosenSpeciality] = useState()
    const [chosenStudyForm, setChosenStudyForm] = useState()


    useEffect(async () => {
        const {data: Years} = await api.educationalProcess.getCalendarStudyScheduleYaers()
        setYears(Years)
        const {data: StudyForms} = await api.educationalProcess.getCalendarStudyStudyForms()
        setStudyForms(StudyForms)
        const {data: Marks} = await api.educationalProcess.getCalendarStudyMarks()
        setMarks(Marks)
        setChosenMark(Marks[0].name)
    }, [])


    const changeMark = (event) => {
        setChosenMark(event.target.value)
    }

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


    const getDaysOfMonthsAndYears = (months) => {
        let array = []
        for (const el of months) {
            console.log(el.year)
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
        if (chosenStudyForm) {
            const {data: Specialities} = await api.educationalProcess.getCalendarStudySpeciality(year.idYearStart, year.idYearEnd, chosenStudyForm.idStudyForm)
            setSpecialities(Specialities)
            setChosenSpeciality(Specialities[0])
        }
        setChosenYear(year)
        setChosenSpeciality()
    }


    const chooseStudyForm = async (studyForm) => {
        const {data: Specialities} = await api.educationalProcess.getCalendarStudySpeciality(chosenYear.idYearStart, chosenYear.idYearEnd, studyForm.idStudyForm)
        setSpecialities(Specialities)
        chooseSpeciality(Specialities[0])

        setChosenStudyForm(studyForm)
    }


    const chooseSpeciality = async (speciality) => {
        const {data: Groups} = await api.educationalProcess.getCalendarStudyGroups(chosenYear.idYearStart, chosenYear.idYearEnd, chosenStudyForm.idStudyForm, speciality.idSpeciality)
        setGroups(Groups)
        const d = Array.from({length: Groups.length}, () => Math.floor(Math.random() * 40))
        const weekstemp = Array.apply(null, {length: weeks[weeks.length - 1][weeks[weeks.length - 1].length - 1]}).map(Number.call, Number)
        setCalendarArray(Groups.map((item, index) =>
            index === index ?
                {
                    idGroup: item.idGroup, weeks: weekstemp.map(item =>
                        item == item ?
                            {id: item, content: 'Т', markId: 2} :
                            {id: item, content: 'Т', markId: 2}
                    )
                } : item
        ))
        setChosenSpeciality(speciality)
    }


    const saveFrom = async () => {
        setLoadingToBack(true)
        let array = []
        for (let i = 0; i <= calendarArray.length - 1; i++) {
            let obj = {
                token: Cookies.get('auth-token'),
                idStartYear: chosenYear.idYearStart,
                idEndYear: chosenYear.idYearEnd,
                idSpeciality: chosenSpeciality.idSpeciality,
                idStudyForm: chosenStudyForm.idStudyForm,
                idGroup: calendarArray[i].idGroup,
                cellValues: calendarArray[i].weeks.map((item, index) => ({
                    numberCell: index + 1,
                    idGraphNotation: item.markId
                }))
            }
            array.push(obj)
        }

        await api.educationalProcess.postCalendarStudy(array).then(() => {
            setLoadingToBack(false)
            enqueueSnackbar('Данные сохранены', {variant: 'info'})
        })

    }


    return (
        <Grid container spacing={3}>
            <>
                <Grid item xs={12}>
                    <Typography className={classesMain.Title}>
                        Создание календарного учебного графика
                    </Typography>
                </Grid>
                {
                    !loadingToBack ?
                        <Box
                            sx={{
                                width: '90%', typography: 'body1', ml: 'auto', mr: 'auto'
                            }}>

                            <Grid item xs={12} style={{display:'flex', flexDirection:'column', justifyContent:'space-around', height:'200px'}}>
                                <CustomAutocomplete
                                    value={chosenYear}
                                    width={'40%'}
                                    label={'Год'}
                                    options={years}
                                    getOptionLabel={option => option.nameYear}
                                    onChange={(event, value) => chooseYear(value)}
                                />
                                {
                                    chosenYear ?
                                        <CustomAutocomplete
                                            value={chosenStudyForm}
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
                                            label={'Направление ОП'}
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
                            {
                                chosenSpeciality ?
                                    <Grid item xs={12}>
                                        <Button onClick={saveFrom} className={classesMain.button}>
                                            Сохранить
                                        </Button>
                                    </Grid>
                                    : ''
                            }


                            {
                                chosenSpeciality ?
                                    <>
                                        <EditableCalendarStudySchedule
                                            groups={groups}
                                            setGroups={setGroups}
                                            months={months}
                                            days={days}
                                            weeks={weeks}
                                            calendarArray={calendarArray}
                                            setCalendarArray={setCalendarArray}
                                            chosenMark={chosenMark}
                                            marks={marks}
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
                                    : ''

                            }
                        </Box>
                        :
                        <>
                            :
                            <Grid item xs={12} display={'flex'} justifyContent={'center'} alignItems={'center'}
                                  flexDirection={'column'}>
                                <Typography variant={'h6'} className={classesMain.Text} style={{margin: '10px'}}>
                                    Идёт загрузка данных. Пожалуйста, не покидайте страницу
                                </Typography>
                                <img src={loagingGif} alt=""/>
                            </Grid>
                        </>
                }
            </>
        </Grid>
    );
}

export default CreateCalendarStudySchedule;