import { Box, Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();
  return (
    <Box
      sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <img
        src="/images/notFound.jpg"
        alt="Imagem representando pagina não encontrada"
        style={{ width: "650px" }}
      />
      <Typography className="text-subtitle">Pagina não encontrada!</Typography>
      <Button className="btnPrimary" onClick={() => navigate("/")}>
        Voltar
      </Button>
    </Box>
  );
};
export default NotFound;
