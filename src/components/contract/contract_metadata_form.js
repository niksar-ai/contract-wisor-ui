import React, { useState, useEffect } from 'react';
import { Button, Form, Row, Col } from 'react-bootstrap';
import { companies, relationTypes } from '../../utils/ref_data';

const ContractMetaDataForm = ({ contract, onSubmit }) => {
    const [metadata, setMetadata] = useState({});

    useEffect(() => {
        if (contract.metadata) {
            setMetadata(contract.metadata);
        } else {
            setMetadata({});
        }

    }, []);

    const handleInputChange = (event) => {
        event.preventDefault();
        const { name, value, type, checked } = event.target;
        setMetadata({ ...metadata, [name]: type === 'checkbox' ? checked : value, });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        onSubmit({ ...contract, metadata: metadata });
    };

    return (
        <Form onSubmit={handleSubmit} className='position-relative'>
            <Row className="mb-3">
                <Form.Group as={Col} controlId="company">
                    <Form.Label>Company</Form.Label>
                    <Form.Select name="company" value={metadata.company} onChange={handleInputChange}>
                        <option>Choose...</option>
                        {companies.map((company) => (
                            <option key={company.value} value={company.value}>
                                {company.label}
                            </option>
                        ))}
                    </Form.Select>
                </Form.Group>
                <Form.Group as={Col} controlId="expiryDate" className="mb-3">
                    <Form.Label>Expiry Date</Form.Label>
                    <Form.Control type="date" name="expiryDate" value={metadata.expiryDate} onChange={handleInputChange} />
                </Form.Group>
            </Row>
            <Row className="mb-3">
                <Form.Group as={Col} md="6" controlId="description">
                    <Form.Label>Description</Form.Label>
                    <Form.Control as="textarea" rows={3} placeholder="Description" name="description" value={metadata.description} onChange={handleInputChange} />
                </Form.Group>
                <Form.Group as={Col} md="6" controlId="relationType" className="mb-3">
                    <Form.Label>Relation Type</Form.Label>
                    <Form.Select name="relationType" value={metadata.relationType} onChange={handleInputChange}>
                        <option value="">Choose...</option>
                        {relationTypes.map((type) => (
                            <option key={type.value} value={type.value}>{type.label}</option>
                        ))}
                    </Form.Select>
                    <Row className="mt-3">
                        <Form.Group as={Col} md="6" controlId="expiredContract">
                            <Form.Check type="switch" label="Expired Contract" name="expiredContract" checked={metadata.expiredContract} onChange={handleInputChange} />
                        </Form.Group>
                        <Form.Group as={Col} md="6" controlId="amended">
                            <Form.Check type="switch" label="Amended" name="amended" checked={metadata.amended} onChange={handleInputChange} />
                        </Form.Group>
                    </Row>
                </Form.Group>
            </Row>
        </Form>
    );
};

export default ContractMetaDataForm;
