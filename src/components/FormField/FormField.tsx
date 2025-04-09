import { TextField, MenuItem } from "@mui/material";
import { Controller } from "react-hook-form";

interface FormFieldProps {
  name: string;
  label: string;
  type?: string;
  control: any;
  errors: any;
  inputProps?: any;
  select?: boolean;
  options?: string[];
}

const FormField = ({
  name,
  label,
  type = "text",
  control,
  errors,
  inputProps = {},
  select = false,
  options = [],
}: FormFieldProps) => (
  <Controller
    name={name}
    control={control}
    render={({ field }) => (
      <TextField
        fullWidth
        label={label}
        margin="normal"
        type={type}
        error={!!errors[name]}
        helperText={errors[name]?.message}
        {...field}
        InputProps={inputProps}
        select={select}
      >
        {select &&
          options.map((opt) => (
            <MenuItem key={opt} value={opt}>
              {opt}
            </MenuItem>
          ))}
      </TextField>
    )}
  />
);

export default FormField;
