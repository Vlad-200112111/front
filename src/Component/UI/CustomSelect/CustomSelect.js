import {FormControl, InputLabel, Grid, Select, MenuItem} from "@material-ui/core";
import {FormHelperText} from "@mui/material";
import {useEffect, useState} from "react";
import api from "../../../Services/api";
import useStylesMain from "../../../Styles/MainStyles";

const CustomSelect = ({
                          xs,
                          disabled,
                          contentCustomSelect,
                          nameCustomSelect,
                          valueSelect,
                          setValueSelect,
                          children,
                          formHelperText,
                          size,
                          restProps,
                          required
                      }) => {


    return (
        <>
            <Grid style={{width: '100%'}} item xs={xs}>
                <FormControl fullWidth={true} variant="filled">
                    <InputLabel required={required} id="customSelect">{contentCustomSelect}</InputLabel>
                    <Select
                        {...restProps}
                        disabled={disabled}
                        labelId="customSelect"
                        name={nameCustomSelect}
                        fullWidth={true}
                        value={valueSelect}
                        onChange={setValueSelect}
                    >
                        {
                            children
                        }
                    </Select>
                    <FormHelperText>{formHelperText}</FormHelperText>
                </FormControl>
            </Grid>
        </>
    )
}

export default CustomSelect