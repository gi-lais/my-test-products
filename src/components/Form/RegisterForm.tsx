import styles from "./Form.module.scss";
import { TextField, Button, InputAdornment, IconButton, OutlinedInput, InputLabel, FormControl, Box, Select, MenuItem, SelectChangeEvent } from "@mui/material";
import EmailIcon from '@mui/icons-material/Email';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import AssignmentIcon from '@mui/icons-material/Assignment';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import DateRangeIcon from '@mui/icons-material/DateRange';
import { useState } from "react";
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import  ptBR  from 'date-fns/locale/pt-BR';

const RegisterForm = () => {

  const [showPassword, setShowPassword] = useState(false);
  const [sexo, setSexo] = useState('');
  const [birthDate, setBirthDate] = useState<Date | null>(null);

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleChange = (event: SelectChangeEvent) => {
    setSexo(event.target.value as string);
  };

  return (
    <Box className={styles.formRegister}>
      <TextField
        label="Nome"
        variant="outlined"
        size="small"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <AccountCircleIcon />
            </InputAdornment>
          )
        }}
        sx={{width: '400px'}}
      />
      <TextField
        label="Sobrenome"
        variant="outlined"
        size="small"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <AccountCircleIcon />
            </InputAdornment>
          )
        }}
        sx={{width: '400px'}}
      />
      <TextField
        label="CPF"
        variant="outlined"
        size="small"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <AssignmentIcon />
            </InputAdornment>
          )
        }}
        sx={{width: '400px'}}
      />
      <TextField
        label="Email"
        variant="outlined"
        size="small"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <EmailIcon />
            </InputAdornment>
          )
        }}
        sx={{width: '400px'}}
      />
      <FormControl variant="outlined" size="small">
        <InputLabel htmlFor="password">Password</InputLabel>
        <OutlinedInput
          id="password"
          type={showPassword ? 'text' : 'password'}
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={handleClickShowPassword}
                edge="end"
              >
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          }
          label="Password"
          sx={{width: '400px'}}
        />
      </FormControl>
      <FormControl sx={{width: '400px'}}>
        <InputLabel id="demo-simple-select-label">Sexo</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={sexo}
          label="Sexo"
          onChange={handleChange}
        >
          <MenuItem value={'F'}>Feminimo</MenuItem>
          <MenuItem value={'M'}>Masculino</MenuItem>
        </Select>
      </FormControl>
      <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={ptBR}>
        <DatePicker
          label="Data de Nascimento"
          value={birthDate}
          onChange={(newValue) => setBirthDate(newValue)}
          sx={{width: '400px'}}
        />
      </LocalizationProvider>

      <Button className="btnPrimary">
        Registrar
      </Button>
    </Box>
  );
};

export default RegisterForm;
