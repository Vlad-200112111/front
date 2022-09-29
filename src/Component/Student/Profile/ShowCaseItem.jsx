import React, {useEffect, useState} from 'react';
import {CardActionArea, Grid, Pagination} from "@mui/material";
import DownloadIcon from "@mui/icons-material/Download";
import CardMedia from "@mui/material/CardMedia";
import pdf from "../../../Assets/Image/Portfolio/pdf.svg";
import CardContent from "@mui/material/CardContent";
import {MenuItem, Typography} from "@material-ui/core";
import Card from "@mui/material/Card";
import {useSnackbar} from "notistack";
import useStylesPortfolio from "../../../Styles/PortfolioStyles";
import useStylesMain from "../../../Styles/MainStyles";
import CustomModal from "../../UI/CustomModal/CustomModal";
import Box from "@mui/material/Box";

import CloseIcon from "@mui/icons-material/Close";
import api from "../../../Services/api";
import CustomDialog from "../../UI/CustomDialog/CustomDialog";
import {useParams} from "react-router-dom";
import Cookies from "js-cookie";
import CircularProgress from "@mui/material/CircularProgress";
import loagingGif from '../../../Assets/Image/loading.gif'

import {memo} from "react";
import CustomFullScreenDialog from "../../UI/CustomFullScreenDialog/CustomFullScreenDialog";
import CustomIconButton from "../../UI/CustomIconButton/CustomIconButton";

