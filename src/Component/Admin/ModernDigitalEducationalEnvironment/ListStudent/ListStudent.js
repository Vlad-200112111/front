import React, {useEffect} from 'react';
import api from "../../../../Services/api";
import {useState} from "react";
import useStylesMain from "../../../../Styles/MainStyles";
import {Box} from "@mui/material";
import {Grid, Typography} from "@material-ui/core";
import MainModernDigitalEducationalEnvironment
    from "../../../Modules/MainModernDigitalEducationalEnvironment/MainModernDigitalEducationalEnvironment";
import IconButton from "@mui/material/IconButton";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import Button from "@mui/material/Button";
import ItemListStudent from "./ItemListStudent";
import DeleteIcon from "@mui/icons-material/Delete";

function ListStudent(props) {
    const classesMain = useStylesMain()
    const KeyOrganization = '91568de5-2974-4b4d-a4eb-46c693d9851c'
    const OrganizationId = '8111c06e-db72-47a2-8cf8-7574062a7bae'
    const NameParam = 'X-CN-UUID'

    const [page, setPage] = useState(1)
    const [pageSize, setpageSize] = useState(5)
    const [listStudent, setListStudent] = useState([])


    useEffect(async () => {
        await api.modernDigitalEducationalEnvironment.checkConnection()
        const {data: ListStudents} = await api.modernDigitalEducationalEnvironment.getListStudents(OrganizationId)
        setListStudent(ListStudents.results)
    }, [])

    async function deleteAllStudent(){
        // for (let i = 0; i < listStudent.length; i++) {
        //     const {data: ListContingentMovements} = await api.modernDigitalEducationalEnvironment.getListContingentMovements(listStudent[i].id)
        //     for (let j = 0; j < ListContingentMovements.length; j++) {
        //         await api.modernDigitalEducationalEnvironment.deleteItemContingentMovements(ListContingentMovements[j].id)
        //     }
        //     const {data: ListMarks} = await api.modernDigitalEducationalEnvironment.getListMarks(listStudent[i].id)
        //     for (let j = 0; j < ListMarks.length; j++) {
        //         await api.modernDigitalEducationalEnvironment.deleteItemMarks(ListMarks[i].id)
        //     }
        //     for (let j = 0; j < listStudent[i].study_plans.length; j++) {
        //         await api.modernDigitalEducationalEnvironment.deleteConnectionPlansWithStudents(listStudent[i].id, listStudent[i].study_plans[j].id)
        //     }
        // }

    }

    return (
        <MainModernDigitalEducationalEnvironment>
            {/*<Grid container*/}
            {/*      alignItems='center'*/}
            {/*      justifyContent='space-between'*/}
            {/*      direction='column'*/}
            {/*>*/}
            <Box>
                <table style={{width: '100%'}}>
                    <tbody>
                    <tr>
                        <td className={classesMain.TableMainTd} colSpan="12">
                            <Typography variant="overline"
                                        display="block"
                                        gutterBottom
                                        style={{fontSize: 16}}
                                        align={'center'}>
                                Список студентов
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
                        <td style={{width: 55}} className={classesMain.TableMainTd}>
                            <Box style={{width: '100%'}}>
                                <IconButton
                                    style={{background: 'rgb(255 152 69)', color: '#fff'}}
                                    aria-label="close"
                                    color="inherit"
                                    size="small"
                                >
                                    {<DeleteIcon/>}
                                </IconButton>
                            </Box>
                        </td>
                        <td className={classesMain.TableMainTd}>
                            <Typography variant="overline"
                                        display="block"
                                        gutterBottom
                                        style={{fontSize: 14}}
                                        align={'center'}>
                                Движения контингента
                            </Typography>
                        </td>
                        <td className={classesMain.TableMainTd}>
                            <Typography variant="overline"
                                        display="block"
                                        gutterBottom
                                        style={{fontSize: 14}}
                                        align={'center'}>
                                Оценки
                            </Typography>
                        </td>
                        <td className={classesMain.TableMainTd}>
                            <Typography variant="overline"
                                        display="block"
                                        gutterBottom
                                        style={{fontSize: 14}}
                                        align={'center'}>
                             Учебные планы
                            </Typography>
                        </td>
                        <td className={classesMain.TableMainTd}>
                            <Typography variant="overline"
                                        display="block"
                                        gutterBottom
                                        style={{fontSize: 14}}
                                        align={'center'}>
                                Удаление связи учебных планов со студентами
                            </Typography>
                        </td>
                    </tr>
                    {
                        listStudent?.map(infoStudent =>
                            <ItemListStudent infoStudent={infoStudent}/>
                        )
                    }
                    <tr>
                        <td className={classesMain.TableMainTd} colSpan="12">
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
            {/*</Grid>*/}
        </MainModernDigitalEducationalEnvironment>
    );
}

export default ListStudent;