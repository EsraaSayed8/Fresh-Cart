"use server";
import { ProductType } from "@/types/product.type";

export default async function getRelatedProducts(productId: string, categoryId: string): Promise<ProductType[]> {
  const res = await fetch(
    `${process.env.API_BASEURL}/products?limit=5&category=${categoryId}`
  );

  if (!res.ok) throw new Error("Failed to fetch related products");

  const { data: products }: { data: ProductType[] } = await res.json()
  return products.filter((product) => product._id !== productId);
}