"use client";
import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Search, ShoppingCart, Heart, Menu, User } from "lucide-react";
import { Button } from "@/components/ui/Button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
} from "@/components/ui/Sheet";

const NavbarTablet = () => {
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
    <nav className="w-full bg-white border-b">
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between h-[70px]">
          {/* Logo */}
          <Link
            href="/"
            className="text-2xl font-bold font-inter text-[#252B42]"
          >
            Bandage
          </Link>

          {/* Center - Icons for Tablet */}
          <div className="flex items-center gap-4">
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

          {/* Right Side - Mobile Menu Toggle */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="text-[#252B42] hover:bg-transparent"
              >
                <Menu className="w-6 h-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-full sm:w-[400px] bg-white">
              <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
              <nav className="flex flex-col items-center gap-8 mt-16">
                {/* Navigation Links - Vertically Stacked */}
                {navLinks.map((link) => {
                  const isActive = pathname === link.href;
                  return (
                    <Link
                      key={link.name}
                      href={link.href}
                      onClick={() => setIsOpen(false)}
                      className={`text-[30px] font-normal font-inter transition-colors ${
                        isActive
                          ? "text-[#252B42]"
                          : "text-[#737373] hover:text-[#252B42]"
                      }`}
                    >
                      {link.name}
                    </Link>
                  );
                })}

                {/* Login / Register - Vertically Stacked */}
                <Link
                  href="/login"
                  onClick={() => setIsOpen(false)}
                  className="flex items-center gap-2 text-[30px] font-normal font-inter text-[#23A6F0] hover:opacity-80 transition-opacity"
                >
                  <User className="w-7 h-7" />
                  <span>Login / Register</span>
                </Link>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
};

export default NavbarTablet;
