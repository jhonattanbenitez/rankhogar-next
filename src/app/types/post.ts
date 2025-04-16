export type WPPost = {
  id: number;
  date: string;
  slug: string;
  excerpt: {
    rendered: string;
  };
  title: {
    rendered: string;
  };
  content: {
    rendered: string;
  };
  _embedded?: {
    "wp:featuredmedia"?: Array<{
      source_url: string;
      alt_text: string;
    }>;
  };
};
