import { fetchPosts, fetchWPCategories } from "@/lib/api";
import PaginatedBlogPostList from "../app/components/ui/PaginatedBlogPosts";
import Pagination from "../app/components/ui/Pagination";
import CategoriesList from "./components/ui/CategoriesList";
import { FullWidthHeader } from "./components/ui/FullWidthHeader";

export const revalidate = 60;

interface PageProps {
  params: Promise<{ slug?: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function HomePage({ params, searchParams }: PageProps) {
  // Await the dynamic APIs
  const [resolvedParams, resolvedSearchParams] = await Promise.all([
    params,
    searchParams,
  ]);

  // Safely extract page number
  const pageParam = Array.isArray(resolvedSearchParams.page)
    ? resolvedSearchParams.page[0]
    : resolvedSearchParams.page;
  const page = pageParam ? Number(pageParam) : 1;

  const { posts, totalPages } = await fetchPosts(page);
  const categories = await fetchWPCategories();

  // Find current category data if slug exists


  return (
    <div className="container mx-auto max-w-6xl">
      <FullWidthHeader
   
        categories={categories}
        currentCategory={resolvedParams?.slug}
        className="bg-gradient-to-r from-teal-50 to-blue-50"
      />
      <CategoriesList currentCategory={resolvedParams?.slug} />
      <PaginatedBlogPostList posts={posts} />
      <Pagination
        currentPage={page}
        totalPages={totalPages}
        basePath={
          resolvedParams?.slug ? `/category/${resolvedParams.slug}` : "/"
        }
      />
    </div>
  );
}
