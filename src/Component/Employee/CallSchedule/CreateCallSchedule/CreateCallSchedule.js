import React, {useState} from 'react';
import MainCreateCallSchedule from "../../../Modules/MainCreateCallSchedule/MainCreateCallSchedule";
import CustomInput from "../../../UI/CustomInput/CustomInput";
import {Box, Slide, Stack, TextField} from "@mui/material";
import {Typography} from "@material-ui/core";
import Button from "@mui/material/Button";
import useStylesMain from "../../../../Styles/MainStyles";
import ItemCreateCallSchedule from "./ItemCreateCallSchedule";
import CloseIcon from '@mui/icons-material/Close';
import Collapse from "@mui/material/Collapse";
import Alert from "@mui/material/Alert";
import IconButton from "@mui/material/IconButton";
import AlertTitle from "@mui/material/AlertTitle";
import api from "../../../../Services/api";
import Cookies from "js-cookie";
import {Link, useNavigate} from "react-router-dom";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogActions from "@mui/material/DialogActions";
import Dialog from "@mui/material/Dialog";
import CustomAlert from "../../../UI/CustomAlert/CustomAlert";
import ItemSelectBuildings from "../ItemSelectBuildings";

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

function CreateCallSchedule(props) {
    const classesMain = useStylesMain()
    let navigate = useNavigate();
    const [indexCouple, setIndexCouple] = useState(0)
    const [listCallSchedule, setListCallSchedule] = useState([])
    const [startCouple, setStartCouple] = useState('2014-08-18T06:45')
    const [endCouple, setEndCouple] = useState('2014-08-18T08:20')
    const [maxTime, setMaxTime] = useState('2014-08-18T21:00')
    const [open, setOpen] = useState(false);
    const [openDialog, setOpenDialog] = useState(false);
    const [buildings, setBuildings] = useState([])
    const [scheduleId, setScheduleId] = useState()
    const [relativeBuildings, setRelativeBuildings] = useState([])

    function addCouple() {
        setIndexCouple(Number(indexCouple) + 1)
        setStartCouple(changeMinutes(startCouple, 105, 'add'))
        setEndCouple(changeMinutes(endCouple, 105, 'add'))

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

    async function addScheduleCall(event) {
        event.preventDefault()
        const formData = new FormData(event.target)
        const listStartTime = formData.getAll('startTime')
        const listEndTime = formData.getAll('endTime')

        const listLessons = []
        for (let i = 0; i < listCallSchedule.length; i++) {
            listLessons.push(
                {
                    name: listCallSchedule[i].couple,
                    timeStart: listStartTime[i],
                    timeEnd: listEndTime[i]
                }
            )
        }

        const {data: schedule} = await api.scheduleCall.sendScheduleCall(
            {
                token: Cookies.get("auth-token"),
                name: formData.get('nameScheduleCall'),
                lessons: listLessons
            }
        )
        setOpenDialog(true)
        setScheduleId(schedule.id)
        const {data: Buildings} = await api.scheduleCall.getBuildingsWithoutSchedule()
        setBuildings(Buildings)
        const {data: RelativeBuildings} = await api.scheduleCall.getRelativeBuildings(scheduleId)
        setRelativeBuildings(RelativeBuildings)
    }


    return (
        <MainCreateCallSchedule>
            <Dialog
                open={openDialog}
                TransitionComponent={Transition}
                keepMounted
                fullWidth={true}
                maxWidth={'xl'}
            >
                <DialogTitle style={{margin: '10px auto'}}>Выбор корпусов</DialogTitle>
                <DialogContent style={{margin: '0px 20px 0px 20px'}}>
                    <CustomAlert
                        severity="info"
                        title='Информация!'
                        content='Выберите корпуса, к которым необходимо привязать созданное Вами расписание!'
                        activeAlert={true}
                    />
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
                </DialogContent>
                <DialogActions style={{margin: '0px 20px 20px 20px'}}>
                    <Link to={`/call-schedule`}
                          style={{textDecoration: 'none', color: '#fff'}}>
                        <Button className={classesMain.button} variant="contained">
                            Закончить выбор корпусов
                        </Button>
                    </Link>
                </DialogActions>
            </Dialog>
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
            <form onSubmit={addScheduleCall}>
                <Box>
                    <CustomInput
                        required={true}
                        title='Название'
                        label='Название'
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
                            <ItemCreateCallSchedule
                                callSchedule={callSchedule}
                                setListCallSchedule={setListCallSchedule}
                                listCallSchedule={listCallSchedule}
                                changeMinutes={changeMinutes}
                                setIndexCouple={setIndexCouple}
                                setStartCouple={setStartCouple}
                                setEndCouple={setEndCouple}
                                setOpen={setOpen}
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
        </MainCreateCallSchedule>
    );
}

export default CreateCallSchedule;