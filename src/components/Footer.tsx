import React from "react";
import NextLink from "next/link";
import { siteConfig } from "@/src/config/site";
import {
  FacebookIcon,
  InstagramIcon,
  LinkedInIcon,
  TwitterIcon,
} from "./icons";
import Link from "next/link";
import WANDI_LK_LOGO from "@/public/images/WANDI_LK_LOGO.svg";
import Image from "next/image";

const Footer = () => {
  return (
    <footer className="bg-[#01172F] text-[#FDC221] mt-16">
      <div className="container px-6 py-12 mx-auto">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          {/* About Section */}
          <div className="col-span-1">
            <Image src={WANDI_LK_LOGO} alt="Wandi.lk" className="w-full " />
            {/* <h3 className="mb-4 text-lg font-bold">CeylonCars</h3> */}
            <p className="text-sm text-slate-300">
              Your trusted partner in buying and selling cars in Sri Lanka. We
              provide the best deals and a seamless experience for all your
              automotive needs.
            </p>
          </div>

          {/* Quick Links Section */}
          <div className="col-span-1">
            <h3 className="mb-4 text-lg font-bold">Quick Links</h3>
            <ul className="space-y-2">
              {siteConfig.navItems.map((item) => (
                <li key={item.label}>
                  <NextLink
                    href={item.href}
                    className="text-sm text-slate-300 hover:text-[#FDC221] transition-colors"
                  >
                    {item.label}
                  </NextLink>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Section */}
          <div className="col-span-1">
            <h3 className="mb-4 text-lg font-bold">Contact Us</h3>
            <ul className="space-y-2">
              <li className="text-sm text-slate-300">
                Email: info@ceyloncars.com
              </li>
              <li className="text-sm text-slate-300">Phone: +94 77 123 4567</li>
              <li className="text-sm text-slate-300">
                Address: 123 Colombo, Sri Lanka
              </li>
            </ul>
          </div>

          {/* Social Media Section */}
          <div className="col-span-1">
            <h3 className="mb-4 text-lg font-bold">Follow Us</h3>
            <div className="flex space-x-4">
              <Link
                href="https://facebook.com"
                className="text-slate-300 hover:text-[#FDC221] transition-colors hover:bg-[#FDC221]"
              >
                <FacebookIcon />
              </Link>
              <Link
                href="https://twitter.com"
                className="text-slate-300 hover:text-[#FDC221] transition-colors hover:bg-[#FDC221]"
              >
                <TwitterIcon />
              </Link>
              <Link
                href="https://instagram.com"
                className="text-slate-300 hover:text-[#FDC221] transition-colors hover:bg-[#FDC221]"
              >
                <InstagramIcon />
              </Link>
              <Link
                href="https://linkedin.com"
                className="text-slate-300 hover:text-[#FDC221] hover:bg-[#FDC221] transition-colors"
              >
                <LinkedInIcon />
              </Link>
            </div>
          </div>
        </div>

        {/* Copyright Section */}
        <div className="pt-8 mt-8 text-center border-t border-slate-700">
          <p className="text-sm text-slate-300">
            &copy; {new Date().getFullYear()} CeylonCars. All rights reserved.
            Developed by Shehan Suraweera.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
