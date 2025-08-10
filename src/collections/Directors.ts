import { CollectionConfig } from "payload/types";

const Directors: CollectionConfig = {
  slug: "directors",
  access: {
    read: () => true,
  },
  admin: {
    useAsTitle: "name",
  },
  fields: [
    {
      name: "name",
      type: "text",
      required: true,
    },
    {
      name: "slug",
      type: "text",
      unique: true,
      hooks: {
        beforeValidate: [
          ({ value, data }) => {
            const slugify = (str: string) =>
              str
                .toLowerCase()
                .trim()
                .replace(/[^\w\s-]/g, "") // remove special chars
                .replace(/\s+/g, "-"); // replace spaces with hyphens

            if (value && typeof value === "string") {
              return slugify(value);
            }

            if (data?.name) {
              return slugify(data.name);
            }

            return value;
          },
        ],
      },
    },
    {
      name: "portfolio",
      type: "array",
      required: true,
      fields: [
        {
          name: "category",
          type: "relationship",
          relationTo: "categories",
          required: true,
        },
        {
          name: "photographyMode",
          type: "checkbox",
          defaultValue: false,
        },
        {
          name: "videoProjects",
          label: "Projects",
          type: "array",
          required: true,
          admin: {
            condition: (data, siblingData) => {
              if (siblingData.photographyMode) {
                return false;
              } else {
                return true;
              }
            },
          },
          fields: [
            {
              name: "name",
              type: "text",
              required: true,
            },
            {
              name: "vimeoVideo",
              label: "Vimeo Video URL",
              type: "text",
              required: true,
              admin: {
                placeholder: "https://vimeo.com/123456789",
              },
              validate: (value) => {
                if (!value) return "This field is required.";

                if (value.includes("/manage/")) {
                  return 'Please paste a public Vimeo video URL, not a "manage" link.';
                }

                const regex = /^https:\/\/vimeo\.com\/(\d+)(\?.*?)?(#.*)?$/;

                if (!regex.test(value)) {
                  return "Please enter a valid Vimeo URL like https://vimeo.com/123456789";
                }

                return true;
              },
            },
          ],
        },
        {
          name: "imageProjects",
          type: "array",
          label: "Projects",
          required: true,
          admin: {
            condition: (data, siblingData) => {
              if (siblingData.photographyMode) {
                return true;
              } else {
                return false;
              }
            },
          },
          fields: [
            {
              name: "name",
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
    },
  ],
};

export default Directors;
