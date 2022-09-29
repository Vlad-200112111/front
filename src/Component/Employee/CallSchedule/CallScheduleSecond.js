import React, {useEffect, useState} from 'react';
import MainCreateCallSchedule from "../../Modules/MainCreateCallSchedule/MainCreateCallSchedule";
import {Box, Grid} from "@mui/material";
import {Typography} from "@material-ui/core";
import useStylesMain from "../../../Styles/MainStyles";
import ItemCallSchedule from "./ItemCallSchedule";
import Button from "@mui/material/Button";
import api from "../../../Services/api";
import CustomFullScreenDialog from "../../UI/CustomFullScreenDialog/CustomFullScreenDialog";
import {createTheme, useTheme} from "@mui/material/styles";
import {useMemo} from "react";
import * as locales from "@mui/material/locale";
import {Link} from "react-router-dom";
import CRUD from "../../Modules/Functions/CRUD";

function CallScheduleSecond(props) {
    const classesMain = useStylesMain()
    const [listCallSchedule, setListCallSchedule] = useState([])
    const [openDialog, setOpenDialog] = useState(false)
    const [locale, setLocale] = useState('ruRu');
    const theme = useTheme();

    const [canUpdate, setCanUpdate] = useState(false)
    const [canCreate, setCanCreate] = useState(false)
    const [canDelete, setCanDelete] = useState(false)
    const [canRead, setCanRead] = useState(false)

    const themeWithLocale = useMemo(
        () => createTheme(theme, locales[locale]),
        [locale, theme],
    );

    useEffect(async () => {
        const {data: MyStuffId} = await api.staff.getStuffId()

        CRUD('Сотрудник', 'Расписание звонков', MyStuffId.employeeId-1, MyStuffId.employeeId,'Сотрудник', setCanCreate, setCanRead, setCanUpdate, setCanDelete)
        const {data: ListCallSchedule} = await api.scheduleCall.getScheduleCall()
        setListCallSchedule(ListCallSchedule)
    }, [])


    return (
        <MainCreateCallSchedule>
            <Box>
                <Grid
                    container
                    direction="row"
                    justifyContent="space-between"
                    alignItems="center"
                >
                    <Grid item>
                        <Typography variant="overline"
                                    display="block"
                                    gutterBottom
                                    style={{fontSize: 18, color: '#485C90', marginTop: 20}}>
                            Список расписаний:
                        </Typography>
                    </Grid>
                    {
                        canCreate?
                            <Grid item>
                                <Link to={`/call-schedule/create-call-schedule`}
                                      style={{textDecoration: 'none', color: '#fff'}}>
                                    <Button
                                        style={{width: '100%'}}
                                        className={classesMain.button}
                                        onClick={() => setOpenDialog(true)}
                                    >
                                        Создать
                                    </Button>
                                </Link>
                            </Grid>
                            :''
                    }

                </Grid>
                {
                    listCallSchedule?.map(item =>
                        <ItemCallSchedule canCreate={canCreate} canRead={canRead} canUpdate={canUpdate} canDelete={canDelete}  infoSchedule={item} setListCallSchedule={setListCallSchedule}/>
                    )
                }
            </Box>


        </MainCreateCallSchedule>
    );
}

export default CallScheduleSecond;