import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import useStylesMain from "../../../Styles/MainStyles";
import {useRef, useState} from "react";

import CircularProgress from "@mui/material/CircularProgress";

export default function CustomAutocomplete({
                                               option,
                                               onChange,
                                               options,
                                               name,
                                               label,
                                               value,
                                               setRef,
                                               width,
                                               loading,
                                               ...restProps
                                           }) {
    const classesMain = useStylesMain()
    return (
        <>
            <Autocomplete
                {...restProps}
                id="combo-box-demo"
                noOptionsText={'Совпадений не найдено'}
                options={options}
                clearIcon={false}
                onChange={onChange}
                loading={loading ? loading : false}
                value={value}
                sx={{minWidth: 300, width: width}}

                renderInput={(params) => <TextField name={name} inputRef={setRef ? input => {
                    setRef(input)
                } : {}} variant='filled' className={classesMain.Input} {...params} InputProps={{
                    ...params.InputProps,
                    endAdornment: (
                        <React.Fragment>
                            {loading ? <CircularProgress color="inherit" size={20}/> : null}
                            {params.InputProps.endAdornment}
                        </React.Fragment>
                    ),
                }} label={label}/>}
            />

        </>
    );
}