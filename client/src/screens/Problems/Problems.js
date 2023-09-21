import React, { useEffect, useState, useRef } from "react";
import Navbars from "../../components/Navbar";
import { Row, Col, Container, Button, InputGroup } from "react-bootstrap";
import { Table, Pagination } from "rsuite";
import Form from "react-bootstrap/Form";
import { useNavigate } from "react-router-dom";

import "./Problems.css";
import axios from "axios";
import backendUrl from "../../../src/constants.js";
import { ToastContainer, toast } from "react-toastify";

const { Column, HeaderCell, Cell } = Table;
const Problems = () => {
  const navigate = useNavigate();
  const [tdata, setTdata] = useState([]);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);
  const [totalResults, settotalResults] = useState(0);
  const [count, setCount] = useState(0);
  const [search, setSearch] = useState("");
  const val = useRef("");
  const handleChangeLimit = (dataKey) => {
    setPage(1);
    setLimit(dataKey);
  };
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const queryParamValue = urlParams.get("q");
    const searchQuery =
      search == "" ? (queryParamValue === null ? "" : queryParamValue) : search;

    const pageConfig = {
      limit,
      offset: (page - 1) * limit,
      searchQuery,
    };

    const getAllProblems = async () => {
      try {
        const resp = await axios.post(`${backendUrl}/questions/`, pageConfig);
        setCount(resp.data[0]);
        setTdata(resp.data[1]);
        settotalResults(resp.data.totalCount);
      } catch (err) {
        toast.error("There was some error fetching the data!!");
      }
    };
    getAllProblems();
  }, [page, limit, search]);
  return (
    <>
      <div style={{ backgroundColor: "#0f131a", minHeight: "100vh" }}>
        <Navbars bg="black" />
        <div className="intro-text my-4">
          <h1>Problems</h1>
          <h4>Browse through all the problems available</h4>
        </div>
        <Container>
          <Row>
            <InputGroup className="mb-3 w-25" style={{marginLeft:"56em"}}>
              <Form.Control
                placeholder="Search for problems"
                aria-label="Search for problems"
                aria-describedby="basic-addon2"
                ref={val}
              />
              <Button
                variant="outline-dark"
                id="button-addon2"
                onClick={() => {
                  setSearch(val.current.value);
                }}
              >
                Search
              </Button>
            </InputGroup>
          </Row>
          <Row>
            <Col className="rounded">
              <Table
                loading={tdata.length > 0 ? false : true}
                data={tdata}
                width={900}
                autoHeight={true}
                bordered={false}
                onRowClick={(rowData) => navigate("/hints", { state: rowData })}
                style={{
                  backgroundColor: "#000",
                  color: "#e9ebf0",
                  cursor: "pointer",
                }}
                rowHeight={50}
                className="m-auto"

              >
                <Column width={200} align="center">
                  <HeaderCell style={{ backgroundColor: "#1a1d24" }}>
                    Problem Name
                  </HeaderCell>
                  <Cell
                    dataKey="qname"
                    style={{ backgroundColor: "#1a1d24" }}
                  />
                </Column>

                <Column width={300} align="center">
                  <HeaderCell style={{ backgroundColor: "#1a1d24" }}>
                    Problem Link
                  </HeaderCell>
                  <Cell
                    id="qlink"
                    dataKey="qlink1"
                    style={{ backgroundColor: "#1a1d24" }}
                    onClick={(e) => window.open(e.target.textContent, "_blank")}
                  />
                </Column>

                <Column width={200} align="center">
                  <HeaderCell style={{ backgroundColor: "#1a1d24" }}>
                    Platform
                  </HeaderCell>
                  <Cell
                    dataKey="platform"
                    style={{ backgroundColor: "#1a1d24" }}
                  />
                </Column>

                <Column width={200} align="center">
                  <HeaderCell style={{ backgroundColor: "#1a1d24" }}>
                    Hints available
                  </HeaderCell>
                  <Cell
                    dataKey="count"
                    style={{ backgroundColor: "#1a1d24" }}
                  />
                </Column>
              </Table>
              <div style={{ padding: 20 }} className="tb-page">
                <Pagination
                  prev
                  next
                  first
                  last
                  ellipsis
                  boundaryLinks
                  maxButtons={5}
                  size="xs"
                  layout={["total", "-", "limit", "|", "pager", "skip"]}
                  total={count}
                  limitOptions={[10, 20, 30]}
                  limit={limit}
                  activePage={page}
                  onChangePage={setPage}
                  onChangeLimit={handleChangeLimit}
                />
              </div>
            </Col>
            
          </Row>
        </Container>
      </div>
      <ToastContainer theme="dark" limit={3} />
    </>
  );
};

export default Problems;
