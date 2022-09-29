import {useState, useEffect} from "react";
import api from "./../../../Services/api";
import ItemDecree from "./ItemDecree";
import useStylesMain from "../../../Styles/MainStyles";
import MainDecree from "../../Modules/MainDecree/MainDecree";
import {Box, Grid, Tab} from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import {TabPanel} from "@mui/lab";
import TabContexts from "../../UI/CustomTab/TabContexts";
import React from "react";


function Decree() {
    const classesMain = useStylesMain()
    const [loading, setLoading] = useState(false)
    const [listOrders, setListOrders] = useState([])
    const [listGroups, setListGroups] = useState([])
    const [studentId, setStudentId] = useState('')

    useEffect(async () => {
        const {data: ListGroups} = await api.educationalProcess.getListGroups();
        setListGroups(ListGroups)
        setStudentId(ListGroups[0].studentId)

        const {data: ListOrders} = await api.studentOrderService.getOrders(ListGroups[0].studentId);
        setListOrders(ListOrders)
    }, []);


    const handleChange = async (event, newValue) => {
        if(newValue){
            setLoading(true)
            setStudentId(newValue)
            const {data: ListOrders} = await api.studentOrderService.getOrders(newValue);
            if (Array.isArray(ListOrders)) {
                setListOrders(ListOrders)
                setLoading(false)
            }
        }
    };

    return (
        <MainDecree>
            <Box style={{marginBottom: 10}}>
                <TabContexts
                    handleChange={handleChange}
                    value={studentId}
                    Tabs={
                        listGroups.map(item =>
                            <Tab key={item.studentId} className={classesMain.TabsItems} value={item.studentId}
                                 label={<div className={classesMain.TabItemText}>{item.groupName}</div>}/>
                        )}
                    TabPanels={
                        listGroups.map(item =>
                            <TabPanel value={item.studentId}>
                                {
                                    !loading ?
                                        <>
                                            {
                                                listOrders?.map(item =>
                                                    <ItemDecree orderData={item}/>
                                                )
                                            }
                                        </> :
                                        <Grid item xs={12} style={{display: 'flex', justifyContent: 'center'}}>
                                            <CircularProgress/>
                                        </Grid>
                                }
                            </TabPanel>)}/>
            </Box>
        </MainDecree>
    );
}

export default Decree;
