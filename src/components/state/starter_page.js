import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card, Button, Form, CardBody, CardHeader, CardFooter } from 'react-bootstrap';

function StarterPage({title, message}) {
    return (
        <div className="card">
            <div className="card-body p-lg-6">
                <div className="row align-items-center">
                    <div className="col-lg-6 my-5"><img className="img-fluid h-100" src="./assets/images/empty-page.png" alt="" /></div>
                    <div className="col-lg-6 ps-lg-4 my-5 text-center text-lg-start">
                        <h3 className="text-primary">{title}</h3>
                        <p className="lead">{message}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default StarterPage;