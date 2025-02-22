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

const LoanProfile = ({ user, loan, remarks, productInfo }) => {

    console.log(user);

  return (
    <Box sx={{ p: 4,  margin: "auto",backgroundColor: "#f5f5f5" }}>
      {/* User Info */}
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Grid container spacing={2} alignItems="center">
            <Grid item>
              <Avatar sx={{ width: 80, height: 80 }}  />{/* Replace with user's profile picture  src={user.avatar}*/}
            </Grid>
            <Grid item xs>
              <Typography variant="h6">{user.fullName} ({user.aka})</Typography>
              <Typography variant="body2" color="textSecondary">
                {user.occupation} - {user.phoneNumber}
              </Typography>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
      
      {/* Loan Details */}
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>Loan Details</Typography>
          <Divider sx={{ mb: 2 }} />
          <Grid container spacing={2}>
            {Object.entries(loan).map(([key, value]) => (
              <Grid item xs={6} key={key}>
                <Typography variant="body2" color="textSecondary">
                  {key.replace(/([A-Z])/g, " $1").trim()}:
                </Typography>
                <Typography variant="body1">{value}</Typography>
              </Grid>
            ))}
          </Grid>
        </CardContent>
      </Card>

      {/* Product Information */}
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>Product Information</Typography>
          <Divider sx={{ mb: 2 }} />
          <Grid container spacing={2}>
            {Object.entries(productInfo).map(([key, value]) => (
              <Grid item xs={6} key={key}>
                <Typography variant="body2" color="textSecondary">
                  {key.replace(/([A-Z])/g, " $1").trim()}:
                </Typography>
                <Typography variant="body1">{value}</Typography>
              </Grid>
            ))}
          </Grid>
        </CardContent>
      </Card>

    
    </Box>
  );
};

export default LoanProfile;
