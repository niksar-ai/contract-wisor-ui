import React, { useEffect, useState } from 'react';
import { Modal, Card, CardHeader, CardBody, CardFooter, Row, Col, Button, Form, Pagination, InputGroup, CloseButton } from 'react-bootstrap';
import { listDocumentApi } from '../../api/document_api';
import { documentToBaseList, } from '../../utils/generator';
import { booleanOptions } from '../../utils/ref_data';
import List from '../../components/base/base_list';

function SearchContractModal(props) {
    const [searchParams, setSearchParams] = useState({});
    const [documentList, setDocumentList] = useState([]);
    const [pagination, setPagination] = useState([]);

    useEffect(() => {
        listDocumentApi({ page: searchParams.page })
            .then(response => {
                setDocumentList(documentToBaseList(response.records, handleContractClick));
                let items = [];
                for (let number = 1; number <= response.numPages; number++) {
                    items.push(<Pagination.Item key={number} active={number === response.current} onClick={() => setPageNumber(number)}>{number}</Pagination.Item>);
                }
                setPagination(items);
            })
            .catch(error => console.error(error));

    }, [searchParams]);

    const handleContractClick = (item) => { };
    const setPageNumber = (pageNumber) => {
        setSearchParams({ ...searchParams, page: pageNumber });
    };
    const handleFilter = (event) => {
        event.preventDefault();
        // onSubmit({ ...contract, metadata: metadata });
    };

    return (
        <Modal {...props} size="lg" centered >
            <Modal.Header className="p-0">
                <InputGroup >
                    <InputGroup.Text id="search"><i className="fa-solid fa-magnifying-glass mx-2"></i></InputGroup.Text>
                    <Form.Control className="p-3" placeholder="Search by contract name or contract type, etc." />
                    <InputGroup.Text id="close"><CloseButton className='mx-1' onClick={() => props.onHide()} /></InputGroup.Text>
                </InputGroup>
            </Modal.Header>
            <Modal.Body className='overflow-auto'>
                <List list={documentList} />
            </Modal.Body>
            <Modal.Footer className='d-flex justify-content-center'>
                <Pagination className='my-0'>{pagination}</Pagination>
            </Modal.Footer>
        </Modal>
    );
}

export default SearchContractModal;