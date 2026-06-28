import React, { useEffect, useState } from 'react';
import { Card, CardHeader, CardBody, Row, Col, Button, ButtonGroup, ToggleButton, CardFooter, Pagination, Form, InputGroup } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { getFileIcon } from '../../utils/util';
import { formatFileSize } from '../../utils/formetter';
import { getDocumentByIdApi } from '../../api/document_api';
import ContractMetaDataForm from '../../components/contract/contract_metadata_form';
import ContractRelationList from '../../components/contract/contract_relation_list';
import SearchContractModal from '../../components/contract/search_contract_modal';

const ContractDetailPage = () => {
  const { id } = useParams();
  const [contract, setContract] = useState(null);
  const [isSearchModalShow, setSearchModalShow] = useState(false);

  useEffect(() => {
    getDocumentByIdApi(id)
      .then(response => setContract(response))
      .catch(error => console.error(error));
  }, [id]);

  return (
    contract && (
      <Row>
        <Col>
          <Card className='mb-3'>
            <div className="bg-holder bg-card" style={{ backgroundImage: 'url("/assets/images/card-bg/card-bg-2.png")' }}></div>
            <CardBody>
              <div className='d-flex align-items-center'>
                <div className="fs-1 text-primary mx-3"><i className={getFileIcon(contract.name)}></i></div>
                <div className='flex-1 mx-3'>
                  <div className="fw-bold fs-2">{contract.name}</div>
                  <small className="text-muted">{formatFileSize(contract.size)}</small>
                </div>
                <Button variant="outline-warning" className='ms-auto' title='Parse Contract'><i className="fa-solid fa-screwdriver-wrench me-2"></i>Parse</Button>
                <Button variant="outline-success" className='ms-2' title='Analyses Contract'><i className="fa-solid fa-wand-magic-sparkles me-2"></i>Analyses</Button>
                <Button variant="outline-secondary" className='ms-2' title='Download Contract'><i className="fa-solid fa-download me-2"></i>Download</Button>
                <Button variant="outline-danger" className='ms-2' title='Delete Contract'><i className="fa-regular fa-trash-can me-2"></i>Delete</Button>
              </div>
            </CardBody>
          </Card>
        </Col>
        <Col md={8}>
          <Card >
            <CardHeader>Contract Metadata</CardHeader>
            <CardBody>
              <div className="bg-holder bg-card" style={{ backgroundImage: 'url("/assets/images/card-bg/card-bg-4.png")' }}></div>
              <ContractMetaDataForm contract={contract} />
            </CardBody>
            <CardFooter>
              <Button variant="primary" className="w-100" type="submit"><i className="fa-regular fa-floppy-disk mx-2"></i>Save</Button>
            </CardFooter>
          </Card>
        </Col>
        <Col md={4}>
          <Card className='h-100'>
            <CardHeader>Relation Contract</CardHeader>
            <CardBody className='overflow-auto' >
              <div className="bg-holder bg-card" style={{ backgroundImage: 'url("/assets/images/card-bg/card-bg-5.png")' }}></div>
              <ContractRelationList list={contract.relations} />
            </CardBody>
            <CardFooter>
              <Button className='w-100' onClick={() => setSearchModalShow(true)}><i className="fa-solid fa-plus me-2"></i>Add Relation</Button>
            </CardFooter>
          </Card>
        </Col>
        <SearchContractModal show={isSearchModalShow} onHide={() => setSearchModalShow(false)}/>
      </Row>
    )
  );
};

export default ContractDetailPage;
