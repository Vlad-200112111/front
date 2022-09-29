import axios from "../axios";
import Cookies from "js-cookie";
import CustomAutocomplete
    from "../../../Component/UI/CustomFormGenerator/ComponentForFormGenerator/CustomAutocomplete/CustomAutocomplete";


const config = {
    headers: {
        'Content-Type': 'application/json;charset=utf-8',
        'Accept': '/*/'
    },
};
const userId = Cookies.get("userId");

const endpoints = {
    getListTypes: () => axios.get("Documents/api/v1/documents/types", {
        params: {
            token: Cookies.get("auth-token")
        }
    }),
    getLog: (idDocument) => axios.get(`Documents/api/v1/documents/${idDocument}/logs`, {
        params: {
            token: Cookies.get("auth-token")
        }
    }),
    getProductionTimeDocument: (idType) => axios.get(`Documents/api/v1/documents/types/${idType}`, {
        params: {
            token: Cookies.get("auth-token")
        }
    }),
    getStatuses: () => axios.get("Documents/api/v1/documents/statuses", {
        params: {
            token: Cookies.get("auth-token")
        }
    }),
    getModelDocument: (idType) => axios.get(`Documents/api/v1/documents/types/${idType}/model`, {
        params: {
            token: Cookies.get("auth-token")
        }
    }),
    getArchive: (page,count) => axios.get(`Documents/api/v1/documents/archive`, {
        params: {
            page: page,
            count: count,
            token: Cookies.get("auth-token"),
            userId: userId
        }
    }),
    getArchiveById: (idDocument) => axios.get(`Documents/api/v1/documents/archive/${idDocument}`, {
        params: {
            token: Cookies.get("auth-token")
        }
    }),
    getEmployerArchive: (page, count) => axios.get(`Documents/api/v1/documents/archive/employer`, {
        params: {
            page: page,
            count: count,
            token: Cookies.get('auth-token'),
            facultyId: 1
        }
    }),
    getDocumentGetMethods: () => axios.get(`Documents/api/v1/documentgetmethods`, {
        params: {
            token: Cookies.get('auth-token')
        }
    }),
    getListDocuments: (page, count, typeId?, statusId?, descending?, sortByDate?) => axios.get("Documents/api/v1/documents", {
        params: {
            page: page,
            count: count,
            token: Cookies.get("auth-token"),
            typeId: typeId,
            statusId: statusId,
            descending: descending,
            sortBy: sortByDate
        }
    }),
    getListTypicalComment: (type) => axios.get("Documents/api/v1/documents/actions/typical-reasons", {
        params: {
            token: Cookies.get("auth-token"),
            type: type
        }
    }),
    getTypicalCommentById: (id) => axios.get(`Documents/api/v1/documents/actions/typical-reasons/${id}`, {
        params: {
            token: Cookies.get("auth-token")
        }
    }),
    addTypicalComment: (data) => axios.post(`Documents/api/v1/documents/actions/typical-reasons`, data),
    updateTypicalComment: (data, statusId) => axios.put(`Documents/api/v1/documents/actions/typical-reasons/${statusId}`, data, config),
    deleteTypicalComment: (id) => axios.delete(`Documents/api/v1/documents/actions/typical-reasons/${id}`, {
        params: {
            token: Cookies.get("auth-token")
        }
    }),
    getCountDocument: () => axios.get("Documents/api/v1/pagination/documents", {
        params: {
            token: Cookies.get("auth-token")
        }
    }),
    getCountDocumentArchive: () => axios.get("Documents/api/v1/pagination/archived-documents", {
        params: {
            token: Cookies.get("auth-token")
        }
    }),
    getCountDocumentForEmployer: () => axios.get("Documents/api/v1/pagination/employer/documents", {
        params: {
            token: Cookies.get("auth-token"),
            facultyId: 1
        }
    }),
    getCountDocumentArchiveForEmployer: () => axios.get("Documents/api/v1/pagination/employer/archived-documents", {
        params: {
            token: Cookies.get("auth-token"),
            facultyId: 1
        }
    }),
    getListDocumentsFromEmployer: (page, count) => axios.get("Documents/api/v1/employer/documents", {
        params: {
            page: page,
            count: count,
            token: Cookies.get("auth-token"),
            facultyId: 1
        }
    }),
    getListDocumentsByTypeIdForStudent: (TypeId) => axios.get("Documents/api/v1/employer/documents", {
        params: {
            token: Cookies.get("auth-token"),
            typeId: TypeId,
            userId: userId
        }
    }),
    getListDocumentsByTypeIdForEmployer: (TypeId) => axios.get("Documents/api/v1/employer/documents", {
        params: {
            token: Cookies.get("auth-token"),
            typeId: TypeId,
        }
    }),
    getDocument: (idDocument, UserId) => axios.get(`Documents/api/v1/documents/${idDocument}`, {
        params: {
            token: Cookies.get("auth-token"),
            userId:UserId
        }
    }),
    getEmployerDocument: (idDocument) => axios.get(`Documents/api/v1/employer/documents/${idDocument}`, {
        params: {
            token: Cookies.get("auth-token"),

        }
    }),
    getFile: (idDocument) => axios.get(`Documents/api/v1/documents/${idDocument}/attached-file`, {
        params: {
            token: Cookies.get("auth-token")
        }
    }),
    deleteFile: (idDocument) => axios.delete(`Documents/api/v1/documents/${idDocument}/attached-file`, {
        params: {
            token: Cookies.get("auth-token")
        }
    }),
    getItemForSelectAndAutocomplete: (objName, typeId) => axios.get(`Documents/api/v1/documents/types/select`, {
        params: {
            token: Cookies.get("auth-token"),
            objName: objName,
            typeId: typeId
        }
    }),
    updateStatus: (data, idDocument) => axios.patch(`Documents/api/v1/employer/documents/${idDocument}/status`, data, config),
    updateMethod: (data, id) => axios.patch(`Documents/api/v1/documents/${id}/get-method`, data, config),
    updateDocument: (data, idDocument) => axios.put(`Documents/api/v1/documents/${idDocument}/fields`, data, config),
    sendDocument: (data) => axios.post("Documents/api/v1/documents", data, config),
    sendFile: (data, idDocument) => axios.post(`Documents/api/v1/documents/${idDocument}/attached-file`, data),
};

export default endpoints;
