import React,{useRef} from 'react';
import { Link } from 'react-router-dom';
import NavBar from "../../components/navbar";
import Container from 'react-bootstrap/Container';
import Image from "react-bootstrap/Image";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col'
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import sign_up_pic from '../../assets/images/signup.svg';
import backendUrl from '../../../src/constants.js';
import axios from 'axios';
function Login() {
  const id = useRef(null);
  const password = useRef(null);
  const handleLogin = ()=>{
    // login using backendUrl/login using axios
    // if successfull redirect to home page
    // else show error
    const data = {
      id:id.current.value,
      password:password.current.value
    };
    // use axios
    axios.post(`${backendUrl}/users/login/`,data)
    .then((res)=>{
      alert(`Hello ${res.data.name}`)
    })
    .catch((err)=>{
      alert(`Error: ${err.message} `);
    })
  }
  return (
    <>
    <NavBar bg="black"  />
    <Container>
    <Row >
        <Col md={{ span: 4,offset: 2 }} style={{marginTop:'12%', marginLeft:"15%"}}>
        <div className='mb-5'>
            <h1>Log in</h1>
        </div>  
        <FloatingLabel controlId="floatingInput" label="UserName/Email" className="mb-3">
        <Form.Control ref={id} type="email" placeholder="name@example.com" />
        </FloatingLabel>
      <FloatingLabel controlId="floatingPassword" label="Password" className="mb-3">
        <Form.Control ref={password} type="password" placeholder="Password" />
      </FloatingLabel>
      
      <Button variant="primary" className='bg-primary-300' onClick={handleLogin}>Log in</Button>{' '}
      <p className='mt-1 text-muted'>
        <Link to="/signup">Don't have a account?</Link>
      </p>
      </Col>
      <Col className='d-flex ' > 
        <Image src={sign_up_pic} style={{width:'70%',height:"60%",marginTop:"25%"}} rounded />
        </Col>
        </Row>
        
      </Container>
    </>
  );
}

export default Login;