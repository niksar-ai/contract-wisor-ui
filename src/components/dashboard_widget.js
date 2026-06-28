import React, { useEffect, useState } from 'react';
import * as AppUrlConstant from '../constants/app_url';
import { Gauge } from '@mui/x-charts/Gauge';

function DashboardWidget({ data }) {
    return (
        <div className="row mb-3">
            <div className="col-md-6">
                <div className="card h-100">
                    <div className=" card-body align-items-center h-100">
                        <div className='d-flex justify-content-start mb-3'>
                            <div>
                                <h6 className="text-primary mb-0">Welcome to </h6>
                                <h4 className="text-primary fw-bold mb-0">Contract Wisor <span className="text-info fw-medium">Dashboard</span></h4>
                                <small className="text-muted">Here are some quick links for you to start</small>
                            </div>
                            <img className="ms-n4 d-md-none d-lg-block" src="/assets/images/illustration/line-chart.png" alt="" width="150" />
                        </div>
                        <div className='d-flex justify-content-between'>
                            <div className="d-flex position-relative align-items-center">
                                <div className="border rounded-2 shadow-none py-1 px-2 me-2 text-primary">
                                    <i className="fa-solid fa-file-arrow-up"></i>
                                </div>
                                <div className="flex-1">
                                    <a className="text-decoration-none stretched-link text-primary " href={AppUrlConstant.UPLOAD_PAGE_URL}>
                                        <h6 className="mb-0 fw-bold">Upload Contract</h6>
                                    </a>
                                    <small className="text-muted">Upload your new contracts</small>
                                </div>
                            </div>
                            <div className="d-flex position-relative align-items-center">
                                <div className="border rounded-2 shadow-none py-1 px-2 me-2 text-warning">
                                    <i className="fa-solid fa-bars-staggered"></i>
                                </div>
                                <div className="flex-1">
                                    <a className="text-decoration-none stretched-link text-warning " href={AppUrlConstant.CONTRACT_LIST_PAGE_URL}>
                                        <h6 className="mb-0 fw-bold">Contracts</h6>
                                    </a>
                                    <small className="text-muted">List your contracts</small>
                                </div>
                            </div>
                            <div className="d-flex position-relative align-items-center">
                                <div className="border rounded-2 shadow-none py-1 px-2 me-2 text-success">
                                    <i className="fa-solid fa-wand-magic-sparkles"></i>
                                </div>
                                <div className="flex-1">
                                    <a className="text-decoration-none stretched-link text-success " href={AppUrlConstant.ANALYSES_PAGE_URL}>
                                        <h6 className="mb-0 fw-bold">Analyses</h6>
                                    </a>
                                    <small className="text-muted">Analyze your contracts</small>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="col-md-3">
                <div className="card h-100" >
                    <div className="bg-holder bg-card" style={{ backgroundImage: 'url("/assets/images/card-bg/card-bg-3.png")' }}></div>
                    <div className="card-body d-flex justify-content-evenly align-items-center">
                        <div className="col mx-4">
                            <h6>Contracts</h6>
                            <h1 className="text-warning">{data.totalDocumentCount}</h1>
                        </div>
                        <div className="col">
                            <i className="fa-solid fa-file-contract text-warning" style={{ fontSize: 80}}></i>
                        </div>
                    </div>
                </div>
            </div>
            <div className="col-md-3">
                <div className="card h-100" >
                    <div className="bg-holder bg-card" style={{ backgroundImage: 'url("/assets/images/card-bg/card-bg-4.png")' }}></div>
                    <div className="card-body d-flex justify-content-around align-items-center">
                        <div className="col-auto">
                            <h6>Metadata</h6>
                            <h1 className="text-info">{data.metadataRate}%</h1>
                        </div>
                        <div className="col-auto">
                            <Gauge width={150} height={80} value={data.metadataRate} startAngle={-90} endAngle={90} text={""} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default DashboardWidget