import React from 'react';
import {Typography} from "@material-ui/core";
import useStylesMain from "../../../../Styles/MainStyles";

function ItemListEducationalPrograms({infoEducationalProgram}) {
    const classesMain = useStylesMain()

    return (
        <tr>
            <td className={classesMain.TableTd}>
                <Typography variant="overline"
                            display="block"
                            gutterBottom
                            style={{fontSize: 16, color: '#485C90'}}
                            align={'center'}>
                    {infoEducationalProgram.surname}
                </Typography>
            </td>
            <td className={classesMain.TableTd}>
                <Typography variant="overline"
                            display="block"
                            gutterBottom
                            style={{fontSize: 16, color: '#485C90'}}
                            align={'center'}>
                    {infoEducationalProgram.name}
                </Typography>
            </td>
            <td className={classesMain.TableTd}>
                <Typography variant="overline"
                            display="block"
                            gutterBottom
                            style={{fontSize: 16, color: '#485C90'}}
                            align={'center'}>
                    {infoEducationalProgram.middle_name}
                </Typography>
            </td>
            <td className={classesMain.TableTd}>
                <Typography variant="overline"
                            display="block"
                            gutterBottom
                            style={{fontSize: 16, color: '#485C90'}}
                            align={'center'}>
                    {infoEducationalProgram.snils}
                </Typography>
            </td>
            <td className={classesMain.TableTd}>
                <Typography variant="overline"
                            display="block"
                            gutterBottom
                            style={{fontSize: 16, color: '#485C90'}}
                            align={'center'}>
                    {infoEducationalProgram.inn}
                </Typography>
            </td>
            <td className={classesMain.TableTd}>
                <Typography variant="overline"
                            display="block"
                            gutterBottom
                            style={{fontSize: 16, color: '#485C90'}}
                            align={'center'}>
                    {infoEducationalProgram.email}
                </Typography>
            </td>
            <td className={classesMain.TableTd}>
                <Typography variant="overline"
                            display="block"
                            gutterBottom
                            style={{fontSize: 16, color: '#485C90'}}
                            align={'center'}>
                    {infoEducationalProgram.study_year}
                </Typography>
            </td>
        </tr>
    );
}

export default ItemListEducationalPrograms;