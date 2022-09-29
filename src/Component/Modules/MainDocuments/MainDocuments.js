import useStylesMain from "../../../Styles/MainStyles";
import {
     Typography, Box
} from "@material-ui/core";
import {Grid} from "@mui/material";

function MainDocuments(props) {
    const classesMain = useStylesMain();

    return (<div>
            <Grid maxWidth="xs" className={classesMain.backgroundMain}>
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <Typography className={classesMain.Title} variant="h1">Заказ справок</Typography>
                    </Grid>
                </Grid>
                <Box
                    sx={{
                        width: '100%', typography: 'body1'
                    }}>
                    {props.children}
                </Box>
            </Grid>
        </div>)
}

export default MainDocuments