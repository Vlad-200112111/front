import {Grid, TextField} from "@material-ui/core";

import useStylesMain from "../../../Styles/MainStyles";

const CustomTextarea = (props) => {

    const classesMain = useStylesMain()

    return (
        <>
            <Grid style={{width: '100%'}} item xs={props.xs}>
                <TextField
                    className={classesMain.Input}
                    required={props.required}
                    style={props.style}
                    name={props.nameCustomTextarea}
                    id="filled-textarea"
                    multiline
                    inputRef={props.setRef? input=>{props.setRef(input)}: {}}
                    label={props.label}
                    value={props.valueCustomTextarea}
                    variant="filled"
                    fullWidth={true}
                    helperText={props.helperText}
                    onChange={props.setValueCustomTextarea}
                    inputProps={{ maxLength: props.maxLength?props.maxLength:500 }}

                />
            </Grid>
        </>
    )
}

export default CustomTextarea