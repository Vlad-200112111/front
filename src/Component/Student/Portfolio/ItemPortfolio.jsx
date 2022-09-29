import Card from "@mui/material/Card";
import {CardActionArea, Checkbox} from "@mui/material";
import CardMedia from "@mui/material/CardMedia";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import CardContent from "@mui/material/CardContent";
import {Grid, MenuItem, Typography} from "@material-ui/core";
import PortfolioStyles from "../../../Styles/PortfolioStyles";
import api from "../../../Services/api";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import CustomInput from "../../UI/CustomInput/CustomInput";
import CustomTextarea from "../../UI/CustomTextarea/CustomTextarea";
import CustomSelect from "../../UI/CustomSelect/CustomSelect";
import CustomModal from "../../UI/CustomModal/CustomModal";
import {useEffect, useState} from "react";
import MainStyles from "../../../Styles/MainStyles";
import CustomDialog from "../../UI/CustomDialog/CustomDialog";
import DownloadIcon from "@mui/icons-material/Download";
import {useSnackbar} from 'notistack';
import pdf from '../../../Assets/Image/Portfolio/pdf.svg'
import Grow from '@mui/material/Grow';
import {memo} from "react";
import {useParams} from "react-router-dom";
import FormControlLabel from "@mui/material/FormControlLabel";
import CustomFullScreenDialog from "../../UI/CustomFullScreenDialog/CustomFullScreenDialog";
import DeleteIcon from "@mui/icons-material/Delete";
import CustomIconButton from "../../UI/CustomIconButton/CustomIconButton";
import React from "react";

