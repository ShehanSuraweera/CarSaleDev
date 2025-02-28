"use client";
// app/profile/components/Sidebar.tsx
import Link from "next/link";
import { usePathname } from "next/navigation";
import SignOut from "./SignOut";
import { Car, CircleUserRound, Heart, UserCircle } from "lucide-react";
import { useMemo } from "react";
import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@heroui/react";

const profileLinks = [
  {
    name: "User Profile",
    id: "/profile",
    icon: <CircleUserRound />,
  },
  { name: "My ads", id: "/profile/myads", icon: <Car /> },
  { name: "Favourite ads", id: "/profile/favourite-ads", icon: <Heart /> },
];

export default function Sidebar() {
  const pathname = usePathname();

  const navContent = useMemo(() => {
    return (
      <div className="flex flex-col items-center justify-between w-full h-full p-3 text-sm shadow-md sm:p-5 dark:text-white md:w-64">
        <ul className="flex flex-col w-full gap-6 mt-10 ">
          {profileLinks.map((link) => {
            return (
              <li
                className={`p-2  text-[#01172F] ${
                  pathname === link.id
                    ? "bg-opacity-10 bg-[#01172F]"
                    : "hover:text-gray-400  hover:bg-slate-900"
                } rounded-md `}
                key={link.id}
              >
                <Link href={link.id} className="flex items-center gap-4">
                  {link.icon}
                  {link.name}
                </Link>
              </li>
            );
          })}
        </ul>
        <div className="flex flex-col items-center justify-end mt-10 sm:h-96">
          <SignOut />
        </div>
      </div>
    );
  }, [pathname]);

  const mobileNavContent = useMemo(() => {
    return (
      <Dropdown size="lg" className="w-fit ">
        <DropdownTrigger>
          <Button variant="bordered">Open Menu</Button>
        </DropdownTrigger>
        <DropdownMenu aria-label="Link Actions">
          {/* <DropdownItem key="home" href="/profile">
            User Profile
          </DropdownItem>
          <DropdownItem key="about" href="/profile/myads">
            My ads
          </DropdownItem>
          <DropdownItem key="contact" href="/profile/savedads">
            Saved ads
          </DropdownItem> */}
          <DropdownItem key="">{navContent}</DropdownItem>
        </DropdownMenu>
      </Dropdown>
    );
  }, [pathname]);

  return (
    <div>
      <div className="hidden md:flex">{navContent}</div>

      <div className="flex items-center justify-center md:hidden">
        {mobileNavContent}
      </div>
    </div>
  );
}
