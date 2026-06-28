import React, { useState } from 'react';
import { Container, Card, CardBody, Row, Col, Form } from 'react-bootstrap';
import * as AppUrlConstant from '../../constants/app_url';
import { postData } from '../../api/core_api';


const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();
        setError('');
        try {
            // Backend accepts an email or a username in the "username" field.
            const res = await postData('/auth/login', { username: email, password });
            if (!res || !res.accessToken) throw new Error('No token in response');
            localStorage.setItem('token', res.accessToken);
            if (res.refreshToken) localStorage.setItem('refreshToken', res.refreshToken);
            window.location.href = AppUrlConstant.HOME_PAGE_URL;
        } catch (err) {
            setError('Invalid email or password.');
        }
    };

    return (
        <Container>
            <Row className='min-vh-100 flex-center g-0'>
                <Col lg={8} xxl={7} className='position-relative py-3'>
                    <img className="bg-auth-circle-shape" src="/assets/images/illustration/bg-shape.png" alt="" width="250"></img>
                    <img className="bg-auth-circle-shape-2" src="/assets/images/illustration/bg-shape-1.png" alt="" width="150"></img>
                    <Card className='overflow-hidden z-1'>
                        <CardBody className='p-0'>
                            <Row className='g-0 h-100'>
                                <Col md={6} className='text-center bg-primary'>
                                    <div className="position-relative p-5">
                                        <div className="bg-auth-card-shape" style={{ backgroundImage: 'url("/assets/images/illustration/half-circle.png")' }}></div>
                                        <div className="position-relative">
                                            <p className="text-light mb-4 font-sans-serif fs-3 fw-bolder">CONTRACT WISOR</p>
                                            <p className="opacity-75 text-white mt-5">Manage your contracts at the speed of the digital world with Contract Wisor. Save time and stay secure with smart technology.</p>
                                        </div>
                                    </div>
                                    <div className="mt-3 mb-4 mt-md-4 mb-md-5">
                                        <p className="text-white">Don't have an account?<br /><a className="text-decoration-underline link-light" href={AppUrlConstant.REGISTER_PAGE_URL}>Register</a></p>
                                        <p className="mb-0 mt-4 mt-md-5 fs-10 fw-semi-bold text-white opacity-75">Copyright © 2024 Niksar AI. All rights reserved.</p>
                                    </div>
                                </Col>
                                <Col md={6} className='d-flex flex-center'>
                                    <div className="p-3 p-md-5 flex-grow-1">
                                        <h3 className="mb-3">Login</h3>
                                        <Form >
                                            <div className="mb-3">
                                                <label className="form-label" for="card-email">Email address</label>
                                                <input className="form-control" id="card-email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                                            </div>
                                            <div className="mb-3">
                                                <div className="d-flex justify-content-between">
                                                    <label className="form-label" for="card-password">Password</label>
                                                </div>
                                                <input className="form-control" id="card-password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                                            </div>
                                            <div className="row flex-between-center">
                                                <div className="col-auto">
                                                    <div className="form-check mb-0"><input className="form-check-input" type="checkbox" id="card-checkbox" checked="checked" /><label className="form-check-label mb-0" for="card-checkbox">Remember me</label></div>
                                                </div>
                                                <div className="col-auto"><a className="fs-10" href={AppUrlConstant.FORGOT_PASSWORD_PAGE_URL}>Forgot Password?</a></div>
                                            </div>
                                            {error && <div className="text-danger mb-2 small">{error}</div>}
                                            <div className="mb-3"><button className="btn btn-primary d-block w-100 mt-3" type="submit" name="submit" onClick={handleLogin}>Log in</button></div>
                                        </Form>
                                    </div>
                                </Col>
                            </Row>
                        </CardBody>
                    </Card>
                </Col>
            </Row>
        </Container >
    );
};

export default LoginPage;
