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
        <div className="fs-5 text-start px-4">
          {d.qname ? d.qname : d.qlink.slice(8, 40) + "..."}
        </div>
        <p className="text-start px-4">
          {d.platform ? d.platform : d.qlink.split("/")[2]}
        </p>
      </div>
    </Col>
  );
};

export default DataCard;
