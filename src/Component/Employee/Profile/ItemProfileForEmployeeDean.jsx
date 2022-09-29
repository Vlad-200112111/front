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
import CustomAutocomplete from "../../UI/CustomAutocomplete/CustomAutocomplete";
import Cookies from "js-cookie";
import CustomDialog from "../../UI/CustomDialog/CustomDialog";
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

const ItemProfileForEmployeeDean = ({
                                        item,
                                        items,
                                        setItems,
                                        updateTypes,
                                        remove,
                                        edit,
                                        publicationsTypes,
                                        publicationType,
                                        canUpdate,
                                        canDelete}) =>{
    const classesMain = useStylesMain()

    const [expanded, setExpanded] = useState(false)
    const [showEdit, setShowEdit] = useState(false)
    const [name,setName] = useState(item.name)
    const [type, setType] = useState(item.type)
    const [place, setPlace] = useState(item.place)
    const [chosenType,setChosenType] = useState(publicationsTypes.filter(el=>el.id === item.publicationTypeId)[0])
    const [pagesCount, setPagesCount] = useState(item.pagesCount)
    const token = Cookies.get("auth-token");
    const [handleDialog, setHandleDialog] = useState(false)
    const [dialogContent, setDialogContent] = useState(false)
    const [dialogMethod, setDialogMethod] = useState(false)
    const [dialogItem, setDialogItem] = useState(false)
    const [dialogTitle, setDialogTitle] = useState(false)

    const handleChangeAccordion = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    }

    const removeItem = async (event) => {
            setItems(items.filter(el => el.id != event.id))
            remove(item)
    }

    const showEditMode = () =>{
        setShowEdit(!showEdit)
        setName(item.name)
        setType(item.type)
        setPlace(item.place)
        setPagesCount(item.pagesCount)
    }

    const confirmDialog = (content,title,method,item)=>{
        setDialogContent(content)
        setDialogTitle(title)
        setDialogMethod(method)
        setDialogItem(item)
        setHandleDialog(true)
    }

    const confirmedDialog = ()=>{
        if(dialogMethod === 'del'){
            removeItem(dialogItem)
        }else if(dialogMethod === 'edit'){
            editItem()
        }
    }

    const editItem = async ()=>{
            item.name = name
            item.publicationTypeId = publicationsTypes.filter(el=>el.name===chosenType.name)[0].id
            item.typeName = chosenType.name
            item.place = place
            item.volume=pagesCount
            const object = {name:name,PublicationTypeId:publicationsTypes.filter(el=>el.name===chosenType.name)[0].id,place:place,volume:pagesCount,token:token}
            edit(object, item.id)
            setName('')
            setType('')
            setPlace('')
            setPagesCount('')
            setShowEdit(false)
    }



    return(
        <>
            <CustomDialog
                title={dialogTitle}
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

                                label={'Название'}
                                customValueInput={name}
                                setCustomValueInput={(event)=>{
                                    setName(event.target.value)

                                }}
                            />,
                            <CustomAutocomplete
                                key={'customAutocompleteItemProfile'}
                                value={chosenType}
                                options={publicationsTypes}
                                getOptionLabel={(option)=>option.name}
                                label='Тип публикации'
                                onChange={(e,value)=>setChosenType(value)}
                                style={{width:'100%'}}
                            />,
                            <CustomInput
                                key={'customInput2ItemProfile'}

                                label={`Выходные данные `}
                                customValueInput={place}
                                setCustomValueInput={(event)=>{
                                    setPlace(event.target.value)
                                }}
                            />,
                            <CustomInput
                                key={'customInput3ItemProfile'}
                                label={'Количество авторских листов'}
                                customValueInput={pagesCount}
                                setCustomValueInput={(event)=>{
                                    setPagesCount(event.target.value)
                                }}
                            />,
                             <>
                                <CustomIconButton
                                    icon={<DoneIcon/>}
                                    inputFunction={()=> {confirmDialog('Вы действительно хотите сохранить изменения??','Изменение общей информации','edit')
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
                                        Тип публикации: <a style={{textAlign:'left'}} className={classesMain.Text}> {item.typeName} </a>

                                    </Typography>
                                    <Typography
                                        style={{textAlign:'left'}}
                                        className={classesMain.Text}

                                    >
                                        Выходные данные: {item.place}
                                    </Typography>
                                    <Typography
                                        style={{textAlign:'left'}}
                                        className={classesMain.Text}

                                    >
                                        Количество авторских листов: {item.volume}
                                    </Typography>

                                </Grid>
                                {
                                    !showEdit?
                                        <Grid item xs={0.5}>
                                            <>
                                                <div style={{display:'flex', flexDirection:'column-reverse'}}>

                                                    {canDelete?
                                                        <CustomIconButton
                                                            icon={<DeleteIcon/>}
                                                            inputFunction={() => confirmDialog('Вы действительно хотите удалить публикацию?','Удаление','del',item)}
                                                            caption={'Нажмите для того, чтобы удалить!'}
                                                        />

                                                        :''}
                                                    {canUpdate?
                                                        <CustomIconButton
                                                            icon={<EditIcon/>}
                                                            inputFunction={showEditMode}
                                                            caption={'Нажмите для того, чтобы редактировать!'}
                                                        />

                                                        :''}
                                                </div>

                                            </>
                                        </Grid>:''
                                }
                            </Grid>
                }


            </AccordionDetails>
        </Accordion>
            </>
    )
}
export default ItemProfileForEmployeeDean

