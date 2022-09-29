import React, {useState, useEffect} from "react";
import {
    Button, Grid, Typography
} from "@material-ui/core";
import useStylesMain from "../../../Styles/MainStyles";
import api from "../../../Services/api";
import CustomTabPanel from "../../UI/CustomTabPanel/CustomTabPanel";
import MainProfile from "../../Modules/MainProfile/MainProfile";
import Skeleton from '@mui/material/Skeleton';
import useStylesProfile from "../../../Styles/ProfileStyles";
import ItemProfile from "./ItemProfile";
import AddIcon from "@mui/icons-material/Add";
import CustomInput from "../../UI/CustomInput/CustomInput";
import CustomTextarea from "../../UI/CustomTextarea/CustomTextarea";
import Cookies from "js-cookie";
import {useNavigate, useParams} from "react-router-dom";
import narturing from './../../../Assets/Image/Profile/nurturing.svg'
import atom from './../../../Assets/Image/Profile/atom.svg'
import book from './../../../Assets/Image/Profile/book.svg'
import CRUD from "../../Modules/Functions/CRUD";
import {useSnackbar} from "notistack";
import ShowCaseItem from "./ShowCaseItem";
import ValidLink from "../../Modules/Functions/RegExps/ValidLink";
import Divider from "@mui/material/Divider";
import CircularProgress from "@mui/material/CircularProgress";
import loagingGif from '../../../Assets/Image/loading.gif'

import CustomAutocomplete from "../../UI/CustomAutocomplete/CustomAutocomplete";
import PublicationItemProfile from "./PublicationItemProfile";
import Box from "@mui/material/Box";
import CustomFullScreenDialog from "../../UI/CustomFullScreenDialog/CustomFullScreenDialog";
import CustomButton from "../../UI/CustomButton/CustomButton";


