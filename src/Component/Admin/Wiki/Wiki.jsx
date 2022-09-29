import {useState, useEffect} from "react";
import api from "./../../../Services/api";
import useStylesMain from "../../../Styles/MainStyles";
import MainWiki from "../../Modules/MainWiki/MainWiki";
import {Grid} from "@mui/material";
import Typography from "@mui/material/Typography";
import FormForPost from "./FormForPost";
import Box from "@mui/material/Box";
import CustomAlert from "../../UI/CustomAlert/CustomAlert";
import React from "react";


function Wiki() {
    const classesMain = useStylesMain()
    const [allPost, setAllPost] = useState([])
    const [allPostById, setAllPostById] = useState([])

    useEffect(async () => {
        const {data: AllPost} = await api.wiki.getPosts()
        setAllPost(AllPost)

        const {data: AllPostById} = await api.wiki.getPostsByUserId()
        setAllPostById(AllPostById)
    }, []);

    return (
        <MainWiki>
            <CustomAlert
                severity="info"
                title='Информация!'
                content='Сервис "Справочная информация" находится в стадии разработки!'
                activeAlert={true}
            />
            <Box sx={{width: '100%'}}>
                <Grid container
                      direction="row"
                      justifyContent="center"
                      alignItems="flex-start"
                      spacing={4}>
                    <Grid item xs={12} sx={{width: '100%'}}>
                        {/*<Typography align='center' variant="h5" sx={{mb: 3}} className={classesMain.Text}>*/}
                        {/*    Все посты*/}
                        {/*</Typography>*/}
                        <Grid container
                              direction="column"
                              justifyContent="center"
                              alignItems="center"
                              spacing={1}>
                            {
                                allPost?.map(itemPost =>
                                    <Grid item sx={{width: '100%'}} xs={12}>
                                        <FormForPost
                                            setAllPostById={setAllPostById}
                                            setAllPost={setAllPost}
                                            byIdUser={false}
                                            creator={itemPost.creator}
                                            idPost={itemPost.id}
                                            namePost={itemPost.name}
                                            subCategoriesName={itemPost.subCategories.name}
                                            subCategoriesId={itemPost.subCategories.id}/>
                                    </Grid>
                                )
                            }
                        </Grid>
                    </Grid>
                    {/*<Grid item xs={6}>*/}
                    {/*    <Typography align='center' variant="h5" sx={{mb: 3}} className={classesMain.Text}>*/}
                    {/*        Мои посты*/}
                    {/*    </Typography>*/}
                    {/*    <Grid container*/}
                    {/*          direction="column"*/}
                    {/*          justifyContent="center"*/}
                    {/*          alignItems="center"*/}
                    {/*          spacing={1}>*/}
                    {/*        {*/}
                    {/*            allPostById?.map(itemPost =>*/}
                    {/*                <Grid item sx={{width: '100%'}} xs={12}>*/}
                    {/*                    <FormForPost*/}
                    {/*                        setAllPostById={setAllPostById}*/}
                    {/*                        setAllPost={setAllPost}*/}
                    {/*                        byIdUser={true}*/}
                    {/*                        creator={itemPost.creator}*/}
                    {/*                        idPost={itemPost.id}*/}
                    {/*                        namePost={itemPost.name}*/}
                    {/*                        subCategoriesName={itemPost.subCategories.name}*/}
                    {/*                        subCategoriesId={itemPost.subCategories.id}/>*/}
                    {/*                </Grid>*/}
                    {/*            )*/}
                    {/*        }*/}
                    {/*    </Grid>*/}
                    {/*</Grid>*/}
                </Grid>
            </Box>

        </MainWiki>
    );
}

export default Wiki;
