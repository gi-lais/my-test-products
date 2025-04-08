import { useEffect, useState } from "react";
import {
  Avatar,
  Box,
  Typography,
  Menu,
  MenuItem,
  IconButton,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const navigate = useNavigate();
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      fetch(`https://endpoint.com/user/${token}`)
        .then((res) => res.json())
        .then((data) => setUser(data));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <Box display="flex" justifyContent="flex-end" p={2} bgcolor="#fff">
      {user && (
        <Box display="flex" alignItems="center" gap={2}>
          <Typography>{`${user.nome} ${user.sobrenome}`}</Typography>
          <IconButton
            onClick={(e) => setAnchorEl(e.currentTarget as HTMLElement)}
          >
            <Avatar src={user.image} />
          </IconButton>
          <Menu
            open={Boolean(anchorEl)}
            anchorEl={anchorEl}
            onClose={() => setAnchorEl(null)}
          >
            <MenuItem onClick={handleLogout}>Sair</MenuItem>
          </Menu>
        </Box>
      )}
    </Box>
  );
};

export default Header;
