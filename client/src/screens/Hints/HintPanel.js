import React, { useState } from "react";
import { Col, OverlayTrigger, Tooltip, Button, Stack } from "react-bootstrap";
import HintModal from "./HintsModal";
import "./Hints.css";
import BACKEND_URL from "../../constants";
import axios from "axios";  
const HintTags = ({ tags }) => {
  return (
    <>
      {tags &&
        tags.map((t, i) => {
          return (
            <>
              {i <= 5 && (
                <OverlayTrigger
                  placement="top"
                  delay={{ show: 100, hide: 100 }}
                  overlay={<Tooltip id="button-tooltip">{t}</Tooltip>}
                  key={i}
                >
                  <div
                    className="p-1 m-1 rounded text-black"
                    style={{ fontSize: ".9em", backgroundColor: "#D9D9D9" }}
                  >
                    {t.length > 10 ? t.split(" ")[0] + "..." : t}
                  </div>
                </OverlayTrigger>
              )}
            </>
          );
        })}
    </>
  );
};

const HintPanel = ({ bgColor, hintData }) => {
  // const bgColor = props.bgColor;

  // shows the active state of the upvote downvote button
  // -1 means no button is active
  // 0 means downvote button is active
  // 1 means upvote button is active
  const [active, setActive] = useState(-1);
  const [disabled,setDisabled] = useState(0);
  const [upvote, setUpvote] = useState(hintData.totalUpvotes);
  const [downvote, setDownvote] = useState(hintData.totalDownvotes);
  const [modalShow, setModalShow] = useState(false);
  console.log(hintData);
  const [tag, ...hints] = hintData.hints;
  const tags = tag.split(/[\s,]+/);

  const setDownVoteButton = async () => {
    let upvote = 0,
      downvote = 0;
      if(disabled==1) return;
    if (active === 1) {
      setUpvote((prev) => prev - 1);
      setDownvote((prev) => prev + 1);
      upvote = -1;
      downvote = 1;
      setActive(0);
    } else if (active === -1) {
      setDownvote((prev) => prev + 1);
      downvote = 1;
      setActive(0);
    } else {
      setDownvote((prev) => prev - 1);
      downvote = -1;
      setActive(-1);
    }
    try {
      setDisabled(1);
      const response = await axios.post(`${BACKEND_URL}/updownvote`, {
        upvote,
        downvote,
        hintId: hintData.hid,
      });
      setDisabled(0);
    } catch (err) {
      console.log(err);
      setDisabled(0);
    }
  };

  const setUpVoteButton = async () => {
    let upvote = 0,
      downvote = 0;
      if(disabled==1) return;
    if (active === 0) {
      setUpvote((prev) => prev + 1);
      setDownvote((prev) => prev - 1);
      upvote = 1;
      downvote = -1;
      setActive(1);
    } else if (active === -1) {
      setUpvote((prev) => prev + 1);
      upvote = 1;
      setActive(1);
    } else {
      setUpvote((prev) => prev - 1);
      upvote = -1;
      setActive(-1);
    }
    try {
      setDisabled(1);
      const response = await axios.post(`${BACKEND_URL}/updownvote`, {
        upvote,
        downvote,
        hintId: hintData.hid,
      });
      setDisabled(0);
    } catch (err) {
      console.log(err);
      setDisabled(0);
    }
  };

  return (
    <>
      <Col xs={5} md={4} lg={3}>
        <div
          style={{ backgroundColor: bgColor }}
          className="my-3 px-3 rounded hintsBox"
        >
          <Stack direction="horizontal" gap={3} className="h-100">
            <div className="d-flex flex-column h-100 justify-content-evenly">
              <div>
                <h3
                  style={{ lineHeight: "0" }}
                  className="caretUpButton"
                  onClick={setUpVoteButton}
                >
                  <i
                    className={
                      active !== 1
                        ? "bi bi-caret-up"
                        : "bi bi-caret-up-fill text-success"
                    }
                  ></i>
                </h3>
                <h6>{upvote}</h6>
              </div>
              <div>
                <h6>{downvote}</h6>
                <h3
                  style={{ lineHeight: "0" }}
                  className="caretDownButton"
                  onClick={setDownVoteButton}
                >
                  <i
                    className={
                      active !== 0
                        ? "bi bi-caret-down"
                        : "bi bi-caret-down-fill text-danger"
                    }
                  ></i>
                </h3>
              </div>
            </div>
            <div style={{ width: "80%" }}>
              <div style={{ minHeight: "4rem" }}>
                <div className="d-flex  flex-wrap overflow-hidden">
                  <HintTags tags={tags} />
                </div>
              </div>
              <div className="d-flex justify-content-between align-items-end mt-2">
                <Button
                  style={{ fontSize: ".9em" }}
                  variant="outline-primary-white"
                  onClick={() => setModalShow(true)}
                >
                  Show Hints
                </Button>
                <div className="d-flex flex-column align-items-end text-muted">
                  <p>
                    <i class="bi bi-person-fill"></i>{" "}
                    {hintData.username.toUpperCase()}
                  </p>
                  <p className="m-0">
                    <i class="bi bi-clock"></i> 6 days ago
                  </p>
                </div>
              </div>
            </div>
          </Stack>
        </div>

        <HintModal
          show={modalShow}
          onHide={() => setModalShow(false)}
          hints={hints}
        />
      </Col>
    </>
  );
};

export default HintPanel;
