import React, { useEffect, useState, useRef } from "react";
import { Box, Typography, Tooltip } from "@mui/material";
import CourtsTable from "../court/courtsTable/CourtsTable";
import { CompanyType, CourtTypes } from "../../types/generalTypes";
import LoadingSpinner from "../loadingSpinner/LoadingSpinner";
import useIsMobile from "../../hooks/useIsMobile";
import Add from "../../images/plusWhite.svg";
import { useCompanyCourts } from "../../hooks/useCompanyCourts";
import AddCourt from "../addCourt/AddCourt";
import { plansCourtQtt, plansCourtText } from "../../constants/Plans";
import { getCompanyData } from "../../utils/generalUtil";
import { getCompanyById } from "../../api/CompanyAPI";

const CompanyCourts = () => {
  const [courts, setCourts] = useState<CourtTypes[]>([]);
  const [company, setCompany] = useState<CompanyType | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [openAddCourt, setOpenAddCourt] = useState(false);
  const [isTooltipOpen, setIsTooltipOpen] = useState(false);
  const buttonRef = useRef<HTMLDivElement>(null);
  const { fetchCourts } = useCompanyCourts({ setCourts, setIsLoading });
  const isMobile = useIsMobile();

  const text = plansCourtText[company?.plan || ""];
  const courtsQtt = plansCourtQtt[company?.plan || ""];
  const isDisabled = courts.length >= courtsQtt;

  useEffect(() => {
    const retrieveCompany = async () => {
      const companyPartialData = getCompanyData();
      const companyValue = await getCompanyById(
        companyPartialData?.companyId?.toString() ?? ""
      );
      setCompany(companyValue);
    };
    retrieveCompany();
  }, []);

  useEffect(() => {
    fetchCourts();
  }, [fetchCourts]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        buttonRef.current &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        setIsTooltipOpen(false);
      }
    };

    if (isTooltipOpen) {
      document.addEventListener("click", handleClickOutside);
    } else {
      document.removeEventListener("click", handleClickOutside);
    }

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [isTooltipOpen]);

  const handleClick = () => {
    if (isDisabled && isMobile) {
      setIsTooltipOpen(true);
    } else if (!isDisabled) {
      setOpenAddCourt(true);
    }
  };

  return (
    <Box>
      <Box display="flex" alignItems="center" justifyContent="space-between">
        <Typography
          sx={{ fontWeight: 600, letterSpacing: "0.2" }}
          fontSize={isMobile ? "16px" : "18px"}
          color="#22303E"
        >
          Minhas Quadras
        </Typography>
        <Tooltip
          title={isDisabled ? text : ""}
          arrow
          open={isMobile ? isTooltipOpen : undefined}
          disableHoverListener={isMobile}
          sx={{
            bgcolor: "rgba(0, 0, 0, 0.85)",
            fontSize: "14px",
            color: "#fff",
            padding: "6px 12px",
            borderRadius: "6px",
          }}
        >
          <Box
            ref={buttonRef}
            height="45px"
            width="45px"
            borderRadius="50%"
            onClick={handleClick}
            sx={{
              background: isDisabled ? "#A0A0A0" : "#226FE2",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: isDisabled ? "not-allowed" : "pointer",
              opacity: isDisabled ? 0.6 : 1,
              transition: "all 0.2s ease-in-out",
              "&:hover": {
                background: isDisabled ? "#A0A0A0" : "#1A5ACB",
              },
            }}
          >
            <img src={Add} alt="Add" width="18px" height="18px" />
          </Box>
        </Tooltip>
      </Box>
      <Box marginTop={isMobile ? "24px" : "40px"}>
        {isLoading ? (
          <Box marginTop="180px" display="flex" justifyContent="center">
            <LoadingSpinner />
          </Box>
        ) : (
          <CourtsTable courts={courts} refetchCourts={fetchCourts} />
        )}
      </Box>
      {openAddCourt && (
        <AddCourt
          closeModal={() => setOpenAddCourt(false)}
          fetchCourts={fetchCourts}
        />
      )}
    </Box>
  );
};

export default CompanyCourts;
