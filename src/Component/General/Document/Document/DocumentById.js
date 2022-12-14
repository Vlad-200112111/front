import MainDocuments from "../../../Modules/MainDocuments/MainDocuments";
import {Link, useParams} from "react-router-dom";
import {useState, useEffect} from "react";
import api from "../../../../Services/api";
import {Grid, MenuItem, Typography} from "@material-ui/core";
import useStylesDocumentsStyles from "../../../../Styles/DocumentsStyles";
import Divider from "@mui/material/Divider";
import useStylesMain from "../../../../Styles/MainStyles";
import {Box, Button, Stack} from "@mui/material";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import CustomFormGenerator from "../../../UI/CustomFormGenerator/CustomFormGenerator";
import CustomSubmitButton from "../../../UI/CustomSubmitButton/CustomSubmitButton";
import Cookies from "js-cookie";
import {useSnackbar} from "notistack";
import CustomDialog from "../../../UI/CustomDialog/CustomDialog";
import CircularProgress from "@mui/material/CircularProgress";
import CustomTextarea from "../../../UI/CustomTextarea/CustomTextarea";
import CustomAlert from "../../../UI/CustomAlert/CustomAlert";
import {useNavigate} from "react-router-dom";
import CustomSelect from "../../../UI/CustomSelect/CustomSelect";
import React from "react";


