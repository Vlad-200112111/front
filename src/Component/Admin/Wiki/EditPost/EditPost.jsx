import {useParams} from "react-router-dom";
import MainWiki from "../../../Modules/MainWiki/MainWiki";
import {useEffect, useState} from "react";
import api from "../../../../Services/api";
import Tiny from "../../../UI/Tiny/Tiny";
import CustomAlert from "../../../UI/CustomAlert/CustomAlert";


const EditPost = () => {
    const params = useParams();
    const idPost = params.idPost;
    const [abilityChange, setAbilityChange] = useState('')

    useEffect(async () => {
        const {data: AbilityChange} = await api.wiki.checkUserPost(idPost)
        setAbilityChange(AbilityChange)
    }, []);

    return(
        <>
            <MainWiki>

                {
                    abilityChange ?
                        <Tiny postId={idPost} action={'edit'}/>
                        :
                        <CustomAlert
                            severity="error"
                            title='Ошибка!'
                            content='У Вас нет доступа к редактированию этой статьи!'
                            activeAlert={true}
                        />
                }

            </MainWiki>
        </>
    )
}
export default EditPost;