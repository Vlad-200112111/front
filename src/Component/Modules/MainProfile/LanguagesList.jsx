import {Button, Grid, MenuItem, Typography} from "@material-ui/core";
import {Stack} from "@mui/material";
import CustomTag from "../../UI/CustomTag/CustomTag";
import PopOver from "../../UI/PopOver/PopOver";
import Skeleton from "@mui/material/Skeleton";
import CustomAutocomplete from "../../UI/CustomAutocomplete/CustomAutocomplete";
import CustomSelect from "../../UI/CustomSelect/CustomSelect";
import LightTooltip from "../../UI/LightTooltip/LightTooltip";
import AddIcon from "@mui/icons-material/Add";
import React, {useEffect, useState} from "react";
import useStylesMain from "../../../Styles/MainStyles";
import useStylesProfile from "../../../Styles/ProfileStyles";
import api from "../../../Services/api";
import Box from "@mui/material/Box";
import CustomFullScreenDialog from "../../UI/CustomFullScreenDialog/CustomFullScreenDialog";
import CustomButton from "../../UI/CustomButton/CustomButton";

const LanguagesList = ({   save,
                           setSave,
                           loading,
                           languages,
                           canUpdate,
                           canCreate,
                           showEditProfile,
                           setLanguages,
                           showAddLanguages,
                           setShowAddLanguages,
                           languagesList,
                           proficiencyLevels,
                           checkForCanAdd,
                           userProfile,
                           token,
                           alertLevelError,
                           alreadyHaveElementError,
                           disabled,
                           setDisabled

                       }) => {
    const classesMain = useStylesMain()
    const classesProfile = useStylesProfile()
    const [languagesRef, setLanguagesRef] = useState()
    const [chosenLanguage, setChosenLanguage] = useState("")
    const [chosenProficiencyLevel, setChosenProficiencyLevel] = useState('')

    const updateLanguages = (value) => {
        setChosenLanguage(value)
    }
    const removeLanguage = async (item) => {
        await api.profile.DeleteUserLanguage(item.id, userProfile.id)
    }
    const addLanguage = async () => {
        const object = {}
        object.languageId = languagesList.filter(el => el.name === chosenLanguage)[0]?.id
        object.proficiencyLevelId = chosenProficiencyLevel
        object.token = token
        await api.profile.SendLanguage(object, userProfile.id).then(async () => {
            const {data: userLanguages} = await api.profile.GetUserLanguages(userProfile.id)
            setLanguages(userLanguages)
            setChosenLanguage('')
            setChosenProficiencyLevel('')
            setDisabled(false)
            setShowAddLanguages(false)
        }).catch(() => {
            alert("Что-то пошло не так, попробуйте еще раз")
            setDisabled(false)
        })
    }
    useEffect(()=>{
         if(save){
             checkForCanAdd(languagesRef,'"Язык"', chosenLanguage, chosenProficiencyLevel, 'number', languages, 'language', addLanguage, alertLevelError, alreadyHaveElementError)
             setShowAddLanguages(false)
             setSave(false)
         }
    },[save])
    return (
        <>
            <CustomFullScreenDialog
                fullWidthScreenDialog={true}
                fullScreenDialog={false}
                titleCustomFullScreenDialog='Добавление иностранного языка'
                setOpenCustomFullScreenDialog={() => setShowAddLanguages(false)}
                openCustomFullScreenDialog={showAddLanguages}
                scrollType='body'>
                <Box sx={{m: 4}}>
                    <Grid item xs={12} className={classesProfile.formForAdd}>
                        {
                            showEditProfile ?
                                showAddLanguages ?
                                    <div style={{width:'100%'}}>
                                        <CustomAutocomplete
                                            key={'autocomplete languages'}
                                            getOptionLabel={(option) => option.name}
                                            onChange={(e, value) => updateLanguages(value.name)} label='Язык'
                                            setRef={setLanguagesRef}
                                            options={languagesList}

                                            groupBy={(option)=>option.name[0].toUpperCase()}
                                        />
                                        <CustomSelect style={{paddingBottom: '10px'}}
                                                      key={'select languages'}
                                                      contentCustomSelect='Уровень'
                                                      valueSelect={chosenProficiencyLevel}
                                                      setValueSelect={(event) => {
                                                          setChosenProficiencyLevel(event.target.value)
                                                      }}
                                        >
                                            {proficiencyLevels.map(item =>
                                                <MenuItem key={item.id}
                                                          value={item.id}>
                                                    <LightTooltip placement='right' title={item.description}>
                                                        <div style={{width: '100%', height: '100%'}}>
                                                            <Typography
                                                                style={{color: '#000'}}>{item.level}</Typography>
                                                        </div>
                                                    </LightTooltip>
                                                </MenuItem>
                                            )}
                                        </CustomSelect>
                                        <div style={{display: 'flex', justifyContent:'flex-end'}}>
                                            <CustomButton
                                                onClick={() => checkForCanAdd(languagesRef,`"Язык"`, chosenLanguage, chosenProficiencyLevel, 'number', languages, 'language', addLanguage, alertLevelError, alreadyHaveElementError)}
                                                disabled={disabled}
                                                name={'Добавить'}
                                            />

                                        </div>
                                    </div>: '' : ''}
                    </Grid>
                </Box>
            </CustomFullScreenDialog>
            <Typography className={[classesProfile.Text, classesMain.Text].join(' ')}
                        variant='h5'>
                Знание иностранных языков
            </Typography>

            <div style={{
                display: 'flex', marginTop: '10px', flexWrap: 'wrap', maxWidth: '500px'
            }}>
                {!loading ? <Stack direction="row" style={{flexWrap: 'wrap'}}>
                    {
                        languages.length < 1 ?
                            canUpdate ?
                                <Typography style={{color: 'grey'}} variant='body2'>
                                    В режиме редактирования вы можете указать какими
                                    иностранными языками вы владеете.
                                </Typography>
                                : ''
                            :
                            languages.map(item =>
                                <div
                                    key={'languages' + item.id}>
                                    {
                                        showEditProfile ?
                                            <CustomTag
                                                key={'languages' + item.id + 1}
                                                onDelete={() => {
                                                    setLanguages(languages.filter(el => el.id !== item.id))
                                                    removeLanguage(item)
                                                }}
                                                label={<LightTooltip placement='right' title={item.description}>
                                                    <div style={{width: '100%', height: '100%'}}>
                                                        <Typography
                                                            style={{color: '#fff', textDecoration:'underline'}}>{item.language} {item.proficiencyLevel}</Typography>
                                                    </div>
                                                </LightTooltip>}
                                            />
                                            :
                                            <CustomTag
                                                key={'languages' + item.id + 1}
                                                label={<LightTooltip placement='right' title={item.description}>
                                                    <div style={{width: '100%', height: '100%'}}>
                                                        <Typography
                                                            style={{color: '#fff', textDecoration:'underline'}}>{item.language} {item.proficiencyLevel}</Typography>
                                                    </div>
                                                </LightTooltip>}
                                            />
                                    }
                                </div>)
                    }
                </Stack> : <Skeleton variant="rectangular" width='100%' height={118}/>}
            </div>

            {canCreate ?
                showEditProfile ? !showAddLanguages ?
                    <CustomButton
                        style={{marginRight:'10px'}}
                        onClick={() => setShowAddLanguages(true)}
                        disabled={disabled}
                        name={'Добавить'}
                    />


                    :
                    '' : ''
                : ''
            }
        </>
    )
}
export default LanguagesList