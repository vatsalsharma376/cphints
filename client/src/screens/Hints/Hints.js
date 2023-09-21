import React, { useState, useEffect, useLayoutEffect } from "react";
import Axios from "axios";
import NavBar from "../../components/Navbar";
import { Container, Row, Dropdown, Button } from "react-bootstrap";
import HintPanel from "./HintPanel";
import "./Hints.css";
import BACKEND_URL from "../../constants";
import LoadingComponent from "../../components/loadingComponent";
import { useLocation, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

const Hints = () => {
  const { state } = useLocation();

  const [arr, setArr] = useState([]);
  const [sort, setSort] = useState("Latest Hints");
  const [limit, setLimit] = useState(12);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  const handleInfiniteScroll = () => {
    const scrollable =
      document.documentElement.scrollHeight - window.innerHeight;
    const scrolled = window.scrollY;
    if (Math.ceil(scrolled) === scrollable) {
      setLimit((prev) => prev + 12);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleInfiniteScroll);
    return () => {
      window.removeEventListener("scroll", handleInfiniteScroll);

    }
  }, [arr]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await Axios.post(`${BACKEND_URL}/hints/gethints/`, {
          qid: state.qid,
          limit: limit,
          offset: 0,
        });
        setIsLoading(false);
        setArr(res.data);
      } catch (err) {
        toast.error("There was an error fetching the hints");
      }
    };
    fetchData();
  }, [limit]);

  useEffect(() => {
    const fetchData = async () => {
      const url = sort === "Latest Hints" ? "gethints" : "getHintsByVotes";
      setLimit(12);

      const res = await Axios.post(`${BACKEND_URL}/hints/${url}/`, {
        qid: state.qid,
        limit: limit,
        offset: 0,
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

            <div className="d-flex justify-content-end  my-4">
              <div>
                <Button
                  variant="outline-primary-white"
                  onClick={() =>
                    navigate("/contribute", { state: { qlink: state.qlink1 } })
                  }
                >
                  Add Hint
                </Button>
              </div>

              <div className="" style={{ width: "15%" }}>
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
            </div>
            <Row className="border-top border-dark">
              {isLoading ? (
                <LoadingComponent height="500px" lSize="30px" />
              ) : (
                arr &&
                arr.map((a, i) => (
                  <HintPanel bgColor="#1A1D24" key={i} hintData={a} />
                ))
              )}
            </Row>
          </Container>
        </div>
      </div>
      <ToastContainer theme="dark" limit={3} />
    </>
  );
};

export default Hints;
