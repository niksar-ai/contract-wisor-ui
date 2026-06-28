import React, { useEffect, useState } from 'react';
import { Container, Card, CardHeader, CardBody, Row, Col, ProgressBar } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import * as AppUrlConstant from '../constants/app_url';
import { listDocumentLastUpdateApi, getDocumentStatisticsApi } from '../api/document_api';
import { listDocumentTypeTopDocumentCountApi, listDocumentTypeTopDocumentSizeApi } from '../api/document_type_api';
import { documentToBaseList, documentTypeTopDocumentCountToBaseList, } from '../utils/generator';
import { getVariantClass, getBgColorClass } from '../utils/util';
import { formatFileSize } from '../utils/formetter';
import DashboardWidget from '../components/dashboard_widget';
import List from '../components/base/base_list';

function DashboardPage() {
    const [documentList, setDocumentList] = useState([]);
    const [documentStatistic, setDocumentStatistic] = useState({});
    const [documentTypeListTopDocumentCount, setDocumentTypeListTopDocumentCount] = useState([]);
    const [documentTypeListTopDocumentSize, setDocumentTypeListTopDocumentSize] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        getDocumentStatisticsApi()
            .then(response => setDocumentStatistic(response))
            .catch(error => console.error(error));
        listDocumentLastUpdateApi()
            .then(response => setDocumentList(documentToBaseList(response, handleContractClick)))
            .catch(error => console.error(error));
        listDocumentTypeTopDocumentCountApi()
            .then(response => setDocumentTypeListTopDocumentCount(documentTypeTopDocumentCountToBaseList(response)))
            .catch(error => console.error(error));
        listDocumentTypeTopDocumentSizeApi()
            .then(response => setDocumentTypeListTopDocumentSize(response))
            .catch(error => console.error(error));
    }, []);

    const handleContractClick = (item) => {
        navigate(`${AppUrlConstant.CONTRACT_URL}${item.id}`);
    };

    return (
        <Col>
            <DashboardWidget data={documentStatistic} />
            <Row>
                <Col md={6}>
                    <Card className='my-3 h-100'>
                        <CardHeader className='d-flex justify-content-between align-items-center'>
                            <span>Last Contract List</span>
                            <a className='text-decoration-none small' href={AppUrlConstant.CONTRACT_LIST_PAGE_URL}>View All</a>
                        </CardHeader>
                        <CardBody>
                            {documentList.length > 0 && (<List list={documentList} />)}
                        </CardBody>
                    </Card>
                </Col>
                <Col md={6}>
                    <Card className='my-3 h-100'>
                        <CardHeader>Top Contract Types For Contract Count</CardHeader>
                        <CardBody><List list={documentTypeListTopDocumentCount} /></CardBody>
                    </Card>
                </Col>
            </Row>
            <Row className='my-3'>
                <Col md={8}>
                    <Card className='my-3 h-100'>
                        <CardBody>
                            <h6 className='my-3'>Using Storage</h6>
                            <ProgressBar>
                                {documentTypeListTopDocumentSize.map((item, index) =>
                                    <ProgressBar variant={getVariantClass(index)} now={item.sizeDocument} min={0} max={documentStatistic.totalDocumentSize} key={index} />
                                )}
                            </ProgressBar>
                            <div className='d-flex align-items-center mt-3'>
                                {documentTypeListTopDocumentSize.map((item, index) =>
                                    <div className='d-flex align-items-center me-3'>
                                        <span className={`badge rounded-pill p-2 me-1 ${getBgColorClass(index)}`}><span className="visually-hidden">{item.sizeDocument}</span></span>
                                        <div className='flex-1'>
                                            <p className='small fw-bold text-muted mb-0'>{item.name}</p>
                                            <small className='text-muted small'>({formatFileSize(item.sizeDocument)})</small>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </CardBody>
                    </Card>
                </Col>
                <Col md={4}>
                    <Card className='my-3 h-100'>
                        <div className="bg-holder bg-card" style={{ backgroundImage: 'url("/assets/images/card-bg/card-bg-5.png")' }}></div>
                        <CardBody className="d-flex justify-content-between align-items-center">
                            <Col className="ms-3">
                                <h6>Total Storages</h6>
                                <h1 className="text-success">{formatFileSize(documentStatistic.totalDocumentSize)}</h1>
                            </Col>
                            <Col>
                                <i className="fa-solid fa-database text-success" style={{ fontSize: 100 }}></i>
                            </Col>
                        </CardBody>
                    </Card>
                </Col>
            </Row>
        </Col>
    );
}

export default DashboardPage;