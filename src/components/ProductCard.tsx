import React from 'react';
import { ShoppingCart, Heart, Star, Eye } from 'lucide-react';
import { Product } from '../types';

interface ProductCardProps {
  product: Product;
  onSelect: (product: Product) => void;
  onAddToCart: (product: Product, e: React.MouseEvent) => void;
  onToggleWishlist: (productId: string, e: React.MouseEvent) => void;
  isWishlisted: boolean;
  compact?: boolean;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onSelect,
  onAddToCart,
  onToggleWishlist,
  isWishlisted,
  compact = false
}) => {
  return (
    <div
      onClick={() => onSelect(product)}
      className="group relative bg-white rounded-2xl border border-slate-200/90 hover:border-orange-400 hover:shadow-xl transition-all duration-300 flex flex-col justify-between overflow-hidden cursor-pointer h-full"
    >
      {/* Top Image Container */}
      <div className="relative aspect-square w-full bg-slate-100 overflow-hidden">
        <img
          src={product.thumbnail}
          alt={product.name}
          loading="lazy"
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
        />

        {/* Badges */}
        <div className="absolute top-2 left-2 flex flex-col gap-1 z-10">
          {product.discountPercent > 0 && (
            <span className="bg-orange-600 text-white text-[10px] sm:text-xs font-extrabold px-2 py-0.5 rounded-md shadow-sm">
              -{product.discountPercent}%
            </span>
          )}
          {product.badge && !compact && (
            <span className="bg-[#0b1b36]/90 text-amber-300 text-[10px] font-semibold px-2 py-0.5 rounded-md backdrop-blur-xs">
              {product.badge}
            </span>
          )}
        </div>

        {/* Wishlist Button */}
        <button
          onClick={(e) => onToggleWishlist(product.id, e)}
          className={`absolute top-2 right-2 p-1.5 sm:p-2 rounded-full transition-all duration-200 z-10 ${
            isWishlisted
              ? 'bg-rose-50 text-rose-600 shadow'
              : 'bg-white/80 text-slate-500 hover:text-rose-500 hover:bg-white'
          }`}
          title="পছন্দের তালিকায় রাখুন"
        >
          <Heart className={`w-3.5 h-3.5 sm:w-4 sm:h-4 ${isWishlisted ? 'fill-rose-500' : ''}`} />
        </button>

        {/* Quick View Hover Indicator (PC only) */}
        <div className="hidden md:flex absolute inset-0 bg-black/25 opacity-0 group-hover:opacity-100 transition-opacity items-center justify-center pointer-events-none">
          <span className="inline-flex items-center gap-1.5 bg-white text-slate-800 text-xs font-bold px-3 py-1.5 rounded-full shadow-md">
            <Eye className="w-3.5 h-3.5 text-orange-500" />
            বিস্তারিত দেখুন
          </span>
        </div>
      </div>

      {/* Product Content Details */}
      <div className={`p-2.5 sm:p-4 flex flex-col flex-1 justify-between gap-1.5 sm:gap-2.5 ${compact ? 'text-xs' : ''}`}>
        <div>
          {/* Category & Rating */}
          <div className="flex items-center justify-between gap-1 text-[11px] text-slate-500 mb-1">
            <span className="truncate bg-slate-100 text-slate-700 font-medium px-1.5 py-0.5 rounded text-[10px] sm:text-[11px]">
              {product.categoryName}
            </span>
            <div className="flex items-center gap-1 text-amber-500 font-semibold text-[11px] flex-shrink-0">
              <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
              <span>{product.rating}</span>
              {!compact && <span className="text-slate-400 text-[10px]">({product.reviewCount})</span>}
            </div>
          </div>

          {/* Title */}
          <h3 className="font-bold text-slate-800 line-clamp-2 text-xs sm:text-sm group-hover:text-orange-600 transition-colors">
            {product.name}
          </h3>
        </div>

        {/* Price & Action */}
        <div className="pt-1.5 sm:pt-2 border-t border-slate-100 flex items-center justify-between gap-1">
          <div>
            <div className="flex items-baseline gap-1.5">
              <span className="font-extrabold text-[#0b1b36] text-sm sm:text-base md:text-lg">
                ৳{product.price.toLocaleString('bn-BD')}
              </span>
              {product.originalPrice > product.price && (
                <span className="text-[10px] sm:text-xs text-slate-400 line-through">
                  ৳{product.originalPrice.toLocaleString('bn-BD')}
                </span>
              )}
            </div>
            {!compact && (
              <div className="text-[10px] text-emerald-600 font-medium hidden sm:block">
                স্টক আছে ({product.stockCount} টি)
              </div>
            )}
          </div>

          {/* Add to Cart Button */}
          <button
            onClick={(e) => onAddToCart(product, e)}
            className="bg-orange-500 hover:bg-orange-600 active:scale-95 text-white p-2 sm:px-3 sm:py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-sm transition-all flex-shrink-0"
            title="কার্টে যোগ করুন"
          >
            <ShoppingCart className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            <span className="hidden sm:inline">যোগ করুন</span>
          </button>
        </div>
      </div>
    </div>
  );
};
