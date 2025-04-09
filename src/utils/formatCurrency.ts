export const formatCurrency = (value: string | number): string => {
  if (typeof value === "string" && value.startsWith("R$")) {
    return value;
  }

  const num = Number(value);

  return isNaN(num)
    ? "—"
    : new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL",
      }).format(num);
};
