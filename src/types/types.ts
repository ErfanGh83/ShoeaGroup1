interface Product {
  id: number;
  name: string;
  price: number;
  sold_quantity: number;
  view_count: number;
  rating: number;
  description: string;
  is_popular: boolean;
  order: number;
  sizes: number[];
  colors: string[];
  brand: {
    id: number;
    name: string;
    icon: string;
  };
  images: string[];
  isFavorite: boolean;
}

interface CartItem {
  id: string;
  quantity: number;
  color?: string;
  size?: number;
}
interface CartState {
  item: CartItem[];
  totalAmount: number;
}

interface User {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  password: string;
  username: string;
}

export type { Product, CartItem, User, CartState };
