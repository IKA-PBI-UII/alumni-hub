import type { CollectionConfig } from "payload";
import { revalidateTag } from "next/cache";
import { NEWS_CATEGORIES } from "../data/news";

/** Newsroom articles. Fields mirror the `Article` type in src/data/news.ts. */
export const Posts: CollectionConfig = {
  slug: "posts",
  admin: {
    useAsTitle: "title",
    defaultColumns: ["title", "category", "date", "_status"],
  },
  access: {
    // Public can read published posts only; logged-in editors see drafts too.
    read: ({ req }) => (req.user ? true : { _status: { equals: "published" } }),
  },
  versions: { drafts: true },
  hooks: {
    // Keep a plain-text copy of the rich text so /news search can match body content.
    beforeChange: [
      ({ data, originalDoc }) => ({
        ...data,
        searchText: lexicalToText(data.content ?? originalDoc?.content),
      }),
    ],
    // Refresh /news, article pages and the home page as soon as a post changes.
    afterChange: [() => revalidateNews()],
    afterDelete: [() => revalidateNews()],
  },
  defaultSort: "-date",
  fields: [
    { name: "title", type: "text", required: true },
    {
      name: "slug",
      type: "text",
      required: true,
      unique: true,
      index: true,
      admin: { position: "sidebar", description: "URL part, e.g. meet-the-new-team" },
    },
    {
      name: "category",
      type: "select",
      required: true,
      options: [...NEWS_CATEGORIES],
      admin: { position: "sidebar" },
    },
    {
      name: "date",
      type: "date",
      required: true,
      defaultValue: () => new Date().toISOString(),
      admin: { position: "sidebar", date: { pickerAppearance: "dayOnly" } },
    },
    { name: "author", type: "text", required: true, admin: { position: "sidebar" } },
    { name: "featured", type: "checkbox", admin: { position: "sidebar" } },
    { name: "image", type: "upload", relationTo: "media", required: true },
    { name: "excerpt", type: "textarea", required: true, maxLength: 300 },
    { name: "content", type: "richText", required: true },
    // Filled by the beforeChange hook above; never edited by hand.
    { name: "searchText", type: "textarea", admin: { hidden: true } },
  ],
};

/** Flattens Lexical JSON into plain text (all `text` leaves, space-separated). */
function lexicalToText(state: unknown): string {
  const parts: string[] = [];
  const walk = (node: unknown) => {
    if (!node || typeof node !== "object") return;
    const n = node as { text?: unknown; children?: unknown[] };
    if (typeof n.text === "string") parts.push(n.text);
    if (Array.isArray(n.children)) n.children.forEach(walk);
  };
  walk((state as { root?: unknown } | null)?.root);
  return parts.join(" ").replace(/\s+/g, " ").trim();
}

export function revalidateNews() {
  try {
    revalidateTag("news", { expire: 0 });
  } catch {
    // Outside a Next.js request (e.g. Payload CLI scripts) there is no cache to clear.
  }
}
