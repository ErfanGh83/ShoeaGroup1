import Api from "./base";

export async function getCategories() {
  const res = await Api.get("/categories");
  return res.data;
}
export async function getCategoryByID(id: string) {
  const res = await Api.get("/categories/" + id);
  return res.data;
}

export async function getProducts(params?: { categoryId?: string }) {
  return (
    await Api.get("/products", {
      params,
    })
  ).data;
}
export async function getProductByID(id: string) {
  const res = await Api.get("/products/" + id);
  return res.data;
}
