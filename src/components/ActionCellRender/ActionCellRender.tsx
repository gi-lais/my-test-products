import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const ActionCellRenderer = (props: any) => {
  const navigate = useNavigate();

  return (
    <Button size="small" onClick={() => navigate(`/products/${props.value}`)}>
      Ver
    </Button>
  );
};

export default ActionCellRenderer;
