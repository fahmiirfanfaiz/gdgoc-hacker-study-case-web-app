"use client";
import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Search, ShoppingCart, Heart, Menu, User } from "lucide-react";
import { Button } from "@/components/ui/Button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
} from "@/components/ui/Sheet";

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
    <nav className="w-full bg-white border-b">
      <div className="container mx-auto px-4">
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
              <SheetContent side="top" className="w-full bg-white">
                <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
                <nav className="flex flex-col items-center gap-6 mt-12">
                  {/* Navigation Links - Vertically Stacked */}
                  {navLinks.map((link) => {
                    const isActive = pathname === link.href;
                    return (
                      <Link
                        key={link.name}
                        href={link.href}
                        onClick={() => setIsOpen(false)}
                        className={`text-2xl font-normal font-inter transition-colors ${
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
                  <div className="flex flex-col items-center gap-6 pt-6">
                    {/* Login / Register - Vertically Stacked */}
                    <Link
                      href="/login"
                      onClick={() => setIsOpen(false)}
                      className="flex items-center gap-2 text-2xl font-normal font-inter text-[#23A6F0] hover:opacity-80 transition-opacity"
                    >
                      <User className="w-6 h-6 " />
                      <span>Login / Register</span>
                    </Link>
                    {/* Search Icon */}
                    <button
                      className="flex items-center gap-3 text-[#23A6F0] hover:opacity-80 transition-opacity"
                      onClick={() => setIsOpen(false)}
                    >
                      <Search className="w-6 h-6" />
                    </button>

                    {/* Shopping Cart Icon with Counter */}
                    <button
                      className="flex items-center gap-3 text-[#23A6F0] hover:opacity-80 transition-opacity"
                      onClick={() => setIsOpen(false)}
                    >
                      <ShoppingCart className="w-6 h-6" />
                      <span className="text-2xl font-normal font-inter text-[#23A6F0]">
                        1
                      </span>
                    </button>

                    {/* Heart Icon with Counter */}
                    <button
                      className="flex items-center gap-3 text-[#23A6F0] hover:opacity-80 transition-opacity"
                      onClick={() => setIsOpen(false)}
                    >
                      <Heart className="w-6 h-6" />
                      <span className="text-2xl font-normal font-inter text-[#23A6F0]">
                        1
                      </span>
                    </button>
                  </div>
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavbarMobile;
