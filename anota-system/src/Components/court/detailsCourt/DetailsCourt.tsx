import React, { useState } from "react";
import { Button } from "@mui/material";
import { CourtTypes } from "../../../types/generalTypes";
import DetailsCourtModal from "../../detailsCourtModal/DetailsCourtModal";

interface DetailsCourtProps {
  court: CourtTypes;
  refetchCourts: () => Promise<void>;
}

const DetailsCourt = ({ court, refetchCourts }: DetailsCourtProps) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button
        variant="contained"
        sx={{
          marginTop: { xs: "16px" },
          padding: { xs: "12px 30px", md: "12px 30px" },
          background: "#2AA137",
          fontWeight: 600,
          textTransform: "capitalize",
        }}
        onClick={() => setOpen(true)}
      >
        Editar
      </Button>
      <DetailsCourtModal
        open={open}
        closeModal={() => setOpen(false)}
        court={court}
        refetchCourts={refetchCourts}
      />
    </>
  );
};

export default DetailsCourt;
