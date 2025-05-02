import { fetchPostBySlug, fetchWPCategories } from "@/lib/api";
import { notFound } from "next/navigation";
import PostContent from "../../components/ui/PostContent";
import { formatFullDate } from "@/lib/date";
import Image from "next/image";
import { FullWidthHeader } from "@/app/components/ui/FullWidthHeader";
import { WPCategory } from "../../types/category";
import { Metadata } from "next";

export const revalidate = 60;

interface PageProps {
  params: Promise<{ slug: string }>;
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const resolvedParams = await params;
  const { slug } = resolvedParams;

  const post = await fetchPostBySlug(slug);
  if (!post) return {};

  return {
    title: post.title?.rendered || "Artículo",
    description: post.excerpt?.rendered.replace(/<[^>]+>/g, "") || "",
    openGraph: {
      title: post.title?.rendered,
      description: post.excerpt?.rendered.replace(/<[^>]+>/g, ""),
      type: "article",
      images: [
        {
          url:
            post._embedded?.["wp:featuredmedia"]?.[0]?.source_url ??
            "/default-og-image.jpg",
        },
      ],
    },
  };
}

export default async function SinglePostPage({ params }: PageProps) {
  const resolvedParams = await params;
  const { slug } = resolvedParams;

  const [post, categories] = await Promise.all([
    fetchPostBySlug(slug),
    fetchWPCategories(),
  ]);

  if (!post) {
    console.error("Post not found for slug:", slug);
    return notFound();
  }

  const primaryCategory = categories.find((cat: WPCategory) =>
    post.categories?.includes(cat.id)
  );

  return (
    <div className="container mx-auto max-w-4xl px-4 py-8">
      <FullWidthHeader
        categories={categories}
        currentCategory={primaryCategory?.slug}
        className="bg-gradient-to-r from-teal-50 to-blue-50"
      />

      <article className="prose lg:prose-xl mx-auto">
        <div className="text-gray-600 mb-4">
          Publicado el {formatFullDate(new Date(post.date))}
          {primaryCategory && (
            <span className="ml-2">
              • Categoría:{" "}
              <span className="font-medium">{primaryCategory.name}</span>
            </span>
          )}
        </div>

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
