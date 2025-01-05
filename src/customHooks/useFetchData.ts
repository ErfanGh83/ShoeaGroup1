import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { Product, User, CartItem } from "../types/types";
import { HTTP, HTTPPrivate } from "../services/http.service";

export const baseURL = 'http://localhost:8000';

const fetchProducts = async (params?: Record<string, string>): Promise<Product[]> => {
    const { data } = await HTTP.get<Product[]>('/api/products', { params });
    return data;
};

const fetchWishlist = async (params?: Record<string, string>): Promise<Product[]> => {
    const { data } = await HTTPPrivate.get<Product[]>('/api/wishlist', { params });
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

const fetchCart = async (): Promise<CartItem> => {
    const { data } = await HTTPPrivate.get<CartItem>(`/api/cart`);
    return data;
};


const useProducts = (params?: Record<string, string>): UseQueryResult<Product[], Error> => {
    return useQuery<Product[], Error>({
        queryKey: ['products', params],
        queryFn: () => fetchProducts(params),
        staleTime: 60 * 1000,
        retry: 1,
    });
};

const useWishlist = (params?: Record<string, string>): UseQueryResult<Product[], Error> => {
    return useQuery<Product[], Error>({
        queryKey: ['wishlist', params],
        queryFn: () => fetchWishlist(params),
        staleTime: 60 * 1000,
        retry: 1,
    });
};


const useUser = (): UseQueryResult<User, Error> => {
    return useQuery<User, Error>({
        queryKey: ['user'],
        queryFn: fetchUser,
    });
};

const useProduct = (productId: string | null): UseQueryResult<Product, Error> => {
    return useQuery<Product, Error>({
        queryKey: ['product', productId],
        queryFn: () => fetchProduct(productId as string),
        enabled: !!productId,
    });
};

const useCart = (): UseQueryResult<CartItem, Error> => {
    return useQuery<CartItem, Error>({
        queryKey: ['cart'],
        queryFn: fetchCart,
    });
};


export { useProducts, useUser, useProduct, useWishlist, useCart };
