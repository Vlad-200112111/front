import React, {useState,useEffect} from 'react';
import {Grid} from "@mui/material";
import CustomInput from "../../UI/CustomInput/CustomInput";
import {Button} from "@material-ui/core";
import useStylesMain from "../../../Styles/MainStyles";
import api from '../../../Services/api'
import Cookies from "js-cookie";
import FormLabel from "@mui/material/FormLabel";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Radio from "@mui/material/Radio";
import FormControl from "@mui/material/FormControl";

function CalendarStudyScheduleSettings(props) {
    const classesMain = useStylesMain()
    const [name,setName] = useState('')
    const [desc,setDesc] = useState('')
    const [marks,setMarks] = useState([])
    useEffect(async ()=>{
        const{data:Marks} = await api.educationalProcess.getCalendarStudyMarks()
        setMarks(Marks)
    },[])
    const addMark = async ()=>{
        let obj = {}
        obj.name = name
        obj.token = Cookies.get('auth-token')
        obj.description = desc
        await api.educationalProcess.postCalendarStudyMark(obj)
        setDesc('')
        setName('')
        const{data:Marks} = await api.educationalProcess.getCalendarStudyMarks()
        setMarks(Marks)
    }
    return (
        <Grid container spacing={3}>
            <Grid item xs={12}>
                <FormControl>
                    <FormLabel id="demo-row-radio-buttons-group-label">Отметки</FormLabel>
                    <RadioGroup
                        row
                        aria-labelledby="demo-row-radio-buttons-group-label"
                        name="row-radio-buttons-group"
                    >
                        {
                            marks.map(item=>
                                <FormControlLabel disabled value={item.name} control={<Radio />} label={`${item.description} - "${item.name}"`} />

                            )
                        }

                    </RadioGroup>
                </FormControl>
            </Grid>
            <Grid item xs={12}>
                <CustomInput customValueInput={name} setCustomValueInput={(event)=>setName(event.target.value)}  label='Название'/>
                <CustomInput customValueInput={desc} setCustomValueInput={(event)=>setDesc(event.target.value)} label='Описание'/>
                <div style={{display: 'flex'}}>
                    <Button
                        onClick={addMark}
                        className={classesMain.button}
                    >
                        Добавить
                    </Button>
                </div>
            </Grid>
        </Grid>
    );
}

export default CalendarStudyScheduleSettings;