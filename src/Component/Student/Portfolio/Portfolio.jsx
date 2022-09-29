import {useState, useEffect} from "react";
import {
    Grid,
    Typography,
    MenuItem,
    Tab,
    Button,
    IconButton,
    Box
} from "@material-ui/core";
import Cookies from "js-cookie";
import api from "./../../../Services/api";
import CloseIcon from '@mui/icons-material/Close';
import useStylesMain from "../../../Styles/MainStyles";
import useStylesPortfolio from "../../../Styles/PortfolioStyles";
import CustomModal from "../../UI/CustomModal/CustomModal";
import CustomInput from "../../UI/CustomInput/CustomInput";
import CustomSelect from "../../UI/CustomSelect/CustomSelect";
import CustomTextarea from "../../UI/CustomTextarea/CustomTextarea";
import ItemPortfolio from "./ItemPortfolio";
import CustomTab from "../../UI/CustomTab/CustomTab";
import CustomTabPanel from "../../UI/CustomTabPanel/CustomTabPanel";
import CustomButton from "../../UI/CustomButton/CustomButton";
import MainPortfolio from "../../Modules/MainPortfolio/MainPortfolio";
import {Link, useParams} from "react-router-dom";
import CRUD from "../../Modules/Functions/CRUD";
import {useSnackbar} from "notistack";
import pdf from '../../../Assets/Image/Portfolio/pdf.svg'
import Skeleton from "@mui/material/Skeleton";
import React from "react";
import mainStyles from "../../../Styles/MainStyles";
import {Pagination} from "@mui/material";
import CustomFullScreenDialog from "../../UI/CustomFullScreenDialog/CustomFullScreenDialog";


