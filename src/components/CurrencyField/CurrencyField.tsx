import { TextField } from "@mui/material";
import { IMaskInput } from "react-imask";
import { Controller } from "react-hook-form";

interface CurrencyFieldProps {
  name: string;
  label: string;
  control: any;
  errors: any;
}

const CurrencyField = ({
  name,
  label,
  control,
  errors,
}: CurrencyFieldProps) => (
  <Controller
    name={name}
    control={control}
    render={({ field }) => (
      <TextField
        fullWidth
        label={label}
        margin="normal"
        InputProps={{
          inputComponent: IMaskInput as any,
          inputProps: {
            mask: "R$ num",
            blocks: {
              num: {
                mask: Number,
                thousandsSeparator: ".",
                radix: ",",
                mapToRadix: [".", ","],
                scale: 2,
                normalizeZeros: true,
                padFractionalZeros: true,
              },
            },
          },
        }}
        error={!!errors[name]}
        helperText={errors[name]?.message}
        {...field}
      />
    )}
  />
);

export default CurrencyField;
