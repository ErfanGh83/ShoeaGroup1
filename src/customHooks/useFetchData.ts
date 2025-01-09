import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { Product, User, CartItem, DiscountType } from "../types/types";
import { HTTP, HTTPPrivate } from "../services/http.service";
import { BASE_URL } from "../config/api.config";
import { AxiosResponse } from "axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const baseURL = BASE_URL;

const fetchProducts = async (
  params?: Record<string, string>
): Promise<Product[]> => {
  const { data } = await HTTP.get<Product[]>("/api/products", { params });
  return data;
};

const fetchWishlist = async (
  params?: Record<string, string>
): Promise<Product[]> => {
  const { data } = await HTTPPrivate.get<Product[]>("/api/wishlist", {
    params,
  });
  return data;
};

const fetchUser = async (): Promise<User> => {
  const { data } = await HTTPPrivate.get<User>(`/auth/whoami`);
  return data;
};

const fetchProduct = async (productId: string): Promise<Product> => {
  if (!productId) throw new Error("Product ID is required");
  const { data } = await HTTP.get<Product>(`/api/products/${productId}`);
  return data;
};

const fetchCart = async (): Promise<CartItem[]> => {
  const { data } = await HTTPPrivate.get<CartItem[]>(`/api/cart`);
  return data;
};

const updateCart = async (cart: CartItem): Promise<CartItem> => {
  const { data } = await HTTPPrivate.put<CartItem>(
    "/api/cart/" + cart.productId,
    cart
  );
  return data;
};

const fetchOrders = async (
  params?: Record<string, string>
): Promise<Product[]> => {
  const { data } = await HTTPPrivate.get<Product[]>(`/api/orders`, { params });
  return data;
};
const deleteCart = async (id: number) => {
  const { data } = await HTTPPrivate.delete("/api/cart/" + id);
  return data;
};

export const toggleWishlist = async (
  data: object
): Promise<AxiosResponse<string>> => {
  return HTTPPrivate.post("/api/wishlist", data);
};

export const addToCart = async (
  data: CartItem
): Promise<AxiosResponse<string>> => {
  return HTTPPrivate.post("/api/cart", data);
};

const useProducts = (
  params?: Record<string, string>
): UseQueryResult<Product[], Error> => {
  return useQuery<Product[], Error>({
    queryKey: ["products", params],
    queryFn: () => fetchProducts(params),
    staleTime: 60 * 1000,
    retry: 1,
  });
};

const useWishlist = (
  params?: Record<string, string>
): UseQueryResult<Product[], Error> => {
  return useQuery<Product[], Error>({
    queryKey: ["wishlist", params],
    queryFn: () => fetchWishlist(params),
    staleTime: 60 * 1000,
    retry: 1,
  });
};

const useUser = (): UseQueryResult<User, Error> => {
  return useQuery<User, Error>({
    queryKey: ["user"],
    queryFn: fetchUser,
  });
};

const useProduct = (
  productId: string | null
): UseQueryResult<Product, Error> => {
  return useQuery<Product, Error>({
    queryKey: ["product", productId],
    queryFn: () => fetchProduct(productId as string),
    enabled: !!productId,
  });
};

const useCart = (): UseQueryResult<CartItem[], Error> => {
  return useQuery<CartItem[], Error>({
    queryKey: ["cart"],
    queryFn: fetchCart,
  });
};
const useDeleteCart = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteCart,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["cart"],
      });
    },
  });
};

const useUpdateCart = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateCart,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["cart"],
      });
    },
  });
};

const useOrders = (
  params?: Record<string, string>
): UseQueryResult<Product[], Error> => {
  return useQuery<Product[], Error>({
    queryKey: ["orders", params],
    queryFn: () => fetchOrders(params),
    staleTime: 60 * 1000,
    retry: 1,
  });
};

export {
  useProducts,
  useUser,
  useProduct,
  useWishlist,
  useCart,
  useOrders,
  useUpdateCart,
  useDeleteCart,
};
