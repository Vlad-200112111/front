import {Button, Grid, Typography} from "@material-ui/core";
import {Stack} from "@mui/material";
import CustomTag from "../../UI/CustomTag/CustomTag";
import PopOver from "../../UI/PopOver/PopOver";
import Skeleton from "@mui/material/Skeleton";
import CustomAutocomplete from "../../UI/CustomAutocomplete/CustomAutocomplete";
import CustomTextarea from "../../UI/CustomTextarea/CustomTextarea";
import AddIcon from "@mui/icons-material/Add";
import React, {useState} from "react";
import useStylesMain from "../../../Styles/MainStyles";
import useStylesProfile from "../../../Styles/ProfileStyles";
import api from "../../../Services/api";
import {useEffect} from "react";
import {useSnackbar} from "notistack";
import LightTooltip from "../../UI/LightTooltip/LightTooltip";
import EditIcon from "@mui/icons-material/Edit";
import Box from "@mui/material/Box";
import CustomFullScreenDialog from "../../UI/CustomFullScreenDialog/CustomFullScreenDialog";
import CustomButton from "../../UI/CustomButton/CustomButton";

const SoftSkillsList = ({
                            save,
                            setSave,
                            loading,
                            softSkills,
                            showEditProfile,
                            setSoftSkills,
                            userProfile,
                            canUpdate,
                            canCreate,
                            showAddSoftSkills,
                            softSkillsList,
                            setSoftSkillsList,
                            setShowAddSoftSkills,
                            checkForCanAdd,
                            alreadyHaveElementError,
                            token,
                            disabled,
                            setDisabled
                        }) => {
    const classesMain = useStylesMain()
    const classesProfile = useStylesProfile()
    const [chosenSoftSkill, setChosenSoftSkill] = useState('')
    const [chosenSoftSkillDesc, setChosenSoftSkillDesc] = useState('')
    const [softSkillsRef, setSoftSkillsRef] = useState()
    const [softSkillsDescRef, setSoftSkillsDescRef] = useState()
    const [chosenSoftSkillDescToEdit, setChosenSoftSkillDescToEdit] = useState('')
    const [chosenIdToEdit, setChosenIdToEdit] = useState()
    const [showEditDesc, setShowEditDesc] = useState(false)
    const [loadSoftSkills, setLoadSoftSkills] = useState(false)
    const {enqueueSnackbar} = useSnackbar();

    const addSoftSkill = async () => {
        const object = {}
        object.name = chosenSoftSkill
        object.description = chosenSoftSkillDesc
        object.token = token
        await api.profile.PostUserSoftSkill(object, userProfile.id).then(async () => {
            const {data: SoftSkills} = await api.profile.GetUserSoftSkills(userProfile.id)
            setSoftSkills(SoftSkills)
            setChosenSoftSkillDesc('')
            setChosenSoftSkill('')
            setDisabled(false)
            setShowAddSoftSkills(false)
        })
    }
    const updateSoftSkills = async (value) => {
        setChosenSoftSkill(value)
        setSoftSkillsList([])

        const {data:skills} = await api.profile.SearchSoftSkills(value)
        await new Promise(r => setTimeout(r, 1000));

        setSoftSkillsList(['Компетенции других пользователей',...skills])
    }
    const removeSoftSkill = async (item) => {
        await api.profile.DeleteUserSoftSkill(item.id, userProfile.id)
    }
    const editDesc = (item) =>{
        setShowEditDesc(true)
        setChosenSoftSkillDescToEdit(item.description)
        setChosenIdToEdit(item.id)
    }
    const confirmEditSoftSkillDesc = async ()=>{
        await api.profile.EditUserSoftSkill({id:chosenIdToEdit,description:chosenSoftSkillDescToEdit, token:token},userProfile.id)
        setSoftSkills(softSkills.map(item=>
            item.id === chosenIdToEdit?
                {...item, description:chosenSoftSkillDescToEdit}
                :item
        ))
        setShowEditDesc(false)
    }
    useEffect(() => {
        if (save) {
            checkForCanAdd(softSkillsRef, `"Компетенция"`, chosenSoftSkill, chosenSoftSkillDesc, 'string', softSkills, 'name', addSoftSkill, () => {
                enqueueSnackbar('Описание социально-волевой компетенции не было заполнено', {variant: 'error'})
            }, alreadyHaveElementError)
            setShowEditDesc(false)
            confirmEditSoftSkillDesc()
            setShowAddSoftSkills(false)
            setSave(false)
        }
    }, [save])
    return (
        <>

            <CustomFullScreenDialog
                fullWidthScreenDialog={true}
                fullScreenDialog={false}
                titleCustomFullScreenDialog='Редактирование описания социально-волевой компетенции'
                setOpenCustomFullScreenDialog={() => setShowEditDesc(false)}
                openCustomFullScreenDialog={showEditDesc}
                scrollType='body'>
                <Box sx={{m: 4}}>
                    <Grid item>


                        {showEditProfile?
                            !showAddSoftSkills?
                                showEditDesc?
                                    <>
                                        <CustomTextarea
                                            key={'textarea hardskills'}
                                            label='Описание компетенции'
                                            valueCustomTextarea={chosenSoftSkillDescToEdit}
                                            setValueCustomTextarea={(event) => {
                                                setChosenSoftSkillDescToEdit(event.target.value)
                                            }}
                                        />
                                        <div style={{display:'flex', justifyContent:'flex-end'}}>
                                            <CustomButton
                                                onClick={confirmEditSoftSkillDesc}
                                                disabled={disabled}
                                                name={'Сохранить'}
                                            />

                                        </div>
                                    </>


                                    :''  :'' :''
                        }
                    </Grid>
                </Box>
            </CustomFullScreenDialog>
            <CustomFullScreenDialog
                fullWidthScreenDialog={true}
                fullScreenDialog={false}
                titleCustomFullScreenDialog='Добавление социально-волевой компетенции'
                setOpenCustomFullScreenDialog={() => setShowAddSoftSkills(false)}
                openCustomFullScreenDialog={showAddSoftSkills}
                scrollType='body'>
                <Box sx={{m: 4}}>
                    {showEditProfile ? !showEditDesc? showAddSoftSkills ? [<CustomAutocomplete
                        loading={loadSoftSkills}
                        key={'autocomplete softskills'}
                        onInput={(e) => updateSoftSkills(e.target.value)}
                        onChange={(e, value) => updateSoftSkills(value)} freeSolo
                        label="Компетенция"
                        getOptionDisabled={(option) =>
                            option === 'Компетенции других пользователей'
                        }
                        setRef={setSoftSkillsRef}
                        options={softSkillsList}/>,
                        <CustomTextarea
                            key={'textarea softskills'}
                            label='Описание компетенции'
                            setRef={setSoftSkillsDescRef}
                            valueCustomTextarea={chosenSoftSkillDesc}
                            setValueCustomTextarea={(event) => {
                                setChosenSoftSkillDesc(event.target.value)
                            }}
                        />
                    ] : '' : '':''}
                    <div style={{display: 'flex', justifyContent:'flex-end'}}>
                        <CustomButton
                            onClick={() => checkForCanAdd(softSkillsRef, `"Компетенция"`, chosenSoftSkill, chosenSoftSkillDesc, 'string', softSkills, 'name', addSoftSkill, () => {
                                softSkillsDescRef.focus()
                                enqueueSnackbar(`Заполните поле "Описание компетенции"`, {variant: 'error'})
                            }, alreadyHaveElementError)}
                            disabled={disabled}
                            name={'Добавить'}
                        />

                    </div>
                </Box>
            </CustomFullScreenDialog>
            <div>
                <Typography style={{margin: "10px 0"}}
                            className={[classesProfile.Text, classesMain.Text].join(' ')}>
                    Социально-волевые компетенции:
                </Typography>
            </div>
            {!loading ? <Stack direction="row" style={{flexWrap: 'wrap'}}>
                {
                    softSkills.length > 0 ?
                        softSkills.map(item =>
                            <div key={'softskills' + item.id}>
                                {
                                    showEditProfile && !showEditDesc && !showAddSoftSkills ?
                                        <CustomTag onClick={()=>editDesc(item)}
                                            key={'languages' + item.id + 3}
                                            onDelete={() => {
                                                setSoftSkills(softSkills.filter(el => el.id !== item.id))
                                                removeSoftSkill(item)
                                            }}
                                            label={<LightTooltip placement='right' title={item.description.length > 0 ? item.description : 'Описание отсутствует'}>
                                                <div style={{width: '100%', height: '100%', display:'flex', justifyContent:'space-between', cursor:'pointer'}}>
                                                    <Typography
                                                        style={{
                                                            cursor:'help',
                                                            color: '#fff',
                                                            textDecoration: 'underline'
                                                        }}>{item.name} </Typography>
                                                    <EditIcon style={{transform:'scale(0.6)', opacity:'0.5'}}/>
                                                </div>
                                            </LightTooltip>}
                                        />
                                        :
                                        <CustomTag
                                            key={'languages' + item.id + 3}
                                            label={
                                            <LightTooltip placement='right' title={item.description.length > 0 ? item.description : 'Описание отсутствует'}>
                                                <div style={{width: '100%', height: '100%'}}>
                                                    <Typography
                                                        style={{
                                                            color: '#fff',
                                                            textDecoration: 'underline'
                                                        }}>{item.name}</Typography>
                                                </div>
                                            </LightTooltip>}
                                        />
                                }
                            </div>)
                        : canUpdate ?
                            <Typography style={{color: 'grey'}} variant='body2'>
                                В режиме редактирования вы можете указать какими
                                социально-волевыми компетенциями вы владеете.
                            </Typography> : ''}
            </Stack> : <Skeleton variant="rectangular" width='100%' height={60}/>
            }
            <Grid container
                  direction='column'>

                <Grid item>
                    {canCreate ?
                        showEditProfile ?
                            !showEditDesc?
                            !showAddSoftSkills ?
                                <CustomButton
                                    style={{marginRight:'10px'}}
                                    onClick={() => setShowAddSoftSkills(true)}
                                    disabled={disabled}
                                    name={'Добавить'}
                                /> :
                            '' : '' : '':''}
                </Grid>
            </Grid>
        </>
    )
}
export default SoftSkillsList