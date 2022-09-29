import MainProfile from "../../Modules/MainProfile/MainProfile";
import CustomTabPanel from "../../UI/CustomTabPanel/CustomTabPanel";
import {
    Button,
    Grid, Typography
} from "@material-ui/core";
import React, {useEffect, useMemo, useState} from "react";
import useStylesMain from "../../../Styles/MainStyles";
import useStylesProfile from "../../../Styles/ProfileStyles";
import AddIcon from "@mui/icons-material/Add";
import CustomInput from "../../UI/CustomInput/CustomInput";
import CustomAutocomplete from "../../UI/CustomAutocomplete/CustomAutocomplete";
import ItemProfileForEmployeeDean from "./ItemProfileForEmployeeDean";
import api from '../../../Services/api'
import Cookies from "js-cookie";
import IconButton from "@mui/material/IconButton";
import SettingsIcon from "@mui/icons-material/Settings";
import CheckIcon from "@mui/icons-material/Check";
import CustomTextarea from "../../UI/CustomTextarea/CustomTextarea";
import Skeleton from "@mui/material/Skeleton";
import {useNavigate, useParams} from "react-router-dom";
import CRUD from "../../Modules/Functions/CRUD";
import Box from "@mui/material/Box";
import CustomFullScreenDialog from "../../UI/CustomFullScreenDialog/CustomFullScreenDialog";
import CustomButton from "../../UI/CustomButton/CustomButton";


