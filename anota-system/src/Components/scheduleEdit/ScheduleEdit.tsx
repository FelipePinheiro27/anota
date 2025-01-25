import React from "react";
import { Box, TextField, Typography } from "@mui/material";

const daysOfWeek = [
  "Segunda-feira",
  "Terça-feira",
  "Quarta-feira",
  "Quinta-feira",
  "Sexta-feira",
  "Sábado",
  "Domingo",
];

const ScheduleEdit = () => {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const scheduleData = daysOfWeek.map((day) => ({
      day,
      startTime: formData.get(`${day}-startTime`) || "",
      endTime: formData.get(`${day}-endTime`) || "",
      hourlyRate: formData.get(`${day}-hourlyRate`) || "",
    }));
  };

  return (
    <Box>
      <form onSubmit={handleSubmit}>
        {daysOfWeek.map((day) => (
          <Box
            key={day}
            sx={{
              marginBottom: 2,
              padding: 2,
              border: "1px solid #ccc",
              borderRadius: 2,
              backgroundColor: "#f9f9f9",
            }}
          >
            <Typography variant="h6" gutterBottom>
              {day}
            </Typography>
            <Box
              sx={{
                display: "flex",
                gap: 2,
                flexDirection: { xs: "column", sm: "row" },
              }}
            >
              <TextField
                label="Horário de início"
                name={`${day}-startTime`}
                type="time"
                fullWidth
                InputLabelProps={{ shrink: true }}
              />
              <TextField
                label="Horário Final"
                name={`${day}-endTime`}
                type="time"
                fullWidth
                InputLabelProps={{ shrink: true }}
              />
              <TextField
                label="Valor por Hora (R$)"
                name={`${day}-hourlyRate`}
                type="number"
                fullWidth
                InputLabelProps={{ shrink: true }}
              />
            </Box>
          </Box>
        ))}
      </form>
    </Box>
  );
};

export default ScheduleEdit;
