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
import styles from "./AppBarElement.module.scss";
import { useNavigate } from "react-router-dom";

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
    <AppBar position="static" className={styles.appBar}>
      <Container maxWidth="xl">
        <Toolbar disableGutters sx={{ justifyContent: "space-between" }}>
          <Box className={styles.logoContainer}>
            <img
              src="src/assets/logo.png"
              alt="Logo Matera"
              className={styles.logoImage}
            />
            <Typography className={styles.logoText}>System</Typography>
          </Box>

          {user && (
            <Box className={styles.userContainer}>
              <Typography className={styles.userName}>
                {user.nome} {user.sobrenome}
              </Typography>
              <Tooltip title="Abrir menu">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar
                    alt={user.nome}
                    src={user.image}
                    className={styles.avatar}
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
