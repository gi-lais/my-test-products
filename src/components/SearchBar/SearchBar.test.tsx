import { render, screen, fireEvent } from "@testing-library/react";
import SearchBar from "./SearchBar";

describe("SearchBar", () => {
  const onSearchMock = jest.fn();

  beforeEach(() => {
    onSearchMock.mockClear();
  });

  it("renderiza com o label correto", () => {
    render(<SearchBar label="Buscar produto" onSearch={onSearchMock} />);
    expect(screen.getByLabelText("Buscar produto")).toBeInTheDocument();
  });

  it("chama onSearch ao digitar no campo", () => {
    render(<SearchBar label="Buscar" onSearch={onSearchMock} />);
    const input = screen.getByLabelText("Buscar");

    fireEvent.change(input, { target: { value: "Celular" } });

    expect(onSearchMock).toHaveBeenCalledWith("Celular");
  });

  it("exibe o ícone de busca", () => {
    render(<SearchBar label="Buscar" onSearch={onSearchMock} />);
    expect(screen.getByTestId("SearchIcon")).toBeInTheDocument();
  });

  it("respeita a largura customizada", () => {
    const { container } = render(
      <SearchBar label="Buscar" onSearch={onSearchMock} width="300px" />
    );
    expect(container.firstChild).toHaveStyle("width: 300px");
  });
});
