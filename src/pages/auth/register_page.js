import React, { useState } from 'react';
import { Container, Card, CardBody, Row, Col, Form } from 'react-bootstrap';
import * as AppUrlConstant from '../../constants/app_url';
import { postData } from '../../api/core_api';


const RegisterPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  const handleRegister = async (e) => {
    e.preventDefault();
    setError('');
    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }
    try {
      await postData('/auth/register', { name, surname: '', email, password });
      window.location.href = AppUrlConstant.LOGIN_PAGE_URL;
    } catch (err) {
      setError('Registration failed. The email may already be in use.');
    }
  };

  return (
    <Container>
      <Row className='min-vh-100 flex-center g-0'>
        <Col lg={8} xxl={8} className='position-relative py-3'>
          <img className="bg-auth-circle-shape" src="/assets/images/illustration/bg-shape.png" alt="" width="250"></img>
          <img className="bg-auth-circle-shape-2" src="/assets/images/illustration/bg-shape-1.png" alt="" width="150"></img>
          <Card className='overflow-hidden z-1'>
            <CardBody className='p-0'>
              <Row className='g-0 h-100'>
                <Col md={5} className='text-center bg-primary'>
                  <div className="position-relative p-5">
                    <div className="bg-auth-card-shape" style={{ backgroundImage: 'url("/assets/images/illustration/half-circle.png")' }}></div>
                    <div className="position-relative">
                      <p className="text-light mb-4 font-sans-serif fs-3 fw-bolder">CONTRACT WISOR</p>
                      <p className="opacity-75 text-white mt-5">Empower your contracts with Contract Wisor. Secure your future with the support of artificial intelligence.</p>
                    </div>
                  </div>
                  <div className="mt-3 mb-4 mt-md-4 mb-md-5">
                    <p className="text-white">Have an account?<br /><a className="text-decoration-underline link-light" href={AppUrlConstant.LOGIN_PAGE_URL}>Login</a></p>
                    <p className="mb-0 mt-4 mt-md-5 fs-10 fw-semi-bold text-white opacity-75">Copyright © 2024 Niksar AI. All rights reserved.</p>
                  </div>
                </Col>
                <Col md={7} className='d-flex flex-center'>
                  <div className="p-3 p-md-5 flex-grow-1">
                    <h3 className="mb-3">Register</h3>
                    <Form >
                      <div className="mb-3"><label className="form-label" for="card-name">Name</label><input className="form-control" type="text" autocomplete="on" id="card-name" value={name} onChange={(e) => setName(e.target.value)} /></div>
                      <div className="mb-3"><label className="form-label" for="card-email">Email address</label><input className="form-control" type="email" autocomplete="on" id="card-email" value={email} onChange={(e) => setEmail(e.target.value)} /></div>
                      <div className="row gx-2">
                        <div className="mb-3 col-sm-6"><label className="form-label" for="card-password">Password</label><input className="form-control" type="password" autocomplete="on" id="card-password" value={password} onChange={(e) => setPassword(e.target.value)} /></div>
                        <div className="mb-3 col-sm-6"><label className="form-label" for="card-confirm-password">Confirm Password</label><input className="form-control" type="password" autocomplete="on" id="card-confirm-password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} /></div>
                      </div>
                      {error && <div className="text-danger mb-2 small">{error}</div>}
                      <div className="mb-3"><button className="btn btn-primary d-block w-100 mt-3" type="submit" name="submit" onClick={handleRegister}>Register</button></div>
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

export default RegisterPage;
