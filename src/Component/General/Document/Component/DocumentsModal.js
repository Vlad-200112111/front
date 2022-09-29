import React from 'react';
import CustomSelect from "../../../UI/CustomSelect/CustomSelect";
import {Button, Grid, MenuItem, Typography} from "@material-ui/core";
import CustomTextarea from "../../../UI/CustomTextarea/CustomTextarea";
import CustomFormGenerator from "../../../UI/CustomFormGenerator/CustomFormGenerator";
import CustomModal from "../../../UI/CustomModal/CustomModal";
import api from "../../../../Services/api";
import {useEffect, useState} from "react";
import Cookies from "js-cookie";
import useStylesMain from "../../../../Styles/MainStyles";
import useStylesDocumentsStyles from "../../../../Styles/DocumentsStyles";
import Box from "@mui/material/Box";
import CustomFullScreenDialog from "../../../UI/CustomFullScreenDialog/CustomFullScreenDialog";
import {Link} from "react-router-dom";

function DocumentsModal({
                            open,
                            setOpen,
                            resetFilter,
                            setListDocuments,
                            setChosenType,
                            page,
                            count
                        }) {

    const classesMain = useStylesMain();
    const classesDocuments = useStylesDocumentsStyles()
    const [listModelDocument, setListModelDocument] = useState([]);
    const [typeDocumentId, setTypeDocumentId] = useState('');
    const [groupId, setGroupId] = useState('');
    const [listTypes, setListTypes] = useState([]);
    const [listGroups, setListGroups] = useState([]);
    const [limitTypesDocument, setLimitTypesDocument] = useState('');
    const token = Cookies.get("auth-token");
    const [listDocumentMethod, setListDocumentMethod] = useState([])
    const [method, setMethod] = useState('')

    useEffect(async () => {
        const {data: ListTypes} = await api.documents.getListTypes();
        setListTypes(ListTypes)
        setChosenType(ListTypes[0])

        const {data: ListDocumentMethod} = await api.documents.getDocumentGetMethods();
        setListDocumentMethod(ListDocumentMethod)
        setMethod(ListDocumentMethod[0].id)

        const {data: ListGroups} = await api.educationalProcess.getListGroups();
        setListGroups(ListGroups)
        setGroupId(ListGroups.length === 1 ? ListGroups[0].studentId : '')
    }, []);


    async function sendDocument(event) {
        event.preventDefault()
        resetFilter()
        const formData = new FormData(event.target)
        formData.append('token', token)
        formData.append('documentTypeId', typeDocumentId)
        formData.append('documentGetMethodId', method)

        let dataObj = [...formData].reduce((o, [k, v]) => {
            o[k] = v;
            return o;
        }, {})

        const {data: answer} = await api.documents.sendDocument(JSON.stringify(dataObj));
        const {data: ListDocuments} = await api.documents.getListDocuments(page, count);
        if (Array.isArray(ListDocuments)) {
            setListDocuments(ListDocuments.reverse())
        } else {
            setListDocuments(ListDocuments)
        }
        setOpen(false)
    }

    async function changeSelectTypesDocuments(event, newValue) {
        setTypeDocumentId(event.target.value)
        const {data: LimitTypesDocument} = await api.documents.getProductionTimeDocument(event.target.value);
        const {data: ModelDocument} = await api.documents.getModelDocument(event.target.value);
        setListModelDocument(ModelDocument)
        setLimitTypesDocument(LimitTypesDocument.preparationDays)
    }


    return (
        <CustomFullScreenDialog
            fullWidthScreenDialog={false}
            fullScreenDialog={false}
            titleCustomFullScreenDialog='Заказ справки'
            setOpenCustomFullScreenDialog={() => setOpen(false)}
            openCustomFullScreenDialog={open}
            scrollType='body'>
            <Box sx={{m: 4}}>
                <form onSubmit={sendDocument}>

                    <Grid   container
                            direction="row"
                            justifyContent="center"
                            alignItems="center"
                            spacing={3}>

                        <CustomSelect
                            xs={8}
                            contentCustomSelect="Группа"
                            setValueSelect={(event) => setGroupId(event.target.value)}
                            formHelperText={'Выберите группу.'}
                            valueSelect={groupId}>
                            {
                                listGroups.map(item =>
                                    <MenuItem key={item.studentId} className={classesMain.SelectItems}
                                              value={item.studentId}>{item.groupName}</MenuItem>
                                )
                            }
                        </CustomSelect>

                        <CustomSelect
                            xs={8}
                            contentCustomSelect="Способ получения справки"
                            setValueSelect={(event) => setMethod(event.target.value)}
                            formHelperText={'Выберите способ получения справки.'}
                            valueSelect={method}>
                            {
                                listDocumentMethod.map(item =>
                                    <MenuItem key={item.id} className={classesMain.SelectItems}
                                              value={item.id}>{item.name}</MenuItem>
                                )
                            }
                        </CustomSelect>

                        <CustomSelect
                            xs={8}
                            contentCustomSelect="Тип справки"
                            setValueSelect={changeSelectTypesDocuments}
                            formHelperText={
                                limitTypesDocument !== ''
                                    ? `Время изготовления занимает: ${limitTypesDocument} дней!`
                                    : 'Выберите тип справки.'
                            }>
                            {
                                listTypes.map(item =>
                                    <MenuItem className={classesMain.SelectItems}
                                              key={item.id}
                                              value={item.id}>
                                        {item.typeName}
                                    </MenuItem>
                                )
                            }
                        </CustomSelect>


                        <CustomTextarea
                            xs={8}
                            nameCustomTextarea="Comment"
                            label='Комментарий'
                        />

                        {listModelDocument.length !== 0 ?
                            <CustomFormGenerator
                                fields={listModelDocument}
                                xs={8}
                                typeId={typeDocumentId}
                            >

                            </CustomFormGenerator>
                            : ''
                        }
                    </Grid>
                    <Grid   container
                            direction="row-reverse"
                    >
                        <Grid item xs={4} xl={2} md={2}>


                            <Button
                                variant="contained"
                                type={'submit'}
                                className={classesMain.button}
                            >
                                Добавить
                            </Button>

                        </Grid>
                    </Grid>

                </form>
            </Box>
        </CustomFullScreenDialog>

    );
}

export default DocumentsModal;