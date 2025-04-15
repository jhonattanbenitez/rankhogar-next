import { WPPost } from "../app/types/post";

export async function fetchPosts(
  page = 1,
  perPage = 6
): Promise<{ posts: WPPost[]; totalPages: number }> {
  const url = `${process.env.NEXT_PUBLIC_BLOG_BASE_URL}wp-json/wp/v2/posts?_embed=true&page=${page}&per_page=${perPage}`;

  const res = await fetch(url);

  if (!res.ok) {
    throw new Error("Failed to fetch posts");
  }

  const totalPages = parseInt(res.headers.get("x-wp-totalpages") ?? "1", 10);
  const posts = await res.json();

  return { posts, totalPages };
}
