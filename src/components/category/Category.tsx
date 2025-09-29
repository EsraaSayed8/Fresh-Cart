import { CategoryType } from "@/types/category.type";
import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import { SubcategoryType } from "@/types/subcategory.type";
import { ResponseDataType } from "@/types/responseData.type";
import { toast } from "sonner";
import Link from "next/link";

export default async function Category({
  category,
}: {
  category: CategoryType;
}) {
  let subCategories: SubcategoryType[] = [];
  try {
    const subCategoriesRes = await fetch(
      `${process.env.API_BASEURL}/categories/${category._id}/subcategories`
    );

    if (!subCategoriesRes.ok)
      throw new Error("Faild to load category information!");

    const payload: ResponseDataType<SubcategoryType> =
      await subCategoriesRes.json();

    subCategories = payload.data;
  } catch (err) {
    if (err instanceof Error) {
      toast.error(err.message, {
        position: "bottom-right",
        duration: 2000,
      });
    }
  }

  return (
    <div className="w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5 p-2 lg:p-4">
      <Link href={`/categories/${category._id}`}>
        <Card className="flex flex-col gap-2 p-3 aspect-[2/4] rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 bg-white">
          <CardHeader className="flex flex-col items-center px-0">
            <CardTitle className="w-full">
              <Image
                src={category.image}
                alt="Category Image"
                width={500}
                height={500}
                className="object-cover w-full h-40 lg:h-48 rounded-xl mb-2"
              />
            </CardTitle>
            <CardDescription className="text-emerald-600 font-semibold text-sm lg:text-lg text-center truncate">
              {category.name}
            </CardDescription>
          </CardHeader>

          <CardContent className="px-0">
            {subCategories.length > 0 && (
              <p className="text-gray-600 text-xs lg:text-sm text-center line-clamp-2">
                {subCategories
                  .map((subCategory: SubcategoryType) => subCategory.name)
                  .join(" | ")}
              </p>
            )}
          </CardContent>
        </Card>
      </Link>
    </div>
  );
}
