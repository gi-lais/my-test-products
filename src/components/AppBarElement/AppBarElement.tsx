import * as React from "react";
import {
  AppBar,
  Avatar,
  Box,
  Container,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Tooltip,
  Typography,
} from "@mui/material";
import { UserService } from "../../services/userService";
import { useNavigate } from "react-router-dom";
import { variables } from "../../styles/variables";

const AppBarElement = () => {
  const navigate = useNavigate();
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  );
  const [user, setUser] = React.useState<any>(null);

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("email");
    navigate("/");
  };

  React.useEffect(() => {
    const email = localStorage.getItem("email");

    const fetchUser = async () => {
      try {
        if (email) {
          const response = await UserService.findByEmail(email);
          const userData = response.data[0];
          if (userData) {
            setUser(userData);
          }
        }
      } catch (error) {
        console.error("Erro ao buscar usuário:", error);
      }
    };

    fetchUser();
  }, []);

  return (
    <AppBar
      position="static"
      sx={{
        backgroundColor: variables.colorQuaternary,
        color: variables.colorTextSecondary,
        fontFamily: variables.fontPrimary,
        boxShadow: "0 2px 8px rgba(1, 82, 1, 0.25)",
      }}
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters sx={{ justifyContent: "space-between" }}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: variables.spacingSm,
              textDecoration: "none",
              color: variables.colorTextSecondary,
            }}
          >
            <img
              src="src/assets/logo.png"
              alt="Logo Matera"
              style={{ borderRadius: "12px", width: "50px" }}
            />
            <Typography
              sx={{
                fontFamily: variables.fontPrimary,
                fontSize: variables.fontSizeSubtitle,
                fontWeight: 700,
                letterSpacing: "0.1rem",
                color: variables.colorTextSecondary,
                marginLeft: "10px",
              }}
            >
              System
            </Typography>
          </Box>

          {user && (
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: variables.spacingSm,
              }}
            >
              <Typography
                sx={{
                  fontFamily: variables.fontPrimary,
                  fontSize: variables.fontSizeBody,
                  color: variables.colorTextSecondary,
                }}
              >
                {user.nome} {user.sobrenome}
              </Typography>
              <Tooltip title="Abrir menu">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar
                    alt={user.nome}
                    src={user.image}
                    sx={{
                      border: `2px solid ${variables.colorPrimary}`,
                    }}
                  />
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: "45px" }}
                anchorEl={anchorElUser}
                anchorOrigin={{ vertical: "top", horizontal: "right" }}
                keepMounted
                transformOrigin={{ vertical: "top", horizontal: "right" }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                <MenuItem onClick={handleLogout}>
                  <Typography textAlign="center">Sair</Typography>
                </MenuItem>
              </Menu>
            </Box>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default AppBarElement;
