import {FormControl, FormLabel, Radio, RadioGroup, Stack} from "@mui/material";
import FormControlLabel from "@mui/material/FormControlLabel";
import useStylesMain from "../../../Styles/MainStyles";

const CustomRadio = (props) => {
    const classesMain = useStylesMain();
    return (
        <>
            <FormControl style={{width: '100%'}}>
                <FormLabel id="radioButtons">{props.name}</FormLabel>
                <RadioGroup
                    aria-labelledby="radioButtons"
                    name={props.nameInput}
                    onChange={event=>props.setValue(event.target.value)}
                >
                    <Stack style={{marginRight: 'auto', marginLeft: 'auto', marginTop: 10}} direction='row' spacing={4}>
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
                                    label={itemRadio.label}
                                    labelPlacement="top"/>
                            )
                        }
                    </Stack>
                </RadioGroup>
            </FormControl>
        </>
    )
}
export default CustomRadio;