import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

interface ActionCellRendererProps {
  value: string;
}

const ActionCellRenderer = (props: ActionCellRendererProps) => {
  const navigate = useNavigate();

  return (
    <Button size="small" onClick={() => navigate(`/products/${props.value}`)}>
      Ver
    </Button>
  );
};

export default ActionCellRenderer;
