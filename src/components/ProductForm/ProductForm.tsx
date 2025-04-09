import { Box, Button, MenuItem, TextField, Typography } from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { IMaskInput } from "react-imask";

const schema = z.object({
  nome: z.string().min(1, "Nome obrigatório"),
  preco: z.string().min(1, "Preço obrigatório"),
  categoria: z.string().min(1, "Categoria obrigatória"),
  marca: z.string().min(1, "Marca obrigatória"),
  avatar: z.string().url("URL inválida").min(1, "Imagem obrigatória"),
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

  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
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
          const preco = data.preco as number;
          setValue("nome", data.nome);
          setValue("preco", `R$ ${preco.toFixed(2).replace(".", ",")}`);
          setValue("categoria", data.categoria);
          setValue("marca", data.marca);
          setValue("avatar", data.avatar);
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
      body: JSON.stringify({ ...data, preco: precoFormatado }),
    });

    navigate("/products");
  };

  return (
    <Box maxWidth={600} mx="auto">
      <Typography variant="h5" mb={3}>
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
        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          sx={{ mt: 3 }}
          disabled={loading}
        >
          {isEditMode ? "Salvar Alterações" : "Cadastrar Produto"}
        </Button>
      </form>
    </Box>
  );
};

export default ProductForm;
