"use client";
import React from "react";
import Link from "next/link";
import Navbar from "@/components/ui/Navbar";
import Breadcrumbs from "@/components/ui/Breadcrumb";
import { Button } from "@/components/ui/Button";
import { ShoppingCart, Heart, BookOpen, TrendingUp } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <Breadcrumbs />

      {/* Hero Section */}
      <section className="relative bg-linear-to-r from-[#252B42] to-[#3E4A6B] text-white">
        <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-12 py-16 sm:py-20 md:py-24 lg:py-28">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <div className="text-center lg:text-left">
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold font-inter mb-4 sm:mb-6">
                Welcome to Bookstar
              </h1>
              <p className="text-base sm:text-lg md:text-xl text-gray-200 mb-6 sm:mb-8 max-w-xl mx-auto lg:mx-0">
                Your one-stop destination for discovering amazing books. Explore
                our curated collection and find your next great read.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Link href="/shop">
                  <Button className="bg-white text-[#252B42] hover:bg-gray-100 px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg font-semibold rounded-lg w-full sm:w-auto">
                    <ShoppingCart className="mr-2 h-5 w-5" />
                    Start Shopping
                  </Button>
                </Link>
                <Link href="/reading-list">
                  <Button className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-[#252B42] px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg font-semibold rounded-lg w-full sm:w-auto">
                    <Heart className="mr-2 h-5 w-5" />
                    View Reading List
                  </Button>
                </Link>
              </div>
            </div>
            <div className="hidden lg:block">
              <div className="relative h-64 md:h-80 lg:h-96 bg-white/10 rounded-lg backdrop-blur-sm flex items-center justify-center">
                <BookOpen className="h-32 w-32 text-white/50" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-12 sm:py-16 md:py-20 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-12">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold font-inter text-[#252B42] mb-3 sm:mb-4">
              Why Choose Bookstar?
            </h2>
            <p className="text-base sm:text-lg text-[#737373] font-inter max-w-2xl mx-auto">
              We offer the best book shopping experience with curated
              collections and personalized recommendations
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            <div className="bg-white p-6 sm:p-8 rounded-lg shadow-md hover:shadow-xl transition-shadow">
              <div className="w-12 h-12 sm:w-14 sm:h-14 bg-[#252B42] rounded-lg flex items-center justify-center mb-4">
                <BookOpen className="h-6 w-6 sm:h-7 sm:w-7 text-white" />
              </div>
              <h3 className="text-lg sm:text-xl font-bold font-inter text-[#252B42] mb-3">
                Curated Collection
              </h3>
              <p className="text-sm sm:text-base text-[#737373] font-inter">
                Hand-picked books across all genres to ensure quality and
                variety for every reader
              </p>
            </div>

            <div className="bg-white p-6 sm:p-8 rounded-lg shadow-md hover:shadow-xl transition-shadow">
              <div className="w-12 h-12 sm:w-14 sm:h-14 bg-[#252B42] rounded-lg flex items-center justify-center mb-4">
                <Heart className="h-6 w-6 sm:h-7 sm:w-7 text-white" />
              </div>
              <h3 className="text-lg sm:text-xl font-bold font-inter text-[#252B42] mb-3">
                Personal Reading List
              </h3>
              <p className="text-sm sm:text-base text-[#737373] font-inter">
                Save your favorite books and build your personal reading list
                for future reference
              </p>
            </div>

            <div className="bg-white p-6 sm:p-8 rounded-lg shadow-md hover:shadow-xl transition-shadow">
              <div className="w-12 h-12 sm:w-14 sm:h-14 bg-[#252B42] rounded-lg flex items-center justify-center mb-4">
                <TrendingUp className="h-6 w-6 sm:h-7 sm:w-7 text-white" />
              </div>
              <h3 className="text-lg sm:text-xl font-bold font-inter text-[#252B42] mb-3">
                Latest Trends
              </h3>
              <p className="text-sm sm:text-base text-[#737373] font-inter">
                Stay updated with the latest bestsellers and trending books in
                the literary world
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 sm:py-16 md:py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-12">
          <div className="bg-linear-to-r from-[#252B42] to-[#3E4A6B] rounded-xl sm:rounded-2xl p-8 sm:p-12 md:p-16 text-center text-white">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold font-inter mb-4 sm:mb-6">
              Ready to Start Your Reading Journey?
            </h2>
            <p className="text-base sm:text-lg text-gray-200 mb-6 sm:mb-8 max-w-2xl mx-auto">
              Explore our extensive collection of books and discover your next
              favorite story
            </p>
            <Link href="/shop">
              <Button className="bg-white text-[#252B42] hover:bg-gray-100 px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg font-semibold rounded-lg">
                Browse Books Now
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
