import React from 'react';
import useStylesCourses from "../../../Styles/CoursesStyles";
import useStylesMain from "../../../Styles/MainStyles";
import {useState} from "react";
import Grow from "@mui/material/Grow";
import {Button, Card, CardActions, CardContent, Typography} from "@material-ui/core";
import CoursesModal from "./CoursesModal";
import {Link} from "react-router-dom";

function ItemViewGrid({item, Token, grow, timeout, create, headDepartment}) {
    const classesCourses = useStylesCourses()
    const classesMain = useStylesMain()
    const [openModal, setOpenModal] = useState(false)
    return (
        <>
            <CoursesModal
                open={openModal}
                setOpen={setOpenModal}
                item={item}
                Token={Token}
            />
            <Grow in={grow}
                  style={{transformOrigin: '0 0 0'}}
                  {...(grow ? {timeout: timeout} : {})}
            >
                <Card className={`${classesMain.card} ${classesCourses.cardForCourses}`}>
                    <CardContent style={{height: headDepartment ? 250 : 200}} className={`${classesMain.cardContent}`}>
                        <div className={classesMain.cardFirstLine}>
                            <Typography variant='overline' style={{fontSize: '1rem'}}
                                        gutterBottom>{item.discipline}</Typography>
                        </div>
                        <Typography className={classesCourses.title} gutterBottom>
                            Контрольная точка: {item.nameControlPointType}
                        </Typography>
                        {
                            headDepartment &&
                                <Typography className={classesCourses.title} gutterBottom>
                                    Преподаватель: {item.employeeFIO}
                                </Typography>

                        }
                    </CardContent>
                    <CardActions className={[classesMain.blueBackgroud, classesCourses.cardActions].join(' ')}>
                        {
                            create ?
                                <Button
                                    onClick={() => setOpenModal(true)}
                                    style={{width: '100%'}}
                                    size="small"
                                    className={classesMain.TextWhite}>
                                    Добавить
                                </Button>
                                :
                                <Link
                                    style={{textDecoration: 'none', width: '100%'}}
                                    to={`/show-task/${item.idCourse}`}>
                                    <Button style={{width: '100%'}} size="small"
                                            className={classesMain.TextWhite}>Подробнее</Button>
                                </Link>
                        }
                    </CardActions>
                </Card>
            </Grow>
        </>
    )
}

export default ItemViewGrid;