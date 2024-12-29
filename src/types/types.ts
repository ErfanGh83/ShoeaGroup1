interface Product {
    id: string;
    title: string;
    price: number;
    order: number;
    size: number[];
    color: string[];
    brand: string;
    images: string;
}

interface CartItem {
    id: string;
    quantity: number;
    color?: string;
    size?: number;
}

interface WishlistItem {
    id: string;
}

interface User {
    id: string;
    firstName: string;
    lastName: string;
    username: string;
    email: string;
    password: string;
    phoneNumber: string;
    gender: string;
    confirmPassword: string;
    cart: CartItem[];
    orders: [];
    wishlist: WishlistItem[];
    locations: [];
    defaultLocation: string;
    defaultShipping: string;
}

export type { Product, User, CartItem, WishlistItem };