import {Grid, Typography, Box, Button, Tab, MenuItem, IconButton, Divider} from "@material-ui/core";
import useStylesMain from "../../../Styles/MainStyles";
import useStylesProfile from "../../../Styles/ProfileStyles";
import React, {useState, useEffect} from "react";
import Cookies from "js-cookie";
import CustomTabPanel from "../../UI/CustomTabPanel/CustomTabPanel";
import SettingsIcon from "@mui/icons-material/Settings";
import CheckIcon from "@mui/icons-material/Check";
import CustomTextarea from "../../UI/CustomTextarea/CustomTextarea";
import CustomTab from "../../UI/CustomTab/CustomTab";
import Skeleton from '@mui/material/Skeleton';
import api from "../../../Services/api";
import CustomSocialMedia from "../../UI/CustomSocialMedia/CustomSocialMedia";
import CustomDialog from "../../UI/CustomDialog/CustomDialog";
import defaultImage from '../../../Assets/Image/Profile/profile.png'
import CloseIcon from "@mui/icons-material/Close";
import {useNavigate, useParams} from "react-router-dom";
import HistoryBackButton from "../../UI/HistoryBackButton/HistoryBackButton";
import {useSnackbar} from "notistack";
import LanguagesList from "./LanguagesList";
import HardSkillsList from "./HardSkillsList";
import SoftSkillsList from "./SoftSkillsList";
import CustomButton from "../../UI/CustomButton/CustomButton";