function Profile() {

    const params = useParams()
    const classesMain = useStylesMain()
    const classesProfile = useStylesProfile()
    const token = Cookies.get("auth-token");
    const studentId = params.personId;
    const [myId, setMyId] = useState()
    const [profileInformation, setProfileInformation] = useState([{}])
    const [projectName, setProjectName] = useState('')
    const [projectDescription, setProjectDescription] = useState('')
    const [projectLink, setProjectLink] = useState('')
    const [showAddProjects, setShowProjects] = useState(false)
    const [projects, setProjects] = useState([{}])
    const [loading, setLoading] = useState(true)
    const [disabled, setDisabled] = useState(false)
    const [nameRef, setNameRef] = useState()
    const [descRef, setDescRef] = useState()
    const [linkRef, setLinkRef] = useState()
    const [canUpdate, setCanUpdate] = useState(false)
    const [canCreate, setCanCreate] = useState(false)
    const [canDelete, setCanDelete] = useState(false)
    const [canRead, setCanRead] = useState(false)
    const [userRole, setUserRole] = useState('')
    const [profileId, setProfileId] = useState('')
    const [categiries, setCategiries] = useState([1, 2, 3])
    const [publications, setPublications] = useState([])
    const [publicationType, setPublicationType] = useState('')
    const [publicationsTypes, setPublicationsTypes] = useState([])
    const [nameRefPub, setNameRefPub] = useState()
    const [typeRefPub, setTypeRefPub] = useState()
    const [placeRefPub, setPlaceRefPub] = useState()
    const [pagesRefPub, setPagesRefPub] = useState()
    const [publicationName, setPublicationName] = useState('')
    const [publicationPlace, setPublicationPlace] = useState('')
    const [publicationPagesCount, setPublicationPagesCount] = useState('')
    const [publicationLinkRef,setPublicationLinkRef] = useState()
    const [publicationLink,setPublicationLink] = useState()
    const [showAddPublication, setShowPublication] = useState(false)

    const {enqueueSnackbar} = useSnackbar();

    const [showCaseAchievements, setShowCaseAchievements] = useState([])
    const navigate = useNavigate()


    const addProject = async () => {
        setDisabled(true)
        if (nameRef.value.length < 1 || typeof nameRef.value !== "string") {
            nameRef.focus()
            enqueueSnackbar('Название не заполнено', {variant: 'error'})
            setDisabled(false)
        } else if (descRef.value.length < 1 || typeof descRef.value !== "string") {
            descRef.focus()
            enqueueSnackbar('Описание не заполнено', {variant: 'error'})
            setDisabled(false)
        } else if(!validLink(projectLink)){setDisabled(false)} else {
            const object = {}
            object.name = projectName
            object.description = projectDescription
            object.link = projectLink
            object.image = ''
            object.token = token
            await api.profile.PostStudentProject(object, profileId)
            const {data: Projects} = await api.profile.GetStudentProjects(profileId)
            setProjects(Projects)
            setProjectName('')
            setProjectDescription('')
            setProjectLink('')
            setDisabled(false)
            setShowProjects(false)
        }
    }

    const removeProject = async (item) => {
        await api.profile.DeleteStudentProject(item.id, profileId)
    }

    const editProject = async (data, id) => {
        await api.profile.EditStudentProject(data, id, profileId)
    }
    const validLink = (link) => {
        if (!ValidLink(link)) {
            enqueueSnackbar('Некорректный URL в поле "ссылка"', {variant: 'error'})
            return false
        }return true

    }

    useEffect(async()=>{
        const {data: ShowCaseAchievements} = await api.portfolio.getShowCaseByStudentId(studentId).catch(res=>{
        })
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
            setCategiries(arr)
        }
        setShowCaseAchievements(ShowCaseAchievements)
    },[])
    useEffect(async () => {
        setLoading(true)

        const {data: result} = await api.auth.getAssigningRole({token: token})
        setUserRole(result.role)
        if (result.role === 'Студент') {
            const {data: MyStudentId} = await api.educationalProcess.getStudentId()
            setMyId(MyStudentId)
            CRUD(result.role, 'Профиль студента', studentId, MyStudentId,'Студент', setCanCreate, setCanRead, setCanUpdate, setCanDelete)
                .then(res=>{
                    if(!res){
                        navigate('/not-found')
                    }
                })
        } else if (result.role === 'Сотрудник' || result.role === 'Администратор') {
            const {data: MyStuffId} = await api.staff.getStuffId()
            setMyId(MyStuffId.employeeId)
            CRUD(result.role, 'Профиль студента', studentId, MyStuffId.employeeId,'Сотрудник', setCanCreate, setCanRead, setCanUpdate, setCanDelete)
                .then(res=>{
                    if(!res){
                        navigate('/not-found')
                    }
                })
        }

        const {data: ProfileInformation} = await api.educationalProcess.getStudentProfileInformationByStudentId(studentId)
        setProfileInformation(ProfileInformation)
        const {data: ProfileId} = await api.profile.GetUserProfileIdByStudent(studentId).catch(()=>{
            navigate('/not-found')
        })
        setProfileId(ProfileId)
        const {data: projects} = await api.profile.GetStudentProjects(ProfileId)

        // const {data: StudentProjects} = await api.profile.GetStudentProjects(UserProfile.id)
        setProjects(projects)

        const {data: PublicationsTypes} = await api.profile.GetPublicationsTypes()

        setPublicationsTypes(PublicationsTypes)
        const {data: StudentPublicatons} = await api.profile.GetStudentPublications(ProfileId)
        setPublications(StudentPublicatons)
        setLoading(false)
    }, [params.personId])



    const addPublication = async () => {
        setDisabled(true)
        if (nameRefPub.value.length < 1 || typeof nameRefPub.value !== "string") {
            nameRefPub.focus()
            enqueueSnackbar('Название не заполнено', {variant: 'error'})
            setDisabled(false)
        } else if (typeRefPub.value.length < 1 || typeof typeRefPub.value !== "string") {
            typeRefPub.focus()
            enqueueSnackbar('Тип не указан', {variant: 'error'})
            setDisabled(false)
        } else if (placeRefPub.value.length < 1 || typeof placeRefPub.value !== "string") {
            placeRefPub.focus()
            enqueueSnackbar('Место публикации не указано', {variant: 'error'})
            setDisabled(false)
        } else if (pagesRefPub.value.length < 1 || typeof pagesRefPub.value !== "string") {
            pagesRefPub.focus()
            enqueueSnackbar('Количество авторских листов не указано', {variant: 'error'})
            setDisabled(false)
        }else if(publicationLinkRef.value.length < 1 || typeof publicationLinkRef.value !== "string"){
            publicationLinkRef.focus()
            enqueueSnackbar('Ссылка не указана', {variant: 'error'})
            setDisabled(false)

        }else if(!validLink(publicationLink)){
            setDisabled(false)
        } else {
            setDisabled(false)
            const object = {
                PublicationTypeId: publicationsTypes.filter(el => el.name === publicationType)[0].id,
                name: publicationName, place: publicationPlace, volume: publicationPagesCount, link: publicationLink,
                token: token
            }
            await api.profile.PostStudentPublication( profileId, object).then(async () => {
                    const {data: StudentPublications} = await api.profile.GetStudentPublications(profileId)
                    setPublications(StudentPublications)
                    setPublicationName('')
                    setPublicationType('')
                    setPublicationPlace('')
                    setPublicationLink('')
                    setPublicationPagesCount('')
                    setDisabled(false)
                    setShowPublication(false)
                }
            )

        }


    }
    const removePublication = async (item) => {
        const {data: response} = await api.profile.DeleteStudentPublication(item.id, profileId)
    }

    const editPublication = async (data, id) => {
        const {data: response} = await api.profile.EditStudentPublication(data, id, profileId)
    }

    const updateTypes = (value) => {
        setPublicationType(value)
    }


    if (canRead) {
        return (<>

                <MainProfile role={userRole} canUpdate={canUpdate} canRead={canRead} canDelete={canDelete}
                             canCreate={canCreate} PropToken={token} PropPersonId={studentId} MyId={myId}
                             page={'student'}
                             tabs={[{id: '2', categoryName: 'Студент'}]}>
                    <CustomFullScreenDialog
                        fullWidthScreenDialog={true}
                        fullScreenDialog={false}
                        titleCustomFullScreenDialog='Добавление проекта'
                        setOpenCustomFullScreenDialog={() => setShowProjects(false)}
                        openCustomFullScreenDialog={showAddProjects}
                        scrollType='body'>
                        <Box sx={{m: 4}}>
                            {showAddProjects ? [<CustomInput
                                key={'customInputProfile'}

                                label={'Название'}
                                setRef={setNameRef}
                                customValueInput={projectName}
                                setCustomValueInput={event => setProjectName(event.target.value)}
                            />, <CustomTextarea
                                key={'customTextareaProfile'}

                                label={'Описание'}
                                setRef={setDescRef}
                                valueCustomTextarea={projectDescription}
                                setValueCustomTextarea={event => setProjectDescription(event.target.value)}
                            />, <CustomInput
                                key={'customInput22Profile'}
                                onBlur={()=>validLink(projectLink)}
                                label={'Ссылка'}
                                setRef={setLinkRef}
                                customValueInput={projectLink}
                                setCustomValueInput={event => setProjectLink(event.target.value)}
                            />] : ''

                            }
                            <div style={{display: 'flex', justifyContent:'flex-end'}}>
                                <CustomButton
                                    onClick={addProject}
                                    disabled={disabled}
                                    name={'Добавить'}
                                />

                            </div>
                        </Box>
                    </CustomFullScreenDialog>
                    <CustomFullScreenDialog
                        fullWidthScreenDialog={true}
                        fullScreenDialog={false}
                        titleCustomFullScreenDialog='Добавление публикации'
                        setOpenCustomFullScreenDialog={() => setShowPublication(false)}
                        openCustomFullScreenDialog={showAddPublication}
                        scrollType='body'>
                        <Box sx={{m: 4}}>
                            {
                                showAddPublication ?
                                    [
                                        <CustomInput
                                            key={'customInputProfile'}

                                            setRef={setNameRefPub}
                                            label={'Название'}
                                            customValueInput={publicationName}
                                            setCustomValueInput={event => setPublicationName(event.target.value)}
                                        />,
                                        <CustomAutocomplete
                                            key={'customAutocompleteProfile'}

                                            setRef={setTypeRefPub}
                                            options={publicationsTypes}
                                            getOptionLabel={(option) => option.name}
                                            label='Тип публикации'
                                            onChange={(e, value) => updateTypes(value.name)}
                                            style={{width: '100%'}}
                                        />,
                                        <CustomInput
                                            key={'customInput122Profile'}

                                            setRef={setPlaceRefPub}
                                            label={'Место публикации'}
                                            customValueInput={publicationPlace}
                                            setCustomValueInput={event => setPublicationPlace(event.target.value)}
                                        />,
                                        <CustomInput
                                            key={'customInput3Profile'}
                                            setRef={setPagesRefPub}
                                            label={'Количество авторских листов'}
                                            customValueInput={publicationPagesCount}
                                            setCustomValueInput={event => setPublicationPagesCount(event.target.value)}
                                        />,
                                        <CustomInput
                                            key={'customInput214Profile'}
                                            setRef={setPublicationLinkRef}
                                            label={'Ссылка'}
                                            onBlur={()=>validLink(publicationLink)}
                                            customValueInput={publicationLink}
                                            setCustomValueInput={event => setPublicationLink(event.target.value)}
                                        />
                                    ] : ''

                            }
                            <div style={{display: 'flex', justifyContent:'flex-end'}}>
                                <CustomButton
                                    onClick={addPublication}
                                    disabled={disabled}
                                    name={'Добавить'}
                                />
                                
                            </div>
                        </Box>
                    </CustomFullScreenDialog>
                    <CustomTabPanel className={classesProfile.tabPanel}  key={'tab 2'} value={'2'}>


                        <Grid container direction='row'>
                            {!loading ?
                                <Grid style={{
                                width: '100%',
                                background: 'rgb(90,125,205)',
                                padding: '20px',
                                marginTop: '20px',
                                justifyContent: 'space-between'
                            }}
                                              item xs={12}>
                                <Grid item xs={12}>
                                    <Typography variant='h5' className={[classesMain.TextWhite].join(' ')}>Информация
                                        о студенте</Typography>
                                </Grid>

                                {profileInformation.map((item, index) =>
                                    <React.Fragment key={item.grageBook}>
                                    <Grid style={{display: 'flex', flexWrap:'wrap'}} item xs={12} >
                                        <Grid item xl={6} md={6} xs={12}
                                        >
                                            <Typography style={{overflowWrap:'anywhere'}} className={classesMain.TextWhite}>
                                                Зачётная книжка: {item?.grageBook}
                                                <br/>
                                                Группа: {typeof item?.group === 'string' ? item?.group : item?.group.join(', ')}
                                                <br/>
                                                Направленность образовательной
                                                программы: {typeof item?.profile === 'string' ? item?.profile : item?.profile.join(', ')}


                                                <br/>
                                            </Typography>
                                        </Grid>
                                        <Grid item xl={6} md={6} xs={12}>
                                            <Typography
                                                align='left'
                                                className={classesMain.TextWhite}
                                            >
                                                Направление
                                                подготовки: {[item?.speciality, item?.codSpeciality].join(' ')}
                                                <br/>
                                                Кафедра: {typeof item?.cathedra === 'string' ? item?.cathedra : item?.cathedra.join(', ')}
                                                <br/>
                                                Факультет: {typeof item?.facultet === 'string' ? item?.facultet : item?.facultet.join(', ')}

                                                <br/>
                                            </Typography>

                                        </Grid>

                                    </Grid>

                                    {index !== profileInformation?.length - 1 ? <Grid item xs={12}>
                                        <Divider style={{borderColor: '#fff', margin: '20px'}}/>
                                    </Grid> : ''}

                                </React.Fragment>)

                                }


                            </Grid> : <Skeleton variant="rectangular" width='100%' height={118}/>}

                            <Grid item xs={12}
                                  style={{marginTop: '20px'}}
                            >
                                <Typography className={[classesProfile.Text, classesMain.Text].join(' ')} variant='h5'>Витрина
                                    достижений</Typography>
                            </Grid>
                            <Grid item xs={12} className={classesProfile.showCaseBorder}>
                                {canCreate ? showCaseAchievements.length === 3 ? '' : <Grid item xs={12}>
                                    <Typography gutterBottom style={{color: 'darkgrey'}} align={'center'}>
                                        Вы можете выбрать достижения для витрины
                                    </Typography>
                                </Grid> : ''}
                                <div className={classesProfile.ShowCase}>
                                    {!loading ? showCaseAchievements?.length > 0 ? <>
                                            {showCaseAchievements.map((item, index) => <Grid key={index} item style={{margin: '25px'}}>
                                                <ShowCaseItem canRead={canRead}
                                                              canCreate={canCreate}
                                                              canUpdate={canUpdate} canDelete={canDelete}
                                                              categoryId={item.categoryId}
                                                              items={showCaseAchievements}
                                                              setCategiries={setCategiries}
                                                              categories={categiries}
                                                              setItems={setShowCaseAchievements} item={item}/>
                                            </Grid>)}
                                            {categiries.sort().map((item, index) => <Grid key={index} item style={{margin: '25px'}}>
                                                <ShowCaseItem setCategiries={setCategiries}
                                                              categories={categiries} canRead={canRead}
                                                              canCreate={canCreate} canUpdate={canUpdate}
                                                              canDelete={canDelete}
                                                              image={item === 1 ? book : item === 2 ? atom : narturing}
                                                              items={showCaseAchievements}
                                                              setItems={setShowCaseAchievements}
                                                              categoryId={item} defaultImage={true}/>
                                            </Grid>)}
                                        </>

                                        : <>
                                            <Grid item className={classesProfile.showCaseItem} key={1}>
                                                <ShowCaseItem canRead={canRead} setCategiries={setCategiries}
                                                              categories={categiries} canCreate={canCreate}
                                                              canUpdate={canUpdate} canDelete={canDelete}
                                                              image={book} items={showCaseAchievements}
                                                              setItems={setShowCaseAchievements} categoryId={1}
                                                              defaultImage={true}/>
                                            </Grid>
                                            <Grid item className={classesProfile.showCaseItem} key={2}>
                                                <ShowCaseItem canRead={canRead} setCategiries={setCategiries}
                                                              categories={categiries} canCreate={canCreate}
                                                              canUpdate={canUpdate} canDelete={canDelete}
                                                              image={atom} items={showCaseAchievements}
                                                              setItems={setShowCaseAchievements} categoryId={2}
                                                              defaultImage={true}/>
                                            </Grid>
                                            <Grid item className={classesProfile.showCaseItem} key={3}>
                                                <ShowCaseItem canRead={canRead} setCategiries={setCategiries}
                                                              categories={categiries} canCreate={canCreate}
                                                              canUpdate={canUpdate} canDelete={canDelete}
                                                              image={narturing} items={showCaseAchievements}
                                                              setItems={setShowCaseAchievements} categoryId={3}
                                                              defaultImage={true}/>
                                            </Grid>
                                        </> : <img src={loagingGif} alt=""/>


                                    }
                                </div>

                            </Grid>

                            <Grid
                                style={{marginTop: '20px'}}
                                item
                                xs={12}>
                                <Typography className={[classesProfile.Text, classesMain.Text].join(' ')} variant='h5'>
                                    Мои публикации
                                </Typography>
                            </Grid>
                            {!loading ?
                                publications.length > 0 ?
                                    publications.map(item =>
                                        <React.Fragment key={item.id}>

                                        <PublicationItemProfile
                                            canUpdate={canUpdate}
                                            canDelete={canDelete}
                                            publicationType={publicationType}
                                            publicationsTypes={publicationsTypes}
                                            edit={editPublication}
                                            remove={removePublication}
                                            key={'PublicationProfile' + item.id}
                                            updateTypes={updateTypes}
                                            items={publications}
                                            setItems={setPublications}
                                            item={item}/>
                                        </React.Fragment>
                                    )
                                    : canUpdate ?
                                        <Grid item xs={12}>
                                            <Typography style={{color: 'grey'}} variant='body2'>Добавьте сюда свои
                                                публикации</Typography>
                                        </Grid>
                                        : ''
                                :
                                <>
                                    <Skeleton style={{marginBottom: '20px'}} variant="rectangular" width='100%'
                                              height={40}/>
                                    <Skeleton style={{marginBottom: '20px'}} variant="rectangular" width='100%'
                                              height={40}/>
                                    <Skeleton style={{marginBottom: '20px'}} variant="rectangular" width='100%'
                                              height={40}/>

                                </>
                            }


                            {canCreate ?
                                !loading ?
                                    !showAddPublication ?
                                        <CustomButton
                                            onClick={() => setShowPublication(!showAddPublication)}
                                            name={'Добавить'}
                                        />
                                        :
                                        ''
                                    :
                                    ''
                                : ''
                            }




                            <Grid item xs={12}
                                  style={{marginTop: '20px'}}
                            >
                                <Typography className={[classesProfile.Text, classesMain.Text].join(' ')} variant='h5'>Мои
                                    проекты</Typography>
                            </Grid>

                            {!loading ? <>
                                {projects.length > 0 ? projects.map(item =>
                                            <React.Fragment key={item.id}>

                                            <ItemProfile key={'project' + item.id}
                                                                                         edit={editProject}
                                                                                         canCreate={canCreate}
                                                                                         canRead={canRead}
                                                                                         canUpdate={canUpdate}
                                                                                         canDelete={canDelete}
                                                                                         remove={removeProject}
                                                                                         items={projects}
                                                                                         setItems={setProjects}
                                                                                         item={item}
                                            />
                                            </React.Fragment>
                                    )
                                    : canUpdate ? <Grid item xs={12}>
                                    <Typography style={{color: 'grey'}} variant='body2'>Вы можете
                                        добавить сюда свои проекты.</Typography>
                                </Grid> : ''}



                                {canCreate ? !showAddProjects ? <CustomButton
                                    onClick={() => setShowProjects(!showAddProjects)}
                                    name={'Добавить'}
                                /> : '' : ''

                                }
                            </> : <Skeleton variant="rectangular" width='100%' height={118}/>

                            }

                        </Grid>
                    </CustomTabPanel>
                </MainProfile>
            </>)
    } else {
        return (<div></div>)
    }

}

export default Profile;
