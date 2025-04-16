export type WPPost = {
  id: number;
  date: string;
  slug: string;
  categories?: number[];
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
