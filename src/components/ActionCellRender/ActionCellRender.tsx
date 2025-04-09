import { useState } from "react";
import {
  IconButton,
  Tooltip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  Typography,
  Snackbar,
} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useNavigate } from "react-router-dom";
import { Product } from "../../interfaces/IProducts";

const ActionCellRenderer = ({ product }: { product: Product }) => {
  const navigate = useNavigate();

  const [modalOpen, setModalOpen] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const token = localStorage.getItem("token");

  const handleView = () => navigate(`/products/${product.id}`);
  const handleEdit = () => navigate(`/products/edit/${product.id}`);

  const openModal = () => setModalOpen(true);

  const handleDelete = async () => {
    try {
      await fetch(
        `https://6256fc506ea7037005434e84.mockapi.io/api/v1/produto/${product.id}`,
        {
          method: "DELETE",
          headers: { Authorization: token! },
        }
      );

      setSnackbarOpen(true);

      setTimeout(() => {
        navigate("/products");
      }, 1500);
    } catch (error) {
      console.error("Erro ao excluir produto:", error);
      setSnackbarOpen(false);
    }

    setModalOpen(false);
  };

  return (
    <>
      <Tooltip title="Visualizar">
        <IconButton onClick={handleView}>
          <VisibilityIcon />
        </IconButton>
      </Tooltip>
      <Tooltip title="Editar">
        <IconButton onClick={handleEdit}>
          <EditIcon />
        </IconButton>
      </Tooltip>
      <Tooltip title="Remover">
        <IconButton onClick={openModal}>
          <DeleteIcon />
        </IconButton>
      </Tooltip>

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
        message="Produto removido com sucesso!"
      />
    </>
  );
};

export default ActionCellRenderer;
