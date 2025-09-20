"use server";
import { ProductType } from "@/types/product.type";

export default async function getProductDetails(productId: string): Promise<ProductType> {
  const res = await fetch(`${process.env.API_BASEURL}/products/${productId}`);

  if (!res.ok) throw new Error("Failed to fetch product details");

  return (await res.json()).data;
}