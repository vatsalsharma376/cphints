import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
// import NavDropdown from 'react-bootstrap/NavDropdown';
import { Search } from "react-bootstrap-icons";
// import ButtonGroup from 'react-bootstrap/ButtonGroup';
import logo from "../assets/images/cphlogo.png";
import Image from "react-bootstrap/Image";
import Dropdownmenu from "./Dropmenu";
import "./Navbar.css";

const Navbars = (props) => {
  const [loggedIn, setLoggedIn] = useState(null);
  // check if token exists in local storage in useeffect
  useEffect(() => {
    const token_local = localStorage.getItem("token");
    if (token_local) {
      setLoggedIn(token_local);
    } else {
      setLoggedIn(null);
    }
  }, [loggedIn]);
  const handleLogout = () => {
    localStorage.removeItem("token");
    setLoggedIn(null);
    window.location.href = "/";
  };
  // props.bg = "red";
  const bgcolor = `bg-${props.bg}`;
  return (
    <div className={bgcolor}>
      <Container>
        <Navbar expand="lg">
          <Link to="/">
            <Navbar.Brand href="#" className="text-primary-500">
              <Image src={logo} height="50" />
            </Navbar.Brand>
          </Link>
          <Navbar.Toggle
            aria-controls="responsive-navbar-nav"
            style={{ backgroundColor: "#d9d9d9" }}
          />
          <Navbar.Collapse id="navbarScroll">
            <Nav
              className="navBar me-auto my-2 my-lg-0 align-items-center"
              navbarScroll
            >
              <Link to="/">
                <Nav.Link href="#action1" className="fs-4 text-white">
                  Home
                </Nav.Link>
              </Link>
              <Nav.Link href="/problems" className="fs-4 text-white">
                Problems
              </Nav.Link>

              <Nav.Link href="/leaderboard" className="fs-4 text-white">
                Leaderboard
              </Nav.Link>
            </Nav>

            <div className="login-btn">
              <Link to="/contribute">
                <Button variant="purplee" className="">
                  Contribute
                </Button>
              </Link>
              {loggedIn ? (
                <Dropdownmenu setLoggedIn={setLoggedIn} token={loggedIn}/>
              ) : (
                <Link to="/login">
                  <Button variant="purplee" className="">
                    Sign In
                  </Button>
                </Link>
              )}
            </div>
          </Navbar.Collapse>
        </Navbar>
      </Container>
    </div>
  );
};

export default Navbars;
