import { fetchWPCategories } from "@/lib/api";
import Link from "next/link";
import { Metadata } from "next";
import { WPCategory } from "@/app/types/category";
import Image from "next/image";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Categorías del Blog – RankHogar",
  description:
    "Explora todas las categorías del blog de RankHogar y encuentra artículos útiles por tema.",
};

export default async function CategoriesPage() {
  const categories: WPCategory[] = await fetchWPCategories();

  return (
    <div className="container mx-auto max-w-4xl px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Categorías del Blog</h1>
      <Image
  src="/category.png"
  alt="Categorías del blog RankHogar"
  width={1200}
  height={630}
  className="rounded-lg w-full h-auto mb-8"
/>
      <ul className="space-y-4">
        {categories.map((category) => (
          <li key={category.slug} className="border-b pb-4">
            <Link
              href={`/category/${category.slug}`}
              className="text-xl text-blue-600 hover:underline"
            >
              {category.name}
            </Link>
            {category.description && (
              <p className="text-gray-600 mt-1">{category.description}</p>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
