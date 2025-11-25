"use client";
import React from "react";
import Navbar from "@/components/ui/Navbar";
import Breadcrumbs from "@/components/ui/Breadcrumb";

export default function BlogPage() {
  const blogPosts = [
    {
      id: 1,
      title: "10 Must-Read Books This Season",
      excerpt:
        "Discover our curated list of must-read books that you shouldn't miss this season.",
      date: "November 20, 2025",
      category: "Reading Lists",
    },
    {
      id: 2,
      title: "How to Build Your Personal Library",
      excerpt:
        "Tips and tricks for creating a personal library that reflects your reading journey.",
      date: "November 18, 2025",
      category: "Tips & Guides",
    },
    {
      id: 3,
      title: "The Benefits of Reading Daily",
      excerpt:
        "Explore the science-backed benefits of making reading a daily habit.",
      date: "November 15, 2025",
      category: "Lifestyle",
    },
    {
      id: 4,
      title: "Meet Our Author of the Month",
      excerpt:
        "An exclusive interview with this month's featured author and their latest work.",
      date: "November 10, 2025",
      category: "Interviews",
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <Breadcrumbs />

      {/* Blog Page Content */}
      <main className="container mx-auto px-4 py-12">
        <div className="mb-8">
          <h1 className="text-4xl font-bold font-inter text-[#252B42] mb-4">
            Blog
          </h1>
          <p className="text-lg font-inter text-[#737373]">
            Latest news, reading tips, and book recommendations
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post) => (
            <article
              key={post.id}
              className="border rounded-lg overflow-hidden hover:shadow-lg transition-shadow"
            >
              <div className="w-full h-48 bg-gray-200 flex items-center justify-center">
                <span className="text-gray-400 font-inter">Blog Image</span>
              </div>
              <div className="p-6">
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-xs font-semibold font-inter text-[#23A6F0] uppercase">
                    {post.category}
                  </span>
                  <span className="text-xs font-inter text-[#737373]">
                    {post.date}
                  </span>
                </div>
                <h3 className="text-xl font-bold font-inter text-[#252B42] mb-2">
                  {post.title}
                </h3>
                <p className="text-[#737373] font-inter mb-4">{post.excerpt}</p>
                <button className="text-[#23A6F0] font-semibold font-inter hover:underline">
                  Read More →
                </button>
              </div>
            </article>
          ))}
        </div>

        {/* Pagination */}
        <div className="flex justify-center gap-2 mt-12">
          <button className="px-4 py-2 border rounded-md hover:bg-gray-50 font-inter text-[#23A6F0]">
            Previous
          </button>
          <button className="px-4 py-2 bg-[#23A6F0] text-white rounded-md font-inter">
            1
          </button>
          <button className="px-4 py-2 border rounded-md hover:bg-gray-50 font-inter text-[#23A6F0]">
            2
          </button>
          <button className="px-4 py-2 border rounded-md hover:bg-gray-50 font-inter text-[#23A6F0]">
            3
          </button>
          <button className="px-4 py-2 border rounded-md hover:bg-gray-50 font-inter text-[#23A6F0]">
            Next
          </button>
        </div>
      </main>
    </div>
  );
}
