import { CollectionConfig } from "payload/types";

const Contents: CollectionConfig = {
  slug: "contents",
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
      name: "vimeoVideo",
      label: "Vimeo Video URL",
      type: "text",
      required: true,
      admin: {
        placeholder: "https://vimeo.com/123456789",
      },
      validate: (value) => {
        if (!value) return "This field is required.";

        // Prevent /manage/ URLs
        if (value.includes("/manage/")) {
          return 'Please paste a public Vimeo video URL, not a "manage" link.';
        }

        // Allow Vimeo URLs with optional h=hash, and ignore other query params
        const regex = /^https:\/\/vimeo\.com\/(\d+)(\?.*?)?(#.*)?$/;

        const match = value.match(regex);
        if (!match) {
          return "Please enter a valid Vimeo URL like https://vimeo.com/123456789";
        }

        return true;
      },
    },
    {
      name: "category",
      type: "relationship",
      relationTo: "categories",
      required: true,
    },
    {
      name: "director",
      type: "relationship",
      relationTo: "directors",
      required: true,
    },
  ],
};

export default Contents;
