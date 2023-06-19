import React, { useEffect, useState } from "react";
import Navbars from "../../components/Navbar";
import { Row, Col, Container, Button, Stack } from "react-bootstrap";
import { Table, Pagination } from "rsuite";
import Form from "react-bootstrap/Form";
import "./Problems.css";
import axios from "axios";
import backendUrl from "../../../src/constants.js";
// import "~rsuite/dist/rsuite.css";
// import '~rsuite/styles/index.less';

const { Column, HeaderCell, Cell } = Table;
const Problems = () => {
  const [tdata, setTdata] = useState([]);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);
  const handleChangeLimit = (dataKey) => {
    setPage(1);
    setLimit(dataKey);
  };
  useEffect(() => {
    const pageConfig = {
      limit,
      offset: (page - 1) * limit,
    };

    const getAllProblems = async () => {
      const resp = await axios.post(`${backendUrl}/questions/`, pageConfig);
      console.log(resp.data);
      setTdata(resp.data);
    };
    getAllProblems();
  }, [page, limit]);
  return (
    <div style={{backgroundColor:"#0f131a"}}>
      <Navbars bg="black" />
      <div className="intro-text my-4">
        <h1>Problems</h1>
        <h4>Browse through all the problems available</h4>
      </div>
      <Container>
        {/**style={{boxShadow:"0 10px 10px 1px rgba(0,0,0,.2)",height:"70vh"}} */}
        <Row>
          <Col className="rounded">
            <Table
        loading={tdata.length > 0 ? false : true}
        data={tdata}
        width={900}
        autoHeight={true}
        bordered={false}
        // classPrefix="rsuite-dark"
        // classPrefix="custom-table" 
        // cellBordered={true}
        
        style={{backgroundColor:"#000",color:"#e9ebf0"}}
        rowHeight={50}
        className="m-auto"
        
        // virtualized
        // fixed={"right"}
      >
        <Column width={200} align="center">
          <HeaderCell style={{backgroundColor:"#1a1d24"}}>Problem Name</HeaderCell>
          <Cell dataKey="qname" style={{backgroundColor:"#1a1d24"}}/>
        </Column>

        <Column width={300} align="center" >
          <HeaderCell style={{backgroundColor:"#1a1d24"}}>Problem Link</HeaderCell>
          <Cell id="qlink" dataKey="qlink1" style={{backgroundColor:"#1a1d24"}}  onClick={(e)=>window.open(e.target.textContent,"_blank")}/>
        </Column>

        <Column width={200} align="center"  >
          <HeaderCell style={{backgroundColor:"#1a1d24"}}>Platform</HeaderCell>
          <Cell dataKey="platform" style={{backgroundColor:"#1a1d24"}}/>
        </Column>

        <Column width={200} align="center">
          <HeaderCell style={{backgroundColor:"#1a1d24"}}>Hints available</HeaderCell>
          <Cell dataKey="count" style={{backgroundColor:"#1a1d24"}}/>
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
          total={16}
          limitOptions={[10, 20, 30]}
          limit={limit}
          activePage={page}
          onChangePage={setPage}
          onChangeLimit={handleChangeLimit}
        />
            </div>
          </Col>
          {/* <Col style={{ borderLeft: "1px solid grey" }}>
            <h2>Filters</h2>

            <Form>
              <Form.Group>
                <Form.Check label="Codeforces" type="checkbox" id="checkbox1" />
                <Form.Check label="Leetcode" type="checkbox" id="checkbox2" />
                <Form.Check label="Codechef" type="checkbox" id="checkbox3" />
                <Form.Check
                  label="GeeksforGeeks" 
                  type="checkbox"
                  id="checkbox4"
                />
                <Form.Check
                  label="Coding Ninjas"
                  type="checkbox"
                  id="checkbox5"
                />
              </Form.Group>
            </Form>
            <Stack gap={2} className="mt-3" direction="horizontal">
              <Button variant="success">Apply</Button>
              <Button variant="danger">Reset</Button>
            </Stack>
          </Col>   */}
        </Row>
      </Container>
    </div>
  );
};

export default Problems;
