import "@testing-library/jest-dom";

import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import Table from "./Table";

const mockColumns = [
  { field: "id", headerName: "ID", width: 90 },
  { field: "nome", headerName: "Nome", width: 130 },
];

const mockRows = [
  { id: 1, nome: "Produto A" },
  { id: 2, nome: "Produto B" },
  { id: 3, nome: "Produto C" },
  { id: 4, nome: "Produto D" },
  { id: 5, nome: "Produto E" },
  { id: 6, nome: "Produto F" },
  { id: 7, nome: "Produto G" },
  { id: 8, nome: "Produto H" },
  { id: 9, nome: "Produto I" },
  { id: 10, nome: "Produto J" },
  { id: 11, nome: "Produto K" },
  { id: 12, nome: "Produto L" },
  { id: 13, nome: "Produto M" },
  { id: 14, nome: "Produto N" },
  { id: 15, nome: "Produto O" },
  { id: 16, nome: "Produto P" },
  { id: 17, nome: "Produto Q" },
];

describe("Table Component", () => {
  it("deve renderizar com dados corretamente", () => {
    render(<Table columns={mockColumns} rows={mockRows} />);
    expect(screen.getByText("Produto A")).toBeInTheDocument();
    expect(screen.getByText("Produto B")).toBeInTheDocument();
  });

  it("deve paginar corretamente (exibir 15 por página)", () => {
    render(<Table columns={mockColumns} rows={mockRows} />);
    expect(screen.getByText("Produto A")).toBeInTheDocument();
    expect(screen.queryByText("Produto Q")).not.toBeInTheDocument();
  });

  it("deve ordenar os dados ao clicar no cabeçalho", async () => {
    render(<Table columns={mockColumns} rows={mockRows} />);

    const nomeHeader = screen.getByRole("columnheader", { name: "Nome" });

    fireEvent.click(nomeHeader);

    await waitFor(() => {
      const firstRow = screen.getAllByRole("row")[1];
      expect(firstRow).toHaveTextContent("Produto A");
    });

    fireEvent.click(nomeHeader);

    await waitFor(() => {
      const firstRow = screen.getAllByRole("row")[1];
      expect(firstRow).toHaveTextContent("Produto Q");
    });
  });
});
