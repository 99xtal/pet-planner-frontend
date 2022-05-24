import { createContext, useState, useEffect } from "react";
import useAuth from "../hooks/useAuth";
import axios from "axios";

const DashboardContext = createContext();

export default DashboardContext;

export const DashboardProvider = ({ children }) => {
  const BASE_URL = "http://127.0.0.1:8000/api/widgets/";
  const [dashboard, setDashboard] = useState();
  const [user, token] = useAuth();

  const fetchDashboard = async () => {
    try {
      let response = await axios.get(BASE_URL, {
        headers: {
          Authorization: "Bearer " + token,
        },
      });
      setDashboard(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => fetchDashboard(), []);

  async function addToDashboard(widgetType, petId) {
    try {
      await axios.post(
        BASE_URL,
        {
          type: widgetType,
          user_id: user.id,
          pet_id: petId,
        },
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );
      fetchDashboard();
    } catch (error) {
      console.log(error);
    }
  }

  async function removeFromDashboard(widgetType, petId) {
    const widget = dashboard.find((widget) => {
      return widget.type === widgetType && widget.pet.id == petId;
    });

    try {
      await axios.delete(`http://127.0.0.1:8000/api/widgets/${widget.id}/`, {
        headers: {
          Authorization: "Bearer " + token,
        },
      });
    } catch (error) {
      console.log("Remove error");
      console.log(error.response);
    }
  }

  function findOnDashboard(widgetType, petId) {
    return dashboard.find(
      (widget) => widget.type === widgetType && widget.pet.id == petId
    );
  }

  const contextData = {
    dashboard,
    fetchDashboard,
    addToDashboard,
    removeFromDashboard,
    findOnDashboard,
  };

  return (
    <DashboardContext.Provider value={contextData}>
      {children}
    </DashboardContext.Provider>
  );
};
