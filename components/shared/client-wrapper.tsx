'use client';

import { Filters } from "@/shared/components/shared";
import { ProductsGroupList } from "@/shared/components/shared/products-group-list";

interface Props {
  categories: any[]; // Замените any на правильный тип из вашей базы данных
}

export function ClientWrapper({ categories }: Props) {
  return (
    <div className="flex gap-[80px]">
      {/* Фильтрация */}
      <div className="w-[250px]">
        <Filters />
      </div>

      {/* Список товаров */}
      <div className="flex-1">
        <div className="flex flex-col gap-16">
          {categories.map((category) => (
            category.products.length > 0 && (
              <ProductsGroupList
                key={category.id}
                title={category.name}
                categoryId={category.id}
                items={category.products}
              />
            )
          ))}
        </div>
      </div>
    </div>
  );
} 