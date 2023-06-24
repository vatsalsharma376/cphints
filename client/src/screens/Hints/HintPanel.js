import React from "react";
import { Row, Col, Card } from "react-bootstrap";
import { HandThumbsUp, HandThumbsDown , CaretDown,CaretUp} from "react-bootstrap-icons";
import { ListGroup, Stack } from "react-bootstrap";
const tags = ["tag1", "tag2", "tag3", "tag4", "tag5", "tag6", "tag7", "tag8"];
const HintPanel = ({ bgColor }) => {
  return (
    <Col xs={4}>
      <div
        style={{ backgroundColor: bgColor}}
        className="rounded m-4"
      >
        <CaretUp size={30}/>
        30
        <CaretDown size={30}/>
        2
      </div>
    </Col>
  );
};

export default HintPanel;
