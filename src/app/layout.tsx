import "@/src/styles/globals.css";
import { Metadata, Viewport } from "next";
import { Link } from "@heroui/link";
import clsx from "clsx";
import { Providers } from "@/src/providers/providers";
import { siteConfig } from "@/src/config/site";
import { fontSans } from "@/src/config/fonts";
import { Navbar } from "@/src/components/navbar";
import { UserContextProvider } from "@/src/UserContext";
import { Button } from "@heroui/button";
import SeconderyNavBar from "@/src/components/SeconderyNavBar";

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`,
  },
  description: siteConfig.description,
  icons: {
    icon: "/favicon.ico",
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
        <Providers themeProps={{ attribute: "class", defaultTheme: "dark" }}>
          <UserContextProvider>
            <div className="relative flex flex-col h-screen">
              <Navbar />
              <SeconderyNavBar />

              <main className="container flex-grow px-6 mx-auto sm:pt-16 max-w-7xl">
                {children}
              </main>

              <footer className="flex items-center justify-center w-full py-3">
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
          </UserContextProvider>
        </Providers>
      </body>
    </html>
  );
}
