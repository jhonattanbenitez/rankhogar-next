import { WPPost } from "../app/types/post";

export async function fetchPosts(
  page = 1,
  perPage = 6,
  categorySlug?: string
): Promise<{ posts: WPPost[]; totalPages: number }> {
  try {
    let url = `${process.env.NEXT_PUBLIC_BLOG_BASE_URL}wp-json/wp/v2/posts?_embed=true&page=${page}&per_page=${perPage}`;

    if (categorySlug) {
      const category = await fetchCategoryBySlug(categorySlug);
      if (category) {
        url += `&categories=${category.id}`;
      }
    }

    const res = await fetch(url, { next: { revalidate: 60 } });

    if (!res.ok) {
      throw new Error(`Failed to fetch posts. Status: ${res.status}`);
    }

    const totalPages = parseInt(res.headers.get("x-wp-totalpages") ?? "1", 10);
    const posts = await res.json();

    return { posts, totalPages };
  } catch (error) {
    console.error("Error fetching posts:", error);
    throw new Error("Failed to fetch posts. Please try again later.");
  }
}

export async function fetchCategoryBySlug(slug: string) {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BLOG_BASE_URL}wp-json/wp/v2/categories?slug=${slug}`
    );

    if (!res.ok) {
      throw new Error(`Failed to fetch category. Status: ${res.status}`);
    }

    const categories = await res.json();
    return categories[0] ?? null;
  } catch (error) {
    console.error("Error fetching category:", error);
    return null;
  }
}

export async function fetchWPCategories() {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BLOG_BASE_URL}wp-json/wp/v2/categories?per_page=100&_fields=id,name,slug,count,description`,
      { next: { revalidate: 60 } }
    );

    if (!res.ok) {
      throw new Error(`Failed to fetch categories. Status: ${res.status}`);
    }

    return await res.json();
  } catch (error) {
    console.error("Error fetching categories:", error);
    return [];
  }
}


export async function fetchPostBySlug(slug: string): Promise<WPPost | null> {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BLOG_BASE_URL}/wp-json/wp/v2/posts?slug=${slug}&_embed=true`,
      { next: { revalidate: 60 } }
    );

    const data = await res.json();
    return data[0] ?? null;
  } catch (error) {
    console.error("Error fetching post:", error);
    return null;
  }
}

export async function fetchPageBySlug(slug: string) {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BLOG_BASE_URL}/wp-json/wp/v2/pages?slug=${slug}&_embed=true`,
      { next: { revalidate: 60 } }
    );

    if (!res.ok) {
      throw new Error(`Failed to fetch page. Status: ${res.status}`);
    }

    const pages = await res.json();
    return pages[0] ?? null;
  } catch (error) {
    console.error("Error fetching page:", error);
    return null;
  }
}

