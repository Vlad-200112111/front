import React from 'react';
import {Grid, TextField} from "@material-ui/core";
import useStylesMain from "../../../Styles/MainStyles";

function CustomInputEmail(props) {
    const classesMain = useStylesMain()
    return (
        <>
            <Grid style={{width: '100%'}} item xs={props.xs}>
                <TextField
                    style={{marginTop: '0'}}
                    className={classesMain.Input}
                    fullWidth
                    id="filled-basic"
                    name={props.name}
                    inputRef={props.setRef ? input => {
                        props.setRef(input)
                    } : {}}
                    label={props.label}
                    value={props.customValueInput}
                    onChange={props.setCustomValueInput}
                    variant="filled"
                    type={'email'}/>
            </Grid>
        </>
    );
}

export default CustomInputEmail;