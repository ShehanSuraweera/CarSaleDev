// app/profile/components/NavTabs.tsx
"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function NavTabs() {
  const pathname = usePathname();

  const tabs = [
    { name: "Profile", href: "/profile" },
    { name: "My ads", href: "/profile/myads" },
    { name: "Favorite ads", href: "/profile/favourite-ads" },

    // Add more tabs here
  ];

  return (
    <div className="border-b border-gray-200">
      <nav className="flex space-x-4">
        {tabs.map((tab) => (
          <Link
            key={tab.name}
            href={tab.href}
            className={`px-3 py-2 text-sm font-medium ${
              pathname === tab.href
                ? "border-b-2 border-blue-500 text-blue-500"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            {tab.name}
          </Link>
        ))}
      </nav>
    </div>
  );
}
