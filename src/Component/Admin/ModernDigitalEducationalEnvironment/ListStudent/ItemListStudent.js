import React from 'react';
import {Typography} from "@material-ui/core";
import useStylesMain from "../../../../Styles/MainStyles";
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from "@mui/material/IconButton";
import {Box} from "@mui/material";
import {Link} from "react-router-dom";
import api from "../../../../Services/api";

function ItemListStudent({infoStudent}) {
    const classesMain = useStylesMain()

    async function deleteStudent() {
        await api.modernDigitalEducationalEnvironment.deleteItemStudent(infoStudent.id)
    }

    async function deleteConnectionPlansWithStudents() {
        for (let i = 0; i < infoStudent.study_plans.length; i++) {
            await api.modernDigitalEducationalEnvironment.deleteConnectionPlansWithStudents(infoStudent.id, infoStudent.study_plans[i].id)
        }
    }

    return (
        <tr>
            <td className={classesMain.TableTd}>
                <Typography
                    display="block"
                    gutterBottom
                    style={{fontSize: 16, color: '#485C90'}}
                    align={'center'}>
                    {infoStudent.surname}
                </Typography>
            </td>
            <td className={classesMain.TableTd}>
                <Typography
                    display="block"
                    gutterBottom
                    style={{fontSize: 16, color: '#485C90'}}
                    align={'center'}>
                    {infoStudent.name}
                </Typography>
            </td>
            <td className={classesMain.TableTd}>
                <Typography
                    display="block"
                    gutterBottom
                    style={{fontSize: 16, color: '#485C90'}}
                    align={'center'}>
                    {infoStudent.middle_name}
                </Typography>
            </td>
            <td className={classesMain.TableTd}>
                <Typography
                    display="block"
                    gutterBottom
                    style={{fontSize: 16, color: '#485C90'}}
                    align={'center'}>
                    {infoStudent.snils}
                </Typography>
            </td>
            <td className={classesMain.TableTd}>
                <Typography
                    display="block"
                    gutterBottom
                    style={{fontSize: 16, color: '#485C90'}}
                    align={'center'}>
                    {infoStudent.inn}
                </Typography>
            </td>
            <td className={classesMain.TableTd}>
                <Typography
                    display="block"
                    gutterBottom
                    style={{fontSize: 16, color: '#485C90'}}
                    align={'center'}>
                    {infoStudent.email}
                </Typography>
            </td>
            <td className={classesMain.TableTd}>
                <Typography
                    display="block"
                    gutterBottom
                    style={{fontSize: 16, color: '#485C90'}}
                    align={'center'}>
                    {infoStudent.study_year}
                </Typography>
            </td>
            <td className={classesMain.TableTd}>
                <Box style={{width: '100%'}}>
                    <IconButton
                        style={{background: 'rgb(255 152 69)', color: '#fff'}}
                        aria-label="close"
                        color="inherit"
                        size="small"
                        onClick={deleteStudent}
                    >
                        {<DeleteIcon/>}
                    </IconButton>
                </Box>
            </td>
            <td className={classesMain.TableTd}>
                <Link to={`/modern-digital-educational-environment/list-contingent-movements/${infoStudent.id}`}
                      style={{textDecoration: 'none', color: '#fff'}}>
                    <Typography
                        display="block"
                        gutterBottom
                        style={{fontSize: 16, color: '#485C90'}}
                        align={'center'}>
                        Движения контингента
                    </Typography>
                </Link>
            </td>
            <td className={classesMain.TableTd}>
                <Link to={`/modern-digital-educational-environment/list-marks/${infoStudent.id}`}
                      style={{textDecoration: 'none', color: '#fff'}}>
                    <Typography
                        display="block"
                        gutterBottom
                        style={{fontSize: 16, color: '#485C90'}}
                        align={'center'}>
                        Оценки
                    </Typography>
                </Link>
            </td>
            <td className={classesMain.TableTd}>
                <Link to={`/modern-digital-educational-environment/list-curricula/${infoStudent.id}`}
                      style={{textDecoration: 'none', color: '#fff'}}>
                    <Typography
                        display="block"
                        gutterBottom
                        style={{fontSize: 16, color: '#485C90'}}
                        align={'center'}>
                        Учебный план
                    </Typography>
                </Link>
            </td>
            <td className={classesMain.TableTd}>
                <Box style={{width: '100%'}}>
                    <IconButton
                        style={{background: 'rgb(255 152 69)', color: '#fff'}}
                        aria-label="close"
                        color="inherit"
                        size="small"
                        onClick={deleteConnectionPlansWithStudents}
                    >
                        {<DeleteIcon/>}
                    </IconButton>
                </Box>
            </td>
        </tr>
    );
}

export default ItemListStudent;