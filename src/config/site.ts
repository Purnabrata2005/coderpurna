import { USER } from "@/data/user";

export const SITE_INFO = {
  name: USER.displayName,
  url: process.env.NEXT_PUBLIC_APP_URL || "https://coderpurna.me",
  ogImage: USER.ogImage,
  description: USER.bio,
  keywords: USER.keywords,
};

export const META_THEME_COLORS = {
  light: "#ffffff",
  dark: "#09090b",
};
