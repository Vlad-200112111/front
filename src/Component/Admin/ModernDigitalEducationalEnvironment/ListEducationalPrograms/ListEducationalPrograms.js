import React from 'react';
import MainModernDigitalEducationalEnvironment
    from "../../../Modules/MainModernDigitalEducationalEnvironment/MainModernDigitalEducationalEnvironment";
import {Grid, Typography} from "@material-ui/core";
import Button from "@mui/material/Button";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import {Box} from "@mui/material";
import useStylesMain from "../../../../Styles/MainStyles";


function ListEducationalPrograms(props) {
    const classesMain = useStylesMain()

    return (
        <MainModernDigitalEducationalEnvironment>

            <Box>
                <table style={{width: '100%'}}>
                    <tbody>
                    <tr>
                        <td className={classesMain.TableMainTd} colSpan="7">
                            <Typography variant="overline"
                                        display="block"
                                        gutterBottom
                                        style={{fontSize: 16}}
                                        align={'center'}>
                                Список образовательных программ
                            </Typography>
                        </td>
                    </tr>
                    <tr>
                        <td className={classesMain.TableMainTd}>
                            <Typography variant="overline"
                                        display="block"
                                        gutterBottom
                                        style={{fontSize: 14}}
                                        align={'center'}>
                                Фамилия
                            </Typography>
                        </td>
                        <td className={classesMain.TableMainTd}>
                            <Typography variant="overline"
                                        display="block"
                                        gutterBottom
                                        style={{fontSize: 14}}
                                        align={'center'}>
                                Имя
                            </Typography>
                        </td>
                        <td className={classesMain.TableMainTd}>
                            <Typography variant="overline"
                                        display="block"
                                        gutterBottom
                                        style={{fontSize: 14}}
                                        align={'center'}>
                                Отчество
                            </Typography>
                        </td>
                        <td className={classesMain.TableMainTd}>
                            <Typography variant="overline"
                                        display="block"
                                        gutterBottom
                                        style={{fontSize: 14}}
                                        align={'center'}>
                                Снилс
                            </Typography>
                        </td>
                        <td className={classesMain.TableMainTd}>
                            <Typography variant="overline"
                                        display="block"
                                        gutterBottom
                                        style={{fontSize: 14}}
                                        align={'center'}>
                                ИНН
                            </Typography>
                        </td>
                        <td className={classesMain.TableMainTd}>
                            <Typography variant="overline"
                                        display="block"
                                        gutterBottom
                                        style={{fontSize: 14}}
                                        align={'center'}>
                                Эл. почта
                            </Typography>
                        </td>
                        <td className={classesMain.TableMainTd}>
                            <Typography variant="overline"
                                        display="block"
                                        gutterBottom
                                        style={{fontSize: 14}}
                                        align={'center'}>
                                Курс
                            </Typography>
                        </td>
                    </tr>
                    {/*{*/}
                    {/*    listStudent?.map(infoStudent =>*/}
                    {/*        <ItemListStudent infoStudent={infoStudent}/>*/}
                    {/*    )*/}
                    {/*}*/}
                    <tr>
                        <td className={classesMain.TableMainTd} colSpan="7">
                            <Grid
                                container
                                direction="row"
                                justifyContent="space-around"
                                alignItems="center"
                            >
                                <Grid item>
                                    <Button
                                        style={{
                                            background: 'rgb(255 152 69)',
                                            borderRadius: 0,
                                            color: '#fff'
                                        }}
                                        variant="outlined"
                                        startIcon={<NavigateBeforeIcon/>}
                                    >
                                        Предыдущая
                                    </Button>
                                </Grid>
                                <Grid item>
                                    <Button
                                        style={{
                                            background: 'rgb(255 152 69)',
                                            borderRadius: 0,
                                            color: '#fff'
                                        }}
                                        variant="outlined"
                                        endIcon={<NavigateNextIcon/>}
                                    >
                                        Следующая
                                    </Button>
                                </Grid>
                            </Grid>
                        </td>
                    </tr>
                    </tbody>
                </table>
            </Box>

        </MainModernDigitalEducationalEnvironment>
    );
}

export default ListEducationalPrograms;