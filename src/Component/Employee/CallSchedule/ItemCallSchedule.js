import React from 'react';
import {Box, Grid, Typography} from "@material-ui/core";
import useStylesMain from "../../../Styles/MainStyles";
import {Stack} from "@mui/material";
import {useState} from "react";
import CustomDialog from "../../UI/CustomDialog/CustomDialog";
import CustomFullScreenDialog from "../../UI/CustomFullScreenDialog/CustomFullScreenDialog";
import CustomIconButton from "../../UI/CustomIconButton/CustomIconButton";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import api from "../../../Services/api";
import {Link} from "react-router-dom";
import PreviewIcon from '@mui/icons-material/Preview';

function ItemCallSchedule({infoSchedule, setListCallSchedule, second, canDelete, canCreate, canUpdate, canRead }) {
    const [openDialogForEdit, setOpenDialogForEdit] = useState(false)
    const [openDialogForDelete, setOpenDialogForDelete] = useState(false)




    function openDeleteDialog() {
        setOpenDialogForDelete(true)
    }

    function openEditDialog() {
        setOpenDialogForEdit(true)
    }

    async function deleteBuild() {
        await api.scheduleCall.deleteScheduleCall(infoSchedule.id)
        const {data: ListCallSchedule} = await api.scheduleCall.getScheduleCall()
        setListCallSchedule(ListCallSchedule)
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
                            {`${infoSchedule.name}`}
                        </Typography>
                    </Grid>
                    <Grid item>
                        <Stack spacing={2} direction="row">
                            <Link to={`/call-schedule/show-call-schedule/${infoSchedule.id}`}
                                  style={{textDecoration: 'none', color: '#fff'}}>
                                <CustomIconButton
                                    icon={<PreviewIcon/>}
                                    caption={'Нажмите для того, чтобы отобразить'}
                                />
                            </Link>
                            {canCreate?

                                    <>
                                        <Link to={`/call-schedule/edit-call-schedule/${infoSchedule.id}`}
                                              style={{textDecoration: 'none', color: '#fff'}}>
                                            <CustomIconButton
                                                icon={<EditIcon/>}
                                                caption={'Нажмите для того, чтобы редактировать'}
                                            />
                                        </Link>
                                        <CustomIconButton
                                            icon={<DeleteIcon/>}
                                            caption={'Нажмите для того, чтобы удалить'}
                                            inputFunction={openDeleteDialog}
                                        />
                                    </>
                                :''
                            }
                        </Stack>
                    </Grid>
                </Grid>
            </Box>
        </>
    );
}

export default ItemCallSchedule;