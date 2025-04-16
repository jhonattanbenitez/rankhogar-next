import { fetchPageBySlug } from "@/lib/api";
import parse from "html-react-parser";

export const revalidate = 60;

export default async function About() {
  const page = await fetchPageBySlug("about");

  if (!page) {
    return <div className="text-center mt-20">Page not found.</div>;
  }

  return (
    <div className="container mx-auto max-w-4xl px-4 py-10 prose lg:prose-xl">
      <h1 className="text-3xl font-bold mb-6 text-center">
        Acerca de nosotros
      </h1>
      <div className="min-h-[50vh]">{parse(page.content?.rendered ?? "")}</div>
    </div>
  );
}
