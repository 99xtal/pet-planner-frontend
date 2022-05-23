/* eslint-disable jsx-a11y/anchor-is-valid */
// General Imports
import React, { useEffect, useState } from "react";
import "./BioWidget.css";

// Component Imports
import { Dropdown } from "react-bootstrap";
import { BsThreeDots } from "react-icons/bs";
import BioInfoDisplay from "./BioInfoDisplay";
import BioInfoEdit from "./BioInfoEdit";

// Hook Imports
import useAxiosGet from "../../hooks/useAxiosGet";
import useAuth from "../../hooks/useAuth";
import axios from "axios";

const BioWidget = ({ petId }) => {
  const [user, token] = useAuth();
  const [pet, petIsLoading] = useAxiosGet(
    `http://127.0.0.1:8000/api/pets/${petId}/`
  );

  const [dashboard, setDashboard] = useState([]);
  const [updates, setUpdates] = useState([]);

  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        let response = await axios.get("http://127.0.0.1:8000/api/widgets/", {
          headers: {
            Authorization: "Bearer " + token,
          },
        });
        setDashboard(response.data);
      } catch (error) {
        console.log(error.response.data);
      }
    };
    fetchData();
  }, [updates]);

  const isInUserDashboard = dashboard.find((widget) => {
    return widget.type === "bio" && widget.pet.id == petId;
  });

  const CustomToggle = React.forwardRef(({ onClick }, ref) => (
    <a
      href=""
      ref={ref}
      onClick={(e) => {
        e.preventDefault();
        onClick(e);
      }}
    >
      <BsThreeDots size={24} color={"#707070"} />
    </a>
  ));

  async function addToDashboard() {
    try {
      await axios.post(
        "http://127.0.0.1:8000/api/widgets/",
        {
          type: "bio",
          user_id: user.id,
          pet_id: petId,
        },
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );
      setUpdates((prev) => [1, ...prev]);
    } catch (error) {
      console.log(error.response.data);
    }
  }

  async function removeFromDashboard() {
    try {
      await axios.delete(
        `http://127.0.0.1:8000/api/widgets/${isInUserDashboard.id}/`,
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );
      setUpdates((prev) => [1, ...prev]);
    } catch (error) {
      console.log(error.response.data);
    }
  }

  const handleSelect = (key) => {
    switch (key) {
      case "edit":
        setEditMode(!editMode);
        break;
      case "add":
        addToDashboard();
        break;
      case "remove":
        removeFromDashboard();
        break;
      default:
        console.log("Invalid select event");
    }
    if (key === "edit") {
      setEditMode(!editMode);
    }
  };

  return (
    <>
      {!petIsLoading ? (
        <div className="widget">
          <div className="widget__header">
            <h2 className="widget__title">Bio</h2>
            <Dropdown onSelect={handleSelect}>
              <Dropdown.Toggle as={CustomToggle} />
              <Dropdown.Menu>
                <Dropdown.Item eventKey={"edit"}>Edit</Dropdown.Item>
                {isInUserDashboard ? (
                  <Dropdown.Item eventKey={"remove"}>
                    Remove From Dashboard
                  </Dropdown.Item>
                ) : (
                  <Dropdown.Item eventKey={"add"}>
                    Add to Dashboard
                  </Dropdown.Item>
                )}
              </Dropdown.Menu>
            </Dropdown>
          </div>
          <div className="widget__body">
            {editMode ? (
              <BioInfoEdit pet={pet} setEditMode={setEditMode} />
            ) : (
              <BioInfoDisplay petId={petId} />
            )}
          </div>
        </div>
      ) : null}
    </>
  );
};

export default BioWidget;
