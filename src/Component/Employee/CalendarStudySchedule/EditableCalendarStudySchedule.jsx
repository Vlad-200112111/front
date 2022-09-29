import React from 'react';
import CloseIcon from "@mui/icons-material/Close";
import {Grid} from "@mui/material";
import {useState} from "react";

function EditableCalendarStudySchedule({
                                           groups,
                                           setGroups,
                                           months,
                                           days,
                                           weeks,
                                           calendarArray,
                                           setCalendarArray,
                                           chosenMark,
                                           marks,
                                           chosenSpeciality
                                       }) {
    const [isSelecting, setIsSelecting] = useState(false)

    const func = (event) => {
        const id = event.currentTarget.getAttribute('id')
        const item = Number(id.slice(0, id.indexOf(';')))
        const group = Number(id.slice(id.indexOf(';') + 1))
        setCalendarArray((state) => {
            return state.map((i, ind) =>
                i.idGroup === group ?
                    {
                        ...i, weeks: i.weeks.map(elem =>
                            elem.id === item ?
                                {
                                    ...elem,
                                    content: chosenMark.trim() === '' ? 'Т' : chosenMark,
                                    markId: marks.filter(el => el.name === chosenMark)[0].id
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


    const selectCell = (event, item, group) => {
        document.querySelectorAll('.calendarCell').forEach((ev) => ev.style.pointerEvents = "auto")
        event.stopPropagation()
        setIsSelecting(true)
        setCalendarArray(calendarArray.map((i, ind) =>
            i.idGroup === group ?
                {
                    idGroup: i.idGroup, weeks: i.weeks.map(elem =>
                        elem === item ?
                            {
                                ...elem,
                                content: chosenMark.trim() === '' ? 'Т' : chosenMark,
                                markId: marks.filter(el => el.name === chosenMark)[0].id
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
        setCalendarArray(calendarArray.filter(el => el.idGroup !== item.idGroup))
        setGroups(groups.filter(el => el.idGroup !== item.idGroup))
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
                                groups?.map(item =>
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
                                        {item.nameGroup}
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
                                groups?.map(item =>
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
                                            item?.weeks.map((el) =>
                                                <td
                                                    draggable={false} align={'center'}
                                                    style={{border: '1px solid #485C90', padding: '5px'}}>
                                                    <div draggable={false}
                                                         id={[el.id, item.idGroup].join(';')}
                                                         className={['calendarCell', 'unselectable'].join(' ')}
                                                         onMouseUp={event => stopSelecting(event)}
                                                         onMouseEnter={isSelecting ? func : () => {
                                                             console.log('')
                                                         }}
                                                         onMouseDown={(event) => selectCell(event, el, item.idGroup)}
                                                         style={{
                                                             display: 'flex',
                                                             justifyContent: 'center',
                                                             alignItems: 'center',
                                                             width: '20px',
                                                             height: '20px',
                                                             color: '#485C90'
                                                         }}>
                                                        {el.content.trim() === 'Т' ? '' : el.content}
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

export default EditableCalendarStudySchedule;