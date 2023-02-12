import React, { useContext } from "react";
import BioWidget from "../../components/BioWidget/BioWidget";
import DietWidget from "../../components/DietWidget/DietWidget";
import HealthWidget from "../../components/HealthWidget/HealthWidget";
import TimelineWidget from "../../components/TimelineWidget/TimelineWidget";

import DashboardContext from "../../context/DashboardContext";

const DashboardPage = () => {
  const { dashboard } = useContext(DashboardContext);

  return (
    <>
      <div>
        <TimelineWidget />
      </div>

      {dashboard &&
        dashboard.map((widget) => {
          switch (widget.type) {
            case "bio":
              return (
                <div key={widget.id}>
                  <BioWidget petId={widget.pet.id} onDashboard={true} />
                </div>
              );
            case "diet":
              return (
                <div key={widget.id}>
                  <DietWidget petId={widget.pet.id} onDashboard={true} />
                </div>
              );
            case "health":
              return (
                <div key={widget.id}>
                  <HealthWidget petId={widget.pet.id} onDashboard={true} />
                </div>
              );
            default:
              return null;
          }
        })}
    </>
  );
};

export default DashboardPage;
