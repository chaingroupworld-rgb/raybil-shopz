import React, { useState } from 'react';
import { Search, ShoppingBag, Truck, Heart, Phone, ShieldCheck, X } from 'lucide-react';
import { RaybilLogo } from './RaybilLogo';
import { Product } from '../types';

interface NavbarProps {
  cartCount: number;
  cartTotal: number;
  wishlistCount: number;
  onOpenCart: () => void;
  onOpenTracking: () => void;
  onSelectProduct: (product: Product) => void;
  onOpenWishlist: () => void;
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  products: Product[];
  currentView: 'home' | 'tracking';
  setCurrentView: (view: 'home' | 'tracking') => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  cartCount,
  cartTotal,
  wishlistCount,
  onOpenCart,
  onOpenTracking,
  onSelectProduct,
  onOpenWishlist,
  searchQuery,
  setSearchQuery,
  products,
  currentView,
  setCurrentView
}) => {
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [showMobileSearch, setShowMobileSearch] = useState(false);

  // Filter products for instant dropdown suggestions
  const searchResults = searchQuery.trim()
    ? products.filter(p =>
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.nameEn.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.categoryName.toLowerCase().includes(searchQuery.toLowerCase())
      ).slice(0, 5)
    : [];

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/80 transition-all">
      {/* Top Notification / Trust Bar */}
      <div className="bg-[#0b1b36] text-white text-xs sm:text-sm py-1.5 px-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <span className="inline-flex items-center gap-1.5 text-orange-400 font-medium">
              <span className="w-2 h-2 rounded-full bg-orange-500 animate-pulse"></span>
              Raybil মেগা অফার:
            </span>
            <span className="hidden sm:inline text-slate-200">
              'RAYBIL10' কুপন কোডে যেকোনো অর্ডারে ১০% ছাড়!
            </span>
            <span className="sm:hidden text-slate-200 text-xs truncate">
              সারা দেশে সুপারফাস্ট ডেলিভারি
            </span>
          </div>

          <div className="flex items-center gap-4 text-slate-300">
            <div className="hidden md:flex items-center gap-1 text-xs hover:text-white transition-colors">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>১০০% নিরাপদ পেমেন্ট গ্যারান্টি</span>
            </div>
            <a
              href="tel:09612345678"
              className="flex items-center gap-1 text-xs hover:text-orange-400 transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-orange-400" />
              <span className="hidden xs:inline">হটলাইন: ০৯৬১২-৩৪৫৬৭৮</span>
            </a>
            <button
              onClick={() => {
                setCurrentView('tracking');
                onOpenTracking();
              }}
              className="flex items-center gap-1 text-xs text-orange-300 hover:text-orange-200 font-semibold underline underline-offset-2 ml-2"
            >
              <Truck className="w-3.5 h-3.5" />
              <span>অর্ডার ট্র্যাকিং</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-3 sm:px-6 py-2.5 sm:py-3.5 flex items-center justify-between gap-2 sm:gap-6">
        {/* Brand Logo */}
        <button
          onClick={() => {
            setCurrentView('home');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="flex items-center cursor-pointer text-left focus:outline-none"
        >
          <RaybilLogo size="md" />
        </button>

        {/* Live Search Bar with Instant Results */}
        <div className="relative flex-1 max-w-xl hidden md:block">
          <div className="relative">
            <input
              type="text"
              placeholder="পণ্য, গ্যাজেট বা ব্র্যান্ড সার্চ করুন (উদাঃ Earbuds, Watch)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onFocus={() => setIsSearchFocused(true)}
              onBlur={() => setTimeout(() => setIsSearchFocused(false), 250)}
              className="w-full bg-slate-100 hover:bg-slate-50 focus:bg-white text-slate-800 text-sm pl-11 pr-10 py-2.5 rounded-full border border-slate-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 transition-all outline-none"
            />
            <Search className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-1"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Instant Search Suggestions Dropdown */}
          {isSearchFocused && searchQuery.trim().length > 0 && (
            <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden z-50">
              {searchResults.length > 0 ? (
                <div className="p-2 divide-y divide-slate-100">
                  <div className="px-3 py-1.5 text-xs font-semibold text-slate-400">
                    মিল পাওয়া পণ্যসমূহ ({searchResults.length}):
                  </div>
                  {searchResults.map((product) => (
                    <button
                      key={product.id}
                      onClick={() => {
                        onSelectProduct(product);
                        setIsSearchFocused(false);
                      }}
                      className="w-full text-left p-2.5 flex items-center gap-3 hover:bg-orange-50/60 rounded-xl transition-colors"
                    >
                      <img
                        src={product.thumbnail}
                        alt={product.name}
                        referrerPolicy="no-referrer"
                        className="w-11 h-11 object-cover rounded-lg border border-slate-100 flex-shrink-0"
                      />
                      <div className="flex-1 min-w-0">
                        <h4 className="text-sm font-semibold text-slate-800 truncate">{product.name}</h4>
                        <div className="flex items-center gap-2 mt-0.5">
                          <span className="text-orange-600 font-bold text-xs">৳{product.price.toLocaleString('bn-BD')}</span>
                          <span className="text-xs text-slate-400 line-through">৳{product.originalPrice.toLocaleString('bn-BD')}</span>
                          <span className="text-[11px] bg-slate-100 text-slate-600 px-1.5 py-0.5 rounded">{product.categoryName}</span>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              ) : (
                <div className="p-6 text-center text-slate-500 text-sm">
                  "{searchQuery}" দিয়ে কোনো পণ্য খুঁজে পাওয়া যায়নি।
                </div>
              )}
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-1.5 sm:gap-3">
          {/* Mobile Search Toggle */}
          <button
            onClick={() => setShowMobileSearch(!showMobileSearch)}
            className="md:hidden p-2 text-slate-700 hover:text-orange-600 hover:bg-slate-100 rounded-full transition-colors"
            aria-label="Search"
          >
            <Search className="w-5 h-5" />
          </button>

          {/* Real-Time Order Tracking Button */}
          <button
            onClick={() => {
              setCurrentView('tracking');
              onOpenTracking();
            }}
            className={`hidden sm:flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold border transition-all ${
              currentView === 'tracking'
                ? 'bg-orange-500 text-white border-orange-500 shadow-sm'
                : 'bg-orange-50/80 text-orange-700 border-orange-200/80 hover:bg-orange-100 hover:border-orange-300'
            }`}
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-orange-500"></span>
            </span>
            <Truck className="w-4 h-4" />
            <span>লাইভ ট্র্যাকিং</span>
          </button>

          {/* Wishlist Button */}
          <button
            onClick={onOpenWishlist}
            className="relative p-2.5 text-slate-700 hover:text-rose-600 hover:bg-rose-50 rounded-full transition-colors"
            title="পছন্দের তালিকা"
          >
            <Heart className="w-5 h-5" />
            {wishlistCount > 0 && (
              <span className="absolute top-1 right-1 bg-rose-500 text-white text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center">
                {wishlistCount}
              </span>
            )}
          </button>

          {/* Cart Trigger Button */}
          <button
            onClick={onOpenCart}
            className="flex items-center gap-2 bg-[#0b1b36] hover:bg-[#142e54] text-white pl-3.5 pr-4 py-2 sm:py-2.5 rounded-xl text-xs sm:text-sm font-semibold shadow-sm transition-all duration-200 hover:shadow"
          >
            <div className="relative">
              <ShoppingBag className="w-4 h-4 sm:w-5 sm:h-5 text-orange-400" />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-orange-500 text-white text-[10px] font-extrabold rounded-full min-w-4 h-4 px-1 flex items-center justify-center animate-pulse">
                  {cartCount}
                </span>
              )}
            </div>
            <div className="text-left hidden xs:block">
              <div className="text-[10px] text-slate-300 leading-tight">আমার ব্যাগ</div>
              <div className="font-bold text-orange-300 leading-tight">
                ৳{cartTotal.toLocaleString('bn-BD')}
              </div>
            </div>
          </button>
        </div>
      </div>

      {/* Mobile Search Row if Toggled */}
      {showMobileSearch && (
        <div className="md:hidden px-3 pb-3 border-t border-slate-100 pt-2.5 bg-slate-50">
          <div className="relative">
            <input
              type="text"
              placeholder="পণ্য বা ব্র্যান্ড সার্চ করুন..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white text-slate-800 text-sm pl-10 pr-9 py-2 rounded-xl border border-slate-200 focus:border-orange-500 outline-none"
              autoFocus
            />
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 p-1"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>
      )}
    </header>
  );
};
