import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {Grid, Typography} from "@material-ui/core";
import Divider from "@mui/material/Divider";
import React, {useState} from "react";
import EditIcon from '@mui/icons-material/Edit';
import CancelIcon from "@mui/icons-material/Cancel";
import DeleteIcon from '@mui/icons-material/Delete';
import useStylesMain from "../../../Styles/MainStyles";
import DoneIcon from '@mui/icons-material/Done';
import CustomInput from "../../UI/CustomInput/CustomInput";
import CustomTextarea from "../../UI/CustomTextarea/CustomTextarea";
import Cookies from "js-cookie";
import CustomDialog from "../../UI/CustomDialog/CustomDialog";
import {useSnackbar} from "notistack";
import ValidLink from "../../Modules/Functions/RegExps/ValidLink";
import LightTooltip from "../../UI/LightTooltip/LightTooltip";
import CustomIconButton from "../../UI/CustomIconButton/CustomIconButton";
import {styled} from "@mui/material/styles";
import MuiAccordion from "@mui/material/Accordion";
import MuiAccordionSummary from "@mui/material/AccordionSummary";
import ArrowForwardIosSharpIcon from "@mui/icons-material/ArrowForwardIosSharp";
import MuiAccordionDetails from "@mui/material/AccordionDetails";

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


const ItemProfile = ({item, items, setItems,remove,edit,canCreate,canRead,canUpdate,canDelete}) =>{
    const classesMain = useStylesMain()
    const [expanded, setExpanded] = useState(false);
    const [showEdit, setShowEdit] = useState(false)
    const [name,setName] = useState(item.name)
    const [description, setDescription] = useState(item.description)
    const [link, setLink] = useState(item.link)
    const token = Cookies.get("auth-token");
    const [handleDialog, setHandleDialog] = useState(false)
    const [titleDialog,setTitleDialog] = useState(false)
    const [dialogMethod,setDialogMethod] = useState('')
    const [dialogItem,setDialogItem] = useState('')
    const [dialogContent,setDialogContent] = useState('')
    const { enqueueSnackbar } = useSnackbar();

    const handleChangeAccordion = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };

    const removeItem = async () => {
            setItems(items.filter(el => el.id !== item.id))
            remove(item)
    }

    const showEditMode = () =>{
        setShowEdit(!showEdit)
        setName(item.name)
        setDescription(item.description)
        setLink(item.link)
    }

    const confirmedDialog = ()=>{
        if(dialogMethod === 'del'){
            removeItem(dialogItem)
        }else if(dialogMethod === 'edit'){
            if(ValidLink(link)) {
                editItem()

            }else{
                enqueueSnackbar('Неккоректная ссылка в поле "Ссылка"', {variant:'error'})

            }
        }
    }

    const editItem = async ()=>{
        if(ValidLink(link)){
            item.name = name
            item.description = description
            item.link = link
            const object = {name:name,description:description,link:link,image:'',token:token}
            edit(object, item.id)
            setName('')
            setDescription('')
            setLink('')
            setShowEdit(false)
        }
        else{
            enqueueSnackbar('Неккоректная ссылка в поле "Ссылка"', {variant:'error'})
        }


    }
    const checkLink = ()=>{
        if(!ValidLink(link)) enqueueSnackbar('Неккоректная ссылка в поле "Ссылка"', {variant:'error'})
    }

    return(
        <>
            <CustomDialog
                title={titleDialog}
                content={dialogContent}
                open={handleDialog}
                setOpen={setHandleDialog}
                onConfirm={confirmedDialog}
            />
        <Accordion
            style={{width: '100%'}}
            sx={{mt: 2}}
            expanded={expanded === `panel${item.id}`}
            onChange={handleChangeAccordion(`panel${item.id}`)}>
            <AccordionSummary
                expandIcon={<ExpandMoreIcon sx={{color: '#fff'}}/>}
                aria-controls="panel1bh-content"
                id="panel1bh-header"
            >
                {!showEdit?
                    <Typography
                        style={{
                            color: '#fff',
                            marginRight: '10px'
                        }}
                        sx={{
                            width: '33%',
                            flexShrink: 0
                        }}
                    >
                        {item.name}
                    </Typography>
                    :
                    ''
                }

            </AccordionSummary>
            <Divider/>
            <AccordionDetails sx={{background: '#fff !important', border: '1px solid #485C90 !important'}}>
                {
                    showEdit?
                        [
                            <CustomInput
                                key={'customInputItemProfile'}
                                label="Название"
                                customValueInput={name}
                                setCustomValueInput={(event)=>{
                                    setName(event.target.value)

                                }}
                            />,
                            <CustomTextarea
                                key={'customTextareaItemProfile'}
                                label='Описание'
                                valueCustomTextarea={description}
                                setValueCustomTextarea={(event)=>{
                                    setDescription(event.target.value)

                                }}
                            />,
                            <CustomInput
                                onBlur={checkLink}
                                key={'customInput2ItemProfile'}
                                label="Ссылка"
                                customValueInput={link}
                                setCustomValueInput={(event)=>{
                                    setLink(event.target.value)

                                }}
                            />,
                            <>
                                <CustomIconButton
                                    icon={<DoneIcon/>}
                                    inputFunction={() => {
                                        setTitleDialog('Изменение общей информации')
                                        setDialogContent('Вы действительно хотите сохранить изменения?')
                                        setDialogMethod('edit')
                                        setHandleDialog(true)
                                    }}
                                    caption={'Нажмите для того, чтобы сохранить!'}
                                />
                                <CustomIconButton
                                    icon={<CancelIcon/>}
                                    inputFunction={()=> setShowEdit(!showEdit)}
                                    caption={'Нажмите для того, чтобы отменить редактирование!'}
                                />

                                
                            </>
                        ]
                        :
                            <Grid
                                container
                                direction="row"
                                justifyContent="flex-start"
                                alignItems="center"
                            >
                                <Grid item xs={11}>
                                    <Typography
                                        style={{textAlign:'left'}}
                                        className={classesMain.Text}

                                    >
                                        Ссылка: <a target='_blank' className={classesMain.Text} href={item.link ? !item.link.includes('http') || !item.link.includes('https') ? 'http://'+item.link: item.link : ''}> {item.link} </a>

                                    </Typography>
                                    <Typography
                                        style={{textAlign:'left'}}

                                        className={classesMain.Text}

                                    >
                                        Описание: {item.description}
                                    </Typography>

                                </Grid>
                                    {!showEdit?
                                <Grid item xs={0.5}>
                                        <div style={{display:'flex', flexDirection:'column-reverse'}}>
                                            {
                                                canDelete?
                                                    <CustomIconButton
                                                        icon={<DeleteIcon/>}
                                                        inputFunction={()=>{
                                                            setTitleDialog('Удаление')
                                                            setDialogContent('Вы действительно хотите удалить проект?')
                                                            setDialogMethod('del')
                                                            setHandleDialog(true)
                                                        }}
                                                        caption={'Нажмите для того, чтобы удалить!'}
                                                    />

                                                    :''
                                            }
                                            {
                                                canUpdate?
                                                    <CustomIconButton
                                                        icon={<EditIcon/>}
                                                        inputFunction={showEditMode}
                                                        caption={'Нажмите для того, чтобы редактировать!'}
                                                    />

                                                    :''
                                            }

                                        </div>


                                </Grid>
                                        :
                                        ''
                                    }
                            </Grid>
                }


            </AccordionDetails>
        </Accordion>
        </>

    )
}
export default ItemProfile

