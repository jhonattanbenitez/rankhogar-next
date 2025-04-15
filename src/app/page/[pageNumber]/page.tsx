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

export default async function PaginatedPage(props: {
  params: { pageNumber: string };
}) {
  // Explicitly await the resolution of params
  const { params } = props;
  const pageNumber = params.pageNumber;
  const page = parseInt(pageNumber, 10);

  const { posts, totalPages } = await fetchPosts(page);

  return (
    <div className="space-y-12">
      <PaginatedBlogPostList posts={posts} />
      <Pagination currentPage={page} totalPages={totalPages} />
    </div>
  );
}
