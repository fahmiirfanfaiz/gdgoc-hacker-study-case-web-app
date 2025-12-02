"use client";
import React, { useState } from "react";
import Navbar from "@/components/ui/Navbar";
import Breadcrumbs from "@/components/ui/Breadcrumb";
import { Button } from "@/components/ui/Button";
import { Calendar, Clock, Tag, ChevronLeft, ChevronRight } from "lucide-react";

export default function BlogPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const articlesPerPage = 6;

  const blogPosts = [
    {
      id: 1,
      title: "10 Must-Read Books This Season",
      excerpt:
        "Discover our curated list of must-read books that you shouldn't miss this season. From thrilling mysteries to heartwarming romances.",
      date: "November 20, 2025",
      category: "Reading Lists",
      readTime: "5 min read",
      image: "📚",
    },
    {
      id: 2,
      title: "How to Build Your Personal Library",
      excerpt:
        "Tips and tricks for creating a personal library that reflects your reading journey and helps organize your collection effectively.",
      date: "November 18, 2025",
      category: "Tips & Guides",
      readTime: "7 min read",
      image: "📖",
    },
    {
      id: 3,
      title: "The Benefits of Reading Daily",
      excerpt:
        "Explore the science-backed benefits of making reading a daily habit, from improved focus to enhanced creativity.",
      date: "November 15, 2025",
      category: "Lifestyle",
      readTime: "6 min read",
      image: "🧠",
    },
    {
      id: 4,
      title: "Meet Our Author of the Month",
      excerpt:
        "An exclusive interview with this month's featured author and their latest work that's captivating readers worldwide.",
      date: "November 10, 2025",
      category: "Interviews",
      readTime: "10 min read",
      image: "✍️",
    },
    {
      id: 5,
      title: "Book Club Recommendations",
      excerpt:
        "Perfect books for your next book club meeting that will spark engaging discussions and debates.",
      date: "November 5, 2025",
      category: "Reading Lists",
      readTime: "4 min read",
      image: "👥",
    },
    {
      id: 6,
      title: "The Art of Speed Reading",
      excerpt:
        "Learn proven techniques to read faster while maintaining comprehension and retention.",
      date: "November 1, 2025",
      category: "Tips & Guides",
      readTime: "8 min read",
      image: "⚡",
    },
    {
      id: 7,
      title: "Classic Books Everyone Should Read",
      excerpt:
        "Timeless classics that have shaped literature and continue to inspire readers across generations.",
      date: "October 28, 2025",
      category: "Reading Lists",
      readTime: "6 min read",
      image: "📕",
    },
    {
      id: 8,
      title: "Creating the Perfect Reading Space",
      excerpt:
        "Transform any corner of your home into a cozy reading nook that invites relaxation and focus.",
      date: "October 25, 2025",
      category: "Lifestyle",
      readTime: "5 min read",
      image: "🛋️",
    },
  ];

  const categories = [
    "All",
    "Reading Lists",
    "Tips & Guides",
    "Lifestyle",
    "Interviews",
  ];

  const filteredPosts =
    selectedCategory === "All"
      ? blogPosts
      : blogPosts.filter((post) => post.category === selectedCategory);

  const totalPages = Math.ceil(filteredPosts.length / articlesPerPage);
  const indexOfLastPost = currentPage * articlesPerPage;
  const indexOfFirstPost = indexOfLastPost - articlesPerPage;
  const currentPosts = filteredPosts.slice(indexOfFirstPost, indexOfLastPost);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    setCurrentPage(1);
  };

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <Breadcrumbs />

      {/* Hero Section */}
      <section className="bg-linear-to-r from-[#252B42] to-[#3E4A6B] text-white py-12 sm:py-16 md:py-20">
        <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-12">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold font-inter mb-4 sm:mb-6">
              Book Blog
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-gray-200">
              Stories, insights, and recommendations from the world of books
            </p>
          </div>
        </div>
      </section>

      {/* Category Filter */}
      <section className="py-6 sm:py-8 bg-gray-50 sticky top-0 z-10 border-b border-gray-200">
        <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-12">
          <div className="flex flex-wrap gap-2 sm:gap-3 justify-center">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => handleCategoryChange(category)}
                className={`px-4 sm:px-6 py-2 sm:py-3 rounded-lg font-inter text-sm sm:text-base font-semibold transition-all ${
                  selectedCategory === category
                    ? "bg-[#252B42] text-white shadow-md"
                    : "bg-white text-[#737373] hover:bg-gray-100 border border-gray-200"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Blog Posts Grid */}
      <section className="py-12 sm:py-16 md:py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-12">
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 sm:gap-8 mb-8 sm:mb-12">
            {currentPosts.map((post) => (
              <article
                key={post.id}
                className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-xl transition-shadow group cursor-pointer"
              >
                <div className="bg-linear-to-br from-[#252B42] to-[#3E4A6B] h-48 sm:h-56 flex items-center justify-center text-6xl sm:text-7xl group-hover:scale-105 transition-transform">
                  {post.image}
                </div>
                <div className="p-5 sm:p-6">
                  <div className="flex items-center gap-2 mb-3">
                    <Tag className="h-4 w-4 text-[#737373]" />
                    <span className="text-xs sm:text-sm text-[#737373] font-inter font-semibold">
                      {post.category}
                    </span>
                  </div>
                  <h2 className="text-lg sm:text-xl font-bold font-inter text-[#252B42] mb-3 group-hover:text-[#3E4A6B] transition-colors">
                    {post.title}
                  </h2>
                  <p className="text-sm sm:text-base text-[#737373] font-inter mb-4 line-clamp-3">
                    {post.excerpt}
                  </p>
                  <div className="flex items-center justify-between text-xs sm:text-sm text-[#737373] font-inter">
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      <span>{post.date}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      <span>{post.readTime}</span>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-2 sm:gap-3">
              <Button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="px-3 sm:px-4 py-2 bg-white border border-gray-300 text-[#252B42] hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg"
              >
                <ChevronLeft className="h-4 w-4 sm:h-5 sm:w-5" />
                <span className="hidden sm:inline ml-1">Previous</span>
              </Button>

              {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                (pageNumber) => (
                  <Button
                    key={pageNumber}
                    onClick={() => handlePageChange(pageNumber)}
                    className={`px-3 sm:px-4 py-2 rounded-lg font-inter text-sm sm:text-base font-semibold transition-all ${
                      currentPage === pageNumber
                        ? "bg-[#252B42] text-white shadow-md"
                        : "bg-white text-[#737373] hover:bg-gray-100 border border-gray-200"
                    }`}
                  >
                    {pageNumber}
                  </Button>
                )
              )}

              <Button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="px-3 sm:px-4 py-2 bg-white border border-gray-300 text-[#252B42] hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg"
              >
                <span className="hidden sm:inline mr-1">Next</span>
                <ChevronRight className="h-4 w-4 sm:h-5 sm:w-5" />
              </Button>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
