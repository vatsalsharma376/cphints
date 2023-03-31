// import { Container } from '@chakra-ui/react'
import React from "react";
import { Col, Row } from "react-bootstrap";
import Image from "react-bootstrap/Image";
import code_editor from "../../assets/images/code_editor.png";
import { Container, Stack } from "react-bootstrap";
import LogoCard from "../../components/LogoCard";
import Typist from "react-typist";
import { InputGroup, FormControl, Button, Form } from "react-bootstrap";
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
const Landing = () => {
  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3,
      slidesToSlide: 3
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
      slidesToSlide: 2
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
      slidesToSlide: 1
    }
  };
  return (
    <div>
      <Container fluid style={{ marginTop: "5%" }}>
        <div>
          <Typist>
            <h1 className="text-white" style={{ fontSize: "3.5rem" }}>
              Stuck on a problem?
            </h1>
          </Typist>
          <InputGroup
            className="mb-5 "
            size="lg"
            style={{ width: "50%", margin: "auto" }}
          >
            <Form.Control
              placeholder="Enter problem name or link"
              aria-label="Enter problem name or link"
              aria-describedby="basic-addon2"
            />
            <Button variant="outline-lg-purple" id="button-addon2">
              Search
            </Button>
          </InputGroup>
          <Row style={{ height: "72vh" }}>
            <Col>
              <Stack className="mt-5">
                <h1 className="text-purplee">Get some hints</h1>
                {/* <h1 className='text-lg-purple'>Contribute</h1> */}
              </Stack>
            </Col>
            <Col>
              <Image src={code_editor} fluid rounded />
            </Col>
          </Row>
        </div>
        <div className="">
          
          <Carousel
          /*
          swipeable={false}
          draggable={false}
          */
          responsive={responsive}
          ssr
          autoPlay={true}
          slidesToSlide={1}
          infinite
          containerClass="container-with-dots"
          itemClass="image-item"
        >
              <LogoCard title="Codeforces" />
              <LogoCard title="Leetcode" />
              <LogoCard title="SDE Sheet" />
              <LogoCard title="CSES" />

          
        </Carousel>
        </div>
      </Container>
    </div>
  );
};

export default Landing;
