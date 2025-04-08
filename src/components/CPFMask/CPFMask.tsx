import { IMaskInput } from "react-imask";
import { forwardRef } from "react";
import type { InputBaseComponentProps } from "@mui/material";

type MaskedInputEvent = {
  target: {
    name: string;
    value: string;
  };
};

const CPFMask = forwardRef<HTMLInputElement, InputBaseComponentProps>(
  function CPFMask(props, ref) {
    const { onChange, name, ...other } = props;

    return (
      <IMaskInput
        {...other}
        mask="000.000.000-00"
        definitions={{
          "0": /[0-9]/,
        }}
        inputRef={ref}
        onAccept={(value: unknown) => {
          const event: MaskedInputEvent = {
            target: {
              name: name ?? "",
              value: value as string,
            },
          };
          onChange?.(event as unknown as React.ChangeEvent<HTMLInputElement>);
        }}
        overwrite
      />
    );
  }
);

export default CPFMask;



