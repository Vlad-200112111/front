import React from 'react';
import MainCreateCallSchedule from "../../../Modules/MainCreateCallSchedule/MainCreateCallSchedule";
import {useEffect} from "react";
import api from "../../../../Services/api";
import useStylesMain from "../../../../Styles/MainStyles";
import {Link, useParams} from "react-router-dom";
import {useState} from "react";
import {Typography} from "@material-ui/core";
import {Box, Button, Stack, Zoom} from "@mui/material";
import Collapse from "@mui/material/Collapse";
import Alert from "@mui/material/Alert";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import AlertTitle from "@mui/material/AlertTitle";
import useStylesHome from "../../../../Styles/HomeStyles";
import ReactToPrint from "react-to-print";
import CustomAlert from "../../../UI/CustomAlert/CustomAlert";

function ShowCallSchedule(props) {
    const classesMain = useStylesMain()
    const params = useParams()
    const scheduleId = params.scheduleId
    const [listCallSchedule, setListCallSchedule] = useState([])
    const [relativeBuildings, setRelativeBuildings] = useState([])
    const [nameCallSchedule, setNameCallSchedule] = useState('');
    const [checked, setChecked] = useState(false);
    const classesHome = useStylesHome();

    useEffect(async () => {
        const {data: listScheduleCall} = await api.scheduleCall.getScheduleCallById(scheduleId)
        setNameCallSchedule(listScheduleCall.name)
        setListCallSchedule(listScheduleCall.lessons)

        const {data: RelativeBuildings} = await api.scheduleCall.getRelativeBuildings(scheduleId)
        setRelativeBuildings(RelativeBuildings)
        setChecked(true)
    }, [])

    const getPageMargins = () => {
        return `@page { margin: 20 20 20 20 !important; }`;
    };

    return (
        <MainCreateCallSchedule>
            <Zoom in={checked}>
                <Stack spacing={2}>
                    <CustomAlert
                        severity="info"
                        title='Информация!'
                        content='Для обновления списка корпусов необходимо обращаться к администратору информационной системы'
                        activeAlert={true}
                    />
                    <Typography variant="h5"
                                gutterBottom
                                style={{color: '#485C90'}}>
                        Название расписания: {nameCallSchedule}
                    </Typography>
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
                                <AlertTitle>Список корпусов привязанных к этому расписанию:</AlertTitle>
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
                    </Box>
                    <Box>

                        <table style={{width: '100%'}}>
                            <tbody>
                            <tr>
                                <td className={classesHome.TableMainTd} colSpan="3">
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
                                listCallSchedule?.map(couple =>
                                    <tr key={couple.id}>
                                        <td style={{width: 100}} className={classesHome.TableMainTd}>
                                            <Typography variant="overline"
                                                        display="block"
                                                        gutterBottom
                                                        style={{fontSize: 14}}
                                                        align={'center'}>
                                                {couple.name}
                                            </Typography>
                                        </td>
                                        <td className={classesHome.TableTd}>
                                            <Typography variant="overline"
                                                        display="block"
                                                        gutterBottom
                                                        style={{fontSize: 16, color: '#485C90'}}
                                                        align={'center'}>
                                                {couple.timeStart}
                                            </Typography>
                                        </td>
                                        <td className={classesHome.TableTd}>
                                            <Typography variant="overline"
                                                        display="block"
                                                        gutterBottom
                                                        style={{fontSize: 16, color: '#485C90'}}
                                                        align={'center'}>
                                                {couple.timeEnd}
                                            </Typography>
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </Box>
                    <Stack spacing={2} direction={"row"}>
                        <Link to={`/call-schedule`}
                              style={{textDecoration: 'none', color: '#fff'}}>
                            <Button className={classesMain.button} variant="contained">
                                Вернуться к списку
                            </Button>
                        </Link>
                        <ReactToPrint
                            trigger={() =>
                                <Button className={classesMain.button} variant="contained">
                                    Отобразить в PDF
                                </Button>
                            }
                            content={() => document.getElementById('htmlForPDF')}
                        />
                    </Stack>
                </Stack>
            </Zoom>
            <div
                style={{display: "none"}}
            >
                <div style={{padding: 40}} id='htmlForPDF' className='font-times-new-roman'>
                    <div style={{textAlign: "center"}}>
                        <p style={{textTransform: "uppercase", margin: 0}}>Министерство образования и науки россиской федерации</p>
                        <p style={{margin: 0}}>Федеральное государственное бюджетное образовательное учреждение</p>
                        <p style={{margin: 0}}>высшего профессионального образования</p>
                        <p style={{margin: 0}}>"Забайкальский государственный университет"</p>
                        <p style={{margin: 0}}>(ФГБОУ ВПО "ЗабГУ")</p>
                        <p style={{margin: 30, fontSize: 24, fontWeight: "bold"}}>Распоряжение</p>
                        <div style={{display: "flex", width: '100%'}}>
                            <p style={{margin: 0 , width: '50%'}}>"__"________ {new Date().getFullYear()}</p>
                            <p style={{margin: 0 , width: '50%'}}>№____</p>
                        </div>
                        <p style={{margin: 0}}>г. Чита</p>
                        <p style={{margin: 30}}>С 1 сентября 2022 года утвердить следующее расписание звонков учебных занятий в корпусах университета: </p>
                    </div>
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
                    <style>{getPageMargins()}</style>
                </div>
            </div>
        </MainCreateCallSchedule>
    );
}

export default ShowCallSchedule;