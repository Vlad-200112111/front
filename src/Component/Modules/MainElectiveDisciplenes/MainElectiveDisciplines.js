import useStylesMain from "../../../Styles/MainStyles";
import {
    Grid, Typography, Box
} from "@material-ui/core";

function MainElectiveDisciplines(props) {
    const classesMain = useStylesMain();

    return (<div>
        <Grid className={classesMain.backgroundMain}>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <Typography className={classesMain.Title} variant="h1">Дисциплины по выбору</Typography>
                </Grid>
            </Grid>
            <Box
                sx={{
                    typography: 'body1', marginLeft:'auto', marginRight:'auto'
                }}>
                {props.children}
            </Box>
        </Grid>
    </div>)
}
export default MainElectiveDisciplines;