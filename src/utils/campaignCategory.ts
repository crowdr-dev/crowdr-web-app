export const campaignCategories = [
  {
    value: "business",
    label: "Business",
    icon: "toolbox",
    bgColor: "#FFE7E3"
  },
  {
    value: "tech",
    label: "Tech",
    icon: "desktop-computer",
    bgColor: "#E5EDFF"
  },
  {
    value: "health",
    label: "Health",
    icon: "syringe",
    bgColor: "#E3FFE6"
  },
  {
    value: "music",
    label: "Music",
    icon: "guitar",
    bgColor: "#FEF8E4"
  },
  {
    value: "legal",
    label: "Legal",
    icon: "balance-scale",
    bgColor: "#FFEBF2"
  },
  {
    value: "family",
    label: "Family",
    icon: "family-man-woman-girl-boy",
    bgColor: "#FEE4FB"
  },
  {
    value: "events",
    label: "Events",
    icon: "circus-tent",
    bgColor: "#FFE7E3"
  },
  {
    value: "arts",
    label: "Arts",
    icon: "artist-palette",
    bgColor: "#E5EDFF"
  },
  {
    value: "politics",
    label: "Politics",
    icon: "office-building",
    bgColor: "#E3FFE6"
  },
  {
    value: "sport",
    label: "Sports",
    icon: "man-swimming-light-skin-tone",
    bgColor: "#E3FFE6"
  },
  {
    value: "education",
    label: "Education",
    icon: "books",
    bgColor: "#FEF8E4"
  },
  {
    value: "others",
    label: "Others",
    icon: "",
    bgColor: "#FEF8E4"
  }
] as const;

export type CampaignCategory = (typeof campaignCategories)[number]["value"];
