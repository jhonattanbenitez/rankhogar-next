// app/category/[slug]/page.tsx
import { fetchPosts, fetchWPCategories } from "@/lib/api";
import PaginatedBlogPostList from "../../components/ui/PaginatedBlogPosts";
import Pagination from "../../components/ui/Pagination";
import CategoriesList from "../../components/ui/CategoriesList";
import { notFound } from "next/navigation";

export const revalidate = 60;

interface Category {
  id: number;
  name: string;
  slug: string;
  count: number;
  description?: string;
}

export async function generateStaticParams() {
  const categories = await fetchWPCategories();
  return categories.map((category: Category) => ({
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

  // Fetch data with resolved slug
  const { posts, totalPages } = await fetchPosts(page, 6, resolvedParams.slug);

  if (!posts || posts.length === 0) {
    return notFound();
  }

  return (
    <div className="container mx-auto max-w-6xl">
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
