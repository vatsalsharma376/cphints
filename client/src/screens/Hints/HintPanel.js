import React, { useState } from "react";
import { Col, OverlayTrigger, Tooltip, Button, Stack } from "react-bootstrap";
import HintModal from "./HintsModal";
import "./Hints.css";

const tag1 = [
  "dynamic programming",
  "greedy algorithm",
  "sliding window concept",
  "greedy algorithm",
  "sliding window concept",
];

const hints = [
  {
    title: "hint 2",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam sed diam at augue faucibus consequat vitae a turpis. Donec blandit in ante rhoncus laoreet. Etiam euismod massa massa, ut pulvinar dolor egestas non. Morbi iaculis libero vitae nulla scelerisque porttitor. Aliquam ut dictum arcu.",
  },
  {
    title: "hint 3",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam sed diam at augue faucibus consequat vitae a turpis. Donec blandit in ante rhoncus laoreet.",
  },
  {
    title: "hint 4",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam ",
  },
  {
    title: "hint 5",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam sed diam at augue faucibus consequat vitae a turpis. Donec blandit in ante rhoncus laoreet. Etiam euismod massa massa, ut pulvinar dolor egestas non. Morbi iaculis libero vitae nulla scelerisque porttitor. Aliquam ut dictum arcu.",
  },
];

const HintTags = ({ tags }) => {
  return (
    <>
      {tags.map((t, i) => {
        return (
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
        );
      })}
    </>
  );
};

const HintPanel = ({ bgColor }) => {
  const [upvote, setUpvote] = useState(0);
  const [downvote, setDownvote] = useState(0);
  const [modalShow, setModalShow] = useState(false);

  const setDownVoteButton = () => {
    if (upvote) setUpvote((prev) => !prev);
    setDownvote((prev) => !prev);
  };

  const setUpVoteButton = () => {
    if (downvote) setDownvote((prev) => !prev);
    setUpvote((prev) => !prev);
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
              </div>
            </div>
            <div style={{ width: "80%" }}>
              <div className="d-flex  flex-wrap overflow-hidden">
                <HintTags tags={tag1} />
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
                    <i class="bi bi-person-fill"></i> ANKUSH
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
