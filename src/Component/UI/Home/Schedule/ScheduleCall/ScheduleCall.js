import React from 'react';
import {Typography} from "@material-ui/core";
import useStylesHome from "../../../../../Styles/HomeStyles";

function ScheduleCall({
                          listCallSchedule
                      }) {
    const classesHome = useStylesHome();
    return (
        <table style={{width: '100%'}}>
            <tbody>
            <tr>
                <td className={classesHome.TableMainTd} colSpan="3">
                    <Typography variant="overline"
                                display="block"
                                gutterBottom
                                style={{fontSize: 16}}
                                align={'center'}>
                        Расписание звонков
                    </Typography>
                </td>
            </tr>
            {
                listCallSchedule?.map(couple =>
                    <tr key={couple.id}>
                        <td style={{width: 100}}
                            className={classesHome.TableMainTd}>
                            <Typography variant="overline"
                                        display="block"
                                        gutterBottom
                                        style={{fontSize: 14}}
                                        align={'center'}>
                                {couple.name}
                            </Typography>
                        </td>
                        <td className={classesHome.TableTd}>
                            <Typography variant="overline"
                                        display="block"
                                        gutterBottom
                                        style={{fontSize: 16, color: '#485C90'}}
                                        align={'center'}>
                                {couple.timeStart}
                            </Typography>
                        </td>
                        <td className={classesHome.TableTd}>
                            <Typography variant="overline"
                                        display="block"
                                        gutterBottom
                                        style={{fontSize: 16, color: '#485C90'}}
                                        align={'center'}>
                                {couple.timeEnd}
                            </Typography>
                        </td>
                    </tr>
                )}
            </tbody>
        </table>
    );
}

export default ScheduleCall;