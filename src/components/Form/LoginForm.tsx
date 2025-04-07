import styles from "./Form.module.scss";
import { TextField, Button, InputAdornment, FormControl, InputLabel, OutlinedInput, IconButton, Box } from "@mui/material";
import { useState } from "react";
import EmailIcon from '@mui/icons-material/Email';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

const LoginForm = () => {
    const [showPassword, setShowPassword] = useState(false);
    const handleClickShowPassword = () => setShowPassword((show) => !show);

    return(
    <Box className={styles.form}>
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
        <br></br>
        <FormControl variant="outlined"  size="small">
            <InputLabel htmlFor="password">Senha</InputLabel>
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
            label="Senha"
            sx={{width: '400px'}}
            />
        </FormControl>
        <br></br>
        <Button  className="btnPrimary">
        Login
        </Button>
    </Box>
    );
};

export default LoginForm;
