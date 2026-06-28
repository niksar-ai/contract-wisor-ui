import React, { useEffect, useState, useRef} from 'react';
import { Container, Row, Col, Card, Button, Form, CardBody, CardHeader, CardFooter } from 'react-bootstrap';
import ContactForm from '../components/contact_form';
import FileTree from '../components/file_list';
import Tree from '../components/base/base_tree';
import StarterPage from '../components/state/starter_page';
import { connectFtpApi, listFileApi, uploadFileApi } from '../api/ftp_api';
import { treeDocumentTypeApi } from '../api/document_type_api';
import { documentTypeToTree } from '../utils/generator';

function UploadPage() {
    const [remotePath, setRemotePath] = useState("/");
    const [documentTypeTree, setDocumentTypeTree] = useState([]);
    const [fileStructure, setFileStructure] = useState([]);
    const [uploadedFiles, setUploadedFiles] = useState([]);
    const [selectedFiles, setSelectedFiles] = useState([]);
    const selectedFilesRef = useRef(selectedFiles);
    const remotePathRef = useRef(remotePath);

    useEffect(() => {
        getDocumentTypeTree();
    }, []);

    useEffect(() => {
        selectedFilesRef.current = selectedFiles;
    }, [selectedFiles]);

    useEffect(() => {
        remotePathRef.current = remotePath;
    }, [remotePath]);

    const getDocumentTypeTree = () => {
        treeDocumentTypeApi()
            .then(response => setDocumentTypeTree(documentTypeToTree(response, selectDocumentType)))
            .catch(error => console.error('Error fetching tree data:', error));
    };

    const connectFtp = (ftpDetails) => {
        connectFtpApi(ftpDetails)
            .then(() => getFileList())
            .catch(error => console.error(error));
    };

    const getFileList = (path = remotePathRef.current) => {
        listFileApi({ remotePath: path })
            .then(response => setFileStructure(Array.isArray(response) ? response : [{ "filename": "..", "attrs": { "dir": true } }]))
            .catch(error => console.error(error));
    };

    const onUploadFiles = () => {
        uploadFileApi(uploadedFiles)
            .then(response => {
                setUploadedFiles([]);
                setSelectedFiles([]);
                alert(response);
            })
            .catch(error => alert(error));
    };

    const updateRemotePath = (value) => {
        // Pass the new path explicitly: remotePathRef updates only on the next
        // render, so getFileList() would otherwise list the previous path and
        // the tree would lag a step behind (causing doubled paths like
        // /ftp_data/ftp_data on the next click).
        setRemotePath(value);
        getFileList(value);
    };

    const addSelectedFile = (value) => {
        setSelectedFiles([...selectedFiles, { path: value }])
    };

    const removeSelectedFile = (value) => {
        const newList = selectedFiles.filter(e => e.path !== value);
        setSelectedFiles(newList);
    };

    const selectDocumentType = (item) => {
        setUploadedFiles((prevUploadedFiles) => {
            const tempUploadedFiles = [...prevUploadedFiles];
            selectedFilesRef.current.forEach(selectFile => {
                const updatedTempSelectFile = { ...selectFile, documentTypeId: item.id, documentTypeName: item.name };
                const index = tempUploadedFiles.findIndex(file => file.path === updatedTempSelectFile.path);
                if (index === -1) {
                    tempUploadedFiles.push(updatedTempSelectFile);
                } else {
                    tempUploadedFiles[index] = updatedTempSelectFile;
                }
            });
            return tempUploadedFiles;
        });
        setSelectedFiles([]);
    };

    const removeUploadedFile = (value) => {
        const newList = uploadedFiles.filter(e => e.path !== value);
        setUploadedFiles(newList);
    };

    return (
        <Col>
            <ContactForm connectFtp={connectFtp} />
            {fileStructure.length > 0 ? (
                <Row>
                    <Col>
                        <Card className="h-100">
                            <CardHeader>
                                <h5><i className="fa-solid fa-bars-staggered"></i> Sturucture</h5>
                                <Form.Control type="text" id="remotePath" placeholder='Remote Path' value={remotePath} onChange={e => setRemotePath(e.target.value)} onBlur={() => getFileList(remotePath)} />
                            </CardHeader>
                            <CardBody>
                                <FileTree files={fileStructure} remotePath={remotePath} updateRemotePath={updateRemotePath} selectedFiles={selectedFiles} addSelectedFile={addSelectedFile} removeSelectedFile={removeSelectedFile} uploadedFiles={uploadedFiles} removeUploadedFile={removeUploadedFile} />
                            </CardBody>
                            <CardFooter>
                                {uploadedFiles.length > 0 && (
                                    <small className="text-success mx-1"><b>{uploadedFiles.length}</b> files ready to upload</small>
                                )}
                                {selectedFiles.length > 0 && (
                                    <small className="mx-1"><b>{selectedFiles.length}</b> files selected</small>
                                )}
                                {uploadedFiles.length > 0 && selectedFiles.length <= 0 && (
                                    <Button variant="primary" className='w-100 my-3' onClick={onUploadFiles}><i className="bi bi-cloud-upload mx-2"></i>Upload Document</Button>
                                )}
                            </CardFooter>
                        </Card>
                    </Col>
                    {selectedFiles.length > 0 && (
                        <Col>
                            <Card className="h-100">
                                <CardHeader>
                                    <h5>Document Types</h5>
                                    <label>Please select the associated document type</label>
                                </CardHeader>
                                <CardBody><Tree data={documentTypeTree} isAllOpen={true} /></CardBody>
                            </Card>
                        </Col>
                    )}
                </Row>
            ) : (<StarterPage title={"Upload Contract"} message={"Please enter the ftp server information you want to connect to in order to upload a contract and click the connect to ftp button."}/>)}
        </Col>
    );
}

export default UploadPage;