import React, { useEffect, useState } from "react";
import { Col, OverlayTrigger, Tooltip, Button, Stack } from "react-bootstrap";
import HintModal from "./HintsModal";
import "./Hints.css";
import BACKEND_URL from "../../constants";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";

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
                    {t.length > 10 ? t.substr(0, 10) + "..." : t}
                    {/* {t} */}
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
  console.log(hintData.totalUpvotes, hintData.totalDownvotes);
  const [active, setActive] = useState(
    hintData.isUpvoted == 1 ? 1 : hintData.isDownvoted == 1 ? 0 : -1
  );
  const [disabled, setDisabled] = useState(0);
  const [upvote, setUpvote] = useState(hintData.totalUpvotes);
  const [downvote, setDownvote] = useState(hintData.totalDownvotes);
  const [daysAgo, setDaysAgo] = useState(99);
  const [modalShow, setModalShow] = useState(false);
  // console.log(hintData);
  const [tag, ...hints] = hintData.hints;
  const tags = tag.split(",");
  useEffect(() => {
    setActive(hintData.isUpvoted == 1 ? 1 : hintData.isDownvoted == 1 ? 0 : -1);
    setUpvote(hintData.totalUpvotes);
    setDownvote(hintData.totalDownvotes);
    // const date = Date.now();
    // console.log(hintData.created_at);
    // const diff = date - hintData.created_at;
    const hint_ts = new Date(hintData.created_at);
    console.log(hint_ts);
    const current_ts = new Date();
    const timeDifference = current_ts - hint_ts;
    const millisecondsPerDay = 24 * 60 * 60 * 1000; // Number of milliseconds in a day
    setDaysAgo(Math.floor(timeDifference / millisecondsPerDay));
    console.log(daysAgo);
  }, [hintData]);
  const setDownVoteButton = async () => {
    let upvote = 0,
      downvote = 0;
    if (disabled == 1) return;
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
      const response = await axios.post(`${BACKEND_URL}/hints/updownvote/`, {
        upvote,
        downvote,
        hintId: hintData.hid,
      });
      setDisabled(0);
    } catch (err) {
      console.log(err);
      toast.error(err.response.data);
      setDownvote((downvote) => downvote - 1);
      setDisabled(0);
      setActive(-1);
    }
  };

  const setUpVoteButton = async () => {
    let upvote = 0,
      downvote = 0;
    if (disabled == 1) return;
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
      const response = await axios.post(`${BACKEND_URL}/hints/updownvote/`, {
        upvote,
        downvote,
        hintId: hintData.hid,
      });
      setDisabled(0);
    } catch (err) {
      console.log(err);
      toast.error(err.response.data);
      setUpvote((upvote) => upvote - 1);
      setActive(-1);
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
                    <i class="bi bi-person-fill"></i> {hintData.username}
                  </p>
                  <p className="m-0">
                    {/* find difference between timestamptz and current time in number of days 
                    and display it  
                    const date = Date.now();
                    const diff = date - hintData.created_at;
                    const days = diff/1000/60/60/24;

                    */}
                    <i class="bi bi-clock"></i> {daysAgo} days ago
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
