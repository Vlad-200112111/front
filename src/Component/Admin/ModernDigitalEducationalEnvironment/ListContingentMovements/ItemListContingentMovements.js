import React from 'react';
import {Typography} from "@material-ui/core";
import useStylesMain from "../../../../Styles/MainStyles";
import {Box} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import api from "../../../../Services/api";

function ItemListContingentMovements({infoContingentMovement}) {
    const classesMain = useStylesMain()

    async function deleteContingentMovement(){
        await api.modernDigitalEducationalEnvironment.deleteItemContingentMovements(infoContingentMovement.id)
    }

    const educationForm = new Map([
        ['EXTRAMURAL', 'Заочная'],
        ['FULL_TIME', 'Очная'],
        ['PART_TIME', 'Очно-заочная'],
        ['SHORT_EXTRAMURAL', 'Сокращенная заочная'],
        ['SHORT_FULL_TIME', 'Сокращенная очная'],
        ['EXTERNAL', 'Экстернат'],
    ])

    return (
        <tr>
            <td className={classesMain.TableTd}>
                <Typography variant="overline"
                            display="block"
                            gutterBottom
                            style={{fontSize: 16, color: '#485C90'}}
                            align={'center'}>
                    {infoContingentMovement.contingent_flow}
                </Typography>
            </td>
            <td className={classesMain.TableTd}>
                <Typography variant="overline"
                            display="block"
                            gutterBottom
                            style={{fontSize: 16, color: '#485C90'}}
                            align={'center'}>
                    {infoContingentMovement.date}
                </Typography>
            </td>
            <td className={classesMain.TableTd}>
                <Typography variant="overline"
                            display="block"
                            gutterBottom
                            style={{fontSize: 16, color: '#485C90'}}
                            align={'center'}>
                    {infoContingentMovement.faculty}
                </Typography>
            </td>
            <td className={classesMain.TableTd}>
                <Typography variant="overline"
                            display="block"
                            gutterBottom
                            style={{fontSize: 16, color: '#485C90'}}
                            align={'center'}>
                    {educationForm.get(infoContingentMovement.education_form)}
                </Typography>
            </td>
            <td className={classesMain.TableTd}>
                <Typography variant="overline"
                            display="block"
                            gutterBottom
                            style={{fontSize: 16, color: '#485C90'}}
                            align={'center'}>
                    {infoContingentMovement.form_fin}
                </Typography>
            </td>
            <td className={classesMain.TableTd}>
                <Typography variant="overline"
                            display="block"
                            gutterBottom
                            style={{fontSize: 16, color: '#485C90'}}
                            align={'center'}>
                    {infoContingentMovement.details}
                </Typography>
            </td>
            <td className={classesMain.TableTd}>
                <Box style={{width: '100%'}}>
                    <IconButton
                        style={{background: 'rgb(255 152 69)', color: '#fff'}}
                        aria-label="close"
                        color="inherit"
                        size="small"
                        onClick={deleteContingentMovement}
                    >
                        {<DeleteIcon/>}
                    </IconButton>
                </Box>
            </td>
        </tr>
    );
}

export default ItemListContingentMovements;