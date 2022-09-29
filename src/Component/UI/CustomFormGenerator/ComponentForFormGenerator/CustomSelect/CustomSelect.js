import {FormControl, InputLabel, Grid, Select, MenuItem} from "@material-ui/core";
import {FormHelperText} from "@mui/material";
import {useEffect, useState} from "react";
import api from "../../../../../Services/api";
import useStylesMain from "../../../../../Styles/MainStyles";

const CustomSelect = ({
                          xs,
                          disabled,
                          label,
                          name,
                          value,
                          formHelperText,
                          typeId,
                          restProps,
                      }) => {

    const classesMain = useStylesMain();
    const [listSelectItem, setListSelectItem] = useState([])
    const [valueSelect, setValueSelect] = useState('')

    function changeSelect(event) {
        setValueSelect(event.target.value)
    }

    useEffect(async () => {
        const {data: answer} = await api.documents.getItemForSelectAndAutocomplete(name, typeId)
        setValueSelect(answer[0])
        setListSelectItem(answer)
    }, []);

    return (
        <>
            <Grid style={{width: '100%'}} item xs={xs}>
                <FormControl fullWidth={true} variant="filled">
                    <InputLabel id="customSelect">{label}</InputLabel>
                    <Select
                        {...restProps}
                        disabled={disabled}
                        labelId="customSelect"
                        name={name}
                        fullWidth={true}
                        value={valueSelect}
                        onChange={changeSelect}
                    >
                        {
                            listSelectItem.map(item =>
                                <MenuItem className={classesMain.SelectItems}
                                          value={item}>{item}</MenuItem>
                            )
                        }
                    </Select>
                    <FormHelperText>{formHelperText}</FormHelperText>
                </FormControl>
            </Grid>
        </>
    )
}

export default CustomSelect