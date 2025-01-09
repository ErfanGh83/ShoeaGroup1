interface Product {
  id: string;
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
  productId: string;
  name?: string;
  brand?: string;
  images?: string;
  price?: number;
  count?: number;
  color?: string;
  size?: number;
}

export interface DiscountType {
  code: string;
  discount: number;
}

interface CartItemState {
  item: CartItem[];
  totalPrice: number;
}
interface DeleteModalProps {
  item: {
    productId: string;
    name: string;
    price: number;
    images: string;
    color: string;
    size: string;
  };
  isOpen: boolean;
  onClose: () => void;
  onDelete: (id: string) => void;
}
interface User {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  password: string;
  username: string;
}

export type { Product, CartItem, User, CartItemState, DeleteModalProps };
