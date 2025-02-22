import React, { useState } from "react";
import { Box, Button, Dialog, DialogTitle, DialogContent, DialogActions, Tabs, Tab, Typography } from "@mui/material";
import LoanProfile from "../tabs/LoanProfile";
import Bonds from "../tabs/Bonds";
import Trustees from "../tabs/Trustees";
import Transacrions from "../tabs/Transacrions";
import MapView from "../tabs/MapView";
import Mkataba from "../tabs/Mkataba";
import MainCard from "components/MainCard";
import Transactions from "../tabs/Transacrions";

const LoanProfileDialog = ({ open, onClose, loanProfile }) => {
  const [tabIndex, setTabIndex] = useState(0);

  const handleTabChange = (event, newIndex) => {
    setTabIndex(newIndex);
  };

  const changeTab = (e,index) => {
    setTabIndex(index)
  }

  const loan={

  }
  const remarks =  [
    { text: "Payment received", by: "Admin", date: "2024-02-01" },
    { text: "Late payment notice sent", by: "Support", date: "2024-03-15" },
  ]
  const productInfo = {
    name: "Business Loan",
    description: "A loan for small businesses",
    payIn: "Monthly",
    tenure: 24,
    principalRate: 5,
    processingRate: 2,
  }

  const ss = {
    avatar: "https://via.placeholder.com/100",
    fullName: "John Doe",
    aka: "JD",
    totalLoan: 50000,
    totalPaid: 20000,
    outstanding: 30000,
    home: "New York",
    occupation: "Software Engineer",
    phoneNumber: "+1234567890",
    house: "Apartment",
    loanStatus: "Active",
    loanStartDate: "2024-01-01",
    loanEndDate: "2026-01-01",
    remainingDays: 730,
    loanOfficer: "Jane Smith",
    verificationTime: "10:00 AM",
    verificationDate: "2024-01-02",
    verifiedBy: "Admin",
    approvalDate: "2024-01-03",
    approveTime: "12:00 PM",
    approvedBy: "Manager",
    installment: 1000
  }

  return (
    <>
     {/* Tabs Navigation */}
     <MainCard
           content={true}
           title="Mikopo Yote"
           >

<Box sx={{ width: "100%", p: 2, }}>
        {/* Tabs */}
        <Tabs  variant="scrollable" scrollButtons="auto" onChange={changeTab}>
          <Tab label="Loan Profile" />
          <Tab label="Bonds" />
          <Tab label="Trustees" />
          <Tab label="Payments" />
          <Tab label="Mkataba" />
          {/* <Tab label="Map View" /> */}
        </Tabs>

        {/* Tab Content */}
        <Box sx={{ mt: 2, border: "1px solid #ddd", borderRadius: "8px", minHeight: "300px",overflow: 'auto' }}>
          {tabIndex === 0 && <LoanProfile user={ss} loan={loan} remarks={remarks} productInfo={productInfo}/>}
          {tabIndex === 1 && <Bonds />}
          {tabIndex === 2 && <Trustees />}
          {tabIndex === 3 && <Transactions />}
          {tabIndex === 4 && <Mkataba />}
          {tabIndex === 5 && <MapView />}
        </Box>
      </Box>
</MainCard>

    </>
  );
};


export default LoanProfileDialog;
