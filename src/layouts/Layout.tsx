import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";
import AppBarElement from "../components/AppBarElement/AppBarElement";
import SideMenu from "../components/SideMenu/SideMenu";
import { useState } from "react";

const ProtectedLayout = () => {
  const [open, setOpen] = useState(true);

  const toggleDrawer = () => {
    setOpen(!open);
  };

  return (
    <>
      <Box
        sx={{
          width: "100vw",
          height: "100vh",
          position: "fixed",
          backgroundColor: "#F0F0F0",
        }}
      >
        <Box>
          <AppBarElement />
        </Box>

        <Box sx={{ height: "100%", display: "flex" }}>
          <SideMenu open={open} toggleDrawer={toggleDrawer} />
          <Box
            component="main"
            sx={{
              flexGrow: 1,
              p: 3,
              mx: 8,
              mt: "35px",
              overflowX: "auto",
              transition: "margin 0.3s ease",
              backgroundColor: "#FFF",
              borderRadius: "20px",
              width: "60vw",
              height: "88vh",
            }}
          >
            <Outlet />
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default ProtectedLayout;
