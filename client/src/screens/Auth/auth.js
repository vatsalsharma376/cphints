import React from 'react';
import NavBar from "../../components/navbar";
import Container from 'react-bootstrap/Container';
import Image from "react-bootstrap/Image";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col'
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import sign_up_pic from '../../assets/images/signup.svg';

function FormFloatingBasicExample() {
  return (
    <>
    <NavBar bg="black"  />
    <Container>
    <Row >
        <Col md={{ span: 4,offset: 2 }}>
        <div className='mt-5 mb-5'>
            <h1>Sign up</h1>
        </div>
        <FloatingLabel controlId="floatingInput" label="User Name" className="mb-3">
        <Form.Control type="email" placeholder="name@example.com" />
      </FloatingLabel><FloatingLabel controlId="floatingInput" label="Name" className="mb-3">
        <Form.Control type="email" placeholder="name@example.com" />
      </FloatingLabel><FloatingLabel controlId="floatingInput" label="Email address" className="mb-3">
        <Form.Control type="email" placeholder="name@example.com" />
      </FloatingLabel>
      <FloatingLabel controlId="floatingPassword" label="Password" className="mb-3">
        <Form.Control type="password" placeholder="Password" />
      </FloatingLabel>
      <FloatingLabel controlId="floatingPassword" label="Confirm Password" className="mb-3">
        <Form.Control type="password" placeholder="Password" />
      </FloatingLabel>
      <Button variant="primary" className='bg-primary-300'>Submit</Button>{' '}
      <p className='mt-1 text-muted'>Already have a account?</p>
      </Col>
      <Col className='d-flex ' >
        
        <Image src={sign_up_pic} style={{width:'70%',height:"60%",marginTop:"25%"}} rounded />
        </Col>
        </Row>
        
      </Container>
    </>
  );
}

export default FormFloatingBasicExample;