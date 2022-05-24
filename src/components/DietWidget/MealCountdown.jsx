import React, { useState, useEffect } from "react";

const MealCountdown = ({ nearestMeal }) => {
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearTimeout(timer);
  });

  function calculateTimeLeft() {
    let d = new Date();
    const currentTimeInSeconds =
      d.getHours() * 3600 + d.getMinutes() * 60 + d.getSeconds();
    const mealTimeInSeconds =
      parseInt(nearestMeal.time.slice(0, 2)) * 3600 +
      parseInt(nearestMeal.time.slice(3, 5)) * 60 +
      parseInt(nearestMeal.time.slice(6, 8));
    const timeDifference = mealTimeInSeconds - currentTimeInSeconds;

    return timeDifference;
  }

  return <></>;
};

export default MealCountdown;
