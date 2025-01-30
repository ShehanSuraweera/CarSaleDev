"use client";
import {
  Navbar as NextUINavbar,
  NavbarContent,
  NavbarBrand,
  NavbarItem,
  NavbarMenuItem,
} from "@heroui/navbar";
import { Button } from "@heroui/button";
import { Link } from "@heroui/link";
import NextLink from "next/link";
import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { siteConfig } from "@/src/config/site";
import { ThemeSwitch } from "@/src/components/theme-switch";
import { Logo } from "@/src/components/icons";

import {
  Divider,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  useDisclosure,
  User as HeroUser,
} from "@heroui/react";

import { User } from "@supabase/supabase-js";
import { createSupabaseClient } from "../auth/client";
import SignOut from "./SignOut";
import { useUser } from "../UserContext";

export const Navbar = () => {
  //const [user, setUser] = useState<User | null>(null);
  const { user } = useUser();

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathName = usePathname();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const router = useRouter();

  const handleMenuItemClick = () => {
    setIsMenuOpen(false);
  };

  const handleOpen = () => {
    onOpen();
  };

  return (
    <div>
      <NextUINavbar
        isMenuOpen={isMenuOpen}
        onMenuOpenChange={setIsMenuOpen}
        position="sticky"
        className=" bg-[#01172F] text-[#FDC221]"
      >
        <NavbarBrand as="li" className="gap-3 max-w-fit">
          <NextLink className="flex items-center justify-start gap-1 " href="/">
            <Logo />
            <p className="font-bold text-inherit">CeylonCars</p>
          </NextLink>
        </NavbarBrand>
        <NavbarContent className="basis-1/5 sm:basis-full" justify="center">
          <ul className="justify-center hidden gap-4 ml-2 md:flex">
            {siteConfig.navItems.map((item) => (
              <NavbarItem key={item.label}>
                <NextLink
                  className={`dark:text-[#FDC221] ${
                    item.href === pathName
                      ? "  font-medium   text-[#FDC221] "
                      : "text-white"
                  }`}
                  color="foreground"
                  href={item.href}
                >
                  {item.label}
                </NextLink>
              </NavbarItem>
            ))}
          </ul>
        </NavbarContent>

        <NavbarContent className="flex basis-1/5 sm:basis-full" justify="end">
          <NavbarItem className="flex sm:gap-2">
            <ThemeSwitch />

            {user ? (
              <Link
                href="/profile"
                className="hidden text-white sm:flex hover:cursor-pointer"
              >
                <HeroUser
                  avatarProps={{
                    src: "",
                    size: "sm",
                  }}
                  description=""
                  name={
                    user.email && user.email?.length > 10
                      ? user.email?.slice(0, 10) + "..."
                      : user.email
                  }
                />
              </Link>
            ) : (
              <Button
                className="hidden sm:flex"
                onPress={() => {
                  router.push("/login");
                }}
                color="primary"
                variant="ghost"
              >
                Sign in
              </Button>
            )}
            <Button
              className="flex sm:hidden"
              onPress={handleOpen}
              color="primary"
              variant="light"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="size-6"
              >
                <path d="M5.625 3.75a2.625 2.625 0 1 0 0 5.25h12.75a2.625 2.625 0 0 0 0-5.25H5.625ZM3.75 11.25a.75.75 0 0 0 0 1.5h16.5a.75.75 0 0 0 0-1.5H3.75ZM3 15.75a.75.75 0 0 1 .75-.75h16.5a.75.75 0 0 1 0 1.5H3.75a.75.75 0 0 1-.75-.75ZM3.75 18.75a.75.75 0 0 0 0 1.5h16.5a.75.75 0 0 0 0-1.5H3.75Z" />
              </svg>
            </Button>
          </NavbarItem>
        </NavbarContent>

        <Drawer
          className="flex sm:hidden"
          size="xs"
          backdrop="blur"
          isOpen={isOpen}
          placement="right"
          onClose={onClose}
        >
          <DrawerContent>
            {(onClose) => (
              <>
                <DrawerHeader className="flex flex-col gap-1">
                  <Logo />
                  Ceylon Cars
                </DrawerHeader>
                <DrawerBody>
                  <div className="flex flex-col gap-2 mx-4 mt-2">
                    {siteConfig.navMenuItems.map((item) => (
                      <NavbarMenuItem key={item.label} className="list-none ">
                        <Link
                          color={"foreground"}
                          className={` ${
                            item.href === pathName
                              ? "  font-medium  text-[#FDC221] "
                              : "text-black dark:text-white"
                          }`}
                          href={item.href}
                          size="lg"
                          onPress={handleMenuItemClick}
                        >
                          <div className="flex flex-col items-center justify-center w-full h-12">
                            <div> {item.label}</div>
                            <div className="w-screen">
                              <Divider className="w-full my-2" />
                            </div>
                          </div>
                        </Link>
                      </NavbarMenuItem>
                    ))}
                  </div>
                </DrawerBody>
                <DrawerFooter>
                  <div className=" w-[100%] flex justify-center gap-2 mt-16"></div>
                  <Button color="danger" variant="light" onPress={onClose}>
                    Close
                  </Button>
                  {!user ? (
                    <Button
                      color="primary"
                      variant="ghost"
                      onPress={() => {
                        router.push("/login");
                      }}
                    >
                      Sign in
                    </Button>
                  ) : (
                    <SignOut />
                  )}
                </DrawerFooter>
              </>
            )}
          </DrawerContent>
        </Drawer>
      </NextUINavbar>
    </div>
  );
};