const ItemPortfolio = (props) => {
    const params = useParams()

    const classesMain = MainStyles()
    const classesPortfolio = PortfolioStyles()
    const userId = params.userId;

    const [ShowMoreImage, setShowMoreImage] = useState('')
    const [showMoreName, setShowMoreName] = useState('')
    const [showMoreDesc, setShowMoreDesc] = useState('')
    const [showMoreCategory, setShowMoreCategory] = useState('')
    const [showMore, setShowMore] = useState(false);
    const [chosenAchievement, setChosenAchievement] = useState('')
    const handleShowMoreClose = () => setShowMore(false)
    const [handleDialog, setHandleDialog] = useState(false)
    const [addToProfile, setAddToProfile] = useState(false)
    const [isPdf, setIsPdf] = useState(false)
    const [fileName, setFileName] = useState(props.itemAchievements.fileName)
    const [dialogContent, setDialogContent] = useState({title: '', content: ''})
    const {enqueueSnackbar} = useSnackbar();


    const editAchievement = async () => {
        let valid = 3
        if (ShowMoreImage.length < 1) {
            enqueueSnackbar('Изображение не загрзужено', {variant: 'error'})
            valid -= 1
        }

        if (showMoreName.length < 1) {
            enqueueSnackbar('Название не заполнено', {variant: 'error'})
            valid -= 1


        }
        if (showMoreDesc.length < 1) {
            enqueueSnackbar('Описание не заполнено', {variant: 'error'})
            valid -= 1

        }
        if (valid === 3) {
            setShowMore(false)
            setDialogContent({
                method: 'edit',
                title: 'Изменение информации',
                content: 'Вы действительно хотите сохранить изменения?'
            })
            setHandleDialog(true)
        }

    }

    const removeAchievement = async () => {
        setDialogContent({
            method: 'del',
            title: 'Удаление информации',
            content: 'Вы действительно хотите удалить достижение?'
        })
        setHandleDialog(true)

    }

    function onloadImageForShowMore(event) {
        if (event.target.files && event.target.files[0]) {
            const reader = new FileReader();
            const maxSize = 10240000
            reader.onload = function (e) {
                if (event.target.files[0].size > maxSize) {
                    enqueueSnackbar('Изображение не должно превышать 10мб', {variant: 'error'})
                    let img = document.getElementById('uploadPhoto')
                    img.value = null

                } else {
                    if (e.target.result.slice(e.target.result.indexOf('/') + 1, e.target.result.indexOf(';')) === 'pdf') {
                        setIsPdf(true)
                        setShowMoreImage(e.target.result)
                        setFileName(event.target.files[0].name)

                    } else {
                        setIsPdf(false)
                        setFileName(event.target.files[0].name)
                        setShowMoreImage(e.target.result)

                    }

                }
            }
            reader.readAsDataURL(event.target.files[0]);
        }
    }

    const showEditAchievement = (itemAchievements) => {
        setChosenAchievement(itemAchievements)
        setShowMore(true)
        setShowMoreImage(itemAchievements.file)
        setShowMoreName(itemAchievements.name)
        setShowMoreDesc(itemAchievements.description)
        setShowMoreCategory(itemAchievements.categoryId)
    }

    const saveEditAchievement = async () => {
        setShowMore(false)
        props?.setDeleted(true)
        props.setAchievements(props.achievements.map(achieve => achieve.id === chosenAchievement.id ? {
            id: chosenAchievement.id,
            categoryId: showMoreCategory,
            name: showMoreName,
            description: showMoreDesc,
            file: ShowMoreImage,
            fileName: fileName,
            created: achieve.created,
            updated: new Date()
        } : achieve))
        setChosenAchievement({...chosenAchievement, userId: props.userId})


        await api.portfolio.changesAchievement({

            categoryId: showMoreCategory,
            name: showMoreName,
            description: showMoreDesc,
            token: props.token,
            file: ShowMoreImage,
            fileName: fileName
        }, chosenAchievement.id)
        props?.setDeleted(false)

    }

    const delAchievement = async () => {
        await api.portfolio.deleteAchievement(props.itemAchievements.id)
        props?.onDelete()
    }

    const confirmEditAchievement = async () => {
        if (dialogContent.method === 'edit') {
            saveEditAchievement()
        } else if (dialogContent.method === 'del') {
            delAchievement()
        } else {
            setShowMore(true)
        }

    }

    async function downloadFile() {
        const File = props.itemAchievements.file
        const FormatFile = File.slice(File.indexOf('/') + 1, File.indexOf(';'))

        enqueueSnackbar(`Скачивание файла ${props.itemAchievements.name}.${FormatFile}`, {
            autoHideDuration: 3500,
            variant: 'info'
        });
        const FileSaver = require('file-saver');
        const base64Response = await fetch(File);
        const blob = await base64Response.blob();
        FileSaver.saveAs(blob, `${props.itemAchievements.name}.${FormatFile}`);
    }

    useEffect(() => {
        if (props.itemAchievements.file.slice(props.itemAchievements.file.indexOf('/') + 1, props.itemAchievements.file.indexOf(';')) === 'pdf') {
            setIsPdf(true)
        } else {
            setIsPdf(false)
        }
    }, [props.itemAchievements.file])

    const dateOptions = {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
    }

    return (
        <>
            <CustomFullScreenDialog
                maxWidth={"md"}
                fullWidthScreenDialog={true}
                fullScreenDialog={false}
                titleCustomFullScreenDialog='Просмотр грамоты'
                setOpenCustomFullScreenDialog={handleShowMoreClose}
                openCustomFullScreenDialog={showMore}
                scrollType='body'>
                <Box sx={{m: 4}}>
                        <Grid container
                              direction="row"
                              justifyContent="center"
                              alignItems="center"
                              spacing={3}>
                            <Grid item xl={6} md={6} xs={12}>
                                <div>
                                    <CustomIconButton
                                        icon={<DownloadIcon/>}
                                        inputFunction={downloadFile}
                                        caption={'Нажмите для того, чтобы скачать файл!'}
                                    />
                                </div>
                                
                                <img className={classesPortfolio.ShowMoreImg}
                                     src={isPdf ? pdf : ShowMoreImage}
                                     alt={'achievement'}
                                     style={{marginTop: '0 !important'}}/>
                                <Typography style={{
                                    color: '#000',
                                    overflowWrap: 'break-word',
                                    maxWidth: '200px'
                                }}>{fileName}</Typography>
                                <label className={classesPortfolio.ShowMoreButton} htmlFor="uploadPhoto">

                                    <Button
                                        className={[classesMain.button, classesPortfolio.ShowMoreButton].join(' ')}
                                        variant="contained"
                                        component="label">
                                        {isPdf ? 'Загрузить новый pdf файл' : 'Загрузить новое изображение'}
                                        <input
                                            type="file"
                                            hidden
                                            id="updatePhoto"
                                            accept={isPdf ? "application/pdf" : "image/*"}
                                            name="updatePhoto"
                                            onChange={onloadImageForShowMore}
                                        />

                                    </Button>
                                </label>
                            </Grid>
                            <Grid item xl={6} md={6} xs={12}>
                                <Typography className={classesMain.Text}
                                            style={{overflowWrap: 'break-word', textAlign: 'left'}} gutterBottom
                                            variant="body2" component="div">
                                    Создано:
                                    {' ' + new Date(props.itemAchievements.created).toLocaleDateString("ru-Ru", dateOptions)}
                                    <br/>
                                    Обновлено:{' ' + new Date(props.itemAchievements.updated).toLocaleDateString("ru-Ru", dateOptions)}

                                </Typography>
                                <CustomInput
                                    title='Название'
                                    name='name'
                                    label='Название'
                                    customValueInput={showMoreName}
                                    setCustomValueInput={event => setShowMoreName(event.target.value)}
                                />

                                <CustomTextarea
                                    nameCustomTextarea="Description"
                                    valueCustomTextarea={showMoreDesc}
                                    label='Описание'
                                    setValueCustomTextarea={event => setShowMoreDesc(event.target.value)}
                                />
                                <CustomSelect
                                    contentCustomSelect="Категория"
                                    valueSelect={showMoreCategory}
                                    setValueSelect={event => setShowMoreCategory(event.target.value)}

                                >
                                    {
                                        props?.listCategories.map(item =>

                                            <MenuItem key={item.id} className={classesMain.SelectItems}
                                                      value={item.id}>{item.name}</MenuItem>
                                        )
                                    }
                                </CustomSelect>
                            </Grid>
                        </Grid>

                    <Grid container
                          direction="row-reverse"
                    >
                        <Grid item>
                            <Button
                                variant="contained"
                                onClick={editAchievement}
                                className={classesMain.button}
                            >
                                Изменить
                            </Button>
                        </Grid>
                    </Grid>
                </Box>
            </CustomFullScreenDialog>
            <CustomDialog
                title={dialogContent.title}
                content={dialogContent.content}
                open={handleDialog}
                setOpen={setHandleDialog}
                onConfirm={confirmEditAchievement}
            />
            <Grow in={props.grow}
                  style={{transformOrigin: '0 0 0'}}
                  {...(props.grow ? {timeout: props.timeout} : {})}
            >
                <Card style={{background: '#5A7DCF'}} className={classesPortfolio.cardMobile}>
                    <CardActionArea style={{height: '100%'}}>
                        <div style={{position: 'relative'}}>

                            
                            <CardMedia
                                style={{background: '#fff'}}
                                className={classesPortfolio.CardImage}
                                component="img"
                                image={isPdf ? pdf : props.itemAchievements.file}
                                alt="IMAGE"
                                onClick={() => {
                                    showEditAchievement(props.itemAchievements)
                                }}
                            />
                        </div>


                        {props.canDelete ?

                            <div 
                                 className={classesPortfolio.removeAchievement}>
                                <CustomIconButton
                                    icon={<CloseIcon/>}
                                    inputFunction={removeAchievement}
                                    caption={'Нажмите для того, чтобы удалить!'}
                                />
                                    <CustomIconButton
                                        icon={<DownloadIcon/>}
                                        inputFunction={downloadFile}
                                        caption={'Нажмите для того, чтобы скачать файл!'}
                                    />
                            </div> : ''}
                        <CardContent

                            className={classesPortfolio.CardContent}>
                            <Typography style={{overflowWrap: 'break-word'}} gutterBottom
                                        variant="body2" component="div">
                                Создано:
                                {' ' + new Date(props.itemAchievements.created).toLocaleDateString("ru-Ru", dateOptions)}
                                <br/>
                                Обновлено:{' ' + new Date(props.itemAchievements.updated).toLocaleDateString("ru-Ru", dateOptions)}

                            </Typography>
                            <Typography style={{overflowWrap: 'break-word'}} gutterBottom
                                        variant="h5" component="div">
                                {props.itemAchievements.name}
                            </Typography>
                            <Typography style={{overflowWrap: 'break-word'}}
                                        variant="body2">
                                {props.itemAchievements.description}
                            </Typography>
                        </CardContent>
                    </CardActionArea>
                </Card>
            </Grow>
        </>

    )
}
export default memo(ItemPortfolio)