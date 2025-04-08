import { useEffect, useState, useMemo } from "react";
import { AgGridReact } from "ag-grid-react";
import {
  ClientSideRowModelModule,
  ColDef,
  ModuleRegistry,
} from "ag-grid-community";
import { Box, Button, TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Product } from "../../interfaces/IProducts";

import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import ActionCellRenderer from "../../components/ActionCellRender/ActionCellRender";

ModuleRegistry.registerModules([ClientSideRowModelModule]);

const Products = () => {
  const [rowData, setRowData] = useState<Product[]>([]);
  const [filterText, setFilterText] = useState("");
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    fetch("https://6256fc506ea7037005434e84.mockapi.io/api/v1/produto", {
      headers: {
        Authorization: token || "",
      },
    })
      .then((res) => res.json())
      .then((data) => setRowData(data));
  }, [token]);

  const columnDefs: ColDef<Product>[] = useMemo(
    () => [
      {
        headerName: "Avatar",
        field: "avatar",
        cellRenderer: (params: any) =>
          `<img src="${params.value}" alt="avatar" style="width: 40px; border-radius: 50%" />`,
      },
      { headerName: "Nome", field: "nome" },
      { headerName: "Descrição", field: "descricao" },
      { headerName: "Preço", field: "preco" },
      { headerName: "Categoria", field: "categoria" },
      {
        headerName: "Ações",
        field: "id",
        cellRenderer: ActionCellRenderer,
      },
    ],
    []
  );

  const filteredData = rowData.filter((item) =>
    item.nome.toLowerCase().includes(filterText.toLowerCase())
  );

  return (
    <Box
      p={2}
      className="ag-theme-alpine"
      style={{ height: "80vh", width: "100%" }}
    >
      <Box display="flex" justifyContent="space-between" mb={2}>
        <TextField
          label="Buscar produto"
          value={filterText}
          onChange={(e) => setFilterText(e.target.value)}
        />
        <Button
          variant="contained"
          onClick={() => navigate("/products/create")}
        >
          Novo Produto
        </Button>
      </Box>

      <AgGridReact<Product>
        rowData={filteredData}
        columnDefs={columnDefs}
        pagination={true}
        paginationPageSize={15}
        domLayout="autoHeight"
      />
    </Box>
  );
};

export default Products;
