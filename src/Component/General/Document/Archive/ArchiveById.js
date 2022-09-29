import React from 'react';
import {useState, useEffect} from "react";
import api from "../../../../Services/api";
import {Link, useParams} from "react-router-dom";
import {Box, Button, Stack} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import useStylesMain from "../../../../Styles/MainStyles";
import MainDocuments from "../../../Modules/MainDocuments/MainDocuments";
import {Grid, Typography} from "@material-ui/core";
import Divider from "@mui/material/Divider";
import useStylesDocumentsStyles from "../../../../Styles/DocumentsStyles";
import CircularProgress from "@mui/material/CircularProgress";

function ArchiveById(props) {
    const classesMain = useStylesMain()
    const classesDocumentsStyles = useStylesDocumentsStyles()
    const params = useParams()
    const idDocument = params.idArchive
    const dateOptions = {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric'
    }

    const [objectArchiveById, setObjectArchiveById] = useState([])
    const [nameFile, setNameFile] = useState('')
    const [file, setFile] = useState('')

    useEffect(async () => {
        const {data: ArchiveById} = await api.documents.getArchiveById(idDocument)
        setObjectArchiveById(ArchiveById)
        setFile(ArchiveById.attachedFile)
        setNameFile(ArchiveById.attachedFileName)
    }, []);

    async function downloadFile(event) {
        const FileSaver = require('file-saver');
        const base64Response = await fetch(file);
        const blob = await base64Response.blob();
        FileSaver.saveAs(blob, nameFile);
    }

    return (
        <MainDocuments>
            <Link to={`/documents/archive`}
                  style={{textDecoration: 'none', color: '#fff'}}>
                <Button className={classesMain.button} variant="contained" startIcon={<ArrowBackIcon/>}>
                    Вернуться к списку
                </Button>
            </Link>

            {
                objectArchiveById.length === 0 ?
                    <Grid
                        container
                        direction="row"
                        justifyContent="flex-start"
                        alignItems="flex-start"
                    >
                        <Grid item
                              style={{
                                  marginLeft: 'auto',
                                  marginRight: 'auto',
                                  marginTop: 100
                              }}>
                            <CircularProgress/>
                        </Grid>
                    </Grid> :
                    <Box style={{width: '80%', marginRight: 'auto', marginLeft: 'auto', marginTop: '50px'}}>
                        <Grid
                            container
                            direction="row"
                            justifyContent="flex-start"
                            alignItems="flex-start"
                        >
                            <Grid item xs={12} md={4} xl={4}>
                                <Grid
                                    container
                                    direction="column"
                                    justifyContent="flex-start"
                                    alignItems="flex-start"
                                    spacing={1}
                                >
                                    <Grid item>
                                        <Typography display="block"
                                                    style={{fontSize: 16}}
                                                    variant="overline"
                                                    className={classesDocumentsStyles.captionText}
                                                    gutterBottom>
                                            Тип: {objectArchiveById.documentType}
                                        </Typography>
                                    </Grid>
                                    <Grid item>
                                        <Typography display="block"
                                                    style={{fontSize: 16}}
                                                    variant="overline"
                                                    className={classesDocumentsStyles.captionText}
                                                    gutterBottom>
                                            Статус: {objectArchiveById.documentStatus}
                                        </Typography>
                                    </Grid>
                                    <Grid item>
                                        <Typography display="block"
                                                    style={{fontSize: 16}}
                                                    variant="overline"
                                                    className={classesDocumentsStyles.captionText}
                                                    gutterBottom>
                                            Создано: {new Date(objectArchiveById.created).toLocaleDateString("ru-Ru", dateOptions)}
                                        </Typography>
                                    </Grid>
                                    <Grid item>
                                        <Typography display="block"
                                                    style={{fontSize: 16}}
                                                    variant="overline"
                                                    className={classesDocumentsStyles.captionText}
                                                    gutterBottom>
                                            Обновлено: {new Date(objectArchiveById.updated).toLocaleDateString("ru-Ru", dateOptions)}
                                        </Typography>
                                    </Grid>
                                    <hr className={classesDocumentsStyles.hrLine}/>
                                    {
                                        objectArchiveById.documentStatusId === 3 ?
                                            <Grid item xs={11} style={{width: '100%'}}>
                                                <Grid item
                                                      xs={12}>
                                                    <Button
                                                        className={classesMain.button}
                                                        variant="contained"
                                                        style={{width: '100%'}}
                                                        onClick={(event) => downloadFile(event)}>
                                                        Скачать файл
                                                    </Button>
                                                </Grid>
                                            </Grid> : ''

                                    }
                                </Grid>
                            </Grid>
                            <Divider orientation="vertical" flexItem/>
                            <Grid item xs={12} md={7} xl={7} style={{margin: 20}}>
                                <Grid
                                    container
                                    direction="column"
                                    justifyContent="center"
                                    alignItems="stretch"
                                    spacing={2}
                                >
                                    <Grid item style={{width: '100%'}}>
                                        <Stack spacing={3}>
                                            {
                                                objectArchiveById.comment.length === 0 ? '' :
                                                    <div>
                                                        <Typography variant="overline"
                                                                    className={classesDocumentsStyles.overlineText}
                                                                    display="block"
                                                                    style={{lineHeight: '5px'}}
                                                                    gutterBottom>
                                                            Комментарий:
                                                        </Typography>
                                                        <Typography variant="body1"
                                                                    style={{wordBreak: 'break-all'}}
                                                                    className={classesDocumentsStyles.overlineText}
                                                                    display="block"
                                                                    gutterBottom>
                                                            {objectArchiveById.comment}
                                                        </Typography>
                                                    </div>
                                            }

                                            {
                                                objectArchiveById.fields?.map(item =>
                                                    <div>
                                                        <Typography variant="overline"
                                                                    className={classesDocumentsStyles.overlineText}
                                                                    display="block"
                                                                    style={{lineHeight: '5px'}}
                                                                    gutterBottom>
                                                            {item.name}
                                                        </Typography>
                                                        <Typography variant="body1"
                                                                    className={classesDocumentsStyles.overlineText}
                                                                    display="block"
                                                                    gutterBottom>
                                                            {item.value}
                                                        </Typography>
                                                    </div>
                                                )
                                            }
                                        </Stack>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Box>
            }

        </MainDocuments>
    );
}

export default ArchiveById;