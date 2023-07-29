import React, { useState, useEffect } from "react";
import NavBar from "../../components/Navbar";
import { Container, Row } from "react-bootstrap";
import HintPanel from "./HintPanel";
import "./Hints.css";

const Hints = () => {
  const [arr, setArr] = useState(Array(12).fill(0));
  // const arr = Array(12).fill(0);

  const handleInfiniteScroll = () => {
    const scrollable =
      document.documentElement.scrollHeight - window.innerHeight;
    const scrolled = window.scrollY;
    if (Math.ceil(scrolled) === scrollable) {
      console.log("reached bottom");
      setArr([...arr, ...Array(12).fill(0)]);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleInfiniteScroll);
  }, [arr]);

  return (
    <>
      <div style={{ backgroundColor: "#0F131A" }} className="min-vh-100">
        <NavBar bg="black" />
        <div>
          <Container>
            <div>
              <a href="/" id="link-title">
                <h2>Question Name With Link</h2>
              </a>
              <h4>platform</h4>
            </div>
            <Row>
              {arr.map((a, i) => (
                <HintPanel bgColor="#1A1D24" key={i} />
              ))}
            </Row>
          </Container>
        </div>
      </div>
    </>
  );
};

export default Hints;
