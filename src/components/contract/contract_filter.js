import { Card, CardHeader, CardBody, Button, CardFooter, Form, Row, Col } from 'react-bootstrap';
import { booleanOptions } from '../../utils/ref_data';


function ContractFilter() {
    const handleSubmit = (event) => {
        event.preventDefault();
        // onSubmit({ ...contract, metadata: metadata });
    };

    return (
        <Card className='h-100'>
            <CardHeader>Filter</CardHeader>
            <CardBody>
                <Form onSubmit={handleSubmit}>
                    <Form.Group as={Col} controlId="name" className="mb-3">
                        <Form.Label>Name</Form.Label>
                        <Form.Control type="text" name="name"  placeholder='Search contract name'/>
                    </Form.Group>
                    <Form.Group as={Col} controlId="documentType" className="mb-3">
                        <Form.Label>Contract Type</Form.Label>
                        <Form.Select name="documentType">
                            <option>Choose...</option>
                            {/* {booleanOptions.map((company) => <option key={company.value} value={company.value}>{company.label}</option>)} */}
                        </Form.Select>
                    </Form.Group>
                    <Form.Group as={Col} controlId="metadata" className="mb-3">
                        <Form.Label>Metadata Exist</Form.Label>
                        <Form.Select name="metadata">
                            <option>Choose...</option>
                            {booleanOptions.map((company) => <option key={company.value} value={company.value}>{company.label}</option>)}
                        </Form.Select>
                    </Form.Group>
                    <Row className="mb-3">
                        <Form.Label>Create Date</Form.Label>
                        <Form.Group as={Col} controlId="startCareateDate">
                            <Form.Control type="date" name="startCareateDate" placeholder='start'/>
                        </Form.Group>
                        <Form.Group as={Col} controlId="endCareateDate">
                            <Form.Control type="date" name="endCareateDate" placeholder='end'/>
                        </Form.Group>
                    </Row>
                    <Row className="mb-3">
                        <Form.Label>Update Date</Form.Label>
                        <Form.Group as={Col} controlId="startUpdateDate">
                            <Form.Control type="date" name="startUpdateDate" placeholder='start'/>
                        </Form.Group>
                        <Form.Group as={Col} controlId="endUpdateDate">
                            <Form.Control type="date" name="endUpdateDate" placeholder='end'/>
                        </Form.Group>
                    </Row>
                    <Row className="mb-3">
                        <Form.Label>Contract Size</Form.Label>
                        <Form.Group as={Col} controlId="minSize">
                            <Form.Control type="number" name="minSize" placeholder='min'/>
                        </Form.Group>
                        <Form.Group as={Col} controlId="maxSize">
                            <Form.Control type="number" name="maxSize" placeholder='max'/>
                        </Form.Group>
                    </Row>
                </Form>
            </CardBody>
            <CardFooter><Button className='w-100'>Filter</Button></CardFooter>
        </Card>
    );
}

export default ContractFilter;