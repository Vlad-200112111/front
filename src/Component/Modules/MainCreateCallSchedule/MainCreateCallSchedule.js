import React from 'react';
import {Box, Grid, Typography} from "@material-ui/core";
import useStylesMain from "../../../Styles/MainStyles";

function MainCreateCallSchedule(props) {
    const classesMain = useStylesMain()

    return (
        <div>
            <Grid maxWidth="xs" className={classesMain.backgroundMain}>
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <Typography className={classesMain.Title} variant="h1">Расписание звонков</Typography>
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

export default MainCreateCallSchedule;