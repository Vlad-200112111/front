import {Grid} from "@mui/material";
import CustomInput from "../../UI/CustomInput/CustomInput";
import {Box, Button, Typography} from "@material-ui/core";
import useStylesMain from "../../../Styles/MainStyles";
import api from "../../../Services/api";
import {useEffect, useState} from "react";
import Cookies from "js-cookie";
import CustomModal from "../../UI/CustomModal/CustomModal";
import CloseIcon from '@mui/icons-material/Close';
import AddIcon from "@mui/icons-material/Add";
import ItemSocialMedia from "./ItemSocialMedia";


const SocialMedias = ()=>{
    const classesMain = useStylesMain()

    const [ico,setIco] = useState('')
    const [modal,setModal] = useState(false)
    const [name, setName] = useState('')
    const token = Cookies.get("auth-token");
    const [socialMedias, setSocialMedias] = useState([{}])

    useEffect(async ()=>{
        const {data:SocialMedias} = await api.profile.GetSocialMedias()
        setSocialMedias(SocialMedias)
    },[])

    const onloadImage = async(event)=> {
        if (event.target.files && event.target.files[0]) {
            const reader = new FileReader();

            reader.onload =async function (e) {

                setIco(e.target.result)
            }
            reader.readAsDataURL(event.target.files[0]);
            console.log(reader.readAsDataURL(event.target.files[0]))
        }
    }

    const addSocialMedia = async () =>{
        const obj = {name: name, icon:ico,token:token}
        await api.profile.PostSocialMedia(obj).then(async()=>{
            const {data:SocialMedias} = await api.profile.GetSocialMedias()
            setSocialMedias(SocialMedias)
            setName('')
            setIco('')
            setModal(false)
        })
    }

    return(
        <Grid container
              alignItems='center'
              justifyContent='space-between'
              direction='column'
        >
            <CustomModal
                open={modal}
                handleClose={()=>setModal(false)}
                button='Добавить'
                buttonClick={addSocialMedia}
            >

                    <Box
                        style={{maxWidth:'64px',maxHeight:'64px'}}
                        component="img"
                        alt='social-ico'
                        src={ico.length>0?ico:require('../../../Assets/Image/social-medias/default-ico.png')}
                    />
                {ico?
                    <CloseIcon
                        onClick={() => setIco('')}
                        className={classesMain.Text}
                        style={{cursor: "pointer"}}/>
                    : ''}
                    <CustomInput
                        label='Название соц.сети'
                        customValueInput={name}
                        setCustomValueInput={(event)=>setName(event.target.value)}
                    />

                    <label  htmlFor="uploadPhoto">
                        <Button
                            className={[classesMain.button].join(' ')}
                            variant="contained"
                            component="label">
                            Загрузить иконку
                            <input
                                type="file"
                                hidden
                                id="updatePhoto"
                                accept="image/*"
                                name="updatePhoto"
                                onChange={onloadImage}
                            />

                        </Button>
                    </label>

            </CustomModal>
            <Grid container spacing={3}>
                <Grid style={{display: 'flex', flexDirection: 'column'}} item xs={12}>
                    <Typography
                        className={classesMain.Title}
                        variant="h1"
                    >
                        Доступные социальные сети
                    </Typography>
                </Grid>
            </Grid>

            <Grid  container alignItems='center' justifyContent='center'>

                <Grid
                    flexWrap={'wrap'}
                    container
                    flexDirection='row'
                    alignItems='center'
                    justifyContent='center'
                    spacing={3}>
                    {
                        socialMedias.map(item=>
                            <ItemSocialMedia
                                key={item.id+'socialmedias'}
                                item={item}
                                items={socialMedias}
                                setItems={setSocialMedias}
                            />
                        )
                    }
                    <Grid item>
                        <AddIcon
                            onClick={() => setModal(true)}
                            className={classesMain.button}
                        />
                    </Grid>

                </Grid>
            </Grid>

        </Grid>
    )
}
export default SocialMedias