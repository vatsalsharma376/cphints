import React from "react";
import "./loadingComponent.css";

const LoadingSpinner = ({ height = "350px", lSize = "20px" }) => {
  return (
    <div className="spinner-container" style={{ height: height }}>
      <div
        className="loading-spinner"
        style={{ height: lSize, width: lSize }}
      ></div>
    </div>
  );
};

export default LoadingSpinner;
