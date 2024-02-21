import {
  AppBar,
  Box,
  Button,
  Container,
  Drawer,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Tooltip,
  Typography,
} from "@mui/material";
import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import DashboardSidebar from "../../components/Sidebar";
import {
  AdminPanelSettings,
  Home,
  Logout,
  People,
  Person,
} from "@mui/icons-material";

const Dashboard = ({children}: {children:any}) => {
  const navigate = useNavigate();

  // const []

  function handleLogOut() {
    localStorage.removeItem("adminToken");
    navigate("/");
  }

  useEffect(() => {
    try {
      const adminToken = localStorage.getItem("adminToken");
      if (!adminToken) {
        navigate("/");
      }
    } catch (error) {
      console.error(error);
      navigate("/");
    }
  });

  return (
    <>
      <AppBar sx={{ backgroundColor: "#4682A9" }} position="static">
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            padding: "0 20px",
          }}
        >
          <Toolbar disableGutters>
            <Typography sx={{ fontFamily: "Poppins", fontWeight: "600" }} variant="h5" noWrap>
              Attendify - Admin Dashboard
            </Typography>
          </Toolbar>

          <Box>
            <Tooltip title="Log Out">
              <IconButton
                onClick={handleLogOut}
                sx={{ color: "white", mt: "10px" }}
              >
                <Logout />
              </IconButton>
            </Tooltip>
          </Box>
        </Box>
      </AppBar>

      <Grid container sx={{ gridTemplateColumns: "1fr 2fr" }} spacing={10}>
        <Grid
          item
          sx={{
            padding: "10px",
            borderRadius: "25px",
          }}
        >
          <DashboardSidebar />
        </Grid>

        <Grid item>
          <Box>
            {children}
          </Box>
        </Grid>
      </Grid>
    </>
  );
};

export default Dashboard;
