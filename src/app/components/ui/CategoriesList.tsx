// components/blog/CategoriesList.tsx
import Link from "next/link";
import { fetchWPCategories } from "@/lib/api";

export default async function CategoriesList({
  currentCategory,
}: {
  currentCategory?: string;
}) {
  try {
    const categories = await fetchWPCategories();

    interface Category {
      id: number;
      name: string;
      slug: string;
      count: number;
      description?: string;
    }

    const activeCategories: Category[] = categories.filter(
      (category: Category) => category.count > 0
    );

    // Find the current category for title/description
    const currentCategoryData = currentCategory
      ? activeCategories.find((cat) => cat.slug === currentCategory)
      : null;

    return (
      <div className="bg-white p-6 rounded-lg shadow">
        {/* Dynamic title and description */}
        <h2 className="text-2xl font-bold mb-6">
          {currentCategoryData?.name || "Positively Artificial"}
        </h2>
        <p className="text-gray-600 mb-6">
          {currentCategoryData?.description ||
            "Stay informed on the latest in AI technology with our focus on uplifting and positive stories. Learn about the advancements and innovations in artificial intelligence that are driving progress and making the world a better place."}
        </p>

        {/* Categories menu with "All" option */}
        <div className="flex flex-wrap gap-4">
          <Link
            href="/"
            className={`text-sm font-medium hover:text-blue-600 transition-colors ${
              !currentCategory ? "text-blue-600 font-bold" : ""
            }`}
          >
            All
          </Link>
          {activeCategories.map((category) => (
            <Link
              key={category.id}
              href={`/category/${category.slug}`}
              className={`text-sm font-medium hover:text-blue-600 transition-colors ${
                currentCategory === category.slug
                  ? "text-blue-600 font-bold"
                  : ""
              }`}
            >
              {category.name}
            </Link>
          ))}
        </div>
      </div>
    );
  } catch (error) {
    console.error("Error loading categories:", error);
    return (
      <div className="bg-white p-6 rounded-lg shadow text-red-500">
        Error loading categories
      </div>
    );
  }
}
