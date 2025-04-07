import styles from "./Form.module.scss";
import { TextField, Button, InputAdornment, IconButton, OutlinedInput, InputLabel, FormControl, Box } from "@mui/material";
import EmailIcon from '@mui/icons-material/Email';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { useState } from "react";

const RegisterForm = () => {
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  return (
    <Box className={styles.form}>
      <TextField
        fullWidth
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
      <br></br>
      <FormControl variant="outlined" fullWidth size="small">
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
      <br></br>
      <Button className="btnPrimary">
        Registrar
      </Button>
    </Box>
  );
};

export default RegisterForm;
