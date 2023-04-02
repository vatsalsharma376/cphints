import React from "react";
import { Link } from 'react-router-dom';
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
const navbar = (props) => {
  // props.bg = "red";
  const bgcolor = `bg-${props.bg}`;
  return (
    <div className={bgcolor}>
    <Container>

    <Navbar expand="lg">
    <Link to="/">
        <Navbar.Brand href="#" className="text-primary-500">
          <Image src={logo} height="50"/>
        </Navbar.Brand>
        </Link>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: '100px' }}
            navbarScroll
          >
            <Link to="/">
            <Nav.Link href="#action1" className="fs-4 text-white">
              Home
              </Nav.Link>
              </Link>
            <Nav.Link href="#action2" className="fs-4 text-white">Problems</Nav.Link>
           
            <Nav.Link href="#" className="fs-4 text-white">
              About
            </Nav.Link>
          </Nav>
          
        </Navbar.Collapse>

          {/* <Form className="d-flex">
          
            <Form.Control
              type="search"
              placeholder="Search"
              className="me-2"
              aria-label="Search"
            />
            <Button className="ml-1"><Search className="text-white" /></Button>
          </Form> */}
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
            <Link to="/login"><Button variant="purplee" className="mx-3">Sign In</Button></Link>
    </Navbar>
    </Container>
    </div>
  );
};

export default navbar;