const MainProfile = ({children, tabs = [], PropToken, PropPersonId, canUpdate, canDelete, canRead, canCreate, role,MyId,page}) => {
    const navigate = useNavigate()
    const params = useParams()
    const classesMain = useStylesMain()
    const classesProfile = useStylesProfile()
    const [listUser, setListUser] = useState([])

    const token = PropToken !== undefined ? PropToken : Cookies.get("auth-token");
    const personId = PropPersonId
    const [userProfile, setUserProfile] = useState([{}])
    const [socialMedias, setSocialMedias] = useState([{}])
    const [userSocialMedias, setUserSocialMedias] = useState([{}])
    const [loading, setLoading] = useState(true)
    const [handleDialog, setHandleDialog] = useState(false)
    const [aboutMe, setAboutMe] = useState('')
    const [showEditProfile, setShowEditProfile] = useState(false)
    const [hardSkills, setHardSkills] = useState([])
    const [hardSkillsList, setHardSkillsList] = useState([{}])
    const [showAddHardSkills, setShowAddHardSkills] = useState(false)
    const [hiddenLinks, setHiddenLinks] = useState(true)
    const [showAddSoftSkills, setShowAddSoftSkills] = useState(false)
    const [softSkills, setSoftSkills] = useState([])
    const [softSkillsList, setSoftSkillsList] = useState([{}])
    const [showAddLanguages, setShowAddLanguages] = useState(false)
    const [languages, setLanguages] = useState([])
    const [proficiencyLevels, setProficiencyLevels] = useState([])
    const [languagesList, setLanguagesList] = useState([])
    const [disabled, setDisabled] = useState(false)
    const [save, setSave] = useState(false)
    const [isBlocking, setIsBlocking] = useState(false)
    const [canSave, setCanSave] = useState({})
    const {enqueueSnackbar} = useSnackbar();
    const handleChangeAboutMe = (event) => {
        if (event.length < 360) {
            setAboutMe(event)
        }
    }
    const checkForCanAdd = async (ref,field, chosenItem, chosenSecondItem, typeSecondItem, items, itemsKey, addFunc, callback, elseCallback) => {
        setDisabled(true)
        let canAdd = true
        if (chosenItem.length !== 0 || chosenSecondItem.length !== 0){
            if (ref?.value?.length < 2 || typeof ref?.value !== "string") {
                ref?.focus()
                enqueueSnackbar(`Заполните поле ${field}`, {variant: 'error'})
                setDisabled(false)
            } else if (chosenSecondItem?.length < 1 || typeof chosenSecondItem !== typeSecondItem) {
                callback()
                setDisabled(false)
            } else {
                for (let i = 0; i < items.length; i++) {
                    if (chosenItem?.toLowerCase() === items[i][itemsKey]?.toLowerCase()) {
                        canAdd = false
                    }
                }
                if (canAdd) {
                    addFunc()
                } else {
                    elseCallback()
                    setDisabled(false)
                }
            }

        }
        else{
            setDisabled(false)
        }

    }
    const alreadyHaveElementError = () => {
        enqueueSnackbar('Такой элемент уже есть', {variant: 'error'})
    }
    const alertLevelError = () => {
        enqueueSnackbar('Уровень языка не был заполнен', {variant: 'error'})
    }
    async function getStuffName() {
        await api.staff.getStuffFullName(personId)
            .then(res => setListUser(res.data))
    }
    async function getStudentName() {
        await api.educationalProcess.getStudentFullName(personId)
            .then(res => setListUser(res.data))
    }
    async function getProfileInformation(){
        if(page === 'student'){
            getStudentName()
        }else if(page === 'employee'){
            getStuffName()
        }
        let UserProfile
        if(Number(personId) === Number(MyId)){
            const {data: UserProfileData} = await api.profile.GetUserProfile().catch(async function (error) {
                if (error.response) {
                    if (error.response.data === 'Incorrect external id') {
                        await api.profile.PostNewUserProfile()
                    }
                }
            })
            UserProfile=UserProfileData
        }else if(page === 'student') {
            const {data: UserProfileData} = await api.profile.GetUserProfileByStudentId(personId).catch(async function (error) {
                if (error.response) {
                    if (error.response.data === 'Incorrect external id') {
                        navigate('/not-found')
                    }
                }
            })
            UserProfile=UserProfileData
        }else if(page === 'employee'){
            const {data: UserProfileData} = await api.profile.GetUserProfileByStuffId(personId).catch(async function (error) {
                if (error.response) {
                    if (error.response.data === 'Incorrect external id') {
                        navigate('/not-found')
                    }
                }
            })
            UserProfile=UserProfileData
        }

        setUserProfile(UserProfile)
        setImage(UserProfile.photo)
        setLanguages(UserProfile.userLanguages)
        const {data: languages} = await api.profile.GetLanguages()
        setLanguagesList(languages)
        const {data: levels} = await api.profile.GetProficiencyLevels()
        setProficiencyLevels(levels)
        setAboutMe(UserProfile.aboutMe)
        const {data: HardSkillsList} = await api.profile.GetHardSkillsList()
        setHardSkillsList(['Компетенции других пользователей',...HardSkillsList])
        setHardSkills(UserProfile.hardskills)
        setSoftSkills(UserProfile.softskills)
        const {data: UserSoftSkillsList} = await api.profile.GetSoftSkillsList()
        setSoftSkillsList(['Компетенции других пользователей',...UserSoftSkillsList])
        const {data: SocialMedias} = await api.profile.GetSocialMedias()
        setSocialMedias(SocialMedias)
        setUserSocialMedias(UserProfile.userSocialMedias)
        setLoading(false)
    }
    useEffect(() => {

        setLoading(true)
        getProfileInformation()
    }, [personId])
    const [saveLinks, setSaveLinks] = useState(false)
    const [prevAbout, setPrevAbout] = useState('')
    const confirmEditGeneralInfo = async () => {
        setSave(true)

        setHiddenLinks(true)

            const object = {}
            object.token = token
            object.content = aboutMe
            setShowEditProfile(!showEditProfile)
            if (prevAbout !== aboutMe) {
                await api.profile.EditUserAbout(object, userProfile.id)
            }


    }
    
    useEffect(() => {
        window.addEventListener("beforeunload", alertUser);
        return () => {
            window.removeEventListener("beforeunload", alertUser);
        };
    }, []);
    const alertUser = (e) => {
        e.preventDefault();
        e.returnValue = ""
    };
    const editGeneralInfo = async () => {
        if (showEditProfile) {
            setIsBlocking(false)
            setSaveLinks(true)
        } else {
            setPrevAbout(aboutMe)
            setHiddenLinks(!hiddenLinks)
            setShowEditProfile(!showEditProfile)
            setIsBlocking(true)
        }
    }
    useEffect(() => {
        let canSaveLinks = true
        for (const item in canSave) {
             if(canSave[item] === false){
                 canSaveLinks = false
             }

        }
           if(canSaveLinks && showEditProfile){
               setHandleDialog(true)
               setCanSave([])
           }

        
    }, [saveLinks])
    const [image, setImage] = useState('')
    const onloadImage = async (event) => {
        if (event.target.files && event.target.files[0]) {
            const reader = new FileReader()
            const maxSize = 10240000
            reader.onload = async function (e) {
                 if(event.target.files[0].size>maxSize){
                     enqueueSnackbar('Изображение не должно превышать 10мб', {variant:'error'})
                     let img = document.getElementById('uploadPhoto')
                     img.value = null

                 }
                 else{

                     await api.profile.EditUserPhoto({
                         photo: e.target.result, token: token
                     }, userProfile.id).then(()=>{
                         setImage(e.target.result)
                         enqueueSnackbar('Аватар изменён', {variant:'info'})
                     }).catch(async ()=>{
                         
                         enqueueSnackbar('Что-то пошло не так, попробуйте другое изображение', {variant:'error'})
                     })
                 }

            }
            reader.readAsDataURL(event.target.files[0]);
        }
    }
    const PostSocialMediaLink = async (id, link) => {
        let canAdd = true
        for (let i = 0; i < userSocialMedias?.length; i++) {
            if (socialMedias.filter(el => el.id === id)[0].name === userSocialMedias[i].name) {
                if (userSocialMedias[i].link !== link) {
                    await DeleteUserSocialMedia(userSocialMedias[i].id)
                } else {
                    canAdd = false
                }
            }
        }
        if (canAdd) {
            const obj = {SocialMediaId: id, link: link, token: token}
            await api.profile.PostUserSocialMedia(obj, userProfile.id)
            const {data: UserSocialMedias} = await api.profile.GetUserSocialMedias(userProfile.id)
            setUserSocialMedias(UserSocialMedias)
        }
    }
    const DeleteUserSocialMedia = async (id) => {
        await api.profile.DeleteUserSocialMedia(id, userProfile.id)
    }
    const [showClose, setShowClose] = useState(false)
    const delUserPhoto = async () => {
        await api.profile.DeleteUserPhoto(userProfile.id)
        setImage('')
        let img = document.getElementById('uploadPhoto')
        img.value = null
    }

    return (
        <div>
            {role !== 'Студент' ?
                Number(personId) !== Number(MyId) ?
                    <HistoryBackButton/>
                    : ''
                : ''
            }

            <Grid
                className={classesMain.backgroundMain}
            >

                <CustomDialog
                    title='Изменение общей информации'
                    content='Вы действительно хотите сохранить изменения?'
                    open={handleDialog}
                    setOpen={setHandleDialog}
                    onConfirm={confirmEditGeneralInfo}
                />
                <Grid container spacing={3}>
                    <Grid style={{display: 'flex', flexDirection: 'column'}} item xs={12}>
                        <Typography
                            className={classesMain.Title}
                            variant="h1"
                        >
                            Профиль
                        </Typography>
                    </Grid>
                </Grid>
                <Box
                >
                    <Grid
                        container
                        direction="row"
                        justifyContent="center"
                        alignItems="center"

                    >
                        <Grid style={{width: '100%'}} item>
                            <Grid
                                container
                                direction="row"
                                justifyContent="center"
                                alignItems="center"
                                style={{marginBottom: '50px'}}
                            >
                                <Grid item

                                      className={classesProfile.userInfoGrid}
                                      xs={12} xl={4} md={4}>
                                    {!loading ?

                                        <div onMouseEnter={() => setShowClose(true)}
                                             onMouseLeave={() => setShowClose(false)} style={{position: 'relative'}}>
                                            {canDelete ?
                                                image ?
                                                    <Grid onClick={delUserPhoto} style={{
                                                        opacity: !showClose ? '0' : '1',
                                                    }}
                                                          className={[classesMain.Text, classesProfile.delUserPhoto].join(' ')}
                                                          item>
                                                        <CloseIcon style={{cursor: "pointer"}}/>
                                                    </Grid>
                                                    : '' : ''}
                                            <div className={classesProfile.UserPhoto}
                                                 style={{
                                                     backgroundImage: `url(${image ? image : defaultImage})`,
                                                 }}>
                                            </div>
                                        </div>
                                        : <Skeleton variant="circular" width={140} height={140}/>}
                                    {canUpdate ?
                                        !loading ? <label htmlFor="uploadPhoto">
                                            <CustomButton
                                                component={'label'}
                                                name={<>
                                                    Изменить аватар
                                                    <input
                                                        type="file"
                                                        hidden
                                                        id="uploadPhoto"
                                                        accept="image/*"
                                                        name="updatePhoto"
                                                        onChange={onloadImage}
                                                    />
                                                </>}
                                            >

                                            </CustomButton>
                                            
                                        </label> : <Skeleton variant="rectangular" width={150} height={30}/> : ''}
                                </Grid>
                                <Grid item
                                      xl={6} md={6} xs={12}>
                                    {!loading ? <Typography
                                        className={[classesProfile.FullName,classesMain.Text].join(' ')}
                                        variant="h6"
                                        align='left'
                                    >
                                        <strong>ФИО:</strong> {listUser.lastname} {listUser.name} {listUser.patronymic}
                                        <br/>
                                        <strong>Адрес эл. почты:</strong> {listUser.email}
                                        <br/>
                                    </Typography> : <Skeleton variant="rectangular" width='100%' height={118}/>}
                                </Grid>
                            </Grid>
                            <CustomTab firstTab={"1"}>
                                {[{id: '1', categoryName: 'Общая информация'}, ...tabs].map(item => <Tab
                                    key={item.id}
                                    className={classesMain.TabsItems}
                                    label={<div className={classesMain.TabItemText}>{item.categoryName}</div>}
                                    value={item.id}/>)}
                                {[<CustomTabPanel key={'tab 1'}  className={classesMain.TabsPanelMobile} value={"1"}>
                                    <Grid container
                                          justifyContent='flex-end'>
                                        {canUpdate ?
                                            !loading ? <div onClick={editGeneralInfo}
                                                            style={{
                                                                display: 'flex', alignItems: 'center', cursor: 'pointer'
                                                            }}>

                                                <Typography className={classesMain.Text}>
                                                    {!showEditProfile ? 'Редактировать общую информацию' : 'Сохранить'}
                                                </Typography>
                                                <IconButton className={classesMain.Text}>
                                                    {!showEditProfile ? <SettingsIcon/> : <CheckIcon/>}
                                                </IconButton>
                                            </div> : <Skeleton style={{marginBottom: '20px'}} variant="rectangular"
                                                               width={210} height={20}/> : ''}

                                    </Grid>

                                    <Grid
                                        style={{alignItems: 'start'}}
                                        container
                                        direction="row"
                                        justifyContent="center"
                                        alignItems="center"
                                    >
                                        {!loading ? !showEditProfile ? <div className={classesProfile.aboutMe}>
                                            <div style={{
                                                display: 'flex', justifyContent: 'space-between', alignItems: 'center'
                                            }}>
                                                <Typography variant='h5' className={classesMain.TextWhite}>
                                                    Обо мне
                                                </Typography>


                                            </div>

                                            <Typography style={{overflowWrap:'anywhere'}} className={[classesMain.TextWhite, classesProfile.aboutMeTextMobile].join(' ')}>
                                                {aboutMe}
                                            </Typography>
                                        </div> : <div className={classesProfile.aboutMe}>
                                            <Typography variant='h5' className={classesMain.TextWhite}>
                                                Обо мне
                                            </Typography>
                                            <CustomTextarea
                                                valueCustomTextarea={aboutMe}
                                                setValueCustomTextarea={(event) => handleChangeAboutMe(event.target.value)}
                                            />
                                        </div> : <Skeleton variant="rectangular" width='100%' height={120}/>

                                        }
                                    </Grid>
                                    <Grid  style={{marginTop: '20px'}} container>
                                        <Grid item
                                              xs={12} xl={5} md={5}>
                                            <LanguagesList
                                                save={save}
                                                setSave={setSave}
                                                loading={loading}
                                                languages={languages}
                                                canUpdate={canUpdate}
                                                canCreate={canCreate}
                                                showEditProfile={showEditProfile}
                                                setLanguages={setLanguages}
                                                showAddLanguages={showAddLanguages}
                                                setShowAddLanguages={setShowAddLanguages}
                                                languagesList={languagesList}
                                                proficiencyLevels={proficiencyLevels}
                                                checkForCanAdd={checkForCanAdd}
                                                userProfile={userProfile}
                                                token={token}
                                                disabled={disabled}
                                                setDisabled={setDisabled}
                                                alertLevelError={alertLevelError}
                                                alreadyHaveElementError={alreadyHaveElementError}
                                            />
                                        </Grid>
                                        <Grid item style={{display: 'flex', justifyContent: 'center'}} xs={1} md={1} xl={1}>
                                            <Divider orientation="vertical" flexItem/>
                                        </Grid>
                                        <Grid item
                                              xs={12} xl={5} md={5}>
                                            <Typography className={[classesProfile.Text, classesMain.Text].join(' ')}
                                                        variant='h5'>
                                                Компетенции
                                            </Typography>
                                            <div>
                                                <HardSkillsList
                                                    save={save}
                                                    setSave={setSave}
                                                    loading={loading}
                                                    hardSkills={hardSkills}
                                                    showEditProfile={showEditProfile}
                                                    setHardSkills={setHardSkills}

                                                    canUpdate={canUpdate}
                                                    canCreate={canCreate}
                                                    userProfile={userProfile}
                                                    showAddHardSkills={showAddHardSkills}
                                                    setShowAddHardSkills={setShowAddHardSkills}
                                                    token={token}
                                                    disabled={disabled}
                                                    setDisabled={setDisabled}
                                                    hardSkillsList={hardSkillsList}
                                                    setHardSkillsList={setHardSkillsList}
                                                    checkForCanAdd={checkForCanAdd}
                                                    alreadyHaveElementError={alreadyHaveElementError}
                                                />
                                            </div>
                                            <SoftSkillsList
                                                save={save}
                                                setSave={setSave}
                                                loading={loading}
                                                softSkills={softSkills}
                                                showEditProfile={showEditProfile}
                                                setSoftSkills={setSoftSkills}
                                                userProfile={userProfile}
                                                canUpdate={canUpdate}
                                                canCreate={canCreate}
                                                setSoftSkillsList={setSoftSkillsList}
                                                showAddSoftSkills={showAddSoftSkills}
                                                softSkillsList={softSkillsList}
                                                setShowAddSoftSkills={setShowAddSoftSkills}
                                                checkForCanAdd={checkForCanAdd}
                                                alreadyHaveElementError={alreadyHaveElementError}
                                                token={token}
                                                disabled={disabled}
                                                setDisabled={setDisabled}
                                            />
                                        </Grid>
                                    </Grid>
                                    <Grid style={{padding: '20px 0'}} item
                                          xs={12}>
                                        <Divider/>
                                        <Grid
                                            container
                                            direction="row"
                                            justifyContent="space-evenly"
                                            alignItems="center"
                                            spacing={3}

                                            style={{marginTop: '20px'}}
                                        >
                                            {!loading ? !hiddenLinks ?

                                                    socialMedias.map((item) =>
                                                        <Grid item xs={12} md={3} xl={3} key={item.name}>
                                                            <CustomSocialMedia

                                                                item={item}
                                                                value={userSocialMedias.filter(el => el.name === item.name)[0]?.link}
                                                                showInput={showEditProfile}
                                                                save={saveLinks}
                                                                setSave={setSaveLinks}
                                                                setCanSave={setCanSave}
                                                                canSave={canSave}
                                                                post={PostSocialMediaLink}
                                                            />
                                                        </Grid>)
                                                :

                                                        userSocialMedias?.length > 0 ? userSocialMedias.map(item =>
                                                            <Grid item xs={5} md={3} xl={3} key={item.name}>
                                                            <CustomSocialMedia

                                                                item={item}
                                                                setItems={setUserSocialMedias}
                                                                items={userSocialMedias}
                                                                link={item.link}
                                                                canRemove={canDelete}
                                                                remove={DeleteUserSocialMedia}

                                                            />
                                                            </Grid>) : canUpdate ?
                                                            <Typography style={{color: 'grey'}} variant='body2'>
                                                                В режиме редактирования вы можете указать ссылки на
                                                                вас в социальных сетях
                                                            </Typography> : ''
                                                : <Skeleton variant="rectangular" width='100%' height={118}/>
                                            }
                                        </Grid>
                                    </Grid>
                                </CustomTabPanel>, [children]]}
                            </CustomTab>
                        </Grid>
                    </Grid>
                </Box>
            </Grid>
        </div>)
}
export default MainProfile