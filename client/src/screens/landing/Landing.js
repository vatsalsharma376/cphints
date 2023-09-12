// import { Container } from '@chakra-ui/react'
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Col, Row, Toast } from "react-bootstrap";
import Image from "react-bootstrap/Image";
import code_editor from "../../assets/images/code_editor.png";
import { Container, Stack } from "react-bootstrap";
// import LogoCard from "../../components/LogoCard";
import Typist from "react-typist";
import { InputGroup, Button, Form } from "react-bootstrap";
// import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
// import Quotes from "../../components/Quotes";
import NavBar from "../../components/Navbar";
import starbg from "./starbg.jpg";
import Timeline from "../../components/Timeline";
import { useNavigate } from "react-router-dom";
// import forces from '../../assets/images/forces.png';
// import cf from "../../assets/images/cf.webp";
// import leet from "../../assets/images/leet.png";
// import cn from "../../assets/images/cn.jpeg";
// import gfg1 from "../../assets/images/gfg1.png";
// import cses from "../../assets/images/cses.png";
// import tuf1 from "../../assets/images/tuf1.png";
import backendUrl from "../../constants";
import StatsCard from "./StatsCard";
import "./landing.css";
import { ToastContainer } from "react-toastify";

const Landing = () => {
  const navigate = useNavigate();
  const [searchQuery, setsearchQuery] = useState("");
  // const responsive = {
  //   desktop: {
  //     breakpoint: { max: 3000, min: 1024 },
  //     items: 3,
  //     slidesToSlide: 3,
  //   },
  //   tablet: {
  //     breakpoint: { max: 1024, min: 464 },
  //     items: 2,
  //     slidesToSlide: 2,
  //   },
  //   mobile: {
  //     breakpoint: { max: 464, min: 0 },
  //     items: 1,
  //     slidesToSlide: 1,
  //   },
  // };
  // const responsive_quote = {
  //   desktop: {
  //     breakpoint: { max: 3000, min: 1024 },
  //     items: 1,
  //     slidesToSlide: 1,
  //   },
  //   tablet: {
  //     breakpoint: { max: 1024, min: 464 },
  //     items: 1,
  //     slidesToSlide: 1,
  //   },
  //   mobile: {
  //     breakpoint: { max: 464, min: 0 },
  //     items: 1,
  //     slidesToSlide: 1,
  //   },
  // };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`${backendUrl}/landing`);
        console.log(res.data);
      } catch (err) {
        Toast.error(err.message);
      }
    };
    fetchData();
  }, []);

  return (
    <>
      <div
        style={{ backgroundSize: "cover", backgroundImage: `url(${starbg})` }}
      >
        <NavBar bg="" />

        <Container style={{ marginTop: "5%" }}>
          <div>
            <Typist>
              <h1 className="main-heading text-white">Stuck on a problem?</h1>
            </Typist>
            <InputGroup className="search-bar mb-5 " size="lg">
              <Form.Control
                placeholder="Enter problem name or link"
                aria-label="Enter problem name or link"
                aria-describedby="basic-addon2"
                onChange={(e) => setsearchQuery(e.target.value)}
              />
              <Button
                variant="outline-lg-purple"
                id="button-addon2"
                onClick={() => {
                  const param = `/problems?q=${searchQuery}`;
                  navigate(param);
                }}
              >
                Search
              </Button>
            </InputGroup>
            <Row className="title-text">
              <Col xs={12} md={6}>
                <Stack className="mt-5">
                  <h1 className="text-purplee three-lines">Get some hints</h1>
                  <h1 className="text-lg-purple three-lines">
                    Share some hints
                  </h1>
                  <h1 className="text-primary-300 three-lines">
                    Help grow the community
                  </h1>
                </Stack>
              </Col>
              <Col xs={12} md={6}>
                <Image src={code_editor} fluid rounded />
              </Col>
            </Row>
          </div>
        </Container>
      </div>

      <div style={{ backgroundColor: "#000" }} className="py-5">
        <div
          // style={{ width: "60%" }}
          className="py-4 mx-auto"
        >
          <StatsCard />
        </div>

        <div className="text-white">
          <h1 className="text-heading text-white mb-lg-2">How it works?</h1>
          {/* </Typist> */}
          <Timeline />
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export default Landing;
