import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Nav } from 'react-bootstrap';
import * as AppUrlConstant from '../../constants/app_url';

const Sidebar = () => {
    const location = useLocation();
    return (
        <Nav className="sidebar">
            <div className="d-flex align-items-center pb-3 border-bottom">
                <div className="flex-shrink-0"><img src='/assets/icons/logo.webp' height={40} /></div>
                <div className="flex-grow-1 fs-4 fw-bold">Contract Wisor</div>
            </div>
            <Nav.Item>
                <Nav.Link as={Link} to={AppUrlConstant.HOME_PAGE_URL} active={location.pathname === AppUrlConstant.HOME_PAGE_URL}>
                    <div className="d-flex align-items-center">
                        <div className="flex-shrink-0" style={{width: '2.5rem'}}><i className="bi bi-columns-gap"></i></div>
                        <div className="flex-grow-1">Dashboard</div>
                    </div>
                </Nav.Link>
            </Nav.Item>
            <Nav.Item>
                <Nav.Link as={Link} to={AppUrlConstant.UPLOAD_PAGE_URL} active={location.pathname === AppUrlConstant.UPLOAD_PAGE_URL}>
                    <div className="d-flex align-items-center">
                        <div className="flex-shrink-0" style={{width: '2.5rem'}}><i className="fa-solid fa-file-arrow-up"></i></div>
                        <div className="flex-grow-1">Upload Contract</div>
                    </div>
                </Nav.Link>
            </Nav.Item>
            <Nav.Item>
                <Nav.Link as={Link} to={AppUrlConstant.CONTRACT_LIST_PAGE_URL} active={location.pathname.startsWith(AppUrlConstant.CONTRACT_URL)}>
                    <div className="d-flex align-items-center">
                        <div className="flex-shrink-0" style={{width: '2.5rem'}}><i className="fa-solid fa-bars-staggered"></i></div>
                        <div className="flex-grow-1">Contracts</div>
                    </div>
                </Nav.Link>
            </Nav.Item>
            <Nav.Item>
                <Nav.Link as={Link} to={AppUrlConstant.ANALYSES_PAGE_URL} active={location.pathname === AppUrlConstant.ANALYSES_PAGE_URL}>
                    <div className="d-flex align-items-center">
                        <div className="flex-shrink-0"><i className="fa-solid fa-wand-magic-sparkles"></i></div>
                        <div className="flex-grow-1">Analyses</div>
                    </div>
                </Nav.Link>
            </Nav.Item>
            <Nav.Item>
                <Nav.Link as={Link} to={AppUrlConstant.CONTRACT_TYPE_PAGE_URL} active={location.pathname === AppUrlConstant.CONTRACT_TYPE_PAGE_URL}>
                    <div className="d-flex align-items-center">
                        <div className="flex-shrink-0" style={{width: '2.5rem'}}><i className="fa-solid fa-tags"></i></div>
                        <div className="flex-grow-1"> Contract Type</div>
                    </div>
                </Nav.Link>
            </Nav.Item>
            <Nav.Item>
                <Nav.Link as={Link} to={AppUrlConstant.WORKFLOW_PAGE_URL} active={location.pathname === AppUrlConstant.WORKFLOW_PAGE_URL}>
                    <div className="d-flex align-items-center">
                        <div className="flex-shrink-0" style={{width: '2.5rem'}}><i className="bi bi-shuffle"></i></div>
                        <div className="flex-grow-1">Workflow</div>
                    </div>
                </Nav.Link>
            </Nav.Item>
        </Nav>
    );
};

export default Sidebar;
