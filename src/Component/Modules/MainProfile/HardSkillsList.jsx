import {Button, Typography} from "@material-ui/core";
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
import EditIcon from '@mui/icons-material/Edit';
import Box from "@mui/material/Box";
import CustomFullScreenDialog from "../../UI/CustomFullScreenDialog/CustomFullScreenDialog";
import CustomButton from "../../UI/CustomButton/CustomButton";

const HardSkillsList = ({   save,
                            setSave,
                            loading,
                            hardSkills,
                            showEditProfile,
                            setHardSkills,
                            canUpdate,
                            canCreate,
                            userProfile,
                            showAddHardSkills,
                            setShowAddHardSkills,
                            token,
                            hardSkillsList,
                            setHardSkillsList,
                            checkForCanAdd,
                            alreadyHaveElementError,
                            disabled,
                            setDisabled
}) =>{
    const classesMain = useStylesMain()
    const classesProfile = useStylesProfile()
    const [hardSkillsRef, setHardSkillsRef] = useState()
    const [chosenHardSkill, setChosenHardSkill] = useState('')
    const [chosenHardSkillDesc, setChosenHardSkillDesc] = useState('')
    const [chosenHardSkillDescToEdit, setChosenHardSkillDescToEdit] = useState('')
    const [hardSkillsDescRef, setHardSkillsDescRef] = useState()
    const [chosenIdToEdit, setChosenIdToEdit] = useState()
    const [showEditDesc, setShowEditDesc] = useState(false)
    const [loadHardSkills, setLoadHardSkills] = useState(false)
    const {enqueueSnackbar} = useSnackbar();

    const addHardSkill = async () => {
        const object = {}
        object.name = chosenHardSkill
        object.description = chosenHardSkillDesc
        object.token = token
        await api.profile.PostUserHardSkill(object, userProfile.id).then(async () => {
            const {data: HardSkills} = await api.profile.GetUserHardSkills(userProfile.id)
            setHardSkills(HardSkills)
            setChosenHardSkillDesc('')
            updateHardSkills('')
            setDisabled(false)
            setShowAddHardSkills(false)
        })
    }
    const updateHardSkills = async (value) => {
        setLoadHardSkills(true)
        setHardSkillsList([])
        setChosenHardSkill(value)
        const {data:skills} = await api.profile.SearchHardSkills(value)
        await new Promise(r => setTimeout(r, 1000));
        setHardSkillsList(['Компетенции других пользователей',...skills])
        setLoadHardSkills(false)

    }
    const removeHardSkill = async (item) => {
        await api.profile.DeleteUserHardSkill(item.id, userProfile.id)
    }
    const editDesc = (item) =>{
        setShowEditDesc(true)
        setChosenHardSkillDescToEdit(item.description)
        setChosenIdToEdit(item.id)
    }
    const confirmEditHardSkillDesc = async ()=>{
        await api.profile.EditUserHardSkill({id:chosenIdToEdit,description:chosenHardSkillDescToEdit, token:token},userProfile.id)
        setHardSkills(hardSkills.map(item=>
            item.id === chosenIdToEdit?
                {...item, description:chosenHardSkillDescToEdit}
                :item
        ))
        setShowEditDesc(false)
    }
    useEffect(()=>{
        if(save){
            checkForCanAdd(hardSkillsRef,`"Навык"`, chosenHardSkill, chosenHardSkillDesc, 'string', hardSkills, 'name', addHardSkill, () => {
                enqueueSnackbar('Описание профессиональной компетенции не было заполнено', {variant: 'error'})
            }, alreadyHaveElementError)
            setShowEditDesc(false)
            confirmEditHardSkillDesc()
            setShowAddHardSkills(false)
            setSave(false)
        }
    },[save])

    return(
        <>

            <CustomFullScreenDialog
                fullWidthScreenDialog={true}
                fullScreenDialog={false}
                titleCustomFullScreenDialog='Редактирование описания профессиональной компетенции'
                setOpenCustomFullScreenDialog={() => setShowEditDesc(false)}
                openCustomFullScreenDialog={showEditDesc}
                scrollType='body'>
                <Box sx={{m: 4}}>
                    {showEditProfile?
                        !showAddHardSkills?
                            showEditDesc?
                                <>
                                    <CustomTextarea
                                        key={'textarea hardskills'}
                                        label='Описание компетенции'
                                        setRef={setHardSkillsDescRef}
                                        valueCustomTextarea={chosenHardSkillDescToEdit}
                                        setValueCustomTextarea={(event) => {
                                            setChosenHardSkillDescToEdit(event.target.value)
                                        }}
                                    />
                                    <div style={{display:'flex', justifyContent:'flex-end'}}>
                                        <CustomButton
                                            onClick={confirmEditHardSkillDesc}
                                            disabled={disabled}
                                            name={'Сохранить'}
                                        />

                                    </div>
                                </>


                                :''  :'' :''
                    }
                </Box>
            </CustomFullScreenDialog>
            <CustomFullScreenDialog
                fullWidthScreenDialog={true}
                fullScreenDialog={false}
                titleCustomFullScreenDialog='Добавление профессиональной компетенции'
                setOpenCustomFullScreenDialog={() => setShowAddHardSkills(false)}
                openCustomFullScreenDialog={showAddHardSkills}
                scrollType='body'>
                <Box sx={{m: 4}}>
                    <>
                        <CustomAutocomplete
                            key={'autocomplete hardskills'}
                            onInput={(e) => updateHardSkills(e.target.value)}
                            onChange={(e, value) => updateHardSkills(value)} freeSolo
                            label="Компетенция"
                            getOptionDisabled={(option) =>
                                option === 'Компетенции других пользователей'
                            }
                            loading={loadHardSkills}
                            setRef={setHardSkillsRef}
                            options={hardSkillsList}/>

                        <CustomTextarea
                            key={'textarea hardskills'}
                            label='Описание компетенции'
                            setRef={setHardSkillsDescRef}
                            valueCustomTextarea={chosenHardSkillDesc}
                            setValueCustomTextarea={(event) => {
                                setChosenHardSkillDesc(event.target.value)
                            }}
                        />
                        <div style={{display: 'flex', justifyContent:'flex-end'}}>
                            <CustomButton
                                onClick={() => checkForCanAdd(hardSkillsRef,`"Навык"`, chosenHardSkill, chosenHardSkillDesc, 'string', hardSkills, 'name', addHardSkill, () => {
                                    hardSkillsDescRef.focus()
                                    enqueueSnackbar(`Заполните поле "Описание компетенции"`, {variant: 'error'})

                                }, alreadyHaveElementError)}
                                disabled={disabled}
                                name={'Добавить'}

                            />

                        </div>
                    </>
                </Box>
            </CustomFullScreenDialog>
            <Typography style={{margin: "10px 0"}}
                        className={[classesProfile.Text, classesMain.Text].join(' ')}>
                Профессиональные компетенции:
            </Typography>
            {!loading ? <Stack direction="row" style={{flexWrap: 'wrap'}}>
                {
                    hardSkills.length > 0 ?
                        hardSkills.map(item =>
                            <div key={'hardskills' + item.id}>
                                {
                                    showEditProfile && !showEditDesc && !showAddHardSkills?

                                        <CustomTag
                                            onDelete={()=>{
                                                setHardSkills(hardSkills.filter(el=>el.id!==item.id))
                                                removeHardSkill(item)
                                            }}
                                            label={<LightTooltip placement='right' title={item.description.length > 0 ? item.description : 'Описание отсутствует'}>
                                                <div onClick={()=>editDesc(item)} style={{width: '100%', height: '100%', display:'flex', justifyContent:'space-between', cursor:'pointer'}}>
                                                    <Typography
                                                        style={{cursor:'help', color: '#fff', textDecoration:'underline'}}>  {item.name} </Typography>

                                                    <EditIcon style={{transform:'scale(0.6)', opacity:'0.5'}}/>

                                                </div>
                                            </LightTooltip>
                                            }
                                        />
                                        :
                                        <CustomTag
                                            label={<LightTooltip placement='right' title={item.description.length > 0 ? item.description : 'Описание отсутствует'}>
                                                <div style={{width: '100%', height: '100%'}}>
                                                    <Typography
                                                        style={{color: '#fff', textDecoration:'underline'}}>{item.name} </Typography>
                                                </div>
                                            </LightTooltip>}
                                        />
                                }

                            </div>)
                        : canUpdate ?
                            <Typography style={{color: 'grey'}} variant='body2'>
                                В режиме редактирования вы можете указать какими
                                профессионально-техническими компетенциями вы владеете.
                            </Typography> : ''}
            </Stack> : <Skeleton variant="rectangular" width='100%' height={60}/>
            }
            <div>
                

                {canCreate ?

                    showEditProfile ?
                        !showEditDesc?
                        !showAddHardSkills ?

                            <CustomButton
                                style={{marginRight:'10px'}}
                                onClick={() => setShowAddHardSkills(true)}
                                disabled={disabled}
                                name={'Добавить'}
                            />

                            : ''
                        : '' : '':''}
            </div>
        </>
    )
}
export default HardSkillsList