import CustomInput from "../../../../UI/CustomInput/CustomInput";
import CustomSelect from "../../../../UI/CustomSelect/CustomSelect";
import {Grid, MenuItem} from "@material-ui/core";
import {Button} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import CustomButton from "../../../../UI/CustomButton/CustomButton";
import useStylesMain from "../../../../../Styles/MainStyles";
import {useEffect, useState} from "react";
import Cookies from "js-cookie";
import api from "../../../../../Services/api";

const FormCreatePost = ({createPosts}) => {
    const classesMain = useStylesMain();

    const [listCategoriesForPost, setListCategoriesForPost] = useState([])
    const [listSubCategoriesForPost, setListSubCategoriesForPost] = useState([])
    const [categoryId, setCategoryId] = useState('')
    const [subCategoryId, setSubCategoryId] = useState('')
    const [category, setCategory] = useState('')
    const [subCategory, setSubCategory] = useState('')
    const [disabled, setDisabled] = useState(true)
    const [disabledButton, setDisabledButton] = useState(true)
    const [namePost, setNamePost] = useState('')
    const [openInputAddCategory, setOpenInputAddCategory] = useState(false)
    const [openInputAddSubCategory, setOpenInputAddSubCategory] = useState(false)
    const [openTiny, setOpenTiny] = useState(true)
    const [activeAlert, setActiveAlert] = useState(false)
    const [severity, setSeverity] = useState('')
    const [titleForAlert, setTitleForAlert] = useState('')
    const [contentForAlert, setContentForAlert] = useState('')
    const [postId, setPostId] = useState('')

    const token = Cookies.get("auth-token");


    async function getCategoriesForPost() {
        const {data: ListCategoriesForPost} = await api.wiki.getCategoriesForPosts();
        setListCategoriesForPost(ListCategoriesForPost)
    }


    useEffect(() => {
        getCategoriesForPost()
    }, []);

    async function getSubCategories(event) {
        setCategoryId(event.target.value)
        const {data: ListSubCategory} = await api.wiki.getSubCategoriesForPosts(event.target.value)
        if (ListSubCategory.length != 0) {
            setListSubCategoriesForPost(ListSubCategory)
            setDisabledButton(false)
            setDisabled(false)
        } else {
            setListSubCategoriesForPost([])
            setDisabledButton(true)
            setDisabled(true)
        }
    }

    async function addCategory() {
        const objectForAddCategory = new Object()
        objectForAddCategory.name = category
        objectForAddCategory.token = token

        const {data: answer} = await api.wiki.addCategoriesForPost(objectForAddCategory)
        setCategory('')
        setOpenInputAddCategory(false)
        getCategoriesForPost()
    }

    async function addSubCategory() {
        const objectForAddSubCategory = new Object()
        objectForAddSubCategory.name = subCategory
        objectForAddSubCategory.token = token
        objectForAddSubCategory.categories = categoryId

        const {data: answer} = await api.wiki.addSubCategoriesForPost(objectForAddSubCategory)
        const {data: ListSubCategory} = await api.wiki.getSubCategoriesForPosts(categoryId)
        setListSubCategoriesForPost(ListSubCategory)
        setSubCategory('')
        setOpenInputAddSubCategory(false)
        setDisabled(false)
    }

    function openAddSubCategory() {
        setOpenInputAddSubCategory(true)
    }

    function openAddCategory() {
        setOpenInputAddCategory(true)
    }

    function closeAddSubCategory() {
        setOpenInputAddSubCategory(false)
    }

    function closeAddCategory() {
        setOpenInputAddCategory(false)
    }

    return (
        <div>
            <form onSubmit={createPosts}>
                <Grid container
                      direction="column"
                      justifyContent="center"
                      alignItems="flex-start"
                      spacing={5}>
                    <CustomInput
                        required={true}
                        xs={8}
                        title='Название'
                        name='name'
                        label='Название'
                        customValueInput={namePost}
                        setCustomValueInput={event => setNamePost(event.target.value)}
                    />

                    {/*/////////////////////////////////////////////////////////////////////////////*/}

                    <CustomSelect required={true} xs={8} nameCustomSelect="categories"
                                  contentCustomSelect="Категория"
                                  valueSelect={categoryId}
                                  setValueSelect={getSubCategories}>
                        {
                            listCategoriesForPost.map(item =>
                                <MenuItem className={classesMain.SelectItems}
                                          value={item.id}>{item.name}</MenuItem>
                            )
                        }
                    </CustomSelect>

                    {openInputAddCategory === true ?
                        <Grid container
                              direction="row"
                              justifyContent="flex-start"
                              alignItems="center"
                              spacing={3}
                              style={{marginLeft: 10}}>
                            <CustomInput
                                xs={6}
                                title='Добавить категорию'
                                name='category'
                                label='Добавить категорию'
                                customValueInput={category}
                                setCustomValueInput={event => setCategory(event.target.value)}
                            />
                            <Grid item xs={2}>
                                <Button
                                    variant="contained"
                                    className={classesMain.button}
                                    onClick={addCategory}
                                >
                                    Добавить
                                </Button>
                            </Grid>
                        </Grid> : ''

                    }
                    <Grid item xs={12}>
                        {
                            openInputAddCategory === false ?
                                <Button
                                    variant="contained"
                                    className={classesMain.button}
                                    startIcon={<AddIcon/>}
                                    onClick={openAddCategory}
                                >
                                    Добавить категорию
                                </Button> :
                                <Button
                                    variant="contained"
                                    className={classesMain.button}
                                    startIcon={<HighlightOffIcon/>}
                                    onClick={closeAddCategory}
                                >
                                    Отменить
                                </Button>
                        }
                    </Grid>

                    {/*/////////////////////////////////////////////////////////////////////////////*/}

                    <CustomSelect required={true} xs={8} nameCustomSelect="subCategories"
                                  contentCustomSelect="Подкатегория"
                                  disabled={disabled}
                                  valueSelect={subCategoryId}
                                  setValueSelect={event => setSubCategoryId(event.target.value)}>
                        {
                            listSubCategoriesForPost.map(item =>
                                <MenuItem className={classesMain.SelectItems}
                                          value={item.id}>{item.name}</MenuItem>
                            )
                        }
                    </CustomSelect>

                    {openInputAddSubCategory === true ?
                        <Grid container
                              direction="row"
                              justifyContent="flex-start"
                              alignItems="center"
                              spacing={3}
                              style={{marginLeft: 10}}>
                            <CustomInput
                                xs={6}
                                title='Добавить подкатегорию'
                                name='subCategory'
                                label='Добавить подкатегорию'
                                customValueInput={subCategory}
                                setCustomValueInput={event => setSubCategory(event.target.value)}
                            />
                            <Grid item xs={2}>
                                <Button
                                    variant="contained"
                                    className={classesMain.button}
                                    onClick={addSubCategory}
                                >
                                    Добавить
                                </Button>
                            </Grid>
                        </Grid>
                        : ''
                    }
                    <Grid item xs={12}>
                        {
                            openInputAddSubCategory === false ?
                                <Button
                                    variant="contained"
                                    className={classesMain.button}
                                    startIcon={<AddIcon/>}
                                    onClick={openAddSubCategory}
                                >
                                    Добавить подкатегорию
                                </Button> :
                                <Button
                                    variant="contained"
                                    className={classesMain.button}
                                    startIcon={<HighlightOffIcon/>}
                                    onClick={closeAddSubCategory}
                                >
                                    Отменить
                                </Button>
                        }
                    </Grid>

                    {/*/////////////////////////////////////////////////////////////////////////////*/}
                    <Grid item>
                        <Button
                            type={'submit'}
                            variant="contained"
                            size="medium"
                            disabled={disabledButton}
                            className={classesMain.button}>
                            Создать
                        </Button>
                    </Grid>
                </Grid>
            </form>
        </div>


    )
}
export default FormCreatePost;