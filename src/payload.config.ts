import path from "node:path";
import { fileURLToPath } from "node:url";
import { buildConfig } from "payload";
import { postgresAdapter } from "@payloadcms/db-postgres";
import { lexicalEditor } from "@payloadcms/richtext-lexical";
import { s3Storage } from "@payloadcms/storage-s3";
import sharp from "sharp";
import { Users } from "./collections/Users";
import { Media } from "./collections/Media";
import { Posts } from "./collections/Posts";

const dirname = path.dirname(fileURLToPath(import.meta.url));

export default buildConfig({
  routes: { admin: "/cms" },
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
      importMapFile: path.resolve(dirname, "app/(payload)/cms/importMap.js"),
    },
    meta: { titleSuffix: " · IKA PBI UII CMS" },
  },
  collections: [Posts, Media, Users],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || "",
  typescript: { outputFile: path.resolve(dirname, "payload-types.ts") },
  db: postgresAdapter({
    pool: { connectionString: process.env.DATABASE_URL || "" },
  }),
  sharp,
  plugins: [
    // Cloudflare R2 (S3-compatible). Without S3_BUCKET, uploads fall back to the local /media folder.
    s3Storage({
      enabled: Boolean(process.env.S3_BUCKET),
      alwaysInsertFields: true,
      bucket: process.env.S3_BUCKET || "",
      collections: {
        // Files are served through this site at /api/media/file/<name>, not the public
        // r2.dev URL: r2.dev is blocked by Indonesian ISPs (Internet Positif). Once R2 has a
        // custom domain, set disablePayloadAccessControl + generateFileURL to serve from it.
        media: { prefix: "media" },
      },
      config: {
        endpoint: process.env.S3_ENDPOINT,
        region: "auto",
        forcePathStyle: true,
        credentials: {
          accessKeyId: process.env.S3_ACCESS_KEY_ID || "",
          secretAccessKey: process.env.S3_SECRET_ACCESS_KEY || "",
        },
      },
    }),
  ],
});
