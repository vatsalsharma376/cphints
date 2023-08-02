import React, { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import "./Hints.css";
import Stepper from "react-stepper-horizontal";

const RenderHint = ({ hint }) => {
  return (
    <>
      <div className="my-3 mx-2 p-1">
        <h4>{hint.title}</h4>
        <p>{hint.description}</p>
      </div>
    </>
  );
};

const HintsModal = (props) => {
  const [activeStep, setActiveStep] = useState(0);
  const steps = [
    { title: "Hint 1" },
    { title: "Hint 2" },
    { title: "hint 3" },
    { title: "hint 4" },
  ];

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      fullscreen="md-down"
    >
      <div
        style={{ backgroundColor: "#343a40" }}
        className="text-primary-white rounded"
      >
        <Modal.Header closeButton closeVariant="white">
          <Modal.Title id="contained-modal-title-vcenter">Hints</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div style={{ height: "30vh" }}>
            <Stepper
              steps={steps}
              activeStep={activeStep}
              activeColor="#17a2b8"
              defaultColor="#eee"
              completeColor="#bc6ff1"
              activeTitleColor="#fff"
              completeTitleColor="#eee"
              defaultTitleColor="#bbb"
              circleFontColor="#000"
              completeBarColor="#bc6ff1"
              circleFontSize={12}
            />
            <RenderHint hint={props.hints[activeStep]} />
          </div>
          <div className="d-flex justify-content-between mx-2">
            {activeStep > 0 && (
              <Button
                onClick={() => {
                  if (activeStep > 0) {
                    setActiveStep(activeStep - 1);
                  }
                }}
                variant="outline-primary-white fw-bold"
              >
                <i class="bi bi-arrow-left"></i>
              </Button>
            )}
            {activeStep < props.hints.length - 1 && (
              <Button
                onClick={() => {
                  if (activeStep < props.hints.length - 1) {
                    setActiveStep(activeStep + 1);
                  }
                }}
                variant="outline-primary-white"
                className="ms-auto"
              >
                <i class="bi bi-arrow-right fw-bold"></i>
              </Button>
            )}
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={props.onHide} variant="outline-danger">
            Close
          </Button>
        </Modal.Footer>
      </div>
    </Modal>
  );
};

export default HintsModal;
