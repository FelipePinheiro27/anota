import React, { useState } from "react";
import { Button } from "@mui/material";
import { CourtTypes } from "../../../types/generalTypes";
import DetailsCourtModal from "../../detailsCourtModal/DetailsCourtModal";
import useIsMobile from "../../../hooks/useIsMobile";

interface DetailsCourtProps {
  court: CourtTypes;
  refetchCourts: () => Promise<void>;
}

const DetailsCourt = ({ court, refetchCourts }: DetailsCourtProps) => {
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
          background: "#226FE2",
          fontWeight: 600,
          textTransform: "capitalize",
        }}
        onClick={() => setOpen(true)}
      >
        Editar
      </Button>
      {open && (
        <DetailsCourtModal
          open={open}
          closeModal={() => setOpen(false)}
          court={court}
          refetchCourts={refetchCourts}
        />
      )}
    </>
  );
};

export default DetailsCourt;
