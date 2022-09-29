import Tiny from "../../../UI/Tiny/Tiny";
import MainWiki from "../../../Modules/MainWiki/MainWiki";
import api from '../../../../Services/api'
import {useState} from "react";
import Cookies from "js-cookie";
import CustomStepper from "../../../UI/CustomStepper/CustomStepper";
import FormCreatePost from "./ComponentCreatePost/FormCreatePost";
import CustomAlert from "../../../UI/CustomAlert/CustomAlert";
import React from "react";


function CreatePost() {
    const [openTiny, setOpenTiny] = useState(true)
    const [activeAlert, setActiveAlert] = useState(false)
    const [severity, setSeverity] = useState('')
    const [titleForAlert, setTitleForAlert] = useState('')
    const [contentForAlert, setContentForAlert] = useState('')
    const [postId, setPostId] = useState('')

    const token = Cookies.get("auth-token");
    const userId = Cookies.get("userId");

    async function createPosts(event) {
        event.preventDefault()
        const formData = new FormData(event.target)
        formData.append('token', Cookies.get("auth-token"))
        let dataObj = [...formData].reduce((o, [k, v]) => {
            o[k] = v;
            return o;
        }, {})
        const {data: answer} = await api.wiki.createPost(dataObj)
        setPostId(answer)
        setActiveAlert(true)
        if (answer !== '') {
            setSeverity('success')
            setTitleForAlert('Статья успешно создана!')
            setContentForAlert('Перейдите к заполнению')
            setOpenTiny(false)
        } else {
            setSeverity('error')
            setTitleForAlert('Произошла ошибка!')
            setContentForAlert('Приносим свои извинения.')
            setOpenTiny(true)
        }
    }

    const listForStepper = ['Создание статьи', 'Наполнение статьи']
    const contentForStepper = [<FormCreatePost createPosts={createPosts}/>, <Tiny postId={postId} token={token}/>]

    return (
        <>
            <MainWiki>
                <CustomAlert
                    severity="info"
                    title='Информация!'
                    content='Сервис "Справочная информация" находится в стадии разработки!'
                    activeAlert={true}
                />
                <CustomAlert
                    severity={severity}
                    title={titleForAlert}
                    content={contentForAlert}
                    activeAlert={activeAlert}
                />

                <CustomStepper
                    width={'600px'}
                    listForStepper={listForStepper}
                    contentStepper={contentForStepper}
                    activateNext={openTiny}>
                </CustomStepper>

            </MainWiki>
        </>

    );
}

export default CreatePost;
