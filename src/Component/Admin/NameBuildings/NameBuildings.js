import React, {useEffect, useState} from 'react';
import {Box, Grid, Typography} from "@material-ui/core";
import useStylesMain from "../../../Styles/MainStyles";
import CustomAlert from "../../UI/CustomAlert/CustomAlert";
import CustomInput from "../../UI/CustomInput/CustomInput";
import {Stack} from "@mui/material";
import Button from "@mui/material/Button";
import DialogWindow from "./DialogWindow/DialogWindow";
import api from "../../../Services/api";
import Cookies from "js-cookie";

function NameBuildings(props) {
    const classesMain = useStylesMain()
    const [buildName, setBuildName] = useState('')
    const [listBuild, setListBuild] = useState([])

    useEffect(async () => {
        const {data: ListBuild} = await api.scheduleCall.getBuilding()
        setListBuild(ListBuild)
    }, [])

    async function addBuild() {
        await api.scheduleCall.sendBuilding({
            token: Cookies.get("auth-token"),
            name: buildName,
            shortName: buildShortName,
        })
        const {data: ListBuild} = await api.scheduleCall.getBuilding()
        setListBuild(ListBuild)
    }


    const [buildShortName, setBuildShortName] = useState('')
    return (
        <>
            <Grid maxWidth="xs" className={classesMain.backgroundMain}>
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <Typography className={classesMain.Title} variant="h1">Название корпусов</Typography>
                    </Grid>
                </Grid>
                <Box
                    sx={{
                        width: '100%', typography: 'body1'
                    }}>
                    <CustomAlert
                        severity="info"
                        title='Информация!'
                        content='Здесь Вы можете ввести название корпусов!'
                        activeAlert={true}
                    />
                    <Box>
                        <Stack direction={"row"} spacing={3}>
                            <CustomInput
                                title='Название'
                                label='Название корпуса'
                                customValueInput={buildName}
                                helperText='Введите сюда полное название корпуса'
                                setCustomValueInput={event => setBuildName(event.target.value)}
                            />
                            <CustomInput
                                title='Название'
                                label='Краткое название корпуса'
                                customValueInput={buildShortName}
                                helperText='Введите сюда краткое название корпуса'
                                setCustomValueInput={event => setBuildShortName(event.target.value)}
                            />
                        </Stack>
                        <Button
                            style={{width: '100%'}}
                            className={classesMain.button}
                            onClick={addBuild}
                        >
                            Добавить
                        </Button>
                    </Box>

                    <Box>
                        <Typography variant="overline"
                                    display="block"
                                    gutterBottom
                                    style={{fontSize: 18, color: '#485C90', marginTop: 20}}>
                            Список корпусов:
                        </Typography>
                        {
                            listBuild?.map(item=>
                                <DialogWindow setListBuild={setListBuild} infoBuild={item}/>
                            )
                        }
                    </Box>

                </Box>
            </Grid>
        </>
    );
}

export default NameBuildings;