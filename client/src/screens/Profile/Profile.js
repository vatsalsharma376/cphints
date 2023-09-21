import React, { useState, useEffect } from "react";
import axios from "axios";
import { Col, Container } from "react-bootstrap";
import Navbar from "./../../components/Navbar";
import { Row, Image } from "react-bootstrap";
import Avatar from "../../assets/images/avatar.jpg";
import StatsCard from "./StatsCard";
import Datatable from "./Datatable";
import backendUrl from "../../constants";
import { Pagination } from "rsuite";
import "rsuite/dist/rsuite.css";
import Loading from "../../components/Loading";
import { ToastContainer, toast } from "react-toastify";

const Profile = () => {
  const [switchState, setSwitchState] = useState(1);
  const [user, setUser] = useState({});
  const [activeData, setActiveData] = useState([]);
  const [reviewData, setReviewData] = useState([]);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);
  const [activeCount, setActiveCount] = useState(0);
  const [reviewCount, setReviewCount] = useState(0);
  const [stats, setStats] = useState({});
  const handleChangeLimit = (dataKey) => {
    setPage(1);
    setLimit(dataKey);
  };
  const token = localStorage.getItem("token");
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  useEffect(() => {
    const pageConfig = {
      limit,
      offset: (page - 1) * limit,
    };

    const getActiveQuestions = async () => {
      try {
        const resp = await axios.post(
          `${backendUrl}/profile/active-hints`,
          pageConfig
        );
        setActiveData(resp.data[1]);
        setActiveCount(resp.data[0]);
      } catch (e) {
        toast.error("There was some error fetching the data!!");
      }
    };
    const getReviewQuestions = async () => {
      try {
        const resp = await axios.post(
          `${backendUrl}/profile/review-hints`,
          pageConfig
        );
        setReviewData(resp.data[1]);
        setReviewCount(resp.data[0]);
      } catch (e) {
        toast.error("There was some error fetching the data!!");
      }
    };
    const getUser = async () => {
      try {
        const res = await axios.get(`${backendUrl}/profile/user`);
        setUser(res.data[0]);
      } catch (e) {
        window.location.href = "/";
      }
    };
    const getStats = async () => {
      try {
        const res = await axios.get(`${backendUrl}/profile/stats`);
        setStats(res.data);
      } catch (e) {
        toast.error("There was some error fetching the data!!");
      }
    };
    getUser();
    getActiveQuestions();
    getReviewQuestions();
    getStats();
  }, [page, limit]);

  return (
    <>
      {user.name ? (
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
                <div className="profile-section bg-primary-500 rounded mt-4">
                  <div className="name-section p-2">
                    <div className="avatar-image">
                      <Image
                        src={Avatar}
                        style={{ width: "7em" }}
                        roundedCircle
                      />
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
                <StatsCard stats={stats} />
                <div>
                  <Datatable
                    Datas={switchState ? activeData : reviewData}
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
                      total={switchState ? activeCount : reviewCount}
                      limitOptions={[10, 20, 30]}
                      limit={limit}
                      activePage={page}
                      onChangePage={setPage}
                      onChangeLimit={handleChangeLimit}
                    />
                  </div>
                </div>
              </Col>
            </Row>
          </Container>
        </>
      ) : (
        <Loading />
      )}
      <ToastContainer theme="dark" limit={3} />
    </>
  );
};

export default Profile;
