import {Typography, TextField, Grid} from "@material-ui/core";
import {useState} from "react";
import useStylesMain from "../../../Styles/MainStyles";

const CustomInput = (props) => {
    const classesMain = useStylesMain()
    return (
        <>
            <Grid style={{width: '100%'}} item xs={props.xs}>
                <TextField
                    required={props.required}
                    onBlur={props.onBlur}
                    style={{marginTop: '0'}}
                    className={classesMain.Input}
                    fullWidth
                    id="filled-basic"
                    type={props.type}
                    name={props.name}
                    helperText={props.helperText}
                    inputRef={props.setRef? input=>{props.setRef(input)}: {}}
                    label={props.label}
                    value={props.customValueInput}
                    onChange={props.setCustomValueInput}
                    variant="filled"
                    inputProps={{ maxLength: props.maxLength?props.maxLength:500 }}
                />
            </Grid>
        </>
    )
}

export default CustomInput