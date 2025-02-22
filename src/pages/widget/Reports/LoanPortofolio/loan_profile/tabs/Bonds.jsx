import React from "react";
import {
  Avatar,
  Box,
  Card, CardMedia, CardContent, Typography, Menu, MenuItem, IconButton, Grid, Button
} from "@mui/material";
import { ChatBubbleOutline, PersonOutline } from "@mui/icons-material";
import MoreVertIcon from "@mui/icons-material/MoreVert";


const BondCard = ({ bond }) => {
    const [anchorEl, setAnchorEl] = React.useState(null);
  
    const handleMenuOpen = (event) => {
      setAnchorEl(event.currentTarget);
    };
  
    const handleMenuClose = () => {
      setAnchorEl(null);
    };
  
    return (
      <Card sx={{ maxWidth: 300, m: 2, boxShadow: 3 }}>
        <CardMedia component="img" height="140" image={bond.image} alt={bond.name} />
        <CardContent>
          <Typography variant="h6">{bond.name}</Typography>
          <Typography variant="body2" color="text.secondary">
            <strong>Type:</strong> {bond.type}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            <strong>Price:</strong> {bond.price}
          </Typography>
          <Typography variant="body2" color={bond.available === "Yes" ? "green" : "red"}>
            <strong>Available:</strong> {bond.available}
          </Typography>
          <Typography variant="body2" sx={{ mt: 1 }}>
            {bond.description}
          </Typography>
          <Button
            size="small"
            variant="contained"
            color="primary"
            onClick={handleMenuOpen}
            endIcon={<MoreVertIcon />}
            sx={{ mt: 2, width: "100%" }}
          >
            Actions
          </Button>
  
          {/* Dropdown Menu */}
          <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
            <MenuItem onClick={handleMenuClose}>Chukua Dhamana</MenuItem>
          </Menu>
        </CardContent>
      </Card>
    );
  };

  
const Bonds = () => {

    const bondsData = [
        {
          id: 1,
          image: "https://via.placeholder.com/150",
          name: "Government Bond",
          type: "Fixed Income",
          description: "A secure long-term investment with fixed returns.",
          price: "$1,000",
          available: "Yes",
        },
        {
          id: 2,
          image: "https://via.placeholder.com/150",
          name: "Corporate Bond",
          type: "High Yield",
          description: "Higher returns but moderate risk.",
          price: "$5,000",
          available: "No",
        },
        {
          id: 3,
          image: "https://via.placeholder.com/150",
          name: "Municipal Bond",
          type: "Tax-Free",
          description: "Exempt from federal taxes, great for savings.",
          price: "$2,500",
          available: "Yes",
        },
      ];


    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };


    return (
    <Box sx={{ p: 4,  margin: "auto",backgroundColor: "#f5f5f5" }}>
     
     
     <Grid container spacing={3} justifyContent="center">
      {bondsData.map((bond) => (
        <Grid item key={bond.id}>
          <BondCard bond={bond} />
        </Grid>
      ))}
    </Grid>
    
    </Box>
  );
};

export default Bonds;
