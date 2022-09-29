import React from 'react';
import useStylesSchedule from "../../../../../Styles/ScheduleStyles";
import {useState} from "react";
import {Box, Grid} from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import {Chip} from "@material-ui/core";


function CellTableSchedule(props) {
    const classesSchedule = useStylesSchedule()

    const [showWeek, setShowWeek] = useState(false)
    const [addActionFirst, setAddActionFirst] = useState(false)
    const [addActionSecond, setAddActionSecond] = useState(false)
    const [upperWeek, setUpperWeek] = useState(false)
    const [lowerWeek, setLowerWeek] = useState(false)
    const [droppedUpper, setDroppedUpper] = useState(false)
    const [droppedLower, setDroppedLower] = useState(false)

    function onDragOverForWeekFunction(event) {
        event.preventDefault()
        event.target.classList.add(classesSchedule.CellInsertWeekFocus)
    }

    function onDragLeaveForWeekFunction(event) {
        event.target.classList.remove(classesSchedule.CellInsertWeekFocus)
    }

    function onDropFunction(event, week) {
        if (week === 'Верхняя') {
            setAddActionFirst(true)
            setDroppedUpper(true)
        } else if (week === 'Нижняя') {
            setDroppedLower(true)
            setAddActionSecond(true)
        }

        const cell = event.target
        const elementHtml = props.elementHtml
        week === 'Верхняя' ? setUpperWeek(true) : setLowerWeek(true)
        cell.parentNode.parentNode.insertAdjacentHTML('beforeEnd', elementHtml)
    }

    function onDragOverFunction(event) {
        event.preventDefault()
        setShowWeek(true)
    }

    function deleteItemSchedule(event, week) {
        const elemHtml = event.target.parentNode.parentNode.parentNode.parentNode
            .querySelectorAll('[class*="MuiGrid-root MuiGrid-item"]')[week === 'Верхняя' ? 0 : 1]
            .querySelector('[class*="makeStyles-CellToInsert"]')

        elemHtml.remove()

        if (week === 'Верхняя') {
            setAddActionFirst(false)
            setDroppedUpper(false)
        } else if (week === 'Нижняя') {
            setAddActionSecond(false)
            setDroppedLower(false)
        }
    }

    return (
        <td onDragOver={onDragOverFunction} className={classesSchedule.TableTd}>
            <Box className={classesSchedule.BoxCell}>
                {
                    showWeek ?
                        <Box>
                            <Grid
                                container
                                direction="column"
                                justifyContent="space-between"
                                alignItems="center"
                            >
                                <Grid item style={{width: '100%'}}>
                                    <Box style={{width: '100%', position: 'relative'}}>
                                        {
                                            !droppedUpper ?
                                                <Box
                                                    onDragLeave={onDragLeaveForWeekFunction}
                                                    onDragOver={onDragOverForWeekFunction}
                                                    onDrop={(event) => onDropFunction(event, 'Верхняя')}
                                                    className={classesSchedule.CellInsertWeek}>
                                                    Верхняя неделя
                                                </Box> :
                                                ''
                                        }

                                        {addActionFirst && upperWeek ?
                                            <>
                                                <CloseIcon
                                                    onClick={(event) => deleteItemSchedule(event, 'Верхняя')}
                                                    className={classesSchedule.ModalClose}/>
                                                <Chip style={{
                                                    background: 'rgba(255, 152, 69, 0.8)',
                                                    color: '#fff',
                                                    position: 'absolute',
                                                    right: '30px',
                                                    top: '10px',
                                                    zIndex: '1'
                                                }} label={'Верхняя'}/>
                                            </>
                                            : ''}

                                    </Box>
                                </Grid>
                                <Grid item style={{width: '100%'}}>
                                    <Box style={{width: '100%', position: 'relative'}}>
                                        {
                                            !droppedLower ?
                                                <Box
                                                    onDragLeave={onDragLeaveForWeekFunction}
                                                    onDragOver={onDragOverForWeekFunction}
                                                    onDrop={(event) => onDropFunction(event, 'Нижняя')}
                                                    className={classesSchedule.CellInsertWeek}>
                                                    Нижняя неделя
                                                </Box>
                                                : ''
                                        }

                                        {addActionSecond && lowerWeek ?
                                            <>
                                                <CloseIcon
                                                    onClick={(event) => deleteItemSchedule(event, 'Нижняя')}
                                                    className={classesSchedule.ModalClose}/>
                                                <Chip style={{
                                                    background: 'rgba(255, 152, 69, 0.8)',
                                                    color: '#fff',
                                                    position: 'absolute',
                                                    right: '30px',
                                                    top: '10px',
                                                    zIndex: '1'
                                                }} label={'Нижняя'}/>
                                            </>
                                            : ''}

                                    </Box>
                                </Grid>
                            </Grid>
                        </Box> :
                        <div
                            style={{
                                color: 'rgba(0,0,0,0.5)',
                                textAlign: 'center'
                            }}>
                            Перенесите сюда элемент расписания
                        </div>
                }
            </Box>
        </td>
    );
}

export default CellTableSchedule;