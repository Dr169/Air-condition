import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { Box, Link } from "@mui/material";
import { styled, useTheme } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { Logout, Speed } from "@mui/icons-material";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";

import { HeaderFooter } from "../components/HeaderFooter";
import { DrawerHeader } from "../components/DrawerHeader";
import { StyledDrawer } from "../components/StyledDrawer";

const drawerWidth = 240;

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

export const Drawer = (props) => {
  const theme = useTheme();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleClickDashboard = () => {
    navigate("/dashboard");
  };
  const handleClickUsers = () => {
    navigate("/users");
  };
  const handleClickExit = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("id");
    navigate("/");
  };

  return (
    <HeaderFooter>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <AppBar position="fixed" open={open} sx={{ height: "70px" }}>
          <Toolbar sx={{ justifyContent: "center", position: "relative" }}>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              edge="start"
              sx={{
                position: "absolute",
                left: "0px",
                marginLeft: "15px",
                ...(open && { display: "none" }),
              }}
            >
              <MenuIcon />
            </IconButton>
            <Link href="http://localhost:3000/">
              <img src="images/logo.png" alt="Logo" style={{ width: "70px" }} />
            </Link>
          </Toolbar>
        </AppBar>
        <StyledDrawer variant="permanent" open={open}>
          <DrawerHeader
            sx={{
              backgroundColor: "primary.main",
              justifyContent: "space-between",
              height: "70px",
            }}
          >
            <Typography color="#fff">شرکت پاسارگاد</Typography>
            <IconButton onClick={handleDrawerClose}>
              {theme.direction === "rtl" ? (
                <ChevronRightIcon sx={{ color: "#fff" }} />
              ) : (
                <ChevronLeftIcon sx={{ color: "#fff" }} />
              )}
            </IconButton>
          </DrawerHeader>
          <Divider />
          <List>
            <ListItem disablePadding sx={{ display: "block" }}>
              <ListItemButton
                onClick={handleClickDashboard}
                sx={{
                  minHeight: 48,
                  justifyContent: open ? "initial" : "center",
                  px: 2.5,
                }}
              >
                <ListItemText
                  primary="داشبورد"
                  sx={{ opacity: open ? 1 : 0, color: "black" }}
                />
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : "auto",
                    justifyContent: "center",
                  }}
                >
                  <Speed sx={{ color: "black" }} />
                </ListItemIcon>
              </ListItemButton>
            </ListItem>
            <Divider />
            <ListItem disablePadding sx={{ display: "block" }}>
              <ListItemButton
                onClick={handleClickUsers}
                sx={{
                  minHeight: 48,
                  justifyContent: open ? "initial" : "center",
                  px: 2.5,
                }}
              >
                <ListItemText
                  primary="کاربران"
                  sx={{ opacity: open ? 1 : 0, color: "black" }}
                />
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : "auto",
                    justifyContent: "center",
                  }}
                >
                  <PeopleAltIcon sx={{ color: "black" }} />
                </ListItemIcon>
              </ListItemButton>
            </ListItem>
            <Divider />

            <ListItem disablePadding sx={{ display: "block" }}>
              <ListItemButton
                onClick={handleClickExit}
                sx={{
                  minHeight: 48,
                  justifyContent: open ? "initial" : "center",
                  px: 2.5,
                  display: "flex",
                }}
              >
                <ListItemText
                  primary="خروج"
                  sx={{ opacity: open ? 1 : 0, color: "black" }}
                />
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : "auto",
                    justifyContent: "center",
                    display: "flex",
                  }}
                >
                  <Logout sx={{ color: "black" }} />
                </ListItemIcon>
              </ListItemButton>
            </ListItem>
          </List>
        </StyledDrawer>
        {props.children}
      </Box>
    </HeaderFooter>
  );
};
