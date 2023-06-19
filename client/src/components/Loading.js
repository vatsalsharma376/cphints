import React from "react";
import { Image } from "react-bootstrap";
import LoadingGif from "../assets/images/Loading_icon.gif";

const Loading = () => {
  return (
    <>
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ height: "100vh" }}
      >
        <Image src={LoadingGif} />
      </div>
    </>
  );
};

export default Loading;
