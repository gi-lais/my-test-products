import {
    Box,
    Button,
    Checkbox,
    FormControlLabel,
    TextField,
    Typography,
    Link,
    Grid,
  } from "@mui/material";
  import { useForm } from "react-hook-form";
  import { z } from "zod";
  import { zodResolver } from "@hookform/resolvers/zod";
  import { useAuth } from "../../contexts/AuthContext";
  import { useNavigate } from "react-router-dom";
  import styles from "./login.module.scss";

  const loginSchema = z.object({
    email: z.string().email("Email inválido"),
    password: z.string().min(6, "A senha deve ter no mínimo 6 caracteres"),
  });
  
  type LoginFormData = z.infer<typeof loginSchema>;
  
  const LoginSection = () => {
    const {
      register,
      handleSubmit,
      formState: { errors },
    } = useForm<LoginFormData>({ resolver: zodResolver(loginSchema) });
  
    const { login } = useAuth();
    const navigate = useNavigate();
  
    const onSubmit = async (data: LoginFormData) => {
      try {
        await login(data.email, data.password);
        navigate("/products");
      } catch (err: unknown) {
        if (err instanceof Error) {
          alert(err.message);
        } else {
          alert("An unexpected error occurred.");
        }
      }
    };
  
    return (
      <Box className={styles.loginPage}>
        <Grid container spacing={2}>
          <Grid size={6} className={styles.formSection}>
            <Box>
              <Typography className="h1">Bem-vindo(a)</Typography>
              <Typography className="text-subtitle">Por favor, entre com seus dados</Typography>
            </Box>

            <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ mt: 2 }}>
              <TextField
                label="Email"
                fullWidth
                margin="normal"
                {...register("email")}
                error={!!errors.email}
                helperText={errors.email?.message}
              />
              <TextField
                label="Password"
                type="password"
                fullWidth
                margin="normal"
                {...register("password")}
                error={!!errors.password}
                helperText={errors.password?.message}
              />
              <Box display="flex" justifyContent="space-between" alignItems="center">
                <FormControlLabel control={<Checkbox />} label="Remember for 30 days" />
                <Link href="#" underline="hover">
                  Forgot password
                </Link>
              </Box>
              <Button type="submit" fullWidth variant="contained" className="login-button">
                Sign In
              </Button>
              <Typography variant="body2" align="center">
                Don’t have an account? <Link href="/register">Sign up</Link>
              </Typography>
            </Box>
          </Grid>

          <Grid size={6}>
            <Box className={styles.imageSection}>
              <img src="/path/to/image.jpg" alt="Login Illustration" />
            </Box>
          </Grid>
        
        </Grid>
      </Box>
    );
  };
  
  export default LoginSection;
  