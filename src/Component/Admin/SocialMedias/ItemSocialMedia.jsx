import {Grid} from "@mui/material";
import {Box, Typography} from "@material-ui/core";
import CloseIcon from "@mui/icons-material/Close";
import useStylesMain from "../../../Styles/MainStyles";
import api from "../../../Services/api"
import {useState} from "react";
const ItemSocialMedia = (props) =>{
    const classesMain = useStylesMain()

    const [showClose, setShowClose] = useState(false)

    const removeItem = async (event) => {
        // eslint-disable-next-line no-restricted-globals
        const conf = confirm(`Действительно ли Вы хотите удалить проект?`);
        if (conf) {
            props.setItems(props.items.filter(el => el.id != event.id))
            const {data:respose} = await api.profile.DeleteSocialMedia(props.item.id)
        }
    }

    return(
        <Grid onMouseEnter={()=>setShowClose(true)}
              onMouseLeave={()=>setShowClose(false)}
              xs={2}
              item
              flexDirection='row'
              flexWrap='nowrap'
              justifyContent='center'
        >
            <Grid item style={{display:'flex', justifyContent:'flex-end', flexDirection:'column', alignItems:'center'}}>
                <Box
                    style={{width:'64px',height:'64px'}}
                    component="img"
                    alt='social-ico'
                    src={props.item.icon}
                />
                <div style={{
                    maxWidth:!showClose?'70px':'unset',
                    overflow:!showClose?'hidden':'unset',
                    textOverflow:!showClose?'ellipsis':'unset'
                }}>
                    {props.item.name}
                </div>
            </Grid>
            <Grid style={{opacity: !showClose?'0':'1', transition:'all 0.3s ease'}}  className={classesMain.Text} item>
                <CloseIcon onClick={()=>removeItem(props.item)} style={{cursor:"pointer"}}/>
            </Grid>
        </Grid>
    )
}
export default ItemSocialMedia