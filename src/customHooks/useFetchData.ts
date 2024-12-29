import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const baseUrl = 'http://localhost:5173';

const api = axios.create({
    baseURL: baseUrl,
    headers: {
        'Content-Type': 'application/json',
    },
});

const fetchProducts = async () => {
    const response = await api.get('/Products');
    return response.data;
};

const fetchUser = async (userId : string) => {
    if (!userId) throw new Error("User ID is required");
    const response = await api.get(`/users/${userId}`);
    return response.data;
};

const useProducts = () => {
    return useQuery({
        queryKey: ['products'],
        queryFn: fetchProducts,
        staleTime: 5 * 60 * 1000,
    });
};

const useUser = (userId : string) => {
    return useQuery({
        queryKey: ['user', userId],
        queryFn: () => fetchUser(userId),
        enabled: !!userId,
        retry: false,
    });
};

export { useProducts, useUser };
