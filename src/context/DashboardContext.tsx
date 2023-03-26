import React, { createContext, useState, useEffect, useContext } from 'react';

import { getWidgets, postWidget, deleteWidget } from '../api';
import type { Widget, WidgetForm, WidgetOptions } from '../api/widgets/types';
import AuthContext from './AuthContext';

interface DashboardContextValue {
  dashboard: Widget[];
  addToDashboard: (widgetType: WidgetOptions, petId: number) => void;
  removeFromDashboard: (widgetType: WidgetOptions, petId: number) => Promise<void>;
  findOnDashboard: (widgetType: WidgetOptions, petId: number) => Widget | undefined;
}

const DashboardContext = createContext<DashboardContextValue>({
  dashboard: [],
  addToDashboard: (_, __) => null,
  removeFromDashboard: (_, __) => new Promise((resolve) => null),
  findOnDashboard: (_, __) => undefined,
});

export default DashboardContext;

export const DashboardProvider = ({ children }) => {
  const [dashboard, setDashboard] = useState<Widget[]>([]);
  const [needsUpdate, setNeedsUpdate] = useState(false);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    getWidgets()
      .then((res) => setDashboard(res.data))
      .catch((err) => console.log(err));

    return () => setNeedsUpdate(false);
  }, [needsUpdate]);

  function addToDashboard(widgetType: WidgetOptions, petId: number) {
    if (!user) { return; }
    let newWidget: WidgetForm = {
      type: widgetType,
      user_id: user.id,
    };
    if (petId) {
      newWidget['pet_id'] = petId;
    }
    postWidget(newWidget)
      .then(() => setNeedsUpdate(true))
      .catch((err) => console.log(err));
  }

  async function removeFromDashboard(widgetType: WidgetOptions, petId: number) {
    const widget = dashboard.find((widget) => {
      return widget.type === widgetType && widget.pet?.id == petId;
    });

    if (!widget) { return; }

    deleteWidget(widget.id)
      .then(() => setNeedsUpdate(true))
      .catch((err) => console.log(err));
  }

  function findOnDashboard(widgetType: WidgetOptions, petId: number) {
    return dashboard.find(
      (widget) => widget.type === widgetType && widget.pet?.id == petId
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
