import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Box, Button, CircularProgress, TextField } from "@mui/material";
import axios from "axios";
import { useState } from "react";
import { UserService } from "../../services/userService";
import { Snackbar, Alert } from "@mui/material";
import { useNavigate } from "react-router-dom";

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

const RegisterFormStepTwo = ({ stepOneData }: { stepOneData: any }) => {
  const [errorCep, setErrorCep] = useState("");
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });
  const [isLoadingRedirect, setIsLoadingRedirect] = useState(false);

  const navigate = useNavigate();

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

  const onSubmit = async (data: StepTwoData) => {
    try {
      const fullData = {
        ...stepOneData,
        ...data,
      };

      const response = await UserService.register(fullData);
      if (response.status === 201) {
        setSnackbar({
          open: true,
          message: "Cadastro finalizado com sucesso!",
          severity: "success",
        });
        setIsLoadingRedirect(true);
        setTimeout(() => {
          navigate("/", { state: { redirectToLogin: true } });
        }, 2000);
      }
    } catch (error) {
      console.error("Erro ao registrar:", error);
      setSnackbar({
        open: true,
        message: "Erro ao finalizar cadastro.",
        severity: "error",
      });
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
          sx={{ width: "100%" }}
          onClose={() => setSnackbar({ ...snackbar, open: false })}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>

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

        {isLoadingRedirect ? (
          <Box display="flex" justifyContent="center" mt={2}>
            <CircularProgress />
          </Box>
        ) : (
          <Button className="btnPrimary" type="submit">
            Finalizar Cadastro
          </Button>
        )}
      </Box>
    </>
  );
};

export default RegisterFormStepTwo;
