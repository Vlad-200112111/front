import React, {useEffect} from 'react';
import {Grid, Stack} from "@mui/material";
import {Box, Button, MenuItem, Typography} from "@material-ui/core";
import useStylesMain from "../../../../../Styles/MainStyles";
import CustomInput from "../../../../UI/CustomInput/CustomInput";
import CustomTextarea from "../../../../UI/CustomTextarea/CustomTextarea";
import CustomDesktopDatePicker from "../../../../UI/CustomDesktopDatePicker/CustomDesktopDatePicker";
import CustomAutocomplete from "../../../../UI/CustomAutocomplete/CustomAutocomplete";
import Cookies from "js-cookie";
import api from "../../../../../Services/api";
import {useState} from "react";
import {useSnackbar} from "notistack";
import pdf from '../../../../../Assets/Image/Portfolio/BigPdf.svg'
import useStylesCourses from "../../../../../Styles/CoursesStyles";
import {useNavigate, useParams} from "react-router-dom";
import Tooltip from "@mui/material/Tooltip";
import CloseIcon from "@mui/icons-material/Close";
import CircularProgress from "@mui/material/CircularProgress";
import CustomTimePicker from "../../../../UI/CustomTimePicker/CustomTimePicker";
import AttachFileIcon from '@mui/icons-material/AttachFile';
import CustomSelect from "../../../../UI/CustomSelect/CustomSelect";
import CustomFormGenerator from "../../../../UI/CustomFormGenerator/CustomFormGenerator";
import CustomModal from "../../../../UI/CustomModal/CustomModal";
import CustomFullScreenDialog from "../../../../UI/CustomFullScreenDialog/CustomFullScreenDialog";
import ItemAccordionShowTask from "../ShowTask/ItemAccordionShowTask";
import CustomAccordion from "../../../../UI/CustomAccordion/CustomAccordion";
import Grow from "@mui/material/Grow";
import ImageExercise from "../ShowTask/ImageExercise";

