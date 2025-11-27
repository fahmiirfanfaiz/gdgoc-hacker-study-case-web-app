"use client";
import React from "react";
import NavbarDesktop from "@/components/ui/NavbarDesktop";
import NavbarTablet from "@/components/ui/NavbarTablet";
import NavbarMobile from "@/components/ui/NavbarMobile";

const Navbar = () => {
  return (
    <>
      {/* Desktop Navbar - Hidden on medium and small screens */}
      <div className="hidden lg:block">
        <NavbarDesktop />
      </div>

      {/* Tablet Navbar - Hidden on large and small screens */}
      <div className="hidden md:block lg:hidden">
        <NavbarTablet />
      </div>

      {/* Mobile Navbar - Hidden on medium and large screens */}
      <div className="block md:hidden">
        <NavbarMobile />
      </div>
    </>
  );
};

export default Navbar;
