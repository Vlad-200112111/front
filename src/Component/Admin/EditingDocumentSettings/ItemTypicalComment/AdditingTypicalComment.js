import React, {useState} from 'react';
import {Grid} from "@mui/material";
import CustomInput from "../../../UI/CustomInput/CustomInput";
import Button from "@mui/material/Button";
import useStylesMain from "../../../../Styles/MainStyles";
import api from "../../../../Services/api";
import {MenuItem} from "@material-ui/core";
import CustomSelect from "../../../UI/CustomSelect/CustomSelect";
import Cookies from "js-cookie";
import CustomTextarea from "../../../UI/CustomTextarea/CustomTextarea";

function AdditingTypicalComment({setListTypicalComment}) {
    const classesMain = useStylesMain()

    const [reasonComment, setReasonComment] = useState('')
    const [value, setValue] = useState('')
    const [statusId, setStatusId] = useState(1)

    async function addTypicalComment(){
        await api.documents.addTypicalComment({
            token: Cookies.get("auth-token"),
            reasonType: statusId,
            reasonName: value,
            reasonComment: reasonComment
        })
        const {data: ListTypicalComment} = await api.documents.getListTypicalComment(statusId)
        setListTypicalComment(ListTypicalComment)
    }


    return (
        <>
            <Grid
                container
                direction="column"
                justifyContent="space-around"
                alignItems="center"
                spacing={3}
            >
                <CustomInput
                    xs={5}
                    title='Название'
                    label='Название типового комментария'
                    customValueInput={value}
                    helperText='Введите сюда типовой комментарий'
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
                <CustomSelect
                    xs={5}
                    contentCustomSelect="Тип статуса"
                    setValueSelect={(event) => setStatusId(event.target.value)}
                    formHelperText={'Выберите тип статуса'}
                    valueSelect={statusId}>
                    <MenuItem
                        key={1}
                        className={classesMain.SelectItems}
                        value={1}>
                        В обработке
                    </MenuItem>
                    <MenuItem
                        key={2}
                        className={classesMain.SelectItems}
                        value={2}>
                        Отклонено
                    </MenuItem>
                </CustomSelect>
            </Grid>
            <Button style={{width: '100%'}}
                    className={classesMain.button}
                    onClick={addTypicalComment}
            >
                Добавить
            </Button>
        </>


    );
}

export default AdditingTypicalComment;