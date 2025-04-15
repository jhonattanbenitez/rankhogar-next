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
return categories.map((category: Category): { slug: string } => ({
    slug: category.slug,
}));
}

export default async function CategoryPage({
  params,
  searchParams,
}: {
  params: { slug: string };
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  // Safely extract page number
  const pageParam = Array.isArray(searchParams.page)
    ? searchParams.page[0]
    : searchParams.page;
  const page = pageParam ? parseInt(pageParam as string) : 1;

  // Fetch data
  const { posts, totalPages } = await fetchPosts(page, 6, params.slug);

  if (!posts || posts.length === 0) {
    return notFound();
  }

  return (
    <div className="container mx-auto max-w-6xl">
      <CategoriesList currentCategory={params.slug} />
      <PaginatedBlogPostList posts={posts} />
      <Pagination
        currentPage={page}
        totalPages={totalPages}
        basePath={`/category/${params.slug}`}
      />
    </div>
  );
}
