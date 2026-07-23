export interface Story {
  id: string;
  title: string;
  caption: string;
  date: string;
  location: string;
  coverImage: string;
  gallery: string[];
  createdAt: string;
}

export const SEED_STORIES: Story[] = [
  {
    id: "1",
    title: "School",
    caption:
      "Our school outreach program brings education closer to tribal children in remote areas.",
    date: "January 15, 2024",
    location: "Coastal Zone, South 24 Pgs",
    coverImage: "/s1.jpeg",
    gallery: ["/s1.jpeg", "/s2.jpeg", "/s3.jpeg", "/s4.jpeg", "/s5.jpeg", "/s6.jpeg", "/s7.jpeg", "/s8.jpeg"],
    createdAt: "2024-01-15T00:00:00.000Z",
  },
  {
    id: "2",
    title: "Conscious program among the tribals",
    caption:
      "A grassroots awareness drive helping tribal communities understand their rights and opportunities.",
    date: "March 10, 2024",
    location: "Urban Hub, Kolkata",
    coverImage: "/c1.jpeg",
    gallery: ["/c1.jpeg", "/c2.jpeg", "/c3.jpeg"],
    createdAt: "2024-03-10T00:00:00.000Z",
  },
  {
    id: "3",
    title: "Program among Minority people",
    caption:
      "Community sessions focused on inclusion, support, and empowerment for minority groups.",
    date: "April 22, 2024",
    location: "Rural District, Bankura",
    coverImage: "/m1.jpeg",
    gallery: ["/m1.jpeg", "/m2.jpeg"],
    createdAt: "2024-04-22T00:00:00.000Z",
  },
  {
    id: "4",
    title: "Learning Drawing",
    caption:
      "Creative learning workshops where children explore art, expression, and confidence.",
    date: "April 22, 2024",
    location: "Rural District, Bankura",
    coverImage: "/d1.jpeg",
    gallery: ["/d1.jpeg", "/d2.jpeg"],
    createdAt: "2024-04-22T00:00:00.000Z",
  },
  {
    id: "5",
    title: "Seba garments",
    caption:
      "Distribution of garments to families in need through our Seba initiative.",
    date: "December 05, 2023",
    location: "Uttar Panchpota",
    coverImage:
      "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1511632765486-a01980e01a18?auto=format&fit=crop&w=1200&q=80",
    ],
    createdAt: "2023-12-05T00:00:00.000Z",
  },
  {
    id: "6",
    title: "Seba food",
    caption:
      "Nutritious meals shared with community members as part of our food support program.",
    date: "December 05, 2023",
    location: "Uttar Panchpota",
    coverImage:
      "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1511632765486-a01980e01a18?auto=format&fit=crop&w=1200&q=80",
    ],
    createdAt: "2023-12-05T00:00:00.000Z",
  },
  {
    id: "7",
    title: "Socio religious Cultural program",
    caption:
      "A cultural gathering celebrating unity, tradition, and community spirit.",
    date: "December 05, 2023",
    location: "Uttar Panchpota",
    coverImage:
      "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1511632765486-a01980e01a18?auto=format&fit=crop&w=1200&q=80",
    ],
    createdAt: "2023-12-05T00:00:00.000Z",
  },
  {
    id: "8",
    title: "Program on women",
    caption:
      "Empowerment sessions addressing health, education, and leadership for women.",
    date: "December 05, 2023",
    location: "Uttar Panchpota",
    coverImage:
      "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1511632765486-a01980e01a18?auto=format&fit=crop&w=1200&q=80",
    ],
    createdAt: "2023-12-05T00:00:00.000Z",
  },
  {
    id: "9",
    title: "Birthday celebration of Hari Chand Thakur",
    caption:
      "Community members gathered to honor Hari Chand Thakur with prayers and cultural programs.",
    date: "December 05, 2023",
    location: "Uttar Panchpota",
    coverImage:
      "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1511632765486-a01980e01a18?auto=format&fit=crop&w=1200&q=80",
    ],
    createdAt: "2023-12-05T00:00:00.000Z",
  },
  {
    id: "10",
    title: "Baha parab/ spring festival",
    caption:
      "Spring festival celebrations with music, dance, and traditional rituals.",
    date: "December 05, 2023",
    location: "Uttar Panchpota",
    coverImage:
      "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1511632765486-a01980e01a18?auto=format&fit=crop&w=1200&q=80",
    ],
    createdAt: "2023-12-05T00:00:00.000Z",
  },
  {
    id: "11",
    title: "পাথরে নয় গাছে জল",
    caption:
      "Environmental awareness program promoting tree-based water conservation.",
    date: "December 05, 2023",
    location: "Uttar Panchpota",
    coverImage:
      "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1511632765486-a01980e01a18?auto=format&fit=crop&w=1200&q=80",
    ],
    createdAt: "2023-12-05T00:00:00.000Z",
  },
  {
    id: "12",
    title: "Save constitution",
    caption:
      "A public awareness drive on constitutional values and civic responsibility.",
    date: "December 05, 2023",
    location: "Uttar Panchpota",
    coverImage:
      "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1511632765486-a01980e01a18?auto=format&fit=crop&w=1200&q=80",
    ],
    createdAt: "2023-12-05T00:00:00.000Z",
  },
];