function Portfolio(props) {
    const params = useParams()
    const classesMain = useStylesMain()
    const classesPortfolio = useStylesPortfolio();
    const token = props.token ? props.token : Cookies.get("auth-token");
    const studentId = params.studentId;
    const [myId, setMyId] = useState()
    const [listCategories, setListCategories] = useState([]);
    const [chosenCategory, setChosenCategory] = useState('')
    const [achievements, setAchievements] = useState([]);
    const [reloading, setReloading] = useState(false)
    const [open, setOpen] = useState(false);
    const [showImage, setShowImage] = useState();
    const [canUpdate, setCanUpdate] = useState(false)
    const [canCreate, setCanCreate] = useState(false)
    const [canDelete, setCanDelete] = useState(false)
    const [canRead, setCanRead] = useState(false)
    const [disabled, setDisabled] = useState(false)
    const [isPdf, setIsPdf] = useState(false)
    const [fileName, setFileName] = useState('')
    const [loading, setLoading] = useState(false)
    const [grow, setGrow] = useState(true)
    const [count, setCount] = useState()
    const [countFromBackend, setCountFromBackend] = useState()
    const [countDocument, setCountDocument] = useState(3)
    const [page, setPage] = useState(1)
    const [fade, setFade] = useState(true)
    const [categoryId, setCategoryId] = useState(1)
    const [deleted, setDeleted] = useState(false)


    const {enqueueSnackbar} = useSnackbar();

    const getMyStudentId = async () => {
        const {data: MyStudentId} = await api.educationalProcess.getStudentId()
        return MyStudentId
    }
    const getCountAchievements = async () => {
        const {data: Count} = await api.portfolio.getCountAchievementsByStudentId(studentId, categoryId)
        return Count
    }
    const getListCategories = async () => {
        const {data: ListCategoriesAchievements} = await api.portfolio.getListCategoriesAchievements();
        return ListCategoriesAchievements
    }

    const getListAchievementsByStudentId = async (pageNum) => {
        const {data: ListAchievementsByUser} = await api.portfolio.getListAchievementsByStudentId(studentId, pageNum, countDocument, categoryId);
        setLoading(false)
        return ListAchievementsByUser
    }

    useEffect(async () => {
        const {data: result} = await api.auth.getAssigningRole({token: token})

        if (result.role === 'Студент') {
            getMyStudentId().then(async (response) => {
                setMyId(response)
                console.log(response)
                CRUD(result.role, 'Портфолио студента', studentId, response, 'Студент', setCanCreate, setCanRead, setCanUpdate, setCanDelete)
            })
        } else if (result.role === 'Сотрудник' || result.role === 'Администратор') {
            const {data: StuffId} = await api.staff.getStuffId()
            CRUD(result.role, 'Портфолио студента', studentId, StuffId, 'Студент', setCanCreate, setCanRead, setCanUpdate, setCanDelete)

        }


    }, [studentId])


    useEffect(() => {

        getListCategories().then((response) => {
            setListCategories(response)
        })
        getCountAchievements().then((response) => {
            setCountFromBackend(response)
            setCount(Math.ceil(Number(response) / countDocument))
        })
    }, [studentId])
    useEffect(async () => {
        setCount(Math.ceil(Number(countFromBackend) / countDocument))
    }, [countDocument]);


    const onDeleteAchieve = async () => {
        getCountAchievements().then((response) => {
            setCountFromBackend(response)
            if (Math.ceil(Number(response) / countDocument) < count && page > 1 && page === count) {
                setPage(page - 1)
                setCount(Math.ceil(Number(response) / countDocument))

                getListAchievementsByStudentId(page - 1).then((response) => {
                    setAchievements(response)
                })
            } else {
                setCount(Math.ceil(Number(response) / countDocument))
                getListAchievementsByStudentId(page).then((response) => {
                    setAchievements(response)
                })
            }

        })
    }


    useEffect(() => {
        setLoading(true)
        getCountAchievements().then((response) => {
            setCountFromBackend(response)

            setCount(Math.ceil(Number(response) / countDocument))
            getListAchievementsByStudentId(page).then((response) => {
                setAchievements(response)
                setLoading(false)
            })
        })
    }, [page, countDocument]);
    useEffect(() => {
        setLoading(true)
        getCountAchievements().then((response) => {
            setPage(1)
            setCountFromBackend(response)
            if (Math.ceil(Number(response) / countDocument) < count && page > 1 && page === count) {
                setPage(1)
            }
            setCount(Math.ceil(Number(response) / countDocument))
            getListAchievementsByStudentId(1).then((response) => {
                setAchievements(response)
                console.log(response)
                setLoading(false)
            })
        })
    }, [categoryId])

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const handleChangePagination = async (event, value) => {
        setFade(false)
        setPage(value)

        window.scroll({
            left: 0,
            top: 0,
            behavior: 'smooth'
        })
        setFade(true)

    };
    const onSubmit = async (event) => {
        event.preventDefault()
        const formData = new FormData(event.target)
        if (formData.get('Name')) {
            if (formData.get('Description')) {
                if (formData.get('CategoryId')) {
                    if (showImage?.length > 1) {

                        setDisabled(true)
                        const object = new Object()
                        formData.append('Token', token)
                        formData.append('UserId', studentId)
                        object.documentFromFront =
                            {
                                documentCategoryId: formData.get('CategoryId'),
                                name: formData.get('Name'),
                                description: formData.get('Description'),
                                token: formData.get('Token'),
                                file: showImage,
                                fileName: fileName
                            };
                        const formdataI = new FormData();
                        await api.portfolio.sendAchievement(object.documentFromFront, studentId).then(() => {
                            delImg()
                            setDisabled(false)
                            setOpen(false)
                            getCountAchievements().then((response) => {

                                setCountFromBackend(response)
                                setCount(Math.ceil(Number(response) / countDocument))
                                getListAchievementsByStudentId(page).then((response) => {
                                    setAchievements(response)
                                })
                            })
                        })
                        setDisabled(false)
                        setReloading(false)
                    } else {
                        enqueueSnackbar('Документ не загружен', {variant: 'error'})
                    }
                } else {
                    enqueueSnackbar('Категория не выбрана', {variant: 'error'})
                }
            } else {
                enqueueSnackbar('Описание не заполнено', {variant: 'error'})

            }
        } else {
            enqueueSnackbar('Название не заполнено', {variant: 'error'})

        }

    };

    function onloadImageForShowing(event) {
        if (event.target.files && event.target.files[0]) {
            var reader = new FileReader();
            let maxSize = 10240000
            reader.onload = function (e) {
                let formatFile = e.target.result.slice(e.target.result.indexOf('/') + 1, e.target.result.indexOf(';'))
                if (event.target.files[0].size > maxSize) {
                    enqueueSnackbar('Изображение не должно превышать 10мб', {variant: 'error'})
                    let img = document.getElementById('uploadPhoto')
                    img.value = null

                } else if (formatFile === 'pdf' || formatFile === 'png' || formatFile === 'jpg' || formatFile === 'jpeg' || formatFile === 'gif') {
                    if (formatFile === 'pdf') {
                        setIsPdf(true)
                        setFileName(event.target.files[0].name)
                        setShowImage(e.target.result)
                    } else {
                        setIsPdf(false)
                        setFileName(event.target.files[0].name)
                        setShowImage(e.target.result)

                    }
                } else {
                    enqueueSnackbar('Недопустимый формат файла!', {variant: 'error'})
                    let img = document.getElementById('uploadPhoto')
                    img.value = null
                }
            }

            reader.readAsDataURL(event.target.files[0]);
        }
    }

    const delImg = () => {
        let img = document.getElementById('uploadPhoto')
        img.value = null
        setIsPdf(false)
        setShowImage('')
    }

    if (canRead) {
        return (

            <MainPortfolio>
                <CustomFullScreenDialog
                    maxWidth={"md"}
                    fullWidthScreenDialog={true}
                    fullScreenDialog={false}
                    titleCustomFullScreenDialog='Загрузка грамоты'
                    setOpenCustomFullScreenDialog={handleClose}
                    openCustomFullScreenDialog={open}
                    scrollType='body'>
                    <Box sx={{m: 4}}>
                        <form onSubmit={onSubmit}>
                            <Grid
                                container
                                direction="row"
                                justifyContent="center"
                                alignItems="center"
                            >
                                <Grid item xs={12} xl={4} md={4}>
                                    <Grid container
                                          direction="column"
                                          justifyContent="center"
                                          alignItems="center"
                                          spacing={3}>
                                        <Grid item>
                                            <Button
                                                className={classesMain.button}
                                                variant="contained"
                                                component="label">
                                                Выбрать файл
                                                <input
                                                    type="file"
                                                    hidden
                                                    id="uploadPhoto"
                                                    accept="application/pdf, image/*"
                                                    name="uploadPhoto"
                                                    onChange={onloadImageForShowing}
                                                />
                                            </Button>
                                        </Grid>
                                        {
                                            showImage ?
                                                <Grid item xs={12} md={12} xl={12} style={{
                                                    display: 'flex',
                                                    flexDirection: 'column',
                                                    justifyContent: 'center',
                                                    alignItems: 'center'
                                                }}>
                                                    <div style={{position: 'relative'}}>
                                                        <Box
                                                            component="img"
                                                            className={classesPortfolio.loadImage}
                                                            alt=""
                                                            src={isPdf ? pdf : showImage}
                                                        >
                                                        </Box>
                                                        {
                                                            showImage ?
                                                                <IconButton onClick={delImg}
                                                                            className={classesPortfolio.removeAchievement}>
                                                                    <CloseIcon/>
                                                                </IconButton>
                                                                :
                                                                ''
                                                        }
                                                    </div>
                                                </Grid>
                                                :
                                                ''
                                        }

                                        <Grid item xs={12}>
                                            <Typography

                                                style={{
                                                    textAlign: 'left',
                                                    maxWidth: '200px',
                                                    overflowWrap: 'break-word'
                                                }}
                                                className={classesMain.Text}>
                                                {!showImage ?
                                                    'Вы можете загрузить pdf, png, jpg или jpeg файл'
                                                    :
                                                    fileName}
                                            </Typography>
                                        </Grid>
                                    </Grid>
                                </Grid>
                                <Grid item xs={11} md={8} xl={8}>
                                    <Grid
                                        container
                                        direction="column"
                                        justifyContent="center"
                                        alignItems="flex-end"
                                    >
                                        <CustomInput
                                            title='Название'
                                            name='Name'
                                            label='Название'
                                            maxLength={120}

                                        />
                                        <CustomSelect
                                            contentCustomSelect="Категория"
                                            nameCustomSelect='CategoryId'

                                        >
                                            {
                                                listCategories.map(item =>

                                                    <MenuItem key={item.id} className={classesMain.SelectItems}
                                                              value={item.id}>{item.name}</MenuItem>
                                                )
                                            }
                                        </CustomSelect>
                                        <CustomTextarea
                                            nameCustomTextarea="Description"
                                            label='Описание'
                                            maxLength={300}
                                        />
                                    </Grid>
                                </Grid>
                                <Grid container
                                      direction="row-reverse"
                                >
                                    <Grid item>

                                        <Button
                                            disabled={disabled ? disabled : false}
                                            variant="contained"
                                            type={'submit'}
                                            className={classesMain.button}
                                        >
                                            Добавить
                                        </Button>

                                    </Grid>
                                </Grid>
                            </Grid>
                        </form>
                    </Box>
                </CustomFullScreenDialog>

                <CustomTab
                    onChange={setCategoryId}
                    Length={listCategories.length}
                    firstTab={'1'}
                >

                    {
                        listCategories.map(item =>
                            <Tab
                                key={item.id}
                                className={classesMain.TabsItems}
                                label={<div className={classesMain.TabItemText}>{item.name}</div>}
                                value={String(item.id)}
                            />
                        )
                    }

                    {listCategories.map(itemCategories =>
                        <CustomTabPanel
                            className={classesMain.TabsPanelMobile}
                            rowSpacing={1}
                            key={itemCategories.id}
                            value={String(itemCategories.id)}
                            direction={"column"}
                            justifyContent={"center"}
                            alignItems={"flex-start"}
                        >
                            {
                                canCreate ?
                                    <Grid item xs={12}>
                                        <Button
                                            className={[classesMain.button].join(' ')}
                                            onClick={handleOpen}
                                        >
                                            Добавить
                                        </Button>
                                    </Grid> :
                                    ''
                            }

                                    {!loading ?
                                        <Grid
                                            item xs={12}
                                            style={{display:'flex', flexWrap:'wrap', gap:'20px', justifyContent:'center', width:'100%'}}
                                        >
                                            {achievements.map((itemAchievements, index) => (

                                                    itemCategories.id === itemAchievements.categoryId ?
                                                        <Grid
                                                            className={classesPortfolio.cardGridMobile}
                                                            item
                                                            xl={3}
                                                            xs={12}
                                                            md={3}
                                                            key={itemAchievements.id}>
                                                            <ItemPortfolio
                                                                onDelete={onDeleteAchieve}
                                                                key={itemAchievements.id + 'itemPortfolio'}
                                                                grow={grow}
                                                                timeout={index * 200}
                                                                onloadImageForShowing={onloadImageForShowing}
                                                                canUpdate={canUpdate}
                                                                canDelete={canDelete}
                                                                itemAchievements={itemAchievements}
                                                                token={token}
                                                                setAchievements={setAchievements}
                                                                achievements={achievements}
                                                                listCategories={listCategories}
                                                                setDeleted={setDeleted}
                                                                deleted={deleted}
                                                                userId={studentId}
                                                            />
                                                        </Grid>
                                                        : ""
                                                )
                                            )}
                                            <Grid item xs={12} style={{display: 'flex', alignItems: 'center', width:'100%'}}>
                                                {achievements.length !== 0 ?
                                                    <Grid item xl={12} md={12} xs={12}>
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
                                                    </Grid> : ''
                                                }
                                            </Grid>
                                        </Grid>

                                        :
                                        <Grid container spacing={3} justifyContent={'center'}>
                                            <Grid
                                                className={classesPortfolio.cardGridMobile}
                                                item
                                                xs={12}
                                                xl={3}
                                                md={3}
                                                >
                                                <Skeleton variant="rectangular" width={'100%'} height={450}/>
                                            </Grid>
                                            <Grid
                                                className={classesPortfolio.cardGridMobile}
                                                item
                                                xs={12}
                                                xl={3}
                                                md={3}
                                            >
                                                <Skeleton variant="rectangular" width={'100%'} height={450}/>
                                            </Grid>
                                            <Grid
                                                className={classesPortfolio.cardGridMobile}
                                                item
                                                xs={12}
                                                xl={3}
                                                md={3}
                                            >
                                                <Skeleton variant="rectangular" width={'100%'} height={450}/>
                                            </Grid>
                                            

                                        </Grid>


                                    }


                        </CustomTabPanel>
                    )}
                </CustomTab>


            </MainPortfolio>
        );
    } else {
        return (
            <div></div>
        )
    }

}

export default Portfolio;
