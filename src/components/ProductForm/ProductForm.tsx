import { Box, Button, Typography, Snackbar, Alert } from "@mui/material";
import { useNavigate } from "react-router-dom";
import useProductForm from "../../hooks/useProductForm";
import FormField from "../FormField/FormField";
import CurrencyField from "../CurrencyField/CurrencyField";

const categorias = ["Eletrônico", "Alimento", "Limpeza", "Roupas"];

const ProductForm = ({ isEditMode = false }: { isEditMode?: boolean }) => {
  const navigate = useNavigate();

  const {
    control,
    handleSubmit,
    onSubmit,
    loading,
    errors,
    snackbarOpen,
    snackbarMessage,
    setSnackbarOpen,
  } = useProductForm(isEditMode, navigate);

  return (
    <>
      <Box maxWidth={600} mx="auto" display="flex" flexDirection="column">
        <Typography className="text-subtitle" textAlign="center" mb={2}>
          {isEditMode ? "Editar Produto" : "Novo Produto"}
        </Typography>

        <form onSubmit={handleSubmit(onSubmit)}>
          <FormField
            name="nome"
            label="Nome"
            control={control}
            errors={errors}
          />
          <CurrencyField
            name="preco"
            label="Preço"
            control={control}
            errors={errors}
          />
          <FormField
            name="categoria"
            label="Categoria"
            control={control}
            errors={errors}
            select
            options={categorias}
          />
          <FormField
            name="marca"
            label="Marca"
            control={control}
            errors={errors}
          />
          <FormField
            name="avatar"
            label="URL da Imagem"
            control={control}
            errors={errors}
          />
          <FormField
            name="qt_vendas"
            label="Qtd. de Vendas"
            type="number"
            control={control}
            errors={errors}
          />
          <FormField
            name="qt_estoque"
            label="Qtd. em Estoque"
            type="number"
            control={control}
            errors={errors}
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
      >
        <Alert severity="success" sx={{ width: "100%" }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </>
  );
};

export default ProductForm;
