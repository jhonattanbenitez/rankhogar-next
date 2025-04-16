// app/post/[slug]/page.tsx
import { fetchPostBySlug } from "@/lib/api";
import { notFound } from "next/navigation";
import PostContent from "../../components/ui/PostContent";
import { formatFullDate } from "@/lib/date";
import Image from "next/image";

export const revalidate = 60;

export default async function SinglePostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  // First await the params promise
  const { slug } = await params;

  const post = await fetchPostBySlug(slug);

  if (!post) {
    console.error("Post not found for slug:", slug);
    return notFound();
  }

  return (
    <div className="container mx-auto max-w-4xl px-4 py-8">
      <article className="prose lg:prose-xl mx-auto">
        <header className="mb-12">
          <h1 className="text-3xl md:text-4xl font-bold">
            {typeof post.title === "object" ? post.title.rendered : post.title}
          </h1>
          <div className="text-gray-600 mt-2">
            Publicado el {formatFullDate(new Date(post.date))}
          </div>
        </header>

        {post._embedded?.["wp:featuredmedia"]?.[0]?.source_url && (
          <div className="relative aspect-[16/9] mb-8">
            <Image
              src={post._embedded["wp:featuredmedia"][0].source_url}
              alt={post._embedded["wp:featuredmedia"][0].alt_text || ""}
              fill
              className="object-cover rounded-lg"
              priority
            />
          </div>
        )}

        <PostContent
          content={
            typeof post.content === "object"
              ? post.content.rendered
              : post.content
          }
        />
      </article>
    </div>
  );
}
