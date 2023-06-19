import React from "react";
import { Row, Col } from "react-bootstrap";
import "bootstrap-icons/font/bootstrap-icons.css";

const StatsCard = ({ stats }) => {
  // console.log(props);
  return (
    <>
      <div className="container-fluid">
        <Row className="my-4">
          <Col xs={3}>
            <div className="p-3 bg-primary-500 shadow-sm d-flex justify-content-around align-items-center rounded h-100">
              <i class="bi bi-hand-thumbs-up-fill py-auto fs-1 text-success"></i>
              <div className="text-dark fw-bold">
                <p style={{ fontSize: ".8em" }}>Maximum upvotes</p>
                <h3 className="fs-4 my-0">
                  {stats.upvotes === null ? "0" : stats.upvotes}
                </h3>
              </div>
            </div>
          </Col>
          <Col xs={3}>
            <div className="p-3 bg-primary-500 shadow-sm d-flex justify-content-around align-items-center rounded h-100">
              <i class="bi bi-hand-thumbs-down-fill py-auto fs-1 text-danger"></i>
              <div className="text-dark fw-bold">
                <p style={{ fontSize: ".8em" }}>Maximum Downvotes</p>
                <h3 className="fs-4 my-0">
                  {stats.downvotes === null ? "0" : stats.downvotes}
                </h3>
              </div>
            </div>
          </Col>
          <Col xs={3}>
            <div className="p-3 bg-primary-500 shadow-sm d-flex justify-content-around align-items-center rounded h-100">
              <i class="bi bi-hourglass-split py-auto fs-1 text-info"></i>
              <div className="text-dark fw-bold">
                <p style={{ fontSize: ".8em" }}>Hints Under Review</p>
                <h3 className="fs-4 my-0">
                  {stats.hintsInReview === null ? "0" : stats.hintsInReview}
                </h3>
              </div>
            </div>
          </Col>
          <Col xs={3}>
            <div className="p-3 bg-primary-500 shadow-sm d-flex justify-content-around align-items-center rounded h-100">
              <i class="bi bi-check2-circle py-auto fs-1 text-dark"></i>
              <div className="text-dark fw-bold">
                <p style={{ fontSize: ".9em" }}>Hints Accepted</p>
                <h3 className="fs-4 my-0">
                  {stats.hintsAccepted === null ? "0" : stats.hintsAccepted}
                </h3>
              </div>
            </div>
          </Col>
        </Row>
      </div>
    </>
  );
};

export default StatsCard;
