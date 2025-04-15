import { WPPost } from "../../types/post";
import { sanitizeHtml } from "@/lib/sanitizeHtml";
import Image from "next/image";
import Link from "next/link";

export default function PaginatedBlogPostList({ posts }: { posts: WPPost[] }) {
  return (
    <div className="grid grid-cols-1 gap-16 md:grid-cols-2 px-4">
      {posts?.map((post) => (
        <div key={post.id} className="break-words">
          <Link href={`/post/${post.slug}`}>
            <div className="aspect-[16/9] relative">
              {post._embedded?.["wp:featuredmedia"]?.[0]?.source_url && (
                <Image
                  src={post._embedded["wp:featuredmedia"][0].source_url}
                  alt={
                    post._embedded["wp:featuredmedia"][0].alt_text ||
                    "Blog post image"
                  }
                  fill
                  className="object-cover rounded-lg"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              )}
            </div>
            <h2
              className="text-xl font-bold"
              dangerouslySetInnerHTML={{
                __html: sanitizeHtml(post.title.rendered),
              }}
            />
            <div
              className="text-gray-700"
              dangerouslySetInnerHTML={{
                __html: sanitizeHtml(post.excerpt.rendered),
              }}
            />
          </Link>
        </div>
      ))}
    </div>
  );
}
