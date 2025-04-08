import { Box, List, ListItemButton, ListItemText } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Sidebar = () => {
  const navigate = useNavigate();

  return (
    <Box width="200px" bgcolor="#eee" height="100vh">
      <List>
        <ListItemButton onClick={() => navigate("/products")}>
          <ListItemText primary="Produtos" />
        </ListItemButton>
      </List>
    </Box>
  );
};

export default Sidebar;
