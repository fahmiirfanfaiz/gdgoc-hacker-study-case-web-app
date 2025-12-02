"use client";

import { useState, useEffect } from "react";
import BookCard from "@/components/BookCard";
import { useWishlist } from "@/contexts/wishlist-context";
import Navbar from "@/components/ui/Navbar";
import Breadcrumbs from "@/components/ui/Breadcrumb";

export default function ReadingListPage() {
  const { wishlist } = useWishlist();
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

  return (
    <div className="min-h-screen bg-[#FAFAFA]">
      <Navbar />
      <Breadcrumbs />

      <div className="w-full py-12">
        <div className="max-w-6xl mx-auto px-10 lg:px-0">
          <h2 className="text-2xl max-w-5xl mx-auto font-bold text-[#252B42] border-b-2 border-[#ECECEC] pb-6">
            Your Reading List
          </h2>

          {/* Loading State */}
          {isLoading && (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#23A6F0] mx-auto mb-4"></div>
              <p className="text-[#737373]">Loading your books...</p>
            </div>
          )}

          {/* Books Grid */}
          {!isLoading && books.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 mt-6">
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
            <div className="text-center py-12">
              <div className="mb-4">
                <svg
                  className="w-16 h-16 mx-auto text-[#BDBDBD] mb-4"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <p className="text-[#737373] text-lg">
                No books in your reading list yet. Add some books to get
                started!
              </p>
              <p className="text-[#BDBDBD] text-sm mt-2">
                Click the heart button on books to add them to your reading
                list.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
