import React from 'react';
import {Typography} from "@material-ui/core";
import useStylesMain from "../../../../Styles/MainStyles";
import {Box} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import api from "../../../../Services/api";

function ItemListMarks({infoMark}) {
    const classesMain = useStylesMain()

    async function deleteMark(){
        await api.modernDigitalEducationalEnvironment.deleteItemMarks(infoMark.id)
    }

    return (
        <tr>
            <td className={classesMain.TableTd}>
                <Typography variant="overline"
                            display="block"
                            gutterBottom
                            style={{fontSize: 16, color: '#485C90'}}
                            align={'center'}>
                    {infoMark.discipline.title}
                </Typography>
            </td>
            <td className={classesMain.TableTd}>
                <Typography variant="overline"
                            display="block"
                            gutterBottom
                            style={{fontSize: 16, color: '#485C90'}}
                            align={'center'}>
                    {infoMark.value}
                </Typography>
            </td>
            <td className={classesMain.TableTd}>
                <Typography variant="overline"
                            display="block"
                            gutterBottom
                            style={{fontSize: 16, color: '#485C90'}}
                            align={'center'}>
                    {infoMark.semester}
                </Typography>
            </td>
            <td className={classesMain.TableTd}>
                <Box style={{width: '100%'}}>
                    <IconButton
                        style={{background: 'rgb(255 152 69)', color: '#fff'}}
                        aria-label="close"
                        color="inherit"
                        size="small"
                        onClick={deleteMark}
                    >
                        {<DeleteIcon/>}
                    </IconButton>
                </Box>
            </td>
        </tr>
    );
}

export default ItemListMarks;