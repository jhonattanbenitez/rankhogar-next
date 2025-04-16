
import { formatFullDate } from "@/lib/date";
import { WPPost } from "../../types/post";
import { sanitizeHtml } from "@/lib/sanitizeHtml";
import Image from "next/image";
import Link from "next/link";

export default function PaginatedBlogPostList({ posts }: { posts: WPPost[] }) {
  return (
    <div className="grid grid-cols-1 gap-8 md:grid-cols-2 px-4">
      {posts?.map((post) => (
        <div
          key={post.id}
          className="flex flex-col justify-between h-full rounded-lg border p-4 shadow-sm hover:shadow-md transition-shadow"
        >
          <Link href={`/post/${post.slug}`} className="flex flex-col h-full">
            <div className="relative aspect-[16/9] mb-4">
              {post._embedded?.["wp:featuredmedia"]?.[0]?.source_url && (
                <Image
                  src={post._embedded["wp:featuredmedia"][0].source_url}
                  alt={
                    post._embedded["wp:featuredmedia"][0].alt_text ||
                    post.title.rendered
                  }
                  fill
                  className="object-cover rounded-md"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              )}
            </div>

            <h2
              className="text-xl font-bold mb-2"
              dangerouslySetInnerHTML={{
                __html: sanitizeHtml(post.title.rendered),
              }}
            />

            <div
              className="text-gray-700 mb-4 flex-grow"
              dangerouslySetInnerHTML={{
                __html: sanitizeHtml(post.excerpt.rendered),
              }}
            />

            <div className="font-medium text-sm text-gray-600 mt-auto">
              Publicado el {formatFullDate(new Date(post.date))}
            </div>
          </Link>
        </div>
      ))}
    </div>
  );
}
