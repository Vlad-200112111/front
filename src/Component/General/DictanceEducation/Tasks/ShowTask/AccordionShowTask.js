import React, {useState} from 'react';
import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Typography
} from "@material-ui/core";
import Grow from "@mui/material/Grow";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import useStylesMain from "../../../../../Styles/MainStyles";
import {Grid, Stack} from "@mui/material";
import ItemAccordionShowTask from "./ItemAccordionShowTask";
import CustomAccordion from "../../../../UI/CustomAccordion/CustomAccordion";

function AccordionShowTask({item}) {
    const classesMain = useStylesMain()

    return (
                <CustomAccordion
                    title={`Раздел: ${item.nameTopic}`}
                    content={
                        <Grid
                            container
                            direction="row"
                            justifyContent="space-between"
                            alignItems="flex-start"
                        >
                            <Grid item xs={12}>
                                {
                                    item.studyLoad.length !== 0 ?
                                        <Stack spacing={3}>
                                            {
                                                item.studyLoad?.map(itemStudyLoad =>
                                                    <ItemAccordionShowTask item={itemStudyLoad}/>
                                                )
                                            }
                                        </Stack> :
                                        <Typography
                                            style={{fontSize: 20}}
                                            className={classesMain.Text}>
                                            Нет учебных материалов!
                                        </Typography>
                                }
                            </Grid>
                        </Grid>
                    }
                />
    );
}

export default AccordionShowTask;