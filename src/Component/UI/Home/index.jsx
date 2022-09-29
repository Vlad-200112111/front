import {Grid, Typography} from "@material-ui/core";
import {useEffect, useState} from "react";
import Cookies from "js-cookie";
import useStylesHome from "../../../Styles/HomeStyles";
import background from '../../../Assets/Image/Home/background2.png'
import {Box, Button, Container, Slide, Stack, Zoom} from "@mui/material";
import React from "react";
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import useStylesMain from "../../../Styles/MainStyles";
import api from './../../../Services/api'
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import IconButton from "@mui/material/IconButton";
import Chip from "@mui/material/Chip";
import Collapse from "@mui/material/Collapse";
import Alert from "@mui/material/Alert";
import CloseIcon from "@mui/icons-material/Close";
import AlertTitle from "@mui/material/AlertTitle";
import ReactToPrint from "react-to-print";
import ScheduleCall from "./Schedule/ScheduleCall/ScheduleCall";

function Home() {
    const classesHome = useStylesHome();
    const classesMain = useStylesMain()
    const [alignment, setAlignment] = React.useState('web');
    const [listCallSchedule, setListCallSchedule] = useState([])
    const [listSchedule, setListSchedule] = useState([])
    const [weekday, setWeekday] = useState()
    const [allListSchedule, setAllListSchedule] = useState([])
    const [group, setGroup] = useState('')
    const [checked, setChecked] = useState(false);
    const [checkedCall, setCheckedCall] = useState(false);
    const [steps, setSteps] = useState(0)
    const [role, setRole] = useState('')
    const [openAlert, setOpenAlert] = useState(false)
    const [listGroups, setListGroups] = useState([])
    const [listCallScheduleVariant, setListCallScheduleVariant] = useState([])
    const [relativeBuildings, setRelativeBuildings] = useState([])
    const weekdays = [
        'Понедельник',
        'Вторник',
        'Среда',
        'Четверг',
        'Пятница',
        'Суббота'
    ]

    function getWeekDay() {
        const n = new Date().getDay()
        if (weekdays[n - 1] === 'Воскресенье') {
            setSteps(0)
            return 'Понедельник'
        } else {
            return n === 0 ? '' : weekdays[n - 1]
        }
    }

    useEffect(async () => {
        setCheckedCall(false)
        const {data: ListGroups} = await api.educationalProcess.getListGroups();
        setListGroups(ListGroups)
        setGroup(ListGroups[0].groupName)

        const {data: ListScheduleCall} = await api.scheduleCall.getScheduleCall()
        setListCallScheduleVariant(ListScheduleCall)
        setAlignment(0)
        setListCallSchedule(ListScheduleCall[0].lessons)
        const {data: RelativeBuildings} = await api.scheduleCall.getRelativeBuildings(ListScheduleCall[0].id)
        setRelativeBuildings(RelativeBuildings)
        setCheckedCall(true)
    }, [])

    useEffect(async () => {
            setWeekday(getWeekDay())
            setSteps(weekdays.indexOf(getWeekDay()))

            const {data: Result} = await api.auth.getAssigningRole({token: Cookies.get("auth-token")})
            setRole(Result.role)
            const {data: ListSchedule} = await api.schedule.getSchedule(group, getWeekDay());
            const array = [];
            Object.keys(ListSchedule).map((objectKey) => {
                array.push(ListSchedule[objectKey])
            })
            setListSchedule(array)
            let tempArray = {}
            for (const day of weekdays) {
                let array = []
                const {data: DayListSchedule} = await api.schedule.getSchedule(group, day);
                Object.keys(DayListSchedule).map((objectKey) => {
                    array.push(DayListSchedule[objectKey])
                })
                tempArray[day] = array
            }
            setAllListSchedule(tempArray)
            setChecked(true)
        }, [group]
    )
    

    const handleChange = async (event, newAlignment) => {
        if (newAlignment || newAlignment === 0) {
            setCheckedCall(false)
            setListCallSchedule(listCallScheduleVariant[newAlignment].lessons)
            setAlignment(newAlignment)
            const {data: RelativeBuildings} = await api.scheduleCall.getRelativeBuildings(listCallScheduleVariant[newAlignment].id)
            setRelativeBuildings(RelativeBuildings)
            setCheckedCall(true)
        }
    }

    async function nextSteps() {
        setChecked(false)
        setTimeout(() => {

            let day = steps < 5 ? weekdays[steps + 1] : weekdays[0]
            setWeekday(day)
            // console.log(allListSchedule, day)
            steps < 5 ? setSteps(steps + 1) : setSteps(0)

            // const {data: ListSchedule} = await api.schedule.getSchedule(group, day);
            // const array = [];
            // Object.keys(ListSchedule).map((objectKey) => {
            //     array.push(ListSchedule[objectKey])
            // })
            // setListSchedule(array)
            setListSchedule(allListSchedule[day])
            setChecked(true)
        }, 100)


    }

    async function beforeSteps() {
        setChecked(false)
        setTimeout(() => {
            let day = steps === 0 ? weekdays[5] : weekdays[steps - 1]
            setWeekday(day)
            steps === 0 ? setSteps(5) : setSteps(steps - 1)
            setListSchedule(allListSchedule[day])
            setChecked(true)

        }, 100)

        // const {data: ListSchedule} = await api.schedule.getSchedule(group, day)
        // const array = [];
        // Object.keys(ListSchedule).map((objectKey) => {
        //     array.push(ListSchedule[objectKey])
        // })
        // setListSchedule(array)
    }

    return (
        <>
            <div key={'homePage'} style={{height: 505, width: '100%'}}>
                <div className='HomeBack'
                     style={{
                         position: 'absolute',
                         top: '50px',
                         zIndex: 11,
                         backdropFilter: 'blur(2px)',
                         backgroundColor: 'rgba(0,0,0,.3)',
                         maxHeight: '530px'
                     }}
                >

                </div>
                <div
                    className="HomeBack"
                    style={{
                        top: '50px',
                        maxHeight: '530px',
                        backgroundPositionX: '20px',
                        backgroundImage: `url(${background})`,
                    }}
                >
                </div>
                <Grid container spacing={3}>
                    <Grid
                        style={{marginTop: '100px', zIndex: 12}}
                        sx={{
                            color: '#fff'
                        }}
                        item xs={6}>
                        <Typography
                            component='span'
                            style={{color: '#fff', zIndex: 12}}
                            variant="h2"
                            gutterBottom

                        >
                            Личный кабинет
                        </Typography>
                        <Typography variant='h5' style={{color: '#fff', maxWidth: '400px'}}>
                            Вся необходимая информация в одном месте!
                        </Typography>
                    </Grid>
                    <Grid
                        style={{marginTop: '100px', zIndex: 12, height: 400}}
                        sx={{
                            color: '#fff'
                        }}
                        item xs={3}>

                        <Box style={{
                            width: '100%',
                            height: '100%',
                            background: 'rgba(90, 125, 207, 0.8)',
                            padding: 15
                        }}>
                            <Typography variant="overline"
                                        display="block"
                                        gutterBottom
                                        style={{fontSize: 16, color: '#fff', margin: 0, lineHeight: '1.5'}}
                                        align={'center'}>
                                Ближайшие мероприятия жизни университета
                            </Typography>
                            <Box style={{margin: 10}}>
                                <Typography variant="body1"
                                            display="block"
                                            gutterBottom
                                            style={{color: '#fff'}}
                                            align={'center'}>
                                    В разработке!
                                </Typography>
                            </Box>
                        </Box>

                    </Grid>
                    <Grid
                        style={{marginTop: '100px', zIndex: 12, height: 400}}
                        sx={{
                            color: '#fff'
                        }}
                        item xs={3}>

                        <Box style={{
                            width: '100%',
                            height: '100%',
                            background: 'rgba(90, 125, 207, 0.8)',
                            padding: 15
                        }}>
                            <Typography variant="overline"
                                        display="block"
                                        gutterBottom
                                        style={{fontSize: 16, color: '#fff', margin: 0, lineHeight: '1.5'}}
                                        align={'center'}>
                                Культурная жизнь города
                            </Typography>
                            <Box style={{margin: 10}}>
                                <Typography variant="body1"
                                            display="block"
                                            gutterBottom
                                            style={{color: '#fff'}}
                                            align={'center'}>
                                    В разработке!
                                </Typography>
                            </Box>
                        </Box>

                    </Grid>
                </Grid>
            </div>

            {
                role === 'Студент' ?
                    <Box sx={{p: 3}}>
                        <Grid
                            container
                            direction="row"
                            justifyContent="space-around"
                            alignItems="flex-start"
                            spacing={3}
                        >
                            <Grid item xl={8} md={9} xs={12} style={{width: '100%'}}>
                                <Box>
                                    <Box style={{marginBottom: 10}}>
                                        <ToggleButtonGroup
                                            style={{width: '100%', borderRight: '2px solid #fff',
                                                borderLeft: '2px solid #fff'}}
                                            value={group}
                                            exclusive
                                            onChange={
                                                (event, newValue) => {
                                                    if (newValue) {
                                                        setGroup(newValue)
                                                    }
                                                }
                                            }
                                        >
                                            {
                                                listGroups?.map(group =>
                                                    <ToggleButton
                                                        key={group.groupName}
                                                        className={`${classesHome.toggleButton}`}
                                                        value={group.groupName}>
                                                        {group.groupName}
                                                    </ToggleButton>
                                                )
                                            }
                                        </ToggleButtonGroup>
                                    </Box>
                                    <Box style={{
                                        width: '100%',
                                        background: 'rgb(90,125,205)',
                                        padding: 10,
                                        marginBottom: 2,
                                        borderRight: '2px solid #fff',
                                        borderLeft: '2px solid #fff',
                                    }}>
                                        <Typography variant="overline"
                                                    display="block"
                                                    gutterBottom
                                                    style={{fontSize: 16, color: '#fff', margin: 0}}
                                                    align={'center'}>
                                            Расписание занятий
                                        </Typography>
                                    </Box>
                                    <Box style={{
                                        width: '100%',
                                        background: 'rgb(90,125,205)',
                                        padding: 10,
                                        borderRight: '2px solid #fff',
                                        borderLeft: '2px solid #fff',
                                    }}>
                                        <Grid
                                            container
                                            direction="row"
                                            justifyContent="space-between"
                                            alignItems="center"
                                        >
                                            <Grid item xs={2}>
                                                <IconButton
                                                    style={{background: 'rgb(255 152 69)', color: '#fff'}}
                                                    aria-label="close"
                                                    color="inherit"
                                                    size="small"
                                                    onClick={beforeSteps}
                                                >
                                                    {<NavigateBeforeIcon/>}
                                                </IconButton>
                                            </Grid>
                                            <Grid item>
                                                <Zoom in={checked}>
                                                    <Typography variant="overline"
                                                                display="block"
                                                                gutterBottom
                                                                style={{fontSize: 16, color: '#fff', margin: 0}}
                                                                align={'center'}>
                                                        {weekday}
                                                    </Typography>
                                                </Zoom>

                                            </Grid>
                                            <Grid item xs={2}>
                                                <IconButton
                                                    style={{
                                                        background: 'rgb(255 152 69)',
                                                        color: '#fff',
                                                        float: 'right'
                                                    }}
                                                    aria-label="close"
                                                    color="inherit"
                                                    size="small"
                                                    onClick={nextSteps}
                                                >
                                                    {<NavigateNextIcon/>}
                                                </IconButton>
                                            </Grid>
                                        </Grid>
                                    </Box>
                                    <Box style={{width: '100%'}}>


                                        <Zoom in={checked}>
                                            <table style={{width: '100%'}}>
                                                <tbody>
                                                {
                                                    listSchedule?.length === 0 ?
                                                        <tr>
                                                            <td colSpan="2" style={{height: 150, width: 100}}
                                                                className={classesHome.TableMainTd}>
                                                                <Typography variant="overline"
                                                                            display="block"
                                                                            gutterBottom
                                                                            style={{fontSize: 18}}
                                                                            align={'center'}>
                                                                    У Вас нет занятий в этот день!
                                                                </Typography>
                                                            </td>
                                                        </tr> :
                                                        <>
                                                            {
                                                                listSchedule?.map(item =>
                                                                    <React.Fragment key={item.number}>
                                                                        <tr>
                                                                            <td
                                                                                rowSpan={2}
                                                                                style={{height: 300, width: 100}}
                                                                                className={classesHome.TableMainTd}>
                                                                                <Typography variant="overline"
                                                                                            display="block"
                                                                                            gutterBottom
                                                                                            style={{fontSize: 14}}
                                                                                            align={'center'}>
                                                                                    {`${item.number} пара`}
                                                                                </Typography>
                                                                            </td>
                                                                            {
                                                                                item.upper === '' || item.upper.discipline === '' ? '' :
                                                                                    <td className={classesHome.TableTd}>
                                                                                        <Grid
                                                                                            container
                                                                                            direction="row"
                                                                                            justifyContent="space-between"
                                                                                            alignItems="flex-end"
                                                                                            style={{flexWrap: 'nowrap'}}
                                                                                        >
                                                                                            <Grid item>
                                                                                                <Typography
                                                                                                    variant="overline"
                                                                                                    display="block"
                                                                                                    gutterBottom
                                                                                                    style={{
                                                                                                        fontSize: 16,
                                                                                                        color: '#485C90'
                                                                                                    }}>
                                                                                                    {item.upper.discipline === '' ? '' : `${item.upper.discipline} - ${item.upper.type}`}
                                                                                                </Typography>
                                                                                                <Typography
                                                                                                    variant="overline"
                                                                                                    display="block"
                                                                                                    gutterBottom
                                                                                                    style={{
                                                                                                        fontSize: 12,
                                                                                                        color: '#485C90'
                                                                                                    }}>
                                                                                                    {item.upper.teacher === '' ? '' : `Преподаватель: ${item.upper.teacher}`}
                                                                                                </Typography>
                                                                                                <Typography
                                                                                                    variant="overline"
                                                                                                    display="block"
                                                                                                    gutterBottom
                                                                                                    style={{
                                                                                                        fontSize: 12,
                                                                                                        color: '#485C90'
                                                                                                    }}>
                                                                                                    {item.upper.cathedra === '' ? '' : `Кафедра: ${item.upper.cathedra}`}
                                                                                                </Typography>
                                                                                                <Typography
                                                                                                    variant="overline"
                                                                                                    display="block"
                                                                                                    gutterBottom
                                                                                                    style={{
                                                                                                        fontSize: 12,
                                                                                                        color: '#485C90'
                                                                                                    }}>
                                                                                                    {item.upper.cabinet === '' ? '' : `Кабинет: ${item.upper.cabinet}`}
                                                                                                </Typography>
                                                                                            </Grid>
                                                                                            <Grid item>
                                                                                                <Chip
                                                                                                    label="Верхняя неделя"
                                                                                                    style={{
                                                                                                        background: 'rgb(90,125,205)',
                                                                                                        color: '#fff'
                                                                                                    }}/>
                                                                                            </Grid>
                                                                                        </Grid>
                                                                                    </td>
                                                                            }

                                                                        </tr>
                                                                        <tr>
                                                                            {
                                                                                item.lower === '' || item.lower.discipline === '' ? '' :

                                                                                    <td className={classesHome.TableTd}>
                                                                                        <Grid
                                                                                            container
                                                                                            direction="row"
                                                                                            justifyContent="space-between"
                                                                                            alignItems="flex-end"
                                                                                            style={{flexWrap: 'nowrap'}}
                                                                                        >
                                                                                            <Grid item>
                                                                                                <Typography
                                                                                                    variant="overline"
                                                                                                    display="block"
                                                                                                    gutterBottom
                                                                                                    style={{
                                                                                                        fontSize: 16,
                                                                                                        color: '#485C90'
                                                                                                    }}>
                                                                                                    {item.lower.discipline === '' ? '' : `${item.lower.discipline} - ${item.lower.type}`}
                                                                                                </Typography>
                                                                                                <Typography
                                                                                                    variant="overline"
                                                                                                    display="block"
                                                                                                    gutterBottom
                                                                                                    style={{
                                                                                                        fontSize: 12,
                                                                                                        color: '#485C90'
                                                                                                    }}>
                                                                                                    {item.lower.teacher === '' ? '' : `Преподаватель: ${item.lower.teacher}`}
                                                                                                </Typography>
                                                                                                <Typography
                                                                                                    variant="overline"
                                                                                                    display="block"
                                                                                                    gutterBottom
                                                                                                    style={{
                                                                                                        fontSize: 12,
                                                                                                        color: '#485C90'
                                                                                                    }}>
                                                                                                    {item.lower.cathedra === '' ? '' : `Кафедра: ${item.lower.cathedra}`}
                                                                                                </Typography>
                                                                                                <Typography
                                                                                                    variant="overline"
                                                                                                    display="block"
                                                                                                    gutterBottom
                                                                                                    style={{
                                                                                                        fontSize: 12,
                                                                                                        color: '#485C90'
                                                                                                    }}>
                                                                                                    {item.lower.cabinet === '' ? '' : `Кабинет: ${item.lower.cabinet}`}
                                                                                                </Typography>
                                                                                            </Grid>
                                                                                            <Grid item>
                                                                                                <Chip
                                                                                                    label="Нижняя неделя"
                                                                                                    style={{
                                                                                                        background: 'rgb(90,125,205)',
                                                                                                        color: '#fff'
                                                                                                    }}/>
                                                                                            </Grid>
                                                                                        </Grid>
                                                                                    </td>
                                                                            }
                                                                        </tr>
                                                                    </React.Fragment>
                                                                )
                                                            }
                                                        </>
                                                }
                                                </tbody>
                                            </table>
                                        </Zoom>
                                    </Box>
                                </Box>
                            </Grid>

                            <Grid item xl={4} md={3} xs={12} style={{width: '100%'}}
                                  className={classesHome.Rings}>
                                <Box sx={{mb: 1}}>
                                    <ToggleButtonGroup
                                        style={{width: '100%', borderRight: '2px solid #fff',
                                            borderLeft: '2px solid #fff',}}
                                        value={alignment}
                                        exclusive
                                        onChange={handleChange}
                                    >
                                        {
                                            listCallScheduleVariant?.map((item, index) =>
                                                <ToggleButton
                                                    className={`${classesHome.toggleButton}`}
                                                    value={index}>
                                                    {item.name}
                                                </ToggleButton>
                                            )
                                        }
                                    </ToggleButtonGroup>
                                </Box>
                                <Zoom in={checkedCall}>
                                    <Box>
                                        <Box sx={{width: '100%'}}>
                                            <Collapse in={openAlert}>
                                                <Alert
                                                    severity="info"
                                                    action={
                                                        <IconButton
                                                            aria-label="close"
                                                            color="inherit"
                                                            size="small"
                                                            onClick={() => {
                                                                setOpenAlert(false);
                                                            }}
                                                        >
                                                            <CloseIcon fontSize="inherit"/>
                                                        </IconButton>
                                                    }
                                                    sx={{mb: 2}}
                                                >
                                                    <AlertTitle>Список корпусов привязанных к этому
                                                        расписанию:</AlertTitle>
                                                    <Stack spacing={0.1}>
                                                        {
                                                            relativeBuildings?.map((item, index) =>
                                                                <Typography variant="body1"
                                                                            gutterBottom
                                                                            style={{marginLeft: 20}}>
                                                                    {`${index + 1}) ${item.name}`}
                                                                </Typography>
                                                            )
                                                        }
                                                    </Stack>
                                                </Alert>
                                            </Collapse>
                                            {
                                                !openAlert ?
                                                    <Box
                                                        sx={{
                                                            background: 'rgb(90,125,205)',
                                                            width: '100%',
                                                            borderRadius: '0 !important',
                                                            cursor: 'pointer',
                                                            color: '#fff',
                                                            border: '2px solid #fff',
                                                            padding: 1,
                                                            textAlign: 'center',
                                                            // "&:hover": {
                                                            //     background: 'rgba(74,117,218,0.8)',
                                                            // }
                                                        }}
                                                        variant="contained"
                                                        onClick={() => {
                                                            setOpenAlert(true);
                                                        }}>
                                                        Отобразить список корпусов
                                                    </Box> : ''
                                            }
                                            <ReactToPrint
                                                trigger={() =>
                                                    <Box sx={{
                                                        background: 'rgb(90,125,205)',
                                                        width: '100%',
                                                        borderRadius: '0 !important',
                                                        cursor: 'pointer',
                                                        color: '#fff',
                                                        border: '2px solid #fff',
                                                        padding: 1,
                                                        textAlign: 'center',
                                                        // "&:hover": {
                                                        //     background: 'rgba(74,117,218,0.8)',
                                                        // }
                                                    }}
                                                         variant="contained">
                                                        Отобразить в PDF
                                                    </Box>
                                                }
                                                content={() => document.getElementById('htmlForPDF')}
                                            />
                                        </Box>
                                        <ScheduleCall listCallSchedule={listCallSchedule}/>
                                        <div style={{display: "none"}}>
                                            <div style={{padding: 40}} id='htmlForPDF'>
                                                <table style={{
                                                    width: '100%',
                                                    borderSpacing: 0,
                                                    border: '0.5px solid #000'
                                                    // borderCollapse: 'collapse'
                                                }}>
                                                    <tbody>
                                                    <tr>
                                                        <td colSpan="2" style={{border: '0.5px solid #000'}}>
                                                            <p align={'center'}>
                                                                Список корпусов
                                                            </p>
                                                        </td>
                                                    </tr>
                                                    {
                                                        relativeBuildings?.map((item, index) =>
                                                            <tr key={index}>
                                                                <td style={{border: '0.5px solid #000'}}>
                                                                    <p align={'center'}>
                                                                        {index + 1}
                                                                    </p>
                                                                </td>
                                                                <td style={{border: '0.5px solid #000'}}>
                                                                    <p align={'center'}>
                                                                        {`${item.name} (${item.shortName})`}
                                                                    </p>
                                                                </td>
                                                            </tr>
                                                        )
                                                    }
                                                    </tbody>
                                                </table>
                                                <br/>
                                                <table style={{
                                                    width: '100%',
                                                    borderSpacing: 0,
                                                    border: '0.5px solid #000'
                                                    // borderCollapse: 'collapse'
                                                }}>
                                                    <tbody>
                                                    <tr>
                                                        <td colSpan="3" style={{border: '0.5px solid #000'}}>
                                                            <p align={'center'}>
                                                                Расписание звонков
                                                            </p>
                                                        </td>
                                                    </tr>
                                                    {
                                                        listCallSchedule?.map(couple =>
                                                            <tr key={couple.id}>
                                                                <td style={{border: '0.5px solid #000'}}>
                                                                    <p align={'center'}>
                                                                        {couple.name}
                                                                    </p>
                                                                </td>
                                                                <td style={{border: '0.5px solid #000'}}>
                                                                    <p align={'center'}>
                                                                        {couple.timeStart}
                                                                    </p>
                                                                </td>
                                                                <td style={{border: '0.5px solid #000'}}>
                                                                    <p align={'center'}>
                                                                        {couple.timeEnd}
                                                                    </p>
                                                                </td>
                                                            </tr>
                                                        )}
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                    </Box>
                                </Zoom>
                            </Grid>
                        </Grid>
                    </Box>
                    : ''
            }


        </>
    );
}

export default Home;
