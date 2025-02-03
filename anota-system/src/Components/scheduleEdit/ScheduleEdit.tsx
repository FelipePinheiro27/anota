import React from "react";
import { Box, TextField, Typography } from "@mui/material";
import { ConfigReservations } from "../../types/generalTypes";

const daysOfWeek = [
  "Domingo",
  "Segunda-feira",
  "Terça-feira",
  "Quarta-feira",
  "Quinta-feira",
  "Sexta-feira",
  "Sábado",
];

interface ScheduleEditProps {
  reservationsConfig: ConfigReservations[];
  setReservationsConfig: React.Dispatch<
    React.SetStateAction<ConfigReservations[]>
  >;
  courtId: string | number;
}

const ScheduleEdit = ({
  reservationsConfig,
  setReservationsConfig,
  courtId,
}: ScheduleEditProps) => {
  const handleChange = (
    index: number,
    field: keyof ConfigReservations,
    value: string | number
  ) => {
    setReservationsConfig((prev) => {
      const updatedConfigs = [...prev];
      const existingConfig = updatedConfigs.find(
        (res) => res.day_of_week === index
      );

      if (existingConfig) {
        existingConfig[field] = value as never;
      } else {
        updatedConfigs.push({
          day_of_week: index as 0 | 1 | 2 | 3 | 4 | 5 | 6,
          start_time: field === "start_time" ? (value as string) : "",
          end_time: field === "end_time" ? (value as string) : "",
          price: field === "price" ? (value as number) : 0,
          court_id: courtId,
        });
      }

      return updatedConfigs;
    });
  };

  return (
    <Box>
      <form>
        {daysOfWeek.map((day, index) => {
          const data = reservationsConfig.find(
            (res) => res.day_of_week === index
          );

          return (
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
                  type="time"
                  value={data?.start_time || ""}
                  onChange={(e) =>
                    handleChange(index, "start_time", e.target.value + ":00")
                  }
                  fullWidth
                  InputLabelProps={{ shrink: true }}
                  InputProps={{
                    sx: { textAlign: "left", "& input": { textAlign: "left" } },
                  }}
                />

                <TextField
                  label="Horário Final"
                  type="time"
                  value={data?.end_time || ""}
                  onChange={(e) =>
                    handleChange(index, "end_time", e.target.value + ":00")
                  }
                  fullWidth
                  InputProps={{
                    sx: { textAlign: "left", "& input": { textAlign: "left" } },
                  }}
                  InputLabelProps={{ shrink: true }}
                />
                <TextField
                  label="Valor por Hora (R$)"
                  type="number"
                  value={data?.price || ""}
                  onChange={(e) =>
                    handleChange(
                      index,
                      "price",
                      parseFloat(e.target.value) || 0
                    )
                  }
                  fullWidth
                  InputProps={{
                    sx: { textAlign: "left", "& input": { textAlign: "left" } },
                  }}
                  InputLabelProps={{ shrink: true }}
                />
              </Box>
            </Box>
          );
        })}
      </form>
    </Box>
  );
};

export default ScheduleEdit;
