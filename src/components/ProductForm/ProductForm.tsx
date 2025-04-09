import { Box, Button, MenuItem, TextField, Typography } from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { IMaskInput } from "react-imask";
import { Snackbar, Alert } from "@mui/material";

const schema = z.object({
  nome: z.string().min(1, "Nome obrigatório"),
  preco: z.string().min(1, "Preço obrigatório"),
  categoria: z.string().min(1, "Categoria obrigatória"),
  marca: z.string().min(1, "Marca obrigatória"),
  avatar: z.string().url("URL inválida").min(1, "Imagem obrigatória"),
  qt_vendas: z
    .string()
    .min(1, "Qtd. de vendas obrigatória")
    .refine((val) => Number(val) >= 0, {
      message: "Qtd. de vendas não pode ser negativa",
    }),
  qt_estoque: z
    .string()
    .min(1, "Qtd. em estoque obrigatória")
    .refine((val) => Number(val) >= 0, {
      message: "Qtd. em estoque não pode ser negativa",
    }),
});

type FormData = z.infer<typeof schema>;
const categorias = ["Eletrônico", "Alimento", "Limpeza", "Roupas"];

type ProductFormProps = {
  isEditMode?: boolean;
};

const ProductForm = ({ isEditMode = false }: ProductFormProps) => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [loading, setLoading] = useState(false);

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      nome: "",
      preco: "",
      categoria: "",
      marca: "",
      avatar: "",
      qt_vendas: "",
      qt_estoque: "",
    },
  });

  const token = localStorage.getItem("token") || "";

  useEffect(() => {
    if (isEditMode && id) {
      fetch(
        `https://6256fc506ea7037005434e84.mockapi.io/api/v1/produto/${id}`,
        {
          headers: {
            Authorization: token,
          },
        }
      )
        .then((res) => res.json())
        .then((data) => {
          console.log("produto carregado:", data);
          setValue("nome", data.nome);
          setValue("preco", String(data.preco).replace(".", ","));
          setValue("categoria", data.categoria);
          setValue("marca", data.marca);
          setValue("avatar", data.avatar);
          setValue("qt_vendas", String(data.qt_vendas));
          setValue("qt_estoque", String(data.qt_estoque));
        });
    }
  }, [id, isEditMode, setValue, token]);

  const onSubmit = async (data: FormData) => {
    setLoading(true);
    const precoFormatado = parseFloat(
      data.preco.replace("R$", "").replace(".", "").replace(",", ".")
    );

    const endpoint = isEditMode
      ? `https://6256fc506ea7037005434e84.mockapi.io/api/v1/produto/${id}`
      : "https://6256fc506ea7037005434e84.mockapi.io/api/v1/produto";

    const method = isEditMode ? "PUT" : "POST";

    await fetch(endpoint, {
      method,
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
      body: JSON.stringify({
        ...data,
        preco: precoFormatado,
        qt_vendas: Number(data.qt_vendas),
        qt_estoque: Number(data.qt_estoque),
      }),
    });

    setSnackbarMessage(
      isEditMode
        ? "Produto atualizado com sucesso!"
        : "Produto cadastrado com sucesso!"
    );
    setSnackbarOpen(true);

    setTimeout(() => {
      navigate("/products");
    }, 1500);
  };

  return (
    <>
      <Box maxWidth={600} mx="auto" display="flex" flexDirection="column">
        <Typography className="text-subtitle" textAlign="center" mb={2}>
          {isEditMode ? "Editar Produto" : "Novo Produto"}
        </Typography>

        <form onSubmit={handleSubmit(onSubmit)}>
          <Controller
            name="nome"
            control={control}
            render={({ field }) => (
              <TextField
                fullWidth
                label="Nome"
                margin="normal"
                error={!!errors.nome}
                helperText={errors.nome?.message}
                {...field}
              />
            )}
          />

          <Controller
            name="preco"
            control={control}
            render={({ field }) => (
              <TextField
                fullWidth
                label="Preço"
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
                error={!!errors.preco}
                helperText={errors.preco?.message}
                {...field}
              />
            )}
          />

          <Controller
            name="categoria"
            control={control}
            render={({ field }) => (
              <TextField
                select
                fullWidth
                label="Categoria"
                margin="normal"
                error={!!errors.categoria}
                helperText={errors.categoria?.message}
                {...field}
              >
                {categorias.map((cat) => (
                  <MenuItem key={cat} value={cat}>
                    {cat}
                  </MenuItem>
                ))}
              </TextField>
            )}
          />

          <Controller
            name="marca"
            control={control}
            render={({ field }) => (
              <TextField
                fullWidth
                label="Marca"
                margin="normal"
                error={!!errors.marca}
                helperText={errors.marca?.message}
                {...field}
              />
            )}
          />

          <Controller
            name="avatar"
            control={control}
            render={({ field }) => (
              <TextField
                fullWidth
                label="URL da Imagem"
                margin="normal"
                error={!!errors.avatar}
                helperText={errors.avatar?.message}
                {...field}
              />
            )}
          />

          <Controller
            name="qt_vendas"
            control={control}
            render={({ field }) => (
              <TextField
                fullWidth
                label="Qtd. de Vendas"
                margin="normal"
                type="number"
                error={!!errors.qt_vendas}
                helperText={errors.qt_vendas?.message}
                {...field}
              />
            )}
          />

          <Controller
            name="qt_estoque"
            control={control}
            render={({ field }) => (
              <TextField
                fullWidth
                label="Qtd. em Estoque"
                margin="normal"
                type="number"
                error={!!errors.qt_estoque}
                helperText={errors.qt_estoque?.message}
                {...field}
              />
            )}
          />

          <Box display="flex" justifyContent="center" sx={{ mt: 2 }}>
            <Button
              type="submit"
              variant="contained"
              className="btnSecondary"
              disabled={loading}
            >
              {isEditMode ? "Salvar Alterações" : "Cadastrar Produto"}
            </Button>
          </Box>
        </form>
      </Box>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={() => setSnackbarOpen(false)}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          onClose={() => setSnackbarOpen(false)}
          severity="success"
          sx={{ width: "100%" }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </>
  );
};

export default ProductForm;
