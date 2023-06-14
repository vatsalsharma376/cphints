import React, { useState, useEffect } from "react";
import axios from "axios";
import { ButtonGroup, Button, Col, Container } from "react-bootstrap";
import Navbar from "./../../components/Navbar";
import { Row, Image } from "react-bootstrap";
import Avatar from "../../assets/images/avatar.jpg";
import StatsCard from "./StatsCard";
import Datatable from "./Datatable";
import backendUrl from "../../constants";
import { Table, Pagination } from "rsuite";
import "rsuite/dist/rsuite.css";

const Profile = () => {
  const [switchState, setSwitchState] = useState(1);
  const [user, setUser] = useState({});
  const [tdata, setTdata] = useState([]);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);
  const handleChangeLimit = (dataKey) => {
    setPage(1);
    setLimit(dataKey);
  };
  const token = localStorage.getItem("token");
  useEffect(() => {
    const pageConfig = {
      limit,
      offset: (page - 1) * limit,
      token,
    };

    const getActiveQuestions = async () => {
      const resp = await axios.post(
        `${backendUrl}/profile/active-hints`,
        pageConfig
      );
      //   console.log(resp.data);
      setTdata(resp.data);
    };
    const getUser = async () => {
      const res = await axios.post(`${backendUrl}/profile/user`, { token });
      //   console.log(res.data[0]);
      setUser(res.data[0]);
    };
    getActiveQuestions();
    getUser();
  }, [page, limit]);

  return (
    <>
      <Navbar bg="black" />
      <Container
        style={{
          minHeight: "91vh",
          boxShadow: "0 0 10px 1px rgba(0,0,0,.2)",
          backgroundColor: "#F1F8FF",
        }}
      >
        <Row>
          <Col sm={3}>
            <div
              className="profile-section bg-primary-500 rounded mt-4"
              //   style={{ height: "30vh" }}
            >
              <div className="name-section p-2">
                <div className="avatar-image">
                  <Image src={Avatar} style={{ width: "7em" }} roundedCircle />
                </div>
                <div className="profile-username mt-2">
                  <div>
                    <h4 className="mb-0 text-left">{user.name}</h4>
                    <div className="text-muted mb-2">{user.username}</div>
                  </div>
                </div>
              </div>
            </div>
          </Col>
          <Col>
            <StatsCard />
            <div>
              <Datatable
                // Datas={switchState ? Data1 : Data2}
                Datas={tdata}
                switchState={switchState}
                setSwitchState={setSwitchState}
              />
              <div className="tb-page p-3">
                <Pagination
                  prev
                  next
                  first
                  last
                  ellipsis
                  boundaryLinks
                  maxButtons={5}
                  size="s"
                  layout={["total", "-", "limit", "|", "pager", "skip"]}
                  total={16}
                  limitOptions={[10, 20, 30]}
                  limit={10}
                  activePage={1}
                  //   activePage={page}
                  //   onChangePage={setPage}
                  //   onChangeLimit={handleChangeLimit}
                />
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Profile;
