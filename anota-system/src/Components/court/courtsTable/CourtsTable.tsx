import React from "react";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  useMediaQuery,
  Box,
  Typography,
} from "@mui/material";
import { CourtTypes } from "../../../types/generalTypes";
import DetailsCourt from "../detailsCourt/DetailsCourt";
import ConfigScheduleCourt from "../configScheduleCourt/ConfigScheduleCourt";

interface CourtsTableProps {
  courts: CourtTypes[];
  refetchCourts: () => Promise<void>;
}

const CourtsTable = ({ courts, refetchCourts }: CourtsTableProps) => {
  const isMobile = useMediaQuery("(max-width:600px)");

  if (isMobile) {
    return (
      <Box marginTop="40px" textAlign="center">
        {courts.map((court, index) => (
          <Paper
            key={index}
            sx={{
              p: 3,
              mb: 2,
              boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
              marginBottom: "40px",
            }}
          >
            <Typography variant="h5" fontWeight={600}>
              {court.name}
            </Typography>
            <Typography variant="body1" color="text.secondary">
              {court.description}
            </Typography>
            <Box sx={{ mt: 1, color: "blue", cursor: "pointer" }}>
              <DetailsCourt court={court} refetchCourts={refetchCourts} />
            </Box>
            <Box
              sx={{
                mt: 1,
                color: "blue",
                cursor: "pointer",
                marginTop: "-5px",
              }}
            >
              <ConfigScheduleCourt
                court={court}
                refetchCourts={refetchCourts}
              />
            </Box>
          </Paper>
        ))}
      </Box>
    );
  }

  return (
    <Paper>
      <TableContainer sx={{ maxHeight: 500 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              <TableCell style={{ fontWeight: 600 }}>Nome</TableCell>
              <TableCell style={{ fontWeight: 600 }}>Descrição</TableCell>
              <TableCell style={{ fontWeight: 600 }}></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {courts.map((court, index) => (
              <TableRow hover tabIndex={-1} key={index}>
                <TableCell>{court.name}</TableCell>
                <TableCell>{court.description}</TableCell>
                <TableCell>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      gap: "20px",
                    }}
                  >
                    <DetailsCourt court={court} refetchCourts={refetchCourts} />
                    <ConfigScheduleCourt
                      court={court}
                      refetchCourts={refetchCourts}
                    />
                  </Box>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
};

export default CourtsTable;
