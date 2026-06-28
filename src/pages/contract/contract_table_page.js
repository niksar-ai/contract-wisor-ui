import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import * as AppUrlConstant from '../../constants/app_url';
import { Card, CardHeader, CardBody, Row, Col, Button, ButtonGroup, ToggleButton, CardFooter, Pagination } from 'react-bootstrap';
import { listDocumentApi } from '../../api/document_api';
import { documentToBaseList, } from '../../utils/generator';
import List from '../../components/base/base_list';
import ContractFilter from '../../components/contract/contract_filter';

function ContractTablePage() {
    const [searchParams, setSearchParams] = useSearchParams();
    const [documentList, setDocumentList] = useState([]);
    const [pagination, setPagination] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        listDocumentApi({ page: searchParams.get("page") })
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


    const handleViewModeButtonClick = (url) => { navigate(url); };
    const handleContractClick = (item) => { navigate(`${AppUrlConstant.CONTRACT_URL}${item.id}`); };
    const setPageNumber = (pageNumber) => {
        searchParams.set('page', pageNumber);
        setSearchParams(searchParams);
    };

    return (
        <Row>
            <Col md={9}>
                <Card>
                    <CardHeader className='d-flex justify-content-between align-items-center'>
                        <h5><i className="fa-solid fa-file-contract me-2"></i>Contracts</h5>
                        <ButtonGroup>
                            <ToggleButton type="radio" variant='outline-secondary' checked={false} onClick={() => handleViewModeButtonClick(AppUrlConstant.CONTRACT_LIST_PAGE_URL)}><i className="fa-solid fa-list"></i></ToggleButton>
                            <ToggleButton type="radio" variant='outline-secondary' checked={false} onClick={() => handleViewModeButtonClick(AppUrlConstant.CONTRACT_TREE_PAGE_URL)}><i className="fa-solid fa-folder-tree"></i></ToggleButton>
                            <ToggleButton type="radio" variant='outline-secondary' checked={true} onClick={() => handleViewModeButtonClick(AppUrlConstant.CONTRACT_TABLE_PAGE_URL)}><i className="fa-solid fa-table"></i></ToggleButton>
                        </ButtonGroup>
                    </CardHeader>
                    <CardBody className='overflow-auto py-0' style={{ height: 'calc(100vh - 265px)' }}>
                        <List list={documentList} />
                    </CardBody>
                    <CardFooter className='d-flex justify-content-center'>
                        <Pagination className='my-0'>{pagination}</Pagination>
                    </CardFooter>
                </Card>
            </Col>
            <Col md={3}>
                <ContractFilter />
            </Col>
        </Row>
    );
}

export default ContractTablePage;