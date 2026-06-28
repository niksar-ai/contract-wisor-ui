import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card, Form, Button, InputGroup, CardBody, CardHeader, CardFooter } from 'react-bootstrap';
import { treeDocumentTypeApi, saveDocumentTypeApi, deleteDocumentTypeApi } from '../api/document_type_api';
import { documentTypeToTree } from '../utils/generator';
import Tree from '../components/base/base_tree';


const ContractTypePage = () => {
    const [treeData, setTreeData] = useState([]);
    const [newChildrenDocType, setNewChildrenDocType] = useState([""]);
    const [selectedNode, setSelectedNode] = useState({});

    useEffect(() => {
        getDocumentTypeTree();
    }, []);

    const getDocumentTypeTree = () => {
        treeDocumentTypeApi()
            .then(response => {
                let root = { id: null, name: "Root", children: response }
                setTreeData(documentTypeToTree([root], onNodeClick));
            })
            .catch(error => console.error('Error fetching tree data:', error));
    };

    const onNodeClick = (item) => {
        setSelectedNode(item);
    };

    const handleChilderenDocType = (index, value) => {
        const newList = [...newChildrenDocType];
        newList[index] = value;

        if (value && index === newChildrenDocType.length - 1) {
            newList.push('');
        }

        if (!value && index !== newChildrenDocType.length - 1) {
            newList.splice(index, 1);
        }

        setNewChildrenDocType(newList);
    };

    const handleSave = () => {
        const nonEmptyChildrenDocType = newChildrenDocType.filter(input => input.trim() !== '');
        selectedNode.children = [];
        nonEmptyChildrenDocType.forEach(item => {
            selectedNode.children.push({ id: null, name: item, parentId: selectedNode.id, children: [] })
        })
        saveDocumentTypeApi(selectedNode)
            .then(response => {
                getDocumentTypeTree();
                setSelectedNode({});
                setNewChildrenDocType([""]);
            })
            .catch(error => console.error(error));
    };

    const handleDelete = () => {
        deleteDocumentTypeApi(selectedNode.id)
            .then(response => {
                getDocumentTypeTree();
                setSelectedNode({});
                setNewChildrenDocType([""]);
            })
            .catch(error => console.error(error));
    }

    return (
        treeData.length > 0 && (
            <Row>
                <Col>
                    <Card>
                        <CardHeader><h5>Contract Type Tree</h5></CardHeader>
                        <CardBody><Tree data={treeData} isAllOpen={true} />
                        </CardBody>
                    </Card>
                </Col>
                {(selectedNode.id || selectedNode.name) && (
                    <Col md={4}>
                        <Card className='h-100'>
                            <CardHeader><h5>Contract Type Detail</h5></CardHeader>
                            <CardBody className='overflow-auto bg-card' style={{ backgroundImage: 'url("/assets/images/card-bg/card-bg-2.png")' }}>
                                {selectedNode.id && (
                                    <InputGroup className="mb-3">
                                        <InputGroup.Text><i className="bi bi-journal-bookmark-fill text-primary mx-1"></i></InputGroup.Text>
                                        <Form.Control value={selectedNode.name} onChange={(e) => setSelectedNode({ ...selectedNode, name: e.target.value })} />
                                    </InputGroup>
                                )}
                                {newChildrenDocType.map((value, index) => (
                                    <InputGroup className={selectedNode.id &&("mb-3 ps-5")}>
                                        <InputGroup.Text><i className="bi bi-journal-bookmark-fill text-primary mx-1"></i></InputGroup.Text>
                                        <Form.Control key={index} value={value} onChange={(e) => handleChilderenDocType(index, e.target.value)} placeholder="Add new sub document type" />
                                    </InputGroup>
                                ))}
                            </CardBody>
                            <CardFooter>
                                <Button variant="primary" className="w-100 my-2" onClick={handleSave}><i className="bi bi-floppy"></i> Save</Button>
                                <Button variant="outline-danger" className="w-100 my-2-3" onClick={handleDelete}><i className="bi bi-trash"></i> Delete</Button>
                            </CardFooter>
                        </Card>
                    </Col>
                )}
            </Row>
        )
    );
};

export default ContractTypePage;