const ProfileForEmployeeDean = () => {
    const params = useParams()
    const navigate = useNavigate()

    const classesMain = useStylesMain()
    const classesProfile = useStylesProfile()
    const token = Cookies.get("auth-token");
    const stuffId = params.personId;
    const [myId, setMyId] = useState()

    const [additionalInfo, setAdditionalInfo] = useState('')
    const [showAddPublication, setShowPublication] = useState(false)
    const [userProfile, setUserProfile] = useState([{}])
    const [publicationName, setPublicationName] = useState('')
    const [publicationPlace, setPublicationPlace] = useState('')
    const [publicationPagesCount, setPublicationPagesCount] = useState('')
    const [publicationType, setPublicationType] = useState('')
    const [publicationsTypes, setPublicationsTypes] = useState([])
    const [nameRef, setNameRef] = useState()
    const [typeRef, setTypeRef] = useState()
    const [placeRef, setPlaceRef] = useState()
    const [pagesRef, setPagesRef] = useState()
    const [showEditAdditionalInfo, setShowEditAdditionalInfo] = useState(false)
    const [publications, setPublications] = useState([{}])
    const [loading, setLoading] = useState(false)
    const [disabled, setDisabled] = useState(false)
    const [canUpdate, setCanUpdate] = useState(false)
    const [canCreate, setCanCreate] = useState(false)
    const [canDelete, setCanDelete] = useState(false)
    const [canRead, setCanRead] = useState(false)
    const [userRole, setUserRole] = useState('')

    const addPublication = async () => {
        setDisabled(true)
        if (nameRef.value.length < 1 || typeof nameRef.value !== "string") {
            nameRef.focus()
            setDisabled(false)
        } else if (typeRef.value.length < 1 || typeof typeRef.value !== "string") {
            typeRef.focus()
            setDisabled(false)
        } else if (placeRef.value.length < 1 || typeof placeRef.value !== "string") {
            placeRef.focus()
            setDisabled(false)
        } else if (pagesRef.value.length < 1 || typeof pagesRef.value !== "string") {
            pagesRef.focus()
            setDisabled(false)
        } else {
            setDisabled(false)
            const object = {
                PublicationTypeId: publicationsTypes.filter(el => el.name === publicationType)[0].id,
                name: publicationName, place: publicationPlace, volume: publicationPagesCount,
                token: token
            }
            await api.profile.PostEmployeePublication(object, userProfile.id).then(async () => {
                    const {data: EmployeePublications} = await api.profile.GetEmployeePublications(userProfile.id)
                    setPublications(EmployeePublications)
                    setPublicationName('')
                    setPublicationType('')
                    setPublicationPlace('')
                    setPublicationPagesCount('')
                    setDisabled(false)
                    setShowPublication(false)
                }
            )

        }


    }
    const handleChangeAdditionalInfo = (event) => {
        if (event.length < 360) {
            setAdditionalInfo(event)
        }
    }

    const editAdditionalInfo = async () => {
        if (showEditAdditionalInfo) {
            const object = new Object()
            object.token = token
            object.content = additionalInfo
            setShowEditAdditionalInfo(!showEditAdditionalInfo)
            const {data: About} = await api.profile.EditEmployeeAdditionalInfo(object, userProfile.id)
        } else {
            setShowEditAdditionalInfo(!showEditAdditionalInfo)
        }
    }

    const removePublication = async (item) => {
        const {data: response} = await api.profile.DeleteEmployeePublication(item.id, userProfile.id)
    }

    const editPublication = async (data, id) => {
        const {data: response} = await api.profile.EditEmployeePublication(data, id, userProfile.id)
    }

    const updateTypes = (value) => {
        setPublicationType(value)
    }

    useEffect(async () => {
        setLoading(true)

        const {data: result} = await api.auth.getAssigningRole({token: token})
        setUserRole(result.role)
        if(result.role === 'Студент'){
            const {data: MyStudentId} = await api.educationalProcess.getStudentId()
            CRUD(result.role, 'Профиль сотрудника', stuffId, MyStudentId,'Студент', setCanCreate, setCanRead, setCanUpdate, setCanDelete)
                .then(res=>{
                    if(!res){
                        navigate('/not-found')
                    }
                })

        }else if(result.role === 'Сотрудник' || result.role === 'Администратор'){
            const {data: MyStuffId} = await api.staff.getStuffId()
            setMyId(MyStuffId.employeeId)
            CRUD(result.role, 'Профиль сотрудника', stuffId, MyStuffId.employeeId,'Сотрудник', setCanCreate, setCanRead, setCanUpdate, setCanDelete)
                .then(res=>{
                    if(!res){
                        navigate('/not-found')
                    }
                })


        }

        const {data: UserProfile} = await api.profile.GetUserProfileByStuffId(stuffId)
        setUserProfile(UserProfile)
        const {data: PublicationsTypes} = await api.profile.GetPublicationsTypes()

        setPublicationsTypes(PublicationsTypes)
        const {data: EmployeePublications} = await api.profile.GetEmployeePublications(UserProfile.id)
        setPublications(EmployeePublications)
        const {data: AdditionalInfo} = await api.profile.GetEmployeeAdditionalInfo(UserProfile.id)
        setAdditionalInfo(AdditionalInfo)
        setLoading(false)
    }, [params.userId])



    if (canRead) {
        return (
            <MainProfile role={userRole} canUpdate={canUpdate} canRead={canRead} canDelete={canDelete}
                         canCreate={canCreate} PropPersonId={stuffId} MyId={myId} tabs={[{id: '2', categoryName: 'Сотрудник'}]} page={'employee'}>
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

                                        setRef={setNameRef}
                                        label={'Название'}
                                        customValueInput={publicationName}
                                        setCustomValueInput={event => setPublicationName(event.target.value)}
                                    />,
                                    <CustomAutocomplete
                                        key={'customAutocompleteProfile'}

                                        setRef={setTypeRef}
                                        options={publicationsTypes}
                                        getOptionLabel={(option) => option.name}
                                        label='Тип публикации'
                                        onChange={(e, value) => updateTypes(value.name)}
                                        style={{width: '100%'}}
                                    />,
                                    <CustomInput
                                        key={'customInput2Profile'}

                                        setRef={setPlaceRef}
                                        label={'Выходные данные'}
                                        customValueInput={publicationPlace}
                                        setCustomValueInput={event => setPublicationPlace(event.target.value)}
                                    />,
                                    <CustomInput
                                        key={'customInput3Profile'}
                                        setRef={setPagesRef}
                                        label={'Количество авторских листов'}
                                        customValueInput={publicationPagesCount}
                                        setCustomValueInput={event => setPublicationPagesCount(event.target.value)}
                                    />,
                                ] : ''

                        }
                        <div style={{display: 'flex', justifyContent:'flex-end'}}>
                            <CustomButton
                                style={{marginRight:'10px'}}
                                onClick={addPublication}
                                disabled={disabled}
                                name={'Добавить'}
                            />
                            <CustomButton
                                    onClick={() => setShowPublication(!showAddPublication)}
                                    name={'Отмена'}
                            />
                        </div>
                    </Box>
                </CustomFullScreenDialog>
                <CustomTabPanel value={'2'}>
                    <Grid container direction='row'>
                        <Grid container
                              justifyContent='flex-end'>
                            {canUpdate ?
                                !loading ?
                                    <div onClick={editAdditionalInfo}
                                         style={{display: 'flex', alignItems: 'center', cursor: 'pointer'}}>

                                        <Typography className={classesMain.Text}>
                                            {!showEditAdditionalInfo ? 'Редактировать дополнительную информацию' : 'Сохранить'}
                                        </Typography>
                                        <IconButton className={classesMain.Text}>
                                            {!showEditAdditionalInfo ? <SettingsIcon/> : <CheckIcon/>}
                                        </IconButton>
                                    </div> :
                                    <Skeleton style={{marginBottom: '20px'}} variant="rectangular" width='20%'
                                              height={20}/> : ''}
                        </Grid>
                        {!loading ?
                            <Grid
                                style={{
                                    width: '100%',
                                    background: 'rgb(90,125,205)',
                                    padding: '20px',
                                    marginTop: '20px',
                                    justifyContent: 'space-between'
                                }}
                                item xs={12}
                            >
                                <Grid item xs={12}>
                                    <Typography variant='h5' className={[classesMain.TextWhite].join(' ')}>Дополнительная
                                        информация</Typography>
                                </Grid>
                                {
                                    showEditAdditionalInfo ?
                                        <CustomTextarea
                                            valueCustomTextarea={additionalInfo}
                                            setValueCustomTextarea={(event) => handleChangeAdditionalInfo(event.target.value)}
                                        />
                                        :
                                        <Grid item xs={12}>
                                            <Typography style={{overflowWrap:'anywhere'}} className={classesMain.TextWhite}>{additionalInfo}</Typography>
                                        </Grid>
                                }

                            </Grid>
                            :
                            <Skeleton variant="rectangular" width='100%' height={118}/>}
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
                                    <ItemProfileForEmployeeDean
                                        canUpdate={canUpdate}
                                        canDelete={canDelete}
                                        publicationType={publicationType}
                                        publicationsTypes={publicationsTypes}
                                        edit={editPublication}
                                        remove={removePublication}
                                        key={'ItemProfileForEmployeeDean' + item.id}
                                        updateTypes={updateTypes}
                                        items={publications}
                                        setItems={setPublications}
                                        item={item}/>
                                )
                                : canUpdate ?
                                    <Grid item xs={12}>
                                        <Typography style={{color: 'grey'}} variant='body2'>Добавьте сюда свои научные
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


                    </Grid>
                </CustomTabPanel>
            </MainProfile>
        )
    } else {
        return (
            <div></div>
        )

    }

}
export default ProfileForEmployeeDean