function ShowCaseItem({
                          item,
                          defaultImage,
                          categoryId,
                          setItems,
                          items,
                          image,
                          canRead,
                          canDelete,
                          canUpdate,
                          canCreate,
                          setCategiries,
                          categories
                      }) {
    const {enqueueSnackbar} = useSnackbar();
    const classesPortfolio = useStylesPortfolio()
    const classesMain = useStylesMain()
    const [modal, setModal] = useState(false)
    const [hover, setHover] = useState(false)
    const [showCaseModalOpen, setShowCaseModalOpen] = useState(false)
    const [dialogContent, setDialogContent] = useState({title: '', content: ''})
    const [handleDialog, setHandleDialog] = useState(false)


    const [loading, setLoading] = useState(false)
    const [disabled, setDisabled] = useState(false)

    const [isPdf, setIsPdf] = useState()
    const [count, setCount] = useState()
    const [countFromBackend, setCountFromBackend] = useState()
    const [countDocument, setCountDocument] = useState(3)
    const [page, setPage] = useState(1)
    const [showCaseAchievements, setShowCaseAchivements] = useState([])


    const params = useParams()
    const studentId = params.personId


    const showCaseModal = () => {
        setShowCaseModalOpen(true)
        setLoading(true)
        getCountAchievements().then((response) => {
            setCountFromBackend(response)
            setCount(Math.ceil(Number(response) / countDocument))
        })
        getListAchievementsByStudentId().then((response) => {
            setShowCaseAchivements(response)
            setLoading(false)
        })
    }
    const removeAchievement = () => {
        setDialogContent({
            method: 'del', title: 'Удаление информации', content: 'Вы действительно хотите удалить достижение?'
        })
        setHandleDialog(true)
    }
    const delAchievement = async () => {
        setCategiries([...categories, item.categoryId])

        setItems(items.filter(el => el.id !== item.id))
        await api.portfolio.deleteShowCase(item.id, studentId)

    }
    const confirmEditAchievement = async () => {

        if (dialogContent.method === 'edit') {
            return
        } else if (dialogContent.method === 'del') {
            delAchievement()
        }

    }


    const getListAchievementsByStudentId = async () => {
        const {data: ListAchievementsByUser} = await api.portfolio.getListAchievementsByStudentId(studentId, page, countDocument, categoryId);
        setLoading(false)
        return ListAchievementsByUser
    }
    const getCountAchievements = async () => {
        const {data: Count} = await api.portfolio.getCountAchievementsByStudentId(studentId, categoryId)
        return Count
    }
    const handleChangePagination = async (event, value) => {
        setPage(value)

    }

    async function downloadFile(itemAchievements) {
        const File = itemAchievements.file
        const FormatFile = File.slice(File.indexOf('/') + 1, File.indexOf(';'))

        enqueueSnackbar(`Скачивание файла ${itemAchievements.name}.${FormatFile}`, {
            autoHideDuration: 3500, variant: 'info'
        });
        const FileSaver = require('file-saver');
        const base64Response = await fetch(File);
        const blob = await base64Response.blob();
        FileSaver.saveAs(blob, `${itemAchievements.name}.${FormatFile}`);
    }

    useEffect(async () => {
        setCount(Math.ceil(Number(countFromBackend) / countDocument))
    }, [countDocument]);
    useEffect(() => {
        setLoading(true)
        getCountAchievements().then((response) => {
            setCountFromBackend(response)
            if (Math.ceil(Number(response) / countDocument) < count && page > 1 && page === count) {
                setPage(page - 1)
            }
            setCount(Math.ceil(Number(response) / countDocument))
            getListAchievementsByStudentId().then((response) => {
                setShowCaseAchivements(response)
                setLoading(false)
            })
        })
    }, [page, countDocument, categoryId]);
    const addToShowCase = async (itemAchievements) => {
        setDisabled(true)
        await api.portfolio.postShowCase({token: Cookies.get("auth-token"), documentId: itemAchievements.id}, studentId)
        const {data: ShowCaseAchievements} = await api.portfolio.getShowCaseByStudentId(studentId)
        setShowCaseAchivements([])
        setShowCaseModalOpen(false)
        let array = ShowCaseAchievements
        let arr = [1, 2, 3]
        for (let i = 0; i < array.length; i++) {
            if (array[i].categoryId === 1) {

                arr = arr.filter(el => el !== 1)
            }
            if (array[i].categoryId === 2) {
                arr = arr.filter(el => el !== 2)

            }
            if (array[i].categoryId === 3) {
                arr = arr.filter(el => el !== 3)


            }
        }
        setCategiries(arr)
        setItems(ShowCaseAchievements)
        setDisabled(false)

    }
    return (<>
            <CustomDialog
                title={dialogContent.title}
                content={dialogContent.content}
                open={handleDialog}
                setOpen={setHandleDialog}
                onConfirm={confirmEditAchievement}
            />
            {!defaultImage ? <>

                    <CustomModal
                        open={modal}
                        handleClose={() => setModal(false)}
                    >
                        <Box className={classesPortfolio.EditAchievements}>
                            <Grid container
                                  direction="row"
                                  justifyContent="center"
                                  alignItems="center"
                                  spacing={3}>
                                <Grid item xs={6}>
                                    <div>
                                        <CustomIconButton
                                            icon={<DownloadIcon/>}
                                            inputFunction={downloadFile}
                                            caption={'Нажмите для того, чтобы скачать файл!'}
                                        />
                                    </div>
                                    <img className={classesPortfolio.ShowMoreImg}
                                         src={item.file.slice(item.file.indexOf('/') + 1, item.file.indexOf(';')) === 'pdf' ? pdf : item.file}
                                         alt={'achievement'}
                                         style={{marginTop: '0 !important'}}/>

                                </Grid>
                                <Grid item style={{
                                    display: 'flex',
                                    justifyContent: 'flex-start',
                                    flexDirection: 'column',
                                    alignItems: 'flex-start'
                                }} xs={6}>

                                    <Typography variant={'h6'} style={{
                                        textAlign: 'left', maxWidth: '300px', overflowWrap: 'break-word'
                                    }} className={classesMain.Text}> <strong>Наименование:</strong>
                                        <small>{item.name}</small></Typography>
                                    <Typography variant={'h6'} style={{
                                        textAlign: 'left', maxWidth: '300px', overflowWrap: 'break-word'
                                    }}
                                                className={classesMain.Text}><strong> Категория:</strong>
                                        <small>{categoryId === 1 ? 'Образование' : categoryId === 2 ? 'Наука' : 'Воспитание'}</small>
                                    </Typography>
                                    <Typography variant={'h6'} style={{
                                        textAlign: 'left', maxWidth: '300px', overflowWrap: 'break-word'
                                    }} className={classesMain.Text}><strong>Описание:</strong>
                                        <small>{item.description}</small> </Typography>
                                </Grid>
                            </Grid>

                        </Box>
                    </CustomModal>
                    <Grid item xs={12} style={{marginBottom: '5px'}}>
                        <Typography align={'center'} className={classesMain.Text}>
                            {categoryId === 1 ? 'Образование' : categoryId === 2 ? 'Наука' : 'Воспитание'}
                        </Typography>
                    </Grid>

                    <Card  style={{background: '#5A7DCF', height: '100%'}}
                          className={classesPortfolio.cardMobile}>
                        <CardActionArea style={{height: '100%'}}>
                            <div style={{position: 'relative', height: '320px'}}>
                                
                                <CardMedia onClick={() => setModal(true)}
                                           style={{
                                               transition: 'transform 0.25s', height: '320px', background: '#fff'
                                           }}
                                           component="img"
                                           image={item.file.slice(item.file.indexOf('/') + 1, item.file.indexOf(';')) === 'pdf' ? pdf : item.file}
                                           alt="IMAGE"
                                />
                            </div>
                            {canDelete ? <div 
                                              className={classesPortfolio.removeAchievement}>
                                <div
                                    className={classesPortfolio.removeAchievement}>
                                    <CustomIconButton
                                        icon={<CloseIcon/>}
                                        inputFunction={removeAchievement}
                                        caption={'Нажмите для того, чтобы удалить!'}
                                    />
                                    <CustomIconButton
                                        icon={<DownloadIcon/>}
                                        inputFunction={() => downloadFile(item)}
                                        caption={'Нажмите для того, чтобы скачать файл!'}
                                    />
                                </div>
                            </div> : ''}

                            <CardContent onClick={() => setModal(true)}
                                         className={classesPortfolio.CardContent}>
                                <Typography gutterBottom
                                            noWrap
                                            style={{textOverflow: 'ellipsis'}}
                                            variant="h5" component="div">
                                    {item.name}
                                </Typography>
                                {/*<Typography*/}
                                {/*    style={{overflowWrap: 'break-word'}}*/}
                                {/*    variant="body2">*/}
                                {/*    {item.description}*/}
                                {/*</Typography>*/}
                            </CardContent>
                        </CardActionArea>
                    </Card>
                </> : // <Card sx={{width:'320px', height:'100%'}} className={classesPortfolio.cardMobile}>
                //     <CardActionArea>
                //         <div style={{position:'relative', height:'320px'}}>
                //
                //             <CardMedia
                //                 style={{
                //                     transition: 'transform 0.25s',
                //                     height:'320px'
                //                 }}
                //                 component="img"
                //                 image={defaulImage}
                //                 alt="IMAGE"
                //             />
                //         </div>
                //
                //         <CardContent
                //             className={classesPortfolio.CardContent}
                //         style={{height:'92px'}}
                //         >
                //         </CardContent>
                //     </CardActionArea>
                // </Card>
                <>
                    <CustomFullScreenDialog
                        fullWidthScreenDialog={true}
                        maxWidth={'xl'}
                        fullScreenDialog={false}
                        titleCustomFullScreenDialog='Добавление публикации'
                        setOpenCustomFullScreenDialog={() => setShowCaseModalOpen(false)}
                        openCustomFullScreenDialog={showCaseModalOpen}
                        scrollType='body'>
                        <Box>

                            {
                                showCaseAchievements.length>0?
                                    <>
                                        <Grid item xs={12}>
                                            <Typography align={'center'} style={{color: 'darkgrey'}}>
                                                Кликните на достижение для выбора достижения на витрину
                                            </Typography>
                                        </Grid>
                                        <Grid container spacing={3} justifyContent={'center'}>
                                        {!loading ? showCaseAchievements.map(itemAchievements => <Grid
                                            key={'itemachievements' + itemAchievements.id} style={{margin: '20px'}} item
                                            xl={3} xs={12} md={3}>

                                            <Card onClick={!disabled ? () => addToShowCase(itemAchievements) : () => {
                                            }} style={{background: '#5A7DCF'}}
                                                  sx={{ height: '100%'}}
                                                  className={classesPortfolio.cardMobile}>
                                                <CardActionArea style={{height: '100%'}}>
                                                    <div style={{position: 'relative'}}>

                                                        <CardMedia
                                                            style={{background: '#fff'}}
                                                            className={classesPortfolio.ShowCaseCardImage}
                                                            component="img"
                                                            image={itemAchievements.file.slice(itemAchievements.file.indexOf('/') + 1, itemAchievements.file.indexOf(';')) === 'pdf' ? pdf : itemAchievements.file}
                                                            alt="IMAGE"
                                                        />
                                                    </div>


                                                    <CardContent
                                                        className={classesPortfolio.CardContent}>
                                                        <Typography gutterBottom
                                                                    noWrap
                                                                    style={{textOverflow: 'ellipsis'}}
                                                                    variant="h5" component="div">
                                                            {itemAchievements.name}
                                                        </Typography>
                                                        <Typography
                                                            style={{overflowWrap: 'break-word'}}
                                                            variant="body2">
                                                            {itemAchievements.description}
                                                        </Typography>
                                                    </CardContent>
                                                </CardActionArea>
                                            </Card>
                                        </Grid>) : <Grid style={{
                                            display: 'flex', justifyContent: 'center', height: '400px', alignItems: 'center'
                                        }} item xs={12}>
                                            <img src={loagingGif} alt=""/>
                                        </Grid>

                                        }
                                        </Grid>
                                        {!loading ? <Grid item xs={12}>
                                            <Pagination
                                                page={page}
                                                boundaryCount={2}
                                                style={{width: '100%'}}
                                                count={count}
                                                onChange={handleChangePagination}
                                                variant="outlined"
                                                shape="rounded"
                                                showFirstButton
                                                showLastButton/>
                                        </Grid> : ''}
                                    </>
                                    :
                                    <Grid item xs={12}>
                                        <Typography align={'center'} style={{color: 'darkgrey'}}>
                                            У вас пока нет грамот из категории {categoryId === 1 ? 'образование' : categoryId === 2 ? 'наука' : 'воспитание'}
                                        </Typography>
                                    </Grid>
                            }

                        </Box>

                    </CustomFullScreenDialog>
                    

                    <Grid item xs={12}>
                        <Typography align={'center'} className={classesMain.Text}>
                            {categoryId === 1 ? 'Образование' : categoryId === 2 ? 'Наука' : 'Воспитание'}
                        </Typography>
                    </Grid>
                    <div onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}
                         onClick={canUpdate ? showCaseModal : () => {
                         }} style={{cursor: canUpdate ? 'pointer' : 'default', height: '100%'}}
                         className={classesPortfolio.showCaseDefault}>
                        <img src={image} className={classesPortfolio.showCaseDefaultImage}/>
                    </div>
                </>

            }
        </>

    );
}

export default memo(ShowCaseItem);