import React, { useEffect, useState } from "react";
import "./OverView.css";
import { Box, Typography, Button, Divider } from "@mui/material";
import { apiCall } from "../../../../utils/axiosService";
import { apiResponse } from "../../../../utils/apiResponse";

const profileData1 = [
  { name: "Name", detail: "Duis ipsum eu tempor in nisi nulla tempor" },
  { name: "Name", detail: "Duis ipsum eu tempor in nisi nulla tempor" },
  { name: "Name", detail: "Duis ipsum eu tempor in nisi nulla tempor" },
  { name: "Name", detail: "Duis ipsum eu tempor in nisi nulla tempor" },
  { name: "Name", detail: "Duis ipsum eu tempor in nisi nulla tempor" },
];

const profileData2 = [
  { name: "Name", detail: "Duis ipsum eu tempor in nisi nulla tempor" },
  { name: "Name", detail: "Duis ipsum eu tempor in nisi nulla tempor" },
  { name: "Name", detail: "Duis ipsum eu tempor in nisi nulla tempor" },
  { name: "Name", detail: "Duis ipsum eu tempor in nisi nulla tempor" },
  { name: "Name", detail: "Duis ipsum eu tempor in nisi nulla tempor" },
];
const profileData3 = [
  { name: "Name", detail: "Duis ipsum eu tempor in nisi nulla tempor" },
  {
    name: "Part of index",
    detailset: [
      "CNX100",
      "CNX200",
      " CNX500",
      "CNXCOMMO",
      "CNXENER",
      "CNXLOW",
      "NIFTY",
      "NIFTY INDIA MFG",
      "NIFTY INFRA",
      "NIFTY50EQUALWEIGHT",
      "CNX100",
      "NIFTYEV&NEWAGEAUTOMOTIVEINDEX",
      "NSECASHOPTIONS",
    ],
  },
  { name: "Name", detail: "Duis ipsum eu tempor in nisi nulla tempor" },
  { name: "Name", detail: "Duis ipsum eu tempor in nisi nulla tempor" },
];

const profileData4 = [
  { name: "Name", detail: "Duis ipsum eu tempor in nisi nulla tempor" },
  { name: "Name", detail: "Duis ipsum eu tempor in nisi nulla tempor" },
];

const OverView = () => {
  const [readMoreClick, setReadMoreClick] = useState(false);
  const [data, setData] = useState([]);
  const [companyData, setCompanyData] = useState({});

  const getAPiList = async () => {
    let getDataResp = await apiCall(
      {
        method: "GET",
        url: "https://finscreener.in/api/company/L17110MH1973PLC019786/RELIANCE%20INDUSTRIES%20LIMITED/",
      },
      false
    );

    setCompanyData(getDataResp?.data?.companyData);
  };
  console.log("companyData", companyData);
  useEffect(() => {
    getAPiList();
  }, []);

  const PartOfIndexDetails = ({ dataset }) => {
    return (
      <Box className="part-of-index-container">
        {dataset?.map((item) => (
          <Typography className="partitem-box">{item}</Typography>
        ))}
      </Box>
    );
  };

  const filteredKeys = [
    "CIN",
    "company",
    "companyType",
    "companyOrigin",
    "registrationNumber",
    "dateOfIncorporation",
    "emailAddress",
    "whetherListedOrNot",
    "companyCategory",
    "companySubcategory",
  ];
  const filterKeys2 = [
    
    "classOfCompany",
    "authorisedCapital",
    "paidUpCapital",
    "llpStatus",
    "mainDivision",
    "mainDivisionDescription",
    "rdName",
    "rdRegion",
    "balanceSheetDate",
  ];
  const filteredCompanyData = Object.fromEntries(
    Object.entries(companyData).filter(([key]) => filteredKeys.includes(key))
  );
  const companyDetails = Object.keys(filteredCompanyData).map((key) => ({
    name: key,
    detail: filteredCompanyData[key] || "N/A",
  }));
  const filteredCompanyData2 = Object.fromEntries(
    Object.entries(companyData).filter(([key]) => filterKeys2.includes(key))
  );
  const companyDetails2 = Object.keys(filteredCompanyData2).map((key) => ({
    name: key,
    detail: filteredCompanyData2[key] || "N/A",
  }));

  const ProfileDetails = ({ data, title }) => {
    return (
      <Box className="profildetail-main">
        <Typography sx={{ position: "absolute" , textTransform:"uppercase"}}>
          {title ? title : ""}
        </Typography>
        <Box className="profiledetail-div">
          {data?.map((item, index) => {
            return (
              <React.Fragment key={index}>
                <Typography className="cprofile-title">{item?.name}</Typography>
                {item?.name === "Part of index" ? (
                  <PartOfIndexDetails dataset={item.detailset} />
                ) : (
                  <Typography>{item?.detail}</Typography>
                )}
                {index < data.length - 1 && <Divider className="divider" />}
              </React.Fragment>
            );
          })}
        </Box>
      </Box>
    );
  };

  return (
    <Box className="overview-main">
      <Typography className="about-title">About the company</Typography>
      <Typography className="about-company">
        RELIANCE INDUSTRIES LIMITED, is a Public Listed Company incorporated in
        the year 1973 and engaged in the business of Oil Refining and Marketing.
        As per the latest available financials filed by the company for the year
        Mar 2023, the total paid-up capital is INR 67,660 million and Authorized
        capital is INR 140,000 million. The last Annual General Meeting (AGM) of
        the company was held on 28 August, 2023 and the company has filed their
        last balance sheet for the period ending on Mar 2023.
      </Typography>
      {readMoreClick && (
        <Typography className="about-company">
          The registered office address of this company is 3rd Floor, Maker
          Chambers Iv, 222 Nariman Point, Mumbai, Maharashtra - 400021, Email:
          savithri.parekh@ril.com.
        </Typography>
      )}
      <Box
        component="button"
        className="read-more"
        onClick={() => setReadMoreClick(!readMoreClick)}
      >
        {readMoreClick ? "read less-" : "read more+"}
      </Box>
      <Box className="cprofile-container">
        <Box className="cprofile-datadiv">
          <ProfileDetails data={companyDetails} title="Overview" />
          <ProfileDetails data={companyDetails2} />
        </Box>
        <Box className="cprofile-datadiv">
          {/* <ProfileDetails data={profileData3} title="cmadnhsk" /> */}
          {/* <ProfileDetails data={profileData4} title="cmadnhsk" /> */}
        </Box>
      </Box>
    </Box>
  );
};

export default OverView;
