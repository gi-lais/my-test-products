import React from "react";
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  IconButton,
  Toolbar,
  Divider,
  Box,
  Typography,
} from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import InventoryIcon from "@mui/icons-material/Inventory";
import LogoutIcon from "@mui/icons-material/Logout";
import MenuOpenIcon from "@mui/icons-material/MenuOpen";
import MenuIcon from "@mui/icons-material/Menu";
import { useNavigate, useLocation } from "react-router-dom";

interface SideMenuProps {
  open: boolean;
  toggleDrawer: () => void;
}

const drawerWidth = 240;

const SideMenu: React.FC<SideMenuProps> = ({ open, toggleDrawer }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    { text: "Início", icon: <HomeIcon />, path: "/products" },
    { text: "Produtos", icon: <InventoryIcon />, path: "/products" },
  ];

  const handleNavigation = (path: string) => {
    navigate(path);
  };

  const handleLogoff = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: open ? drawerWidth : 60,
        flexShrink: 0,
        whiteSpace: "nowrap",
        [`& .MuiDrawer-paper`]: {
          width: open ? drawerWidth : 60,
          transition: "width 0.3s",
          overflowX: "hidden",
          backgroundColor: "#FFFFFF",
          display: "flex",
          flexDirection: "column",
          marginTop: "110px",
          border: "none",
        },
        borderBottomRightRadius: "20px",
      }}
    >
      <Toolbar
        sx={{
          display: "flex",
          justifyContent: open ? "flex-start" : "center",
        }}
      >
        <IconButton
          onClick={toggleDrawer}
          sx={{
            "&:hover": {
              backgroundColor: "#6aff5080",
            },
            color: "#000023",
          }}
        >
          {open ? <MenuOpenIcon /> : <MenuIcon />}
        </IconButton>
        {open ? <Typography sx={{ marginLeft: "12px" }}>Menu</Typography> : ""}
      </Toolbar>

      <Divider />

      <List sx={{ flexGrow: 1 }}>
        {menuItems.map((item, index) => (
          <ListItem
            component="button"
            key={index}
            onClick={() => handleNavigation(item.path)}
            selected={location.pathname === item.path}
            sx={{
              justifyContent: open ? "initial" : "center",
              px: 2.5,
              "&.Mui-selected": {
                backgroundColor: "#6aff5080",
                fontWeight: "bold",
              },
              "&:hover": {
                backgroundColor: "#6aff5080",
              },
              backgroundColor: "#FFF",
              border: "none",
              borderRadius: "20px",
            }}
          >
            <ListItemIcon
              sx={{
                minWidth: 0,
                mr: open ? 3 : "auto",
                justifyContent: "center",
                color: "#000023",
              }}
            >
              {item.icon}
            </ListItemIcon>
            {open && <ListItemText primary={item.text} />}
          </ListItem>
        ))}
      </List>

      <Box sx={{ mt: "auto", mb: 2 }}>
        <ListItem
          component="button"
          onClick={handleLogoff}
          sx={{
            justifyContent: open ? "initial" : "center",
            px: 2.5,
            "&:hover": {
              backgroundColor: "#f0f0f0",
            },
          }}
        >
          <ListItemIcon
            sx={{
              minWidth: 0,
              mr: open ? 3 : "auto",
              justifyContent: "center",
              color: "#d32f2f",
            }}
          >
            <LogoutIcon />
          </ListItemIcon>
          {open && <ListItemText primary="Sair" />}
        </ListItem>
      </Box>
    </Drawer>
  );
};

export default SideMenu;
