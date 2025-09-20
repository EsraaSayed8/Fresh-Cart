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
    <div className='w-1/2 md:w-1/3 lg:w-1/4 xl:1/5'>
      <div className='p-2 lg:p-4'>
        <Link href={`/categories/${category._id}`}>
          <Card className='gap-1 p-2'>
            <CardHeader className='px-2!'>
              <CardTitle>
                <Image
                  src={category.image}
                  alt='Category Image'
                  width={500}
                  height={500}
                  className='object-contain w-full'
                />
              </CardTitle>
              <CardDescription className='text-emerald-500 font-semibold text-sm lg:text-lg line-clamp-1'>
                {category.name}
              </CardDescription>
            </CardHeader>
            <CardContent className='px-2!'>
              {subCategories.length > 0 ? (
                <p className='line-clamp-2 lg:line-clamp-2 text-sm lg:text-lg text-gray-600'>
                  {subCategories
                    .map((subCategory: SubcategoryType) => subCategory.name)
                    .join(" | ")}
                </p>
              ) : (
                ""
              )}
            </CardContent>
          </Card>
        </Link>
      </div>
    </div>
  );
}
