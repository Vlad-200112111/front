import MainWiki from "../../Modules/MainWiki/MainWiki";
import {useNavigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import api from './../../../Services/api'
import {Button, Grid} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import MainStyles from "../../../Styles/MainStyles";
import {Link} from "react-router-dom";

const PostById = () => {
    const params = useParams();
    const idPost = params.idPost;

    const classesMain = MainStyles()
    const navigate = useNavigate()

    const [html, setHtml] = useState('')
    const [abilityChange, setAbilityChange] = useState('')

    useEffect(async () => {

        // const {data: AbilityChange} = await api.wiki.checkUserPost(idPost)
        // setAbilityChange(AbilityChange)

        const {data: resultText} = await api.wiki.getTextPartForPost(idPost)
        let content = resultText[0].text
        const htmlBase64 = new DOMParser().parseFromString(content, "text/html")
        const resultImages = [...htmlBase64.images].map(e => e.src)
        const htmlWithImage = content.match(/<img .*?>/g)

        const {data: resultImage} = await api.wiki.getFilePartForPost(idPost)

        let htmlWithoutImage = ``
        for (let i = 0; i < resultImages.length; i++) {
            htmlWithoutImage = htmlWithImage[i].replace(`Image_${String(resultImage[i].id)}`, resultImage[i].documentPath)
            content = content.replace(htmlWithImage[i], htmlWithoutImage)
        }
        setHtml(content)
    }, []);

    async function deletePost() {
        await api.wiki.deletePost(idPost)
        navigate('/wiki')
    }


    return (
        <>
            <MainWiki>

                <div dangerouslySetInnerHTML={{__html: html}}/>

                {/*{*/}
                {/*    abilityChange ?*/}
                {/*        <Grid*/}
                {/*            container*/}
                {/*            direction="row"*/}
                {/*            justifyContent="center"*/}
                {/*            alignItems="center"*/}
                {/*            spacing={3}*/}
                {/*        >*/}
                            {/*<Grid item>*/}
                            {/*    <Link to={`/wiki/edit-post/${idPost}`}*/}
                            {/*          style={{textDecoration: 'none', color: '#fff'}}>*/}
                            {/*        <Button className={classesMain.button} variant="contained" startIcon={<EditIcon/>}>*/}
                            {/*            Редактировать*/}
                            {/*        </Button>*/}
                            {/*    </Link>*/}
                            {/*</Grid>*/}
                            {/*<Grid item>*/}
                            {/*    <Button onClick={deletePost} className={classesMain.button} variant="contained"*/}
                            {/*            startIcon={<DeleteIcon/>}>*/}
                            {/*        Удалить*/}
                            {/*    </Button>*/}
                            {/*</Grid>*/}
                        {/*</Grid>*/}
                        {/*// :*/}
                        {/*// ''}*/}


            </MainWiki>
        </>
    )
}
export default PostById;