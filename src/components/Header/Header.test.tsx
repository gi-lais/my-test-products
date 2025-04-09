import "@testing-library/jest-dom";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import Header from "./Header";
import { BrowserRouter as Router, useNavigate } from "react-router-dom";

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: jest.fn(),
}));

describe("Header", () => {
  it("deve chamar o handleLogout e redirecionar para a página inicial ao clicar em 'Sair'", async () => {
    const navigate = jest.fn();
    (useNavigate as jest.Mock).mockReturnValue(navigate);

    const mockUser = {
      nome: "João",
      sobrenome: "Silva",
      image: "https://example.com/avatar.jpg",
    };
    localStorage.setItem("token", "fake-token");

    global.fetch = jest.fn().mockResolvedValue({
      json: jest.fn().mockResolvedValue(mockUser),
    });

    render(
      <Router>
        <Header />
      </Router>
    );

    await waitFor(() => {
      expect(screen.getByText("João Silva")).toBeInTheDocument();
    });

    fireEvent.click(screen.getByRole("button"));

    const sairButton = await screen.findByText("Sair");
    expect(sairButton).toBeInTheDocument();

    fireEvent.click(sairButton);

    expect(navigate).toHaveBeenCalledWith("/");
  });
});
