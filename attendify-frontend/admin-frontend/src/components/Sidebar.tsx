import React from "react";
import {
  Menu,
  MenuItem,
  Sidebar,
  SubMenu,
  sidebarClasses,
} from "react-pro-sidebar";
import {
  People,
  PersonAdd,
  PersonAddAlt,
  PersonOutline,
  PersonRemove,
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

            <MenuItem
              icon={<PersonAdd />}
              component={<Link to="/add-student" />}
            >
              <Typography sx={{ fontFamily: "Poppins" }}>Add</Typography>
            </MenuItem>

            <MenuItem
              icon={<PersonAddAlt />}
              component={<Link to="/edit-student" />}
            >
              <Typography sx={{ fontFamily: "Poppins" }}>Edit</Typography>
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
            
            <MenuItem
              icon={<PersonAdd />}
              component={<Link to="/add-teacher" />}
            >
              <Typography sx={{ fontFamily: "Poppins" }}>Add</Typography>
            </MenuItem>


            <MenuItem
              icon={<PersonAddAlt />}
              component={<Link to="/edit-teacher" />}
            >
              <Typography sx={{ fontFamily: "Poppins" }}>Edit</Typography>
            </MenuItem>

            <MenuItem
              icon={<PersonRemove />}
              component={<Link to="/delete-teacher" />}
            >
              <Typography sx={{ fontFamily: "Poppins" }}>Remove</Typography>
            </MenuItem>
          </SubMenu>

        </Menu>
      </Sidebar>
    </>
  );
};

export default DashboardSidebar;
