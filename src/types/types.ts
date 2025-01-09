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

interface OrderItem {
  userId: number;
  status: string;
  name: string;
  productId: number;
  count: number;
  color: string;
  size: number;
  images: string[];
  price: number;
  total_price: number;
  shippingType: string;
  address: string;
}

interface CartItem {
  name: string;
  count: number;
  price: number;
  total_price: number;
  color: string;
  size: number;
  images: string[];
  productId: number;
}

interface CartData {
  productId: number;
  color: string;
  size: number;
  count: number;
}

interface IAddress {
  name: string;
  address: string;
}

interface SelectAddressParam {
  name: string
}


interface CartItemState {
  item: CartItem[];
  totalPrice: number;
}
interface DeleteModalProps {
  item: {
    id: string;
    title: string;
    price: number;
    images: string;
    selectedColor: string;
    selectedSize: string;
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

export type { Product, CartItem, CartData, User, CartItemState, DeleteModalProps, IAddress, SelectAddressParam, OrderItem };
