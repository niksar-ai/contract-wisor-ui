import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardBody, Row, Col, Button, ButtonGroup, CardFooter } from 'react-bootstrap';
import { getFileIcon } from '../../utils/util';
import { formatFileSize } from '../../utils/formetter';

const ContractRelationList = ({ list, onSubmit }) => {
    const [relations, setRelations] = useState(list);

    return (
        relations.map(relation =>
            <Card className='mb-3'>
                <CardBody>
                    <div className='d-flex align-items-center'>
                        <div className="fs-4 text-primary mx-2"><i className={getFileIcon(relation.child.name)}></i></div>
                        <div className='flex-1 mx-2'>
                            <div className="fw-bold fs-5">{relation.child.name}</div>
                            <small className="text-muted">{formatFileSize(relation.child.size)}</small>
                        </div>
                        <Button variant="outline-danger" className='ms-auto' title='Delete'><i className="fa-regular fa-trash-can"></i></Button>
                    </div>
                </CardBody>
            </Card>
        )
    );
};

export default ContractRelationList;
