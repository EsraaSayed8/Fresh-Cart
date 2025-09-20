import { BrandType } from "./brand.type";
import { CategoryType } from "./category.type";
import { SubcategoryType } from "./subcategory.type";

export interface ProductType {
  sold: number
  images: string[]
  subcategory: SubcategoryType[]
  ratingsQuantity: number
  title: string
  slug: string
  description: string
  quantity: number
  price: number
  imageCover: string
  category: CategoryType
  brand: BrandType
  ratingsAverage: number
  createdAt: string
  updatedAt: string
  __v: number
  _id: string
}
