import React, { ReactNode } from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { styled } from "@mui/material/styles";

interface AccordionContentProps {
  title: string;
  children: ReactNode;
}

const StyledAccordion = styled(Accordion)(({ theme }) => ({
  boxShadow: "none",
  borderBottom: `1px solid ${theme.palette.divider}`,
  "&:before": {
    display: "none",
  },
  "&.Mui-expanded": {
    margin: 0,
  },
}));

const StyledAccordionSummary = styled(AccordionSummary)(({ theme }) => ({
  padding: 0,
  minHeight: "unset",
  "& .MuiAccordionSummary-content": {
    margin: 0,
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  "& .MuiAccordionSummary-expandIconWrapper": {
    color: theme.palette.text.secondary,
  },
  "&.Mui-expanded": {
    minHeight: "unset",
  },
}));

const StyledAccordionDetails = styled(AccordionDetails)(({ theme }) => ({
  padding: theme.spacing(1, 0),
  borderTop: `1px solid ${theme.palette.divider}`,
}));

const AccordionContent = ({ title, children }: AccordionContentProps) => {
  return (
    <StyledAccordion>
      <StyledAccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1-content"
        id="panel1-header"
      >
        <Typography component="span" variant="body1">
          {title}
        </Typography>
      </StyledAccordionSummary>
      <StyledAccordionDetails>{children}</StyledAccordionDetails>
    </StyledAccordion>
  );
};

export default AccordionContent;
