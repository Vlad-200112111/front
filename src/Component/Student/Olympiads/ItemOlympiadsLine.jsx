import React from 'react';
import {Accordion, AccordionDetails, AccordionSummary, Button, Chip, Typography} from "@material-ui/core";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import useStylesMain from "../../../Styles/MainStyles";
import {useState} from "react";

function ItemOlympiadsLine({item,image}) {
    const classesMain = useStylesMain()
    const [expanded, setExpanded] = useState(false);


    const handleChangeAccordion = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };


    return (
        <Accordion key={item.name} style={{marginTop: '15px'}}
                   expanded={expanded === `panel${item.id}`}
                   onChange={handleChangeAccordion(`panel${item.id}`)}
        >
            <AccordionSummary className={classesMain.TextWhite}
                              expandIcon={<ExpandMoreIcon className={classesMain.TextWhite}/>}
            >
                <Typography>{item.name}</Typography>

            </AccordionSummary>
            <AccordionDetails style={{justifyContent: 'space-between', flexDirection:'column'}}>
                <div>
                    <Typography className={classesMain.TextWhite}>{item.datestart}-{item.datestart}</Typography>
                    <img src={image} style={{maxWidth:'300px'}}/>

                    <Typography style={{maxWidth:'100%', overflowWrap:'break-word'}} className={classesMain.TextWhite}>
                        Описание: {item.description.length>1?
                        item.description.length>100?
                            item.description.slice(0,100)+'...'
                            :
                            item.description
                        :'Отсутствует'}
                    </Typography>
                </div>
                <div></div>
                <br/>
                <Button style={{maxWidth:'100px'}} className={classesMain.SecondButton} onClick={()=>window.location=`/olympiad-details/${item.id}`}>Перейти</Button>
            </AccordionDetails>
        </Accordion>
    );
}

export default ItemOlympiadsLine;