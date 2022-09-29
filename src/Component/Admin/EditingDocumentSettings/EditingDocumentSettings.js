import React, {useEffect} from 'react';
import useStylesMain from "../../../Styles/MainStyles";
import {Box, Grid, Tab, Typography} from "@mui/material";
import {useState} from "react";
import CustomTab from "../../UI/CustomTab/CustomTab";
import CustomAlert from "../../UI/CustomAlert/CustomAlert";
import AdditingTypicalComment from "./ItemTypicalComment/AdditingTypicalComment";
import api from "../../../Services/api";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import useStylesHome from "../../../Styles/HomeStyles";
import Button from "@mui/material/Button";
import EditTypicalComment from "./ItemTypicalComment/EditTypicalComment";

function EditingDocumentSettings(props) {
    const classesMain = useStylesMain()
    const classesHome = useStylesHome();
    const [listTypicalComment, setListTypicalComment] = useState([])
    const [alignment, setAlignment] = useState('1');


    useEffect(async () => {
        const {data: ListTypicalComment} = await api.documents.getListTypicalComment(alignment)
        setListTypicalComment(ListTypicalComment)
    }, [alignment])

    const [TabList, setTabList] = useState([
        {id: '1', categoryName: 'Типовые комментарии сотрудника'},
    ])


    return (
        <div>
            <Grid maxWidth="xs" className={classesMain.backgroundMain}>
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <Typography className={classesMain.Title} variant="h3">
                            Редактирование сервиса заказа справок
                        </Typography>
                    </Grid>
                </Grid>
                <Box
                    sx={{
                        width: '100%', typography: 'body1'
                    }}>

                    <CustomTab firstTab={"1"}>
                        {
                            TabList.map(item =>
                                <Tab
                                    key={item.id}
                                    className={classesMain.TabsItems}
                                    label={<div className={classesMain.TabItemText}>{item.categoryName}</div>}
                                    value={item.id}/>
                            )
                        }
                        {
                            TabList.map(itemCategories =>
                                <Box style={{margin: 30}}>

                                    <CustomAlert
                                        severity="info"
                                        title='Информация!'
                                        content='Здесь Вы можете создать типовой комментарий для статуса "В обработке" и "Отклонено"'
                                        activeAlert={true}
                                    />

                                    <Box>
                                        <AdditingTypicalComment setListTypicalComment={setListTypicalComment}/>
                                    </Box>

                                    <Box sx={{m: 3}}>
                                        <Box>
                                            <ToggleButtonGroup
                                                style={{width: '100%'}}
                                                value={alignment}
                                                exclusive
                                                onChange={
                                                    (event, newAlignment) => {
                                                        if (newAlignment) {
                                                            setAlignment(newAlignment)
                                                        }
                                                    }
                                                }
                                            >
                                                <ToggleButton
                                                    className={`${classesMain.toggleButton}`}
                                                    value="1">
                                                    Для статуса "В обработке"
                                                </ToggleButton>
                                                <ToggleButton
                                                    className={`${classesMain.toggleButton}`}
                                                    value="2">
                                                    Для статуса "Отклонено"
                                                </ToggleButton>
                                            </ToggleButtonGroup>
                                        </Box>
                                        <Box>
                                            <Box style={{width: '100%', marginTop: 20}}>
                                                <table style={{width: '100%'}}>
                                                    <tbody>
                                                    {
                                                        listTypicalComment?.map(item =>
                                                            <EditTypicalComment
                                                                item={item}
                                                                setListTypicalComment={setListTypicalComment}
                                                                alignment={alignment}/>
                                                        )
                                                    }
                                                    </tbody>
                                                </table>
                                            </Box>
                                        </Box>
                                    </Box>

                                </Box>
                            )
                        }
                    </CustomTab>


                </Box>
            </Grid>
        </div>
    )
}

export default EditingDocumentSettings;