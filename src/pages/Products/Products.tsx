import { useEffect, useState, useMemo } from "react";
import { Box, Button, TextField, Typography, Avatar } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { matchSorter } from "match-sorter";
import Table from "../../components/Table/Table";
import ActionCellRenderer from "../../components/ActionCellRender/ActionCellRender";
import { Product } from "../../interfaces/IProducts";
import { GridRenderCellParams } from "@mui/x-data-grid";

const Products = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    fetch("https://6256fc506ea7037005434e84.mockapi.io/api/v1/produto", {
      headers: {
        Authorization: token || "",
      },
    })
      .then((res) => res.json())
      .then((data) => setProducts(data));
  }, [token]);

  const filtered = useMemo(() => {
    return search
      ? matchSorter(products, search, {
          keys: ["nome", "preco", "qt_estoque", "qt_vendas", "marca"],
        })
      : products;
  }, [search, products]);

  const columns = [
    { field: "nome", headerName: "Nome", flex: 1 },
    {
      field: "avatar",
      headerName: "Avatar",
      width: 80,
      renderCell: (params: GridRenderCellParams) => (
        <Avatar src={params.value} alt={params.row.nome} />
      ),
    },
    {
      field: "preco",
      headerName: "Preço",
      flex: 1,
      valueFormatter: (params: any) =>
        isNaN(params.value) ? "—" : `R$ ${parseFloat(params.value).toFixed(2)}`,
    },
    { field: "qt_estoque", headerName: "Estoque", flex: 1 },
    { field: "qt_vendas", headerName: "Qntd. Vendas", flex: 1 },
    { field: "marca", headerName: "Marca", flex: 1 },
    {
      field: "actions",
      headerName: "",
      width: 100,
      renderCell: (params: GridRenderCellParams) => (
        <ActionCellRenderer product={params.row} />
      ),
      sortable: false,
      filterable: false,
    },
  ];

  return (
    <Box p={3}>
      <Box display="flex" justifyContent="space-between" mb={3}>
        <TextField
          label="Buscar produto"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <Button
          variant="contained"
          onClick={() => navigate("/products/create")}
        >
          Novo Produto
        </Button>
      </Box>

      {filtered.length === 0 ? (
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          height="60vh"
          bgcolor="#f5f5f5"
          borderRadius={2}
        >
          <Typography variant="h6">Nenhum produto encontrado</Typography>
        </Box>
      ) : (
        <Table columns={columns} rows={filtered} />
      )}
    </Box>
  );
};

export default Products;