function CreateTask(props) {
    const classesMain = useStylesMain()
    const params = useParams()
    const token = Cookies.get("auth-token");
    const idTopic = params.idTopic
    const classesCourses = useStylesCourses()
    const [grow, setGrow] = useState(true)
    const [topicName, setTopicName] = useState('')
    const [open, setOpen] = useState(false);
    //theme
    const [themeName, setThemeName] = useState('')
    const [themeDesc, setThemeDesc] = useState('')
    const [occupation, setOccupation] = useState('')
    const [occupations, setOccupations] = useState([])
    const [linksList, setLinksList] = useState([])
    const [studyLoad, setStudyLoad] = useState([])
    const [files, setFiles] = useState([])
    const [fileLoading, setFileLoading] = useState(false)
    const [nameFile, setNameFile] = useState('')
    const [link, setLink] = useState('')

    const {enqueueSnackbar} = useSnackbar();


    useEffect(async () => {
        const {data: TopicName} = await api.courses.getTopicById(idTopic)
        setTopicName(TopicName)

        const {data: Occupations} = await api.courses.getOccupations()
        setOccupations(Occupations)
        setOccupation(Occupations[0].id)


        const {data: StudyLoad} = await api.courses.getStudyLoad(idTopic)
        setStudyLoad(StudyLoad)
    }, [])


    async function sendTask(event) {
        event.preventDefault()
        const formData = new FormData(event.target)
        await api.courses.postStudyLoad(
            {
                token: token,
                name: formData.get('name'),
                description: formData.get('description'),
                idOccupations: occupation,
                idTopic: idTopic,
                dataStart: formData.get('dataStart'),
                dataEnd: formData.get('dataEnd'),
                employeeDocuments: files?.map((item, index) => ({
                            document: item.path
                        }
                    )
                )
            }
        )
        setOpen(false)
        const {data: StudyLoad} = await api.courses.getStudyLoad(idTopic)
        setStudyLoad(StudyLoad)
        setThemeDesc('')
        setThemeName('')
        setFiles([])

    }

    function formatBytes(bytes, decimals = 2) {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const dm = decimals < 0 ? 0 : decimals;
        const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
    }

    const changeFile = async (event) => {
        setFileLoading(true)
        event.preventDefault()
        if (event.target.files && event.target.files[0]) {
            const maxSize = 10240000
            let reader = new FileReader();
            const NameFile = event.target.value.slice(event.target.value.lastIndexOf(`\\`) + 1)
            const size = event.target.files[0].size
            if (size < maxSize) {
                setNameFile(NameFile)
                reader.readAsDataURL(event.target.files[0])
                reader.onloadstart = async () => {
                    setFileLoading(true)
                }
                reader.onload = async function (e) {

                    setFiles([...files, {
                        id: files.length > 0 ? files[files.length - 1].id + 1 : 0,
                        name: event.target.value.slice(event.target.value.lastIndexOf(`\\`) + 1),
                        ico: event.target.value.slice(event.target.value.lastIndexOf('.') + 1),
                        path: e.target.result
                    }])

                }
                reader.onloadend = () => {
                    setFileLoading(false)
                }
            } else {
                setFileLoading(false)
                enqueueSnackbar(`Файл "${NameFile}" слишком большой (${formatBytes(size)})!`, {
                    autoHideDuration: 3500,
                    variant: 'error'
                })
            }
        }
    }

    const fileDragLeave = (event) => {
        event.preventDefault()
        event.stopPropagation()
        document.querySelector('.label').classList.remove(classesCourses.fileDragOver)
    }

    function dropHandler(ev) {
        ev.preventDefault();
        setFileLoading(true)
        let tempFiles = [...files]
        let length = ev.dataTransfer.items.length
        if (ev.dataTransfer.items) {
            [...ev.dataTransfer.items].forEach((item, index) => {
                let reader = new FileReader();
                const maxSize = 10240000
                if (item.kind === 'file') {
                    const file = item.getAsFile();
                    const formatFile = file.name.slice(file.name.lastIndexOf('.') + 1)
                    if (maxSize >= file.size) {
                        if (['png', 'jpg', 'jpeg', 'gif', 'pdf', 'docx', 'doc'].indexOf(formatFile) !== -1) {
                            reader.readAsDataURL(file)
                            reader.onloadstart = async function (event) {
                                setFileLoading(true)
                            }
                            reader.onload = async function (e) {
                                setFiles([...tempFiles, {
                                    id: tempFiles.length > 0 ? tempFiles[tempFiles.length - 1].id + 1 : 0,
                                    name: file.name,
                                    ico: file.name.slice(file.name.lastIndexOf('.') + 1),
                                    path: e.target.result
                                }])
                                tempFiles = [...tempFiles, {
                                    id: tempFiles.length > 0 ? tempFiles[tempFiles.length - 1].id + 1 : 0,
                                    name: file.name,
                                    ico: file.name.slice(file.name.lastIndexOf('.') + 1),
                                    path: e.target.result
                                }]
                            }
                            reader.onloadend = async function (event) {
                                if (index === length - 1) {
                                    setTimeout(() => {
                                        setFileLoading(false)

                                    }, 1000)
                                }
                            }
                        } else {
                            enqueueSnackbar(`У файла "${file.name}" некорректный формат (${formatFile})!`, {
                                autoHideDuration: 3500,
                                variant: 'error'
                            })

                        }

                    } else {
                        enqueueSnackbar(`Файл "${file.name}" слишком большой (${formatBytes(file.size)})!`, {
                            autoHideDuration: 3500,
                            variant: 'error'
                        })
                    }

                }
            });
        }
        document.querySelector('.label').classList.remove(classesCourses.fileDragOver)

    }


    function dragOverHandler(ev) {
        ev.preventDefault();
        document.querySelector('.label').classList.add(classesCourses.fileDragOver)
    }

    return (
        <Grid container spacing={1}>
            <CustomFullScreenDialog
                maxWidth={"md"}
                fullWidthScreenDialog={true}
                fullScreenDialog={false}
                titleCustomFullScreenDialog='Создание учебной нагрузки для раздела'
                setOpenCustomFullScreenDialog={
                    () => {
                        setOpen(false)
                        setThemeDesc('')
                        setThemeName('')
                        setFiles([])
                    }
                }
                openCustomFullScreenDialog={open}
                scrollType='body'>
                <Box sx={{m: 8}}>
                    <form onSubmit={sendTask}>
                        <Grid style={{display: 'flex', justifyContent: "space-around"}} container>
                            <Grid item xs={12} md={12}>
                                <Grid
                                    container
                                    direction="column"
                                    justifyContent="flex-start"
                                    alignItems="flex-start"
                                    spacing={1}
                                >
                                    <CustomSelect
                                        required={true}
                                        xs={12}
                                        contentCustomSelect="Тип"
                                        setValueSelect={(event) => setOccupation(event.target.value)}
                                        valueSelect={occupation}
                                    >
                                        {
                                            occupations.map(item =>
                                                <MenuItem className={classesMain.SelectItems}
                                                          value={item.id} key={item.id}>{item.name}</MenuItem>
                                            )
                                        }
                                    </CustomSelect>
                                    <CustomInput
                                        required={true}
                                        name={'name'}
                                        label='Название'
                                        customValueInput={themeName}
                                        setCustomValueInput={(e) => setThemeName(e.target.value)}/>
                                    <CustomTextarea
                                        required={true}
                                        nameCustomTextarea={'description'}
                                        label='Описание'
                                        valueCustomTextarea={themeDesc}
                                        setValueCustomTextarea={(e) => setThemeDesc(e.target.value)}/>
                                    <CustomDesktopDatePicker
                                        required={true}
                                        name={'dataStart'}
                                        label='Дата начала'
                                    />
                                    <CustomDesktopDatePicker
                                        required={true}
                                        name={'dataEnd'}
                                        label='Дата окончания'
                                    />
                                    <Grid item xs={12}>
                                        <Typography>Дополнительные файлы: </Typography>
                                    </Grid>
                                    <div
                                        className="load-file-form"
                                        style={{width: '100%'}}
                                        onDrop={(event) => dropHandler(event)}
                                        onDragOver={(event) => dragOverHandler(event)}
                                        onDragLeave={fileDragLeave}>
                                        <div className="form-group">
                                            <div className={'drag-file-label'}>

                                                <label className="label"
                                                       style={{
                                                           display: 'flex',
                                                           flexDirection: 'column',
                                                           justifyContent: 'center',
                                                           alignItems: 'center'
                                                       }}>
                                                    {
                                                        files.length === 0 ?
                                                            <AttachFileIcon
                                                                style={
                                                                    {
                                                                        width: '90px',
                                                                        height: '90px',
                                                                        color: 'darkgrey'
                                                                    }
                                                                }/>
                                                            :
                                                            <>
                                                                <Stack spacing={1} direction={"row"}>
                                                                    {
                                                                        files?.map(item =>
                                                                            <>
                                                                                <ImageExercise files={files}
                                                                                               setFiles={setFiles}
                                                                                               item={item}/>
                                                                            </>
                                                                        )
                                                                    }
                                                                </Stack>
                                                            </>
                                                    }

                                                    <span
                                                        style={{
                                                            marginTop: 10,
                                                            overflowWrap: 'break-word',
                                                            wordBreak: 'break-all'
                                                        }}
                                                        className="title">
                                                    {'Кликните, чтобы добавить файл или перенесите файл в выделенную область'}
                                                </span>
                                                    <input
                                                        type="file"
                                                        hidden
                                                        id="uploadFile"
                                                        accept=".docx, .pdf,.doc,.img,.png,.jpg,.jpeg"
                                                        name="file"
                                                        onChange={changeFile}
                                                    />
                                                </label>
                                            </div>
                                        </div>
                                    </div>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid
                            style={{marginTop: 10}}
                            container
                            direction="row-reverse">
                            <Grid item>

                                <Button
                                    variant="contained"
                                    type={'submit'}
                                    className={classesMain.button}
                                >
                                    Добавить
                                </Button>

                            </Grid>
                        </Grid>
                    </form>
                </Box>
            </CustomFullScreenDialog>


            <Grid item xs={12}>
                <Typography style={{textAlign: "center"}} className={classesMain.Title}>
                    Задания для раздела<br/> "{topicName}"
                </Typography>
            </Grid>
            <Grid style={{display: 'flex', justifyContent: 'flex-start'}} item xs={12}>
                <Button className={classesMain.button} onClick={() => setOpen(true)}>
                    Добавить
                </Button>
            </Grid>
            <Grid item xs={12}>
                {
                    studyLoad?.map((item, index) =>
                        <CustomAccordion
                            title={`Раздел: ${item.name}`}
                            content={
                                <Grid
                                    container
                                    direction="row"
                                    justifyContent="space-between"
                                    alignItems="flex-start"
                                >
                                    <Grid item xs={12}>
                                        <Stack spacing={1}>
                                            <Typography
                                                align={'justify'}
                                                style={{fontSize: 20}}
                                                className={classesMain.Text}>
                                                Тип занятия: {item.nameOccupations}
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
                                </Grid>
                            }
                        />
                    )
                }
            </Grid>
        </Grid>
    );
}

export default CreateTask;