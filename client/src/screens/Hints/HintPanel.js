import React, { useState } from "react";
import { Col, OverlayTrigger, Tooltip } from "react-bootstrap";
import { ListGroup, Stack } from "react-bootstrap";
import "./HintsPannel.css";

const tag1 = [
  "dynamic programming",
  "greedy algorithm",
  "sliding window concept",
  "greedy algorithm",
  "sliding window concept",
];

const HintTags = ({ tags }) => {
  return (
    <>
      {tags.map((t) => {
        return (
          <OverlayTrigger
            placement="top"
            delay={{ show: 100, hide: 100 }}
            overlay={<Tooltip id="button-tooltip">{t}</Tooltip>}
          >
            <div
              className="p-1 m-1 rounded text-black"
              style={{ fontSize: ".9em", backgroundColor: "#D9D9D9" }}
            >
              {t.length > 10 ? t.split(" ")[0] + "..." : t}
            </div>
          </OverlayTrigger>
        );
      })}
    </>
  );
};

const HintPanel = ({ bgColor }) => {
  const [upvote, setUpvote] = useState(0);
  const [downvote, setDownvote] = useState(0);

  const setDownVoteButton = () => {
    if (upvote) setUpvote((prev) => !prev);
    setDownvote((prev) => !prev);
  };

  const setUpVoteButton = () => {
    if (downvote) setDownvote((prev) => !prev);
    setUpvote((prev) => !prev);
  };

  return (
    <Col xs={5} md={4} lg={3}>
      <div
        style={{ backgroundColor: bgColor, height: "10rem" }}
        className="my-3 px-3 rounded"
      >
        <Stack direction="horizontal" gap={3} className="h-100">
          <div className="d-flex flex-column h-100 justify-content-evenly">
            <div>
              {/* <CaretUp size={30} /> */}
              <h3
                style={{ lineHeight: "0" }}
                className="caretUpButton"
                onClick={setUpVoteButton}
              >
                <i
                  className={
                    !upvote
                      ? "bi bi-caret-up"
                      : "bi bi-caret-up-fill text-success"
                  }
                ></i>
              </h3>
              <h6>10</h6>
            </div>
            <div>
              <h6>10</h6>
              <h3
                style={{ lineHeight: "0" }}
                className="caretDownButton"
                onClick={setDownVoteButton}
              >
                <i
                  className={
                    !downvote
                      ? "bi bi-caret-down"
                      : "bi bi-caret-down-fill text-danger"
                  }
                ></i>
              </h3>
              {/* <CaretDown size={30} /> */}
            </div>
          </div>
          <div style={{ width: "80%" }}>
            <div className="d-flex  flex-wrap overflow-hidden">
              <HintTags tags={tag1} />
            </div>
            <div
              className="d-flex flex-column align-items-end text-muted"
              // style={{ color: "#d9d9d9" }}
            >
              <p>
                <i class="bi bi-person-fill"></i> ANKUSH
              </p>
              <p className="m-0">
                <i class="bi bi-clock"></i> 6 days ago
              </p>
            </div>
          </div>
        </Stack>
      </div>
    </Col>
  );
};

export default HintPanel;
