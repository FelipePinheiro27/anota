import React, { useState } from "react";
import "./TimeSlots.scss";
import ScheduleTime from "../scheduleTime/ScheduleTime";

const TimeSlots = () => {
  const [selectedSlots, setSelectedSlots] = useState<string[]>([]);
  const availableSlots = ["18:00", "19:00", "21:00", "22:00", "23:00"];

  const onSelectSlot = (value: string) => {
    const hasTime = selectedSlots.includes(value);

    if (hasTime) {
      setSelectedSlots((slots) => slots.filter((slot) => slot !== value));
    } else setSelectedSlots([...selectedSlots, value]);
  };

  return (
    <div className="TimeSlots">
      {availableSlots.map((slot) => (
        <ScheduleTime
          value={slot}
          onSelectSlot={onSelectSlot}
          selected={selectedSlots.includes(slot)}
        />
      ))}
    </div>
  );
};

export default TimeSlots;
