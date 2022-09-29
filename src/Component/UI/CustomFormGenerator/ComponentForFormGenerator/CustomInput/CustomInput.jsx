import {Typography, TextField, Grid} from "@material-ui/core";
import {useState} from "react";
import useStylesMain from "../../../../../Styles/MainStyles";
import {useEffect} from "react";

const CustomInput = ({
                         xs,
                         disabled,
                         label,
                         name,
                         value,
                         type,
                         restProps,
                     }) => {
    const classesMain = useStylesMain()
    const [valueInput, setValueInput] = useState('')

    useEffect(() => {
        setValueInput(value)
    }, []);

    function changeInput(event) {
        setValueInput(event.target.value)
    }

    return (
        <>
            <Grid style={{width: '100%'}} item xs={xs}>
                <TextField
                    style={{marginTop: '0'}}
                    className={classesMain.Input}
                    fullWidth
                    type={type}
                    disabled={disabled}
                    id="filled-basic"
                    name={name}
                    label={label}
                    value={valueInput}
                    onChange={changeInput}
                    variant="filled"/>
            </Grid>
        </>
    )
}

export default CustomInput