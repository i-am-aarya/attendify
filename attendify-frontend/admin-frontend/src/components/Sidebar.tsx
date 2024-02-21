import React from "react";
import {
  Menu,
  MenuItem,
  Sidebar,
  SubMenu,
  sidebarClasses,
} from "react-pro-sidebar";
import {
  AdminPanelSettings,
  People,
  PersonAdd,
  PersonOutline,
  PersonPin,
  PersonRemove,
  PersonSearch,
} from "@mui/icons-material";
import { Typography } from "@mui/material";
import { Link } from "react-router-dom";

const DashboardSidebar = () => {
  return (
    <>
      <Sidebar
        rootStyles={{
          [`.${sidebarClasses.container}`]: {
            backgroundColor: "#91C8E4",
            height: "100vh",
            color: "white",
            fontFamily: "Poppins",
            fontWeight: "600",
          },
        }}
      >
        {/* <Typography className="text" variant="h5">User Selection</Typography> */}
        <Typography
          variant="h5"
          sx={{
            textAlign: "center",
            margin: "20px 0",
            fontFamily: "Poppins",
            fontWeight: "600",
          }}
        >
          Selection
        </Typography>

        <Menu
          menuItemStyles={{
            button: {
              backgroundColor: "#91C8E4",
              "&:hover": {
                backgroundColor: "#4682A9",
                // margin: '0px'
              },
              active: {
                backgroundColor: "4682A9",
              },
              // border: '0.5px solid white',
              // outline: '0.5px 0 0 0'
              borderBottom: "2px solid white",
              // margin: '10px',
            },
          }}
        >
          <SubMenu
            label="Student"
            style={{ fontFamily: "Poppins" }}
            icon={<People />}
          >
            {/* <MenuItem
              icon={<PersonPin />}
              component={<Link to="/view-students" />}
            >
              <Typography sx={{ fontFamily: "Poppins" }}>View</Typography>{" "}
            </MenuItem> */}

            {/* <MenuItem
              icon={<PersonSearch />}
              component={<Link to="/search-students" />}
            >
              <Typography sx={{ fontFamily: "Poppins" }}>Search</Typography>
            </MenuItem> */}

            <MenuItem
              icon={<PersonAdd />}
              component={<Link to="/add-student" />}
            >
              <Typography sx={{ fontFamily: "Poppins" }}>Add</Typography>
            </MenuItem>

            <MenuItem
              icon={<PersonRemove />}
              component={<Link to="/delete-student" />}
            >
              <Typography sx={{ fontFamily: "Poppins" }}>Remove</Typography>
            </MenuItem>
          </SubMenu>

          <SubMenu
            label="Teacher"
            style={{ fontFamily: "Poppins" }}
            icon={<PersonOutline />}
          >
            {/* <MenuItem
              icon={<PersonPin />}
              component={<Link to="/view-teachers" />}
            >
              <Typography sx={{ fontFamily: "Poppins" }}>View</Typography>{" "}
            </MenuItem> */}

            {/* <MenuItem
              icon={<PersonSearch />}
              component={<Link to="/search-teachers" />}
            >
              <Typography sx={{ fontFamily: "Poppins" }}>Search</Typography>
            </MenuItem> */}

            <MenuItem
              icon={<PersonAdd />}
              component={<Link to="/add-teacher" />}
            >
              <Typography sx={{ fontFamily: "Poppins" }}>Add</Typography>
            </MenuItem>

            <MenuItem
              icon={<PersonRemove />}
              component={<Link to="/delete-teacher" />}
            >
              <Typography sx={{ fontFamily: "Poppins" }}>Remove</Typography>
            </MenuItem>
          </SubMenu>

          {/* <SubMenu
            label="Admin"
            style={{ fontFamily: "Poppins" }}
            icon={<AdminPanelSettings />}
          >
            <MenuItem
              icon={<PersonPin />}
              component={<Link to="/view-admin" />}
            >
              <Typography sx={{ fontFamily: "Poppins" }}>View</Typography>{" "}
            </MenuItem>

            <MenuItem
              icon={<PersonSearch />}
              component={<Link to="/search-admin" />}
            >
              <Typography sx={{ fontFamily: "Poppins" }}>Search</Typography>
            </MenuItem>

            <MenuItem
              icon={<PersonAdd />}
              component={<Link to="/add-admin" />}
            >
              <Typography sx={{ fontFamily: "Poppins" }}>Add</Typography>
            </MenuItem>

            <MenuItem
              icon={<PersonRemove />}
              component={<Link to="/remove-admin" />}
            >
              <Typography sx={{ fontFamily: "Poppins" }}>Remove</Typography>
            </MenuItem>
          </SubMenu> */}
        </Menu>
      </Sidebar>
    </>
  );
};

export default DashboardSidebar;
