"use client";
import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Search, ShoppingCart, Heart, User, X } from "lucide-react";
import { Button } from "@/components/ui/Button";

const NavbarMobile = () => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Shop", href: "/shop" },
    { name: "About", href: "/about" },
    { name: "Blog", href: "/blog" },
    { name: "Contact", href: "/contact" },
    { name: "Pages", href: "/pages" },
  ];

  return (
    <nav className="w-full bg-white border-b relative">
      <div className="container mx-auto px-4">
        {/* Top Bar */}
        <div className="flex items-center justify-between h-14">
          {/* Logo */}
          <Link
            href="/"
            className="text-xl font-bold font-inter text-[#252B42]"
          >
            Bookstar
          </Link>

          {/* Right Side - Icons & Mobile Menu Toggle */}
          <div className="flex items-center gap-2">
            {/* Desktop Icons - Hidden on Mobile */}
            <div className="hidden md:flex items-center gap-4">
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
                <span className="absolute -top-1 -right-1 bg-[#23A6F0] text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                  1
                </span>
              </Button>

              <Button
                variant="ghost"
                size="icon"
                className="text-[#23A6F0] hover:bg-transparent hover:text-[#6CBDF3] transition-opacity relative"
              >
                <Heart className="w-5 h-5" />
                <span className="absolute -top-1 -right-1 bg-[#23A6F0] text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                  1
                </span>
              </Button>
            </div>

            {/* Mobile Menu Toggle */}
            <Button
              variant="ghost"
              size="icon"
              className="text-[#252B42] hover:bg-transparent md:hidden"
              onClick={() => setIsOpen(!isOpen)}
              aria-label={isOpen ? "Close menu" : "Open menu"}
            >
              {isOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Image
                  src="/images/OpenMenu.svg"
                  alt="Open menu"
                  width={24}
                  height={24}
                  className="w-6 h-6"
                />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Menu - Expandable Dropdown */}
        <div
          className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
            isOpen ? "max-h-[600px] opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <nav className="flex flex-col items-center gap-6 py-8">
            {/* Navigation Links - Vertically Stacked */}
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className={`text-xl font-normal font-inter transition-colors ${
                    isActive
                      ? "text-[#252B42]"
                      : "text-[#737373] hover:text-[#252B42]"
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}

            {/* Icons Section - Vertically Stacked */}
            <div className="flex flex-col items-center gap-6 pt-4  border-gray-200 w-full max-w-[200px]">
              {/* Login / Register */}
              <Link
                href="/login"
                onClick={() => setIsOpen(false)}
                className="flex items-center gap-2 text-xl font-normal font-inter text-[#23A6F0] hover:opacity-80 transition-opacity"
              >
                <User className="w-5 h-5" />
                <span>Login / Register</span>
              </Link>

              {/* Search Icon */}
              <button
                className="flex items-center gap-3 text-[#23A6F0] hover:opacity-80 transition-opacity"
                onClick={() => setIsOpen(false)}
                aria-label="Search"
              >
                <Search className="w-5 h-5" />
              </button>

              {/* Shopping Cart Icon with Counter */}
              <button
                className="flex items-center gap-3 text-[#23A6F0] hover:opacity-80 transition-opacity"
                onClick={() => setIsOpen(false)}
                aria-label="Shopping cart"
              >
                <ShoppingCart className="w-5 h-5" />
                <span className="text-xl font-normal font-inter text-[#23A6F0]">
                  1
                </span>
              </button>

              {/* Heart Icon with Counter */}
              <button
                className="flex items-center gap-3 text-[#23A6F0] hover:opacity-80 transition-opacity"
                onClick={() => setIsOpen(false)}
                aria-label="Wishlist"
              >
                <Heart className="w-5 h-5" />
                <span className="text-xl font-normal font-inter text-[#23A6F0]">
                  1
                </span>
              </button>
            </div>
          </nav>
        </div>
      </div>
    </nav>
  );
};

export default NavbarMobile;
