import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import type { CartItem, Product, InsertCartItem } from "@shared/schema";

type CartItemWithProduct = CartItem & { product: Product };

export function useCart() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const cartItems = useQuery<CartItemWithProduct[]>({
    queryKey: ["/api/cart"],
  });

  const addToCart = useMutation({
    mutationFn: async (item: Pick<InsertCartItem, "productId" | "quantity">) => {
      const response = await apiRequest("POST", "/api/cart", item);
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/cart"] });
      toast({
        title: "Produto adicionado",
        description: "O produto foi adicionado ao seu carrinho.",
      });
    },
    onError: () => {
      toast({
        title: "Erro",
        description: "Não foi possível adicionar o produto ao carrinho.",
        variant: "destructive",
      });
    },
  });

  const updateCartItem = useMutation({
    mutationFn: async ({ id, quantity }: { id: number; quantity: number }) => {
      const response = await apiRequest("PUT", `/api/cart/${id}`, { quantity });
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/cart"] });
    },
    onError: () => {
      toast({
        title: "Erro",
        description: "Não foi possível atualizar o carrinho.",
        variant: "destructive",
      });
    },
  });

  const removeFromCart = useMutation({
    mutationFn: async (id: number) => {
      await apiRequest("DELETE", `/api/cart/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/cart"] });
      toast({
        title: "Produto removido",
        description: "O produto foi removido do seu carrinho.",
      });
    },
    onError: () => {
      toast({
        title: "Erro",
        description: "Não foi possível remover o produto do carrinho.",
        variant: "destructive",
      });
    },
  });

  const clearCart = useMutation({
    mutationFn: async () => {
      await apiRequest("DELETE", "/api/cart");
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/cart"] });
      toast({
        title: "Carrinho limpo",
        description: "Todos os produtos foram removidos do seu carrinho.",
      });
    },
    onError: () => {
      toast({
        title: "Erro",
        description: "Não foi possível limpar o carrinho.",
        variant: "destructive",
      });
    },
  });

  return {
    cartItems,
    addToCart,
    updateCartItem,
    removeFromCart,
    clearCart,
  };
}
