import React, { useState, useMemo } from 'react';
import { Product, Category } from '../types';
import { ProductCard } from './ProductCard';
import { Filter, SlidersHorizontal, ChevronLeft, ChevronRight, Sparkles, Smartphone, Monitor } from 'lucide-react';

interface ProductSectionProps {
  products: Product[];
  onSelectProduct: (product: Product) => void;
  onAddToCart: (product: Product, e: React.MouseEvent) => void;
  onToggleWishlist: (productId: string, e: React.MouseEvent) => void;
  wishlistIds: string[];
}

export const ProductSection: React.FC<ProductSectionProps> = ({
  products,
  onSelectProduct,
  onAddToCart,
  onToggleWishlist,
  wishlistIds
}) => {
  const [selectedCategory, setSelectedCategory] = useState<Category>('all');
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc' | 'rating'>('featured');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [mobileMode, setMobileMode] = useState<'4-on-screen' | '4-col-compact'>('4-on-screen');

  // Categories list
  const categories: { id: Category; label: string; icon: string }[] = [
    { id: 'all', label: 'সব পণ্য', icon: '🔥' },
    { id: 'audio', label: 'অডিও ও ইয়ারবাডস', icon: '🎧' },
    { id: 'smartwatch', label: 'স্মার্ট ওয়াচ', icon: '⌚' },
    { id: 'electronics', label: 'ইলেকট্রনিক্স ও গ্যাজেট', icon: '⚡' },
    { id: 'fashion', label: 'ফ্যাশন ও লেদার', icon: '👔' },
    { id: 'lifestyle', label: 'লাইফস্টাইল', icon: '✨' },
  ];

  // Filtered and Sorted products
  const filteredProducts = useMemo(() => {
    let list = [...products];
    if (selectedCategory !== 'all') {
      list = list.filter((p) => p.category === selectedCategory);
    }
    if (sortBy === 'price-asc') {
      list.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-desc') {
      list.sort((a, b) => b.price - a.price);
    } else if (sortBy === 'rating') {
      list.sort((a, b) => b.rating - a.rating);
    }
    return list;
  }, [products, selectedCategory, sortBy]);

  // Pagination for PC mode (STRICT: 3 items per row, 3 rows = 9 items per page)
  const ITEMS_PER_PAGE_PC = 9;
  const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE_PC);
  const currentPcProducts = filteredProducts.slice(
    (currentPage - 1) * ITEMS_PER_PAGE_PC,
    currentPage * ITEMS_PER_PAGE_PC
  );

  return (
    <section id="shop-section" className="max-w-7xl mx-auto px-3 sm:px-6 py-8 sm:py-12">
      {/* Section Header with Category Tabs & Sorting */}
      <div className="space-y-4 mb-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-orange-600 font-bold text-xs uppercase tracking-wider">
              <Sparkles className="w-4 h-4" />
              <span>Raybil এক্সক্লুসিভ কালেকশন</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0b1b36] mt-1">
              জনপ্রিয় সব প্রোডাক্ট
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
              PC মোডে প্রতি সারিতে ৩টি করে ৩ সারিতে মোট ৯টি এবং মোবাইল মোডে স্ক্রিনে ৪টি করে পণ্য প্রদর্শিত হচ্ছে।
            </p>
          </div>

          {/* Device Layout Badges & Filter Sort */}
          <div className="flex items-center flex-wrap gap-2">
            {/* Display rule indicators */}
            <div className="hidden lg:flex items-center gap-1.5 bg-slate-100 text-slate-700 text-xs px-3 py-1.5 rounded-xl border border-slate-200">
              <Monitor className="w-4 h-4 text-blue-600" />
              <span>PC মোড: <strong>৩×৩ = ৯টি পণ্য</strong></span>
            </div>

            <div className="lg:hidden flex items-center gap-1.5 bg-orange-50 text-orange-700 text-xs px-2.5 py-1.5 rounded-xl border border-orange-200">
              <Smartphone className="w-3.5 h-3.5 text-orange-600" />
              <span>মোবাইল মোড: <strong>স্ক্রিনে ৪টি পণ্য</strong></span>
            </div>

            {/* Sort Dropdown */}
            <div className="flex items-center gap-1.5 bg-white border border-slate-200 rounded-xl px-2.5 py-1.5 text-xs text-slate-700 shadow-2xs">
              <SlidersHorizontal className="w-3.5 h-3.5 text-slate-400" />
              <select
                value={sortBy}
                onChange={(e) => {
                  setSortBy(e.target.value as any);
                  setCurrentPage(1);
                }}
                className="bg-transparent font-semibold outline-none cursor-pointer text-slate-800"
              >
                <option value="featured">বাছাইকৃত (ফিচার্ড)</option>
                <option value="price-asc">দাম: কম থেকে বেশি</option>
                <option value="price-desc">দাম: বেশি থেকে কম</option>
                <option value="rating">সেরা রেটিং</option>
              </select>
            </div>
          </div>
        </div>

        {/* Category Pills Slider */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none no-scrollbar pt-1">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => {
                setSelectedCategory(cat.id);
                setCurrentPage(1);
              }}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all duration-200 cursor-pointer ${
                selectedCategory === cat.id
                  ? 'bg-[#0b1b36] text-white shadow-md shadow-slate-900/10 scale-102'
                  : 'bg-white text-slate-600 hover:text-[#0b1b36] hover:bg-slate-100 border border-slate-200'
              }`}
            >
              <span>{cat.icon}</span>
              <span>{cat.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* PC MODE DISPLAY: Exactly 3 items per row, 3 rows = 9 items per page */}
      <div className="hidden md:block">
        <div className="grid grid-cols-3 gap-6">
          {currentPcProducts.map((product) => (
            <div key={product.id} className="h-full">
              <ProductCard
                product={product}
                onSelect={onSelectProduct}
                onAddToCart={onAddToCart}
                onToggleWishlist={onToggleWishlist}
                isWishlisted={wishlistIds.includes(product.id)}
              />
            </div>
          ))}
        </div>

        {/* PC Pagination Controls */}
        {totalPages > 1 && (
          <div className="mt-8 flex items-center justify-between border-t border-slate-200 pt-6">
            <div className="text-xs text-slate-500">
              মোট <strong>{filteredProducts.length}</strong> টি পণ্যের মধ্যে{' '}
              <strong>{(currentPage - 1) * ITEMS_PER_PAGE_PC + 1}</strong> থেকে{' '}
              <strong>{Math.min(currentPage * ITEMS_PER_PAGE_PC, filteredProducts.length)}</strong> টি দেখাচ্ছে (৩×৩ = ৯টি প্রতি পৃষ্ঠায়)
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="p-2 rounded-xl border border-slate-200 bg-white text-slate-700 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
                title="পূর্ববর্তী পৃষ্ঠা"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>

              {Array.from({ length: totalPages }).map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentPage(idx + 1)}
                  className={`w-9 h-9 rounded-xl text-xs font-bold transition-all ${
                    currentPage === idx + 1
                      ? 'bg-orange-500 text-white shadow-sm'
                      : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  {(idx + 1).toLocaleString('bn-BD')}
                </button>
              ))}

              <button
                onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
                className="p-2 rounded-xl border border-slate-200 bg-white text-slate-700 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
                title="পরবর্তী পৃষ্ঠা"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* MOBILE MODE DISPLAY: Exactly 4 products cleanly displayed on screen */}
      <div className="md:hidden">
        {/* Mobile View Style Toggle: 2x2 Dense View (4 on screen) vs 4-Column Mini */}
        <div className="flex items-center justify-between mb-3 text-xs">
          <span className="text-slate-500">
            মোবাইল ভিউ: <strong className="text-slate-800">স্ক্রিনে ৪টি প্রোডাক্ট</strong>
          </span>
          <div className="flex items-center gap-1 bg-slate-200/80 p-0.5 rounded-lg text-[11px]">
            <button
              onClick={() => setMobileMode('4-on-screen')}
              className={`px-2 py-1 rounded-md font-semibold transition-all ${
                mobileMode === '4-on-screen' ? 'bg-white text-orange-600 shadow-2xs' : 'text-slate-600'
              }`}
            >
              ৪-টি স্ক্রিন গ্রিড (২×২)
            </button>
            <button
              onClick={() => setMobileMode('4-col-compact')}
              className={`px-2 py-1 rounded-md font-semibold transition-all ${
                mobileMode === '4-col-compact' ? 'bg-white text-orange-600 shadow-2xs' : 'text-slate-600'
              }`}
            >
              ৪-কলাম কমপ্যাক্ট
            </button>
          </div>
        </div>

        {mobileMode === '4-on-screen' ? (
          /* 2x2 Grid optimized to comfortably fit 4 products on mobile screen */
          <div className="grid grid-cols-2 gap-2.5">
            {filteredProducts.map((product) => (
              <div key={product.id} className="h-full">
                <ProductCard
                  product={product}
                  onSelect={onSelectProduct}
                  onAddToCart={onAddToCart}
                  onToggleWishlist={onToggleWishlist}
                  isWishlisted={wishlistIds.includes(product.id)}
                  compact={true}
                />
              </div>
            ))}
          </div>
        ) : (
          /* 4-column compact grid for phones */
          <div className="grid grid-cols-4 gap-1.5">
            {filteredProducts.map((product) => (
              <div
                key={product.id}
                onClick={() => onSelectProduct(product)}
                className="bg-white rounded-xl border border-slate-200 p-1.5 flex flex-col justify-between cursor-pointer hover:border-orange-400"
              >
                <div className="aspect-square w-full rounded-lg overflow-hidden bg-slate-100 mb-1">
                  <img
                    src={product.thumbnail}
                    alt={product.name}
                    loading="lazy"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="text-[10px] font-bold text-slate-800 line-clamp-1">
                  {product.name}
                </div>
                <div className="text-[11px] font-extrabold text-orange-600 mt-0.5">
                  ৳{product.price.toLocaleString('bn-BD')}
                </div>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onAddToCart(product, e);
                  }}
                  className="mt-1 w-full bg-[#0b1b36] text-white text-[9px] py-1 rounded font-bold hover:bg-orange-500 transition-colors"
                >
                  + যোগ
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};
