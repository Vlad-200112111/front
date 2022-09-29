import React, {useState} from 'react';
import {Box, Grid, Stack} from "@mui/material";
import useStylesSchedule from "../../../../Styles/ScheduleStyles";
import {Typography} from "@material-ui/core";
import useStylesMain from "../../../../Styles/MainStyles";
import CellTableSchedule from "./Items/CellTableSchedule";
import CustomAlert from "../../../UI/CustomAlert/CustomAlert";

// import Carousel from 'react-grid-carousel'

function CreateSchedule(props) {
    const classesMain = useStylesMain()
    const classesSchedule = useStylesSchedule()

    const [elementHtml, setElementHtml] = useState('')
    const couples = [1, 2, 3, 4, 5, 6, 7]
    const weekdays = ['Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота']

    const disciplines = [
        {
            id: 1,
            name: 'Дисциплина 1'
        },
        {
            id: 2,
            name: 'Дисциплина 2'
        },
        {
            id: 3,
            name: 'Дисциплина 3'
        },
        {
            id: 4,
            name: 'Дисциплина 4'
        },
        {
            id: 5,
            name: 'Дисциплина 5'
        },
        {
            id: 6,
            name: 'Дисциплина 6'
        },
        {
            id: 7,
            name: 'Дисциплина 7'
        },
        {
            id: 8,
            name: 'Дисциплина 8'
        },
        {
            id: 9,
            name: 'Дисциплина 9'
        },
        {
            id: 10,
            name: 'Дисциплина 10'
        },
        {
            id: 11,
            name: 'Дисциплина 11'
        },
    ]


    function onDragStartFunction(event) {
        const draggableObject = event.target
        setElementHtml(draggableObject.outerHTML)
    }

    return (
        <div>
            <Grid maxWidth="xs" className={classesMain.backgroundMain}>
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <Typography className={classesMain.Title} variant="h1">Создание расписания</Typography>
                    </Grid>
                </Grid>
                <CustomAlert
                    severity="info"
                    title='Информация!'
                    content='Сервис "Расписание" находится в стадии разработки!'
                    activeAlert={true}
                />
                <Box
                    sx={{
                        width: '100%', typography: 'body1'
                    }}>
                    <Grid
                        container
                        direction="column"
                        justifyContent="center"
                        alignItems="center"
                        spacing={2}
                    >
                        <Grid item xs={6} sx={{position: 'sticky', top: '4rem', zIndex: 10}}>
                            <Box sx={{p: 2}} className={classesSchedule.BoxDiscipline}>
                                {/*<Carousel cols={5} rows={1} gap={10} loop showDots={true} autoplay={10000}*/}
                                {/*          dotColorActive={'rgba(90, 125, 207, 0.8)'} containerStyle={{maxWidth: '1300px'}}*/}
                                {/*>*/}
                                <Stack spacing={2} direction={'row'}>
                                    {
                                        disciplines?.map(discipline =>
                                            <Box
                                                sx={{p: 2, height: 150}}
                                                draggable={true}
                                                className={classesSchedule.CellToInsert}
                                                onDragStart={onDragStartFunction}
                                            >
                                                <Typography style={{marginBottom: 10}} display="block">
                                                    Дисциплина:
                                                    <div style={{color: 'rgba(0,0,0,0.5)'}}>
                                                        {discipline.name}
                                                    </div>
                                                </Typography>
                                                <Typography display="block">
                                                    Преподаватель:
                                                    <div style={{color: 'rgba(0, 0, 0, 0.5)'}}>
                                                        Макарова Юлия Сергеевна
                                                    </div>
                                                </Typography>
                                            </Box>
                                        )
                                    }
                                </Stack>
                                {/*</Carousel>*/}
                            </Box>
                        </Grid>
                        <Grid item xs={12} style={{width: '100%'}}>
                            <Box sx={{p: 2}}>
                                <table style={{width: '100%'}}>
                                    <tbody>
                                    <tr>
                                        <td className={classesSchedule.TableMainTd}>
                                            <Typography variant="overline"
                                                        display="block"
                                                        gutterBottom
                                                        align={'center'}>
                                                Пара
                                            </Typography>
                                        </td>
                                        {
                                            weekdays?.map(weekday =>
                                                <td className={classesSchedule.TableMainTd}>
                                                    <Typography variant="overline"
                                                                display="block"
                                                                gutterBottom
                                                                align={'center'}>
                                                        {weekday}
                                                    </Typography>
                                                </td>
                                            )
                                        }
                                    </tr>
                                    {
                                        couples?.map(couple =>
                                            <tr>
                                                <td className={classesSchedule.TableMainTd}>
                                                    <Typography variant="overline"
                                                                display="block"
                                                                gutterBottom
                                                                style={{fontSize: 20}}
                                                                align={'center'}>
                                                        {couple}
                                                    </Typography>
                                                </td>

                                                {
                                                    weekdays.map(weekday =>
                                                        <CellTableSchedule elementHtml={elementHtml}/>
                                                    )
                                                }
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </Box>
                        </Grid>

                    </Grid>
                </Box>
            </Grid>
        </div>
    );
}

export default CreateSchedule;