import {
  getProducts,
  getCategoryByID,
  getProductByID,
  getCategories,
} from "./api";
import {
  useQuery,
} from "@tanstack/react-query";

export function useProducts(params?: { categoryId: string }) {
  return useQuery({
    queryKey: ["products", params],
    queryFn: () => getProducts(params),
  });
}
export function useCategoriesQuery() {
  return useQuery({
    queryKey: ["categories"],
    queryFn: getCategories,
  });
}
export function useCategory(categoryID: string) {
  return useQuery({
    queryKey: ["categories", categoryID],
    queryFn: () => getCategoryByID(categoryID),
  });
}

export function useProduct(productID: string) {
  return useQuery({
    queryKey: ["products", productID],
    queryFn: () => getProductByID(productID),
  });
}
