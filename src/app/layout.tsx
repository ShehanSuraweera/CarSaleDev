import "@/src/styles/globals.css";
import { Metadata, Viewport } from "next";
import { Link } from "@heroui/link";
import clsx from "clsx";
import { Providers } from "@/src/providers/providers";
import { fontSans } from "@/src/config/fonts";
import { Navbar } from "@/src/components/navbar";
import { UserContextProvider } from "@/src/UserContext";
import { Toaster } from "react-hot-toast";
import { SearchProvider } from "../providers/SearchProvider";

export const metadata: Metadata = {
  title: "Ceylon Cars - Sri Lanka’s No.1 Vehicle Selling Platform",
  description:
    "Buy and sell vehicles in Sri Lanka easily. Find the best deals on cars, SUVs, and motorbikes.",
  keywords:
    "buy cars Sri Lanka, sell vehicles, second-hand cars, new cars, car marketplace",
  authors: [{ name: "Ceylon Cars Team", url: "https://ceyloncars.lk" }],
  icons: {
    icon: "/favicon.ico",
  },
  // 🔹 Open Graph for Facebook, WhatsApp, Instagram, TikTok
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
  // 🔹 Twitter Card for Twitter sharing
  twitter: {
    card: "summary_large_image",
    title: "Ceylon Cars - Sri Lanka’s No.1 Vehicle Selling Platform",
    description:
      "Buy and sell vehicles easily with Ceylon Cars. Find the best deals on cars, SUVs, and motorbikes in Sri Lanka.",
    images: ["https://ceyloncars.lk/og-image.jpg"], // Replace with actual image URL
  },

  // 🔹 Additional meta tags for best sharing experience
  metadataBase: new URL("https://ceyloncars.lk"),
  alternates: {
    canonical: "https://ceyloncars.lk",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html suppressHydrationWarning lang="en">
      <head />

      <body
        className={clsx(
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable
        )}
      >
        <UserContextProvider>
          <SearchProvider>
            <Providers
              themeProps={{ attribute: "class", defaultTheme: "dark" }}
            >
              <div className="relative flex flex-col h-screen">
                <Navbar />

                <main className="container flex-grow px-6 mx-auto sm:pt-8 max-w-7xl">
                  {children}
                </main>

                <footer className="flex items-center justify-center w-full py-3 mt-20">
                  <Link
                    isExternal
                    className="flex items-center gap-1 text-current"
                    href="https://nextui-docs-v2.vercel.app?utm_source=next-app-template"
                    title="nextui.org homepage"
                  >
                    <span className="text-default-600">Powered by</span>
                    <p className="text-primary">NextUI</p>
                  </Link>
                </footer>
              </div>
            </Providers>

            <Toaster
              toastOptions={{
                style: {
                  textAlign: "center",
                },
              }}
            />
          </SearchProvider>
        </UserContextProvider>
      </body>
    </html>
  );
}
