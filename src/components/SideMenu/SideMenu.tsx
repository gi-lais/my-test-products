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
  Typography,
  ListItemButton,
} from "@mui/material";
import InventoryIcon from "@mui/icons-material/Inventory";
import MenuOpenIcon from "@mui/icons-material/MenuOpen";
import MenuIcon from "@mui/icons-material/Menu";
import { useNavigate, useLocation } from "react-router-dom";

interface SideMenuProps {
  open: boolean;
  toggleDrawer: () => void;
}

const drawerWidth = 240;

interface MenuItem {
  text: string;
  icon: React.ReactNode;
  path: string;
}

const menuItems: MenuItem[] = [
  {
    text: "Produtos",
    icon: <InventoryIcon data-testeid="InventoryIcon" />,
    path: "/products",
  },
];

const drawerStyles = (open: boolean) => ({
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
});

const SideMenu: React.FC<SideMenuProps> = ({ open, toggleDrawer }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleNavigation = (path: string) => {
    navigate(path);
  };

  return (
    <Drawer variant="permanent" sx={drawerStyles(open)}>
      <Toolbar
        sx={{
          display: "flex",
          justifyContent: open ? "flex-start" : "center",
        }}
      >
        <IconButton
          onClick={toggleDrawer}
          aria-label={open ? "Fechar menu" : "Abrir menu"}
          sx={{
            "&:hover": {
              backgroundColor: "#6aff5080",
            },
            color: "#000023",
          }}
        >
          {open ? <MenuOpenIcon /> : <MenuIcon />}
        </IconButton>
        {open && <Typography sx={{ marginLeft: "12px" }}>Menu</Typography>}
      </Toolbar>

      <Divider />

      <List sx={{ flexGrow: 1 }}>
        {menuItems.map((item) => (
          <ListItem key={item.text} disablePadding sx={{ display: "block" }}>
            <ListItemButton
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
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
};

export default SideMenu;
