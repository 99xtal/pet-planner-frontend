import { createContext, useState, useEffect } from "react";
import useAuth from "../hooks/useAuth";

import { getWidgets, postWidget, deleteWidget } from "../utils/api";

const DashboardContext = createContext();

export default DashboardContext;

export const DashboardProvider = ({ children }) => {
  const [dashboard, setDashboard] = useState([]);
  const [needsUpdate, setNeedsUpdate] = useState(false);
  const [user, token] = useAuth();

  useEffect(() => {
    getWidgets()
      .then((res) => setDashboard(res.data))
      .catch((err) => console.log(err));

    return () => setNeedsUpdate(false);
  }, [needsUpdate]);

  function addToDashboard(widgetType, petId) {
    let newWidget = {
      type: widgetType,
      user_id: user.id,
    };
    if (petId) {
      newWidget["pet_id"] = petId;
    }
    postWidget(newWidget)
      .then(() => setNeedsUpdate(true))
      .catch((err) => console.log(err));
  }

  async function removeFromDashboard(widgetType, petId) {
    const widget = dashboard.find((widget) => {
      return widget.type === widgetType && widget.pet.id == petId;
    });

    deleteWidget(widget.id)
      .then(() => setNeedsUpdate(true))
      .catch((err) => console.log(err));
  }

  function findOnDashboard(widgetType, petId) {
    return dashboard.find(
      (widget) => widget.type === widgetType && widget.pet.id == petId
    );
  }

  const contextData = {
    dashboard,
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
