import { GlobalConfig } from "payload/types";

const About: GlobalConfig = {
  slug: "about",
  access: {
    read: () => true,
  },
  fields: [
    {
      name: "sections",
      type: "array",
      fields: [
        {
          name: "heading",
          type: "text",
          required: true,
        },
        {
          name: "description",
          type: "text",
        },
        {
          name: "bullets",
          type: "array",
          fields: [
            {
              name: "text",
              type: "text",
              required: true,
            },
          ],
        },
        {
          name: "video",
          type: "upload",
          relationTo: "media",
          required: true,
        },
      ],
    },
  ],
};

export default About;
