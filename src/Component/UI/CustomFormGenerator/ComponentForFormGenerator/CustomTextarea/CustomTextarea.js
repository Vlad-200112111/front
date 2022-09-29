import {Grid, TextField} from "@material-ui/core";
import useStylesMain from "../../../../../Styles/MainStyles";
import {useEffect, useState} from "react";

const CustomTextarea = ({
                            xs,
                            disabled,
                            label,
                            name,
                            value,
                            restProps,
                        }) => {

    const classesMain = useStylesMain()
    const [valueTextarea, setValueTextarea] = useState('')

    useEffect(() => {
        setValueTextarea(value)
    }, []);

    function changeTextarea(event) {
        setValueTextarea(event.target.value)
    }

    return (
        <>
            <Grid style={{width: '100%'}} item xs={xs}>
                <TextField
                    className={classesMain.Input}
                    name={name}
                    id="filled-textarea"
                    multiline
                    disabled={disabled}
                    label={label}
                    value={valueTextarea}
                    variant="filled"
                    fullWidth={true}
                    onChange={changeTextarea}
                />
            </Grid>
        </>
    )
}

export default CustomTextarea