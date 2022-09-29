import {useState, useEffect} from "react";
import Cookies from "js-cookie";
import api from "./../../../Services/api";
import MainDocuments from "./../../Modules/MainDocuments/MainDocuments";
import DocumentsModal from "./../../General/Document/Component/DocumentsModal";
import React from "react";
import {Grid, Pagination, Tab} from "@mui/material";
import CustomTabPanel from "./../../UI/CustomTabPanel/CustomTabPanel";
import DocumentControlPanel from "./../../General/Document/Component/DocumentControlPanel";
import CustomAlert from "./../../UI/CustomAlert/CustomAlert";
import CircularProgress from "@mui/material/CircularProgress";
import loagingGif from '../../../Assets/Image/loading.gif'

import ItemDocumentsGrid from "./../../General/Document/Document/Item/ItemDocumentsGrid";
import ItemDocumentsLine from "./../../General/Document/Document/Item/ItemDocumentsLine";
import CustomTab from "./../../UI/CustomTab/CustomTab";
import useStylesMain from "./../../../Styles/MainStyles";

function Documents(props) {
    const classesMain = useStylesMain();
    const userId = Cookies.get("userId");
    const [view, setView] = useState('grid')
    const [chosenType, setChosenType] = useState({})
    const [listDocuments, setListDocuments] = useState([]);
    const [open, setOpen] = useState(false);
    const [loadingDocuments, setLoadingDocuments] = useState(false)
    const [showPagination, setShowPagination] = useState(true)

    const [countFromBackend, setCountFromBackend] = useState()
    const [count, setCount] = useState()
    const [countDocument, setCountDocument] = useState(6)
    const [page, setPage] = useState(1)

    const [fade, setFade] = useState(true)
    const [role, setRole] = useState('')


    useEffect(async () => {
        const object = new Object()
        object.token = Cookies.get("auth-token")
        const {data: Result} = await api.auth.getAssigningRole(object)
        setRole(Result.role)

        const {data: Count} = await api.documents.getCountDocument()
        setCountFromBackend(Count)
        setCount(Math.ceil(Number(Count) / countDocument))
    }, [userId]);

    useEffect(async () => {
        setCount(Math.ceil(Number(countFromBackend) / countDocument))
    }, [countDocument]);


    useEffect(async () => {
        setLoadingDocuments(true)

        const {data: ListDocuments} = await api.documents.getListDocuments(page, countDocument);
        if (Array.isArray(ListDocuments)) {
            setListDocuments(ListDocuments.reverse())
        } else {
            setListDocuments(ListDocuments)
        }
        setLoadingDocuments(false)
    }, [page, countDocument]);

    const resetFilter = async () => {
        setLoadingDocuments(true)

        const {data: ListDocuments} = await api.documents.getListDocuments(page, countDocument);
        if (Array.isArray(ListDocuments)) {
            setListDocuments(ListDocuments.reverse())
        } else {
            setListDocuments(ListDocuments)
        }
        setLoadingDocuments(false)
        setShowPagination(true)
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


            <Grid
                container
                direction="row"
                justifyContent="space-between"
                alignItems="center"
                style={{marginBottom: 25}}
            >
                <DocumentControlPanel
                    page={page}
                    setListDocuments={setListDocuments}
                    role={role}
                    type='Document'
                    itemCategories={'1'}
                    setOpen={setOpen}
                    setCountDocument={setCountDocument}
                    countDocument={countDocument}
                    setPage={setPage}
                    setShowPagination={setShowPagination}
                    setLoadingDocuments={setLoadingDocuments}
                />
            </Grid>
            {
                listDocuments === 'Нет справок' ?
                    <>
                        <CustomAlert
                            severity="info"
                            title='Информация!'
                            content='У Вас нет заказанных справок! Нажмите на кнопку "Заказать"'
                            activeAlert={true}
                        />
                    </>
                    : loadingDocuments ?

                        <Grid
                            container
                            direction="row"
                            justifyContent="center"
                            alignItems="center"
                        >
                            <Grid item
                                  style={{
                                      marginLeft: 'auto',
                                      marginRight: 'auto',
                                  }}>
                                <img src={loagingGif} alt=""/>
                            </Grid>
                        </Grid>
                        :
                        <>

                            <Grid
                                container
                                direction="row"
                                justifyContent="flex-start"
                                alignItems="center"
                                spacing={2}
                            >
                                {
                                    listDocuments?.map((itemDocuments, index) =>
                                        <ItemDocumentsGrid
                                            key={itemDocuments.id}
                                            itemDocuments={itemDocuments}
                                            role={role}/>
                                    )
                                }
                            </Grid>
                            {
                                showPagination ?
                                    <>
                                        <Pagination
                                            page={page}
                                            boundaryCount={2}
                                            style={{width: '100%'}}
                                            count={count}
                                            onChange={handleChangePagination}
                                            variant="outlined"
                                            shape="rounded"
                                            showFirstButton
                                            showLastButton/>
                                    </> : ''
                            }
                        </>
            }

        </MainDocuments>
    );
}

export default Documents;