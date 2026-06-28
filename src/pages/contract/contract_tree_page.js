import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as AppUrlConstant from '../../constants/app_url';
import { Container, Card, CardHeader, CardBody, Row, Col, ButtonGroup, ToggleButton, CardFooter, Pagination } from 'react-bootstrap';
import { treeDocumentApi } from '../../api/document_api';
import { documentMergedToTree } from '../../utils/generator';
import Tree from '../../components/base/base_tree';
import ContractFilter from '../../components/contract/contract_filter';

function ContractTreePage() {
    const [documentTree, setDocumentTree] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        treeDocumentApi()
            .then(response => setDocumentTree(documentMergedToTree(response, handleContractClick)))
            .catch(error => console.error(error));
    }, []);

    const handleViewModeButtonClick = (url) => { navigate(url); };
    const handleContractClick = (item) => { navigate(`${AppUrlConstant.CONTRACT_URL}${item.id}`); };

    return (
        <Row>
            <Col md={9}>
                <Card>
                    <CardHeader className='d-flex justify-content-between align-items-center'>
                        <h5><i className="fa-solid fa-file-contract me-2"></i>Contracts</h5>
                        <ButtonGroup>
                            <ToggleButton type="radio" variant='outline-secondary' checked={false} onClick={() => handleViewModeButtonClick(AppUrlConstant.CONTRACT_LIST_PAGE_URL)}><i className="fa-solid fa-list"></i></ToggleButton>
                            <ToggleButton type="radio" variant='outline-secondary' checked={true} onClick={() => handleViewModeButtonClick(AppUrlConstant.CONTRACT_TREE_PAGE_URL)}><i className="fa-solid fa-folder-tree"></i></ToggleButton>
                            <ToggleButton type="radio" variant='outline-secondary' checked={false} onClick={() => handleViewModeButtonClick(AppUrlConstant.CONTRACT_TABLE_PAGE_URL)}><i className="fa-solid fa-table"></i></ToggleButton>
                        </ButtonGroup>
                    </CardHeader>
                    <CardBody className='overflow-auto py-0' style={{ height: 'calc(100vh - 210px)' }}>
                        <Tree data={documentTree} isAllOpen={true} />
                    </CardBody>
                </Card>
            </Col>
            <Col md={3}>
                <ContractFilter />
            </Col>
        </Row>
    );
}

export default ContractTreePage;