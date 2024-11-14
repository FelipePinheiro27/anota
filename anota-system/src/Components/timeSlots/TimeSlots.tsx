import React from "react";
import "./TimeSlots.scss";
import ScheduleTime from "../scheduleTime/ScheduleTime";

const TimeSlots = () => {
  return (
    <div className="TimeSlots">
      <ScheduleTime />
      <ScheduleTime />
      <ScheduleTime />
      <ScheduleTime />
      <ScheduleTime />
    </div>
  );
};

export default TimeSlots;
