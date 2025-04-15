import { fetchPosts } from "@/lib/api";
import PaginatedBlogPostList from "../app/components/ui/PaginatedBlogPosts";
import Pagination from "../app/components/ui/Pagination";

export const revalidate = 60;

export default async function HomePage() {
  const { posts, totalPages } = await fetchPosts(1);

  return (
    <div className="container mx-auto max-w-6xl">
      <PaginatedBlogPostList posts={posts} />
      <Pagination currentPage={1} totalPages={totalPages} />
    </div>
  );
}
