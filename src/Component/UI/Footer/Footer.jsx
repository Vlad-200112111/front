import {
    TextField,
    Grid,
    makeStyles,
    Container,
    Button,
    Typography, Box,
} from "@material-ui/core";
import useStylesMain from "../../../Styles/MainStyles";

export default function Footer() {
    const classesMain = useStylesMain();

    return (
        <>
            <Grid container
                  className={classesMain.footer}
                  direction="column"
                  alignItems="center"
                  justifyContent="center">
                <Box sx={{p: 2}}>
                    <Typography className={classesMain.textFooter} variant="body1">© 2022 ФГБОУ ВО "ЗабГУ" Адрес: 672039,
                        г.Чита, ул.Александро-Заводская, д.30, E-mail: mail@zabgu.ru.</Typography>
                </Box>
            </Grid>
        </>
    );
}
