import { useState, useEffect, useCallback } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useParams } from "react-router-dom";

const schema = z.object({
  nome: z.string().min(1, "Nome obrigatório"),
  preco: z.string().min(1, "Preço obrigatório"),
  categoria: z.string().min(1, "Categoria obrigatória"),
  marca: z.string().min(1, "Marca obrigatória"),
  avatar: z.string().url("URL inválida").min(1, "Imagem obrigatória"),
  qt_vendas: z
    .string()
    .min(1, "Qtd. de vendas obrigatória")
    .refine((val) => Number(val) >= 0, {
      message: "Qtd. de vendas não pode ser negativa",
    }),
  qt_estoque: z
    .string()
    .min(1, "Qtd. em estoque obrigatória")
    .refine((val) => Number(val) >= 0, {
      message: "Qtd. em estoque não pode ser negativa",
    }),
});

export type FormData = z.infer<typeof schema>;

const useProductForm = (isEditMode: boolean, navigate: Function) => {
  const { id } = useParams();
  const token = localStorage.getItem("token") || "";
  const [loading, setLoading] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      nome: "",
      preco: "",
      categoria: "",
      marca: "",
      avatar: "",
      qt_vendas: "",
      qt_estoque: "",
    },
  });

  const loadProductData = useCallback(() => {
    if (isEditMode && id) {
      fetch(
        `https://6256fc506ea7037005434e84.mockapi.io/api/v1/produto/${id}`,
        {
          headers: { Authorization: token },
        }
      )
        .then((res) => res.json())
        .then((data) => {
          setValue("nome", data.nome);
          setValue("preco", String(data.preco).replace(".", ","));
          setValue("categoria", data.categoria);
          setValue("marca", data.marca);
          setValue("avatar", data.avatar);
          setValue("qt_vendas", String(data.qt_vendas));
          setValue("qt_estoque", String(data.qt_estoque));
        });
    }
  }, [id, isEditMode, setValue, token]);

  useEffect(() => {
    loadProductData();
  }, [loadProductData]);

  const onSubmit = async (data: FormData) => {
    setLoading(true);
    const precoFormatado = parseFloat(
      data.preco.replace("R$", "").replace(".", "").replace(",", ".")
    );

    const endpoint = isEditMode
      ? `https://6256fc506ea7037005434e84.mockapi.io/api/v1/produto/${id}`
      : "https://6256fc506ea7037005434e84.mockapi.io/api/v1/produto";

    await fetch(endpoint, {
      method: isEditMode ? "PUT" : "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
      body: JSON.stringify({
        ...data,
        preco: precoFormatado,
        qt_vendas: Number(data.qt_vendas),
        qt_estoque: Number(data.qt_estoque),
      }),
    });

    setSnackbarMessage(
      isEditMode
        ? "Produto atualizado com sucesso!"
        : "Produto cadastrado com sucesso!"
    );
    setSnackbarOpen(true);

    setTimeout(() => navigate("/products"), 1500);
  };

  return {
    control,
    handleSubmit,
    onSubmit,
    loading,
    errors,
    snackbarOpen,
    snackbarMessage,
    setSnackbarOpen,
  };
};

export default useProductForm;
