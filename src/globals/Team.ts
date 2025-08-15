import { GlobalConfig } from "payload/types";

const Team: GlobalConfig = {
  slug: "team",
  access: {
    read: () => true,
  },
  fields: [
    {
      name: "members",
      type: "array",
      fields: [
        {
          name: "name",
          type: "text",
          required: true,
        },
        {
          name: "position",
          type: "text",
          required: true,
        },
        {
          name: "image",
          type: "upload",
          relationTo: "media",
          required: true,
        },
      ],
    },
  ],
};

export default Team;
