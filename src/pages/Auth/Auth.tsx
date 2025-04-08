import { useState, useEffect } from "react";
import styles from "./Auth.module.scss";
import RegisterForm from "../../components/Form/RegisterForm";
import LoginForm from "../../components/Form/LoginForm";
import { Box, Button, Grid, Typography } from "@mui/material";
import { useLocation } from "react-router-dom";

const Auth = () => {
  const [isRegister, setIsRegister] = useState(false);
  const location = useLocation();

  useEffect(() => {
    if (location.state?.redirectToLogin) {
      setIsRegister(false);
    }
  }, [location.state]);

  return (
    <Box className={styles.authContainer}>
      <Grid
        container
        className={`${styles.authGrid} ${
          isRegister ? styles.registerActive : ""
        }`}
      >
        <Grid size={6} className={styles.sidePanel}>
          <img src="src/assets/auth.png" className={styles.imgAuth} />
        </Grid>

        <Grid size={6}>
          <Box className={styles.formPanel}>
            <Box className={styles.boxBtnAuth}>
              <Typography className="h1">
                {isRegister ? "Bem-vindo(a)." : "Bem-vindo(a) de volta,"}
              </Typography>
              <Typography className="text-info-bold">
                {isRegister
                  ? "Preencha os campos abaixo e tenha acesso ao sistema!"
                  : "Preencha os dados e entre no sistema!"}
              </Typography>
            </Box>

            {isRegister ? <RegisterForm /> : <LoginForm />}

            <Box className={styles.boxBtnAuth}>
              <Typography>
                {isRegister ? "Já tem cadastro?" : "Ainda não tem conta?"}
              </Typography>
              <Button
                onClick={() => setIsRegister(!isRegister)}
                className="btnSecondary"
              >
                {isRegister ? "Login" : "Registre-se"}
              </Button>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Auth;
