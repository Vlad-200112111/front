import React from 'react';
import {useState} from "react";
import {useEffect, useMemo} from "react";
import * as locales from "@mui/material/locale";
import {AdapterDateFns} from "@mui/x-date-pickers/AdapterDateFns";
import ruLocale from "date-fns/locale/ru";
import {LocalizationProvider} from '@mui/x-date-pickers/LocalizationProvider';
import {createTheme, ThemeProvider, useTheme} from '@mui/material/styles';
import {TimePicker} from "@mui/x-date-pickers";
import {TextField} from "@mui/material";
import useStylesMain from "../../../Styles/MainStyles";

function CustomTimePicker({name, label, time, helperText}) {
    const classesMain = useStylesMain()
    const [value, setValue] = useState('2014-08-18T00:00:00');

    const handleChange = (newValue) => {
        setValue(newValue)
    };

    useEffect(() => {
        if(time instanceof Date){
            setValue(time)
        }
    }, []);


    const [locale, setLocale] = useState('ruRu');

    const theme = useTheme();

    const themeWithLocale = useMemo(
        () => createTheme(theme, locales[locale]),
        [locale, theme],
    );


    return (
        <ThemeProvider theme={themeWithLocale}>
            <LocalizationProvider
                dateAdapter={AdapterDateFns}
                adapterLocale={ruLocale}
            >
                <TimePicker
                    label={label}
                    value={value}
                    onChange={handleChange}
                    renderInput={(params) => <TextField
                        style={{width: '100%'}}
                        className={classesMain.Input}
                        variant="filled"
                        name={name}
                        helperText={helperText}
                        {...params} />}
                />
            </LocalizationProvider>
        </ThemeProvider>
    );
}

export default CustomTimePicker;