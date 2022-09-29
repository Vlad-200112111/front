import React, {useEffect, useState} from 'react';
import {Checkbox, Grid} from "@mui/material";
import Button from "@mui/material/Button";
import useStylesMain from "../../../Styles/MainStyles";
import Typography from "@mui/material/Typography";
import CustomModal from "../../UI/CustomModal/CustomModal";
import CustomAutocomplete from "../../UI/CustomAutocomplete/CustomAutocomplete";
import api from "../../../Services/api";
import FormControlLabel from "@mui/material/FormControlLabel";
import Box from "@mui/material/Box";
import Cookies from "js-cookie";
import {useSnackbar} from "notistack";
import CircularProgress from "@mui/material/CircularProgress";
import loagingGif from '../../../Assets/Image/loading.gif'

import useStylesCalendarStudySchedule from "../../../Styles/CalendarStudyScheduleStyles";

function NotEditableCalendarStudySchedule({
                                              role,
                                              months,
                                              days,
                                              weeks,
                                              calendar,
                                              chosenSpeciality,
                                              chosenYear
                                          }) {
    const classesMain = useStylesMain()
    const classesCalendarStudySchedule = useStylesCalendarStudySchedule()
    const {enqueueSnackbar} = useSnackbar();

    const [open, setOpen] = useState(false)
    const [chosenStudyForm, setChosenStudyForm] = useState()
    const [studyForms, setStudyForms] = useState(false)
    const [groups, setGroups] = useState([])
    const [specialities,setSpecialities] = useState()
    const [chosenSpecialityModal,setChosenSpecialityModal] = useState()
    const [loadingToBack,setLoadingToBack] = useState()
    const [chosenRow, setChosenRow] = useState()


    useEffect(async () => {
        const {data: StudyForms} = await api.educationalProcess.getCalendarStudyStudyForms()
        setStudyForms(StudyForms)
    }, [])
    useEffect(async()=>{
        const {data: Specialities} = await api.educationalProcess.getCalendarStudySpeciality(chosenYear.idYearStart, chosenYear.idYearEnd, chosenStudyForm.idStudyForm)
        setSpecialities(Specialities)
        setChosenSpecialityModal(Specialities[0])
    },[chosenStudyForm])
    useEffect(async ()=>{
        const {data: Groups} = await api.educationalProcess.getCalendarStudyGroups(chosenYear.idYearStart, chosenYear.idYearEnd, chosenStudyForm.idStudyForm, chosenSpecialityModal.idSpeciality)
        setGroups(Groups.map((item,index)=>item===item?{...item, checked:true}:item))
        console.log([true,true,false].indexOf(false))
    },[chosenSpecialityModal])


    const openModal = (item) => {
        setOpen(true)
        setChosenRow(item)
        console.log(item)
    }
    const saveForm = async () => {
        setLoadingToBack(true)
        let array = []
        for (let i = 0; i <= groups.length-1 ; i++) {
             if(groups[i].checked){
                let obj = {
                    token: Cookies.get('auth-token'),
                    idStartYear: chosenYear.idYearStart,
                    idEndYear: chosenYear.idYearEnd,
                    idSpeciality: chosenSpecialityModal.idSpeciality,
                    idStudyForm: chosenStudyForm.idStudyForm,
                    idGroup: groups[i].idGroup,
                    cellValues: calendar?.filter(el=>el.groupName === chosenRow.groupName)[0].cellValues.map((item, index) => ({
                        numberCell: item.numberCell,
                        idGraphNotation: item.idGraphNotation
                    }))
                }
                array.push(obj)
             }

        }

        await api.educationalProcess.postCalendarStudy(array).then(() => {
            setLoadingToBack(false)
            enqueueSnackbar('Данные сохранены', {variant: 'info'})
        })


        // await api.educationalProcess.postCalendarStudy(array).then(() => {
        //     setLoadingToBack(false)
        //     enqueueSnackbar('Данные сохранены', {variant: 'info'})
        // })

    }
    const chooseStudyForm = (StudyForm) => {
        setChosenStudyForm(StudyForm)
    }
    const chooseSpeciality = (Speciality)=>{
        setChosenSpecialityModal(Speciality)
    }
    return (
        <Grid item xs={12} display={'flex'} justifyContent={'center'}>
            <CustomModal
                open={open}
                handleClose={() => setOpen(false)}
            >
                <Grid container>

                    <>
                        {
                            !loadingToBack?
                                <>
                                    <Grid item xs={12} display={'flex'}>
                                        <CustomAutocomplete
                                            value={chosenStudyForm}
                                            label={'Форма обучения'}
                                            width={'30%'}
                                            options={studyForms}
                                            getOptionLabel={option => option.nameStudyForm}
                                            onChange={(event, value) => chooseStudyForm(value)}
                                        />

                                        {
                                            chosenStudyForm?
                                                <CustomAutocomplete
                                                    value={chosenSpecialityModal}
                                                    label={'Направленность'}
                                                    width={'35%'}
                                                    options={specialities}
                                                    getOptionLabel={option => option.nameSpeciality}
                                                    onChange={(event, value) => chooseSpeciality(value)}
                                                />
                                                :''


                                        }
                                    </Grid>
                                    <Grid item xs={12}>
                                        {groups?
                                            <>
                                                <FormControlLabel
                                                    label="Все"
                                                    control={
                                                        <Checkbox
                                                            checked={groups.map(item=>item.checked).indexOf(false) === -1}
                                                            indeterminate={groups.map(item=>item.checked).indexOf(true) !== -1 && groups.map(item=>item.checked).indexOf(false) !== -1 }
                                                            onChange={(event)=>setGroups(groups.map(item=>item===item?{...item,checked:event.target.checked}:item))}
                                                        />
                                                    }
                                                />
                                                <Box sx={{ display: 'flex', flexDirection: 'column', ml: 3 }}>
                                                    {
                                                        groups?.map(item=>
                                                            <FormControlLabel
                                                                key={item.nameGroup}
                                                                label={item.nameGroup}
                                                                control={<Checkbox checked={item.checked} />}
                                                                onChange={(event)=>setGroups(groups.map(el=>el === item?{...el, checked:event.target.checked}:el))}
                                                            />
                                                        )
                                                    }
                                                </Box>
                                            </>

                                            :''
                                        }
                                    </Grid>
                                    <Grid item xs={12} display={'flex'} justifyContent={'end'}>
                                        <Button onClick={saveForm} className={classesMain.button}>Скопировать</Button>
                                    </Grid>


                                </>
                                :
                                <Grid item xs={12} display={'flex'} justifyContent={'center'} alignItems={'center'}
                                      flexDirection={'column'}>
                                    <Typography variant={'h6'} className={classesMain.Text} style={{margin: '10px'}}>
                                        Идёт загрузка данных. Пожалуйста, не покидайте страницу
                                    </Typography>
                                    <img src={loagingGif} alt=""/>
                                </Grid>
                        }
                    </>
                </Grid>
            </CustomModal>
            <div style={{display: 'flex', width:'100%'}}>
                <div>
                    <div style={{display: 'flex', height: '160px'}}>
                        <div style={{
                            border: '1px solid #485C90',
                            padding: '60px',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            color: '#485C90'
                        }}> Направление ОП
                        </div>
                        <div style={{
                            border: '1px solid #485C90',
                            padding: '10px',
                            maxWidth: '20px',
                            overflowWrap: 'break-word',
                            display: "flex",
                            justifyContent: 'center',
                            alignItems: 'center',
                            flexDirection: 'column',
                            color: '#485C90'
                        }}>
                            к
                            у
                            р
                            с
                        </div>
                    </div>
                    <div style={{
                        display: 'flex',
                        border: '1px solid #485C90',
                        padding: '10px',
                        height: '26px'
                    }}>

                    </div>
                    <div style={{display: 'flex', width: '264px'}}>
                        <div style={{
                            width: '100%',
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'start',
                            alignItems: 'start'
                        }}>
                            {
                                calendar?.map(item =>
                                    <div key={item.idGroup} style={{
                                        border: '1px solid #485C90',
                                        position: 'relative',
                                        width: '100%',
                                        height: '31px',
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                        color: '#485C90'
                                    }}>

                                        {item.groupName}
                                        {
                                            role === "Сотрудник"?
                                                <div onClick={() => openModal(item)}>

                                                    <Typography style={{marginRight: '5px', cursor: 'pointer'}}
                                                                component={'span'} className={classesMain.Text}>
                                                        Скопировать
                                                    </Typography>
                                                </div>
                                                :''
                                        }


                                    </div>
                                )
                            }
                        </div>
                        <div style={{
                            overflowWrap: 'break-word',
                            display: "flex",

                            flexDirection: 'column',
                            color: '#485C90'
                        }}>
                            {
                                calendar?.map(item =>
                                    <div key={item.courseNumber} style={{
                                        border: '1px solid #485C90',
                                        width: '22px',
                                        height: '31px',
                                        display: "flex",
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        color: '#485C90'
                                    }}>


                                        {item.courseNumber}
                                    </div>
                                )
                            }
                        </div>
                    </div>
                </div>
                <div className={classesCalendarStudySchedule.calendar}>
                    <div style={{display: 'flex', maxWidth: '1431px'}}>
                        {
                            months?.map((item, index) =>
                                <table id="table-to-xls" style={{borderCollapse: 'collapse',}} key={item.name+Math.floor(Math.random() * 1000) + index}>
                                    <thead>
                                    <tr>
                                        <th colSpan={days[index]?.length}
                                            style={{
                                                border: '1px solid #485C90',
                                                color: '#485C90'
                                            }}>{item.name}
                                        </th>
                                    </tr>
                                    </thead>

                                    <tbody>
                                    <tr>
                                        {
                                            weeks[index]?.map((item) =>
                                                <td align={'center'}
                                                    key={item+Math.floor(Math.random() * 100)+'td'}
                                                    style={{border: '1px solid #485C90', padding: '5px'}}>
                                                    <div style={{
                                                        display: 'flex',
                                                        justifyContent: 'center',
                                                        alignItems: 'center',
                                                        width: '20px',
                                                        height: '20px',
                                                        color: '#485C90'
                                                    }}>
                                                        {item}
                                                    </div>
                                                </td>
                                            )
                                        }
                                    </tr>
                                    <tr>
                                        {
                                            days[index]?.map((item) =>
                                                <td align={'center'} key={item.start+item.end+Math.floor(Math.random() * 1000)+'-'}
                                                    style={{border: '1px solid #485C90', padding: '5px'}}>
                                                    <div style={{
                                                        display: 'flex',
                                                        justifyContent: 'center',
                                                        alignItems: 'center',
                                                        width: '20px',
                                                        height: '20px',
                                                        color: '#485C90'
                                                    }}>
                                                        -
                                                    </div>
                                                </td>
                                            )
                                        }
                                    </tr>
                                    <tr>
                                        {
                                            days[index]?.map((item) =>
                                                <td align={'center'} key={item.start + 'start'}
                                                    style={{
                                                        border: '1px solid #485C90',
                                                        color: '#485C90',
                                                        padding: '5px',
                                                        width: '20%'
                                                    }}>
                                                    {item.start}
                                                </td>
                                            )
                                        }
                                    </tr>
                                    <tr>
                                        {
                                            days[index]?.map((item) =>
                                                <td key={item.end +'end'} style={{
                                                    border: '1px solid #485C90',
                                                    padding: '5px',
                                                    color: '#485C90'
                                                }}>
                                                    {item.end}
                                                </td>
                                            )
                                        }
                                    </tr>


                                    </tbody>
                                </table>
                            )
                        }

                    </div>
                    <div style={{height: '26px', color: '#485C90'}}>
                        {
                            chosenSpeciality ?
                                chosenSpeciality.nameSpeciality
                                : ''
                        }
                    </div>
                    <div>
                        <table id="table-to-xls"
                               style={{borderCollapse: 'collapse', width: '1655px'}}>
                            <tbody>

                            {
                                calendar?.map((item, index) =>
                                    <tr key={index+'row'}>
                                        {
                                            item?.cellValues.map((el,index) =>
                                                <td key={Math.floor(Math.random() * 100000) +'notation'}
                                                    draggable={false} align={'center'}
                                                    style={{border: '1px solid #485C90', padding: '5px'}}>
                                                    <div draggable={false}

                                                         style={{
                                                             display: 'flex',
                                                             justifyContent: 'center',
                                                             alignItems: 'center',
                                                             width: '20px',
                                                             height: '20px',
                                                             color: '#485C90'
                                                         }}>
                                                        {el.graphNotationName}
                                                    </div>
                                                </td>
                                            )
                                        }
                                    </tr>
                                )
                            }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </Grid>
    );
}

export default NotEditableCalendarStudySchedule;