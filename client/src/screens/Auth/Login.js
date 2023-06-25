import React, { useRef, useState, useLayoutEffect } from "react";
import { Link } from "react-router-dom";
import NavBar from "../../components/Navbar";
import Container from "react-bootstrap/Container";
import Image from "react-bootstrap/Image";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import sign_up_pic from "../../assets/images/signup.svg";
import backendUrl from "../../../src/constants.js";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Login() {
  const id = useRef(null);
  const password = useRef(null);
  const [btnDisable, setbtnDisable] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = async () => {
    // login using backendUrl/login using axios
    // if successfull redirect to home page
    // else show error
    const data = {
      id: id.current.value,
      password: password.current.value,
    };
    // use axios
    setbtnDisable(true);
    const resp = await axios.post(`${backendUrl}/users/login/`, data);
    if (resp.status === 200) {
      console.log("Successfully logged in!");
      localStorage.setItem("token", resp.data.accessToken);
      window.location.href = "/profile";
      return Promise.resolve();
    } else {
      console.log("Error loggin in!");
      return Promise.reject(new Error("Whoops!"));
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const loginToast = await toast.promise(handleLogin, {
        pending: "The login is yet to go through",
        success: "You are logged in successfully",
        error: "Incorrect username or password",
      });
      setbtnDisable(false);
    } catch (e) {
      setbtnDisable(false);
    }
  };

  useLayoutEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      window.location.href = "/";
    }
  }, []);
  return (
    <>
      <NavBar bg="black" />
      <Container>
        <Row>
          <Col
            md={{ span: 4, offset: 2 }}
            style={{ marginTop: "12%", marginLeft: "15%" }}
          >
            <div className="mb-5">
              <h1>Log in</h1>
            </div>
            <FloatingLabel
              controlId="floatingInput"
              label="UserName/Email"
              className="mb-3"
            >
              <Form.Control
                ref={id}
                type="email"
                placeholder="name@example.com"
              />
            </FloatingLabel>
            <FloatingLabel
              controlId="floatingPassword"
              label="Password"
              className="mb-3"
            >
              <Form.Control
                ref={password}
                type="password"
                placeholder="Password"
              />
            </FloatingLabel>
            <Button
              variant="primary"
              className="bg-primary-300"
              onClick={handleSubmit}
              disabled={btnDisable}
            >
              Log in
            </Button>{" "}
            <p className="mt-1 text-muted">
              <Link to="/signup">Don't have a account?</Link>
            </p>
          </Col>
          <Col className="d-flex ">
            <Image
              src={sign_up_pic}
              style={{ width: "70%", height: "60%", marginTop: "25%" }}
              rounded
            />
          </Col>
        </Row>
      </Container>
      <ToastContainer theme="dark" limit={3} />
    </>
  );
}

export default Login;
