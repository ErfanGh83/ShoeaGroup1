import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { Product, User, CartItem, IAddress, CartData, SelectAddressParam, OrderItem, Order } from "../types/types";
import { HTTP, HTTPPrivate } from "../services/http.service";
import { BASE_URL } from "../config/api.config";
import { AxiosResponse } from "axios";

export const baseURL = BASE_URL;

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

const fetchCart = async (): Promise<CartItem[]> => {
    const { data } = await HTTPPrivate.get<CartItem[]>(`/api/cart`);
    return data;
};

const fetchOrders = async (params?: Record<string, string>): Promise<OrderItem[]> => {
    const { data } = await HTTPPrivate.get<OrderItem[]>(`/api/orders`, { params });
    return data;
};

const fetchAddress = async (params?: Record<string, string>): Promise<IAddress[] | IAddress> => {
    const { data } = await HTTPPrivate.get<IAddress[] | IAddress>(`/api/address`, { params });
    return data;
};

const fetchSearchHistory = async (params?: Record<string, string>): Promise<[]> => {
    const { data } = await HTTPPrivate.get<[]>(`/api/search`, { params });
    return data;
};

export const toggleWishlist = async (data: object): Promise<AxiosResponse<string>> => {
    return HTTPPrivate.post('/api/wishlist', data)
}

export const addToCart = async (data: CartData): Promise<AxiosResponse<string>> => {
    return HTTPPrivate.post('/api/cart', data)
}

export const addToSearchHistory = async (data: string): Promise<AxiosResponse<string>> => {
    return HTTPPrivate.post('/api/search', data)
}

export const deleteFromSearchHistory = async (data: string): Promise<AxiosResponse<string>> => {
    return HTTPPrivate.delete(`/api/search/${data}`)
}

export const deleteAllSearchHistory = async (): Promise<AxiosResponse<string>> => {
    return HTTPPrivate.delete(`/api/search`)
}

export const addToAddress = async (data: IAddress): Promise<AxiosResponse<string>> => {
    return HTTPPrivate.post('/api/address', data)
}

export const addToOrders = async (data: Order): Promise<AxiosResponse<string>> => {
    return HTTPPrivate.post('/api/orders', data)
}

export const setSelectedAddress = async (data: SelectAddressParam): Promise<AxiosResponse<string>> => {
    return HTTPPrivate.post('/api/address', data)
}

const useProducts = (params?: Record<string, string>): UseQueryResult<Product[], Error> => {
    return useQuery<Product[], Error>({
        queryKey: ['products', params],
        queryFn: () => fetchProducts(params),
        staleTime: 60 * 1000,
        retry: 0,
    });
};

const useHistory = (params?: Record<string, string>): UseQueryResult<[], Error> => {
    return useQuery<[], Error>({
        queryKey: ['history', params],
        queryFn: () => fetchSearchHistory(params),
        staleTime: 60 * 1000,
        retry: 0,
    });
};

// const { data: products, isError: isProductsError, isLoading } = useProducts({ search: 'nike'})
// addToSearchHistory('nike')
// const { data: searchHistoryArray, isError: isHistoryError } = useHistory()
// deleteFromHistorySearch('nike')

const useWishlist = (params?: Record<string, string>): UseQueryResult<Product[], Error> => {
    return useQuery<Product[], Error>({
        queryKey: ['wishlist', params],
        queryFn: () => fetchWishlist(params),
        staleTime: 60 * 1000,
        retry: 0,
    });
};


const useUser = (): UseQueryResult<User, Error> => {
    return useQuery<User, Error>({
        queryKey: ['user'],
        queryFn: fetchUser,
        retry: 0,
    });
};

const useProduct = (productId: string | null): UseQueryResult<Product, Error> => {
    return useQuery<Product, Error>({
        queryKey: ['product', productId],
        queryFn: () => fetchProduct(productId as string),
        enabled: !!productId,
        retry: 0,
    });
};

const useCart = (): UseQueryResult<CartItem[], Error> => {
    return useQuery<CartItem[], Error>({
        queryKey: ['cart'],
        queryFn: fetchCart,
        retry: 0,
    });
};

const useOrders = (params?: Record<string, string>): UseQueryResult<OrderItem[], Error> => {
    return useQuery<OrderItem[], Error>({
        queryKey: ['orders', params],
        queryFn: () => fetchOrders(params),
        staleTime: 60 * 1000,
        retry: 0,
    });
};

const useAddress = (params?: Record<string, string>): UseQueryResult<IAddress[] | IAddress, Error> => {
    return useQuery<IAddress[] | IAddress, Error>({
        queryKey: ['address', params],
        queryFn: () => fetchAddress(params),
        staleTime: 60 * 1000,
        retry: 0,
        refetchOnWindowFocus: true,
        refetchOnMount: true, 
    });
};

export { useProducts, useUser, useProduct, useWishlist, useCart, useOrders, useAddress, useHistory };
