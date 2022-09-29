import React, {useState} from 'react';
import useStylesMain from "../../../Styles/MainStyles";
import {Button, Grid, MenuItem, Typography} from "@material-ui/core";
import CustomInput from "../../UI/CustomInput/CustomInput";
import CustomTextarea from "../../UI/CustomTextarea/CustomTextarea";
import CustomDesktopDatePicker from "../../UI/CustomDesktopDatePicker/CustomDesktopDatePicker";
import CustomSelect from "../../UI/CustomSelect/CustomSelect";
import defaultImage from '../../../Assets/Image/Olympiads/default_olympiad_image.svg'

function CreateOlympiad(props) {
    const classesMain = useStylesMain()

    const formats = [
        {id:1,name:'Очный'},
        {id:2,name:'Заочный'},
        {id:3,name:'Смешанный'}
    ]
    const levels = [
        {id:1,name:'международный'},
        {id:2,name:'федеральный'},
        {id:3,name:'региональный'},
        {id:4,name:'городской'},
        {id:5,name:'окружной'},
        {id:6,name:'районный'},
        {id:7,name:'учрежденческий'}
    ]

    const [chosenFormat,setChosenFormat] = useState(1)
    const [chosenLevel,setChosenLevel] = useState(4)
    const [image,setImage] = useState('')


    const onloadImage = async (event) => {
        if (event.target.files && event.target.files[0]) {
            const reader = new FileReader();

            reader.onload = async function (e) {

                setImage(e.target.result)

            }
            reader.readAsDataURL(event.target.files[0]);
        }
    }


    return (
        <Grid container>
            <Grid item xs={12}>
                <Typography className={classesMain.Title}>
                    Создание олимпиады
                </Typography>
            </Grid>

            <Grid style={{margin:'50px', display:'flex', justifyContent:"space-around"}} container>
                <Grid item xs={12} md={4}>
                    <CustomInput
                        label='Название'
                    />
                    <CustomTextarea
                        label='Описание'
                    />
                    <CustomDesktopDatePicker
                        label='Дата начала'
                    />
                    <CustomDesktopDatePicker
                        label='Дата завершения'
                    />
                    <CustomSelect
                        contentCustomSelect='Формат проведения'
                        valueSelect={chosenFormat}
                        setValueSelect={(e)=> {
                            setChosenFormat(e.target.value)
                        }}
                    >
                        {
                            formats.map(item=>
                                <MenuItem
                                    key={item.id}
                                    value={item.id}
                                >
                                    <Typography style={{color:'#000'}}>{item.name}</Typography>
                                </MenuItem>
                            )
                        }
                    </CustomSelect>
                    {
                        formats.filter(el=>el.id === chosenFormat)[0].name === "Заочный"?
                            <CustomInput
                                label='Ссылка на ресурс'
                            />
                            :
                            formats.filter(el=>el.id === chosenFormat)[0].name === "Очный"?
                                <CustomInput
                                    label='Место проведения'
                                />
                                :
                                formats.filter(el=>el.id === chosenFormat)[0].name === "Смешанный"?
                                    <>
                                        <CustomInput
                                            label='Ссылка на ресурс'
                                        />
                                        <CustomInput
                                            label='Место проведения'
                                        />
                                    </>
                                    :''
                    }
                    <CustomSelect
                        contentCustomSelect='Уровень мероприятия'
                        valueSelect={chosenLevel}
                        setValueSelect={(e)=> {
                            setChosenLevel(e.target.value)
                        }}
                    >
                        {
                            levels.map(item=>
                                <MenuItem
                                    key={item.id}
                                    value={item.id}
                                >
                                    <Typography style={{color:'#000'}}>{item.name}</Typography>
                                </MenuItem>
                            )
                        }
                    </CustomSelect>
                </Grid>
                <Grid style={{display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center'}} item xs={12} md={4}>
                    <img style={{maxHeight:330, maxWidth:'100%' , }} src={image.length>1?image:defaultImage} alt={`olympiad img`}/>
                    <label htmlFor="uploadPhoto" style={{width:'100%'}}>
                        <Button
                            style={{width:'100%'}}
                            className={[classesMain.button].join(' ')}
                            variant="contained"
                            component="label">
                            Загрузить изображение
                            <input
                                type="file"
                                hidden
                                id="uploadPhoto"
                                accept="image/*"
                                name="updatePhoto"
                                onChange={onloadImage}
                            />

                        </Button>
                    </label>

                </Grid>
                <Grid item xs={12} md={10}>
                    <Button className={classesMain.button}>
                        Создать
                    </Button>
                </Grid>
            </Grid>

        </Grid>
    );
}

export default CreateOlympiad;