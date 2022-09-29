import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import {Grid} from "@mui/material";
import {Button, Typography} from "@material-ui/core";
import useStylesMain from "../../../Styles/MainStyles";
import defaultImage from '../../../Assets/Image/Olympiads/default_olympiad_image.svg'
import HistoryBackButton from "../../UI/HistoryBackButton/HistoryBackButton";
import useStylesOlympiads from "../../../Styles/OlympiadsStyles";

function OlympiadDetails(props) {
    const classesMain = useStylesMain()
    const classesOlympiads = useStylesOlympiads()
    const params = useParams()
    const idOlympiad = params.idOlympiad


    const [olympiads, setOlympiads] = useState([
        {
            id: 1,
            name: 'Олимпиада 1',
            description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled',
            datestart: '2022-01-01',
            document: 'document',
            format: 'очно',
            place: 'место',
            level: 'Международный'
        },
        {
            id: 2,
            name: 'Олимпиада 2',
            description: 'description',
            datestart: '2022-01-01',
            document: 'document',
            format: 'очно',
            place: 'место',
            level: 'Международный'
        },
        {
            id: 3,
            name: 'Олимпиада 3',
            description: 'description',
            datestart: '2022-01-01',
            document: 'document',
            format: 'очно',
            place: 'место',
            level: 'Международный'
        },
        {
            id: 4,
            name: 'Олимпиада 4',
            description: 'description',
            datestart: '2022-01-01',
            document: 'document',
            format: 'очно',
            place: 'место',
            level: 'Международный'
        },
        {
            id: 5,
            name: 'Олимпиада 5',
            description: 'description',
            datestart: '2022-01-01',
            document: 'document',
            format: 'очно',
            place: 'место',
            level: 'Международный'
        }
    ])


    useEffect(()=>{
        setOlympiads(olympiads.filter(el=>Number(el.id)===Number(idOlympiad)))
    },[idOlympiad])



    return (
        <Grid justifyContent='center' alignItems='center' display='flex' container spacing={3}>
            <Grid item xs={12}><HistoryBackButton/></Grid>

            <Grid item xs={12}>
                <Typography className={classesMain.Title}>
                    {olympiads[0].name}
                </Typography>
            </Grid>
            <Grid justifyContent='center'  display='flex' flexDirection='column' item xs={12} md={5}>
                <img className={classesOlympiads.detailsImg} src={defaultImage} alt={`${olympiads[0].name} img`}/>
                <Button style={{width:'100%'}} className={classesMain.button}>Записаться</Button>
            </Grid>

            <Grid item xs={12} md={5}>
                <Typography style={{textAlign:'left'}} className={classesMain.Text} gutterBottom variant="h5" component="div">
                    Дата проведения
                </Typography>
                <Typography gutterBottom style={{textAlign:'left'}} className={classesMain.Text}>{olympiads[0].datestart} - {olympiads[0].datestart}</Typography>

                <Typography style={{textAlign:'left'}} className={classesMain.Text} gutterBottom variant="h5" component="div">
                    Описание
                </Typography>
                <Typography gutterBottom style={{textAlign:'justify', }} className={classesMain.Text}>{olympiads[0].description}</Typography>
                <Typography style={{textAlign:'left'}} className={classesMain.Text} gutterBottom variant="h5" component="div">
                    Формат проведения
                </Typography>
                <Typography gutterBottom style={{textAlign:'justify', }} className={classesMain.Text}>{olympiads[0].format}</Typography>
                <Typography style={{textAlign:'left'}} className={classesMain.Text} gutterBottom variant="h5" component="div">
                    Место
                </Typography>
                <Typography gutterBottom style={{textAlign:'justify', }} className={classesMain.Text}>{olympiads[0].place}</Typography>

                <Typography style={{textAlign:'left'}} className={classesMain.Text} gutterBottom variant="h5" component="div">
                    Уровень мероприятия
                </Typography>
                <Typography gutterBottom style={{textAlign:'justify', }} className={classesMain.Text}>{olympiads[0].level}</Typography>

            </Grid>
        </Grid>
    );
}

export default OlympiadDetails;