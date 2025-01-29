"use client";
import React from "react";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
} from "@heroui/navbar";
import { Button } from "@heroui/button";
import { Link } from "@heroui/link";
import { Logo } from "@/src/components/icons";
import { siteConfig } from "@/src/config/site";

const NavigationBar = () => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const handleMenuItemClick = () => {
    setIsMenuOpen(false);
  };
  return (
    <Navbar isMenuOpen={isMenuOpen} onMenuOpenChange={setIsMenuOpen}>
      <NavbarContent>
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className="sm:hidden"
        />
        <NavbarBrand>
          <Logo />
          <p className="font-bold text-inherit">ACME</p>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent justify="center">
        <NavbarItem className="hidden w-full gap-4 sm:flex">
          {siteConfig.navItems.map((item) => (
            <div key={item.label}>
              <Link key={item.label} href={item.href} color="foreground">
                {item.label}
              </Link>
            </div>
          ))}
        </NavbarItem>
      </NavbarContent>
      <NavbarContent justify="end">
        <NavbarItem className="hidden lg:flex">
          <Link href="#">Login</Link>
        </NavbarItem>
        <NavbarItem>
          <Button as={Link} color="primary" href="#" variant="flat">
            Sign Up
          </Button>
        </NavbarItem>
      </NavbarContent>
      <NavbarMenu>
        {siteConfig.navMenuItems.map((item, index) => (
          <NavbarMenuItem key={`${item}-${index}`}>
            <Link
              color={
                index === 2 ? "primary" : index === 6 ? "danger" : "foreground"
              }
              className="w-full"
              href={item.href}
              size="lg"
              onPress={handleMenuItemClick}
            >
              {item.label}
            </Link>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </Navbar>
  );
};

export default NavigationBar;
