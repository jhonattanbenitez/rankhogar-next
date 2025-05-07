import { fetchPosts } from "../../lib/api";

export async function GET() {
  const baseUrl = "https://rankhogar.com.co";
  
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const allPosts: any[] = [];

  const perPage = 100;
  const { posts, totalPages } = await fetchPosts(1, perPage);
  allPosts.push(...posts);

  for (let page = 2; page <= totalPages; page++) {
    const res = await fetchPosts(page, perPage);
    allPosts.push(...res.posts);
  }

  const staticRoutes = ["", "/about", "/privacy-policy"];

  const urls = [
    ...staticRoutes.map((route) => ({
      loc: `${baseUrl}${route}`,
      lastmod: new Date().toISOString(),
    })),
    ...allPosts.map((post) => ({
      loc: `${baseUrl}/post/${post.slug}`,
      lastmod: new Date(post.modified).toISOString(),
    })),
  ];

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
  <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    ${urls
      .map(
        (url) => `
      <url>
        <loc>${url.loc}</loc>
        <lastmod>${url.lastmod}</lastmod>
      </url>`
      )
      .join("")}
  </urlset>`.trim();

  return new Response(sitemap, {
    headers: {
      "Content-Type": "application/xml",
    },
  });
}
