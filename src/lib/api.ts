import { WPPost } from "../app/types/post";

export async function fetchPosts(): Promise<WPPost[]> {
  const res = await fetch(process.env.NEXT_PUBLIC_BLOG_CMS_URL as string);

  if (!res.ok) {
    throw new Error("Failed to fetch posts");
  }

  return res.json();
}
