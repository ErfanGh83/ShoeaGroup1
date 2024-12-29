import { useQuery, UseQueryResult } from "@tanstack/react-query";
import axios from "axios";
import { Product, User } from "../types/types";

const baseUrl = 'http://localhost:5173';

const api = axios.create({
    baseURL: baseUrl,
    headers: {
        'Content-Type': 'application/json',
    },
});

const fetchProducts = async (): Promise<Product[]> => {
    const { data } = await api.get<Product[]>('/Products');
    return data;
};

const fetchUser = async (userId: string): Promise<User> => {
    if (!userId) throw new Error("User ID is required");
    const { data } = await api.get<User>(`/users/${userId}`);
    return data;
};

const fetchProduct = async (productId: string): Promise<Product> => {
    if (!productId) throw new Error("Product ID is required");
    const url = `/products/${productId}`;
    console.log("Fetching product with URL:", url);
    const { data } = await api.get<Product>(url);
    return data;
};


const useProducts = (): UseQueryResult<Product[], Error> => {
    return useQuery<Product[], Error>({
        queryKey: ['products'],
        queryFn: fetchProducts,
        staleTime: 5 * 60 * 1000,
        retry: 3,
    });
};


const useUser = (userId: string | null): UseQueryResult<User, Error> => {
    return useQuery<User, Error>({
        queryKey: ['user', userId],
        queryFn: () => fetchUser(userId as string),
        enabled: !!userId,
    });
};

const useProduct = (productId: string | null): UseQueryResult<Product, Error> => {
    return useQuery<Product, Error>({
        queryKey: ['product', productId],
        queryFn: () => fetchProduct(productId as string),
        enabled: !!productId,
    });
};

export { useProducts, useUser, useProduct };

