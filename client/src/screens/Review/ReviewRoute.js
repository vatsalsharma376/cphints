import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import Review from "./Review";
import BACKEND_URL from "../../constants";

const token = localStorage.getItem("token");
axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

const ReviewRouter = () => {
  const [hints, setHints] = useState([]);
  const [isAuthorised, setisAuthorised] = useState(-1);

  const navigate = useNavigate();
  const getHints = async () => {
    try {
      const res = await axios.get(`${BACKEND_URL}/review/`);
      setHints(await res.data);
      if (res.status === 200) setisAuthorised(1);
      else setisAuthorised(0);
    } catch (e) {
      setisAuthorised(0);
    }
  };
  useEffect(() => {
    getHints();
  }, []);

  if (isAuthorised == 1) {
    return <Review hints={hints} isAuthorised={isAuthorised} />;
  } else if (isAuthorised == 0) {
    navigate("/");
  }
};

export default ReviewRouter;
