import { useEffect, useState, useMemo } from "react";
import {
  Box,
  Button,
  Typography,
  Avatar,
  CircularProgress,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { matchSorter } from "match-sorter";
import Table from "../../components/Table/Table";
import ActionCellRenderer from "../../components/ActionCellRender/ActionCellRender";
import { Product } from "../../interfaces/IProducts";
import { GridRenderCellParams } from "@mui/x-data-grid";
import SearchBar from "../../components/SearchBar/SearchBar";
import { formatCurrency } from "../../utils/formatCurrency";

const Products = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          "https://6256fc506ea7037005434e84.mockapi.io/api/v1/produto",
          {
            headers: {
              Authorization: token || "",
            },
          }
        );
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error("Erro ao buscar produtos:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [token]);

  const filtered = useMemo(() => {
    return search
      ? matchSorter(products, search, {
          keys: ["nome", "preco", "qt_estoque", "qt_vendas", "marca"],
        })
      : products;
  }, [search, products]);

  const handleClearFilters = () => {
    setSearch(""); // Limpa o filtro de busca
  };

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
      flex: 0.5,
      renderCell: (params: GridRenderCellParams) =>
        formatCurrency(params.value),
    },
    { field: "qt_estoque", headerName: "Estoque", flex: 0.5 },
    { field: "qt_vendas", headerName: "Qntd. Vendas", flex: 0.5 },
    { field: "marca", headerName: "Marca", flex: 0.5 },
    {
      field: "actions",
      headerName: "Ações",
      width: 200,
      renderCell: (params: GridRenderCellParams) => (
        <ActionCellRenderer product={params.row} />
      ),
      sortable: false,
      filterable: false,
    },
  ];

  return (
    <Box p={3}>
      <Box
        display="flex"
        justifyContent="space-between"
        mb={2}
        alignItems="center"
      >
        <SearchBar
          label="Buscar"
          onSearch={(term) => setSearch(term)}
          value={search}
        />
        <Box display="flex" gap={1}>
          <Button
            variant="text"
            onClick={handleClearFilters}
            className="btnText"
          >
            Limpar Filtros
          </Button>

          <Button
            variant="contained"
            onClick={() => navigate("/products/create")}
            className="btnSecondary"
          >
            Novo Produto
          </Button>
        </Box>
      </Box>

      {loading ? (
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          height="60vh"
        >
          <CircularProgress />
        </Box>
      ) : filtered.length === 0 ? (
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