const DocumentById = (props) => {
    const classesMain = useStylesMain()
    const classesDocumentsStyles = useStylesDocumentsStyles()
    const params = useParams();
    const userId = params.userId;
    const idDocument = params.idDocument;
    let navigate = useNavigate();

    const [Document, setDocument] = useState('')
    const [showEdit, setShowEdit] = useState(false)
    const [result, setResult] = useState('')
    const [nameFile, setNameFile] = useState('')
    const [file, setFile] = useState('')
    const [handleDialog, setHandleDialog] = useState(false)
    const [handleDialogForStatusDocument, setHandleDialogForStatusDocument] = useState(false)
    const [status, setStatus] = useState('')
    const [updateDate, setUpdateDate] = useState()
    const [statusId, setStatusId] = useState('')
    const [comment, setComment] = useState('');
    const [documentGetMethod, setDocumentGetMethod] = useState('')
    const [titleFromDialog, setTitleFromDialog] = useState('')
    const [captionFromDialog, setCaptionFromDialog] = useState('')
    const [commentEmployer, setCommentEmployer] = useState('')
    const [disabledEdit, setDisabledEdit] = useState(false)
    const [fileLoading, setFileLoading] = useState(false)
    const [buttonsDisabled, setButtonsDisabled] = useState(false)
    const [statusIdDop, setStatusIdDop] = useState('')
    const [listTypicalComment, setListTypicalComment] = useState([])
    const [typicalCommentId, setTypicalCommentId] = useState('')
    const [methodId, setMethodId] = useState('')
    const [listDocumentMethod, setListDocumentMethod] = useState([])
    const [disable, setDisable] = useState(false)
    const [captionMethod, setCaptionMethod] = useState('')
    const token = Cookies.get("auth-token");

    useEffect(async () => {
        const object = new Object()
        object.token = Cookies.get("auth-token")
        const {data: ListDocumentMethod} = await api.documents.getDocumentGetMethods();
        const {data: Log} = await api.documents.getLog(idDocument);
        for (let i = 0; i < Log.length; i++) {
            if(Log[i].action === '?????????? ????????????'){
                setDisable(false)
                setCaptionMethod('???????????????? ???????????? ?????????????????? ??????????????!')
            } else if (Log[i].action === '?????????????? ???????????? ??????????????????'){
                setDisable(false)
                setCaptionMethod('???????????????? ???????????? ?????????????????? ??????????????!')
            } else {
                setDisable(true)
                setCaptionMethod('?????????? ???????????????? ?? ??????????????????, ?????????????????????? ???????????????? ???????????? ?????????????????? ??????!')
            }
        }
        setListDocumentMethod(ListDocumentMethod)
        const {data: Result} = await api.auth.getAssigningRole(object)
        if (Result.role === '??????????????') {
            setResult(Result)
            const {data: File} = await api.documents.getFile(idDocument)
            setFile(File.file)
            setNameFile(File.fileName)
            const {data: answer} = await api.documents.getDocument(idDocument, Number(Cookies.get('userId')))
                .catch((error) => {
                    if (error.response) {
                        if (error.response.data === 'Incorrect document ID') {
                            navigate("../not-found-404", {replace: true});
                        }
                    }
                })
            setComment(answer.comment)
            setDocumentGetMethod(answer.documentGetMethod)
            setDocument(answer)
            setMethodId(answer.DocumentGetMethodId)
            setStatusId(answer.documentStatusId)
            setStatus(answer.documentStatus)
            setUpdateDate(new Date(answer.updated).toLocaleDateString("ru-Ru", dateOptions))
            setCommentEmployer(answer.employerComment)
            if (Number(answer.documentStatusId) === 4) {
                setDisabledEdit(true)
            }

        } else {
            setResult(Result)
            const {data: File} = await api.documents.getFile(idDocument)
            setFile(File.file)
            setNameFile(File.fileName)
            const {data: answer} = await api.documents.getEmployerDocument(idDocument)
            setComment(answer.comment)
            setDocumentGetMethod(answer.documentGetMethod)
            setDocument(answer)
            setStatusId(answer.documentStatusId)
            setMethodId(answer.DocumentGetMethodId)
            setStatus(answer.documentStatus)
            setUpdateDate(new Date(answer.updated).toLocaleDateString("ru-Ru", dateOptions))
            setCommentEmployer(answer.employerComment)
            if (Number(answer.documentStatusId) === 4) {
                setDisabledEdit(true)
            }
            if (Number(userId) === Number(Cookies.get('userId'))) {
                setDisabledEdit(true)
            }


        }

    }, []);

    const dateCreated = new Date(Document.created)
    const dateUpdated = new Date(Document.updated)
    const {enqueueSnackbar} = useSnackbar();
    const dateOptions = {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric'
    }


    const updateDocument = async (event) => {
        event.preventDefault()

        const formData = new FormData(event.target)
        formData.append('token', token)
        formData.append('comment', comment)
        let dataObj = [...formData].reduce((o, [k, v]) => {
            o[k] = v;
            return o;
        }, {});

        const {data: answer} = await api.documents.updateDocument(JSON.stringify(dataObj), idDocument)
        setShowEdit(false)
        const {data: answerDocument} = await api.documents.getDocument(idDocument)
        setDocument(answerDocument)
        setStatusId(answerDocument.documentStatusId)
        setStatus(answerDocument.documentStatus)
        setUpdateDate(new Date(answerDocument.updated).toLocaleDateString("ru-Ru", dateOptions))
    }

    async function actionConfirmDialog(statusId) {
        setStatusId(Number(statusId))
        if (statusId === 4) {
            setDisabledEdit(true)
            await api.documents.updateStatus({
                token: token,
                documentStatusId: statusId,
                userId: Cookies.get("userId"),
                employerComment: commentEmployer
            }, idDocument)
            setStatus("??????????????????")
            setUpdateDate(new Date().toLocaleDateString("ru-Ru", dateOptions))
            enqueueSnackbar(`???????????? ?????????????? ?????????????? ???? "??????????????????"!`, {autoHideDuration: 3500, variant: 'info'})
        } else if (statusId === 5) {
            await api.documents.updateStatus({
                token: token,
                documentStatusId: statusId,
                userId: Cookies.get("userId"),
                employerComment: commentEmployer
            }, idDocument)
            setStatus("?????????????? ??????????????????")
            setUpdateDate(new Date().toLocaleDateString("ru-Ru", dateOptions))
            enqueueSnackbar(`???????????? ?????????????? ?????????????? ???? "?????????????? ??????????????????"!`, {autoHideDuration: 3500, variant: 'info'})
        }
    }

    const confirmDelete = async () => {

        setFile('')

        setNameFile('')
        setStatusId(2)
        const {data: answer} = await api.documents.deleteFile(idDocument)
        setStatus("?? ??????????????????")
        enqueueSnackbar(`???????????? ?????????????? ???????????????? ???? "?? ??????????????????!"`, {autoHideDuration: 3500, variant: 'info'})
        enqueueSnackbar(`???????? "${nameFile}" ????????????!`, {autoHideDuration: 3500, variant: 'info'})
    }

    function formatBytes(bytes, decimals = 2) {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const dm = decimals < 0 ? 0 : decimals;
        const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
    }

    const changeFile = async (event) => {
        setButtonsDisabled(true)
        event.preventDefault()

        if (event.target.files && event.target.files[0]) {
            const maxSize = 10240000
            let reader = new FileReader();
            const NameFile = event.target.value.slice(event.target.value.lastIndexOf(`\\`) + 1)
            const size = event.target.files[0].size
            if (size < maxSize) {
                setNameFile(NameFile)
                reader.readAsDataURL(event.target.files[0])
                reader.onloadstart = async () => {
                    setFileLoading(true)
                }
                reader.onload = async function (e) {

                    setFile(e.target.result)
                    const fileForSend = new Object()
                    fileForSend.token = token
                    fileForSend.file = e.target.result
                    fileForSend.fileName = NameFile
                    fileForSend.userId = Cookies.get("userId")
                    await api.documents.sendFile(fileForSend, idDocument).then(() => setFileLoading(false)).finally(() => setButtonsDisabled(false))
                    setStatus("????????????")
                    enqueueSnackbar(`???????? "${NameFile}" ????????????????!`, {autoHideDuration: 3500, variant: 'info'})
                    enqueueSnackbar(`???????????? ?????????????? ?????????????? ???? "????????????"!`, {autoHideDuration: 3500, variant: 'info'})
                    setStatusId(3)
                }
            } else {
                setFileLoading(false)
                setButtonsDisabled(false)
                enqueueSnackbar(`???????? "${NameFile}" ?????????????? ?????????????? (${formatBytes(size)})!`, {
                    autoHideDuration: 3500,
                    variant: 'info'
                })
            }


        }


    }

    async function downloadFile(event) {
        const FileSaver = require('file-saver');
        const base64Response = await fetch(file);
        const blob = await base64Response.blob();
        FileSaver.saveAs(blob, nameFile);
    }

    function handleChangeCommentEmployer(event) {
        setCommentEmployer(event.target.value)
    }

    async function handleChangeGroupButton(event, statusId) {
        setStatusIdDop(Number(statusId))
        const {data: ListTypicalComment} = await api.documents.getListTypicalComment(Number(statusId) === 4 ? 2 : 1)
        // setTypicalCommentId(ListTypicalComment[0].id)
        setListTypicalComment(ListTypicalComment)
        if (Number(statusId) === 4) {
            setCaptionFromDialog('?????????????? ?????????????? ????????????????????, ?????? ???????? ?????????? ...')
            setTitleFromDialog('?????????????? ??????????????????????')
            setHandleDialogForStatusDocument(true)
        } else if (Number(statusId) === 5) {
            setCaptionFromDialog('?????????????? ?????? ???????????????????? ????????????????????...')
            setTitleFromDialog('?????????????? ??????????????????????')
            setHandleDialogForStatusDocument(true)
        } else if (Number(statusId) === 2 || Number(statusId) === 3) {
            await api.documents.updateStatus({
                token: token,
                documentStatusId: 2,
                userId: Cookies.get("userId"),
            }, idDocument)
            setStatus("?? ??????????????????")
            enqueueSnackbar(`???????????? ?????????????? ?????????????? ???? "?? ??????????????????"!`, {autoHideDuration: 3500, variant: 'info'})
        }
    }

    async function changeTypicalCommentId(event) {
        const {data: caption} = await api.documents.getTypicalCommentById(event.target.value)
        setCommentEmployer(caption)
        setTypicalCommentId(event.target.value)
    }

    async function changeMethod(event){
        setDocumentGetMethod(listDocumentMethod[event.target.value - 1].name)
        setMethodId(event.target.value)
        await api.documents.updateMethod(
            {
                token: Cookies.get("auth-token"),
                getMethodId: event.target.value
            }, idDocument
        )
        enqueueSnackbar(`???????????? ?????????????????? ?????????????? ??????????????!`, {autoHideDuration: 3500, variant: 'info'})
    }

    return (
        <>
            <MainDocuments>
                <Link to={`/documents`}
                      style={{textDecoration: 'none', color: '#fff'}}>
                    <Button className={classesMain.button} variant="contained" startIcon={<ArrowBackIcon/>}>
                        ?????????????????? ?? ????????????
                    </Button>
                </Link>
                <CustomDialog
                    title='???????????????? ??????????'
                    content='???? ?????????????????????????? ???????????? ?????????????? ?????????'
                    open={handleDialog}
                    setOpen={setHandleDialog}
                    onConfirm={confirmDelete}
                />
                <CustomDialog
                    title={titleFromDialog}
                    content={captionFromDialog}
                    children={
                        <Grid
                            container
                            direction="column"
                            justifyContent="space-around"
                            alignItems="center"
                            spacing={3}
                        >
                            <CustomSelect
                                xs={12}
                                contentCustomSelect="??????????????????????"
                                setValueSelect={changeTypicalCommentId}
                                formHelperText={'???????????????? ?????????????? ??????????????????????'}
                                valueSelect={typicalCommentId}>
                                {
                                    listTypicalComment?.map(item =>
                                        <MenuItem
                                            key={item.id}
                                            className={classesMain.SelectItems}
                                            value={item.id}>
                                            {item.reasonName}
                                        </MenuItem>
                                    )
                                }
                            </CustomSelect>
                            <CustomTextarea
                                xs={12}
                                title='????????????????'
                                label='???????????????? ???????????????? ??????????????????????'
                                valueCustomTextarea={commentEmployer}
                                helperText='?????????????? ???????? ???????????????? ??????????????????????'
                                setValueCustomTextarea={(event) => handleChangeCommentEmployer(event)}
                            />
                        </Grid>
                    }
                    open={handleDialogForStatusDocument}
                    setOpen={setHandleDialogForStatusDocument}
                    onConfirm={() => actionConfirmDialog(statusIdDop)}
                />
                {
                    statusId === 4 ?
                        <div style={{margin: 20}}>
                            <CustomAlert
                                severity="warning"
                                title='????????????????????!'
                                content='???????????? ?????????????? "????????????????"! ???????????????????????????? ???????????????????? ??????????????????????????.'
                                activeAlert={true}
                            />
                        </div> : ''
                }
                {
                    Number(userId) === Number(Cookies.get('userId'))
                    && result.role === '??????????????????'
                    && statusId !== 4 ?
                        <div style={{margin: 20}}>
                            <CustomAlert
                                severity="info"
                                title='????????????????????!'
                                content='???? ???? ???????????? ???????????????????????? ??????????????, ?????????????? ???????? ????????????????. ?????????????????? ???????? ?????? ?????????????? ???????????? ??????????????????.'
                                activeAlert={true}
                            />
                        </div> : ''
                }
                {
                    Document === '' ?
                        <Grid
                            container
                            direction="row"
                            justifyContent="flex-start"
                            alignItems="flex-start"
                        >
                            <Grid item
                                  style={{
                                      marginLeft: 'auto',
                                      marginRight: 'auto',
                                      marginTop: 100
                                  }}>
                                <CircularProgress/>
                            </Grid>
                        </Grid> :
                        <Box style={{width: '80%', marginRight: 'auto', marginLeft: 'auto', marginTop: '50px'}}>
                            <Grid
                                container
                                direction="row"
                                justifyContent="flex-start"
                                alignItems="flex-start"
                            >
                                <Grid item xs={12} md={4} xl={4}>
                                    <Grid
                                        container
                                        direction="column"
                                        justifyContent="flex-start"
                                        alignItems="flex-start"
                                        spacing={1}
                                    >

                                        <Grid item>
                                            <Typography display="block"
                                                        style={{fontSize: 16}}
                                                        variant="overline"
                                                        className={classesDocumentsStyles.captionText}
                                                        gutterBottom>
                                                ??????????????: {Document.fullName}
                                            </Typography>
                                        </Grid>
                                        <Grid item>
                                            <Typography display="block"
                                                        style={{fontSize: 16}}
                                                        variant="overline"
                                                        className={classesDocumentsStyles.captionText}
                                                        gutterBottom>
                                                ????????????: {Document.groupName}
                                            </Typography>
                                        </Grid>
                                        <Grid item>
                                            <Typography display="block"
                                                        style={{fontSize: 16}}
                                                        variant="overline"
                                                        className={classesDocumentsStyles.captionText}
                                                        gutterBottom>
                                                ??????: {Document.documentType}
                                            </Typography>
                                        </Grid>
                                        <Grid item>
                                            <Typography display="block"
                                                        style={{fontSize: 16}}
                                                        variant="overline"
                                                        className={classesDocumentsStyles.captionText}
                                                        gutterBottom>
                                                ????????????: {status}
                                            </Typography>
                                        </Grid>
                                        <Grid item>
                                            <Typography display="block"
                                                        style={{fontSize: 16}}
                                                        variant="overline"
                                                        className={classesDocumentsStyles.captionText}
                                                        gutterBottom>
                                                ??????????????: {new Date(dateCreated).toLocaleDateString("ru-Ru", dateOptions)}
                                            </Typography>
                                        </Grid>
                                        <Grid item>
                                            <Typography display="block"
                                                        style={{fontSize: 16}}
                                                        variant="overline"
                                                        className={classesDocumentsStyles.captionText}
                                                        gutterBottom>
                                                ??????????????????: {updateDate}
                                            </Typography>
                                        </Grid>
                                        <hr className={classesDocumentsStyles.hrLine}/>
                                        {result.role === '??????????????????' && !disabledEdit ?
                                            <>
                                                {statusId !== 3 ?
                                                    <Grid item xs={11} style={{width: '100%'}}>
                                                        <Stack spacing={1}>
                                                            {
                                                                statusId === 5 ? '' :
                                                                    <Button
                                                                        disabled={buttonsDisabled}
                                                                        className={classesMain.ButtonGroupItem}
                                                                        key={4}
                                                                        onClick={(event) => handleChangeGroupButton(event, 4)}>
                                                                        ??????????????????
                                                                    </Button>
                                                            }

                                                            {
                                                                statusId === 2 || statusId === 4 || statusId === 5 || statusIdDop === 2? '' :
                                                                    <Button
                                                                        disabled={buttonsDisabled}
                                                                        className={classesMain.ButtonGroupItem}
                                                                        key={5}
                                                                        onClick={(event) => handleChangeGroupButton(event, 5)}>
                                                                        ?????????????? ??????????????????
                                                                    </Button>
                                                            }

                                                            {
                                                                statusId === 5 || statusId === 4 || statusId === 2 || statusIdDop === 2? '' :
                                                                    <Button
                                                                        disabled={buttonsDisabled}
                                                                        className={classesMain.ButtonGroupItem}
                                                                        key={2}
                                                                        onClick={(event) => handleChangeGroupButton(event, 2)}>
                                                                        ?????????????? ?? ??????????????????
                                                                    </Button>
                                                            }
                                                        </Stack>
                                                    </Grid> : ''
                                                }


                                                {
                                                    !fileLoading ? statusIdDop === 2 || statusIdDop === 3 || statusId === 3 || statusId === 2 ?
                                                        <Grid item xs={11} style={{width: '100%', marginTop: 20}}>
                                                            {
                                                                statusIdDop === 2 ?
                                                                    <CustomAlert
                                                                        severity="info"
                                                                        title='????????????????????!'
                                                                        content='???????????? ?????????????? "?? ??????????????????"! ???????????????????? ?????????????????? ?????????????? ???????? ?????? ?????????????? ?????????????? ???? "????????????".'
                                                                        activeAlert={true}
                                                                    /> : ''
                                                            }
                                                            <div className="load-file-form">
                                                                <div className="form-group">
                                                                    <label className="label">
                                                                        <i className="material-icons">attach_file</i>
                                                                        <span style={{
                                                                            overflowWrap: 'break-word',
                                                                            wordBreak: 'break-all'
                                                                        }}
                                                                              className="title">{nameFile !== undefined && nameFile !== '' ? nameFile : '???????????????? ????????'}</span>
                                                                        <input
                                                                            type="file"
                                                                            hidden
                                                                            disabled={buttonsDisabled}
                                                                            id="uploadFile"
                                                                            accept=".pdf,.doc,.img,.png,.jpg,.jpeg"
                                                                            name="file"
                                                                            onChange={changeFile}
                                                                        />
                                                                    </label>
                                                                </div>
                                                            </div>

                                                        </Grid> : ''
                                                    :
                                                    <Grid item xs={12} style={{
                                                        width: '100%',
                                                        display: 'flex',
                                                        justifyContent: 'center',
                                                        alignItems: 'center'
                                                    }}>
                                                        <Typography style={{marginRight: '10px'}}>????????????????
                                                            ??????????</Typography>
                                                        <CircularProgress/>
                                                    </Grid>
                                                }
                                                {
                                                    nameFile !== ''
                                                    && statusId === 3 ?
                                                        <Grid item xs={11} style={{width: '100%'}}>
                                                            <Grid
                                                                container
                                                                direction="row"
                                                                justifyContent="center"
                                                                alignItems="center"
                                                                spacing={1}
                                                            >
                                                                <Grid item xs={12}>
                                                                    <Button
                                                                        className={classesMain.button}
                                                                        variant="contained"
                                                                        style={{width: '100%'}}
                                                                        onClick={() => setHandleDialog(true)}>
                                                                        ?????????????? ????????
                                                                    </Button>
                                                                </Grid>
                                                            </Grid>
                                                        </Grid> : ''
                                                }
                                            </>
                                            :
                                            statusId === 3 && result.role !== '??????????????????' ?
                                                <Grid item xs={11} style={{width: '100%'}}>
                                                    <Grid item
                                                          xs={12}>
                                                        <Button
                                                            className={classesMain.button}
                                                            variant="contained"
                                                            style={{width: '100%'}}
                                                            onClick={(event) => downloadFile(event)}>
                                                            ?????????????? ????????
                                                        </Button>
                                                    </Grid>
                                                </Grid>
                                                :
                                                (statusId === 4 || statusId === 5)
                                                && result.role !== '??????????????????'
                                                && Document.employerComment !== '' ?
                                                    <div style={{marginTop: 20}}>
                                                        <Typography variant="overline"
                                                                    className={classesDocumentsStyles.overlineText}
                                                                    display="block"
                                                                    style={{lineHeight: '5px'}}
                                                                    gutterBottom>
                                                            ?????????????????????? ????????????????????
                                                        </Typography>
                                                        <Typography variant="body1"
                                                                    style={{
                                                                        wordBreak: 'break-all',
                                                                        overflowWrap: 'break-word',
                                                                        maxWidth: '300px'
                                                                    }}
                                                                    className={classesDocumentsStyles.overlineText}
                                                                    display="block"
                                                                    gutterBottom>
                                                            {Document.employerComment}
                                                        </Typography>
                                                    </div> : ''
                                        }
                                    </Grid>
                                </Grid>
                                <Divider orientation="vertical" flexItem/>
                                <Grid item xs={12} md={7} xl={7} style={{margin: 20}}>
                                    <form onSubmit={updateDocument}>
                                        <Grid
                                            container
                                            direction="column"
                                            justifyContent="center"
                                            alignItems="stretch"
                                            spacing={2}
                                        >
                                            {
                                                showEdit ?
                                                    <>
                                                        <CustomTextarea
                                                            xs={12}
                                                            label='??????????????????????'
                                                            valueCustomTextarea={comment}
                                                            setValueCustomTextarea={(event) => setComment(event.target.value)}
                                                        />
                                                        <CustomSelect
                                                            xs={12}
                                                            disabled={disable}
                                                            contentCustomSelect="???????????? ?????????????????? ??????????????"
                                                            setValueSelect={(event)=>changeMethod(event)}
                                                            formHelperText={captionMethod}
                                                            valueSelect={methodId}>
                                                            {
                                                                listDocumentMethod.map(item =>
                                                                    <MenuItem key={item.id} className={classesMain.SelectItems}
                                                                              value={item.id}>{item.name}</MenuItem>
                                                                )
                                                            }
                                                        </CustomSelect>
                                                        <CustomFormGenerator
                                                            fields={Document.fields}
                                                            setFields={setDocument}
                                                            xs={12}
                                                            typeId={Document.documentTypeId}
                                                        >

                                                        </CustomFormGenerator>
                                                    </>

                                                    :
                                                    <Grid item style={{width: '100%'}}>
                                                        <Stack spacing={3}>
                                                            <div>
                                                                <Typography variant="overline"
                                                                            className={classesDocumentsStyles.overlineText}
                                                                            display="block"
                                                                            style={{lineHeight: '5px'}}
                                                                            gutterBottom>
                                                                    ??????????????????????:
                                                                </Typography>
                                                                <Typography variant="body1"
                                                                            style={{wordBreak: 'break-all'}}
                                                                            className={classesDocumentsStyles.overlineText}
                                                                            display="block"
                                                                            gutterBottom>
                                                                    {comment}
                                                                </Typography>
                                                            </div>
                                                            <div>
                                                                <Typography variant="overline"
                                                                            className={classesDocumentsStyles.overlineText}
                                                                            display="block"
                                                                            style={{lineHeight: '5px'}}
                                                                            gutterBottom>
                                                                    ???????????? ?????????????????? ??????????????:
                                                                </Typography>
                                                                <Typography variant="body1"
                                                                            style={{wordBreak: 'break-all'}}
                                                                            className={classesDocumentsStyles.overlineText}
                                                                            display="block"
                                                                            gutterBottom>
                                                                    {documentGetMethod}
                                                                </Typography>
                                                            </div>
                                                            {
                                                                Document.fields?.map(item =>
                                                                    <div>
                                                                        <Typography variant="overline"
                                                                                    className={classesDocumentsStyles.overlineText}
                                                                                    display="block"
                                                                                    style={{lineHeight: '5px'}}
                                                                                    gutterBottom>
                                                                            {item.name}
                                                                        </Typography>
                                                                        <Typography variant="body1"
                                                                                    className={classesDocumentsStyles.overlineText}
                                                                                    display="block"
                                                                                    gutterBottom>
                                                                            {item.value}
                                                                        </Typography>
                                                                    </div>
                                                                )
                                                            }
                                                        </Stack>
                                                    </Grid>
                                            }
                                        </Grid>

                                        <div style={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            cursor: 'pointer',
                                            float: 'right',
                                            marginTop: '50px',
                                        }}>
                                            {result.role === '??????????????????' || statusId === 3 ? '' :
                                                !showEdit && !disabledEdit ?
                                                    <Button
                                                        onClick={() => setShowEdit(true)}
                                                        className={classesMain.button}
                                                        variant="contained">
                                                        ??????????????????????????
                                                    </Button>
                                                    : !disabledEdit ?
                                                        <CustomSubmitButton
                                                            className={classesMain.button}
                                                            contentCustomButton={'??????????????????'}/> : ''

                                            }
                                        </div>

                                    </form>
                                </Grid>
                            </Grid>
                        </Box>
                }
            </MainDocuments>
        </>
    )


}

export default DocumentById