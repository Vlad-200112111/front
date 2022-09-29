import {useState} from "react";
import {Grid, MenuItem, Typography} from "@material-ui/core";
import CustomTable from "../../UI/CustomTable/CustomTable";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import useStylesMain from "../../../Styles/MainStyles";
import CustomAlert from "../../UI/CustomAlert/CustomAlert";
import CircularProgress from "@mui/material/CircularProgress";
import loagingGif from '../../../Assets/Image/loading.gif'


const ItemAcademicPerformance = ({listAcademicPerformance, loadingItem}) => {
    const classesMain = useStylesMain()
    return (
        <>
            <Grid
                container
                direction="column"
                justifyContent="flex-start"
                alignItems="flex-start"
                style={{marginTop: 30}}
            >
                {!loadingItem ?
                    listAcademicPerformance.length === 0 ? ''
                        :
                        <CustomTable rows={listAcademicPerformance} showFooter={false}>

                            {
                                <TableRow>
                                    <TableCell className={classesMain.TextWhite}>
                                        Дисциплина
                                    </TableCell>
                                    <TableCell className={classesMain.TextWhite}>
                                        Вид контроля
                                    </TableCell>
                                    <TableCell className={classesMain.TextWhite}>
                                        Оценка
                                    </TableCell>
                                    <TableCell className={classesMain.TextWhite}>
                                        Часы (ЗЕТ)
                                    </TableCell>
                                </TableRow>
                            }


                            {
                                listAcademicPerformance.map((row) => (
                                    <TableRow>
                                        <TableCell className={classesMain.Text}>{row.nameDiscipline}</TableCell>
                                        <TableCell className={classesMain.Text}>{row.markType}</TableCell>
                                        <TableCell className={classesMain.Text}>{row.markValue}</TableCell>
                                        <TableCell className={classesMain.Text}>{row.hoursZet}</TableCell>
                                    </TableRow>))
                            }

                        </CustomTable>


                    :
                    <Grid item xs={12} style={{width: '100%', display: 'flex', justifyContent: 'center'}}>
                        <img src={loagingGif} alt=""/>
                    </Grid>
                }
            </Grid>


        </>
    )


}
export default ItemAcademicPerformance;
