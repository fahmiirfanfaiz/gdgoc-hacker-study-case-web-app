"use client";

import { useState, useEffect } from "react";
import BookCard from "@/components/BookCard";
import { useWishlist } from "@/contexts/wishlist-context";
import Navbar from "@/components/ui/Navbar";
import Breadcrumbs from "@/components/ui/Breadcrumb";
import { Heart, BookOpen, ShoppingBag, Trash2 } from "lucide-react";
import Link from "next/link";

export default function ReadingListPage() {
  const { wishlist, removeFromWishlist } = useWishlist();
  const [books, setBooks] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function fetchWishlistBooks() {
      if (wishlist.length === 0) {
        setBooks([]);
        return;
      }

      setIsLoading(true);
      try {
        const fetchedBooks = await Promise.all(
          wishlist.map(async (bookId) => {
            try {
              const res = await fetch(
                `https://bukuacak-9bdcb4ef2605.herokuapp.com/api/v1/book/${bookId}`
              );
              if (!res.ok) throw new Error("Failed to fetch book");
              const data = await res.json();
              return data.data || data;
            } catch {
              return null;
            }
          })
        );

        const validBooks = fetchedBooks.filter((book) => book !== null);
        setBooks(validBooks);
      } catch {
        setBooks([]);
      } finally {
        setIsLoading(false);
      }
    }

    fetchWishlistBooks();
  }, [wishlist]);

  const parsePrice = (book) => {
    let priceNumber = 0;

    if (book.details?.price) {
      const priceString = book.details.price;
      priceNumber = parseFloat(
        priceString.replace(/[^\d.-]/g, "").replace(/\./g, "")
      );
    } else if (book.price) {
      priceNumber =
        typeof book.price === "number"
          ? book.price
          : parseFloat(String(book.price));
    }

    const adjustedPrice = priceNumber;
    const originalPrice = adjustedPrice * 1.4;

    return {
      original: `Rp ${originalPrice.toLocaleString("id-ID", {
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
      })}`,
      discounted: `Rp ${adjustedPrice.toLocaleString("id-ID", {
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
      })}`,
    };
  };

  const handleClearAll = () => {
    if (
      window.confirm(
        `Are you sure you want to remove all ${books.length} books from your reading list?`
      )
    ) {
      books.forEach((book) => removeFromWishlist(book._id));
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <Breadcrumbs />

      {/* Hero Section */}
      <section className="bg-linear-to-r from-[#252B42] to-[#3E4A6B] text-white py-12 sm:py-16 md:py-20">
        <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-12">
          <div className="max-w-4xl mx-auto text-center">
            <div className="w-16 h-16 sm:w-20 sm:h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6">
              <Heart className="h-8 w-8 sm:h-10 sm:w-10 text-white fill-white" />
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold font-inter mb-4 sm:mb-6">
              Your Reading List
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-gray-200">
              {books.length > 0
                ? `${books.length} ${
                    books.length === 1 ? "book" : "books"
                  } saved for later`
                : "Start building your personal collection"}
            </p>
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      {books.length > 0 && (
        <section className="bg-gray-50 border-b border-gray-200 py-4 sm:py-6">
          <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-12">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-2 text-sm sm:text-base text-[#737373] font-inter">
                <BookOpen className="h-5 w-5" />
                <span>
                  Total:{" "}
                  <strong className="text-[#252B42]">{books.length}</strong>{" "}
                  books
                </span>
              </div>
              <button
                onClick={handleClearAll}
                className="flex items-center gap-2 px-4 py-2 text-sm sm:text-base text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors font-inter font-semibold"
              >
                <Trash2 className="h-4 w-4" />
                Clear All
              </button>
            </div>
          </div>
        </section>
      )}

      {/* Main Content */}
      <section className="py-12 sm:py-16 md:py-20">
        <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-12">
          {/* Loading State */}
          {isLoading && (
            <div className="text-center py-16 sm:py-20">
              <div className="w-12 h-12 sm:w-16 sm:h-16 border-4 border-[#252B42] border-t-transparent rounded-full animate-spin mx-auto mb-4 sm:mb-6"></div>
              <p className="text-base sm:text-lg text-[#737373] font-inter">
                Loading your reading list...
              </p>
            </div>
          )}

          {/* Books Grid */}
          {!isLoading && books.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8">
              {books.map((book) => {
                const prices = parsePrice(book);

                return (
                  <BookCard
                    key={book._id}
                    id={book._id}
                    title={book.title}
                    coverImage={book.cover_image}
                    category={book.category?.name}
                    originalPrice={prices.original}
                    discountedPrice={prices.discounted}
                    showBuyButton={true}
                  />
                );
              })}
            </div>
          )}

          {/* Empty State */}
          {!isLoading && books.length === 0 && (
            <div className="max-w-2xl mx-auto text-center py-16 sm:py-20">
              <div className="w-20 h-20 sm:w-24 sm:h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6 sm:mb-8">
                <Heart className="h-10 w-10 sm:h-12 sm:w-12 text-gray-400" />
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold font-inter text-[#252B42] mb-4">
                Your Reading List is Empty
              </h2>
              <p className="text-base sm:text-lg text-[#737373] font-inter mb-8">
                Start adding books to your reading list by clicking the heart
                icon on any book you&apos;d like to save for later.
              </p>
              <Link
                href="/shop"
                className="inline-flex items-center gap-2 px-6 sm:px-8 py-3 sm:py-4 bg-[#252B42] text-white font-semibold rounded-lg hover:bg-[#3E4A6B] transition-colors text-base sm:text-lg"
              >
                <ShoppingBag className="h-5 w-5" />
                Browse Books
              </Link>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
