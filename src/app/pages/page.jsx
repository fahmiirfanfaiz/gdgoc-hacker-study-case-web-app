"use client";
import React from "react";
import Link from "next/link";
import Navbar from "@/components/ui/Navbar";
import Breadcrumbs from "@/components/ui/Breadcrumb";
import {
  Home,
  ShoppingBag,
  BookOpen,
  Info,
  Mail,
  FileText,
  Shield,
  HelpCircle,
  Briefcase,
  Handshake,
  Truck,
  ChevronRight,
} from "lucide-react";

export default function PagesPage() {
  const mainPages = [
    {
      title: "Home",
      description: "Return to the homepage and explore our latest features",
      href: "/",
      icon: Home,
      color: "bg-blue-500",
    },
    {
      title: "Shop",
      description: "Browse our extensive collection of amazing books",
      href: "/shop",
      icon: ShoppingBag,
      color: "bg-green-500",
    },
    {
      title: "Reading List",
      description: "View and manage your personal reading list",
      href: "/reading-list",
      icon: BookOpen,
      color: "bg-purple-500",
    },
    {
      title: "About Us",
      description: "Learn more about Bookstar and our mission",
      href: "/about",
      icon: Info,
      color: "bg-indigo-500",
    },
    {
      title: "Blog",
      description: "Read our latest articles and book recommendations",
      href: "/blog",
      icon: FileText,
      color: "bg-orange-500",
    },
    {
      title: "Contact",
      description: "Get in touch with our support team",
      href: "/contact",
      icon: Mail,
      color: "bg-red-500",
    },
  ];

  const resourcePages = [
    {
      title: "Privacy Policy",
      description:
        "Learn about how we collect, use, and protect your personal information",
      icon: Shield,
    },
    {
      title: "Terms of Service",
      description: "Read our terms and conditions for using Bookstar services",
      icon: FileText,
    },
    {
      title: "Shipping & Returns",
      description: "Information about our shipping options and return policy",
      icon: Truck,
    },
    {
      title: "FAQ",
      description:
        "Find answers to frequently asked questions about our services",
      icon: HelpCircle,
    },
    {
      title: "Careers",
      description:
        "Join our team and help us make reading accessible to everyone",
      icon: Briefcase,
    },
    {
      title: "Partner With Us",
      description: "Explore partnership opportunities with Bookstar",
      icon: Handshake,
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <Breadcrumbs />

      {/* Hero Section */}
      <section className="bg-linear-to-r from-[#252B42] to-[#3E4A6B] text-white py-12 sm:py-16 md:py-20">
        <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-12">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold font-inter mb-4 sm:mb-6">
              Sitemap
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-gray-200">
              Navigate through all available pages and resources on Bookstar
            </p>
          </div>
        </div>
      </section>

      {/* Main Pages */}
      <section className="py-12 sm:py-16 md:py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-12">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-2xl sm:text-3xl font-bold font-inter text-[#252B42] mb-6 sm:mb-8">
              Main Pages
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {mainPages.map((page, index) => (
                <Link
                  key={index}
                  href={page.href}
                  className="group bg-white border border-gray-200 rounded-lg p-6 hover:shadow-xl transition-all hover:border-[#252B42]"
                >
                  <div className="flex items-start gap-4">
                    <div
                      className={`w-12 h-12 ${page.color} rounded-lg flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform`}
                    >
                      <page.icon className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="text-lg font-bold font-inter text-[#252B42] group-hover:text-[#3E4A6B]">
                          {page.title}
                        </h3>
                        <ChevronRight className="h-5 w-5 text-gray-400 group-hover:text-[#252B42] group-hover:translate-x-1 transition-all" />
                      </div>
                      <p className="text-sm text-[#737373] font-inter">
                        {page.description}
                      </p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Resource Pages */}
      <section className="py-12 sm:py-16 md:py-20 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-12">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-2xl sm:text-3xl font-bold font-inter text-[#252B42] mb-6 sm:mb-8">
              Resources & Information
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {resourcePages.map((page, index) => (
                <div
                  key={index}
                  className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-[#252B42] rounded-lg flex items-center justify-center shrink-0">
                      <page.icon className="h-6 w-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-bold font-inter text-[#252B42] mb-2">
                        {page.title}
                      </h3>
                      <p className="text-sm text-[#737373] font-inter">
                        {page.description}
                      </p>
                      <p className="text-xs text-[#737373] font-inter mt-3 italic">
                        Coming soon
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Quick Links */}
      <section className="py-12 sm:py-16 md:py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-12">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-2xl sm:text-3xl font-bold font-inter text-[#252B42] mb-4 sm:mb-6">
              Can&apos;t Find What You&apos;re Looking For?
            </h2>
            <p className="text-base sm:text-lg text-[#737373] font-inter mb-6 sm:mb-8">
              Visit our contact page or check out our FAQ for more information
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contact"
                className="px-6 sm:px-8 py-3 sm:py-4 bg-[#252B42] text-white font-semibold rounded-lg hover:bg-[#3E4A6B] transition-colors text-base sm:text-lg"
              >
                Contact Us
              </Link>
              <Link
                href="/"
                className="px-6 sm:px-8 py-3 sm:py-4 bg-white text-[#252B42] font-semibold rounded-lg hover:bg-gray-50 border-2 border-[#252B42] transition-colors text-base sm:text-lg"
              >
                Back to Home
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
