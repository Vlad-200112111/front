import Box from "@mui/material/Box";
import {Grid} from "@mui/material";
import Typography from "@mui/material/Typography";
import useStylesMain from "../../../Styles/MainStyles";
import {Link} from "react-router-dom";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import PreviewIcon from '@mui/icons-material/Preview';
import api from '../../../Services/api'
import CustomIconButton from "../../UI/CustomIconButton/CustomIconButton";

const FormForPost = (props) => {
    const classesMain = useStylesMain()

    async function deletePost() {
        await api.wiki.deletePost(props.idPost)
        const {data: AllPostById} = await api.wiki.getPostsByUserId()
        props.setAllPostById(AllPostById)
        const {data: AllPost} = await api.wiki.getPosts()
        props.setAllPost(AllPost)
    }


    return (
        <>
            <Box sx={{width: '100%'}} className={classesMain.MainBox}>
                <Grid container
                      direction="row"
                      justifyContent="space-between"
                      alignItems="center"
                      xs={12}
                      spacing={2}
                      sx={{width: '100%'}}>
                    <Grid item xs={11}>
                        <Typography variant="subtitle1" sx={{color: '#fff'}}>
                            Название: {props.namePost}
                        </Typography>
                        <Typography variant="subtitle1" sx={{color: '#fff'}}>
                            Подкатегория: {props.subCategoriesName}
                        </Typography>
                    </Grid>
                    <Grid item xs={1}>
                        <Grid
                            container
                            direction="column"
                            justifyContent="center"
                            alignItems="center"
                            spacing={0.5}
                        >
                            {
                                props.byIdUser === true ?
                                    <>
                                        <Grid item>
                                            <Link to={`/wiki/edit-post/${props.idPost}`}
                                                  style={{textDecoration: 'none', color: '#fff'}}>
                                                <CustomIconButton
                                                    icon={<EditIcon/>}
                                                    caption={'Нажмите для того, чтобы редактировать!'}
                                                />
                                            </Link>
                                        </Grid>
                                        <Grid item>
                                            <CustomIconButton
                                                icon={<DeleteIcon/>}
                                                caption={'Нажмите для того, чтобы удалить!'}
                                                inputFunction={deletePost}
                                            />
                                        </Grid>
                                        <Grid item>
                                            <Link to={`/wiki/${props.idPost}`}
                                                  style={{textDecoration: 'none', color: '#fff'}}>
                                                <CustomIconButton
                                                    icon={<PreviewIcon/>}
                                                    caption={'Нажмите для того, чтобы просмотреть!'}
                                                />
                                            </Link>
                                        </Grid>
                                    </>
                                    :
                                    <Grid item>
                                        <Link to={`/wiki/${props.idPost}`}
                                              style={{textDecoration: 'none', color: '#fff'}}>
                                            <CustomIconButton
                                                icon={<PreviewIcon/>}
                                                caption={'Нажмите для того, чтобы просмотреть!'}
                                            />
                                        </Link>
                                    </Grid>
                            }
                        </Grid>
                    </Grid>
                </Grid>
            </Box>
        </>
    )
}
export default FormForPost