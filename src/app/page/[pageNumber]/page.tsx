import { fetchPosts } from "@/lib/api";
import PaginatedBlogPostList from "../../components/ui/PaginatedBlogPosts";
import Pagination from "../../components/ui/Pagination";
import CategoriesList from "../../components/ui/CategoriesList";

export const revalidate = 60;

interface PageProps {
  params: { slug?: string };
  searchParams: { [key: string]: string | string[] | undefined };
}

export default async function HomePage({ params, searchParams }: PageProps) {
  const page = searchParams.page ? Number(searchParams.page) : 1;
  const { posts, totalPages } = await fetchPosts(page);

  return (
    <div className="container mx-auto max-w-6xl">
      <CategoriesList currentCategory={params?.slug} />
      <PaginatedBlogPostList posts={posts} />
      <Pagination
        currentPage={page}
        totalPages={totalPages}
      />
    </div>
  );
}
