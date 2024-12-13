import React from "react";
import { ReservationTypes } from "../../types/generalTypes";
import "./ScheduleTime.scss";

interface ScheduleTimeProps {
  value: ReservationTypes;
  selected?: boolean;
  disabled?: boolean;
  onSelectSlot: (value: string) => void;
  primaryColor: string;
}

const ScheduleTime = ({
  value,
  selected = false,
  onSelectSlot,
  disabled = false,
  primaryColor,
}: ScheduleTimeProps) => {
  return (
    <div
      onClick={() => !disabled && onSelectSlot(value.start)}
      style={{ border: `1px solid ${selected ? primaryColor : ""}` }}
      className={`ScheduleTime ${selected ? "selected" : ""} ${
        disabled ? "disabled" : ""
      } `}
    >
      {value.start} - {value.end}
    </div>
  );
};

export default ScheduleTime;
