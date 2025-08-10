import { CollectionConfig } from "payload/types";

const Users: CollectionConfig = {
  slug: "users",
  auth: {
    maxLoginAttempts: 0,
  },
  admin: {
    useAsTitle: "email",
  },
  fields: [],
};

export default Users;
