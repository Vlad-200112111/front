import React from 'react';
import useStylesMain from "../../../../Styles/MainStyles";
import Cookies from "js-cookie";
import {useEffect, useState} from "react";
import api from "../../../../Services/api";
import MainDocuments from "../../../Modules/MainDocuments/MainDocuments";
import DocumentsModal from "../../../General/Document/Component/DocumentsModal";
import CustomTab from "../../../UI/CustomTab/CustomTab";
import {Grid, Pagination, Tab} from "@mui/material";
import CustomTabPanel from "../../../UI/CustomTabPanel/CustomTabPanel";
import DocumentControlPanel from "../../../General/Document/Component/DocumentControlPanel";
import CustomAlert from "../../../UI/CustomAlert/CustomAlert";
import CircularProgress from "@mui/material/CircularProgress";
import ItemDocumentsGrid from "../../../General/Document/Document/Item/ItemDocumentsGrid";
import ItemDocumentsLine from "../../../General/Document/Document/Item/ItemDocumentsLine";
import ItemDocumentsGridArchive from "../../../General/Document/Archive/Item/ItemDocumentsGridArchive";
import ItemDocumentsLineArchive from "../../../General/Document/Archive/Item/ItemDocumentsLineArchive";

function Archive(props) {
    const classesMain = useStylesMain();
    const userId = Cookies.get("userId");
    const [view, setView] = useState('grid')
    const [chosenType, setChosenType] = useState({})
    const [listDocuments, setListDocuments] = useState([]);
    const [listDocumentsForEmployee, setListDocumentsForEmployee] = useState([]);
    const [open, setOpen] = useState(false);
    const [loadingDocuments, setLoadingDocuments] = useState(false)

    const [countFromBackend, setCountFromBackend] = useState()
    const [count, setCount] = useState()
    const [countDocument, setCountDocument] = useState(6)
    const [page, setPage] = useState(1)


    const [countFromBackendOnCheck, setCountFromBackendOnCheck] = useState()
    const [countOnCheck, setCountOnCheck] = useState()
    const [countDocumentOnCheck, setCountDocumentOnCheck] = useState(1000)
    const [pageOnCheck, setPageOnCheck] = useState(1)

    const [fade, setFade] = useState(true)
    const [role, setRole] = useState('')

    useEffect(async () => {
        const object = new Object()
        object.token = Cookies.get("auth-token")
        const {data: Result} = await api.auth.getAssigningRole(object)
        setRole(Result.role)

        const {data: Count} = await api.documents.getCountDocumentArchive()
        setCountFromBackend(Count)
        setCount(Math.ceil(Number(Count) / countDocument))

        const {data: CountOnCheck} = await api.documents.getCountDocumentArchiveForEmployer()
        setCountFromBackendOnCheck(CountOnCheck)
        setCountOnCheck(Math.ceil(Number(CountOnCheck) / countDocumentOnCheck))
    }, [userId]);

    useEffect(async () => {
        setCount(Math.ceil(Number(countFromBackend) / countDocument))
    }, [countDocument]);

    useEffect(async () => {
        setCountOnCheck(Math.ceil(Number(countFromBackendOnCheck) / countDocumentOnCheck))
    }, [countDocumentOnCheck]);


    useEffect(async () => {
        setLoadingDocuments(true)

        const {data: ListDocuments} = await api.documents.getArchive(page, countDocument);
        if (Array.isArray(ListDocuments)) {
            setListDocuments(ListDocuments.reverse())
        } else {
            setListDocuments(ListDocuments)
        }
        setLoadingDocuments(false)
    }, [page, countDocument]);

    useEffect(async () => {
        setLoadingDocuments(true)
        const {data: ListDocumentsForEmployee} = await api.documents.getEmployerArchive(pageOnCheck, countDocumentOnCheck);
        if (Array.isArray(ListDocumentsForEmployee)) {
            setListDocumentsForEmployee(ListDocumentsForEmployee.reverse())
        } else {
            setListDocumentsForEmployee(ListDocumentsForEmployee)
        }
        setLoadingDocuments(false)
    }, [pageOnCheck, countDocumentOnCheck]);

    const [TabList, setTabList] = useState([
        // {id: '1', categoryName: 'Архив'},
        {id: '2', categoryName: 'Архив по факультету'},
    ])

    const filterByType = async () => {
        const {data: ListDocumentsByType} = await api.documents.getListDocumentsByTypeIdForStudent(chosenType?.id)
        if (Array.isArray(ListDocumentsByType)) {
            setListDocuments(ListDocumentsByType.reverse())
        } else {
            setListDocuments('')
        }
    }

    const resetFilter = async () => {
        const {data: ListDocuments} = await api.documents.getListDocuments()
        if (Array.isArray(ListDocuments)) {
            setListDocuments(ListDocuments.reverse())
        } else {
            setListDocuments(ListDocuments)
        }
    }

    const handleChangePagination = async (event, value) => {
        setFade(false)
        setPage(value)

        window.scroll({
            left: 0,
            top: 0,
            behavior: 'smooth'
        })
        setFade(true)

    };


    const handleChangePaginationForEmployee = async (event, value) => {
        setFade(false)
        setPageOnCheck(value)

        window.scroll({
            left: 0,
            top: 0,
            behavior: 'smooth'
        })
        setFade(true)
    };

    return (
        <MainDocuments>
            <DocumentsModal
                open={open}
                setOpen={setOpen}
                resetFilter={resetFilter}
                setListDocuments={setListDocuments}
                setChosenType={setChosenType}
                page={page}
                count={countDocument}
            />

            <CustomTab firstTab={"2"}>

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
                        <>
                            <CustomTabPanel
                                className={classesMain.TabsPanelMobile}
                                rowSpacing={1}
                                key={itemCategories.id}
                                columnSpacing={{xs: 1, sm: 2, md: 3}}
                                value={itemCategories.id}>

                                {/*<DocumentControlPanel*/}
                                {/*    archive={true}*/}
                                {/*    page={page}*/}
                                {/*    setListDocuments={setListDocuments}*/}
                                {/*    role={role}*/}
                                {/*    type='Document'*/}
                                {/*    itemCategories={itemCategories}*/}
                                {/*    setOpen={setOpen}*/}
                                {/*    setCountDocument={setCountDocument}*/}
                                {/*    countDocument={countDocument}*/}
                                {/*    countDocumentOnCheck={countDocumentOnCheck}*/}
                                {/*    setPage={setPage}*/}
                                {/*    setPageOnCheck={setPageOnCheck}*/}
                                {/*    setCountDocumentOnCheck={setCountDocumentOnCheck}*/}
                                {/*    chosenType={chosenType}*/}
                                {/*    setChosenType={setChosenType}*/}
                                {/*    filterByType={filterByType}*/}
                                {/*    resetFilter={resetFilter}*/}
                                {/*    view={view}*/}
                                {/*    setView={setView}*/}
                                {/*/>*/}

                                {
                                    itemCategories.id === "1" ?


                                        listDocuments === 'Нет справок' ?
                                            <>
                                                <CustomAlert
                                                    severity="info"
                                                    title='Информация!'
                                                    content='Список архива пуст!'
                                                    activeAlert={true}
                                                />
                                            </>
                                            : loadingDocuments ?


                                                <Grid item
                                                      style={{
                                                          marginLeft: 'auto',
                                                          marginRight: 'auto',
                                                          marginTop: 100
                                                      }}>
                                                    <CircularProgress/>
                                                </Grid>
                                                :
                                                <>
                                                    <>
                                                        {
                                                            view === 'grid' ?
                                                                <>
                                                                    {
                                                                        listDocuments?.map((itemDocuments, index) =>
                                                                            <ItemDocumentsGrid
                                                                                // fade={fade}
                                                                                // timeout={index * 200}
                                                                                userId={Cookies.get("userId")}
                                                                                key={itemDocuments.id}
                                                                                itemDocuments={itemDocuments}
                                                                                role={role}/>
                                                                        )
                                                                    }
                                                                </>

                                                                :

                                                                listDocuments?.map(itemDocuments =>
                                                                    <Grid key={itemDocuments.id} item xs={12}>
                                                                        <ItemDocumentsLine
                                                                            userId={Cookies.get("userId")}
                                                                            itemDocuments={itemDocuments}
                                                                            role={role}/>
                                                                    </Grid>
                                                                )
                                                        }
                                                    </>
                                                    {/*<>*/}
                                                    {/*    <Pagination*/}
                                                    {/*        page={page}*/}
                                                    {/*        boundaryCount={2}*/}
                                                    {/*        style={{width: '100%'}}*/}
                                                    {/*        count={count}*/}
                                                    {/*        onChange={handleChangePagination}*/}
                                                    {/*        variant="outlined"*/}
                                                    {/*        shape="rounded"*/}
                                                    {/*        showFirstButton*/}
                                                    {/*        showLastButton/>*/}
                                                    {/*</>*/}
                                                </>


                                        : itemCategories.id === "2" ?
                                            <>
                                                {
                                                    listDocumentsForEmployee === 'Нет справок' ?
                                                        <>
                                                            <CustomAlert
                                                                width={'100%'}
                                                                severity="info"
                                                                title='Информация!'
                                                                content='Список архива пуст!'
                                                                activeAlert={true}
                                                            />
                                                        </>
                                                        : loadingDocuments ?


                                                            <Grid item
                                                                  style={{
                                                                      marginLeft: 'auto',
                                                                      marginRight: 'auto',
                                                                      marginTop: 100
                                                                  }}>
                                                                <CircularProgress/>
                                                            </Grid>
                                                            :
                                                            <>
                                                                <>
                                                                    {
                                                                        view === 'grid' ?
                                                                            <>
                                                                                {
                                                                                    listDocumentsForEmployee?.map((itemDocumentsForEmployee, index) =>
                                                                                        <ItemDocumentsGridArchive
                                                                                            fade={fade}
                                                                                            timeout={index * 200}
                                                                                            key={itemDocumentsForEmployee.id}
                                                                                            itemArchive={itemDocumentsForEmployee}
                                                                                            role={role}/>
                                                                                    )
                                                                                }
                                                                            </>

                                                                            :
                                                                            listDocumentsForEmployee?.map(itemDocumentsForEmployee =>
                                                                                <Grid key={itemDocumentsForEmployee.id}
                                                                                      item xs={12}>
                                                                                    <ItemDocumentsLineArchive
                                                                                        itemArchive={itemDocumentsForEmployee}
                                                                                        role={role}/>
                                                                                </Grid>
                                                                            )
                                                                    }
                                                                </>
                                                                {/*<>*/}
                                                                {/*    <Pagination*/}
                                                                {/*        page={pageOnCheck}*/}
                                                                {/*        boundaryCount={2}*/}
                                                                {/*        style={{width: '100%'}}*/}
                                                                {/*        count={countOnCheck}*/}
                                                                {/*        onChange={handleChangePaginationForEmployee}*/}
                                                                {/*        variant="outlined"*/}
                                                                {/*        shape="rounded"*/}
                                                                {/*        showFirstButton*/}
                                                                {/*        showLastButton/>*/}
                                                                {/*</>*/}
                                                            </>
                                                }
                                            </> : ''
                                }


                            </CustomTabPanel>

                        </>
                    )
                }

            </CustomTab>
        </MainDocuments>
    );
}

export default Archive;