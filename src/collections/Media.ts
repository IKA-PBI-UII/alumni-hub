import type { CollectionConfig } from "payload";
import { revalidateNews } from "./Posts";

export const Media: CollectionConfig = {
  slug: "media",
  access: { read: () => true },
  // A replaced image or edited alt text should show on /news right away.
  hooks: { afterChange: [() => revalidateNews()], afterDelete: [() => revalidateNews()] },
  fields: [{ name: "alt", type: "text", required: true }],
  upload: {
    mimeTypes: ["image/*"],
    imageSizes: [{ name: "card", width: 800 }],
  },
};
