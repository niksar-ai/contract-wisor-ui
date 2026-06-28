import React, { useState } from 'react';
import { Table} from 'react-bootstrap';

const DocumentTable = ({ documents, onShowEditModal}) => {
  

  return (
    <Table striped hover>
      <thead>
        <tr>
          <th>ID</th>
          <th>Document Name</th>
          <th>Page Count</th>
          <th>Size</th>
          <th>Text Content</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {documents.map(doc => (
          <tr key={doc.id}>
            <td className="single-line" title={doc.id}>{doc.id}</td>
            <td className="single-line" title={doc.name}>{doc.name}</td>
            <td className="single-line" title={doc.pagecount}>{doc.pagecount}</td>
            <td className="single-line" title={doc.size}>{doc.size}</td>
            <td className="single-line" title={doc.textcontent}>{doc.textcontent}</td>
            <td className="text-end">
              <button type="button" className="btn btn-outline-secondary mx-1" onClick={() => console.log("press tree button")}><i className="bi bi-bar-chart-steps"></i></button>
              <button type="button" className="btn btn-outline-secondary mx-1" onClick={() => onShowEditModal(doc)}><i className="bi bi-pencil-square"></i></button>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default DocumentTable;