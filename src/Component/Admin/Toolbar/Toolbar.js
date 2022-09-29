import React, {useState} from 'react';
import {Accordion, AccordionDetails, AccordionSummary, Chip, Grid, MenuItem, Tab, Typography} from "@material-ui/core";
import useStylesMain from "../../../Styles/MainStyles";
import Box from "@mui/material/Box";
import CustomAlert from "../../UI/CustomAlert/CustomAlert";
import Button from "@mui/material/Button";
import ItemToolbar from "./ItemToolbar";
import CustomSelect from "../../UI/CustomSelect/CustomSelect";
import CustomInput from "../../UI/CustomInput/CustomInput";
import CustomTextarea from "../../UI/CustomTextarea/CustomTextarea";
import CustomDesktopDatePicker from "../../UI/CustomDesktopDatePicker/CustomDesktopDatePicker";
import CustomPhoneNumberInput from "../../UI/CustomPhoneNumberInput/CustomPhoneNumberInput";
import CustomTimePicker from "../../UI/CustomTimePicker/CustomTimePicker";
import CustomFullScreenDialog from "../../UI/CustomFullScreenDialog/CustomFullScreenDialog";
import CustomDialog from "../../UI/CustomDialog/CustomDialog";
import DeleteIcon from "@mui/icons-material/Delete";
import CustomIconButton from "../../UI/CustomIconButton/CustomIconButton";
import PreviewIcon from "@mui/icons-material/Preview";
import CustomAutocomplete from "../../UI/CustomAutocomplete/CustomAutocomplete";
import CustomInputEmail from "../../UI/CustomInputEmail/CustomInputEmail";
import ListItemButton from "@mui/material/ListItemButton";
import {Link} from "react-router-dom";
import {Pagination} from "@mui/material";
import vk from '../../../Assets/Image/social-medias/vk.svg'
import ListItemText from "@mui/material/ListItemText";
import CustomItemsMenu from "../../UI/CustomItemsMenu/CustomItemsMenu";
import CardMembershipIcon from "@mui/icons-material/CardMembership";
import useStylesDrawer from "../../../Styles/DrawerStyles";
import CustomModal from "../../UI/CustomModal/CustomModal";
import CustomBackdrop from "../../UI/CustomBackdrop/CustomBackdrop";
import AddIcon from "@mui/icons-material/Add";
import CustomClickAwayListener from "../../UI/CustomClickAwayListener/CustomClickAwayListener";
import SortIcon from "@mui/icons-material/Sort";
import SettingsIcon from "@mui/icons-material/Settings";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ClickAwayButton from "../../UI/СlickAwayButton/ClickAwayButton";
import CustomRadio from "../../UI/CustomRadio/CustomRadio";
import CustomSocialMedia from "../../UI/CustomSocialMedia/CustomSocialMedia";
import CustomStepper from "../../UI/CustomStepper/CustomStepper";
import CustomSwitchButton from "../../UI/CustomSwitchButton/CustomSwitchButton";
import CustomTab from "../../UI/CustomTab/CustomTab";
import CustomTabPanel from "../../UI/CustomTabPanel/CustomTabPanel";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import CustomTable from "../../UI/CustomTable/CustomTable";
import CustomTag from "../../UI/CustomTag/CustomTag";
import LightTooltip from "../../UI/LightTooltip/LightTooltip";
import EditIcon from "@mui/icons-material/Edit";
import HistoryBackButton from "../../UI/HistoryBackButton/HistoryBackButton";
import {CardActionArea, CardActions, Stack} from "@mui/material";
import CardMedia from "@mui/material/CardMedia";
import defaultImage from "../../../Assets/Image/Olympiads/default_olympiad_image.svg";
import CardContent from "@mui/material/CardContent";
import Card from "@mui/material/Card";
import useStylesOlympiads from "../../../Styles/OlympiadsStyles";
import DownloadIcon from "@mui/icons-material/Download";
import pdf from "../../../Assets/Image/Portfolio/pdf.svg";
import CloseIcon from "@mui/icons-material/Close";
import PortfolioStyles from "../../../Styles/PortfolioStyles";
import Tooltip from "@mui/material/Tooltip";
import {Timeline, TimelineConnector, TimelineContent, TimelineDot, TimelineItem, TimelineSeparator} from "@mui/lab";
import useStylesDocumentsStyles from "../../../Styles/DocumentsStyles";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import useStylesHome from "../../../Styles/HomeStyles";
import {styled} from "@mui/material/styles";
import MuiAccordion from "@mui/material/Accordion";
import MuiAccordionSummary from "@mui/material/AccordionSummary";
import ArrowForwardIosSharpIcon from "@mui/icons-material/ArrowForwardIosSharp";
import MuiAccordionDetails from "@mui/material/AccordionDetails";

