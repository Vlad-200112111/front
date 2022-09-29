import React from 'react';
import useStylesMain from "../../../../Styles/MainStyles";
import {useState} from "react";
import Grow from "@mui/material/Grow";
import {Accordion, AccordionDetails, AccordionSummary, Button, Typography} from "@material-ui/core";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import DownloadIcon from "@mui/icons-material/Download";
import {useSnackbar} from "notistack";
import PortfolioStyles from "../../../../Styles/PortfolioStyles";

function PortfolioLineView(props) {
    const classesMain = useStylesMain()
    const { enqueueSnackbar } = useSnackbar();
    const classesPortfolio = PortfolioStyles()

    const [expanded, setExpanded] = useState(false);
    const dateOptions = {
        year: 'numeric',
        month: 'numeric',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
    }
    const handleChangeAccordion = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };
    async function downloadFile(event) {
        event.stopPropagation()
        const File = props.itemAchievements.file
        const FormatFile = File.slice(File.indexOf('/')+1,File.indexOf(';'))

        enqueueSnackbar(`Скачивание файла ${props.itemAchievements.name}.${FormatFile}`,{ autoHideDuration: 3500, variant:'info' });
        const FileSaver = require('file-saver');
        const base64Response = await fetch(File);
        const blob = await base64Response.blob();
        FileSaver.saveAs(blob, `${props.itemAchievements.name}.${FormatFile}`);
    }
    return (<>

            <Grow in={props.grow}
                  style={{ transformOrigin: '0 0 0' }}
                  {...(props.grow ? { timeout: props.timeout } : {})}
            >
                <Accordion key={props.itemAchievements.name} style={{marginTop: '15px'}}
                           expanded={expanded === `panel${props.itemAchievements.id}`}
                           onChange={handleChangeAccordion(`panel${props.itemAchievements.id}`)}
                >
                    <AccordionSummary className={classesMain.TextWhite}
                                      expandIcon={<ExpandMoreIcon className={classesMain.TextWhite}/>}
                    >
                        
                        <Typography style={{overflowWrap:'break-word',textOverflow:'ellipsis'}} gutterBottom
                                    variant="body2" component="div">
                            Создано:
                            {' '+new Date(props.itemAchievements.created).toLocaleDateString("ru-Ru", dateOptions)}
                            <br/>
                            Обновлено:{' '+new Date(props.itemAchievements.updated).toLocaleDateString("ru-Ru", dateOptions)}
                            <br/>
                            <span style={{overflowWrap:'anywhere',textOverflow:'ellipsis' }}>
                            Название: {props.itemAchievements.name}

                            </span>
                        </Typography>
                        <div style={{display:'flex', alignItems:'center'}}>
                            <DownloadIcon  className={[classesMain.IconForDocument, classesPortfolio.DownloadLineViewButton].join(' ')}
                                           onClick={downloadFile}/>
                        </div>
                    </AccordionSummary>
                    <AccordionDetails style={{justifyContent: 'space-between', flexDirection:'column'}}>
                        <Typography className={classesMain.TextWhite} style={{overflowWrap:'anywhere'}}
                                     variant="body2" >
                            Описание: {props.itemAchievements.description}
                        </Typography>

                    </AccordionDetails>
                </Accordion>
            </Grow>
        </>

    )
}

export default PortfolioLineView;