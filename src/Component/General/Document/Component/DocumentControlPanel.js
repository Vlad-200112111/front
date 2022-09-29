import React, {useEffect, useState} from 'react';
import {Button, Grid, Stack, ToggleButton, ToggleButtonGroup} from "@mui/material";
import CustomButton from "../../../UI/CustomButton/CustomButton";
import CustomSelect from "../../../UI/CustomSelect/CustomSelect";
import {MenuItem, Typography} from "@material-ui/core";
import ClickAwayButton from "../../../UI/СlickAwayButton/ClickAwayButton";
import CustomAutocomplete from "../../../UI/CustomAutocomplete/CustomAutocomplete";
import ViewHeadlineIcon from "@mui/icons-material/ViewHeadline";
import GridViewIcon from "@mui/icons-material/GridView";
import useStylesMain from "../../../../Styles/MainStyles";
import SortIcon from '@mui/icons-material/Sort';
import CustomRadio from "../../../UI/CustomRadio/CustomRadio";
import api from "../../../../Services/api";
import CustomClickAwayListener from "../../../UI/CustomClickAwayListener/CustomClickAwayListener";

function DocumentControlPanel({
                                  page,
                                  archive,
                                  setListDocuments,
                                  role,
                                  type,
                                  itemCategories,
                                  setOpen,
                                  setCountDocument,
                                  countDocument,
                                  countDocumentOnCheck,
                                  setCountDocumentOnCheck,
                                  setPage,
                                  setPageOnCheck,
                                  setShowPagination,
                                  setLoadingDocuments
                              }) {
    const classesMain = useStylesMain();
    const [listTypes, setListTypes] = useState([])
    const [listState, setListState] = useState([])


    const [statusId, setStatusId] = useState()
    const [status, setStatus] = useState('')
    const [typeId, setTypeId] = useState()
    const [typeName, setTypeName] = useState('')
    const [descending, setDescending] = useState()
    const [sortByDate, setSortbyDate] = useState('')
    const [openCustomClickAwayListener, setOpenCustomClickAwayListener] = useState(false);

    useEffect(async () => {
        const {data: ListTypes} = await api.documents.getListTypes()
        setListTypes(ListTypes)
        setTypeName(ListTypes[0].typeName)
        setTypeId(ListTypes[0].id)

        const {data: ListState} = await api.documents.getStatuses()
        setListState(ListState)
        setStatus(ListState[0].name)
        setStatusId(ListState[0].id)
    }, [])


    async function sortDocument(event) {
        event.preventDefault()
        setLoadingDocuments(true)
        const {data: ListDocuments} = await api.documents.getListDocuments(
            1,
            1000,
            typeId,
            statusId,
            descending,
            sortByDate
        );
        setListDocuments(ListDocuments)
        setLoadingDocuments(false)
        setShowPagination(false)
    }

    const resetFilter = async () => {
        setLoadingDocuments(true)
        setOpenCustomClickAwayListener(false )
        const {data: ListDocuments} = await api.documents.getListDocuments(page, countDocument);
        setListDocuments(ListDocuments)
        setLoadingDocuments(false)
        setShowPagination(true)
    }

    const listRadioForSortByDescending = [
        {
            label: 'Возрастанию',
            value: false
        },
        {
            label: 'Убыванию',
            value: true
        }
    ]

    const listRadioForSortByDate = [
        {
            label: 'Создания',
            value: 'createDate'
        },
        {
            label: 'Обновления',
            value: 'updateDate'
        },
        {
            label: 'Готовности',
            value: 'readyDate'
        }
    ]


    return (
        <>
            <Grid
                item
                xs={2}>
                {
                    archive ?
                        '' :
                        <CustomButton
                            onClick={() => setOpen(true)}
                            name='Добавить'
                        />
                }
            </Grid>
            <Grid
                item
                style={{
                    display: 'flex',
                    justifyContent: 'flex-end',
                    alignItems: 'center',
                    flexWrap: 'wrap-reverse'
                }}
                xs={10}>
                {
                    type === 'Document' ?
                        <CustomSelect
                            valueSelect={itemCategories.id === '1' ? countDocument : countDocumentOnCheck}
                            size='small'
                            xs={1}
                            contentCustomSelect="Кол-во"
                            setValueSelect={(event) => {
                                if (role === 'Студент') {
                                    setPage(1)
                                    setCountDocument(Number(event.target.value))
                                } else if (role === 'Сотрудник') {
                                    if (itemCategories.id === '1') {
                                        setPage(1)
                                        setCountDocument(Number(event.target.value))
                                    } else {
                                        setPageOnCheck(1)
                                        setCountDocumentOnCheck(Number(event.target.value))
                                    }
                                }
                            }}>
                            {
                                [6, 12, 18].map(item =>
                                    <MenuItem className={classesMain.SelectItems}
                                              key={item}
                                              value={item}>
                                        {item}
                                    </MenuItem>
                                )
                            }
                        </CustomSelect>
                        :
                        <CustomSelect
                            valueSelect={itemCategories.id === '1' ? countDocument : countDocumentOnCheck}
                            size='small'
                            xs={1}
                            contentCustomSelect="Кол-во"
                            setValueSelect={(event) => {
                                if (role === 'Студент') {
                                    setPage(1)
                                    setCountDocument(Number(event.target.value))
                                } else if (role === 'Сотрудник') {
                                    if (itemCategories.id === '1') {
                                        setPage(1)
                                        setCountDocument(Number(event.target.value))
                                    } else {
                                        setPageOnCheck(1)
                                        setCountDocumentOnCheck(Number(event.target.value))
                                    }
                                }
                            }}>
                            {
                                [6, 12, 18].map(item =>
                                    <MenuItem className={classesMain.SelectItems}
                                              key={item}
                                              value={item}>
                                        {item}
                                    </MenuItem>
                                )
                            }
                        </CustomSelect>
                }
                <Stack spacing={1} direction='row'>
                    <form onSubmit={sortDocument}>
                        <CustomClickAwayListener
                            setOpenCustomClickAwayListener={setOpenCustomClickAwayListener}
                            openCustomClickAwayListener={openCustomClickAwayListener}
                            title={
                                <>
                                    <SortIcon className={classesMain.Text}/>
                                    <Typography className={classesMain.Text}>Фильтр</Typography>
                                </>
                            }
                            children={
                                <>
                                    <Stack spacing={4}>
                                        <Stack spacing={1}>
                                            <Typography variant="h6" style={{color: 'rgba(0, 0, 0, 0.6)'}}>
                                                Фильтр
                                            </Typography>
                                            <CustomSelect
                                                valueSelect={typeId}
                                                size='small'
                                                contentCustomSelect="Тип справки"
                                                setValueSelect={(event) => {
                                                    setTypeId(event.target.value)
                                                }}>
                                                {
                                                    listTypes?.map(item =>
                                                        <MenuItem className={classesMain.SelectItems}
                                                                  key={item.id}
                                                                  value={item.id}>
                                                            {item.typeName}
                                                        </MenuItem>
                                                    )
                                                }
                                            </CustomSelect>
                                            <CustomSelect
                                                valueSelect={statusId}
                                                size='small'
                                                contentCustomSelect="Тип справки"
                                                setValueSelect={(event) => {
                                                    setStatusId(event.target.value)
                                                }}>
                                                {
                                                    listState?.map(item =>
                                                        <MenuItem className={classesMain.SelectItems}
                                                                  key={item.id}
                                                                  value={item.id}>
                                                            {item.statusName}
                                                        </MenuItem>
                                                    )
                                                }
                                            </CustomSelect>
                                        </Stack>
                                        <Stack spacing={1}>
                                            <Typography variant="h6" style={{color: 'rgba(0, 0, 0, 0.6)'}}>
                                                Сортировка
                                            </Typography>
                                            <Grid item xs={12}>
                                                <CustomRadio
                                                    name='Сортировка по...'
                                                    listRadio={listRadioForSortByDescending}
                                                    setValue={setDescending}
                                                />
                                            </Grid>
                                            <Grid item xs={12}>
                                                <CustomRadio
                                                    name='Сортировка по дате...'
                                                    listRadio={listRadioForSortByDate}
                                                    setValue={setSortbyDate}
                                                />
                                            </Grid>
                                        </Stack>
                                    </Stack>


                                    <Grid container display='flex' spacing={2}>
                                        <Grid item>
                                            <Button
                                                type={"submit"}
                                                variant="contained"
                                                size="medium"
                                                className={classesMain.button}>
                                                Показать
                                            </Button>
                                        </Grid>
                                        <CustomButton onClick={resetFilter} name='Сбросить фильтр'/>
                                    </Grid>
                                </>
                            }/>
                    </form>
                </Stack>
                {/*<ToggleButtonGroup*/}
                {/*    style={{marginLeft: '10px'}}*/}
                {/*    color="primary"*/}
                {/*    value={view}*/}
                {/*    size={'small'}*/}
                {/*    exclusive*/}
                {/*    onChange={(event) => setView(event.target.value)}*/}
                {/*>*/}
                {/*    <ToggleButton value="line"><ViewHeadlineIcon*/}
                {/*        style={{fontSize: '20px'}}/></ToggleButton>*/}
                {/*    <ToggleButton value="grid"><GridViewIcon style={{fontSize: '20px'}}/></ToggleButton>*/}
                {/*</ToggleButtonGroup>*/}
            </Grid>
        </>
    );
}

export default DocumentControlPanel;