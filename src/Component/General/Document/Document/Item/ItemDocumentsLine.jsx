import React from 'react';
import useStylesMain from "../../../../../Styles/MainStyles";
import useStylesDocumentsStyles from "../../../../../Styles/DocumentsStyles";
import {useState} from "react";
import {Accordion, AccordionDetails, AccordionSummary, Button, Chip, Grid, Typography} from "@material-ui/core";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {Stack} from "@mui/material";
import CustomFullScreenDialog from "../../../../UI/CustomFullScreenDialog/CustomFullScreenDialog";
import {Link} from "react-router-dom";
import Cookies from "js-cookie";
import Tooltip from '@mui/material/Tooltip';
import {Timeline, TimelineConnector, TimelineContent, TimelineDot, TimelineItem, TimelineSeparator} from "@mui/lab";
import {useEffect} from "react";
import Grow from '@mui/material/Grow';
import api from "../../../../../Services/api";

function ItemDocumentsLine(props) {
    const classesMain = useStylesMain();
    const [expanded, setExpanded] = useState(false);
    const [openCustomFullScreenDialog, setOpenCustomFullScreenDialog] = useState(false);
    const [log, setLog] = useState([]);
    useEffect(async () => {
        const {data: Log} = await api.documents.getLog(props.itemDocuments.id);
        setLog(Log)
    }, []);
    // useEffect(async () => {
    //     const {data: ListTypes} = await api.documents.getLog();
    //     setListTypes(ListTypes)
    //     setChosenType(ListTypes[0])
    //
    //     const {data: ListDocuments} = await api.documents.getListDocumentsFromEmployer();
    //     setListDocuments(ListDocuments.reverse())
    // }, []);

    const handleChangeAccordion = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };
    const date = new Date()
    const dateCreated = new Date(props.itemDocuments.created)
    const dateUpdated = new Date(props.itemDocuments.updated)
    const readyDate = new Date(props.itemDocuments.readyDate)
    const termDate = date.setDate(date.getDate() + 1) > new Date(readyDate)
    const dateOptions = {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric'
    }
    const userId = Cookies.get("userId");

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
                openCustomFullScreenDialog={openCustomFullScreenDialog}>
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
            {/*<Grow in={props.grow}*/}
            {/*      style={{ transformOrigin: '0 0 0' }}*/}
            {/*      {...(props.grow ? { timeout: props.timeout } : {})}*/}
            {/*>*/}
            <Accordion key={props.itemDocuments.documentType} style={{marginTop: '15px'}}
                       expanded={expanded === `panel${props.itemDocuments.id}`}
                       onChange={handleChangeAccordion(`panel${props.itemDocuments.id}`)}
            >
                <AccordionSummary className={classesMain.TextWhite}
                                  expandIcon={<ExpandMoreIcon className={classesMain.TextWhite}/>}
                >
                    <Typography>{props.itemDocuments.documentType}</Typography>
                    <Chip style={{
                        background: props.itemDocuments.documentStatus === "Загружен" ? '#74af27' :
                            props.itemDocuments.documentStatus === "Отклонён" ? '#e64343' :
                                props.itemDocuments.documentStatus === "В обработке" ? '#e3a034' :
                                    props.itemDocuments.documentStatus === "Готов" ? '#74af27' : '#e3a034',
                        color: '#fff'
                    }} label={props.itemDocuments.documentStatus}/>
                </AccordionSummary>
                <AccordionDetails style={{justifyContent: 'space-between', flexDirection: 'column'}}>
                    <div>
                        <Typography display="block" className={classesMain.TextWhite} gutterBottom>
                            Заказал: Иванов Иван Иванович
                        </Typography>

                        <Typography display="block" className={classesMain.TextWhite} gutterBottom>
                            Проверил: Степанов Степан Стапенович
                        </Typography>

                        <Typography display="block" className={classesMain.TextWhite} gutterBottom>
                            Создано: {new Date(dateCreated).toLocaleDateString("ru-Ru", dateOptions)}
                        </Typography>


                        <Typography display="block" className={classesMain.TextWhite} gutterBottom>
                            Обновлено: {new Date(dateUpdated).toLocaleDateString("ru-Ru", dateOptions)}
                        </Typography>

                        <Typography display="block" className={classesMain.TextWhite} gutterBottom>
                            Срок выполнения: {new Date(readyDate).toLocaleDateString("ru-Ru", dateOptions)}
                            {termDate ? <span> - Срок выполнения подходит к концу</span> : ''}
                        </Typography>
                    </div>
                    <br/>
                    <Stack direction={"row"} spacing={1}>
                        <Tooltip title="Нажмите для того, чтобы перейти к более подробному описанию">
                            <Link to={`/documents${props.userId}/${props.itemDocuments.id}`}
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
            {/*</Grow>*/}
        </>
    );
}

export default ItemDocumentsLine;