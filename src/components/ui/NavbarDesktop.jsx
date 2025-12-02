"use client";
import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
  Search,
  ShoppingCart,
  Heart,
  Menu,
  User,
  ChevronRight,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/Sheet";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Shop", href: "/shop" },
    { name: "About", href: "/about" },
    { name: "Blog", href: "/blog" },
    { name: "Contact", href: "/contact" },
    { name: "Pages", href: "/pages" },
    { name: "Reading List", href: "/reading-list" },
  ];

  return (
    // Top Navbar (Teal Background)
    <nav className="w-full overflow-x-hidden">
      <div className="w-full bg-[#23856D]">
        <div className="container mx-auto h-[58px] flex items-center justify-center px-4">
          <ul className="flex flex-wrap gap-4 lg:gap-8 xl:gap-12 items-center justify-center text-sm text-white font-inter">
            <li className="flex items-center gap-2 font-normal">
              <Image
                src="./images/Phone.svg"
                alt="Phone Icon"
                width={16}
                height={16}
              />
              (225) 555-0118
            </li>
            <li className="flex items-center gap-2 font-normal">
              <Image
                src="./images/Mail.svg"
                alt="Mail Icon"
                width={16}
                height={16}
              />
              michelle.rivera@example.com
            </li>
            <li className="font-semibold">
              Follow Us and get a chance to win 80% off
            </li>
            <li className="flex items-center gap-2 font-normal">
              Follow Us :
              <Image
                src="./images/Instagram.svg"
                alt="Instagram Icon"
                width={25}
                height={25}
              />
              <Image
                src="./images/YouTube.svg"
                alt="YouTube Icon"
                width={25}
                height={25}
              />
              <Image
                src="./images/Facebook.svg"
                alt="Facebook Icon"
                width={25}
                height={25}
              />
              <Image
                src="./images/Twitter.svg"
                alt="Twitter Icon"
                width={25}
                height={25}
              />
            </li>
          </ul>
        </div>
      </div>

      {/*Main Navbar (White Background)*/}
      <div className="w-full bg-white border-b">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-[70px]">
            {/* Logo */}
            <Link
              href="/"
              className="text-2xl font-semibold ml-[16vw] font-inter text-[#252B42]"
            >
              Bookstar
            </Link>

            {/* Desktop Navigation Links */}
            <div className="hidden lg:flex items-center gap-6 mr-[4vw]">
              {navLinks.map((link) => {
                // Special handling for Shop link with chevron
                if (link.name === "Shop") {
                  const isActive = pathname === "/shop";
                  return (
                    <Link
                      key={link.name}
                      href={link.href}
                      className={`flex items-center gap-1 text-sm font-semibold font-inter transition-colors ${
                        isActive
                          ? "text-[#252B42]"
                          : "text-[#737373] hover:text-[#252B42]"
                      }`}
                    >
                      <span>{link.name}</span>
                      <ChevronRight
                        className={`w-3 h-3 text-[#252B42] transition-all duration-500 ease-out ${
                          isActive ? "rotate-90" : "rotate-0"
                        }`}
                        style={{
                          transformOrigin: "center",
                        }}
                      />
                    </Link>
                  );
                }

                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    className={`text-sm font-semibold font-inter transition-colors ${
                      isActive
                        ? "text-[#252B42]"
                        : "text-[#737373] hover:text-[#252B42]"
                    }`}
                  >
                    {link.name}
                  </Link>
                );
              })}
            </div>

            {/* Right Side - Login/Register & Icons */}
            <div className="flex items-center gap-4">
              {/* Login/Register - Desktop Only */}
              <div className="hidden md:flex items-center gap-2">
                <Link
                  href="/login"
                  className="flex items-center gap-1 text-sm font-semibold font-inter text-[#23A6F0] hover:opacity-80 transition-opacity"
                >
                  <User className="w-4 h-4" />
                  <span>Login / Register</span>
                </Link>
              </div>

              {/* Icons */}
              <div className="flex items-center gap-4 mr-[5vw]">
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-[#23A6F0] hover:bg-transparent hover:text-[#6CBDF3] transition-opacity"
                >
                  <Search className="w-5 h-5" />
                </Button>

                <Button
                  variant="ghost"
                  size="icon"
                  className="text-[#23A6F0] hover:bg-transparent hover:text-[#6CBDF3] transition-opacity relative"
                >
                  <ShoppingCart className="w-5 h-5" />
                  <span className=" text-sm font-normal text-[#23A6F0]">1</span>
                </Button>

                <Button
                  variant="ghost"
                  size="icon"
                  className="hidden md:flex text-[#23A6F0] hover:bg-transparent hover:text-[#6CBDF3] transition-opacity relative"
                >
                  <Heart className="w-5 h-5" />
                  <span className=" text-sm font-normal text-[#23A6F0]">1</span>
                </Button>

                {/* Mobile Menu Toggle */}
                <Sheet open={isOpen} onOpenChange={setIsOpen}>
                  <SheetTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="lg:hidden text-[#252B42]"
                    >
                      <Menu className="w-6 h-6" />
                    </Button>
                  </SheetTrigger>
                  <SheetContent side="right" className="w-[300px] sm:w-[400px]">
                    <nav className="flex flex-col gap-4 mt-8">
                      {navLinks.map((link) => (
                        <Link
                          key={link.name}
                          href={link.href}
                          onClick={() => setIsOpen(false)}
                          className="text-lg font-semibold font-inter text-[#737373] hover:text-[#23856D] transition-colors py-2"
                        >
                          {link.name}
                        </Link>
                      ))}
                      <div className="border-t pt-4 mt-4">
                        <Link
                          href="/login"
                          onClick={() => setIsOpen(false)}
                          className="flex items-center gap-2 text-lg font-semibold font-inter text-[#23A6F0] hover:opacity-80 transition-opacity py-2"
                        >
                          <User className="w-5 h-5" />
                          <span>Login / Register</span>
                        </Link>
                      </div>
                    </nav>
                  </SheetContent>
                </Sheet>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
