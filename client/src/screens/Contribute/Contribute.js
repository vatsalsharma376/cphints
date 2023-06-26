import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Accordion, Container } from "react-bootstrap";
import Navbar from "../../components/Navbar";
import { FloatingLabel, Form, Button } from "react-bootstrap";
import backendUrl from "../../../src/constants.js";
import axios from "axios";
import jwt_decode from "jwt-decode";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loading from "../../components/Loading";
const Contribute = () => {
  const [ipFields, setIPFields] = useState([0]);
  const [num, setNum] = useState(1);
  const [inputValues, setInputValues] = useState([]);
  const [isLoading, setisLoading] = useState(true);
  const [btnDisable, setbtnDisable] = useState(false);
  const [validated, setValidated] = useState(false);
  const qlink = useRef(null);
  const Navigate = useNavigate();
  const handleContribution = async () => {
    const token = await localStorage.getItem("token");
    // console.log(token);
    if (inputValues.length < 2) {
      // toast.error("Enter Atleast 2 hints properly");
      // return;
      return Promise.reject(new Error("Enter Atleast 2 hints properly"));
    }
    const data = {
      hints: inputValues,
      qlink: qlink.current.value,
    };

    // use axios
    // console.log(jwt_decode(token));
    // console.log(data);
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    const resp = await axios.post(`${backendUrl}/hints/`, data);
    if (resp.status === 201) {
      // console.log("Successfully logged in!");
      // console.log(resp.data);
      // localStorage.setItem("token", resp.data.accessToken);
      return Promise.resolve();
    } else {
      // console.log("Error loggin in!");
      return Promise.reject(new Error("Whoops!"));
    }
    // console.log(resp);
  };
  const handleSubmit = async (e) => {
    // e.preventDefault();
    const form = e.currentTarget;
    console.log(form.checkValidity);
    if (form.checkValidity === false) {
      e.stopPropagation();
    }
    console.log(validated);
    if (qlink.current.value.length <= 10) {
      toast.error("Enter question link");
      return;

      // return Promise.reject(new Error("Enter Atleast 2 hints properly"));
    }

    if (inputValues.length < 2) {
      toast.error("Enter Atleast 2 hints");
      return;

      // return Promise.reject(new Error("Enter Atleast 2 hints properly"));
    }
    if (inputValues[0].length < 2) {
      toast.error("Enter hints properly");
      return;

      // return Promise.reject(new Error("Enter Atleast 2 hints properly"));
    }
    if (inputValues[1].length < 2) {
      toast.error("Enter hints properly");
      return;

      // return Promise.reject(new Error("Enter Atleast 2 hints properly"));
    }

    setValidated(true);
    setbtnDisable(true);
    try {
      const ContributionToast = await toast.promise(handleContribution, {
        pending: "Your hints are being sent",
        success: "Your hints have been sent for review",
        error: "Your hints couldn't be added due to some error",
      });
      // setbtnDisable(false);
      setTimeout(() => {
        Navigate("/");
      }, 1000);
    } catch (e) {
      setbtnDisable(false);
    }
  };

  const handleAdd = () => {
    if (num >= 5) {
      return;
    }
    setNum((prev) => prev + 1);
    const New = [...ipFields, num];
    setIPFields(New);
  };

  const handleRemove = () => {
    if (num <= 1) {
      return;
    }

    setNum((prev) => prev - 1);
    ipFields.pop();
  };
  // check if user is logged in through local storage token else redirect him to home page
  useEffect(() => {
    const token = localStorage.getItem("token");
    // setisLoading(false);
    if (!token) {
      window.location.href = "/signup";
    } else {
      setisLoading(false);
    }
  }, []);

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <>
          <div style={{ backgroundColor: "#0d0e14", minHeight: "100vh" }}>
            <Navbar bg="black" />

            <Container>
              <h1 className="text-white text-start mt-5">Contribute a Hint</h1>

              <Form noValidate validated={validated}>
                <FloatingLabel
                  controlId="floatingInput"
                  label="Enter the question link"
                  className="my-4"
                  style={{ width: "55%" }}
                >
                  <Form.Control
                    type="text"
                    ref={qlink}
                    placeholder="www.example.com"
                    required
                  />
                  <Form.Control.Feedback type="invalid">
                    Please Enter the Question Link
                  </Form.Control.Feedback>
                </FloatingLabel>

                {ipFields.map((ipField, i) => {
                  return (
                    <div className="d-flex">
                      <Accordion style={{ width: "40%" }} className="my-2 me-3">
                        <Accordion.Item eventKey="0">
                          <Accordion.Header>
                            {i == 0 ? "Pre-requisite" : `Hint ${i + 1}`}
                          </Accordion.Header>
                          <Accordion.Body>
                            <FloatingLabel
                              controlId="floatingTextarea"
                              label={
                                i == 0
                                  ? "Pre-requisite (Enter comma seperated tags)"
                                  : "Hint " + (i + 1)
                              }
                              className="my-3"
                              style={{ width: "100%" }}
                              key={i}
                            >
                              <Form.Control
                                as="textarea"
                                type="text"
                                onChange={(event) => {
                                  const newInputValues = [...inputValues];
                                  newInputValues[i] = event.target.value;
                                  setInputValues(newInputValues);
                                }}
                                aria-required="true"
                                placeholder={
                                  i == 0
                                    ? "Pre-requisite (Enter comma seperated tags)"
                                    : "Enter Hint"
                                }
                                style={{ height: "100px" }}
                                required={i <= 2 ? "true" : "false"}
                              />
                            </FloatingLabel>
                          </Accordion.Body>
                        </Accordion.Item>
                      </Accordion>

                      {i === ipFields.length - 1 ? (
                        i !== 0 ? (
                          <Button
                            className="btn-danger text-white my-auto me-2"
                            size="lg"
                            style={{ width: "2.5em" }}
                            onClick={() => handleRemove()}
                          >
                            -
                          </Button>
                        ) : (
                          ""
                        )
                      ) : (
                        ""
                      )}

                      {i === ipFields.length - 1 ? (
                        i !== 4 ? (
                          <Button
                            className="btn-success text-white my-auto ms-1"
                            size="lg"
                            style={{ width: "2.5em" }}
                            onClick={() => handleAdd()}
                          >
                            +
                          </Button>
                        ) : (
                          ""
                        )
                      ) : (
                        ""
                      )}
                    </div>
                  );
                })}
                <Button
                  variant="submit"
                  className="d-block btn-purplee mt-4 "
                  onClick={handleSubmit}
                  disabled={btnDisable}
                >
                  Submit
                </Button>
              </Form>
            </Container>
          </div>
          <ToastContainer theme="dark" limit={3} />
        </>
      )}
    </>
  );
};

export default Contribute;
