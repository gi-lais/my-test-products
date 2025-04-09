import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter, useLocation } from "react-router-dom";
import SideMenu from "./SideMenu";

jest.mock("react-router-dom", () => {
  const original = jest.requireActual("react-router-dom");
  return {
    ...original,
    useNavigate: () => jest.fn(),
    useLocation: jest.fn(),
  };
});

const toggleDrawerMock = jest.fn();

const renderWithRouter = (open: boolean, path: string = "/") => {
  (useLocation as jest.Mock).mockReturnValue({ pathname: path });

  return render(
    <MemoryRouter>
      <SideMenu open={open} toggleDrawer={toggleDrawerMock} />
    </MemoryRouter>
  );
};

describe("SideMenu", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("renderiza o drawer aberto", () => {
    renderWithRouter(true);
    expect(screen.getByText("Menu")).toBeInTheDocument();
    expect(screen.getByLabelText("Fechar menu")).toBeInTheDocument();
  });

  it("renderiza o drawer fechado", () => {
    renderWithRouter(false);
    expect(screen.queryByText("Menu")).not.toBeInTheDocument();
    expect(screen.getByLabelText("Abrir menu")).toBeInTheDocument();
  });

  it("chama toggleDrawer ao clicar no botão", () => {
    renderWithRouter(true);
    const toggleButton = screen.getByLabelText("Fechar menu");
    fireEvent.click(toggleButton);
    expect(toggleDrawerMock).toHaveBeenCalled();
  });

  it("destaca o item selecionado com base na rota", () => {
    renderWithRouter(true, "/products");

    const selectedButton = screen.getByRole("button", {
      name: /produtos/i,
    });

    expect(selectedButton).toHaveClass("Mui-selected");
  });

  it("renderiza o icone mesmo com o menu fechado", () => {
    renderWithRouter(false);
    expect(
      screen.getByRole("button", { name: "Abrir menu" })
    ).toBeInTheDocument();
    expect(screen.getByTestId("InventoryIcon")).toBeInTheDocument();
  });
});
