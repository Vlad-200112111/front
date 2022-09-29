import {useNavigate} from "react-router-dom";
import {Button, Grid} from "@material-ui/core";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import React from "react";
import useStylesMain from "../../../Styles/MainStyles";

const HistoryBackButton = ()=>{
    const classesMain = useStylesMain()
    const navigate = useNavigate()
    const goBack = ()=> navigate(-1)
    return(
        <Grid item xs={3}>
            <Button className={classesMain.button} onClick={goBack}><ChevronLeftIcon/>
                <span>Вернуться</span></Button>
        </Grid>
    )
}
export default HistoryBackButton