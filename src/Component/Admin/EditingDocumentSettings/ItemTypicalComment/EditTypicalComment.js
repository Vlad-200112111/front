import React, {useEffect} from 'react';
import {Grid, Stack, Typography} from "@mui/material";
import Button from "@mui/material/Button";
import useStylesMain from "../../../../Styles/MainStyles";
import api from "../../../../Services/api";
import {useState} from "react";
import CustomInput from "../../../UI/CustomInput/CustomInput";
import Cookies from "js-cookie";
import CustomTextarea from "../../../UI/CustomTextarea/CustomTextarea";

function EditTypicalComment({item, setListTypicalComment, alignment}) {
    const classesMain = useStylesMain()
    const [value, setValue] = useState('')
    const [show, setShow] = useState(false);
    const [reasonComment, setReasonComment] = useState('')

    useEffect(() => {
        setValue(item.reasonName)
        setReasonComment(item.reasonComment)
    }, [])

    async function editTypicalComment() {
        await api.documents.updateTypicalComment({
            reasonName: value,
            token: Cookies.get("auth-token"),
            reasonComment: reasonComment
        }, item.id)
        setShow(false)
    }

    async function deleteTypicalComment() {
        await api.documents.deleteTypicalComment(item.id)
        const {data: ListTypicalComment} = await api.documents.getListTypicalComment(alignment)
        setListTypicalComment(ListTypicalComment)
    }

    return (
        <tr>
            <td style={{
                width: 100,
                padding: 10,
                background: '#fff',
                color: 'rgba(0, 0, 0, 0.87)',
                border: '1px solid rgba(90, 125, 207, 0.8)'
            }}>
                {
                    show ?
                        <Stack direction={"row"} spacing={3}>
                            <CustomInput
                                xs={9}
                                title='Название'
                                label='Типовой комментарий'
                                customValueInput={value}
                                helperText='Введите сюда типовой комментарий и нажмите на кнопку "Сохранить"'
                                setCustomValueInput={event => setValue(event.target.value)}
                            />
                            <CustomTextarea
                                xs={5}
                                title='Название'
                                label='Описание типового комментария'
                                valueCustomTextarea={reasonComment}
                                helperText='Введите сюда описание типового комментария'
                                setValueCustomTextarea={event => setReasonComment(event.target.value)}
                            />
                        </Stack>
                        :
                        <Stack direction={"row"} spacing={3}>
                            <Typography variant="overline"
                                        display="block"
                                        gutterBottom
                                        style={{fontSize: 14}}>
                                {value}
                            </Typography>
                            <Typography variant="overline"
                                        display="block"
                                        gutterBottom
                                        style={{fontSize: 14}}>
                                {reasonComment}
                            </Typography>
                        </Stack>
                }
            </td>
            <td style={{
                width: 100,
                padding: 10,
                background: '#fff',
                color: 'rgba(0, 0, 0, 0.87)',
                border: '1px solid rgba(90, 125, 207, 0.8)'
            }}>
                {
                    show ?
                        <Button
                            style={{width: '100%'}}
                            className={classesMain.button}
                            onClick={editTypicalComment}
                        >
                            Сохранить
                        </Button>
                        :
                        <Button
                            style={{width: '100%'}}
                            className={classesMain.button}
                            onClick={() => setShow(true)}
                        >
                            Редактировать
                        </Button>
                }
                <Button
                    style={{width: '100%'}}
                    className={classesMain.button}
                    onClick={deleteTypicalComment}
                >
                    Удалить
                </Button>
            </td>
        </tr>
    );
}

export default EditTypicalComment;