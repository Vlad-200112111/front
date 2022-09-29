import React from 'react';
import {Box, Slide, Stack} from "@mui/material";
import useStylesMain from "../../../../Styles/MainStyles";
import {useEffect, useState} from "react";
import api from "../../../../Services/api";
import Cookies from "js-cookie";
import {Link, useParams} from "react-router-dom";
import ItemSelectBuildings from "../ItemSelectBuildings";
import Button from "@mui/material/Button";
import Collapse from "@mui/material/Collapse";
import Alert from "@mui/material/Alert";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import AlertTitle from "@mui/material/AlertTitle";
import CustomInput from "../../../UI/CustomInput/CustomInput";
import {Typography} from "@material-ui/core";
import MainCreateCallSchedule from "../../../Modules/MainCreateCallSchedule/MainCreateCallSchedule";
import ItemEditCallSchedule from "./ItemEditCallSchedule";
import { useNavigate } from "react-router-dom";


function EditCallSchedule(props) {
    const classesMain = useStylesMain()
    const params = useParams()
    const scheduleId = params.scheduleId
    let navigate = useNavigate()
    const [countNewCouple, setCountNewCouple] = useState(0)
    const [indexCouple, setIndexCouple] = useState(0)
    const [listCallSchedule, setListCallSchedule] = useState([])
    const [startCouple, setStartCouple] = useState('2014-08-18T06:45')
    const [endCouple, setEndCouple] = useState('2014-08-18T08:20')
    const [maxTime, setMaxTime] = useState('2014-08-18T21:00')
    const [nameSchedule, setNameSchedule] = useState('')
    const [open, setOpen] = useState(false);
    const [buildings, setBuildings] = useState([])
    const [relativeBuildings, setRelativeBuildings] = useState([])
    const [buildingsWithSchedule, setBuildingsWithSchedule] = useState([])

    useEffect(async () => {
        const {data: Buildings} = await api.scheduleCall.getBuildingsWithoutSchedule()
        setBuildings(Buildings)

        const {data: BuildingsWithSchedule} = await api.scheduleCall.getBuildingsWithSchedule(scheduleId)
        setBuildingsWithSchedule(BuildingsWithSchedule)

        const {data: RelativeBuildings} = await api.scheduleCall.getRelativeBuildings(scheduleId)
        setRelativeBuildings(RelativeBuildings)

        const {data: Schedule} = await api.scheduleCall.getScheduleCallById(scheduleId)
        const listLessons = []
        for (let i = 0; i < Schedule.lessons.length; i++) {
            listLessons.push(
                {
                    id: Schedule.lessons[i].id,
                    index: i + 1,
                    couple: Schedule.lessons[i].name,
                    startCouple: new Date(`2022-08-18T${Schedule.lessons[i].timeStart}`),
                    endCouple: new Date(`2022-08-18T${Schedule.lessons[i].timeEnd}`),
                    minTime: i === 0 ?
                        '2014-08-18T08:30' :
                        new Date(changeMinutes(listLessons[i - 1].endCouple, 10, 'add')),
                    maxTime: '2022-08-18T21:00'
                }
            )
        }
        setEndCouple(new Date(`2022-08-18T${Schedule.lessons[Schedule.lessons.length - 1].timeEnd}`))
        setStartCouple(new Date(`2022-08-18T${Schedule.lessons[Schedule.lessons.length - 1].timeStart}`))
        setIndexCouple(Schedule.lessons.length)
        setListCallSchedule(listLessons)
        setNameSchedule(Schedule.name)
    }, [])

    function addCouple() {
        setIndexCouple(Number(indexCouple) + 1)
        setStartCouple(changeMinutes(startCouple, 105, 'add'))
        setEndCouple(changeMinutes(endCouple, 105, 'add'))
        setCountNewCouple(countNewCouple + 1)
        setListCallSchedule(
            listCallSchedule.concat(
                {
                    index: indexCouple + 1,
                    couple: `${indexCouple + 1} пара`,
                    startCouple: changeMinutes(startCouple, 105, 'add'),
                    endCouple: changeMinutes(endCouple, 105, 'add'),
                    minTime: changeMinutes(startCouple, 105, 'add'),
                    maxTime: maxTime,
                }
            )
        )
    }

    function changeMinutes(date, minutes, action) {
        if (action === 'add') {
            return new Date(date).setMinutes(new Date(date).getMinutes() + minutes)
        } else if (action === 'subtract') {
            return new Date(date).setMinutes(new Date(date).getMinutes() - minutes)
        }
    }

    async function updateScheduleCall(event) {
        event.preventDefault()
        const formData = new FormData(event.target)
        const listStartTime = formData.getAll('startTime')
        const listEndTime = formData.getAll('endTime')
        for (let i = 0; i < listCallSchedule.length - countNewCouple; i++) {
            await api.scheduleCall.updateScheduleCallLessons(
                {
                    token: Cookies.get("auth-token"),
                    name: listCallSchedule[i].couple,
                    timeStart: listStartTime[i],
                    timeEnd: listEndTime[i]
                }, scheduleId, listCallSchedule[i].id
            )
        }
        for (let i = listCallSchedule.length - countNewCouple; i < listCallSchedule.length; i++) {
            await api.scheduleCall.sendScheduleCallLessons(
                {
                    token: Cookies.get("auth-token"),
                    name: listCallSchedule[i].couple,
                    timeStart: listStartTime[i],
                    timeEnd: listEndTime[i]
                }, scheduleId
            )
        }
        await api.scheduleCall.updateScheduleCall(
            {
                token: Cookies.get("auth-token"),
                name: formData.get('nameScheduleCall'),
            }, scheduleId
        )
        navigate(`/call-schedule`);
    }


    return (
        <MainCreateCallSchedule>
            <Stack spacing={1}>
                <Typography variant="overline"
                            display="block"
                            gutterBottom
                            style={{fontSize: 18, color: '#485C90', marginTop: 20}}>
                    Список корпусов:
                </Typography>
                {
                    buildingsWithSchedule.length !== 0 ?
                        <Box sx={{width: '100%'}}>
                            <Collapse in={true}>
                                <Alert
                                    severity="info"
                                    action={
                                        <IconButton
                                            aria-label="close"
                                            color="inherit"
                                            size="small"
                                        >
                                            <CloseIcon fontSize="inherit"/>
                                        </IconButton>
                                    }
                                    sx={{mb: 2}}
                                >
                                    <AlertTitle>Корпуса, привязанные к другим расписаниям:</AlertTitle>
                                    <Stack spacing={0.1}>
                                        {
                                            buildingsWithSchedule?.map((item, index) =>
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
                        </Box> : ''
                }
                <Stack spacing={2}>
                    <Stack spacing={1} direction={"row"}>
                        <Typography variant="body1"
                                    gutterBottom
                                    style={{marginLeft: 20, color: '#485C90'}}>
                            Список нераспределенных корпусов:
                        </Typography>
                        <Box>
                            {
                                buildings?.map(item =>
                                    <ItemSelectBuildings
                                        setBuildings={setBuildings}
                                        setRelativeBuildings={setRelativeBuildings}
                                        infoBuilding={item}
                                        scheduleId={scheduleId}
                                        active={false}
                                    />
                                )
                            }
                        </Box>
                    </Stack>
                    <Stack spacing={1} direction={"row"}>
                        <Typography variant="body1"
                                    gutterBottom
                                    style={{marginLeft: 20, color: '#485C90'}}>
                            Список корпусов привязанных к этому расписанию:
                        </Typography>
                        <Box>
                            {
                                relativeBuildings?.map(item =>
                                    <ItemSelectBuildings
                                        setBuildings={setBuildings}
                                        setRelativeBuildings={setRelativeBuildings}
                                        infoBuilding={item}
                                        scheduleId={scheduleId}
                                        active={true}
                                    />
                                )
                            }
                        </Box>
                    </Stack>
                </Stack>
                <Typography variant="overline"
                            display="block"
                            gutterBottom
                            style={{fontSize: 18, color: '#485C90'}}>
                    Расписание
                </Typography>
                <Box sx={{width: '100%'}}>
                    <Collapse in={open}>
                        <Alert
                            severity="error"
                            action={
                                <IconButton
                                    aria-label="close"
                                    color="inherit"
                                    size="small"
                                    onClick={() => {
                                        setOpen(false);
                                    }}
                                >
                                    <CloseIcon fontSize="inherit"/>
                                </IconButton>
                            }
                            sx={{mb: 2}}
                        >
                            <AlertTitle>Неккоректные данные!</AlertTitle>
                            Вы ввели неккоректные данные! Пожалуйста проверьте введенные Вами данные
                            и исправьте их. Поля с неккоректными данными выделены красным цветом.
                        </Alert>
                    </Collapse>
                </Box>
                <form onSubmit={updateScheduleCall}>
                    <Box>
                        <CustomInput
                            required={true}
                            title='Название'
                            label='Название'
                            setCustomValueInput={(e)=>setNameSchedule(e.target.value)}
                            customValueInput={nameSchedule}
                            name={'nameScheduleCall'}
                            helperText='Введите сюда название расписания'
                        />
                    </Box>
                    <table style={{width: '100%'}}>
                        <tbody>
                        <tr>
                            <td className={classesMain.TableMainTd} colSpan="4">
                                <Typography variant="overline"
                                            display="block"
                                            gutterBottom
                                            style={{fontSize: 16}}
                                            align={'center'}>
                                    Расписание звонков
                                </Typography>
                            </td>
                        </tr>
                        {
                            listCallSchedule?.map((callSchedule, index) =>
                                <ItemEditCallSchedule
                                    callSchedule={callSchedule}
                                    setListCallSchedule={setListCallSchedule}
                                    listCallSchedule={listCallSchedule}
                                    changeMinutes={changeMinutes}
                                    setIndexCouple={setIndexCouple}
                                    setStartCouple={setStartCouple}
                                    setEndCouple={setEndCouple}
                                    setOpen={setOpen}
                                    scheduleId={scheduleId}
                                    countNewCouple={countNewCouple}
                                />
                            )
                        }
                        </tbody>
                    </table>
                    <Stack spacing={2} direction={"row"}>
                        <Button
                            onClick={addCouple}
                            className={classesMain.button}
                        >
                            Добавить пару
                        </Button>
                        <Button
                            type={'submit'}
                            className={classesMain.button}
                        >
                            Сохранить
                        </Button>
                    </Stack>
                </form>
            </Stack>
        </MainCreateCallSchedule>
    );
}

export default EditCallSchedule;