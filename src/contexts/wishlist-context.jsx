"use client";

import { createContext, useContext, useState, useEffect } from "react";

const WishlistContext = createContext(undefined);

export function WishlistProvider({ children }) {
  const [wishlist, setWishlist] = useState(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("wishlist");
      if (saved) {
        try {
          return JSON.parse(saved);
        } catch {
          return [];
        }
      }
    }
    return [];
  });

  useEffect(() => {
    localStorage.setItem("wishlist", JSON.stringify(wishlist));
  }, [wishlist]);

  const addToWishlist = (bookId) => {
    setWishlist((prev) => {
      if (!prev.includes(bookId)) {
        return [...prev, bookId];
      }
      return prev;
    });
  };

  const removeFromWishlist = (bookId) => {
    setWishlist((prev) => prev.filter((id) => id !== bookId));
  };

  const isInWishlist = (bookId) => {
    return wishlist.includes(bookId);
  };

  return (
    <WishlistContext.Provider
      value={{ wishlist, addToWishlist, removeFromWishlist, isInWishlist }}
    >
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  const context = useContext(WishlistContext);
  if (context === undefined) {
    throw new Error("useWishlist must be used within a WishlistProvider");
  }
  return context;
}
