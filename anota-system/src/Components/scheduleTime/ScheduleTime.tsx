import React from "react";
import "./ScheduleTime.scss";

interface ScheduleTimeProps {
  value: string;
  selected?: boolean;
  onSelectSlot: (value: string) => void;
}

const ScheduleTime = ({
  value,
  selected = false,
  onSelectSlot,
}: ScheduleTimeProps) => {
  return (
    <div
      onClick={() => onSelectSlot(value)}
      className={`ScheduleTime ${selected ? "selected" : ""}`}
    >
      {value}
    </div>
  );
};

export default ScheduleTime;
