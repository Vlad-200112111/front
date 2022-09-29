import React from 'react';
import useStylesMain from "../../../../Styles/MainStyles";
import {Typography} from "@material-ui/core";
import {createTheme, ThemeProvider, useTheme} from "@mui/material/styles";
import {useMemo, useState} from "react";
import * as locales from "@mui/material/locale";
import {LocalizationProvider} from "@mui/x-date-pickers/LocalizationProvider";
import {AdapterDateFns} from "@mui/x-date-pickers/AdapterDateFns";
import ruLocale from "date-fns/locale/ru";
import {DesktopTimePicker} from "@mui/x-date-pickers";
import {TextField} from "@mui/material";
import CustomIconButton from "../../../UI/CustomIconButton/CustomIconButton";
import DeleteIcon from "@mui/icons-material/Delete";

function ItemCreateCallSchedule(
    {
        callSchedule,
        setListCallSchedule,
        listCallSchedule,
        changeMinutes,
        setIndexCouple,
        setStartCouple,
        setEndCouple,
        setOpen
    }
) {
    const classesMain = useStylesMain()
    const [locale, setLocale] = useState('ruRu');
    const theme = useTheme();

    const themeWithLocale = useMemo(
        () => createTheme(theme, locales[locale]),
        [locale, theme],
    );

    function deleteCouple(index) {
        let list = listCallSchedule?.map((item, i) => {
                if (i > index - 1) {
                    if (i + 1 === listCallSchedule.length) {
                        setIndexCouple(listCallSchedule[i].index)
                        setStartCouple(listCallSchedule[i].startCouple)
                        setEndCouple(listCallSchedule[i].endCouple)
                    }
                    setIndexCouple(listCallSchedule[listCallSchedule.length - 2].index)
                    setStartCouple(listCallSchedule[listCallSchedule.length - 2].startCouple)
                    setEndCouple(listCallSchedule[listCallSchedule.length - 2].endCouple)
                    return {
                        ...item,
                        startCouple: listCallSchedule[i - 1].startCouple,
                        endCouple: listCallSchedule[i - 1].endCouple,
                        minTime: listCallSchedule[i - 1].minTime,
                        index: listCallSchedule[i - 1].index,
                        couple: `${listCallSchedule[i - 1].index} пара`,
                    }
                } else if (i + 1 === listCallSchedule.length) {
                    setIndexCouple(listCallSchedule[i - 1].index)
                    setStartCouple(listCallSchedule[i - 1].startCouple)
                    setEndCouple(listCallSchedule[i - 1].endCouple)
                    return {
                        ...item,
                        startCouple: '',
                        endCouple: '',
                        minTime: '',
                        index: '',
                        couple: '',
                    }
                } else {
                    return item
                }
            }
        )
        let result = list.filter((elem, i) =>
            i !== index - 1
        )
        setListCallSchedule(result)
    }

    const handleChangeStartTime = (newValue, index) => {
        const startCouple = new Date(newValue)
        const endCouple = new Date(changeMinutes(new Date(newValue), 95, 'add'))
        setStartCouple(startCouple)
        setEndCouple(endCouple)
        const nextArr = listCallSchedule?.map((item, indexItem) => {
                if (indexItem === index - 1) {
                    return {
                        ...item,
                        startCouple: startCouple,
                        endCouple: endCouple
                    }
                } else {
                    return item
                }
            }
        )

        const result = nextArr?.map((item, indexItem) => {
                if (indexItem === index) {
                    return {
                        ...item,
                        minTime: changeMinutes(endCouple, 10, 'add'),
                    }
                } else {
                    return item
                }
            }
        )
        setListCallSchedule(result)
    };

    const handleChangeEndTime = (newValue, index) => {

        const nextArr = listCallSchedule?.map((item, indexItem) => {
                if (indexItem === index - 1) {
                    return {...item, endCouple: newValue}
                } else {
                    return item
                }
            }
        )
        const result = nextArr?.map((item, indexItem) => {
                if (indexItem === index) {
                    return {
                        ...item,
                        minTime: changeMinutes(newValue, 10, 'add'),
                    }
                } else {
                    return item
                }
            }
        )
        setListCallSchedule(result)
    };

    function errorDesktopTimePicker(index) {
        setOpen(true)
    }

    return (
        <tr>
            <td style={{width: 100}} className={classesMain.TableMainTd}>
                <Typography variant="overline"
                            display="block"
                            gutterBottom
                            style={{fontSize: 14}}
                            align={'center'}>
                    {`${callSchedule.index} пара`}
                </Typography>
            </td>
            <td className={classesMain.TableTd}>
                <ThemeProvider theme={themeWithLocale}>
                    <LocalizationProvider
                        dateAdapter={AdapterDateFns}
                        adapterLocale={ruLocale}
                    >
                        <DesktopTimePicker
                            minTime={new Date(callSchedule.minTime)}
                            maxTime={new Date(callSchedule.maxTime)}
                            value={callSchedule.startCouple}
                            onChange={(newValue) => handleChangeStartTime(newValue, callSchedule.index)}
                            onError={() => errorDesktopTimePicker(callSchedule.index)}
                            renderInput={(params) =>
                                <TextField
                                    style={{width: '100%'}}
                                    className={classesMain.Input}
                                    variant="filled"
                                    name='startTime'
                                    {...params} />}
                        />
                    </LocalizationProvider>
                </ThemeProvider>
            </td>
            <td className={classesMain.TableTd}>
                <ThemeProvider theme={themeWithLocale}>
                    <LocalizationProvider
                        dateAdapter={AdapterDateFns}
                        adapterLocale={ruLocale}
                    >
                        <DesktopTimePicker
                            minTime={new Date(callSchedule.minTime)}
                            maxTime={new Date(callSchedule.maxTime)}
                            value={callSchedule.endCouple}
                            onChange={(newValue) => handleChangeEndTime(newValue, callSchedule.index)}
                            onError={() => errorDesktopTimePicker(callSchedule.index)}
                            renderInput={(params) =>
                                <TextField
                                    style={{width: '100%'}}
                                    className={classesMain.Input}
                                    variant="filled"
                                    name='endTime'
                                    {...params} />}
                        />
                    </LocalizationProvider>
                </ThemeProvider>
            </td>
            <td style={{width: 50}} className={classesMain.TableTd}>
                <CustomIconButton
                    icon={<DeleteIcon/>}
                    caption={'Нажмите для того, чтобы удалить'}
                    inputFunction={() => deleteCouple(callSchedule.index)}
                />
            </td>
        </tr>
    );
}

export default ItemCreateCallSchedule;