import { useState } from "react";
import { Box, Tab, Tabs, Typography } from "@mui/material";
import LoanProfile from "./LoanProfile";
import Bonds from "./Bonds";
import Trustees from "./Trustees";
import Payments from "./Payments";
import Mkataba from "./Mkataba";
import MapView from "./MapView";

export default function LoanProfilePage() {
  const [tabIndex, setTabIndex] = useState(0);

  const handleChange = (event, newIndex) => {
    setTabIndex(newIndex);
  };

  return (
    <Box sx={{ width: "100%", p: 2 }}>
      {/* Tabs */}
      <Tabs value={tabIndex} onChange={handleChange} variant="scrollable" scrollButtons="auto">
        <Tab label="Loan Profile" />
        <Tab label="Bonds" />
        <Tab label="Trustees" />
        <Tab label="Payments" />
        <Tab label="Mkataba" />
        <Tab label="Map View" />
      </Tabs>

      {/* Tab Content */}
      <Box sx={{ mt: 2, p: 2, border: "1px solid #ddd", borderRadius: "8px", minHeight: "300px" }}>
        {tabIndex === 0 && <LoanProfile />}
        {tabIndex === 1 && <Bonds />}
        {tabIndex === 2 && <Trustees />}
        {tabIndex === 3 && <Payments />}
        {tabIndex === 4 && <Mkataba />}
        {tabIndex === 5 && <MapView />}
      </Box>
    </Box>
  );
}
