"use client";
import React from "react";
import Link from "next/link";
import Navbar from "@/components/ui/Navbar";
import Breadcrumbs from "@/components/ui/Breadcrumb";

export default function PagesPage() {
  const pages = [
    {
      title: "Privacy Policy",
      description:
        "Learn about how we collect, use, and protect your personal information.",
      href: "/pages/privacy",
    },
    {
      title: "Terms of Service",
      description: "Read our terms and conditions for using Bookstar services.",
      href: "/pages/terms",
    },
    {
      title: "Shipping & Returns",
      description: "Information about our shipping options and return policy.",
      href: "/pages/shipping",
    },
    {
      title: "FAQ",
      description:
        "Find answers to frequently asked questions about our services.",
      href: "/pages/faq",
    },
    {
      title: "Careers",
      description:
        "Join our team and help us make reading accessible to everyone.",
      href: "/pages/careers",
    },
    {
      title: "Partner With Us",
      description: "Explore partnership opportunities with Bookstar.",
      href: "/pages/partner",
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <Breadcrumbs />

      <main className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="mb-12">
            <h1 className="text-4xl font-bold font-inter text-[#252B42] mb-4">
              Pages
            </h1>
            <p className="text-lg font-inter text-[#737373]">
              Browse all available pages and resources
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {pages.map((page, index) => (
              <Link
                key={index}
                href={page.href}
                className="block p-6 border rounded-lg hover:shadow-lg hover:border-[#23A6F0] transition-all group"
              >
                <h3 className="text-xl font-bold font-inter text-[#252B42] mb-2 group-hover:text-[#23A6F0] transition-colors">
                  {page.title}
                </h3>
                <p className="text-[#737373] font-inter">{page.description}</p>
                <span className="inline-block mt-4 text-[#23A6F0] font-semibold font-inter group-hover:underline">
                  Learn more →
                </span>
              </Link>
            ))}
          </div>

          <div className="mt-12 p-6 bg-gray-50 rounded-lg">
            <h2 className="text-2xl font-bold font-inter text-[#252B42] mb-4">
              Need Help?
            </h2>
            <p className="text-[#737373] font-inter mb-4">
              Can&apos;t find what you&apos;re looking for? Our customer support
              team is here to help.
            </p>
            <Link
              href="/contact"
              className="inline-block px-6 py-3 bg-[#23A6F0] text-white font-semibold font-inter rounded-md hover:bg-[#1a8cd8] transition-colors"
            >
              Contact Support
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
