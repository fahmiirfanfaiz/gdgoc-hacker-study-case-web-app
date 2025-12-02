"use client";
import React from "react";
import Link from "next/link";
import Navbar from "@/components/ui/Navbar";
import { Home, Search, BookOpen, ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* 404 Content */}
      <section className="min-h-[80vh] flex items-center justify-center py-12 sm:py-16 md:py-20">
        <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-12">
          <div className="max-w-4xl mx-auto text-center">
            {/* 404 Number */}
            <div className="relative mb-8 sm:mb-12">
              <h1 className="text-[120px] sm:text-[180px] md:text-[240px] font-bold font-inter text-gray-100 leading-none select-none">
                404
              </h1>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-20 h-20 sm:w-28 sm:h-28 md:w-36 md:h-36 bg-linear-to-br from-[#252B42] to-[#3E4A6B] rounded-full flex items-center justify-center">
                  <BookOpen className="w-10 h-10 sm:w-14 sm:h-14 md:w-20 md:h-20 text-white" />
                </div>
              </div>
            </div>

            {/* Error Message */}
            <div className="mb-8 sm:mb-12">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold font-inter text-[#252B42] mb-4 sm:mb-6">
                Oops! Page Not Found
              </h2>
              <p className="text-base sm:text-lg md:text-xl text-[#737373] font-inter max-w-2xl mx-auto mb-2">
                The page you&apos;re looking for seems to have disappeared into
                the library stacks.
              </p>
              <p className="text-sm sm:text-base text-[#737373] font-inter">
                Don&apos;t worry, we&apos;ll help you find your way back!
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12 sm:mb-16">
              <Link
                href="/"
                className="inline-flex items-center justify-center gap-2 px-6 sm:px-8 py-3 sm:py-4 bg-[#252B42] text-white font-semibold rounded-lg hover:bg-[#3E4A6B] transition-colors text-base sm:text-lg"
              >
                <Home className="h-5 w-5" />
                Back to Home
              </Link>
              <Link
                href="/shop"
                className="inline-flex items-center justify-center gap-2 px-6 sm:px-8 py-3 sm:py-4 bg-white text-[#252B42] font-semibold rounded-lg hover:bg-gray-50 border-2 border-[#252B42] transition-colors text-base sm:text-lg"
              >
                <Search className="h-5 w-5" />
                Browse Books
              </Link>
            </div>

            {/* Quick Links */}
            <div className="border-t border-gray-200 pt-8 sm:pt-12">
              <p className="text-sm sm:text-base text-[#737373] font-inter mb-4 sm:mb-6">
                Or try one of these popular pages:
              </p>
              <div className="flex flex-wrap gap-3 sm:gap-4 justify-center">
                <Link
                  href="/about"
                  className="inline-flex items-center gap-2 px-4 sm:px-6 py-2 sm:py-3 bg-gray-100 text-[#252B42] font-semibold rounded-lg hover:bg-gray-200 transition-colors text-sm sm:text-base"
                >
                  About Us
                </Link>
                <Link
                  href="/blog"
                  className="inline-flex items-center gap-2 px-4 sm:px-6 py-2 sm:py-3 bg-gray-100 text-[#252B42] font-semibold rounded-lg hover:bg-gray-200 transition-colors text-sm sm:text-base"
                >
                  Blog
                </Link>
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 px-4 sm:px-6 py-2 sm:py-3 bg-gray-100 text-[#252B42] font-semibold rounded-lg hover:bg-gray-200 transition-colors text-sm sm:text-base"
                >
                  Contact
                </Link>
                <Link
                  href="/reading-list"
                  className="inline-flex items-center gap-2 px-4 sm:px-6 py-2 sm:py-3 bg-gray-100 text-[#252B42] font-semibold rounded-lg hover:bg-gray-200 transition-colors text-sm sm:text-base"
                >
                  Reading List
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Helpful Section */}
      <section className="bg-gray-50 py-12 sm:py-16">
        <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-12">
          <div className="max-w-3xl mx-auto">
            <h3 className="text-xl sm:text-2xl font-bold font-inter text-[#252B42] mb-6 text-center">
              Need Help?
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
              <div className="bg-white p-6 rounded-lg border border-gray-200 text-center">
                <div className="w-12 h-12 bg-[#252B42] rounded-lg flex items-center justify-center mx-auto mb-3">
                  <Search className="h-6 w-6 text-white" />
                </div>
                <h4 className="text-base sm:text-lg font-bold font-inter text-[#252B42] mb-2">
                  Search
                </h4>
                <p className="text-sm text-[#737373] font-inter">
                  Try searching for what you need
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg border border-gray-200 text-center">
                <div className="w-12 h-12 bg-[#252B42] rounded-lg flex items-center justify-center mx-auto mb-3">
                  <BookOpen className="h-6 w-6 text-white" />
                </div>
                <h4 className="text-base sm:text-lg font-bold font-inter text-[#252B42] mb-2">
                  Browse
                </h4>
                <p className="text-sm text-[#737373] font-inter">
                  Explore our book collection
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg border border-gray-200 text-center">
                <div className="w-12 h-12 bg-[#252B42] rounded-lg flex items-center justify-center mx-auto mb-3">
                  <ArrowLeft className="h-6 w-6 text-white" />
                </div>
                <h4 className="text-base sm:text-lg font-bold font-inter text-[#252B42] mb-2">
                  Go Back
                </h4>
                <p className="text-sm text-[#737373] font-inter">
                  Return to previous page
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
