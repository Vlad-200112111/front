import React from 'react';
import CustomFullScreenDialog from "../../../../UI/CustomFullScreenDialog/CustomFullScreenDialog";
import {Accordion, AccordionDetails, AccordionSummary, Button, Chip, Grid, Typography} from "@material-ui/core";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {Stack} from "@mui/material";
import Tooltip from "@mui/material/Tooltip";
import {Link} from "react-router-dom";
import useStylesMain from "../../../../../Styles/MainStyles";
import {useState} from "react";
import {useEffect} from "react";
import api from "../../../../../Services/api";
import {Timeline, TimelineConnector, TimelineContent, TimelineDot, TimelineItem, TimelineSeparator} from "@mui/lab";

function ItemDocumentsLineArchive(props) {
    const classesMain = useStylesMain();
    const [openCustomFullScreenDialog, setOpenCustomFullScreenDialog] = useState(false);
    const [expanded, setExpanded] = useState(false);
    const [log, setLog] = useState([]);
    const dateOptions = {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric'
    }
    const dateCreated = new Date(props.itemArchive.created)
    const dateUpdated = new Date(props.itemArchive.updated)


    useEffect(async () => {
        const {data: Log} = await api.documents.getLog(props.itemArchive.id);
        console.log(Log, 'log')
        setLog(Log)
    }, []);

    const handleChangeAccordion = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };

    function openCustomFullScreenDialogFunction() {
        setOpenCustomFullScreenDialog(true)
    }

    return (
        <>
            <CustomFullScreenDialog
                fullWidthScreenDialog={true}
                fullScreenDialog={false}
                titleCustomFullScreenDialog='История справки'
                setOpenCustomFullScreenDialog={setOpenCustomFullScreenDialog}
                openCustomFullScreenDialog={openCustomFullScreenDialog}
                scrollType='body'>


                <Timeline position={'right'} style={{margin: 20}}>

                    {
                        log.map(item =>
                            <TimelineItem key={item.id}>
                                <TimelineSeparator>
                                    <TimelineDot
                                        style={{background: 'rgb(90, 125, 205)'}}/>
                                    <TimelineConnector/>
                                </TimelineSeparator>
                                <TimelineContent>
                                    <Typography
                                        variant="h6"
                                        component="span"
                                        className={classesMain.Text}
                                        style={{textAlign: 'left', fontWeight: '600'}}>
                                        {item.action}
                                    </Typography>
                                    <Typography
                                        className={classesMain.Text}
                                        style={{textAlign: 'left'}}>
                                        ФИО: {item.userName}
                                    </Typography>
                                    <Typography
                                        className={classesMain.Text}
                                        style={{textAlign: 'left'}}>
                                        {new Date(item.date).toLocaleDateString("ru-Ru", dateOptions)}
                                    </Typography>
                                </TimelineContent>
                            </TimelineItem>
                        )
                    }

                </Timeline>


            </CustomFullScreenDialog>
            <Accordion key={props.itemArchive.documentType} style={{marginTop: '15px'}}
                       expanded={expanded === `panel${props.itemArchive.id}`}
                       onChange={handleChangeAccordion(`panel${props.itemArchive.id}`)}
            >
                <AccordionSummary className={classesMain.TextWhite}
                                  expandIcon={<ExpandMoreIcon className={classesMain.TextWhite}/>}
                >
                    <Typography>{props.itemArchive.documentType}</Typography>
                    <Chip style={{
                        background: props.itemArchive.documentStatus === "Загружен" ? '#74af27' :
                            props.itemArchive.documentStatus === "Отклонён" ? '#e64343' :
                                props.itemArchive.documentStatus === "В обработке" ? '#e3a034' :
                                    props.itemArchive.documentStatus === "Готов" ? '#74af27' : '#e3a034',
                        color: '#fff'
                    }} label={props.itemArchive.documentStatus}/>
                </AccordionSummary>
                <AccordionDetails style={{justifyContent: 'space-between', flexDirection: 'column'}}>
                    <div>
                        {
                            props.role === 'employee' ?

                                    <Typography display="block"
                                                className={classesMain.TextWhite}
                                                gutterBottom>
                                        Заказал: {props.itemDocuments?.fullName}
                                    </Typography>
                                 : ''
                        }

                        <Typography display="block" className={classesMain.TextWhite} gutterBottom>
                            Проверил: Степанов Степан Стапенович
                        </Typography>

                        <Typography display="block" className={classesMain.TextWhite} gutterBottom>
                            {/*Создано: {new Date(dateCreated).toLocaleDateString("ru-Ru", dateOptions)}*/}
                        </Typography>


                        <Typography display="block" className={classesMain.TextWhite} gutterBottom>
                            {/*Обновлено: {new Date(dateUpdated).toLocaleDateString("ru-Ru", dateOptions)}*/}
                        </Typography>

                        <Typography display="block" className={classesMain.TextWhite} gutterBottom>
                            Срок выполения: ##-##-####
                        </Typography>
                    </div>
                    <br/>
                    <Stack direction={"row"} spacing={1}>
                        <Tooltip title="Нажмите для того, чтобы перейти к более подробному описанию">
                            <Link to={`/documents/archive/${props.userId}/${props.itemArchive.id}`}
                                  style={{textDecoration: 'none'}}>
                                <Button
                                    style={{maxWidth: '100px'}}
                                    className={classesMain.SecondButton}>
                                    Подробнее
                                </Button>
                            </Link>
                        </Tooltip>
                        <Button style={{maxWidth: '150px'}} className={classesMain.SecondButton}
                                onClick={openCustomFullScreenDialogFunction}>Показать историю</Button>
                    </Stack>
                </AccordionDetails>
            </Accordion>
        </>
    );
}

export default ItemDocumentsLineArchive;