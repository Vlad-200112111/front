import React from 'react';
import useStylesMain from "../../../Styles/MainStyles";
import {Box, Grid, Typography} from "@material-ui/core";

function MainModernDigitalEducationalEnvironment(props) {
    const classesMain = useStylesMain()

    return (
        <div>
            <Grid maxWidth="xs" className={classesMain.backgroundMain}>
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <Typography className={classesMain.Title} variant="h1">Современная цифровая образовательная среда</Typography>
                    </Grid>
                </Grid>
                <Box
                    sx={{
                        width: '100%', typography: 'body1'
                    }}>
                    {props.children}
                </Box>
            </Grid>
        </div>
    );
}

export default MainModernDigitalEducationalEnvironment;