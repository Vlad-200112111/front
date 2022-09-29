import React, {useState} from 'react';
import MainModernDigitalEducationalEnvironment
    from "../../../Modules/MainModernDigitalEducationalEnvironment/MainModernDigitalEducationalEnvironment";
import {Grid, Typography} from "@material-ui/core";
import Button from "@mui/material/Button";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import {Box} from "@mui/material";
import useStylesMain from "../../../../Styles/MainStyles";
import {useParams} from "react-router-dom";
import {useEffect} from "react";
import api from "../../../../Services/api";
import ItemListContingentMovements from "./ItemListContingentMovements";


function ListContingentMovements(props) {
    const classesMain = useStylesMain()
    const params = useParams();
    const StudentId = params.StudentId;
    const [listContingentMovements, setListContingentMovements] = useState([])

    useEffect(async () => {
        await api.modernDigitalEducationalEnvironment.checkConnection()
        const {data: ListContingentMovements} = await api.modernDigitalEducationalEnvironment.getListContingentMovements(StudentId)
        setListContingentMovements(ListContingentMovements.results)
    }, [])


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
                                Список движений контингента в образовательной организации
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
                                Формулировка изменения
                            </Typography>
                        </td>
                        <td className={classesMain.TableMainTd}>
                            <Typography variant="overline"
                                        display="block"
                                        gutterBottom
                                        style={{fontSize: 14}}
                                        align={'center'}>
                                Дата внесения изменения
                            </Typography>
                        </td>
                        <td className={classesMain.TableMainTd}>
                            <Typography variant="overline"
                                        display="block"
                                        gutterBottom
                                        style={{fontSize: 14}}
                                        align={'center'}>
                                Факультет
                            </Typography>
                        </td>
                        <td className={classesMain.TableMainTd}>
                            <Typography variant="overline"
                                        display="block"
                                        gutterBottom
                                        style={{fontSize: 14}}
                                        align={'center'}>
                                Форма обучения
                            </Typography>
                        </td>
                        <td className={classesMain.TableMainTd}>
                            <Typography variant="overline"
                                        display="block"
                                        gutterBottom
                                        style={{fontSize: 14}}
                                        align={'center'}>
                                Форма оплаты
                            </Typography>
                        </td>
                        <td className={classesMain.TableMainTd}>
                            <Typography variant="overline"
                                        display="block"
                                        gutterBottom
                                        style={{fontSize: 14}}
                                        align={'center'}>
                                Детали
                            </Typography>
                        </td>
                        <td style={{width: 55}} className={classesMain.TableMainTd}>
                        </td>
                    </tr>
                    {
                        listContingentMovements?.map(infoContingentMovement =>
                            <ItemListContingentMovements infoContingentMovement={infoContingentMovement}/>
                        )
                    }
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

export default ListContingentMovements;