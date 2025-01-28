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
import { usePathname, useRouter } from "next/navigation";
import { siteConfig } from "@/config/site";
import { ThemeSwitch } from "@/components/theme-switch";
import { Logo, UserIcon } from "@/components/icons";
import { UserContext } from "@/app/UserContext";
import {
  Divider,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  Spinner,
  useDisclosure,
  User,
} from "@heroui/react";
import ConfirmationBox from "./ConfirmationBox";
import apiClient from "@/services/api-client";
import { userAuthenticator } from "@/lib/api";
import LoginModal from "./LoginModel";

export const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathName = usePathname();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [isModalOpen, setModalOpen] = useState(false);
  const router = useRouter();
  const [showLoginModal, setShowLoginModal] = useState(false);

  const { user, setUser, ready } = useContext(UserContext) || {};

  const handleOnClose = () => {
    //router.push("/");
    console.log("Modal is closing... navbar" + " " + ready + " " + user);

    if (!ready) {
      return <Spinner color="warning" label="Loading..." />; // Optionally show a loading message until the redirect happens
    }

    if (!user) {
      router.push("/");
    } else {
      router.push("/profile");
    }
    setShowLoginModal(false);
  };

  // Handle Logout
  const handleConfirm = async () => {
    try {
      await apiClient.post("/auth/logout"); // Log the user out
      localStorage.removeItem("user");
      if (setUser) {
        setUser(null); // Clear user context
      }
      router.push("/"); // Redirect to home
    } catch (error) {
      console.error("Logout failed:", error);
    } finally {
      setModalOpen(false); // Close the confirmation modal
    }
  };

  // Handle Logout
  function handleLogout() {
    setModalOpen(true);
  }

  const handleMenuItemClick = () => {
    setIsMenuOpen(false);
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
                <User
                  avatarProps={{
                    src: "",
                    size: "sm",
                  }}
                  description={user?.user_name}
                  name={user?.name}
                />
              </Link>
            ) : (
              <Button
                className="hidden sm:flex"
                onPress={onOpen}
                color="primary"
                variant="ghost"
              >
                <Link href="/login" className="dark:text-white">
                  Sign in
                </Link>
              </Button>
            )}
            <Button
              className="flex sm:hidden"
              onPress={onOpen}
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
          size="xs"
          backdrop="blur"
          isOpen={isOpen}
          placement="right"
          onOpenChange={onOpenChange}
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
                        setShowLoginModal(true);
                      }}
                    >
                      Sign in
                    </Button>
                  ) : (
                    <Button
                      onPress={handleLogout}
                      color="danger"
                      variant="ghost"
                    >
                      Logout
                    </Button>
                  )}
                </DrawerFooter>
              </>
            )}
          </DrawerContent>
        </Drawer>
      </NextUINavbar>
      <LoginModal isOpen={showLoginModal} onClose={handleOnClose} />
      <ConfirmationBox
        isOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
        title="Confirm Action"
        message="Are you sure you want to proceed?"
        onConfirm={handleConfirm}
        confirmText="Yes"
        cancelText="No"
      />
    </div>
  );
};
