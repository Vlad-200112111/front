import React, {useEffect} from 'react';
import {Grid} from "@mui/material";
import {Typography} from "@material-ui/core";
import useStylesMain from "../../../../../Styles/MainStyles";
import api from "../../../../../Services/api";
import {useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import AccordionShowTask from "./AccordionShowTask";
import Grow from "@mui/material/Grow";

function ShowTask(props) {
    const params = useParams()
    const idTopic = params.idTopic
    const classesMain = useStylesMain()
    const [grow, setGrow] = useState(true)
    const [topicName, setTopicName] = useState('')
    const [studyLoad, setStudyLoad] = useState([])
    const [arr, setArr] = useState([])

    useEffect(async () => {
        const {data: StudyLoad} = await api.courses.getDisciplineStudent(idTopic)
        setStudyLoad(StudyLoad.result)
    }, [])

    return (
        <Grid container spacing={3}>
            <Grid item xs={12}>
                <Typography style={{textAlign: "center"}}
                            className={classesMain.Title}>Дисциплина <br/> "{topicName}"</Typography>
            </Grid>
            <Grid item xs={12}>
                {
                    studyLoad?.map((item, index) =>
                        <AccordionShowTask
                            item={item}
                        />
                    )
                }
            </Grid>
        </Grid>
    );
}

export default ShowTask;