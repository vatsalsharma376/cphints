import React from "react";
import Dropdown from "react-bootstrap/Dropdown";
import { Image } from "react-bootstrap";
import Avatar from "../assets/images/avatar.jpg";

const Dropmenu = ({ setLoggedIn, token }) => {
  const handleLogout = () => {
    localStorage.removeItem("token");
    setLoggedIn(false);
    window.location.href = "/";
  };
  const decode_jwt = (token) => {
    var base64Url = token.split(".")[1];
    var base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    var jsonPayload = decodeURIComponent(
      window
        .atob(base64)
        .split("")
        .map(function (c) {
          return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
        })
        .join("")
    );

    return JSON.parse(jsonPayload).username;
  };
  return (
    <div>
      <Dropdown
        align={"end"}
        style={{
          marginTop: "0px",
          color: "black",
        }}
        drop={"centered"}
      >
        <Dropdown.Toggle
          className="bg-purplee"
          variant="success"
          id="dropdown-basic"
          style={{ border: "none" }}
        >
          <Image src={Avatar} style={{ width: "1.5em" }} roundedCircle />
        </Dropdown.Toggle>

        <Dropdown.Menu style={{ top: "80%" }}>
          <Dropdown.Item href="#/action-1" disabled={"true"}>
            {decode_jwt(token)}
          </Dropdown.Item>
          <Dropdown.Item href="/profile">Profile</Dropdown.Item>
          <Dropdown.Item href="/" onClick={handleLogout}>
            Sign Out
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </div>
  );
};

export default Dropmenu;
