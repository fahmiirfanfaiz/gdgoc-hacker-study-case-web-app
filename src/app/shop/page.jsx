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
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Thumbs } from "swiper/modules";
import Navbar from "@/components/ui/Navbar";
import Breadcrumbs from "@/components/ui/Breadcrumb";
import { Button } from "@/components/ui/Button";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/thumbs";

export default function ShopPage() {
  const [books, setBooks] = useState([]);
  const [currentBookIndex, setCurrentBookIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [thumbsSwiper, setThumbsSwiper] = useState(null);

  // Helper function to validate if image actually loads
  const validateImageUrl = (url) => {
    return new Promise((resolve) => {
      if (!url || url.trim() === "") {
        resolve(false);
        return;
      }

      // Basic URL validation
      try {
        const parsedUrl = new URL(url);
        if (parsedUrl.protocol !== "http:" && parsedUrl.protocol !== "https:") {
          resolve(false);
          return;
        }
      } catch {
        resolve(false);
        return;
      }

      // Test if image actually loads
      const img = new window.Image();
      img.onload = () => resolve(true);
      img.onerror = () => resolve(false);
      img.src = url;

      // Timeout after 5 seconds
      setTimeout(() => resolve(false), 5000);
    });
  };

  // Fetch books from API
  useEffect(() => {
    async function fetchBooks() {
      try {
        setLoading(true);
        const response = await fetch(
          "https://bukuacak-9bdcb4ef2605.herokuapp.com/api/v1/book?page=1&limit=20"
        );
        const data = await response.json();

        // First filter: basic validation
        const candidateBooks = (data.books || []).filter((book) => {
          if (!book.cover_image || book.cover_image.trim() === "") {
            return false;
          }
          try {
            const url = new URL(book.cover_image);
            return url.protocol === "http:" || url.protocol === "https:";
          } catch {
            return false;
          }
        });

        // Second filter: validate that images actually load
        const validationPromises = candidateBooks.map(async (book) => {
          const isValid = await validateImageUrl(book.cover_image);
          return isValid ? book : null;
        });

        const validatedBooks = await Promise.all(validationPromises);
        const booksWithValidImages = validatedBooks.filter(
          (book) => book !== null
        );

        setBooks(booksWithValidImages);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    }
    fetchBooks();
  }, []);

  // Parse price string to number
  const parsePrice = (priceStr) => {
    if (!priceStr || priceStr === "0") return 0;
    return parseFloat(priceStr.replace(/[^0-9.]/g, ""));
  };

  // Handle swiper slide change
  const handleSlideChange = (swiper) => {
    setCurrentBookIndex(swiper.realIndex);
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
  const discountedPrice = price * 0.8; 

  return (
    <>
      <style jsx global>{`
        .swiper-button-next,
        .swiper-button-prev {
          color: white !important;
        }

        .swiper-pagination-bullet {
          background: white !important;
          opacity: 0.5;
        }

        .swiper-pagination-bullet-active {
          opacity: 1 !important;
        }
      `}</style>

      <div className="min-h-screen bg-white">
        <Navbar />
        <Breadcrumbs />

        {/* Product Detail Section */}
        <div className="container mx-auto px-28 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
            {/* Left: Image Swiper */}
            <div className="space-y-4">
              {/* Main Image Swiper */}
              <div className="w-[40vw] h-[40vw] bg-[#C2C2C2] overflow-hidden ">
                <Swiper
                  modules={[Navigation, Pagination, Thumbs]}
                  navigation
                  pagination={{ clickable: true }}
                  thumbs={{ swiper: thumbsSwiper }}
                  loop={true}
                  onSlideChange={handleSlideChange}
                  className="aspect-square"
                >
                  {books.map((book) => (
                    <SwiperSlide key={book._id}>
                      <div className="w-full h-full flex items-center justify-center p-8">
                        <Image
                          src={book.cover_image}
                          alt={book.title}
                          width={500}
                          height={500}
                          className="max-w-full max-h-full object-contain"
                          unoptimized
                        />
                      </div>
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>

              {/* Thumbnail Swiper
              <Swiper
                modules={[Thumbs]}
                onSwiper={setThumbsSwiper}
                spaceBetween={10}
                slidesPerView={4}
                watchSlidesProgress
                className="thumbs-swiper"
              >
                {books.slice(0, 8).map((book) => (
                  <SwiperSlide key={book._id}>
                    <div className="aspect-square bg-[#F5F5F5] cursor-pointer overflow-hidden rounded-lg border-2 border-transparent hover:border-[#23A6F0] transition-colors">
                      <Image
                        src={book.cover_image}
                        alt={book.title}
                        width={100}
                        height={100}
                        className="w-full h-full object-cover"
                        unoptimized
                      />
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper> */}
            </div>

            {/* Right: Product Info */}
            <div className="space-y-6">
              {/* Tags/Categories */}
              <div className="flex flex-wrap gap-2">
                {currentBook.category && (
                  <span className="inline-flex items-center px-4 py-1 rounded-full text-sm font-semibold font-inter bg-[#E0E0E0] text-[#000000]">
                    {currentBook.category.name}
                  </span>
                )}
                {currentBook.tags?.slice(0, 2).map((tag, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center px-4 py-1 rounded-full text-sm font-semibold font-inter bg-[#E0E0E0] text-[#000000]"
                  >
                    {tag.name}
                  </span>
                ))}
              </div>

              {/* Title */}
              <div>
                <h1 className="text-3xl lg:text-4xl font-semibold font-inter text-[#252B42] mb-3">
                  {currentBook.title}
                </h1>
              </div>

              {/* Price */}
              <div className="flex items-baseline gap-4">
                <span className="text-4xl font-semibold font-inter text-[#252B42]">
                  Rp {discountedPrice.toLocaleString("id-ID")}
                </span>
              </div>

              {/* Availability */}
              <div className="flex items-center gap-2">
                <span className="text-sm font-semibold font-inter text-[#737373]">
                  Availability:
                </span>
                <span className="text-sm font-bold font-inter text-[#23A6F0]">
                  In Stock
                </span>
              </div>

              {/* Summary */}
              <div>
                <p className="text-sm font-inter text-[#858585] leading-relaxed line-clamp-6">
                  {currentBook.summary || "No description available."}
                </p>
              </div>

              {/* Details Grid */}
              <div className="flex flex-col gap-2">
                <div className="flex gap-2">
                  <span className="text-sm font-semibold font-inter text-[#858585]">
                    Pages:
                  </span>
                  <span className="text-sm font-inter text-[#858585]">
                    {currentBook.details.total_pages || "N/A"}
                  </span>
                </div>
                <div className="flex gap-2">
                  <span className="text-sm font-semibold font-inter text-[#858585]">
                    Publisher:
                  </span>
                  <span className="text-sm font-inter text-[#858585]">
                    {currentBook.publisher || "N/A"}
                  </span>
                </div>
                <div className="flex gap-2">
                  <span className="text-sm font-semibold font-inter text-[#858585]">
                    ISBN:
                  </span>
                  <span className="text-sm font-inter text-[#858585]">
                    {currentBook.details.isbn || "N/A"}
                  </span>
                </div>
                <div className="flex gap-2">
                  <span className="text-sm font-semibold font-inter text-[#858585]">
                    Published:
                  </span>
                  <span className="text-sm font-inter text-[#858585]">
                    {currentBook.details.published_date || "N/A"}
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2.5 pt-6">
                <button className="px-3.5 py-2.5 bg-[#007AFF] text-white font-semibold rounded-2xl hover:bg-[#005FCC] transition-colors">
                  Buy Now
                </button>
                <button
                  className="group p-2.5 bg-[#DBECFF] rounded-full hover:bg-[#AACBFF] transition-colors"
                  aria-label="Add to wishlist"
                >
                  <Heart className="w-5 h-5 text-[#252B42] group-hover:text-white transition-colors" />
                </button>
                <button
                  className="group p-2.5 bg-[#DBECFF] rounded-full hover:bg-[#AACBFF] transition-colors"
                  aria-label="Add to cart"
                >
                  <ShoppingCart className="w-5 h-5 text-[#252B42] group-hover:text-white transition-colors" />
                </button>
                <button
                  className="group p-2.5 bg-[#DBECFF] rounded-full hover:bg-[#AACBFF] transition-colors"
                  aria-label="Quick view"
                >
                  <Eye className="w-5 h-5 text-[#252B42] group-hover:text-white transition-colors" />
                </button>
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
                        src={book.cover_image}
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
    </>
  );
}
