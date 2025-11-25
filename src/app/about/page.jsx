"use client";
import React from "react";
import Navbar from "@/components/ui/Navbar";
import Breadcrumbs from "@/components/ui/Breadcrumb";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <Breadcrumbs />

      {/* About Page Content */}
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold font-inter text-[#252B42] mb-6">
            About Bookstar
          </h1>

          <div className="space-y-6 text-[#737373] font-inter">
            <p className="text-lg leading-relaxed">
              Welcome to Bookstar, your trusted destination for discovering
              amazing books. We are passionate about bringing readers and books
              together, creating a community of book lovers who share the joy of
              reading.
            </p>

            <p className="text-lg leading-relaxed">
              Our mission is to make quality books accessible to everyone.
              Whether you&apos;re looking for the latest bestsellers, timeless
              classics, or hidden gems, we&apos;ve curated a collection that
              caters to all reading preferences.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
              <div className="p-6 bg-gray-50 rounded-lg">
                <h3 className="text-xl font-bold text-[#252B42] mb-3">
                  Our Mission
                </h3>
                <p className="text-[#737373]">
                  To inspire and nurture the love of reading by providing access
                  to diverse and quality books for everyone.
                </p>
              </div>

              <div className="p-6 bg-gray-50 rounded-lg">
                <h3 className="text-xl font-bold text-[#252B42] mb-3">
                  Our Vision
                </h3>
                <p className="text-[#737373]">
                  To become the leading online bookstore that connects readers
                  with the stories that matter most to them.
                </p>
              </div>

              <div className="p-6 bg-gray-50 rounded-lg">
                <h3 className="text-xl font-bold text-[#252B42] mb-3">
                  Our Values
                </h3>
                <p className="text-[#737373]">
                  Quality, accessibility, community, and a genuine passion for
                  books and reading culture.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
