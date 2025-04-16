// app/category/[slug]/page.tsx
import { fetchPosts, fetchWPCategories } from "@/lib/api";
import PaginatedBlogPostList from "../../components/ui/PaginatedBlogPosts";
import Pagination from "../../components/ui/Pagination";
import CategoriesList from "../../components/ui/CategoriesList";
import { FullWidthHeader } from "../../components/ui/FullWidthHeader";
import { notFound } from "next/navigation";
import { WPCategory } from "@/app/types/category";

export const revalidate = 60;

export async function generateStaticParams() {
  const categories = await fetchWPCategories();
  return categories.map((category: WPCategory) => ({
    slug: category.slug,
  }));
}

interface PageProps {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function CategoryPage({
  params,
  searchParams,
}: PageProps) {
  // Await the dynamic APIs first
  const [resolvedParams, resolvedSearchParams] = await Promise.all([
    params,
    searchParams,
  ]);

  // Safely extract page number
  const pageParam = Array.isArray(resolvedSearchParams.page)
    ? resolvedSearchParams.page[0]
    : resolvedSearchParams.page;
  const page = pageParam ? Number(pageParam) : 1;

  // Fetch all needed data
  const [{ posts, totalPages }, categories] = await Promise.all([
    fetchPosts(page, 6, resolvedParams.slug),
    fetchWPCategories(),
  ]);

  if (!posts || posts.length === 0) {
    return notFound();
  }

  // Find current category data


  return (
    <div className="container mx-auto max-w-6xl">
      <FullWidthHeader

        categories={categories}
        currentCategory={resolvedParams.slug}
        className="bg-gradient-to-r from-teal-50 to-blue-50"
      />
      <CategoriesList currentCategory={resolvedParams.slug} />
      <PaginatedBlogPostList posts={posts} />
      <Pagination
        currentPage={page}
        totalPages={totalPages}
        basePath={`/category/${resolvedParams.slug}`}
      />
    </div>
  );
}
