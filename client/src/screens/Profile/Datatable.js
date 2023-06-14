import React from "react";
import DataCard from "./DataCard.js";
import { Container, Row, Pagination } from "react-bootstrap";
import { Button, ButtonGroup } from "rsuite";

const Datatable = ({ Datas, setSwitchState, switchState }) => {
  return (
    <>
      <Container
        className="border border-primary-500 rounded bg-primary-500"
        style={{ minHeight: "64vh" }}
      >
        <div className="mt-4">
          <ButtonGroup size="lg">
            <Button onClick={() => setSwitchState(1)} active={switchState}>
              Active Hints
            </Button>
            <Button onClick={() => setSwitchState(0)} active={!switchState}>
              Hints under review
            </Button>
          </ButtonGroup>
        </div>
        <Row>
          {Datas.map((d, index) => (
            <DataCard key={index} d={d} />
          ))}
        </Row>
      </Container>
    </>
  );
};

export default Datatable;
