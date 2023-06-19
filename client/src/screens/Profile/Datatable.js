import React from "react";
import DataCard from "./DataCard.js";
import { Container, Row, Image } from "react-bootstrap";
import { Button, ButtonGroup } from "rsuite";
import noData from "../../assets/images/noData.svg";

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
          {Datas?.length ? (
            Datas?.map((d, index) => <DataCard key={index} d={d} />)
          ) : (
            <div
              className="d-flex justify-content-center align-content-ceter"
              style={{ height: "50vh" }}
            >
              <Image src={noData} />
            </div>
          )}
        </Row>
      </Container>
    </>
  );
};

export default Datatable;
