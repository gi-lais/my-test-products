import styles from "./Form.module.scss";
import {
  Box,
  TextField,
  InputAdornment,
  FormControl,
  InputLabel,
  OutlinedInput,
  IconButton,
  Snackbar,
  Alert,
  FormHelperText,
} from "@mui/material";
import EmailIcon from "@mui/icons-material/Email";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import { LoadingButton } from "@mui/lab";
import { UserService } from "../../services/userService";
import { v4 as uuidv4 } from "uuid";
import { Backdrop, CircularProgress } from "@mui/material";

const schema = z.object({
  email: z.string().email("Email inválido").nonempty("Email é obrigatório"),
  senha: z.string().nonempty("Senha é obrigatória"),
});

type LoginFormData = z.infer<typeof schema>;

const LoginForm = () => {
  const [loadingScreen, setLoadingScreen] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(schema),
  });

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const onSubmit = async (data: LoginFormData) => {
    try {
      setLoadingScreen(true); // mostra loader global

      const response = await UserService.findByEmail(data.email);
      const user = { ...response.data[0], token: uuidv4() };

      if (!user) {
        throw new Error("Usuário não encontrado");
      }

      if (user.senha !== data.senha) {
        throw new Error("Senha incorreta");
      }

      localStorage.setItem("token", user.token);
      localStorage.setItem("email", user.email);

      setSnackbar({
        open: true,
        message: "Login realizado com sucesso!",
        severity: "success",
      });

      setTimeout(() => {
        setLoadingScreen(false);
        navigate("/products");
      }, 2000);
    } catch (err: unknown) {
      const errorMessage =
        err instanceof Error ? err.message : "Erro ao fazer login";
      setSnackbar({
        open: true,
        message: errorMessage,
        severity: "error",
      });
      setLoadingScreen(false);
    }
  };

  return (
    <>
      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          severity={snackbar.severity as "success" | "error"}
          onClose={() => setSnackbar({ ...snackbar, open: false })}
          sx={{ width: "100%" }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>

      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loadingScreen}
      >
        <CircularProgress color="inherit" />
      </Backdrop>

      <Box
        className={styles.form}
        component="form"
        onSubmit={handleSubmit(onSubmit)}
      >
        <TextField
          label="Email"
          size="small"
          {...register("email")}
          error={!!errors.email}
          helperText={errors.email?.message}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <EmailIcon />
              </InputAdornment>
            ),
          }}
          sx={{ width: "400px" }}
        />

        <FormControl variant="outlined" size="small">
          <InputLabel htmlFor="password" error={!!errors.senha}>
            Senha
          </InputLabel>
          <OutlinedInput
            id="password"
            type={showPassword ? "text" : "password"}
            {...register("senha")}
            error={!!errors.senha}
            endAdornment={
              <InputAdornment position="end">
                <IconButton onClick={handleClickShowPassword} edge="end">
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
            label="Senha"
            sx={{ width: "400px" }}
          />
          {errors.senha && (
            <FormHelperText error>{errors.senha.message}</FormHelperText>
          )}
        </FormControl>

        <LoadingButton
          className="btnPrimary"
          type="submit"
          loading={isSubmitting}
        >
          Login
        </LoadingButton>
      </Box>
    </>
  );
};

export default LoginForm;
