import React from "react";
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
// import NavDropdown from 'react-bootstrap/NavDropdown';
import {Search} from 'react-bootstrap-icons'
// import ButtonGroup from 'react-bootstrap/ButtonGroup';
import logo from '../assets/images/cphlogo.png';
import Image from 'react-bootstrap/Image';
const navbar = () => {
  return (
    <Navbar  expand="lg">
      <Container fluid>
        <Navbar.Brand href="#" className="text-primary-500">
          <Image src={logo} height="50"/>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: '100px' }}
            navbarScroll
          >
            <Nav.Link href="#action1" className="fs-4 text-primary-500">Home</Nav.Link>
            <Nav.Link href="#action2" className="fs-4 text-primary-500">Problems</Nav.Link>
           
            <Nav.Link href="#" className="fs-4 text-primary-500">
              Link
            </Nav.Link>
          </Nav>
          
        </Navbar.Collapse>

          <Form className="d-flex">
          
            <Form.Control
              type="search"
              placeholder="Search"
              className="me-2"
              aria-label="Search"
            />
            <Button className="ml-1"><Search className="text-white" /></Button>
          </Form>
          {/* <NavDropdown className="text-primary-500" title="Link" id="navbarScrollingDropdown">
              <NavDropdown.Item href="#action3">Action</NavDropdown.Item>
              <NavDropdown.Item href="#action4" >
                Another action
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action5">
                Something else here
              </NavDropdown.Item>

            </NavDropdown> */}
            <Button variant="purplee" >Contribute</Button>
            <Button variant="purplee" className="mx-3">Sign In</Button>
      </Container>
    </Navbar>
  );
};

export default navbar;
