import {Box} from "@material-ui/core";
import CustomInput from "../CustomInput/CustomInput";
import {Grid} from "@mui/material";
import useStylesMain from "../../../Styles/MainStyles";
import {useEffect, useState} from "react";
import CloseIcon from "@mui/icons-material/Close";
import Tooltip from "@mui/material/Tooltip";
import {useSnackbar} from "notistack";
import validLink from "../../Modules/Functions/RegExps/ValidLink";

const CustomSocialMedia = (props, ref) => {
    const [link, setLink] = useState('')
    const [showClose, setShowClose] = useState(false)
    const [validItem, setValidItem] = useState(true)
    const {enqueueSnackbar} = useSnackbar();

    const classesMain = useStylesMain()
    useEffect(() => {
        if (props.save) {
            async function post() {
                if (link?.length) {
                    if (validItem) {

                        const res = await props.post(props.item.id, link)
                    }
                }

            }

            post()
            props.setSave(false)
        }


    }, [props.save])
    useEffect(() => {
        setLink(props.value)
    }, [props.value])

    const removeItem = async (event) => {
        props.setItems(props.items.filter(el => el.id !== event.id))
        props.remove(props.item.id)

    }
    const checkValid = () => {
        if (validLink(link) || link.length === 0) {
            setValidItem(true)

            let obj = {}
            obj[props.item.name] = true
            props.setCanSave({...props.canSave, ...obj})

        } else {
            setValidItem(false)
            let obj = {}
            obj[props.item.name] = false
            props.setCanSave({...props.canSave, ...obj})

            enqueueSnackbar(`Неккоректный URL в ссылке на ${props.item.name}`, {variant: 'error'})
        }
    }


    return (<>

            <Grid
                style={{display: 'flex', alignItems: 'center'}}
                item
                xs={props.xs}
                onMouseEnter={() => props.canRemove ? setShowClose(true) : ''}
                onMouseLeave={() => props.canRemove ? setShowClose(false) : ''}
            >
                <Box
                    style={{width: '32px', height: '32px'}}
                    component="img"
                    alt='social-ico'
                    src={props.item.icon}
                />
                {props.showInput ? <CustomInput
                    onBlur={checkValid}
                    label='Ссылка'
                    customValueInput={link ? link : ''}
                    setCustomValueInput={(event) => setLink(event.target.value)}
                /> : <>
                    <div style={{marginLeft: '10px'}} className={classesMain.Text}>
                        <Tooltip title={props.link ? props.link : ''}>
                            <a target="_blank" rel="noreferrer" className={classesMain.Text}
                               href={props.link ? !props.link.includes('http') || !props.link.includes('https') ? 'http://'+props.link: props.link : ''}>
                                {props.item.name}
                            </a>
                        </Tooltip>
                    </div>
                    {props.canRemove ? <Grid style={{opacity: !showClose ? '0' : '1', transition: 'all 0.3s ease'}}
                                             className={classesMain.Text} item>
                        <CloseIcon onClick={() => removeItem(props.item)} style={{cursor: "pointer"}}/>
                    </Grid> : ''}

                </>}
            </Grid>


        </>)
}
export default CustomSocialMedia