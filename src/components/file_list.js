import React from 'react';
import { CloseButton } from 'react-bootstrap';
import '../styles/tree.css';
import { getFileIcon } from '../utils/util';

const FileTree = ({ files, remotePath, updateRemotePath, selectedFiles, addSelectedFile, removeSelectedFile, uploadedFiles, removeUploadedFile }) => {
    return (
        <ul className="tree striped">
            {files.map((file, index) => file.attrs.dir ? (
                <FolderNode key={index} folder={file} remotePath={remotePath} updateRemotePath={updateRemotePath} />
            ) : (
                <FileNode key={index} file={file} remotePath={remotePath} selectedFiles={selectedFiles} addSelectedFile={addSelectedFile} removeSelectedFile={removeSelectedFile} uploadedFiles={uploadedFiles} removeUploadedFile={removeUploadedFile} />
            )) }
        </ul>
    );
};

const FileNode = ({ file, remotePath, selectedFiles, addSelectedFile, removeSelectedFile, uploadedFiles, removeUploadedFile }) => {
    // Avoid a double slash when remotePath is "/".
    var filePath = (remotePath.endsWith('/') ? remotePath : remotePath + '/') + file.filename;
    var uploadedFile = uploadedFiles.find(e => e.path === filePath);
    var isSelected = selectedFiles.some(e => e.path === filePath);

    const toggleFile = () => {
        isSelected = !isSelected;
        isSelected ? addSelectedFile(filePath) : removeSelectedFile(filePath);
    };

    return (
        <li className="node">
            <div className="node-header justify-content-between">
                <label className="w-100">
                    <input type="checkbox" className="form-check-input mb-1 ms-1" checked={isSelected} onChange={toggleFile}></input>
                    <i className={`${getFileIcon(file.filename)} text-primary mx-2`}></i> {file.filename}
                </label>
                {uploadedFile && (
                    <span className="badge bg-success rounded-pill" >
                        <smal className="align-text-top">{uploadedFile.documentTypeName}</smal>
                        <CloseButton variant="white" aria-label="Remove" className='btn-sm mx-1' onClick={() => removeUploadedFile(filePath)} />
                    </span>
                )}
            </div>
        </li>
    );
};

const FolderNode = ({ folder, remotePath, updateRemotePath }) => {
    if (folder == null || folder.filename == null || folder.filename === ".") return null;

    const onClickFolder = () => {
        // filter(Boolean) drops empty segments so we never build "//" or duplicate paths.
        var parts = remotePath.split("/").filter(Boolean);
        folder.filename === ".." ? parts.pop() : parts.push(folder.filename);
        updateRemotePath("/" + parts.join("/"));
    };

    return (
        <li className="node">
            <label className="node-header" onClick={onClickFolder}>
                <i className="bi bi-chevron-right ms-1"></i>
                <i className="fa-solid fa-folder text-primary mx-2"></i> {folder.filename}
            </label>
        </li>
    );
};

export default FileTree;