function Toolbar(props) {
    const classesMain = useStylesMain()
    const classesDrawer = useStylesDrawer()
    const classesOlympiads = useStylesOlympiads()
    const classesPortfolio = PortfolioStyles()
    const classesDocumentsStyles = useStylesDocumentsStyles()
    const classesHome = useStylesHome();


    const [openDialogFullScreen, setOpenDialogFullScreen] = useState(false)
    const [openDialogConfirm, setOpenDialogConfirm] = useState(false)
    const [openCustomModal, setOpenCustomModal] = useState(false)
    const [backdropCircle, setBackDropCircle] = useState(false)
    const [clickAway, setClickAway] = useState(false)
    const [expanded, setExpanded] = useState(false);
    const [tab, setTab] = useState('1')
    const [toggleButton, setToggleButton] = useState(1)
    const [page, setPage] = useState(1)


    const handleChangeAccordion = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };

    const handleChangePagination = async (event, value) => {
        setPage(value)
    };

    const Accordion = styled((props) => (
        <MuiAccordion disableGutters elevation={0} square {...props} />
    ))(({ theme }) => ({
        border: `1px solid ${theme.palette.divider}`,
        '&:not(:last-child)': {
            borderBottom: 0,
        },
        '&:before': {
            display: 'none',
        },
    }));

    const AccordionSummary = styled((props) => (
        <MuiAccordionSummary
            expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: '0.9rem', color: '#fff' }} />}
            {...props}
        />
    ))(({ theme }) => ({
        backgroundColor:
            theme.palette.mode === 'dark'
                ? '#fff'
                : 'rgba(0, 0, 0, .03)',
        flexDirection: 'row-reverse',
        '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
            transform: 'rotate(90deg)',
        },
        '& .MuiAccordionSummary-content': {
            marginLeft: theme.spacing(1),
        },
    }));

    const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
        padding: theme.spacing(2),
        borderTop: '1px solid rgba(0, 0, 0, .125)',
    }));

    return (
        <>
            <Grid maxWidth="xs" className={classesMain.backgroundMain}>
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <Typography className={classesMain.Title} variant="h1">Панель инструментов</Typography>
                    </Grid>
                </Grid>
                <Box
                    sx={{
                        width: '100%', typography: 'body1'
                    }}>
                    <Grid
                        container
                        direction="column"
                        justifyContent="center"
                        alignItems="stretch"
                        spacing={2}
                    >
                        <Grid item>
                            <Typography variant="overline"
                                        display="block"
                                        gutterBottom
                                        style={{fontSize: 16, color: '#485C90'}}>
                                Оповещение
                            </Typography>
                        </Grid>
                        <ItemToolbar
                            caption={'Оповещение - Успех'}
                            element={
                                <CustomAlert
                                    severity="success"
                                    title='Успешно!'
                                    content='Информация!'
                                    activeAlert={true}
                                />
                            }
                        />
                        <ItemToolbar
                            caption={'Оповещение - Ошибка'}
                            element={
                                <CustomAlert
                                    severity="error"
                                    title='Ошибка!'
                                    content='Информация!'
                                    activeAlert={true}
                                />
                            }
                        />
                        <ItemToolbar
                            caption={'Оповещение - Информация'}
                            element={
                                <CustomAlert
                                    severity="info"
                                    title='Информация!'
                                    content='Информация!'
                                    activeAlert={true}
                                />
                            }
                        />
                        <ItemToolbar
                            caption={'Оповещение - Предупреждение'}
                            element={
                                <CustomAlert
                                    severity="warning"
                                    title='Предупреждение!'
                                    content='Информация!'
                                    activeAlert={true}
                                />
                            }
                        />
                        <Grid item>
                            <Typography variant="overline"
                                        display="block"
                                        gutterBottom
                                        style={{fontSize: 16, color: '#485C90'}}>
                                Элементы взаимодействия с пользователем
                            </Typography>
                        </Grid>
                        <ItemToolbar
                            caption={'Select'}
                            element={
                                <CustomSelect
                                    contentCustomSelect={'Select'}
                                    valueSelect={'1'}
                                    formHelperText='Вспомогающий текст'
                                >
                                    <MenuItem
                                        key={'1'}
                                        value={'1'}>
                                        <Typography style={{color: '#000'}}>Значение 1</Typography>
                                    </MenuItem>
                                    <MenuItem
                                        key={'2'}
                                        value={'2'}>
                                        <Typography style={{color: '#000'}}>Значение 2</Typography>
                                    </MenuItem>
                                    <MenuItem
                                        key={'3'}
                                        value={'3'}>
                                        <Typography style={{color: '#000'}}>Значение 3</Typography>
                                    </MenuItem>
                                </CustomSelect>
                            }
                        />
                        <ItemToolbar
                            caption={'Input'}
                            element={
                                <CustomInput
                                    customValueInput={'Значение'}
                                    label='Input'
                                    helperText='Вспомогающий текст'
                                />
                            }
                        />
                        <ItemToolbar
                            caption={'Textarea'}
                            element={
                                <CustomTextarea
                                    label='Textarea'
                                    valueCustomTextarea={'Значение'}
                                    helperText='Вспомогающий текст'
                                />
                            }
                        />
                        <ItemToolbar
                            caption={'Autocomplete'}
                            element={
                                <CustomAutocomplete
                                    label={'Autocomplete'}
                                    options={['option1','option2']}
                                />
                            }
                        />
                        <ItemToolbar
                            caption={'CustomInputEmail'}
                            element={
                                <CustomInputEmail
                                    label={'CustomInputEmail'}
                                />
                            }
                        />
                        <ItemToolbar
                            caption={'DesktopDatePicker'}
                            element={
                                <CustomDesktopDatePicker
                                    label='DesktopDatePicker'
                                    helperText='Вспомогающий текст'
                                />
                            }
                        />
                        <ItemToolbar
                            caption={'DesktopTimePicker'}
                            element={
                                <CustomTimePicker
                                    label={'DesktopTimePicker'}
                                    helperText='Вспомогающий текст'
                                />
                            }
                        />
                        <ItemToolbar
                            caption={'InputPhoneNumber'}
                            element={
                                <CustomPhoneNumberInput
                                    label='InputPhoneNumber'
                                    helperText='Вспомогающий текст'
                                />
                            }
                        />
                        <ItemToolbar
                            caption={'OpenDialogFullScreen'}
                            element={
                            <>
                                <CustomFullScreenDialog
                                    fullWidthScreenDialog={true}
                                    fullScreenDialog={true}
                                    titleCustomFullScreenDialog='FullScreenDialog'
                                    setOpenCustomFullScreenDialog={() => setOpenDialogFullScreen(false)}
                                    openCustomFullScreenDialog={openDialogFullScreen}
                                    scrollType='body'>
                                    <Box sx={{m: 4}}>
                                        <h1>CONTENT</h1>
                                    </Box>
                                </CustomFullScreenDialog>
                                <Button
                                    style={{width: '100%'}}
                                    className={classesMain.button}
                                    onClick={() => setOpenDialogFullScreen(true)}
                                >
                                    OpenDialogFullScreen
                                </Button>
                            </>
                            }
                        />
                        <ItemToolbar
                            caption={'openDialogConfirm'}
                            element={
                                <>
                                    <CustomDialog
                                        title={'Заголовок'}
                                        content="Контент"
                                        open={openDialogConfirm}
                                        setOpen={setOpenDialogConfirm}
                                        onConfirm={()=>console.log('1')}
                                        
                                    />
                                    <Button
                                        style={{width: '100%'}}
                                        className={classesMain.button}
                                        onClick={() => setOpenDialogConfirm(true)}
                                    >
                                        openDialogConfirm
                                    </Button>
                                </>
                            }
                        />
                        <ItemToolbar
                            caption={'Модальное окно'}
                            element={
                                <>
                                    <Button
                                        style={{width: '100%'}}
                                        className={classesMain.button}
                                        onClick={() => setOpenCustomModal(true)}
                                    >
                                        OpenCustomModal
                                    </Button>
                                    <CustomModal
                                        title={'Модальное окно'}
                                        open={openCustomModal}
                                        handleClose={()=>setOpenCustomModal(false)}
                                    >
                                        <Box style={{width:'200px',height:'200px'}}>

                                        </Box>
                                    </CustomModal>
                                </>
                            }>

                        </ItemToolbar>
                        <ItemToolbar
                            caption={'Загрузка с затемнением'}
                            element={
                                <>
                                    <Button
                                        style={{width: '100%'}}
                                        className={classesMain.button}
                                        onClick={() => {
                                            setBackDropCircle(true)
                                            setTimeout(()=>{
                                                setBackDropCircle(false)
                                            },2000)
                                        }}
                                    >
                                        Backdrop
                                    </Button>
                                    <CustomBackdrop open={backdropCircle}/>

                                </>
                            }>

                        </ItemToolbar>
                        <ItemToolbar
                            caption={'Кнопка-иконка удаления'}
                            element={
                                <CustomIconButton
                                    icon={<DeleteIcon/>}
                                    caption={'Нажмите для того, чтобы удалить!'}
                                    
                                />
                            }>

                        </ItemToolbar>
                        <ItemToolbar
                            caption={'Кнопка-иконка просмотра'}
                            element={
                                <CustomIconButton
                                    icon={<PreviewIcon/>}
                                    caption={'Нажмите для того, чтобы просмотреть!'}
                                />
                            }>

                        </ItemToolbar>
                        <ItemToolbar
                            caption={'CustomItemsMenu'}
                            element={
                                <CustomItemsMenu  titleCustomItemsMenu={'CustomItemsMenu'} icon={<CardMembershipIcon/>}>
                                    {
                                        [{name:'item1'}, {name:'item2'}, {name:'item3'}].map(contentItem =>
                                            <ListItemButton>
                                                <ListItemText
                                                    style={{margin: '0 !important'}}
                                                    className={classesDrawer.ListItemText}
                                                    primary={contentItem.name}/>
                                            </ListItemButton>
                                        )
                                    }
                                </CustomItemsMenu>
                            }>

                        </ItemToolbar>
                        <ItemToolbar
                            caption={'ClickAwayButton'}
                            element={
                                <ClickAwayButton title={<>
                                    <SettingsIcon className={classesMain.Text} style={{width: '20px'}}/>
                                    <ArrowDropDownIcon className={classesMain.Text}/>
                                </>}
                                style={{
                                    width:'100%',
                                    position: 'absolute',
                                    top: 28,
                                    right: 0,
                                    zIndex: 50,
                                    border: '1px solid grey',
                                    p: 3,
                                    bgcolor: '#fff',}}>
                                    content
                                </ClickAwayButton>
                            }>

                        </ItemToolbar>
                        <ItemToolbar
                            caption={'radioGroup'}
                            element={
                                <CustomRadio
                                    name='radioGroup'
                                    listRadio={
                                    [
                                        {
                                        label: 'radio1',
                                        value: 1
                                        },
                                        {
                                            label: 'radio2',
                                            value: 2
                                        },
                                        {
                                            label: 'radio3',
                                            value: 3
                                        },
                                        
                                        {
                                            label: 'radio4',
                                            value: 4
                                        }
                                        ]
                                }
                                />
                            }>

                        </ItemToolbar>
                        <ItemToolbar
                            caption={'CustomSocialMedia'}
                            element={
                                <CustomSocialMedia
                                    canRemove={true}
                                    item={{
                                        id:0,
                                        name:'vk',
                                        icon: vk
                                    }}
                                />
                            }>

                        </ItemToolbar>
                        <ItemToolbar
                            caption={'CustomStepper'}
                            element={
                                <CustomStepper
                                    width={'600px'}
                                    listForStepper={[1,2,3,4,5]}
                                    contentStepper={['content1', 'content2','content3','content4','content5']}
                                    >
                                </CustomStepper>
                            }>

                        </ItemToolbar>
                        <ItemToolbar
                            caption={'CustomSwitch'}
                            element={
                                <CustomSwitchButton  label='Switch'/>
                            }>

                        </ItemToolbar>
                        <ItemToolbar
                            caption={'CustomTab'}
                            element={
                                <CustomTab onChange={setTab} firstTab={'1'}>
                                    {
                                        [{id:1, name:'Tab1'}, {id:2, name:'Tab2'}, {id:3, name:'Tab3'}].map(item =>
                                            <Tab
                                                key={item.id}
                                                className={classesMain.TabsItems}
                                                label={<div className={classesMain.TabItemText}>{item.name}</div>}
                                                value={String(item.id)}
                                            />
                                        )
                                    }
                                    {
                                        [{id:1, name:'name1',content:'content1'}, {id:2, name:'name2',content:'content2'}, {id:3, name:'name3',content:'content3'}].map(itemCategories =>
                                            <CustomTabPanel className={classesMain.TabsPanelMobile} rowSpacing={1} key={itemCategories.id}
                                                            value={String(itemCategories.id)}>
                                                {itemCategories.content}
                                            </CustomTabPanel>
                                        )
                                    }
                                </CustomTab>
                            }>

                        </ItemToolbar>
                        <ItemToolbar
                            caption={'CustomTable'}
                            element={
                                <CustomTable rows={[
                                    {id:1,td1:'content',td2:'content',td3:'content',td4:'content'},
                                    {id:2,td1:'content',td2:'content',td3:'content',td4:'content'},
                                    {id:3,td1:'content',td2:'content',td3:'content',td4:'content'},
                                    {id:4,td1:'content',td2:'content',td3:'content',td4:'content'},
                                    {id:5,td1:'content',td2:'content',td3:'content',td4:'content'}
                                ]} showFooter={true}>

                                    {
                                        <TableRow>
                                            <TableCell className={classesMain.TextWhite}>
                                                head1
                                            </TableCell>
                                            <TableCell className={classesMain.TextWhite}>
                                                head2
                                            </TableCell>
                                            <TableCell className={classesMain.TextWhite}>
                                                head3
                                            </TableCell>
                                            <TableCell className={classesMain.TextWhite}>
                                                head4
                                            </TableCell>
                                        </TableRow>
                                    }


                                    {
                                        [
                                            {id:1,td1:'content',td2:'content',td3:'content',td4:'content'},
                                            {id:2,td1:'content',td2:'content',td3:'content',td4:'content'},
                                            {id:3,td1:'content',td2:'content',td3:'content',td4:'content'},
                                            {id:4,td1:'content',td2:'content',td3:'content',td4:'content'},
                                            {id:5,td1:'content',td2:'content',td3:'content',td4:'content'}
                                        ].map((row) => (
                                            <TableRow>
                                                <TableCell className={classesMain.Text}>{row.td1}</TableCell>
                                                <TableCell className={classesMain.Text}>{row.td2}</TableCell>
                                                <TableCell className={classesMain.Text}>{row.td3}</TableCell>
                                                <TableCell className={classesMain.Text}>{row.td4}</TableCell>
                                            </TableRow>))
                                    }

                                </CustomTable>
                            }>

                        </ItemToolbar>
                        <ItemToolbar
                            caption={'Toggle Button'}
                            element={
                                <table style={{width: '100%'}}>
                                    <tbody>
                                    <tr>
                                        <td className={classesHome.TableMainTd} colSpan="3">
                                            <Typography variant="overline"
                                                        display="block"
                                                        gutterBottom
                                                        style={{fontSize: 16}}
                                                        align={'center'}>
                                                header
                                            </Typography>
                                        </td>
                                    </tr>
                                    {
                                        [{name:'name', td1:'td1',td2:'td2'}, {name:'name 2', td1:'td1',td2:'td2'}, {name:'name 3', td1:'td1',td2:'td2'}].map(couple =>
                                            <tr key={couple.id}>
                                                <td style={{width: 100}}
                                                    className={classesHome.TableMainTd}>
                                                    <Typography variant="overline"
                                                                display="block"
                                                                gutterBottom
                                                                style={{fontSize: 14}}
                                                                align={'center'}>
                                                        {couple.name}
                                                    </Typography>
                                                </td>
                                                <td className={classesHome.TableTd}>
                                                    <Typography variant="overline"
                                                                display="block"
                                                                gutterBottom
                                                                style={{fontSize: 16, color: '#485C90'}}
                                                                align={'center'}>
                                                        {couple.td1}
                                                    </Typography>
                                                </td>
                                                <td className={classesHome.TableTd}>
                                                    <Typography variant="overline"
                                                                display="block"
                                                                gutterBottom
                                                                style={{fontSize: 16, color: '#485C90'}}
                                                                align={'center'}>
                                                        {couple.td2}
                                                    </Typography>
                                                </td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>

                            }>

                        </ItemToolbar>
                        <ItemToolbar
                            caption={'CustomTag'}
                            element={
                                <CustomTag
                                    label={<LightTooltip placement='right' title={'description'}>
                                        <div style={{width: '100%', height: '100%'}}>
                                            <Typography
                                                style={{color: '#fff', textDecoration:'underline'}}>tag</Typography>
                                        </div>
                                    </LightTooltip>}
                                />
                            }>

                        </ItemToolbar>
                        <ItemToolbar
                            caption={'CustomTagDeletable'}
                            element={
                                <CustomTag
                                    onDelete={()=>console.log('')}
                                    label={<LightTooltip placement='right' title={'description'}>
                                        <div style={{width: '100%', height: '100%'}}>
                                            <Typography
                                                style={{color: '#fff', textDecoration:'underline'}}>tagDeletable</Typography>
                                        </div>
                                    </LightTooltip>}
                                />
                            }>

                        </ItemToolbar>
                        <ItemToolbar
                            caption={'CustomTagEditable'}
                            element={
                                <CustomTag
                                    onDelete={()=>console.log('')}
                                    label={<LightTooltip placement='right' title={'description'}>
                                        <div style={{width: '100%', height: '100%', display:'flex', justifyContent:'space-between', cursor:'pointer'}}>
                                            <Typography
                                                style={{cursor:'help', color: '#fff', textDecoration:'underline'}}>  EditableTag </Typography>

                                            <EditIcon style={{transform:'scale(0.6)', opacity:'0.5'}}/>

                                        </div>
                                    </LightTooltip>
                                    }
                                />
                            }>

                        </ItemToolbar>
                        <ItemToolbar
                            caption={'HistoryBackButton'}
                            element={
                                <HistoryBackButton/>

                            }>

                        </ItemToolbar>
                        <ItemToolbar
                            caption={'HistoryBackButton'}
                            element={
                                <AddIcon
                                    className={classesMain.button}
                                />

                            }>

                        </ItemToolbar>
                        <ItemToolbar
                            caption={'HistoryBackButton'}
                            element={
                                <Pagination
                                    page={page}
                                    boundaryCount={2}
                                    style={{width: '100%'}}
                                    count={3}
                                    onChange={handleChangePagination}
                                    variant="outlined"
                                    shape="rounded"
                                    showFirstButton
                                    showLastButton/>

                            }>

                        </ItemToolbar>
                        <ItemToolbar
                            caption={'LightTooltip'}
                            element={
                                <LightTooltip placement='right' title={'description'}>
                                   <div style={{width:'50px'}}>
                                      hoverMe
                                   </div>
                                </LightTooltip>

                            }>

                        </ItemToolbar>
                        
                        <ItemToolbar
                            caption={'Image Card'}
                            element={
                                <Card  style={{background:'#5A7DCF'}} className={classesPortfolio.cardMobile}>
                                    <CardActionArea style={{height:'100%'}}>
                                        <div style={{position:'relative'}}>
                                            <DownloadIcon  className={[classesMain.IconForDocument, classesPortfolio.DownloadButton].join(' ')}
                                                           />
                                            <CardMedia
                                                style={{background:'#fff'}}
                                                className={classesPortfolio.CardImage}
                                                component="img"
                                                image={pdf}
                                                alt="IMAGE"
                                            />
                                        </div>


                                        {props.canDelete?
                                            <div 
                                                 className={classesPortfolio.removeAchievement}>
                                                <CloseIcon/>
                                            </div>:''}
                                        <CardContent

                                            className={classesPortfolio.CardContent}>
                                            <Typography style={{overflowWrap:'break-word'}} gutterBottom
                                                        variant="body2" component="div">
                                                Создано: 19 сентября 2022 г. 12:00
                                                <br/>
                                                Обновлено: 19 сентября 2022 г. 12:00

                                            </Typography>
                                            <Typography style={{overflowWrap:'break-word'}} gutterBottom
                                                        variant="h5" component="div">
                                                Title
                                            </Typography>
                                            <Typography  style={{overflowWrap:'break-word'}}
                                                         variant="body2" >
                                                Description
                                            </Typography>
                                        </CardContent>
                                    </CardActionArea>
                                </Card>

                            }>

                        </ItemToolbar>
                        <ItemToolbar
                            caption={'Default Card'}
                            element={
                                <Card className={classesMain.card}>
                                    <CardContent className={classesMain.cardContent}
                                                 style={{height: 200}}>

                                        <div className={classesMain.cardFirstLine}>
                                            <Typography style={{fontSize: 15}}
                                                        className={classesDocumentsStyles.captionText}
                                                        variant="overline">
                                                title
                                            </Typography>

                                            <Tooltip title="description">
                                                <Chip style={{
                                                    background: '#74af27',
                                                    color: '#fff'
                                                }} label={'label'}/>
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

                                                    <Grid item>
                                                        <Typography display="block" className={classesDocumentsStyles.captionText}
                                                                    gutterBottom>
                                                            Создано: 19 сентября 2022 г. 12:00
                                                        </Typography>
                                                    </Grid>
                                                    <Grid item>
                                                        <Typography display="block" className={classesDocumentsStyles.captionText}
                                                                    gutterBottom>
                                                            Обновлено: 19 сентября 2022 г. 12:00
                                                        </Typography>
                                                    </Grid>

                                                   
                                                </Grid>
                                            </Grid>


                                        </Grid>
                                    </CardContent>
                                    <CardActions className={classesMain.blueBackgroud}>
                                        <Stack direction={'row'} spacing={2} style={{width: '100%'}}>
                                                <Button style={{width: '100%'}} className={classesMain.TextWhite}>
                                                    button
                                                </Button>
                                            
                                        </Stack>
                                    </CardActions>

                                </Card>

                            }>

                        </ItemToolbar>

                        <ItemToolbar
                            caption={'Accordion'}
                            element={
                                <Accordion sx={{border: '1px solid #fff !important'}} >
                                    <AccordionSummary>
                                        <Typography className={classesMain.TextWhite}>
                                            Title
                                        </Typography>
                                    </AccordionSummary>
                                    <AccordionDetails sx={{background: '#fff !important', border: '1px solid #485C90 !important'}}>
                                        <Stack spacing={1}>
                                            Content
                                        </Stack>
                                    </AccordionDetails>
                                </Accordion>

                            }>

                        </ItemToolbar>
                        <ItemToolbar
                            caption={'Toggle Button'}
                            element={
                                <ToggleButtonGroup
                                    style={{width: '100%'}}
                                    value={toggleButton}
                                    exclusive
                                    onChange={(event, newValue) => setToggleButton(newValue)}
                                >
                                    {
                                        [{id:1,name:'name 1'}, {id:2,name:'name 2'}].map(item =>
                                            <ToggleButton
                                                className={`${classesMain.toggleButton}`}
                                                value={item.id}>
                                                {item.name}
                                            </ToggleButton>
                                        )
                                    }
                                </ToggleButtonGroup>

                            }>

                        </ItemToolbar>




                    </Grid>
                </Box>
            </Grid>
        </>
    );
}

export default Toolbar;