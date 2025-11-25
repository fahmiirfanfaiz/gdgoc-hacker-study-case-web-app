"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import {
  ChevronLeft,
  ChevronRight,
  Heart,
  ShoppingCart,
  Eye,
} from "lucide-react";
import Navbar from "@/components/ui/Navbar";
import Breadcrumbs from "@/components/ui/Breadcrumb";
import { Button } from "@/components/ui/Button";

export default function ShopPage() {
  const [books, setBooks] = useState([]);
  const [currentBookIndex, setCurrentBookIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch books from API
  useEffect(() => {
    async function fetchBooks() {
      try {
        setLoading(true);
        const response = await fetch(
          "https://bukuacak-9bdcb4ef2605.herokuapp.com/api/v1/book?page=1&limit=10"
        );
        const data = await response.json();
        setBooks(data.books || []);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    }
    fetchBooks();
  }, []);

  // Navigation functions
  const nextBook = () => {
    setCurrentBookIndex((prev) => (prev + 1) % books.length);
  };

  const prevBook = () => {
    setCurrentBookIndex((prev) => (prev - 1 + books.length) % books.length);
  };

  // Parse price string to number
  const parsePrice = (priceStr) => {
    if (!priceStr || priceStr === "0") return 0;
    return parseFloat(priceStr.replace(/[^0-9.]/g, ""));
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white">
        <Navbar />
        <Breadcrumbs />
        <div className="flex items-center justify-center h-96">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#23A6F0] mx-auto mb-4"></div>
            <p className="text-gray-600 font-inter">Loading books...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-white">
        <Navbar />
        <Breadcrumbs />
        <div className="flex items-center justify-center h-96">
          <div className="text-center">
            <p className="text-red-600 font-inter mb-4">Error: {error}</p>
            <Button onClick={() => window.location.reload()}>Try Again</Button>
          </div>
        </div>
      </div>
    );
  }

  if (books.length === 0) {
    return (
      <div className="min-h-screen bg-white">
        <Navbar />
        <Breadcrumbs />
        <div className="flex items-center justify-center h-96">
          <p className="text-gray-600 font-inter">No books found</p>
        </div>
      </div>
    );
  }

  const currentBook = books[currentBookIndex];
  const price = parsePrice(currentBook.details.price);
  const discountedPrice = price * 0.8; // 20% discount for demo

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <Breadcrumbs />

      {/* Product Detail Section */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Left: Image Swiper */}
          <div className="relative">
            {/* Main Image */}
            <div className="relative aspect-3/4 bg-[#F5F5F5] rounded-lg overflow-hidden mb-4">
              <Image
                src={currentBook.cover_image || "/placeholder-book.jpg"}
                alt={currentBook.title}
                fill
                className="object-contain p-8"
                unoptimized
              />

              {/* Navigation Arrows */}
              <button
                onClick={prevBook}
                className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white p-3 rounded-full shadow-lg transition-all z-10"
                aria-label="Previous book"
              >
                <ChevronLeft className="w-6 h-6 text-[#252B42]" />
              </button>
              <button
                onClick={nextBook}
                className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white p-3 rounded-full shadow-lg transition-all z-10"
                aria-label="Next book"
              >
                <ChevronRight className="w-6 h-6 text-[#252B42]" />
              </button>
            </div>

            {/* Thumbnail Navigation */}
            <div className="flex gap-4 overflow-x-auto pb-2">
              {books.slice(0, 4).map((book, index) => (
                <button
                  key={book._id}
                  onClick={() => setCurrentBookIndex(index)}
                  className={`shrink-0 w-20 h-28 rounded-lg overflow-hidden border-2 transition-all ${
                    index === currentBookIndex
                      ? "border-[#23A6F0] ring-2 ring-[#23A6F0]/20"
                      : "border-gray-200 hover:border-[#23A6F0]/50"
                  }`}
                >
                  <Image
                    src={book.cover_image || "/placeholder-book.jpg"}
                    alt={book.title}
                    width={80}
                    height={112}
                    className="w-full h-full object-cover"
                    unoptimized
                  />
                </button>
              ))}
            </div>

            {/* Book Counter */}
            <div className="text-center mt-4">
              <p className="text-sm font-inter text-gray-600">
                Book {currentBookIndex + 1} of {books.length}
              </p>
            </div>
          </div>

          {/* Right: Product Info */}
          <div className="space-y-6">
            {/* Title */}
            <div>
              <h1 className="text-3xl lg:text-4xl font-bold font-inter text-[#252B42] mb-3">
                {currentBook.title}
              </h1>
              <p className="text-lg font-inter text-gray-600">
                by {currentBook.author.name}
              </p>
            </div>

            {/* Tags/Categories */}
            <div className="flex flex-wrap gap-2">
              {currentBook.category && (
                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold font-inter bg-[#23856D] text-white">
                  {currentBook.category.name}
                </span>
              )}
              {currentBook.tags?.slice(0, 2).map((tag, index) => (
                <span
                  key={index}
                  className="inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold font-inter bg-[#23A6F0] text-white"
                >
                  {tag.name}
                </span>
              ))}
            </div>

            {/* Price */}
            <div className="flex items-baseline gap-4">
              <span className="text-4xl font-bold font-inter text-[#23856D]">
                Rp {discountedPrice.toLocaleString("id-ID")}
              </span>
              {price > 0 && (
                <span className="text-2xl font-semibold font-inter text-gray-400 line-through">
                  {currentBook.details.price}
                </span>
              )}
            </div>

            {/* Availability */}
            <div className="flex items-center gap-2">
              <span className="text-sm font-semibold font-inter text-gray-700">
                Availability:
              </span>
              <span className="text-sm font-bold font-inter text-[#23A6F0]">
                In Stock
              </span>
            </div>

            {/* Summary */}
            <div className="border-t pt-6">
              <h3 className="text-lg font-bold font-inter text-[#252B42] mb-3">
                Description
              </h3>
              <p className="text-sm font-inter text-gray-600 leading-relaxed line-clamp-6">
                {currentBook.summary || "No description available."}
              </p>
            </div>

            {/* Details Grid */}
            <div className="border-t pt-6 grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm font-semibold font-inter text-gray-700">
                  Pages
                </p>
                <p className="text-sm font-inter text-gray-600">
                  {currentBook.details.total_pages || "N/A"}
                </p>
              </div>
              <div>
                <p className="text-sm font-semibold font-inter text-gray-700">
                  Publisher
                </p>
                <p className="text-sm font-inter text-gray-600">
                  {currentBook.publisher || "N/A"}
                </p>
              </div>
              <div>
                <p className="text-sm font-semibold font-inter text-gray-700">
                  ISBN
                </p>
                <p className="text-sm font-inter text-gray-600">
                  {currentBook.details.isbn || "N/A"}
                </p>
              </div>
              <div>
                <p className="text-sm font-semibold font-inter text-gray-700">
                  Published
                </p>
                <p className="text-sm font-inter text-gray-600">
                  {currentBook.details.published_date || "N/A"}
                </p>
              </div>
              <div>
                <p className="text-sm font-semibold font-inter text-gray-700">
                  Format
                </p>
                <p className="text-sm font-inter text-gray-600">
                  {currentBook.details.format || "N/A"}
                </p>
              </div>
              <div>
                <p className="text-sm font-semibold font-inter text-gray-700">
                  Size
                </p>
                <p className="text-sm font-inter text-gray-600">
                  {currentBook.details.size || "N/A"}
                </p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="border-t pt-6 space-y-4">
              <div className="flex gap-3">
                <Button className="flex-1 bg-[#23A6F0] hover:bg-[#23A6F0]/90 text-white font-semibold font-inter py-6 text-lg">
                  <ShoppingCart className="w-5 h-5 mr-2" />
                  Add to Cart
                </Button>
                <Button
                  variant="outline"
                  className="px-6 py-6 border-2 border-[#23A6F0] text-[#23A6F0] hover:bg-[#23A6F0]/10"
                >
                  <Heart className="w-5 h-5" />
                </Button>
                <Button
                  variant="outline"
                  className="px-6 py-6 border-2 border-gray-300 hover:bg-gray-50"
                >
                  <Eye className="w-5 h-5" />
                </Button>
              </div>

              {/* Buy Now Button */}
              <Button className="w-full bg-[#23856D] hover:bg-[#23856D]/90 text-white font-semibold font-inter py-6 text-lg">
                Buy Now
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Your Reading List Section */}
      <div className="bg-[#FAFAFA] py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold font-inter text-[#252B42] mb-8">
            Your Reading List
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {books.slice(0, 4).map((book) => {
              const bookPrice = parsePrice(book.details.price);
              const bookDiscounted = bookPrice * 0.8;

              return (
                <button
                  key={book._id}
                  onClick={() => {
                    const index = books.findIndex((b) => b._id === book._id);
                    setCurrentBookIndex(index);
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }}
                  className="group text-left"
                >
                  <div className="aspect-3/4 bg-white rounded-lg overflow-hidden mb-4 shadow-sm group-hover:shadow-lg transition-shadow">
                    <Image
                      src={book.cover_image || "/placeholder-book.jpg"}
                      alt={book.title}
                      width={300}
                      height={400}
                      className="w-full h-full object-cover"
                      unoptimized
                    />
                  </div>
                  <h3 className="font-bold font-inter text-[#252B42] mb-1 line-clamp-2 group-hover:text-[#23A6F0] transition-colors">
                    {book.title}
                  </h3>
                  <p className="text-sm font-inter text-gray-600 mb-2">
                    {book.category?.name || "General"}
                  </p>
                  <div className="flex items-center gap-2">
                    {bookPrice > 0 && (
                      <>
                        <span className="text-sm font-semibold font-inter text-gray-400 line-through">
                          Rp {bookPrice.toLocaleString("id-ID")}
                        </span>
                        <span className="text-lg font-bold font-inter text-[#23856D]">
                          Rp {bookDiscounted.toLocaleString("id-ID")}
                        </span>
                      </>
                    )}
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
