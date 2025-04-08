import styles from "./Form.module.scss";
import {
  Box,
  TextField,
  Button,
  InputAdornment,
  IconButton,
  OutlinedInput,
  InputLabel,
  FormControl,
  Select,
  MenuItem,
  Typography,
  Snackbar,
  Alert,
} from "@mui/material";
import EmailIcon from "@mui/icons-material/Email";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import AssignmentIcon from "@mui/icons-material/Assignment";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useState } from "react";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import ptBR from "date-fns/locale/pt-BR";
import { UserService } from "../../services/userService";
import RegisterFormStepTwo from "./RegisterFormStepTwo";
import { isValidCPF } from "../../utils/validateCpf";
import CPFMask from "../CPFMask/CPFMask";

const schema = z.object({
  name: z.string().min(1, "Nome obrigatório"),
  surname: z.string().min(1, "Sobrenome obrigatório"),
  cpf: z
    .string()
    .min(14, "CPF inválido")
    .refine((val) => isValidCPF(val), {
      message: "CPF inválido",
    }),
  email: z.string().email("Email inválido"),
  password: z.string().min(6, "A senha deve ter pelo menos 6 caracteres"),
  sex: z.string().min(1, "Sexo obrigatório"),
  birthDate: z.date({ required_error: "Data obrigatória" }),
});

type FormData = z.infer<typeof schema>;

const RegisterForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [stepOneData, setStepOneData] = useState<FormData | null>(null);
  const [stepTwo, setStepTwo] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const [birthDate, setBirthDate] = useState<Date | null>(null);

  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "error",
  });

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const onSubmit = async (data: FormData) => {
    try {
      const response = await UserService.findByEmail(data.email);
      if (response.data.length > 0) {
        setSnackbar({
          open: true,
          message: "Email já cadastrado.",
          severity: "error",
        });
        return;
      }
      setStepOneData(data);
      setStepTwo(true);
    } catch (error) {
      setSnackbar({
        open: true,
        message: "Erro ao verificar email.",
        severity: "error",
      });
    }
  };

  if (stepTwo && stepOneData)
    return <RegisterFormStepTwo stepOneData={stepOneData} />;

  return (
    <>
      <Box
        className={styles.form}
        component="form"
        onSubmit={handleSubmit(onSubmit)}
      >
        <TextField
          label="Nome"
          {...register("name")}
          error={!!errors.name}
          helperText={errors.name?.message}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <AccountCircleIcon />
              </InputAdornment>
            ),
          }}
          size="small"
          sx={{ width: "400px" }}
        />

        <TextField
          label="Sobrenome"
          {...register("surname")}
          error={!!errors.surname}
          helperText={errors.surname?.message}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <AccountCircleIcon />
              </InputAdornment>
            ),
          }}
          size="small"
          sx={{ width: "400px" }}
        />

        <TextField
          label="CPF"
          {...register("cpf")}
          name="cpf"
          error={!!errors.cpf}
          helperText={errors.cpf?.message}
          InputProps={{
            inputComponent: CPFMask as any,
            startAdornment: (
              <InputAdornment position="start">
                <AssignmentIcon />
              </InputAdornment>
            ),
          }}
          size="small"
          sx={{ width: "400px" }}
        />

        <TextField
          label="Email"
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
          size="small"
          sx={{ width: "400px" }}
        />

        <FormControl size="small" sx={{ width: "400px" }}>
          <InputLabel htmlFor="password">Senha</InputLabel>
          <OutlinedInput
            id="password"
            type={showPassword ? "text" : "password"}
            {...register("password")}
            error={!!errors.password}
            endAdornment={
              <InputAdornment position="end">
                <IconButton onClick={handleClickShowPassword} edge="end">
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
            label="Senha"
          />
          {errors.password && (
            <Typography color="error" fontSize={12}>
              {errors.password.message}
            </Typography>
          )}
        </FormControl>

        <FormControl sx={{ width: "400px" }} size="small">
          <InputLabel>Sexo</InputLabel>
          <Select
            {...register("sex")}
            defaultValue=""
            label="Sexo"
            error={!!errors.sex}
          >
            <MenuItem value="F">Feminino</MenuItem>
            <MenuItem value="M">Masculino</MenuItem>
          </Select>
          {errors.sex && (
            <Typography color="error" fontSize={12}>
              {errors.sex.message}
            </Typography>
          )}
        </FormControl>

        <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={ptBR}>
          <DatePicker
            label="Data de Nascimento"
            value={birthDate}
            onChange={(date) => {
              setBirthDate(date);
              if (date) setValue("birthDate", date);
            }}
            slotProps={{
              textField: {
                error: !!errors.birthDate,
                helperText: errors.birthDate?.message,
                size: "small",
                sx: { width: "400px" },
              },
            }}
          />
        </LocalizationProvider>

        <Button className="btnPrimary" type="submit">
          Registrar
        </Button>
      </Box>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          severity={snackbar.severity as "success" | "error"}
          sx={{ width: "400px", height: "40px" }}
          onClose={() => setSnackbar({ ...snackbar, open: false })}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </>
  );
};

export default RegisterForm;
