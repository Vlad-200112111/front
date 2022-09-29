import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import useStylesMain from "../../../../../Styles/MainStyles";
import {useRef, useState} from "react";
import {useEffect} from "react";
import api from "../../../../../Services/api";
import {Grid} from "@mui/material";


export default function CustomAutocomplete({
                                               xs,
                                               disabled,
                                               label,
                                               name,
                                               typeId,
                                               restProps,
                                           }) {
    const classesMain = useStylesMain()
    const [listAutocompleteItem, setListAutocompleteItem] = useState([])
    const [valueAutocomplete, setValueAutocomplete] = useState('')

    useEffect(async () => {
        const {data: answer} = await api.documents.getItemForSelectAndAutocomplete(name, typeId)
        setValueAutocomplete(answer[0])
        setListAutocompleteItem(answer)
    }, []);

    return (
        <>
            <Grid style={{width: '100%'}} item xs={xs}>
                <Autocomplete
                    {...restProps}
                    disabled={disabled}
                    options={listAutocompleteItem}
                    clearIcon={false}
                    onChange={(event, value)=>setValueAutocomplete(value)}
                    value={valueAutocomplete}
                    renderInput={(params) =>
                        <TextField
                            name={name}
                            variant='filled'
                            className={classesMain.Input}
                            {...params}
                            label={label}/>}
                />
            </Grid>

        </>
    );
}