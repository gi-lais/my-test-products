import React from "react";
import { DataGrid, GridColDef, GridRowsProp } from "@mui/x-data-grid";
import { Box } from "@mui/material";

interface TableProps {
  columns: GridColDef[];
  rows: GridRowsProp;
  height?: number;
  loading?: boolean;
}

const Table: React.FC<TableProps> = ({ columns, rows, height = 500 }) => {
  return (
    <Box sx={{ height, width: "100%" }}>
      <DataGrid
        rows={rows}
        columns={columns}
        disableRowSelectionOnClick
        pageSizeOptions={[5, 10, 15]}
        initialState={{
          pagination: {
            paginationModel: { pageSize: 15, page: 0 },
          },
        }}
      />
    </Box>
  );
};

export default Table;
