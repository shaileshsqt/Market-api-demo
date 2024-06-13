import React, { useEffect, useState } from "react";
import "./Management.css";
import {
  Box,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";

import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { apiCall } from "../../../../utils/axiosService";
import { styled } from "@mui/material/styles";

const DarkTableContainer = styled(TableContainer)(({ theme }) => ({
  backgroundColor: "#333", // Dark background color
}));

const DarkTableCell = styled(TableCell)(({ theme }) => ({
  color: "#fff", // White text color
  borderColor: "#444", // Border color
}));

const DarkTableHead = styled(TableHead)(({ theme }) => ({
  backgroundColor: "#444", // Slightly lighter dark background for header
}));

const Management = () => {
  const [expanded, setExpanded] = React.useState(false);
  const [managmentData, setManagmentData] = useState([]);

  const getAPiList = async () => {
    let getDataResp = await apiCall(
      {
        method: "GET",
        url: "https://finscreener.in/api/company/L17110MH1973PLC019786/RELIANCE%20INDUSTRIES%20LIMITED/",
      },
      false
    );

    setManagmentData(getDataResp?.data?.directorData);
  };

  useEffect(() => {
    getAPiList();
  }, []);
  console.log("managmentData", managmentData);
  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <Box className="management-main">
      <Typography className="main-title">
        Director and Key Management Personnel details
      </Typography>

      <Box className="accordian-main">
        <Accordion disabled>
          <AccordionSummary
            className="header-panel"
            aria-controls="panel1bh-content"
            id="panel1bh-header"
          >
            <Typography sx={{ width: "50%", flexShrink: 0 }}>
              Name & Designation
            </Typography>
            <Typography sx={{ width: "30%", flexShrink: 0 }}>DIN No</Typography>

            <Typography
              sx={{
                width: "20%",
                flexShrink: 0,
                justifyContent: "flex-end",
                display: "flex",
              }}
            >
              Originally Appointed On
            </Typography>
          </AccordionSummary>
        </Accordion>
        {managmentData?.map((item, index) => {
          return (
            <Accordion
              expanded={expanded === index}
              onChange={handleChange(index)}
            >
              <AccordionSummary
                className="accordian-panel"
                expandIcon={
                  <ExpandMoreIcon
                    sx={{ color: "white", marginLeft: 2, marginLeft: 2 }}
                  />
                }
                aria-controls="panel1bh-content"
                id="panel1bh-header"
                // <span>(Chairman & maaging director)</span>
              >
                <Typography sx={{ width: "50%", flexShrink: 0 }}>
                  {item.FirstName + " " + item.LastName}
                </Typography>
                <Typography sx={{ width: "25%", flexShrink: 0 }}>
                  {item?.DIN}
                </Typography>
                <Typography
                  sx={{
                    width: "25%",
                    flexShrink: 0,
                    justifyContent: "flex-end",
                    display: "flex",
                  }}
                >
                  {item?.dateOfAppointment}
                </Typography>
              </AccordionSummary>
              <AccordionDetails className="panel-detail">
                {/* <Typography>
                  Nulla facilisi. Phasellus sollicitudin nulla et quam mattis
                  feugiat. Aliquam eget maximus est, id dignissim quam.
                </Typography> */}
                {item?.MCAUserRole?.length > 0 && (
                  <DarkTableContainer component={Paper}>
                    <Table aria-label="dark table">
                      <DarkTableHead>
                        <TableRow>
                          <DarkTableCell>CIN</DarkTableCell>
                          <DarkTableCell>companyName</DarkTableCell>
                          <DarkTableCell>Role</DarkTableCell>
                          <DarkTableCell>roleEffectiveDate</DarkTableCell>
                          <DarkTableCell>currentDesignationDate</DarkTableCell>
                          <DarkTableCell>designation</DarkTableCell>
                        </TableRow>
                      </DarkTableHead>
                      <TableBody>
                        {item?.MCAUserRole?.map((user, index) => {
                          return (
                            <TableRow key={index}>
                              <DarkTableCell>
                                {user?.cin ? user?.cin : "-"}
                              </DarkTableCell>
                              <DarkTableCell>
                                {user?.companyName ? user?.companyName : "-"}
                              </DarkTableCell>
                              <DarkTableCell>
                                {user?.role ? user?.role : "-"}
                              </DarkTableCell>
                              <DarkTableCell>
                                {user?.roleEffectiveDate
                                  ? user?.roleEffectiveDate
                                  : "-"}
                              </DarkTableCell>
                              <DarkTableCell>
                                {user?.currentDesignationDate
                                  ? user?.currentDesignationDate
                                  : "-"}
                              </DarkTableCell>
                              <DarkTableCell>
                                {user?.designation ? user?.designation : "-"}
                              </DarkTableCell>
                            </TableRow>
                          );
                        })}
                      </TableBody>
                    </Table>
                  </DarkTableContainer>
                )}
              </AccordionDetails>
            </Accordion>
          );
        })}

        <Box className="button-container">
          <Box component="button" className="viewmore-button">
            View More
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Management;
