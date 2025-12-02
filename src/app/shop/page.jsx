"use client";
import React, { useState, useEffect, useRef } from "react";
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
import { useWishlist } from "@/contexts/wishlist-context";
import BookCard from "@/components/BookCard";

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
  const [imageErrors, setImageErrors] = useState({});
  const [heartClickCount, setHeartClickCount] = useState(0);
  const [heartClickTimer, setHeartClickTimer] = useState(null);
  const [wishlistBooks, setWishlistBooks] = useState([]);

  const mainSwiperRef = useRef(null);
  const readingListSwiperRef = useRef(null);

  const { addToWishlist, removeFromWishlist, isInWishlist, wishlist } =
    useWishlist(); // Fetch books from API - Optimized for speed
  useEffect(() => {
    async function fetchBooks() {
      // Create AbortController for timeout
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 8000); // 8 second timeout

      try {
        setLoading(true);
        const response = await fetch(
          "https://bukuacak-9bdcb4ef2605.herokuapp.com/api/v1/book?page=1&limit=20",
          {
            signal: controller.signal,
          }
        );

        clearTimeout(timeoutId); // Clear timeout if fetch succeeds

        if (!response.ok) {
          throw new Error("Failed to fetch books");
        }

        const data = await response.json();

        if (!data.books || data.books.length === 0) {
          setBooks([]);
          setLoading(false);
          return;
        }

        // Fast filter: Only basic URL validation (no image loading test)
        const validBooks = data.books.filter((book) => {
          // Must have required fields
          if (!book.cover_image || !book.title || !book.details) {
            return false;
          }

          // Basic URL format check
          try {
            const url = new URL(book.cover_image);
            return (
              (url.protocol === "http:" || url.protocol === "https:") &&
              url.hostname === "gpu.id"
            ); // Only accept gpu.id domain
          } catch {
            return false;
          }
        });

        console.log(`Found ${validBooks.length} books with valid data`);

        // Set books immediately without image validation
        // Images will be validated on-the-fly with Next.js Image component
        setBooks(validBooks.slice(0, 25)); // Limit to 25 books
        setLoading(false);
      } catch (err) {
        clearTimeout(timeoutId); // Clear timeout on error

        // Check if error is from abort
        if (err.name === "AbortError") {
          console.error("API request timeout after 8 seconds");
          setError("Request timeout. Please try again.");
        } else {
          console.error("Error fetching books:", err);
          setError(err.message || "Failed to load books");
        }
        setLoading(false);
      }
    }
    fetchBooks();
  }, []);

  // Fetch wishlist books
  useEffect(() => {
    async function fetchWishlistBooks() {
      if (wishlist.length === 0) {
        setWishlistBooks([]);
        return;
      }

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
        setWishlistBooks(validBooks);
      } catch {
        setWishlistBooks([]);
      }
    }

    fetchWishlistBooks();
  }, [wishlist]);

  // Handle image errors at runtime
  const handleImageError = (bookId) => {
    console.log(`Image failed to load for book: ${bookId}`);
    setImageErrors((prev) => ({ ...prev, [bookId]: true }));

    // Remove book from list if image fails
    setBooks((prevBooks) => {
      const filtered = prevBooks.filter((book) => book._id !== bookId);
      // Adjust current index if needed
      if (currentBookIndex >= filtered.length && filtered.length > 0) {
        setCurrentBookIndex(filtered.length - 1);
      }
      return filtered;
    });
  };

  // Parse price string to number
  const parsePrice = (priceStr) => {
    if (!priceStr || priceStr === "0") return 0;
    return parseFloat(priceStr.replace(/[^0-9.]/g, ""));
  };

  // Handle swiper slide change
  const handleSlideChange = (swiper) => {
    setCurrentBookIndex(swiper.realIndex);
  };

  // Handle heart button with instant toggle (optimistic update)
  const handleHeartClick = () => {
    const currentBook = books[currentBookIndex];
    if (!currentBook) return;

    // Instant toggle for better UX
    if (isInWishlist(currentBook._id)) {
      removeFromWishlist(currentBook._id);
    } else {
      addToWishlist(currentBook._id);
    }
  };

  // Handle Buy Now button
  const handleBuyNow = () => {
    const currentBook = books[currentBookIndex];
    if (!currentBook) return;

    // Generate search query for Gramedia
    const searchQuery = encodeURIComponent(currentBook.title);
    const gramedaUrl = `https://www.gramedia.com/search?q=${searchQuery}`;

    // Open Gramedia in new tab
    window.open(gramedaUrl, "_blank", "noopener,noreferrer");
  };

  // Handle click on book in Reading List - sync both description AND image
  const handleReadingListBookClick = (bookId) => {
    const index = books.findIndex((b) => b._id === bookId);
    if (index !== -1) {
      setCurrentBookIndex(index);
      // Sync the main swiper to show the correct book image
      if (mainSwiperRef.current) {
        mainSwiperRef.current.slideTo(index);
      }
      // Smooth scroll to product section
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
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
          <div className="text-center">
            <p className="text-gray-600 font-inter mb-4">
              No books available at the moment
            </p>
            <Button onClick={() => window.location.reload()}>Refresh</Button>
          </div>
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

        .reading-list-swiper .swiper-pagination {
          position: relative !important;
          bottom: 0 !important;
          margin-top: 12px !important;
          height: auto !important;
          display: flex !important;
          justify-content: center !important;
          align-items: center !important;
          padding: 8px 0 !important;
        }

        .reading-list-swiper .swiper-pagination-bullet {
          background: #23a6f0 !important;
          opacity: 0.3 !important;
          width: 8px !important;
          height: 8px !important;
          margin: 0 4px !important;
          border-radius: 50% !important;
          transition: all 0.3s ease !important;
          flex-shrink: 0 !important;
        }

        .reading-list-swiper .swiper-pagination-bullet:hover {
          opacity: 0.6 !important;
          transform: scale(1.15) !important;
        }

        .reading-list-swiper .swiper-pagination-bullet-active {
          opacity: 1 !important;
          background: #23a6f0 !important;
          transform: scale(1.2) !important;
          width: 8px !important;
          height: 8px !important;
        }

        .reading-list-swiper .swiper-pagination-bullet-active-main {
          background: #23a6f0 !important;
        }

        .reading-list-swiper {
          padding-bottom: 40px !important;
        }

        /* Responsive pagination bullets */
        @media (min-width: 640px) {
          .reading-list-swiper .swiper-pagination-bullet {
            width: 10px !important;
            height: 10px !important;
            margin: 0 5px !important;
          }
          .reading-list-swiper .swiper-pagination-bullet-active {
            width: 10px !important;
            height: 10px !important;
          }
          .reading-list-swiper .swiper-pagination {
            margin-top: 16px !important;
          }
        }

        @media (min-width: 1024px) {
          .reading-list-swiper .swiper-pagination-bullet {
            width: 12px !important;
            height: 12px !important;
            margin: 0 6px !important;
          }
          .reading-list-swiper .swiper-pagination-bullet-active {
            width: 12px !important;
            height: 12px !important;
          }
        }

        /* Responsive navigation buttons */
        .reading-list-nav-button {
          width: 32px !important;
          height: 32px !important;
        }

        @media (min-width: 640px) {
          .reading-list-nav-button {
            width: 36px !important;
            height: 36px !important;
          }
        }

        @media (min-width: 1024px) {
          .reading-list-nav-button {
            width: 40px !important;
            height: 40px !important;
          }
        }
      `}</style>

      <div className="min-h-screen bg-white">
        <Navbar />
        <Breadcrumbs />

        {/* Product Detail Section */}
        <div className="container mx-auto px-4 sm:px-8 md:px-16 lg:px-28 py-6 sm:py-8 md:py-10 lg:py-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 lg:gap-6 items-start">
            {/* Left: Image Swiper */}
            <div className="space-y-4">
              {/* Main Image Swiper */}
              <div className="w-full md:w-[60vw] lg:w-[40vw] h-[100vw] sm:h-[70vw] md:h-[60vw] lg:h-[40vw] bg-[#C2C2C2] overflow-hidden mx-auto">
                <Swiper
                  modules={[Navigation, Pagination, Thumbs]}
                  navigation
                  pagination={{ clickable: true }}
                  thumbs={{ swiper: thumbsSwiper }}
                  loop={true}
                  onSwiper={(swiper) => (mainSwiperRef.current = swiper)}
                  onSlideChange={handleSlideChange}
                  className="aspect-square"
                >
                  {books.map((book) => (
                    <SwiperSlide key={book._id}>
                      <div className="w-full h-full flex items-center justify-center p-4 sm:p-6 md:p-8">
                        <Image
                          src={book.cover_image}
                          alt={book.title}
                          width={500}
                          height={500}
                          className="max-w-full max-h-full object-contain"
                          onError={() => handleImageError(book._id)}
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
            <div className="space-y-4 sm:space-y-5 md:space-y-6 mt-6 lg:mt-0">
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
                <h1 className="text-2xl sm:text-3xl lg:text-[32px] font-semibold font-inter text-[#252B42] mb-[-1vw]">
                  {currentBook.title}
                </h1>
              </div>

              {/* Price */}
              <div className="flex items-baseline gap-4 mb-[-0.1vw]">
                <span className="text-2xl sm:text-3xl lg:text-[24px] font-semibold font-inter text-[#252B42]">
                  Rp {discountedPrice.toLocaleString("id-ID")}
                </span>
              </div>

              {/* Availability */}
              <div className="flex items-center mt-2 gap-2">
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
                <button
                  onClick={handleBuyNow}
                  className="px-3.5 py-2.5 bg-[#007AFF] text-white font-semibold rounded-2xl hover:bg-[#005FCC] transition-colors"
                >
                  Buy Now
                </button>
                <button
                  onClick={handleHeartClick}
                  className={`group p-2.5 rounded-full transition-colors ${
                    isInWishlist(currentBook?._id)
                      ? "bg-[#FF6B6B] hover:bg-[#FF5252]"
                      : "bg-[#DBECFF] hover:bg-[#AACBFF]"
                  }`}
                  aria-label={
                    isInWishlist(currentBook?._id)
                      ? "Remove from wishlist"
                      : "Add to wishlist"
                  }
                >
                  <Heart
                    className={`w-5 h-5 transition-colors ${
                      isInWishlist(currentBook?._id)
                        ? "text-white fill-white"
                        : "text-[#252B42] group-hover:text-white"
                    }`}
                  />
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
        <div className="bg-[#FAFAFA] py-6 sm:py-8 md:py-10">
          <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-12">
            <h2 className="text-xl sm:text-2xl font-bold font-inter text-[#252B42] ml-4 sm:ml-8 md:ml-16 lg:ml-24 mb-4 sm:mb-6">
              Your Reading List
            </h2>
            <div className="border-t border-[#ECECEC] w-full sm:w-[90vw] md:w-[85vw] lg:w-[80vw] ml-0 sm:ml-[2vw] md:ml-[4vw] lg:ml-[6vw] pt-4 sm:pt-6 mb-3 sm:mb-4"></div>

            {/* Show wishlist books or empty state */}
            {wishlistBooks.length > 0 ? (
              <div className="relative px-8 sm:px-10 md:px-12 flex items-center justify-center">
                {/* Navigation Buttons */}
                <button
                  onClick={() => readingListSwiperRef.current?.slidePrev()}
                  className="reading-list-nav-button absolute left-0 top-1/2 -translate-y-1/2 z-10 flex items-center justify-center bg-white rounded-full shadow-md hover:bg-[#23A6F0] hover:text-white transition-colors group"
                  aria-label="Previous slide"
                >
                  <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 text-[#252B42] group-hover:text-white" />
                </button>
                <button
                  onClick={() => readingListSwiperRef.current?.slideNext()}
                  className="reading-list-nav-button absolute right-0 top-1/2 -translate-y-1/2 z-10 flex items-center justify-center bg-white rounded-full shadow-md hover:bg-[#23A6F0] hover:text-white transition-colors group"
                  aria-label="Next slide"
                >
                  <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 text-[#252B42] group-hover:text-white" />
                </button>
                {/* Swiper for Reading List */}
                <Swiper
                  modules={[Navigation, Pagination]}
                  onSwiper={(swiper) => (readingListSwiperRef.current = swiper)}
                  navigation={{
                    enabled: true,
                    prevEl: null,
                    nextEl: null,
                  }}
                  pagination={{
                    clickable: true,
                    dynamicBullets: true,
                    dynamicMainBullets: 1,
                    renderBullet: function (index, className) {
                      return '<span class="' + className + '"></span>';
                    },
                  }}
                  spaceBetween={12}
                  slidesPerView={1}
                  loop={false}
                  allowTouchMove={true}
                  watchSlidesProgress={true}
                  observer={true}
                  observeParents={true}
                  centeredSlides={false}
                  slidesOffsetBefore={0}
                  slidesOffsetAfter={0}
                  breakpoints={{
                    640: {
                      slidesPerView: 2,
                      spaceBetween: 20,
                    },
                    768: {
                      slidesPerView: 3,
                      spaceBetween: 24,
                    },
                    1024: {
                      slidesPerView: 4,
                      spaceBetween: 28,
                    },
                  }}
                  className="reading-list-swiper"
                >
                  {wishlistBooks.map((book) => {
                    const bookPrice = parsePrice(
                      book.details?.price || book.price || "0"
                    );
                    const bookDiscounted = bookPrice * 0.8;

                    return (
                      <SwiperSlide key={book._id}>
                        <BookCard
                          id={book._id}
                          title={book.title}
                          coverImage={book.cover_image}
                          category={book.category?.name}
                          originalPrice={`Rp ${bookPrice.toLocaleString(
                            "id-ID"
                          )}`}
                          discountedPrice={`Rp ${bookDiscounted.toLocaleString(
                            "id-ID"
                          )}`}
                          showBuyButton={true}
                          onClick={() => handleReadingListBookClick(book._id)}
                        />
                      </SwiperSlide>
                    );
                  })}
                </Swiper>
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="mb-4">
                  <Heart className="w-16 h-16 mx-auto text-[#BDBDBD] mb-4" />
                </div>
                <p className="text-[#737373] text-lg">
                  No books in your reading list yet. Add some books to get
                  started!
                </p>
                <p className="text-[#BDBDBD] text-sm mt-2">
                  Click the heart button once to add books to your reading list.
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Books For You Section */}
        <div className="bg-[#FAFAFA] mt-[-5vw] md:mt-[-10vw] sm:mt-[-15vw] py-8 sm:py-12 md:py-16">
          <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-12">
            <h2 className="text-xl sm:text-2xl font-bold font-inter text-[#252B42] ml-4 sm:ml-8 md:ml-16 lg:ml-24 mb-6 sm:mb-8">
              Books For You
            </h2>
            <div className="border-t border-[#ECECEC] w-full sm:w-[90vw] md:w-[85vw] lg:w-[80vw] ml-0 sm:ml-[2vw] md:ml-[4vw] lg:ml-[6vw] pt-6 sm:pt-8 mb-4 sm:mb-6"></div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-3 md:gap-2">
              {books.slice(4, 12).map((book) => {
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
                    <div className="bg-[#FFFFFF] shadow-sm overflow-hidden w-full max-w-[238px] mx-auto">
                      <div className="bg-white overflow-hidden group-hover:shadow-lg transition-shadow">
                        <Image
                          src={book.cover_image}
                          alt={book.title}
                          width={180}
                          height={240}
                          className="w-full h-full object-cover"
                          unoptimized
                        />
                      </div>
                      <div className="p-4">
                        <h3 className="font-semibold text-[16px] font-inter text-[#252B42] mb-2 line-clamp-2 group-hover:text-[#23A6F0] transition-colors">
                          {book.title}
                        </h3>
                        <p className="text-[14px] font-semibold font-inter text-[#737373] mb-3">
                          {book.category?.name || "General"}
                        </p>
                        <div className="flex items-center gap-2">
                          {bookPrice > 0 && (
                            <>
                              <span className="text-[16px] font-semibold font-inter text-[#BDBDBD]">
                                Rp {bookPrice.toLocaleString("id-ID")}
                              </span>
                              <span className="text-[16px] font-semibold font-inter text-[#23856D]">
                                Rp {bookDiscounted.toLocaleString("id-ID")}
                              </span>
                            </>
                          )}
                        </div>
                      </div>
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
