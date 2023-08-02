import React, { useState, useEffect } from "react";
import NavBar from "../../components/Navbar";
import { Container, Row, Dropdown } from "react-bootstrap";
import HintPanel from "./HintPanel";
import "./Hints.css";

const Hints = () => {
  const [arr, setArr] = useState(Array(12).fill(0));
  const [sort, setSort] = useState("Latest Hints");
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
            <div className="my-3">
              <a href="/" id="link-title">
                <h2>Question Name With Link</h2>
              </a>
              <h4>platform</h4>
            </div>

            <div className="mb-2 mt-4 ms-auto" style={{ width: "15%" }}>
              <Dropdown>
                <Dropdown.Toggle
                  variant="transparent"
                  id="dropdown-basic"
                  className=" text-primary-white border"
                >
                  {sort}
                </Dropdown.Toggle>

                <Dropdown.Menu>
                  <Dropdown.Item
                    href="#"
                    onClick={() => setSort("Latest Hints")}
                  >
                    Latest Hints
                  </Dropdown.Item>
                  <Dropdown.Item
                    href="#"
                    onClick={() => setSort("Most Upvoted")}
                  >
                    Most Upvoted
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </div>

            <Row className="border-top border-dark">
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
