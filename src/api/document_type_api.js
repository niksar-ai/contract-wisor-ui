import { getData, postData, deleteData } from './core_api';

// List Document Type
export const listDocumentTypeApi = async () => {
    try {
        const response = await getData("document-type/list");
        return response;
    } catch (error) {
        throw error;
    }
};

// Tree List Document Type
export const treeDocumentTypeApi = async () => {
    try {
        const response = await getData("document-type/tree");
        return response;
    } catch (error) {
        throw error;
    }
};

// List Top Document Type From Document Count
export const listDocumentTypeTopDocumentCountApi = async () => {
    try {
        const response = await getData("document-type/list/top-document-count");
        return response;
    } catch (error) {
        throw error;
    }
};

// List Top Document Type From Document Size
export const listDocumentTypeTopDocumentSizeApi = async () => {
    try {
        const response = await getData("document-type/list/top-document-size");
        return response;
    } catch (error) {
        throw error;
    }
};

// Save Document Type
export const saveDocumentTypeApi = async (params) => {
    try {
        const response = await postData("document-type/save", params);
        return response;
    } catch (error) {
        throw error;
    }
};

// Delete Document Type
export const deleteDocumentTypeApi = async (uid) => {
    try {
        const response = await deleteData("document-type/" + uid);
        return response;
    } catch (error) {
        throw error;
    }
};
