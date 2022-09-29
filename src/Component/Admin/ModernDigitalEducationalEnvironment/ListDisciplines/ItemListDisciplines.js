import React from 'react';
import {Typography} from "@material-ui/core";
import useStylesMain from "../../../../Styles/MainStyles";

function ItemListDisciplines({infoDiscipline}) {
    const classesMain = useStylesMain()

    return (
        <tr>
            <td className={classesMain.TableTd}>
                <Typography variant="overline"
                            display="block"
                            gutterBottom
                            style={{fontSize: 16, color: '#485C90'}}
                            align={'center'}>
                    {infoDiscipline.surname}
                </Typography>
            </td>
            <td className={classesMain.TableTd}>
                <Typography variant="overline"
                            display="block"
                            gutterBottom
                            style={{fontSize: 16, color: '#485C90'}}
                            align={'center'}>
                    {infoDiscipline.name}
                </Typography>
            </td>
            <td className={classesMain.TableTd}>
                <Typography variant="overline"
                            display="block"
                            gutterBottom
                            style={{fontSize: 16, color: '#485C90'}}
                            align={'center'}>
                    {infoDiscipline.middle_name}
                </Typography>
            </td>
            <td className={classesMain.TableTd}>
                <Typography variant="overline"
                            display="block"
                            gutterBottom
                            style={{fontSize: 16, color: '#485C90'}}
                            align={'center'}>
                    {infoDiscipline.snils}
                </Typography>
            </td>
            <td className={classesMain.TableTd}>
                <Typography variant="overline"
                            display="block"
                            gutterBottom
                            style={{fontSize: 16, color: '#485C90'}}
                            align={'center'}>
                    {infoDiscipline.inn}
                </Typography>
            </td>
            <td className={classesMain.TableTd}>
                <Typography variant="overline"
                            display="block"
                            gutterBottom
                            style={{fontSize: 16, color: '#485C90'}}
                            align={'center'}>
                    {infoDiscipline.email}
                </Typography>
            </td>
            <td className={classesMain.TableTd}>
                <Typography variant="overline"
                            display="block"
                            gutterBottom
                            style={{fontSize: 16, color: '#485C90'}}
                            align={'center'}>
                    {infoDiscipline.study_year}
                </Typography>
            </td>
        </tr>
    );
}

export default ItemListDisciplines;