import { fetchPosts } from "@/lib/api";
import PaginatedBlogPostList from "../app/components/ui/PaginatedBlogPosts";
import Pagination from "../app/components/ui/Pagination";
import CategoriesList from "./components/ui/CategoriesList";

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

  return (
    <div className="container mx-auto max-w-6xl">
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
