import {FormControl, FormLabel, Radio, RadioGroup} from "@mui/material";
import FormControlLabel from "@mui/material/FormControlLabel";
import useStylesMain from "../../../Styles/MainStyles";

const CustomRadio = (props) => {
    const classesMain = useStylesMain();
    return (
        <>
            <FormControl>
                <FormLabel id="demo-radio-buttons-group-label">{props.name}</FormLabel>
                <RadioGroup
                    aria-labelledby="demo-radio-buttons-group-label"
                    defaultValue="female"
                    name="radio-buttons-group"
                >
                    {
                        props.listRadio?.map(itemRadio =>
                            <FormControlLabel
                                className={classesMain.radio}
                                value={itemRadio.value}
                                control={<Radio sx={{
                                    '&.Mui-checked': {
                                        color: 'rgb(90, 125, 205)',
                                    },
                                }}/>}
                                label={itemRadio.label}/>
                        )
                    }
                </RadioGroup>
            </FormControl>
        </>
    )
}
export default CustomRadio;