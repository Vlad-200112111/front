import React from 'react';
import {Box, Button, Grid, Typography} from "@material-ui/core";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import {useState} from "react";
import api from "../../../Services/api";
import {useNavigate} from "react-router-dom";
import Cookies from "js-cookie";
import useStylesMain from "../../../Styles/MainStyles";

function RolesManager(props) {
    const classesMain = useStylesMain()
    const navigate = useNavigate();
    const token = Cookies.get("auth-token")

    const [loginDataRoles, setLoginDataRoles] = useState([])
    const switchingRoles = async (item) => {
        const object = new Object()
        object.token = token
        object.role = item

        await api.auth.assigningRole(object)
        navigate('/');
    }
    return (
        <Grid
            container
            direction="row"
            justifyContent="center"
            alignItems="center"
            style={{minHeight: '90vh'}}
        >

            <Box
                className={classesMain.backgroundMain}
                sx={{p: 3}}>
                <Box sx={{m: 3}}>
                    <Grid
                        container
                        direction="row"
                        justifyContent="center"
                        alignItems="center">
                        <Typography color="textPrimary" variant="h5">Выберите роль:</Typography>
                    </Grid>
                </Box>
                <Grid
                    container
                    direction="row"
                    justifyContent="center"
                    alignItems="center">
                    {loginDataRoles?.map((item) =>
                        <div key={item.toString()}>
                            <Grid item>
                                <Box sx={{m: 1}}>
                                    <Button
                                        onClick={() => switchingRoles(item)}
                                        startIcon={<AdminPanelSettingsIcon/>}
                                        data-role={item}
                                        variant="outlined">
                                        {item}
                                    </Button>
                                </Box>
                            </Grid>
                        </div>
                    )}
                </Grid>
            </Box>
        </Grid>
    );
}

export default RolesManager;