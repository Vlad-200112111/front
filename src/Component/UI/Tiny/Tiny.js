import {Editor} from '@tinymce/tinymce-react';
import {useRef, useState, useEffect} from "react";
import {Grid} from "@material-ui/core";
import {Button} from "@mui/material";
import useStylesMain from "../../../Styles/MainStyles";
import CustomBackdrop from "../CustomBackdrop/CustomBackdrop";
import api from "../../../Services/api";
import CustomInput from "../CustomInput/CustomInput";
import Cookies from "js-cookie";
import {useNavigate} from "react-router-dom";

const Tiny = (props) => {
    const classesMain = useStylesMain()
    const navigate = useNavigate();
    const editorRef = useRef(null);
    const [open, setOpen] = useState(false);
    const [postId, setPostId] = useState('')
    const [namePost, setNamePost] = useState('')
    const [html, setHtml] = useState('')
    const [arrImg, setArrImg] = useState([])
    const token = Cookies.get("auth-token");
    const [idText, setIdText] = useState('')

    useEffect(async () => {
        setPostId(props.postId)

        if (props.action === 'edit') {
            const {data: resultText} = await api.wiki.getTextPartForPost(props.postId)
            setIdText(resultText[0].id)
            let content = resultText[0].text
            const htmlBase64 = new DOMParser().parseFromString(content, "text/html");
            const resultImages = [...htmlBase64.images].map(e => e.src);
            const htmlWithImage = content.match(/<img .*?>/g)

            const {data: resultImage} = await api.wiki.getFilePartForPost(props.postId)

            let htmlWithoutImage = ``
            let arrForImage = new Array()
            for (let i = 0; i < resultImages.length; i++) {
                htmlWithoutImage = htmlWithImage[i].replace(`Image_${resultImage[i].id}`, resultImage[i].document)
                arrForImage.push(String(resultImage[i].id))
                content = content.replace(htmlWithImage[i], htmlWithoutImage)
            }
            setArrImg(arrForImage)
            setHtml(content)
            setNamePost(resultText[0].header)
        }
    }, []);

    const log = async () => {
        if (editorRef.current) {
            let content = editorRef.current.getContent();
            const htmlBase64 = new DOMParser().parseFromString(content, "text/html");
            const resultImageSrc = [...htmlBase64.images].map(e => e.src);
            const resultImageId = [...htmlBase64.images].map(e => e.id);

            const htmlWithImage = content.match(/<img .*?>/g)
            let htmlWithoutImage = ``
            for (let i = 0; i < resultImageSrc.length; i++) {
                const objectForFilePartForPost = new Object()

                objectForFilePartForPost.document = resultImageSrc[i]
                objectForFilePartForPost.token = token
                let idImage
                if (props.action === 'edit') {
                    let arrForDeleteImage = arrImg

                    // Обновление ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
                    if (arrImg.indexOf(String(resultImageId[i])) !== -1) {
                        objectForFilePartForPost.postsId = resultImageId[i]
                        await api.wiki.updateFilePartForPost(objectForFilePartForPost)
                        idImage = resultImageId[i]
                    }
                    // Добавление ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
                    else {
                        objectForFilePartForPost.postsId = postId
                        const {data: idImg} = await api.wiki.addFilePartForPost(objectForFilePartForPost)
                        idImage = idImg
                    }

                    // Удаление ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
                    if (arrImg.indexOf(String(resultImageId[i])) !== -1) {
                        arrForDeleteImage.splice(arrImg.indexOf(String(resultImageId[i])), 1)
                    }
                    if (i + 1 === resultImageSrc.length) {
                        for (let j = 0; j < arrForDeleteImage.length; j++) {
                            await api.wiki.deleteFilePartForPost(arrForDeleteImage[j])
                        }
                    }


                } else {
                    objectForFilePartForPost.postsId = postId
                    const {data: idImg} = await api.wiki.addFilePartForPost(objectForFilePartForPost)
                    idImage = idImg
                }

                htmlWithoutImage = htmlWithImage[i].replace(resultImageSrc[i], `Image_${idImage.result}`)
                let parseInHTML = new DOMParser().parseFromString(htmlWithoutImage, "text/html").getElementsByTagName("img")[0]
                parseInHTML.id = idImage.result
                content = content.replace(htmlWithImage[i], parseInHTML.outerHTML)
            }

            const objectTextPartForPost = new Object()
            objectTextPartForPost.header = namePost
            objectTextPartForPost.text = content
            objectTextPartForPost.token = token
            if (props.action === 'edit') {
                objectTextPartForPost.postsId = idText
                await api.wiki.updateTextPartForPost(objectTextPartForPost)
            } else {
                objectTextPartForPost.postsId = postId
                await api.wiki.addTextPartForPost(objectTextPartForPost)
            }
        }
        navigate(`/wiki/${postId}`)
    };


    return (
        <>
            <CustomBackdrop open={open}/>
            <Grid
                container
                direction="column"
                justifyContent="flex-start"
                alignItems="flex-start"
                spacing={3}
            >
                    <CustomInput
                        xs={4}
                        title='Название'
                        name='namePost'
                        label='Название'
                        customValueInput={namePost}
                        setCustomValueInput={event => setNamePost(event.target.value)}
                    />
                <Grid item xs={12} style={{width: '100%'}}>
                    <Editor
                        onInit={(evt, editor) => editorRef.current = editor}
                        initialValue={html ? html : ''}
                        init={{
                            language: 'ru',
                            height: 500,
                            menubar: true,
                            image_title: true,
                            automatic_uploads: true,
                            file_picker_callback: function (cb, value, meta) {
                                let input = document.createElement('input');
                                input.setAttribute('type', 'file');
                                input.setAttribute('accept', 'image/*');

                                input.onchange = function () {
                                    let file = this.files[0];

                                    let reader = new FileReader();
                                    reader.onload = function () {
                                        let id = 'blobid' + (new Date()).getTime();
                                        let blobCache = this.activeEditor.editorUpload.blobCache;
                                        let base64 = reader.result.split(',')[1];
                                        let blobInfo = blobCache.create(id, file, base64);
                                        blobCache.add(blobInfo);

                                        /* call the callback and populate the Title field with the file name */
                                        cb(blobInfo.blobUri(), {title: file.name});
                                    };
                                    reader.readAsDataURL(file);
                                };

                                input.click();
                            },
                            plugins: 'advlist autolink lists link image charmap print preview anchor ' +
                                'searchreplace visualblocks code fullscreen insertdatetime media table ' +
                                'paste code help wordcount',
                            toolbar: 'undo redo | formatselect | ' +
                                'bold italic backcolor | alignleft aligncenter ' +
                                'alignright alignjustify | bullist numlist outdent indent | ' +
                                'removeformat | help | table | link image',
                            content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
                        }}
                    />
                </Grid>
                <Grid item>
                    <Button
                        variant="contained"
                        size="medium"
                        onClick={log}
                        className={classesMain.button}>
                        {props.action === 'edit' ? 'Изменить' : 'Создать'}
                    </Button>
                </Grid>
            </Grid>
        </>
    )
}

export default Tiny