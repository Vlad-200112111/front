import {useEffect, useState} from 'react'
import {Chip, Grid, Typography} from "@material-ui/core";
import useStylesMain from "../../../../../Styles/MainStyles";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import useStylesDocumentsStyles from "../../../../../Styles/DocumentsStyles";
import {Link} from "react-router-dom";
import Button from "@mui/material/Button";
import CustomFullScreenDialog from "../../../../UI/CustomFullScreenDialog/CustomFullScreenDialog";
import Cookies from "js-cookie";
import Tooltip from '@mui/material/Tooltip';
import api from "../../../../../Services/api";
import {Timeline, TimelineConnector, TimelineContent, TimelineDot, TimelineItem, TimelineSeparator} from "@mui/lab";
import Grow from '@mui/material/Grow';
import {Stack} from "@mui/material";

const ItemDocumentsGrid = (props) => {
    const classesMain = useStylesMain();
    const classesDocumentsStyles = useStylesDocumentsStyles()
    const dateOptions = {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric'
    }
    const [openCustomFullScreenDialog, setOpenCustomFullScreenDialog] = useState(false);
    const [log, setLog] = useState([]);

    const date = new Date()
    const dateCreated = new Date(props.itemDocuments.created)
    const dateUpdated = new Date(props.itemDocuments.updated)
    const readyDate = new Date(props.itemDocuments.readyDate)
    const termDate = date.setDate(date.getDate() + 1) > new Date(readyDate) && new Date(readyDate) > date.setDate(date.getDate())

    async function openCustomFullScreenDialogFunction() {
        const {data: Log} = await api.documents.getLog(props.itemDocuments.id);
        setLog(Log)
        setOpenCustomFullScreenDialog(true)
    }

    return (
        <>
            <Grid item xs={12} md={6}>
                {/*<Grow in={props.grow}*/}
                {/*      style={{transformOrigin: '0 0 0'}}*/}
                {/*      {...(props.grow ? {timeout: props.timeout} : {})}*/}
                {/*>*/}
                <Card className={classesMain.card}>
                    <CardContent className={classesMain.cardContent}
                                 style={{height: props.role === '??????????????????' ? 250 : 200}}>

                        <div className={classesMain.cardFirstLine}>
                            <Typography style={{fontSize: 15}}
                                        className={classesDocumentsStyles.captionText}
                                        variant="overline">
                                {props.itemDocuments.documentType}
                            </Typography>

                            <Tooltip title="???????????? ??????????????">
                                <Chip style={{
                                    background:
                                        props.itemDocuments.documentStatus === "????????????????" ? '#74af27' :
                                            props.itemDocuments.documentStatus === "????????????????" ? '#e64343' :
                                                props.itemDocuments.documentStatus === "?? ??????????????????" ? '#e3a034' :
                                                    props.itemDocuments.documentStatus === "??????????" ? '#74af27' : '#e3a034',
                                    color: '#fff'
                                }} label={props.itemDocuments.documentStatus}/>
                            </Tooltip>
                        </div>
                        <hr className={classesDocumentsStyles.hrLine}/>
                        <Grid
                            container
                            direction="row"
                            justifyContent="space-between"
                            alignItems="flex-start"
                        >
                            <Grid item>
                                <Grid
                                    container
                                    direction="column"
                                    justifyContent="center"
                                    alignItems="flex-start"
                                >
                                    {
                                        props.role === '??????????????????' ?
                                            <>
                                                <Grid item>
                                                    <Typography display="block"
                                                                className={classesDocumentsStyles.captionText}
                                                                gutterBottom>
                                                        ??????????????: {props.itemDocuments.fullName}
                                                    </Typography>
                                                </Grid>
                                                <Grid item>
                                                    <Typography display="block"
                                                                className={classesDocumentsStyles.captionText}
                                                                gutterBottom>
                                                        ????????????: {props.itemDocuments.groupName}
                                                    </Typography>
                                                </Grid>
                                            </> : ''
                                    }
                                    <Grid item>
                                        <Typography display="block" className={classesDocumentsStyles.captionText}
                                                    gutterBottom>
                                            ??????????????: {new Date(dateCreated).toLocaleDateString("ru-Ru", dateOptions)}
                                        </Typography>
                                    </Grid>
                                    <Grid item>
                                        <Typography display="block" className={classesDocumentsStyles.captionText}
                                                    gutterBottom>
                                            ??????????????????: {new Date(dateUpdated).toLocaleDateString("ru-Ru", dateOptions)}
                                        </Typography>
                                    </Grid>

                                        {
                                            new Date(readyDate).toLocaleDateString("ru-Ru", dateOptions) === '1 ???????????? 1970 ??., 09:00' ? '' :
                                                <Grid item>
                                                    <Typography style={{color: termDate ? '#df2525' : '#485C90'}}
                                                                display="block" className={classesDocumentsStyles.captionText}
                                                                gutterBottom>
                                                        ????????
                                                        ????????????????????: {new Date(readyDate).toLocaleDateString("ru-Ru", dateOptions)}
                                                        {termDate ? <span style={{color: '#df2525'}}> - ???????? ???????????????????? ???????????????? ?? ??????????</span> : ''}
                                                    </Typography>

                                                </Grid>
                                        }
                                </Grid>
                            </Grid>


                            <Grid item>
                                <CustomFullScreenDialog
                                    fullWidthScreenDialog={true}
                                    fullScreenDialog={false}
                                    titleCustomFullScreenDialog='?????????????? ??????????????'
                                    setOpenCustomFullScreenDialog={setOpenCustomFullScreenDialog}
                                    openCustomFullScreenDialog={openCustomFullScreenDialog}
                                    scrollType='body'>


                                    <Timeline position={'right'} style={{margin: 20}}>
                                        {
                                            log.map(item =>
                                                <TimelineItem key={item.id}>
                                                    <TimelineSeparator>
                                                        <TimelineDot
                                                            style={{background: 'rgb(90, 125, 205)'}}/>
                                                        <TimelineConnector/>
                                                    </TimelineSeparator>
                                                    <TimelineContent>
                                                        <Typography
                                                            variant="h6"
                                                            component="span"
                                                            className={classesMain.Text}
                                                            style={{textAlign: 'left', fontWeight: '600'}}>
                                                            {item.action}
                                                        </Typography>
                                                        <Typography
                                                            className={classesMain.Text}
                                                            style={{textAlign: 'left'}}>
                                                            ??????: {item.userName}
                                                        </Typography>
                                                        <Typography
                                                            className={classesMain.Text}
                                                            style={{textAlign: 'left'}}>
                                                            {new Date(item.date).toLocaleDateString("ru-Ru", dateOptions)}
                                                        </Typography>
                                                    </TimelineContent>
                                                </TimelineItem>
                                            )
                                        }

                                    </Timeline>


                                </CustomFullScreenDialog>
                            </Grid>
                        </Grid>
                    </CardContent>
                    <CardActions className={classesMain.blueBackgroud}>
                        <Stack direction={'row'} spacing={2} style={{width: '100%'}}>
                            <Link to={`/documents/${props.itemDocuments.id}`}
                                  style={{textDecoration: 'none', width: '100%'}}>
                                <Button style={{width: '100%'}} className={classesMain.TextWhite}>
                                    ??????????????????
                                </Button>
                            </Link>
                            <Button style={{width: '100%'}}
                                className={classesMain.TextWhite}
                                onClick={openCustomFullScreenDialogFunction}
                            >
                                ???????????????? ??????????????
                            </Button>
                        </Stack>
                    </CardActions>

                </Card>
                {/*</Grow>*/}
            </Grid>
        </>
    )
}

export default ItemDocumentsGrid