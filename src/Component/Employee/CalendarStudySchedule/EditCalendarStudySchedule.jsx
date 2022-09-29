import React, {useEffect, useState} from 'react';
import {Grid} from "@mui/material";
import Typography from "@mui/material/Typography";
import useStylesMain from "../../../Styles/MainStyles";
import api from '../../../Services/api';
import CustomAutocomplete from "../../UI/CustomAutocomplete/CustomAutocomplete";
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import AddIcon from "@mui/icons-material/Add";
import CloseIcon from "@mui/icons-material/Close";
import Button from "@mui/material/Button";
import Cookies from "js-cookie";
import {useNavigate, useParams} from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";
import loagingGif from '../../../Assets/Image/loading.gif'

import {useSnackbar} from "notistack";
import EditableCalendarStudySchedule from "./EditableCalendarStudySchedule";

function EditCalendarStudySchedule({groups,
                                       setGroups,
                                       months,
                                       days,
                                       weeks,
                                       calendarArray,
                                       setCalendarArray,
                                       chosenMark,
                                       groupsToDel,
                                       marks,
                                       setGroupsToDel,
                                       chosenSpeciality}) {
    const [isSelecting, setIsSelecting] = useState(false)

    const func = (event) => {
        const id = event.currentTarget.getAttribute('id')
        const item = Number(id.slice(0, id.indexOf(';')))
        const idCalendar = Number(id.slice(id.indexOf(';') + 1))
        setCalendarArray((state) => {
            return state.map((i, ind) =>
                i.idCalendar === idCalendar ?
                    {
                        ...i, cellValues: i.cellValues.map(elem =>
                            elem.numberCell === item ?
                                {
                                    ...elem,
                                    graphNotationName: chosenMark.trim() === '' ? 'Т' : chosenMark,
                                    idGraphNotation: marks.filter(el => el.name === chosenMark)[0].id
                                }
                                :
                                elem
                        )
                    }

                    :
                    i
            )
        })
    }


    const selectCell = (event, item, idCalendar) => {
        document.querySelectorAll('.calendarCell').forEach((ev) => ev.style.pointerEvents = "auto")
        event.stopPropagation()
        setIsSelecting(true)
        console.log(marks)
        setCalendarArray(calendarArray.map((i, ind) =>
            i.idCalendar === idCalendar ?
                {
                    ...i, cellValues: i.cellValues.map(elem =>
                        elem === item ?
                            {
                                ...elem,
                                graphNotationName: chosenMark.trim() === '' ? 'Т' : chosenMark,
                                idGraphNotation: marks.filter(el => el.name === chosenMark)[0].id
                            }
                            :
                            elem
                    )
                }

                :
                i
        ))
    }


    const stopSelecting = (event) => {
        setIsSelecting(false)
        document.querySelectorAll('.calendarCell').forEach((ev) => ev.removeEventListener('mouseenter', func))
    }


    const removeRow = (item) => {
        setCalendarArray(calendarArray.filter(el => el.groupName !== item.groupName))
        setGroupsToDel([...groupsToDel, calendarArray.filter(el => el.groupName === item.groupName)[0]])
        console.log(groupsToDel)
        // setGroups(groups.filter(el => el.groupName !== item.idGroup))
    }
    return (
        <Grid item xs={12} display={'flex'} justifyContent={'center'}>
            <div style={{display: 'flex'}}>
                <div>
                    <div style={{display: 'flex', height: '160px'}}>
                        <div style={{
                            border: '1px solid #485C90',
                            padding: '60px',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            color: '#485C90'
                        }}> Направление ОП
                        </div>
                        <div style={{
                            border: '1px solid #485C90',
                            padding: '10px',
                            maxWidth: '20px',
                            overflowWrap: 'break-word',
                            display: "flex",
                            justifyContent: 'center',
                            alignItems: 'center',
                            flexDirection: 'column',
                            color: '#485C90'
                        }}>
                            к
                            у
                            р
                            с
                        </div>
                    </div>
                    <div style={{
                        display: 'flex',
                        border: '1px solid #485C90',
                        padding: '10px',
                        height: '26px'
                    }}>

                    </div>
                    <div style={{display: 'flex', width: '264px'}}>
                        <div style={{
                            width: '100%',
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'start',
                            alignItems: 'start'
                        }}>
                            {
                                calendarArray?.map(item =>
                                    <div style={{
                                        border: '1px solid #485C90',
                                        position: 'relative',
                                        width: '100%',
                                        height: '31px',
                                        color: '#485C90'
                                    }}>
                                        <CloseIcon onClick={() => removeRow(item)} style={{
                                            cursor: "pointer",
                                            position: 'absolute',
                                            left: '-22px'
                                        }}/>
                                        {item.groupName}
                                    </div>
                                )
                            }
                        </div>
                        <div style={{
                            overflowWrap: 'break-word',
                            display: "flex",

                            flexDirection: 'column',
                            color: '#485C90'
                        }}>
                            {
                                calendarArray?.map(item =>
                                    <div style={{
                                        border: '1px solid #485C90',
                                        width: '22px',
                                        height: '31px',
                                        display: "flex",
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        color: '#485C90'
                                    }}>


                                        {item.courseNumber}
                                    </div>
                                )
                            }
                        </div>
                    </div>
                </div>
                <div style={{maxWidth: '60vw', overflowX: 'auto',}}>
                    <div style={{display: 'flex', maxWidth: '1431px'}}>

                        {
                            months?.map((item, index) =>
                                <table id="table-to-xls" style={{borderCollapse: 'collapse',}}>
                                    <thead>
                                    <tr>
                                        <th colSpan={days[index]?.length}
                                            style={{
                                                border: '1px solid #485C90',
                                                color: '#485C90'
                                            }}>{item.name}
                                        </th>
                                    </tr>
                                    </thead>

                                    <tbody>
                                    <tr>
                                        {
                                            weeks[index]?.map((item) =>
                                                <td align={'center'}
                                                    style={{border: '1px solid #485C90', padding: '5px'}}>
                                                    <div style={{
                                                        display: 'flex',
                                                        justifyContent: 'center',
                                                        alignItems: 'center',
                                                        width: '20px',
                                                        height: '20px',
                                                        color: '#485C90'
                                                    }}>
                                                        {item}
                                                    </div>
                                                </td>
                                            )
                                        }
                                    </tr>
                                    <tr>
                                        {
                                            days[index]?.map((item) =>
                                                <td align={'center'}
                                                    style={{border: '1px solid #485C90', padding: '5px'}}>
                                                    <div style={{
                                                        display: 'flex',
                                                        justifyContent: 'center',
                                                        alignItems: 'center',
                                                        width: '20px',
                                                        height: '20px',
                                                        color: '#485C90'
                                                    }}>
                                                        -
                                                    </div>
                                                </td>
                                            )
                                        }
                                    </tr>
                                    <tr>
                                        {
                                            days[index]?.map((item) =>
                                                <td align={'center'}
                                                    style={{
                                                        border: '1px solid #485C90',
                                                        color: '#485C90',
                                                        padding: '5px',
                                                        width: '20%'
                                                    }}>
                                                    {item.start}
                                                </td>
                                            )
                                        }
                                    </tr>
                                    <tr>
                                        {
                                            days[index]?.map((item) =>
                                                <td style={{
                                                    border: '1px solid #485C90',
                                                    padding: '5px',
                                                    color: '#485C90'
                                                }}>
                                                    {item.end}
                                                </td>
                                            )
                                        }
                                    </tr>


                                    </tbody>
                                </table>
                            )
                        }

                    </div>
                    <div style={{height: '26px', color: '#485C90'}}>
                        {
                            chosenSpeciality ?
                                chosenSpeciality.nameSpeciality
                                : ''
                        }
                    </div>
                    <div>
                        <table onMouseUp={event => stopSelecting(event)} id="table-to-xls"
                               style={{borderCollapse: 'collapse', width: '1655px'}}>
                            <tbody>

                            {
                                calendarArray?.map((item, index) =>

                                    <tr>
                                        {
                                            item?.cellValues.map((el) =>
                                                <td
                                                    draggable={false} align={'center'}
                                                    style={{border: '1px solid #485C90', padding: '5px'}}>
                                                    <div draggable={false}
                                                         id={[el.numberCell, item.idCalendar].join(';')}
                                                         className={['calendarCell', 'unselectable'].join(' ')}
                                                         onMouseUp={event => stopSelecting(event)}
                                                         onMouseEnter={isSelecting ? func : () => {
                                                             console.log('')
                                                         }}
                                                         onMouseDown={(event) => selectCell(event, el, item.idCalendar)}
                                                         style={{
                                                             display: 'flex',
                                                             justifyContent: 'center',
                                                             alignItems: 'center',
                                                             width: '20px',
                                                             height: '20px',
                                                             color: '#485C90'
                                                         }}>
                                                        {el.graphNotationName}
                                                    </div>
                                                </td>
                                            )
                                        }
                                    </tr>
                                )
                            }
                            </tbody>

                        </table>

                    </div>


                </div>

            </div>

        </Grid>
    );
}

export default EditCalendarStudySchedule;