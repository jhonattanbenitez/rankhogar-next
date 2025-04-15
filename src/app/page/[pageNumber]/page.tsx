import { fetchPosts } from "@/lib/api";
import PaginatedBlogPostList from "../../components/ui/PaginatedBlogPosts";
import Pagination from "../../components/ui/Pagination";

export const revalidate = 60;

export async function generateStaticParams() {
  const { totalPages } = await fetchPosts();
  return Array.from({ length: totalPages }, (_, i) => ({
    pageNumber: (i + 1).toString(),
  }));
}

export default async function PaginatedPage({
  params,
}: {
  params: Promise<{ pageNumber: string }>;
}) {
  const resolvedParams = await params;
  const page = parseInt(resolvedParams.pageNumber, 10);

  const { posts, totalPages } = await fetchPosts(page);

  return (
    <div className="container mx-auto max-w-6xl">
      <PaginatedBlogPostList posts={posts} />
      <Pagination currentPage={page} totalPages={totalPages} />
    </div>
  );
}
