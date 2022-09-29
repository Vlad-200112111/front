import React from 'react';
import useStylesMain from "../../../Styles/MainStyles";
import {useState} from "react";
import {Grid, Typography} from "@material-ui/core";
import Button from "@mui/material/Button";
import {Link} from "react-router-dom";
import {Timeline, TimelineConnector, TimelineContent, TimelineDot, TimelineItem, TimelineSeparator} from "@mui/lab";
import {useEffect} from "react";
import api from "../../../Services/api";
import Cookies from "js-cookie";
import CustomInput from "../../UI/CustomInput/CustomInput";
import {useNavigate} from "react-router-dom";
import Box from "@mui/material/Box";
import CustomFullScreenDialog from "../../UI/CustomFullScreenDialog/CustomFullScreenDialog";
import CustomIconButton from "../../UI/CustomIconButton/CustomIconButton";
import EditIcon from '@mui/icons-material/Edit';
import {Stack} from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import CustomDialog from "../../UI/CustomDialog/CustomDialog";

function CoursesModal({buttonClick, open, setOpen, item, Token}) {
    const classesMain = useStylesMain()
    const navigate = useNavigate()
    const [structure, setStructure] = useState([])
    const [nameTopic, setNameTopic] = useState('')
    const [number, setNumber] = useState('')
    const [idTopic, setIdTopic] = useState('')
    const [handleDialog, setHandleDialog] = useState(false)

    const handleClose = () => setOpen(false)

    const goToCourse = () => {
        window.open(`${item.viewurl}`, '_blank').focus()
    }

    useEffect(async () => {
        const {data: themes} = await api.courses.getTopic(item.idCourse)
        setNumber(themes.length)
        setStructure(themes)
    }, [])

    async function createTopic() {
        const {data: infoTopic} = await api.courses.postTopic(
            {
                token: Cookies.get("auth-token"),
                name: nameTopic,
                number: number + 1,
                course: item.idCourse
            }
        )
        const {data: themes} = await api.courses.getTopic(item.idCourse)
        setNumber(themes.length)
        setStructure(themes)
    }

    async function confirmDelete(){
        await api.courses.deleteTopic(item.idCourse)
        const {data: themes} = await api.courses.getTopic(item.idCourse)
        setNumber(themes.length)
        setStructure(themes)
        setHandleDialog(false)
    }

    return (
        <>
            <CustomDialog
                title={"Подверждение удаления"}
                open={handleDialog}
                setOpen={setHandleDialog}
                onConfirm={confirmDelete}
            />
            <CustomFullScreenDialog
                maxWidth={"md"}
                fullWidthScreenDialog={true}
                fullScreenDialog={false}
                titleCustomFullScreenDialog={item.name}
                setOpenCustomFullScreenDialog={handleClose}
                openCustomFullScreenDialog={open}
                scrollType='body'>
                <Box sx={{m: 8}}>
                    <Grid
                        container
                        direction="column"
                        spacing={3}
                    >
                        <Grid container spacing={3}>
                            <Grid item xs={12}>
                                <Typography style={{textAlign: 'left'}} className={classesMain.Text}>
                                    Контрольная точка: {item.nameControlPointType}
                                </Typography>
                            </Grid>

                            <Grid style={{paddingBottom: '0', paddingTop: '0'}} item xs={12}>
                                <Typography variant={'h6'} className={classesMain.Text}
                                            style={{textAlign: 'left', fontWeight: '600'}}>Структура курса</Typography>

                            </Grid>
                            <Grid style={{
                                marginBottom: '20px',
                                paddingTop: '0',
                                display: 'flex',
                                justifyContent: 'flex-start',
                                flexDirection: 'column',
                                alignItems: 'flex-start',
                                maxHeight: '400px',
                                overflowY: 'auto'
                            }} item xs={12}>
                                <Timeline position={'right'} style={{width: '100%'}}>
                                    {
                                        structure.map(item =>
                                            <TimelineItem key={item.id}>
                                                <TimelineSeparator>
                                                    <TimelineDot style={{background: 'rgb(90, 125, 205)'}}/>
                                                    <TimelineConnector/>
                                                </TimelineSeparator>
                                                <TimelineContent>
                                                    <Grid
                                                        container
                                                        direction="row"
                                                        justifyContent="space-between"
                                                        alignItems="center"
                                                        xs={12}
                                                    >
                                                        <Grid item xs={11}>
                                                            <Typography variant="h6" component="span"
                                                                        className={classesMain.Text}
                                                                        style={{textAlign: 'left', fontWeight: '600'}}>
                                                                {item.name}
                                                            </Typography>
                                                        </Grid>
                                                        <Grid item xs={1}>
                                                            <Stack spacing={2} direction={'row'}>
                                                                <CustomIconButton
                                                                    icon={<DeleteIcon/>}
                                                                    caption={'Нажмите для того, чтобы удалить!'}
                                                                    inputFunction={()=>setHandleDialog(true)}
                                                                />
                                                                <Link
                                                                    style={{textDecoration: 'none'}}
                                                                    to={`/create-task/${item.id}`}>
                                                                    <CustomIconButton
                                                                        icon={<EditIcon/>}
                                                                        caption={'Нажмите для того, чтобы редактировать!'}
                                                                    />
                                                                </Link>
                                                            </Stack>
                                                        </Grid>
                                                    </Grid>
                                                </TimelineContent>
                                            </TimelineItem>
                                        )
                                    }
                                    <TimelineSeparator>
                                        <TimelineDot style={{background: 'rgb(90, 125, 205)'}}/>
                                    </TimelineSeparator>
                                </Timeline>

                            </Grid>
                            <Grid style={{paddingBottom: '0', paddingTop: '0'}} item xs={12}>
                                <Typography variant={'h6'} className={classesMain.Text}
                                            style={{textAlign: 'left', fontWeight: '600'}}>Добавление раздела</Typography>

                            </Grid>
                            <CustomInput
                                xs={12}
                                label='Введите название раздела'
                                customValueInput={nameTopic}
                                setCustomValueInput={(e) => setNameTopic(e.target.value)}
                            />
                            <Grid item xs={12} style={{display: 'flex', justifyContent: 'flex-end'}}>
                                <Button onClick={createTopic} className={classesMain.button}>
                                    Добавить
                                </Button>
                            </Grid>
                        </Grid>
                    </Grid>
                </Box>
            </CustomFullScreenDialog>
        </>

    )
}

export default CoursesModal;