"use client";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { cn } from "@/lib/utils";
import React from "react";
import { usePathname } from "next/navigation";
import { WPCategory } from "../../types/category";

interface BreadcrumbProps {
  label: string;
  href: string;
}

export const CategoryBreadcrumb: React.FC<{
  categories: WPCategory[];
  currentCategory?: string;
  className?: string;
}> = ({ categories, currentCategory, className }) => {
  const pathname = usePathname();
  const isCategoryPage = pathname.startsWith("/category/");

  // Build breadcrumb items
  const breadcrumbItems: BreadcrumbProps[] = [{ label: "Inicio", href: "/" }];

  if (isCategoryPage && currentCategory) {
    const category = categories.find((cat) => cat.slug === currentCategory);
    if (category) {
      breadcrumbItems.push({
        label: category.name,
        href: `/category/${category.slug}`,
      });
    }
  }

  return (
    <Breadcrumb className={cn("mt-8 text-inherit", className)}>
      <BreadcrumbList className="text-inherit">
        {breadcrumbItems.map((crumb, index) => (
          <React.Fragment key={index}>
            <BreadcrumbItem className="text-inherit">
              {/* Always make "Inicio" clickable, even if it's the only item */}
              {index === breadcrumbItems.length - 1 && index !== 0 ? (
                <BreadcrumbPage className="text-inherit line-clamp-1">
                  {crumb.label}
                </BreadcrumbPage>
              ) : (
                <BreadcrumbLink
                  className="text-inherit opacity-60 line-clamp-1 hover:opacity-100 transition-opacity"
                  href={crumb.href}
                >
                  {crumb.label}
                </BreadcrumbLink>
              )}
            </BreadcrumbItem>
            {index < breadcrumbItems.length - 1 && <BreadcrumbSeparator />}
          </React.Fragment>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
};

export const FullWidthHeader: React.FC<{
  categories?: WPCategory[];
  currentCategory?: string;
  className?: string;
}> = ({ categories, currentCategory, className }) => {
  return (
    <div className={cn("mt-4 pb-4 lg:pb-8 pt-4 rounded-2xl", className)}>
      <div className="container mx-auto px-4 max-w-6xl">
        {categories && (
          <CategoryBreadcrumb
            categories={categories}
            currentCategory={currentCategory}
          />
        )}
      </div>
    </div>
  );
};
