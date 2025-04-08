import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Box, Button, TextField } from "@mui/material";
import axios from "axios";
import { useState } from "react";

const schema = z.object({
  cep: z.string().min(8, "CEP obrigatório"),
  logradouro: z.string().min(1, "Rua obrigatória"),
  numero: z.string().min(1, "Número obrigatório"),
  complemento: z.string().optional(),
  bairro: z.string().min(1, "Bairro obrigatório"),
  cidade: z.string().min(1, "Cidade obrigatória"),
  estado: z.string().min(1, "Estado obrigatório"),
});

type StepTwoData = z.infer<typeof schema>;

const RegisterFormStepTwo = () => {
  const [errorCep, setErrorCep] = useState("");
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<StepTwoData>({
    resolver: zodResolver(schema),
  });

  const cepValue = watch("cep");

  const fetchAddress = async (cep: string) => {
    try {
      const { data } = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);
      if (data.erro) {
        setErrorCep("CEP inválido");
        return;
      }
      setErrorCep("");
      setValue("logradouro", data.logradouro);
      setValue("bairro", data.bairro);
      setValue("cidade", data.localidade);
      setValue("estado", data.uf);
    } catch {
      setErrorCep("Erro ao buscar CEP");
    }
  };

  const onSubmit = (data: StepTwoData) => {
    console.log("Dados de endereço:", data);
    alert("Endereço salvo com sucesso!");
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 2,
        width: "400px",
        mt: 4,
      }}
    >
      <TextField
        label="CEP"
        {...register("cep")}
        error={!!errors.cep || !!errorCep}
        helperText={errors.cep?.message || errorCep}
        size="small"
        onBlur={() => fetchAddress(cepValue)}
      />
      <TextField
        label="Rua"
        {...register("logradouro")}
        error={!!errors.logradouro}
        helperText={errors.logradouro?.message}
        size="small"
      />
      <TextField
        label="Número"
        {...register("numero")}
        error={!!errors.numero}
        helperText={errors.numero?.message}
        size="small"
      />
      <TextField
        label="Complemento"
        {...register("complemento")}
        size="small"
      />
      <TextField
        label="Bairro"
        {...register("bairro")}
        error={!!errors.bairro}
        helperText={errors.bairro?.message}
        size="small"
      />
      <TextField
        label="Cidade"
        {...register("cidade")}
        error={!!errors.cidade}
        helperText={errors.cidade?.message}
        size="small"
      />
      <TextField
        label="Estado"
        {...register("estado")}
        error={!!errors.estado}
        helperText={errors.estado?.message}
        size="small"
      />

      <Button className="btnPrimary" type="submit">
        Salvar Endereço
      </Button>
    </Box>
  );
};

export default RegisterFormStepTwo;
