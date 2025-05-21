// components/ui/PostContent.tsx
"use client";

import React, { useEffect, useState } from "react";
import { clientSanitize } from "@/lib/clientSanitize";

interface PostContentProps {
  content: string;
}

export default function PostContent({ content }: PostContentProps) {
  const [sanitizedContent, setSanitizedContent] = useState("");

  useEffect(() => {
    setSanitizedContent(clientSanitize(content));
  }, [content]);

  return (
    <div
      className="[&>p]:my-6 
                 [&>h2]:text-2xl [&>h2]:font-bold [&>h2]:mt-12 [&>h2]:mb-6
                 [&>h3]:text-xl [&>h3]:font-semibold [&>h3]:mt-10 [&>h3]:mb-4
                 [&>h4]:text-lg [&>h4]:font-semibold [&>h4]:mt-8 [&>h4]:mb-4
                 [&>ul]:list-disc [&>ul]:pl-6 [&>ul]:my-4
                 [&>ol]:list-decimal [&&>ol]:pl-6 [&>ol]:my-4
                 [&>blockquote]:border-l-4 [&>blockquote]:border-gray-300 [&>blockquote]:pl-4 [&>blockquote]:py-2 [&>blockquote]:my-6
                 [&>figure]:my-8
                 [&>img]:rounded-lg [&>img]:my-6
                 [&_table]:w-full [&_table]:border-collapse [&_table]:my-6
                 [&_th]:border [&_th]:border-gray-300 [&_th]:bg-gray-100 [&_th]:p-2 [&_th]:text-left
                 [&_td]:border [&_td]:border-gray-300 [&_td]:p-2
                 [&_figure.wp-block-table]:overflow-x-auto
                 "
      dangerouslySetInnerHTML={{ __html: sanitizedContent }}
    />
  );
}
