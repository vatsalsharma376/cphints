import React, { useState } from "react";
import { Accordion, Container } from "react-bootstrap";
import Navbar from "../../components/navbar";
import { FloatingLabel, Form, Button } from "react-bootstrap";

const Contribute = () => {
  const [ipFields, setIPFields] = useState([0]);
  const [num, setNum] = useState(1);

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

  return (
    <>
      <div style={{ backgroundColor: "#0d0e14", minHeight: "100vh" }}>
        <Navbar bg="black" />

        <Container>
          <h1 className="text-white text-start mt-5">Contribute a Hint</h1>

          <Form>
            <FloatingLabel
              controlId="floatingInput"
              label="Enter the question link"
              className="my-4"
              style={{ width: "55%" }}
            >
              <Form.Control type="text" placeholder="www.example.com" />
            </FloatingLabel>

            {ipFields.map((ipFiled, i) => {
              return (
                <div className="d-flex">
                  <Accordion style={{ width: "40%" }} className="my-2 me-3">
                    <Accordion.Item eventKey="0">
                      <Accordion.Header>Hint {i + 1}</Accordion.Header>
                      <Accordion.Body>
                        <FloatingLabel
                          controlId="floatingTextarea"
                          label={"Hint " + (i + 1)}
                          className="my-3"
                          style={{ width: "100%" }}
                          key={i}
                        >
                          <Form.Control
                            as="textarea"
                            type="text"
                            placeholder="Enter Hint"
                            style={{ height: "100px" }}
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
            <Button variant="submit" className="d-block btn-purplee mt-4 ">
              Submit
            </Button>
          </Form>
        </Container>
      </div>
    </>
  );
};

export default Contribute;