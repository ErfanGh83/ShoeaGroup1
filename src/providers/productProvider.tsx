import React, { createContext, useContext, ReactNode } from "react";
import { Product } from "../types/types";

const ProductContext = createContext<Product | null>(null);

export const useProductContext = () => {
  const context = useContext(ProductContext);

  if (!context) {
    throw new Error("useProductContext must be used within a ProductProvider");
  }

  return context;
};

interface ProductProviderProps {
  children: ReactNode;
  product: Product;
}

export const ProductProvider = ({ children, product }: ProductProviderProps) => {
  return (
    <ProductContext.Provider value={product}>
      {children}
    </ProductContext.Provider>
  );
};

