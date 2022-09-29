import React from 'react';
import useStylesMain from "../../../../../Styles/MainStyles";
import Box from "@mui/material/Box";
import {Button, Grid, Stack} from "@mui/material";
import {Typography} from "@material-ui/core";
import DownloadIcon from '@mui/icons-material/Download';
import CustomIconButton from "../../../../UI/CustomIconButton/CustomIconButton";

function ItemAccordionShowTask({item}) {
    const classesMain = useStylesMain()

    async function downloadFile() {
        const FileSaver = require('file-saver');
        for (let i = 0; i < item.employeeDocuments.length; i++) {
            const base64Response = await fetch(item.employeeDocuments[i].document);
            const blob = await base64Response.blob();
            FileSaver.saveAs(blob, 'Файл');
        }
    }

    return (
        <>
            <Box style={{width: '100%', padding: 10}}>
                <Grid
                    container
                    direction="row"
                    justifyContent="space-between"
                    alignItems="center"
                    spacing={2}
                >
                    <Grid item xs={11}>
                        <Stack spacing={1}>
                            <Typography
                                align={'justify'}
                                style={{fontSize: 20}}
                                className={classesMain.Text}>
                                Тип занятия: {item.name}
                            </Typography>
                            <Typography
                                align={'justify'}
                                className={classesMain.Text}>
                                Описание: {item.description}
                            </Typography>
                            <Typography
                                align={'justify'}
                                className={classesMain.Text}>
                                Дата начала: {item.dataStart}
                            </Typography>
                            <Typography
                                align={'justify'}
                                className={classesMain.Text}>
                                Дата окончания: {item.dataEnd}
                            </Typography>
                        </Stack>
                    </Grid>
                    <Grid item xs={1} style={{width: '100%'}}>
                        <div style={{marginLeft: 10}}>
                            <CustomIconButton
                                icon={<DownloadIcon/>}
                                caption={'Скачать файлы занятия!'}
                                inputFunction={(event) => downloadFile(event)}
                            />
                        </div>
                    </Grid>
                </Grid>
            </Box>
        </>
    );
}

export default ItemAccordionShowTask;