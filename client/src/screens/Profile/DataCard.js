import React from "react";
import { Col } from "react-bootstrap";
import "./DataCard.css";

const DataCard = ({ d }) => {
  return (
    <Col xs={6}>
      <div
        className="pt-2 my-2 rounded border-bottom"
        id="Card"
        style={{ height: "4rem" }}
      >
        <div className="fs-5 text-start px-4">{d.qname}</div>
        <p className="text-start px-4">{d.platform}</p>
      </div>
    </Col>
  );
};

export default DataCard;
