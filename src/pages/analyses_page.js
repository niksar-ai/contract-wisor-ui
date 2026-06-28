import React, { useState } from 'react';
import { Container, Row, Col, Card, } from 'react-bootstrap';

function AnalysesPage() {
    const [fileStructure, setFileStructure] = useState([]);

    const getFileList = (value) => { };

    return (
        <Container>
            <h1 className=" my-3">Analyses</h1><hr />
            {fileStructure.length > 0 && (
                <Card>
                </Card>
            )}
        </Container>
    );
}

export default AnalysesPage;