import { getData, postData } from './core_api';

// FTP Connect
export const connectFtpApi = async (params) => {
    try {
        const response = await postData("ftp/connect", params);
        return response;
    } catch (error) {
        throw error;
    }
};

// FTP List Files
export const listFileApi = async (params) => {
    try {
        const response = await getData("ftp/file/list", params);
        return response;
    } catch (error) {
        throw error;
    }
};

// FTP Upload Files
export const uploadFileApi = async (params) => {
    try {
        const response = await postData("ftp/file/upload", params);
        return response;
    } catch (error) {
        throw error;
    }
};