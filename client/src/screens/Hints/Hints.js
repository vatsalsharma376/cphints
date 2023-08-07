import React, { useState, useEffect, useLayoutEffect } from "react";
import Axios from "axios";
import NavBar from "../../components/Navbar";
import { Container, Row, Dropdown } from "react-bootstrap";
import HintPanel from "./HintPanel";
import "./Hints.css";
import BACKEND_URL from "../../constants";
import { useLocation } from "react-router-dom";

const Hints = () => {
  const { state } = useLocation();

  const [arr, setArr] = useState([]);
  const [sort, setSort] = useState("Latest Hints");
  const [limit, setLimit] = useState(12);
  // const arr = Array(12).fill(0);

  const handleInfiniteScroll = () => {
    const scrollable =
      document.documentElement.scrollHeight - window.innerHeight;
    const scrolled = window.scrollY;
    if (Math.ceil(scrolled) === scrollable) {
      console.log("reached bottom");
      setLimit((prev) => prev + 12);
      // setArr([...arr, ...Array(12).fill(0)]);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleInfiniteScroll);
  }, [arr]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await Axios.post(`${BACKEND_URL}/hints/gethints/`, {
        qid: state.qid,
        limit: limit,
        offset: "0",
      });
      setArr(res.data);
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const url = sort === "Latest Hints" ? "gethints" : "getHintsByVotes";
      setLimit(12);

      const res = await Axios.post(`${BACKEND_URL}/hints/${url}/`, {
        qid: state.qid,
        limit: limit,
        offset: "0",
      });
      setArr(res.data);
    };
    fetchData();
  }, [sort]);

  return (
    <>
      <div style={{ backgroundColor: "#0F131A" }} className="min-vh-100">
        <NavBar bg="black" />
        <div>
          <Container>
            <div className="my-3">
              <a href={state.qlink1} target="__blank" id="link-title">
                <h2>{state.qname}</h2>
                <h4>{state.platform}</h4>
              </a>
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
              {arr &&
                arr.map((a, i) => (
                  <HintPanel bgColor="#1A1D24" key={i} hintData={a} />
                ))}
            </Row>
          </Container>
        </div>
      </div>
    </>
  );
};

export default Hints;
