"use client";
import {
  Navbar as NextUINavbar,
  NavbarContent,
  NavbarMenu,
  NavbarMenuToggle,
  NavbarBrand,
  NavbarItem,
  NavbarMenuItem,
} from "@heroui/navbar";
import { Button } from "@heroui/button";
import { Link } from "@heroui/link";
import NextLink from "next/link";
import { useContext, useState } from "react";
import { usePathname } from "next/navigation";
import { siteConfig } from "@/config/site";
import { ThemeSwitch } from "@/components/theme-switch";
import { Logo } from "@/components/icons";
import { UserContext } from "@/app/UserContext";

export const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathName = usePathname();

  const { user } = useContext(UserContext) || {};

  const handleMenuItemClick = () => {
    setIsMenuOpen(false);
  };

  return (
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
        <ul className="justify-center hidden gap-4 ml-2 lg:flex">
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

      <NavbarContent
        className="hidden sm:flex basis-1/5 sm:basis-full"
        justify="end"
      >
        <NavbarItem className="hidden gap-2 sm:flex">
          <ThemeSwitch />

          {user ? (
            <Link href="/profile" className="text-white hover:cursor-pointer">
              {user.name}{" "}
            </Link>
          ) : (
            <Button>
              <Link href="/login" className="dark:text-white">
                Sign in
              </Link>
            </Button>
          )}
        </NavbarItem>
      </NavbarContent>

      <NavbarContent className="pl-4 sm:hidden basis-1" justify="end">
        <ThemeSwitch />
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close" : "Open"}
          className="sm:hidden"
        />
      </NavbarContent>

      <NavbarMenu>
        <div className="flex flex-col gap-2 mx-4 mt-2">
          {siteConfig.navMenuItems.map((item) => (
            <NavbarMenuItem key={item.label}>
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
                {item.label}
              </Link>
            </NavbarMenuItem>
          ))}
        </div>
      </NavbarMenu>
    </NextUINavbar>
  );
};
