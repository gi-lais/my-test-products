import {
  Box,
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Snackbar,
  Alert,
  CircularProgress,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

type Product = {
  id: string;
  nome: string;
  preco: string;
  categoria: string;
  marca: string;
  avatar: string;
  qt_estoque: number;
  qt_vendas: number;
};

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const token = localStorage.getItem("token") || "";

  const [product, setProduct] = useState<Product | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  useEffect(() => {
    fetch(`https://6256fc506ea7037005434e84.mockapi.io/api/v1/produto/${id}`, {
      headers: { Authorization: token },
    })
      .then((res) => res.json())
      .then((data) => setProduct(data));
  }, [id, token]);

  const handleDelete = async () => {
    await fetch(
      `https://6256fc506ea7037005434e84.mockapi.io/api/v1/produto/${id}`,
      {
        method: "DELETE",
        headers: { Authorization: token },
      }
    );

    setSnackbarOpen(true);

    setTimeout(() => {
      navigate("/products");
    }, 1500);
  };

  if (!product) {
    return (
      <>
        <CircularProgress />
        <Typography textAlign="center">Carregando produto...</Typography>;
      </>
    );
  }

  return (
    <Box p={3}>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={3}
      >
        <Typography className="text-subtitle">Detalhes do Produto</Typography>
        <Box>
          <Button
            variant="contained"
            className="btnTertiary"
            sx={{ mr: 1 }}
            onClick={() => navigate(`/products/edit/${id}`)}
            startIcon={<EditIcon />}
          >
            Editar
          </Button>
          <Button
            variant="outlined"
            className="btnQuaternary"
            onClick={() => setModalOpen(true)}
            startIcon={<DeleteIcon />}
          >
            Remover
          </Button>
        </Box>
      </Box>

      <Box className="text-body">
        <Typography className="text-body">
          <strong>Nome:</strong> {product.nome}
        </Typography>
        <Typography className="text-body">
          <strong>Preço:</strong> {product.preco}
        </Typography>
        <Typography className="text-body">
          <strong>Categoria:</strong> {product.categoria}
        </Typography>
        <Typography className="text-body">
          <strong>Marca:</strong> {product.marca}
        </Typography>
        <Typography className="text-body">
          <strong>Quantidade em Estoque:</strong> {product.qt_estoque}
        </Typography>
        <Typography className="text-body">
          <strong>Quantidade de Vendas:</strong> {product.qt_vendas}
        </Typography>
        <Typography className="text-body">
          <strong>Imagem:</strong>
        </Typography>
        <Box mt={1}>
          <img
            src={product.avatar}
            alt={product.nome}
            style={{ width: 150, borderRadius: 8 }}
          />
        </Box>
      </Box>

      <Dialog open={modalOpen} onClose={() => setModalOpen(false)}>
        <DialogTitle>Confirmar remoção</DialogTitle>
        <DialogContent>
          <Typography>Tem certeza que deseja remover este produto?</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setModalOpen(false)} className="btnQuaternary">
            Cancelar
          </Button>
          <Button
            onClick={handleDelete}
            className="btnTertiary"
            variant="contained"
          >
            Remover
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={() => setSnackbarOpen(false)}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert severity="success" onClose={() => setSnackbarOpen(false)}>
          Produto removido com sucesso!
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default ProductDetails;
