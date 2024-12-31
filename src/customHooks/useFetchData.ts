import { useQuery, UseQueryResult, useMutation, UseMutationResult } from "@tanstack/react-query";
import axios from "axios";
import { Product, User } from "../types/types";
import { useState } from "react";
import { toast } from "react-toastify";
import { CartItem } from "../types/types";

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

const useUpdateCart = (userId: string | null): UseMutationResult<User, Error, CartItem[]> => {
    const mutationFn = async (updatedCart: CartItem[]): Promise<User> => {
      if (!userId) {
        throw new Error("User ID is required to update the cart");
      }
  
      const storedUser = localStorage.getItem("user");
      const user = storedUser ? JSON.parse(storedUser) : null;
  
      if (!user) {
        throw new Error("User not found");
      }
  
      const updatedUser = {
        ...user,
        cart: updatedCart,
      };

      const response = await api.put<User>(`/users/${userId}`, updatedUser);
      return response.data;
    };
  
    return useMutation<User, Error, CartItem[]>({
      mutationFn,
      onSuccess: (data) => {
        console.log("Cart updated successfully:", data.cart);
      },
      onError: (error) => {
        console.error("Failed to update cart:", error.message);
      },
    });
  };
  

interface UseUserInfoProps {
    id: string | undefined;
    product: Product | null;
}

const useUserInfo = ({ id, product }: UseUserInfoProps) => {
    const [user, setUser] = useState<User | null>(null);
    const [quantity, setQuantity] = useState(0);
    const [isWished, setIsWished] = useState(false);
    const [selectedColor, setSelectedColor] = useState<string | null>(null);
    const [selectedSize, setSelectedSize] = useState<number | null>(null);

    const userInfoMutation = useMutation({
        mutationFn: (userId: number) =>
            axios.get(`${baseUrl}/users/${userId}`).then((res) => res.data),
        onSuccess: (data: User) => {
            console.log(data)
            if (!id || !product) {
                console.warn("Invalid product ID or product not loaded.");
                return;
            }

            setUser(data);
            console.log(data)
            const cartItem = data.cart.find((item) => item.id === id);
            setQuantity(cartItem ? cartItem.quantity : 0);

            const isInWishlist = data.wishlist.some((item) => item.id === id);
            setIsWished(isInWishlist);

            const prodExist = data.cart.some((item) => item.id === id);
            let defaultColor = product.color?.[0] || null;
            let defaultSize = product.size?.[0] || null;
            if (prodExist) {
                for (let i = 0; i < data.cart.length; i++) {
                    if (data.cart[i].id === id) {
                        defaultColor = data.cart[i].color || null;
                        defaultSize = data.cart[i].size || null;
                    }
                }
            }
            setSelectedColor(defaultColor);
            setSelectedSize(defaultSize);
        },
        onError: (error) => {
            toast.error("Failed to fetch user information.");
            console.error("Failed to fetch user information:", error);
        },
    });

    return {
        user,
        quantity,
        isWished,
        selectedColor,
        selectedSize,
        setSelectedColor,
        setSelectedSize,
        setQuantity,
        userInfoMutation,
    };

    
};

const useWishlist = (userId: number | null) => {
  const [isWished, setIsWished] = useState(false);

  const toggleWishlist = (productId: string) => {
    if (!userId) {
      toast.warn("Please login first!");
      return;
    }

    const storedUser = localStorage.getItem("user");
    const user = storedUser ? JSON.parse(storedUser) : null;

    if (!user) {
      toast.warn("User not found.");
      return;
    }

    const updatedWishlist = [...user.wishlist];

    const productIndex = updatedWishlist.findIndex((item) => item.id === productId);

    if (productIndex !== -1) {
      updatedWishlist.splice(productIndex, 1);
      setIsWished(false);
      toast.success("Removed from wishlist!");
    } else {
      updatedWishlist.push({ id: productId });
      setIsWished(true);
      toast.success("Added to wishlist!");
    }

    localStorage.setItem(
      "user",
      JSON.stringify({
        ...user,
        wishlist: updatedWishlist,
      })
    );
  };

  return {
    isWished,
    toggleWishlist,
  };
};

export default useWishlist;


export { useProducts, useUser, useProduct, useUpdateCart, useUserInfo, useWishlist };

