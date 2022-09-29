import {useState, useEffect} from "react";
import {
    Button,
    Grid, MenuItem,
    Typography,

} from "@material-ui/core";
import {
    Box,
    Tab, Tabs
} from '@mui/material';
import useStylesMain from "../../../Styles/MainStyles";
import ItemAcademicPerformance from './ItemAcademicPerformance';
import api from "./../../../Services/api";
import CircularProgress from "@mui/material/CircularProgress";
import loagingGif from '../../../Assets/Image/loading.gif'
import CustomSelect from "../../UI/CustomSelect/CustomSelect";
import CustomAlert from "../../UI/CustomAlert/CustomAlert";
import React from "react";
import {TabContext, TabList, TabPanel} from "@mui/lab";
import TabContexts from "../../UI/CustomTab/TabContexts";


function AcademicPerformance() {
    const classesMain = useStylesMain();
    const [loading, setLoading] = useState(false)
    const [loadingItem, setLoadingItem] = useState(false)
    const [listGroups, setListGroups] = useState([])
    const [studentId, setStudentId] = useState('')
    const [listSemester, setListSemester] = useState([]);
    const [listAcademicPerformance, setListAcademicPerformance] = useState([]);

    useEffect(async () => {
        const {data: ListGroups} = await api.educationalProcess.getListGroups();
        setListGroups(ListGroups)
        setStudentId(ListGroups[0].studentId)

        const {data: ListSemester} = await api.studentProgressService.getListSemester(ListGroups[0].studentId);
        setListSemester(ListSemester.value.sort((prev, next) => prev.id - next.id))
    }, [])


    async function getSemester(newValue) {
        const {data: ListSemester} = await api.studentProgressService.getListSemester(newValue);
        if (Array.isArray(ListSemester.value)) {
            setListSemester(ListSemester.value.sort((prev, next) => prev.id - next.id))
            setLoading(false)
        }
    };


    const handleChange = async (event, newValue) => {
        setStudentId(newValue)
        setLoading(true)
        setListAcademicPerformance([])
        await getSemester(newValue)
    };

    async function getAcademicPerformance(event) {
        setLoadingItem(true)
        const {data: ListAcademicPerformance} = await api.studentProgressService.getListAcademicPerformance(event.target.value, studentId);
        setListAcademicPerformance(ListAcademicPerformance.value)
        setLoadingItem(false)
    }

    return (
        <div>
            <Grid maxWidth="xs" className={classesMain.backgroundMain}>
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <Typography className={classesMain.Title} variant="h1">Успеваемость</Typography>
                    </Grid>
                </Grid>

                <TabContexts
                    handleChange={handleChange}
                    value={studentId}
                    Tabs={
                        listGroups.map(item =>
                            <Tab
                                key={item.studentId}
                                className={classesMain.TabsItems}
                                label={<div className={classesMain.TabItemText}>{item.groupName}</div>}
                                value={item.studentId}
                            />
                        )
                    }
                    TabPanels={
                        listGroups.map(item =>
                            <TabPanel value={item.studentId}>
                                {
                                    !loading && listSemester.length !== 0 ?
                                        <>
                                            <Grid
                                                container
                                                direction="column"
                                                justifyContent="center"
                                                alignItems="stretch"
                                            >
                                                <Grid item>
                                                    <Grid
                                                        container
                                                        direction="row"
                                                        justifyContent="flex-start"
                                                        alignItems="flex-start"
                                                        spacing={2}
                                                    >
                                                        <CustomSelect xs={6} contentCustomSelect="Семестр"
                                                                      setValueSelect={getAcademicPerformance}>
                                                            {
                                                                listSemester.map(item =>
                                                                    <MenuItem
                                                                        className={classesMain.SelectItems}
                                                                        value={item.semestrId}
                                                                        key={item.semestrId}>
                                                                        {item.semestrName}
                                                                    </MenuItem>
                                                                )
                                                            }
                                                        </CustomSelect>
                                                        <Grid item xs={6}>
                                                            <CustomAlert
                                                                severity="info"
                                                                title='Информация!'
                                                                content='Выберите семестр для отображения Вашей успеваемости по выбранному семестру!'
                                                                activeAlert={true}
                                                            />
                                                        </Grid>
                                                    </Grid>
                                                </Grid>
                                                <Grid item>
                                                    <Box sx={{width: '100%', typography: 'body1'}}>
                                                        <ItemAcademicPerformance
                                                            loadingItem={loadingItem}
                                                            listAcademicPerformance={listAcademicPerformance}/>
                                                    </Box>
                                                </Grid>
                                            </Grid>
                                        </>
                                        :
                                        <Grid item xs={12} style={{display: 'flex', justifyContent: 'center'}}>
                                            <img src={loagingGif} alt=""/>
                                        </Grid>
                                }
                            </TabPanel>
                        )
                    }
                />
            </Grid>
        </div>
    )
}

export default AcademicPerformance;