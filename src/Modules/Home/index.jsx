import React from "react";
import NavBar from "../Components/NavBar";
import { Box, Tabs, Tab, Typography } from "@mui/material";
import "./Home.css";
import OverView from "./TabData/OverView";
import Management from "./TabData/Management";

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
      style={{ marginTop: "5%" }}
    >
      {value === index && (
        <Box sx={{ paddingY: 4 }}>
          <Typography component="span">{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const Home = () => {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <>
      <NavBar />
      <Box className="main-container">
        <Box className="graph-container"></Box>
        <Box className="tab-container">
          <Box sx={{ width: "100%"}}>
            <Box className="tabinfo-container">
              <Box
                sx={{
                  borderBottom: 1,
                  borderColor: "divider",
                }}
              >
                <Tabs
                  value={value}
                  onChange={handleChange}
                  aria-label="basic tabs example"
                  variant="fullWidth"
                  centered
                  TabIndicatorProps={{
                    style: {
                      backgroundColor: "#8da8d3",
                      height: 2,
                    },
                  }}
                >
                  <Tab
                    label={"overview"}
                    {...a11yProps(0)}
                    className="tab-text"
                  />
                  <Tab
                    label={" management"}
                    {...a11yProps(1)}
                    className="tab-text"
                  />
                  <Tab
                    label={"Pending"}
                    {...a11yProps(2)}
                    className="tab-text"
                  />
                  <Tab
                    label={"ownership data"}
                    {...a11yProps(3)}
                    className="tab-text"
                  />
                  <Tab
                    label={"financials"}
                    {...a11yProps(4)}
                    className="tab-text"
                  />
                  <Tab
                    label={"filings"}
                    {...a11yProps(5)}
                    className="tab-text"
                  />
                  <Tab label={"peers"} {...a11yProps(6)} className="tab-text" />
                  <Tab
                    label={"Due Deligance"}
                    {...a11yProps(7)}
                    className="tab-text"
                  />
                </Tabs>
              </Box>
              <Box>
                <Typography color="white">Hello</Typography>
              </Box>
            </Box>
            <CustomTabPanel value={value} index={0}>
              <OverView />
            </CustomTabPanel>
            <CustomTabPanel value={value} index={1}>
              <Management />
            </CustomTabPanel>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default Home;
