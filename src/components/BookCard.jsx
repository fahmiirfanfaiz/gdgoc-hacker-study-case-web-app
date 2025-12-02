"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

export default function BookCard({
  id,
  title,
  coverImage,
  category,
  originalPrice,
  discountedPrice,
  onClick,
  showBuyButton = false,
}) {
  const router = useRouter();

  const handleClick = () => {
    if (onClick) {
      onClick();
    } else {
      router.push(`/shop?bookId=${id}`);
    }
  };

  const handleBuyNow = (e) => {
    e.stopPropagation(); // Prevent card click

    // Generate search query for Gramedia
    const searchQuery = encodeURIComponent(title);
    const gramediaUrl = `https://www.gramedia.com/search?q=${searchQuery}`;

    // Open Gramedia in new tab
    window.open(gramediaUrl, "_blank", "noopener,noreferrer");
  };

  return (
    <div onClick={handleClick} className="group cursor-pointer">
      {/* Book Cover */}
      <div className="w-[238px] ml-12">
        <div className="relative aspect-4/5 bg-neutral-200 overflow-hidden">
          <Image
            src={coverImage || "/book-placeholder.jpg"}
            alt={title}
            fill
            className="object-contain scale-80 group-hover:scale-100 transition-transform duration-300"
            unoptimized
          />
        </div>

        {/* Book Info */}
        <div className="p-6 pb-9  bg-white">
          {/* Title */}
          <h3 className="font-semibold text-[16px] text-[#252B42] line-clamp-2 group-hover:text-[#23A6F0] transition-colors">
            {title}
          </h3>

          {/* Category */}
          {category && (
            <p className="text-[14px] mt-3 font-semibold text-[#737373]">
              {category}
            </p>
          )}

          {/* Price */}
          <div className="flex items-center gap-5 mb-3 mt-3">
            <span className="text-[#BDBDBD] font-semibold text-[16px]">
              {originalPrice}
            </span>
            <span className="text-[#23856D] text-[16px] font-semibold">
              {discountedPrice}
            </span>
          </div>

          {/* Buy Button
        {showBuyButton && (
          <button
            onClick={handleBuyNow}
            className="w-full px-4 py-2 bg-[#007AFF] text-white font-semibold rounded-lg hover:bg-[#005FCC] transition-colors"
          >
            Buy Now
          </button>
        )} */}
        </div>
      </div>
    </div>
  );
}
