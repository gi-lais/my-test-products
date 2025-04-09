import { IconButton, Tooltip } from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useNavigate } from "react-router-dom";
import { Product } from "../../interfaces/IProducts";

const ActionCellRenderer = ({ product }: { product: Product }) => {
  const navigate = useNavigate();

  const handleView = () => navigate(`/products/${product.id}`);
  const handleEdit = () => navigate(`/products/edit/${product.id}`);
  const handleDelete = () => {
    if (confirm("Tem certeza que deseja excluir este produto?")) {
      navigate(`/products/delete/${product.id}`);
    }
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
        <IconButton onClick={handleDelete}>
          <DeleteIcon />
        </IconButton>
      </Tooltip>
    </>
  );
};

export default ActionCellRenderer;
