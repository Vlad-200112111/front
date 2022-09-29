import React from 'react';
import TextField from '@mui/material/TextField';
import {AdapterDateFns} from '@mui/x-date-pickers/AdapterDateFns';
import {LocalizationProvider} from '@mui/x-date-pickers/LocalizationProvider';
import {DesktopDatePicker} from '@mui/x-date-pickers/DesktopDatePicker';
import {Grid} from "@mui/material";
import {createTheme, ThemeProvider, useTheme} from '@mui/material/styles';
import {useMemo, useState, useEffect} from "react";
import * as locales from '@mui/material/locale';
import ruLocale from 'date-fns/locale/ru';
import useStylesMain from "../../../Styles/MainStyles";


function CustomDesktopDatePicker(props) {

    const [value, setValue] = useState(new Date());

    const handleChange = (newValue) => {
        setValue(newValue)
        if (props.setValue) {
            props?.setValue(newValue)

        }

    };

    useEffect(() => {
        if (typeof props?.value === "string" || props?.value === undefined) {
            if (props.value !== null && props.value !== undefined) {
                let dateStringToArray = props.value.split('.')
                setValue(new Date(+dateStringToArray[2], dateStringToArray[1] - 1, +dateStringToArray[0]))
            } else if (props?.value === '' || props?.value === undefined) {
                setValue(null)
            } else {
                setValue(new Date())
            }
        } else if (props?.value instanceof Date) {
            setValue(props.value)
        }


    }, []);


    const [locale, setLocale] = useState('ruRu');

    const theme = useTheme();

    const themeWithLocale = useMemo(
        () => createTheme(theme, locales[locale]),
        [locale, theme],
    );

    const classesMain = useStylesMain()
    return (
        <Grid style={{width: '100%'}} item xs={props.xs}>
            <ThemeProvider theme={themeWithLocale}>
                <LocalizationProvider
                    dateAdapter={AdapterDateFns}
                    adapterLocale={ruLocale}
                >
                    <DesktopDatePicker
                        label={props.label}
                        inputFormat="dd.MM.yyyy"
                        minDate={props.minDate ? props.minDate : new Date()}
                        value={value}
                        onChange={handleChange}
                        renderInput={(params) =>
                            <TextField
                                style={{width: '100%'}}
                                className={classesMain.Input}
                                variant="filled"
                                name={props.name}
                                required={props.required}
                                helperText={props.helperText}
                                {...params} />}
                    />
                </LocalizationProvider>
            </ThemeProvider>
        </Grid>
    );
}

export default CustomDesktopDatePicker;