import React, { useState, useEffect } from "react";

const MealCountdown = ({ nearestMeal }) => {
  const [timeLeft, { start }] = useCountDown(calculateTimeLeft(), 1000);

  useEffect(() => {
    start();
  }, []);

  function calculateTimeLeft() {
    let d = new Date();
    const currentTimeInMS =
      d.getHours() * 3600000 + d.getMinutes() * 60000 + d.getSeconds() * 1000;
    const mealTimeInMS =
      parseInt(nearestMeal.time.slice(0, 2)) * 3600000 +
      parseInt(nearestMeal.time.slice(3, 5)) * 60000 +
      parseInt(nearestMeal.time.slice(6, 8)) * 1000;
    const timeDifference = mealTimeInMS - currentTimeInMS;

    return timeDifference;
  }

  function padZeros(num) {
    return num.toString().padStart(2, "0");
  }

  function msToTime(ms) {
    let seconds = Math.floor(ms / 1000);
    let minutes = Math.floor(seconds / 60);
    let hours = Math.floor(minutes / 60);

    seconds = seconds % 60;
    minutes = minutes % 60;

    return `${padZeros(hours)}:${padZeros(minutes)}:${padZeros(seconds)}`;
  }

  return (
    <>
      <p>{msToTime(timeLeft)}</p>
    </>
  );
};

export default MealCountdown;
