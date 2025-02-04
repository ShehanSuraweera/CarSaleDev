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
  Tooltip,
} from "@heroui/react";

import { useUser } from "../UserContext";
import { Loader2 } from "lucide-react";
import toast from "react-hot-toast";

export const Navbar = () => {
  //const [user, setUser] = useState<User | null>(null);
  const { user, loading } = useUser();

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathName = usePathname();
  const { onOpen } = useDisclosure();
  const [isOpen, setIsOpen] = useState(false);

  const router = useRouter();

  const handleMenuItemClick = () => {
    setIsMenuOpen(false);
  };

  const handleOpen = (open: boolean) => {
    onOpen();
    setIsOpen(open);
  };

  const handleSellButton = () => {
    router.push("/sell");
    if (!user && !loading) {
      toast.error("Please login to post an ad");
    }
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
          <ul className="items-center justify-center hidden gap-4 ml-2 md:flex">
            {siteConfig.navItems.map((item) => (
              <NavbarItem key={item.label}>
                <NextLink
                  className={`dark:text-[#FDC221] ${
                    item.href === pathName
                      ? "  font-medium   text-[#FDC221] "
                      : "text-white"
                  }
                    ${
                      item.label === "Buy"
                        ? "border-solid border-1 shadow-sm shadow-slate-800 p-1 px-2 rounded-md "
                        : ""
                    }`}
                  color="foreground"
                  href={item.href}
                >
                  {item.label}
                </NextLink>
              </NavbarItem>
            ))}
            <Button color="warning" onPress={handleSellButton}>
              POST FREE
            </Button>
          </ul>
        </NavbarContent>

        <NavbarContent className="flex basis-1/5 sm:basis-full" justify="end">
          <NavbarItem className="flex sm:gap-2">
            <ThemeSwitch />

            {!loading && user ? (
              <Link
                href="/profile"
                className="hidden text-white sm:flex hover:cursor-pointer"
              >
                <Tooltip content={user?.email || ""} color="primary">
                  <HeroUser
                    avatarProps={{
                      src: `${user?.user_metadata.avatar_url || ""}`,
                      size: "sm",
                    }}
                    description=""
                    name={
                      user.email && user.email?.length > 10
                        ? user.email?.slice(0, 10) + "..."
                        : user.email
                    }
                  />
                </Tooltip>
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
                {loading ? (
                  <Loader2 className="w-5 h-5 text-[#F5A524] animate-spin" />
                ) : (
                  "Sign in"
                )}
              </Button>
            )}
            <Button
              className="flex sm:hidden"
              onPress={() => handleOpen(!isOpen)}
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
          onOpenChange={handleOpen}
        >
          <DrawerContent>
            {(onClose) => (
              <>
                <DrawerHeader className="flex flex-col gap-1">
                  <Logo />
                  Ceylon Cars
                </DrawerHeader>
                <DrawerBody>
                  <div className="flex flex-col justify-between h-full">
                    <div className="flex flex-col gap-2 mx-4 mt-2">
                      {siteConfig.navMenuItems.map((item) => (
                        <NavbarMenuItem key={item.label} className="list-none ">
                          <Link
                            onPressEnd={() => {
                              handleOpen(!isOpen);
                            }}
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
                    <div className="flex justify-end p-2">
                      {!loading && user && (
                        <Link
                          href="/profile"
                          className="flex hover:cursor-pointer"
                        >
                          <HeroUser
                            avatarProps={{
                              src: "",
                              size: "sm",
                            }}
                            description=""
                            name={user.email}
                          />
                        </Link>
                      )}
                    </div>
                  </div>
                </DrawerBody>
                <DrawerFooter>
                  <div className=" w-[100%] flex justify-center h-full items-center gap-2 mt-1">
                    <Button color="danger" variant="light" onPress={onClose}>
                      Close
                    </Button>
                    {!loading && !user ? (
                      <Button
                        color="primary"
                        variant="ghost"
                        onPress={() => {
                          onClose();
                          router.push("/login");
                        }}
                      >
                        {loading ? (
                          <Loader2 className="w-5 h-5 animate-spin" />
                        ) : (
                          " Sign in"
                        )}
                      </Button>
                    ) : (
                      <></>
                    )}
                  </div>
                </DrawerFooter>
              </>
            )}
          </DrawerContent>
        </Drawer>
      </NextUINavbar>
    </div>
  );
};
