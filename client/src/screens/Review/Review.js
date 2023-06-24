import React from "react";
import Accordion from "react-bootstrap/Accordion";
import { Container } from "react-bootstrap";
import ReviewItem from "./ReviewItem";

const Review = ({ hints }) => {
  return (
    <div>
      <h1>Review Page</h1>
      <Container>
        <Accordion>
          {hints.map((hint, index) => (
            <Accordion.Item eventKey={index}>
              <Accordion.Header>Review Hint {index}</Accordion.Header>
              <Accordion.Body>
                <ReviewItem key={hint.thid} props={hint} />
              </Accordion.Body>
            </Accordion.Item>
          ))}
        </Accordion>
      </Container>
    </div>
  );
};

export default Review;
