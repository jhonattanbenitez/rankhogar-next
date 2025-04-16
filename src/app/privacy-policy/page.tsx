import { fetchPageBySlug } from "@/lib/api";
import parse from "html-react-parser";

export const revalidate = 60;

export default async function PrivacyPolicyPage() {
  const page = await fetchPageBySlug("privacy-policy");

  if (!page) {
    return (
      <div className="text-center mt-20">Política de privacidad no encontrada</div>
    );
  }

  return (
    <div className="container mx-auto prose max-w-6xl px-4 py-10">
      <h1 className="text-3xl font-bold mb-6">
        {typeof page.title === "object" ? page.title.rendered : page.title}
      </h1>
      <div>{parse(page.content?.rendered ?? "")}</div>
    </div>
  );
}
