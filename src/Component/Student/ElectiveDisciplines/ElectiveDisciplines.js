import MainElectiveDisciplines from "../../Modules/MainElectiveDisciplenes/MainElectiveDisciplines";
import {useState, useEffect} from "react";
import {Grid, MenuItem} from "@material-ui/core";
import CustomSelect from "../../UI/CustomSelect/CustomSelect";
import api from "../../../Services/api";
import useStylesMain from "../../../Styles/MainStyles";
import CustomAlert from "../../UI/CustomAlert/CustomAlert";
import ItemElectiveDisciplines from "./ItemElectiveDisciplines";
import CircularProgress from "@mui/material/CircularProgress";
import React from "react";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import ToggleButton from "@mui/material/ToggleButton";
import loagingGif from '../../../Assets/Image/loading.gif'

import {Box, Tab} from "@mui/material";
import TabContexts from "../../UI/CustomTab/TabContexts";
import {TabPanel} from "@mui/lab";

function ElectiveDisciplines() {
    const classesMain = useStylesMain()

    const [listGroups, setListGroups] = useState([])
    const [listDisciplines, setListDisciplines] = useState([])
    const [grow, setGrow] = useState(true)
    const [studentId, setStudentId] = useState('')
    const [showForm, setShowForm] = useState(false)

    useEffect(async () => {
        const {data: ListGroups} = await api.educationalProcess.getListGroups();
        setListGroups(ListGroups)
        setStudentId(ListGroups[0].studentId)


        const {data: ListDisciplines} = await api.electiveDisciplines.getDisciplines(ListGroups[0].idGroup, ListGroups[0].studentId)
        setShowForm(true)
        setListDisciplines(generateObject(ListDisciplines))
    }, []);

    function generateObject(listDisciplines) {
        let newArray = []
        for (let obj of listDisciplines.value) {
            let empty = true
            for (let newobj of newArray) {
                if (obj.nameDisciplineOne === newobj.nameDisciplineOne && obj.nameDisciplineTwo === newobj.nameDisciplineTwo) {
                    empty = false
                }
            }
            if (empty) {
                newArray.push({
                    idElectiveDiscipline: obj.idElectiveDiscipline,
                    nameSemestr: obj.nameSemestr,
                    nameDisciplineOne: obj.nameDisciplineOne,
                    nameDisciplineTwo: obj.nameDisciplineTwo,
                    prohibitionOfChanges: obj.prohibitionOfChanges,
                    idChoise: obj.idChoise,
                    choiseDisciplineOne: obj.choiseDisciplineOne,
                    choiseDisciplineTwo: obj.choiseDisciplineTwo,
                })
            } else {
                let arrayIdElectiveDiscipline = new Array()
                let arrayIdChoise = new Array()

                for (let newobj of newArray) {
                    if (obj.nameDisciplineOne === newobj.nameDisciplineOne && obj.nameDisciplineTwo === newobj.nameDisciplineTwo) {
                        arrayIdElectiveDiscipline.push(newobj.idElectiveDiscipline, obj.idElectiveDiscipline)
                        arrayIdChoise.push(newobj.idChoise, obj.idChoise)
                        newobj.idElectiveDiscipline = arrayIdElectiveDiscipline
                        newobj.idChoise = arrayIdChoise
                        newobj.nameSemestr = `${newobj.nameSemestr}, ${obj.nameSemestr}`
                    }
                }
            }
        }
        return newArray
    }

    const handleChange = async (event, newValue) => {
        if (newValue) {
            setShowForm(false)
            setStudentId(newValue)
            const object = listGroups.filter(
                item =>
                item.studentId === newValue
            )[0];
            const {data: ListDisciplines} = await api.electiveDisciplines.getDisciplines(object.idGroup,newValue)
            setListDisciplines(generateObject(ListDisciplines))
            setShowForm(true)
        }
    };


    return (
        <MainElectiveDisciplines>

            <Grid container
                  spacing={2}
                  direction="column"
                  justifyContent="center"
                  alignItems="stretch"
            >
                <Grid item xs={12}>
                    <CustomAlert
                        severity="info"
                        title='Информация!'
                        content='Вы можете выбрать только одну дисциплину! Во всех образовательных программах ЗабГУ,
                        кроме обязательной части, предусмотрены дисциплины, которые студенты могут выбирать
                        и изучать по своему желанию.'
                        activeAlert={true}
                    />
                </Grid>
                <Grid item xs={12}>
                    <Box style={{marginBottom: 10}}>

                        <TabContexts
                            handleChange={handleChange}
                            value={studentId}
                            Tabs={
                                listGroups.map(item =>
                                    <Tab
                                        key={item.studentId}
                                        className={classesMain.TabsItems}
                                        label={<div data-group={item.idGroup} className={classesMain.TabItemText}>{item.groupName}</div>}
                                        value={item.studentId}
                                    />
                                )
                            }
                            TabPanels={
                                listGroups.map(item =>
                                    <TabPanel value={item.studentId}>
                                        {
                                            showForm ?
                                                listDisciplines.length === 0 ?
                                                    <CustomAlert
                                                        severity="info"
                                                        title='Информация!'
                                                        content='На Ваш учебный план не распределены дисциплины!'
                                                        activeAlert={true}
                                                    /> :
                                                    <Grid item xs={12}>
                                                        <Grid
                                                            container
                                                            direction="column"
                                                            justifyContent="center"
                                                            alignItems="center"
                                                            spacing={2}
                                                        >
                                                            {
                                                                listDisciplines?.map(
                                                                    (itemDisciplines, index) =>
                                                                        <ItemElectiveDisciplines
                                                                            grow={grow}
                                                                            timeout={index * 700}
                                                                            studentId={studentId}
                                                                            key={itemDisciplines.nameDisciplineOne}
                                                                            itemListDiscipline={itemDisciplines}/>
                                                                )
                                                            }
                                                        </Grid>
                                                    </Grid>
                                                :
                                                <Grid item xs={12} style={{display: 'flex', justifyContent: 'center'}}>
                                                    <img src={loagingGif} alt=""/>
                                                </Grid>
                                        }
                                    </TabPanel>
                                )
                            }
                        />
                    </Box>

                </Grid>


            </Grid>

        </MainElectiveDisciplines>
    )
}

export default ElectiveDisciplines;