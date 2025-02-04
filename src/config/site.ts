export type SiteConfig = typeof siteConfig;

export const siteConfig = {
  name: "Sri lanka's No.1 Car sale website",
  description:
    "Buy and sell cars, SUVs, motorbikes, and more with ease. Ceylon Cars is Sri Lanka’s No.1 trusted vehicle marketplace.",
  navItems: [
    {
      label: "Home",
      href: "/",
    },
    {
      label: "Buy",
      href: "/buy",
    },

    {
      label: "Blog",
      href: "/blog",
    },
    {
      label: "About",
      href: "/about",
    },
  ],
  navMenuItems: [
    {
      label: "Home",
      href: "/",
    },
    {
      label: "Buy",
      href: "/buy",
    },
    {
      label: "Sell",
      href: "/sell",
    },
    {
      label: "Blog",
      href: "/blog",
    },
    {
      label: "About",
      href: "/about",
    },
    {
      label: "Profile",
      href: "/profile",
    },
  ],
  links: {
    github: "https://github.com/nextui-org/nextui",
    twitter: "https://twitter.com/getnextui",
    docs: "https://nextui.org",
    discord: "https://discord.gg/9b6yyZKmH4",
    sponsor: "https://patreon.com/jrgarciadev",
  },
};

import Head from "next/head";

export const metadata = {
  title: "Ceylon Cars - Sri Lanka’s No.1 Vehicle Selling Platform",
  description:
    "Buy and sell cars, SUVs, motorbikes, and more with ease. Ceylon Cars is Sri Lanka’s No.1 trusted vehicle marketplace.",
  keywords:
    "cars for sale in Sri Lanka, buy vehicles Sri Lanka, sell cars, second-hand cars, new cars Sri Lanka, vehicle marketplace",
  authors: [{ name: "Ceylon Cars Team", url: "https://ceyloncars.lk" }],
  openGraph: {
    title: "Ceylon Cars - Sri Lanka’s No.1 Vehicle Selling Platform",
    description:
      "Find the best deals on new and used cars in Sri Lanka. List your vehicle for free and connect with buyers easily.",
    url: "https://ceyloncars.lk",
    siteName: "Ceylon Cars",
    type: "website",
    images: [
      {
        url: "https://ceyloncars.lk/og-image.jpg", // Replace with actual OG image URL
        width: 1200,
        height: 630,
        alt: "Ceylon Cars - Sri Lanka's No.1 Vehicle Marketplace",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Ceylon Cars - Sri Lanka’s No.1 Vehicle Selling Platform",
    description:
      "Buy and sell vehicles easily with Ceylon Cars. Find the best deals on cars, SUVs, and motorbikes in Sri Lanka.",
    images: ["https://ceyloncars.lk/og-image.jpg"], // Replace with actual image URL
  },
};
