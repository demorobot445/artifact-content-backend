import path from "path";

import { mongooseAdapter } from "@payloadcms/db-mongodb";
import { webpackBundler } from "@payloadcms/bundler-webpack";
import { slateEditor } from "@payloadcms/richtext-slate";
import { buildConfig } from "payload/config";

import Users from "./collections/Users";
import Media from "./collections/Media";
import Contents from "./collections/Contents";
import Categories from "./collections/Categories";
import Directors from "./collections/Directors";
import Work from "./globals/Work";
import About from "./globals/About";
import Team from "./globals/Team";

export default buildConfig({
  admin: {
    user: Users.slug,
    bundler: webpackBundler(),
  },
  editor: slateEditor({}),
  collections: [Users, Media, Contents, Categories, Directors],
  globals: [Work, About, Team],
  typescript: {
    outputFile: path.resolve(__dirname, "payload-types.ts"),
  },
  cors: "*",
  graphQL: {
    schemaOutputFile: path.resolve(__dirname, "generated-schema.graphql"),
  },
  plugins: [],
  db: mongooseAdapter({
    url: process.env.DATABASE_URI,
  }),
});
