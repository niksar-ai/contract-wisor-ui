import { getData, postData } from './core_api';

const BASE_REQUEST = "document";

// List Documents
export const listDocumentApi = async (params) => {
    try {
        const response = await getData(`${BASE_REQUEST}/list`, params);
        return response;
    } catch (error) {
        throw error;
    }
};

// Tree Documents
export const treeDocumentApi = async (params) => {
    try {
        const response = await getData(`${BASE_REQUEST}/tree`, params);
        return response;
    } catch (error) {
        throw error;
    }
};

// Get Document By ID
export const getDocumentByIdApi = async (documentId) => {
    try {
        const response = await getData(`${BASE_REQUEST}/${documentId}`);
        return response;
    } catch (error) {
        throw error;
    }
};

// Save Document
export const saveDocumentApi = async (documentId, params) => {
    try {
        const response = await postData(`${BASE_REQUEST}/${documentId}/save`, params);
        return response;
    } catch (error) {
        throw error;
    }
};

// Get Document Statistics
export const getDocumentStatisticsApi = async () => {
    try {
        const response = await getData(`${BASE_REQUEST}/statistics`);
        return response;
    } catch (error) {
        throw error;
    }
};

// Get Last Update Document List
export const listDocumentLastUpdateApi = async () => {
    try {
        const response = await getData(`${BASE_REQUEST}/list/last-update`);
        return response;
    } catch (error) {
        throw error;
    }
};
