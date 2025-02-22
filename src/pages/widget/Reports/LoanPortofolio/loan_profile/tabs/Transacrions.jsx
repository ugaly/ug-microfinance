import React from "react";
import {
  Avatar,
  Box,
  Card,
  CardContent,
  Grid,
  Typography,
  Divider,
  List,
  ListItem,
  ListItemText,
  Paper,
} from "@mui/material";
import { ChatBubbleOutline, PersonOutline } from "@mui/icons-material";
import ActiveExpenseScreen from "pages/widget/Reports/Expense/ActiveExpense";

const Transactions = () => {

  return (
    <Box sx={{ p: 4,  margin: "auto",backgroundColor: "#f5f5f5" }}>
     
     
     <ActiveExpenseScreen />
    
    </Box>
  );
};

export default Transactions;
