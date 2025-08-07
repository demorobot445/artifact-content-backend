import path from "path";

import { mongooseAdapter } from "@payloadcms/db-mongodb";
import { webpackBundler } from "@payloadcms/bundler-webpack";
import { slateEditor } from "@payloadcms/richtext-slate";
import seoPlugin from "@payloadcms/plugin-seo";
import { buildConfig } from "payload/config";

import Users from "./collections/Users";
import Media from "./collections/Media";

export default buildConfig({
  admin: {
    user: Users.slug,
    bundler: webpackBundler(),
  },
  editor: slateEditor({}),
  collections: [Users, Media],
  globals: [],
  typescript: {
    outputFile: path.resolve(__dirname, "payload-types.ts"),
  },
  cors: [process.env.FRONTEND_URI],
  graphQL: {
    schemaOutputFile: path.resolve(__dirname, "generated-schema.graphql"),
  },
  plugins: [
    seoPlugin({
      collections: ["products"],
      uploadsCollection: "media",
    }),
  ],
  db: mongooseAdapter({
    url: process.env.DATABASE_URI,
  }),
});
