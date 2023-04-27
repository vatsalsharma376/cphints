import React, { useEffect,useState } from "react";
import axios from "axios";
import Accordion from 'react-bootstrap/Accordion';
import { Container } from "react-bootstrap";

import ReviewItem from "./ReviewItem";
import BACKEND_URL from "../../constants";
const Review = () => {
  const [hints, setHints] = useState([]);
  const getHints = async () => {
    const res = await axios.get(`${BACKEND_URL}/review/`);
    setHints(await res.data);
    console.log(res.data);
  };
  useEffect(() => {
    getHints();
  }, []);

  return (
    <div>
        <h1>Review Page</h1>
        <Container>
        <Accordion>
      {hints.map((hint,index) => (
        <Accordion.Item eventKey={index}>
        <Accordion.Header>Review Hint {index}</Accordion.Header>
        <Accordion.Body>
        <ReviewItem key={hint.thid} props={hint}/>

        </Accordion.Body>
      </Accordion.Item>
      ))}
      </Accordion>
      </Container>
    </div>
  );
};

export default Review;
