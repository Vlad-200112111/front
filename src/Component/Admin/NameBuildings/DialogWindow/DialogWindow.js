import React, {useEffect, useState} from 'react';
import {Box, Button, Grid} from "@material-ui/core";
import CustomFullScreenDialog from "../../../UI/CustomFullScreenDialog/CustomFullScreenDialog";
import {Stack, Typography} from "@mui/material";
import CustomIconButton from "../../../UI/CustomIconButton/CustomIconButton";
import useStylesMain from "../../../../Styles/MainStyles";
import CustomDialog from "../../../UI/CustomDialog/CustomDialog";
import CustomInput from "../../../UI/CustomInput/CustomInput";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import api from "../../../../Services/api";
import Cookies from "js-cookie";

function DialogWindow({infoBuild, setListBuild}) {
    const classesMain = useStylesMain()
    const [openDialogForEdit, setOpenDialogForEdit] = useState(false)
    const [openDialogForDelete, setOpenDialogForDelete] = useState(false)
    const [buildName, setBuildName] = useState('')
    const [buildShortName, setBuildShortName] = useState('')

    useEffect(()=>{
        setBuildName(infoBuild.name)
        setBuildShortName(infoBuild.shortName)
    },[])

    function openDeleteDialog() {
        setOpenDialogForDelete(true)
    }

    function openEditDialog() {
        setOpenDialogForEdit(true)
    }

    async function updateBuild(){
        await api.scheduleCall.updateBuilding({
            token: Cookies.get("auth-token"),
            name: buildName,
            shortName: buildShortName,
        }, infoBuild.id)
        const {data: ListBuild} = await api.scheduleCall.getBuilding()
        setListBuild(ListBuild)
    }

    async function deleteBuild(){
        await api.scheduleCall.deleteBuilding(infoBuild.id)
        const {data: ListBuild} = await api.scheduleCall.getBuilding()
        setListBuild(ListBuild)
    }

    return (
        <>
            <CustomDialog
                title="Подтверждение удаления"
                content="Подвердите удаление"
                open={openDialogForDelete}
                setOpen={setOpenDialogForDelete}
                onConfirm={deleteBuild}
            />
            <CustomFullScreenDialog
                fullWidthScreenDialog={true}
                fullScreenDialog={false}
                titleCustomFullScreenDialog='Редактирование'
                setOpenCustomFullScreenDialog={setOpenDialogForEdit}
                openCustomFullScreenDialog={openDialogForEdit}
                scrollType='body'>
                <Box sx={{m: 4}}>
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
                        onClick={updateBuild}
                    >
                        Изменить
                    </Button>
                </Box>
            </CustomFullScreenDialog>

            <Box style={{background: '#5A7DCF', padding: 10, marginTop: 10}}>
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
                                    style={{fontSize: 14, color: '#fff'}}
                                    align={'center'}>
                            {`${infoBuild.name} (${infoBuild.shortName})`}
                        </Typography>
                    </Grid>
                    <Grid item>
                        <Stack spacing={2} direction="row">
                            <CustomIconButton
                                icon={<EditIcon/>}
                                caption={'Нажмите для того, чтобы редактировать'}
                                inputFunction={openEditDialog}
                            />
                            <CustomIconButton
                                icon={<DeleteIcon/>}
                                caption={'Нажмите для того, чтобы удалить'}
                                inputFunction={openDeleteDialog}
                            />
                        </Stack>
                    </Grid>
                </Grid>
            </Box>

        </>
    );
}

export default DialogWindow;