/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from "react";
import { Dropdown } from "react-bootstrap";
import { BsThreeDots } from "react-icons/bs";

import axios from "axios";
import useAuth from "../../hooks/useAuth";

const EventMenu = ({ eventId, setEditMode, getEvents }) => {
  const [user, token] = useAuth();

  const CustomToggle = React.forwardRef(({ onClick }, ref) => (
    <a
      href=""
      ref={ref}
      onClick={(e) => {
        e.preventDefault();
        onClick(e);
      }}
    >
      <BsThreeDots size={16} color={"#707070"} />
    </a>
  ));

  const handleDelete = () => {
    deleteEvent();
  };

  async function deleteEvent() {
    try {
      await axios.delete("http://127.0.0.1:8000/api/events/" + eventId + "/", {
        headers: {
          Authorization: "Bearer " + token,
        },
      });
      getEvents();
    } catch (error) {
      console.log(error);
    }
  }

  const handleSelect = (key) => {
    switch (key) {
      case "edit":
        setEditMode((current) => !current);
        break;
      case "delete":
        handleDelete();
        break;
      default:
        console.log("Invalid select event");
    }
  };

  return (
    <>
      <Dropdown onSelect={handleSelect}>
        <Dropdown.Toggle as={CustomToggle} />
        <Dropdown.Menu>
          <Dropdown.Item eventKey={"edit"}>Edit</Dropdown.Item>
          <Dropdown.Item eventKey={"delete"}>Delete</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </>
  );
};

export default EventMenu;
