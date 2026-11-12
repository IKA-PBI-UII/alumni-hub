import type { CollectionConfig } from "payload";

/** CMS editors (separate from alumni accounts). */
export const Users: CollectionConfig = {
  slug: "users",
  admin: { useAsTitle: "email" },
  auth: true,
  fields: [{ name: "name", type: "text" }],
};
