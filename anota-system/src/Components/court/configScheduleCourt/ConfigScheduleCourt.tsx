import React, { useState } from "react";
import { Button } from "@mui/material";
import { CourtTypes } from "../../../types/generalTypes";
import useIsMobile from "../../../hooks/useIsMobile";
import { colors } from "../../../constants/Colors";
import ModalConfigScheduleCourt from "../modalConfigScheduleCourt/ModalConfigScheduleCourt";

interface ConfigScheduleCourtProps {
  court: CourtTypes;
  refetchCourts: () => Promise<void>;
}

const ConfigScheduleCourt = ({
  court,
  refetchCourts,
}: ConfigScheduleCourtProps) => {
  const [open, setOpen] = useState(false);
  const isMobile = useIsMobile();

  return (
    <>
      <Button
        variant="contained"
        fullWidth={isMobile}
        sx={{
          marginTop: { xs: "16px" },
          padding: { xs: "6px 40px", md: "12px 30px" },
          background: colors.darkBlue,
          fontWeight: 600,
          textTransform: "capitalize",
        }}
        onClick={() => setOpen(true)}
      >
        Editar Horários
      </Button>
      {open && (
        <ModalConfigScheduleCourt
          closeModal={() => setOpen(false)}
          refetchCourts={refetchCourts}
          court={court}
        />
      )}
    </>
  );
};

export default ConfigScheduleCourt;
