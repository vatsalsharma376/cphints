import React from "react";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownItem from "react-bootstrap/DropdownItem";
import { Image } from "react-bootstrap";
import Avatar from "../assets/images/avatar.jpg";

const Dropmenu = ({ setLoggedIn }) => {
  const handleLogout = () => {
    localStorage.removeItem("token");
    setLoggedIn(false);
    window.location.href = "/";
  };
  return (
    <div>
      <Dropdown
        align={"end"}
        style={{
          marginTop: "0px",
          // marginLeft: "10px",
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
            username
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
