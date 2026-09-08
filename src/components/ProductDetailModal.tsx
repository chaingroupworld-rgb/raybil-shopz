import React, { useState } from 'react';
import { Product } from '../types';
import {
  X,
  Star,
  ShieldCheck,
  Truck,
  RotateCcw,
  CheckCircle2,
  Heart,
  ShoppingCart,
  Zap,
  Share2,
  MapPin
} from 'lucide-react';

interface ProductDetailModalProps {
  product: Product | null;
  onClose: () => void;
  onAddToCart: (product: Product, quantity: number, color?: string, size?: string) => void;
  onBuyNow: (product: Product, quantity: number, color?: string, size?: string) => void;
  isWishlisted: boolean;
  onToggleWishlist: (productId: string) => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product,
  onClose,
  onAddToCart,
  onBuyNow,
  isWishlisted,
  onToggleWishlist
}) => {
  if (!product) return null;

  const [selectedImage, setSelectedImage] = useState<string>(product.thumbnail);
  const [selectedColor, setSelectedColor] = useState<string>(product.colors?.[0] || '');
  const [selectedSize, setSelectedSize] = useState<string>(product.sizes?.[0] || '');
  const [quantity, setQuantity] = useState<number>(1);
  const [deliveryLocation, setDeliveryLocation] = useState<'dhaka' | 'outside'>('dhaka');
  const [copiedToast, setCopiedToast] = useState(false);

  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.href);
    setCopiedToast(true);
    setTimeout(() => setCopiedToast(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/60 backdrop-blur-sm overflow-y-auto animate-fadeIn">
      <div className="relative w-full max-w-4xl bg-white rounded-3xl shadow-2xl overflow-hidden my-auto max-h-[95vh] flex flex-col">
        {/* Modal Top Bar */}
        <div className="flex items-center justify-between px-4 sm:px-6 py-3.5 border-b border-slate-100 bg-slate-50/70">
          <div className="flex items-center gap-2 text-xs font-semibold text-slate-500">
            <span>{product.categoryName}</span>
            <span>/</span>
            <span className="text-slate-800 truncate max-w-[200px] sm:max-w-xs">{product.name}</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleShare}
              className="p-2 text-slate-500 hover:text-slate-700 hover:bg-white rounded-full transition-colors relative"
              title="শেয়ার করুন"
            >
              <Share2 className="w-4 h-4" />
              {copiedToast && (
                <span className="absolute right-0 top-full mt-1 bg-[#0b1b36] text-white text-[10px] px-2 py-0.5 rounded shadow whitespace-nowrap">
                  লিংক কপি হয়েছে!
                </span>
              )}
            </button>
            <button
              onClick={onClose}
              className="p-2 text-slate-400 hover:text-slate-700 hover:bg-white rounded-full transition-colors"
              title="বন্ধ করুন"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Body: Scrollable */}
        <div className="overflow-y-auto p-4 sm:p-6 md:p-8 flex-1">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8">
            {/* Left Column: Image Gallery */}
            <div className="md:col-span-6 space-y-3">
              <div className="relative aspect-square w-full rounded-2xl overflow-hidden bg-slate-100 border border-slate-200">
                <img
                  src={selectedImage}
                  alt={product.name}
                  loading="lazy"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover transition-all duration-300"
                />

                {product.discountPercent > 0 && (
                  <span className="absolute top-3 left-3 bg-orange-600 text-white text-xs font-extrabold px-2.5 py-1 rounded-lg shadow-md">
                    -{product.discountPercent}% ছাড়
                  </span>
                )}

                <button
                  onClick={() => onToggleWishlist(product.id)}
                  className={`absolute top-3 right-3 p-2.5 rounded-full shadow-md transition-colors ${
                    isWishlisted ? 'bg-rose-50 text-rose-600' : 'bg-white text-slate-600 hover:text-rose-500'
                  }`}
                >
                  <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-rose-500' : ''}`} />
                </button>
              </div>

              {/* Thumbnails */}
              {product.images && product.images.length > 1 && (
                <div className="flex gap-2 overflow-x-auto pb-1">
                  {product.images.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedImage(img)}
                      className={`w-16 h-16 rounded-xl overflow-hidden border-2 flex-shrink-0 transition-all ${
                        selectedImage === img
                          ? 'border-orange-500 ring-2 ring-orange-500/20'
                          : 'border-slate-200 hover:border-slate-400'
                      }`}
                    >
                      <img
                        src={img}
                        alt=""
                        loading="lazy"
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}

              {/* Trust Indicators */}
              <div className="grid grid-cols-3 gap-2 pt-3 border-t border-slate-100 text-center text-[11px] text-slate-600">
                <div className="p-2 bg-slate-50 rounded-xl">
                  <ShieldCheck className="w-4 h-4 mx-auto mb-1 text-emerald-600" />
                  <span>১০০% অরিজিনাল</span>
                </div>
                <div className="p-2 bg-slate-50 rounded-xl">
                  <RotateCcw className="w-4 h-4 mx-auto mb-1 text-blue-600" />
                  <span>৭ দিনের রিটার্ন</span>
                </div>
                <div className="p-2 bg-slate-50 rounded-xl">
                  <Truck className="w-4 h-4 mx-auto mb-1 text-orange-600" />
                  <span>দ্রুত ডেলিভারি</span>
                </div>
              </div>
            </div>

            {/* Right Column: Product Info & Actions */}
            <div className="md:col-span-6 space-y-4">
              <div>
                <h1 className="text-xl sm:text-2xl font-extrabold text-[#0b1b36] leading-snug">
                  {product.name}
                </h1>
                <p className="text-xs text-slate-400 mt-0.5">{product.nameEn}</p>
              </div>

              {/* Rating & Stock */}
              <div className="flex items-center gap-3 text-xs">
                <div className="flex items-center gap-1 bg-amber-50 text-amber-800 px-2 py-1 rounded-md font-bold">
                  <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  <span>{product.rating}</span>
                </div>
                <span className="text-slate-500 font-medium">({product.reviewCount} টি ভেরিফাইড রিভিউ)</span>
                <span className="text-slate-300">|</span>
                <span className="text-emerald-700 font-semibold flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  ইন স্টক ({product.stockCount} টি এভেইলেবল)
                </span>
              </div>

              {/* Price Block */}
              <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200/80 flex items-baseline gap-3">
                <span className="text-2xl sm:text-3xl font-extrabold text-orange-600">
                  ৳{product.price.toLocaleString('bn-BD')}
                </span>
                {product.originalPrice > product.price && (
                  <span className="text-sm text-slate-400 line-through">
                    ৳{product.originalPrice.toLocaleString('bn-BD')}
                  </span>
                )}
                <span className="text-xs text-emerald-700 font-semibold bg-emerald-100 px-2 py-0.5 rounded-full ml-auto">
                  ৳{(product.originalPrice - product.price).toLocaleString('bn-BD')} সাশ্রয়
                </span>
              </div>

              {/* Short Description */}
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                {product.description}
              </p>

              {/* Color Picker */}
              {product.colors && product.colors.length > 0 && (
                <div>
                  <div className="text-xs font-bold text-slate-700 mb-1.5">
                    রং সিলেক্ট করুন: <span className="text-orange-600 font-semibold">{selectedColor}</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {product.colors.map((color) => (
                      <button
                        key={color}
                        onClick={() => setSelectedColor(color)}
                        className={`px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all ${
                          selectedColor === color
                            ? 'border-orange-500 bg-orange-50 text-orange-700 ring-2 ring-orange-500/20 font-bold'
                            : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300'
                        }`}
                      >
                        {color}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Size Picker */}
              {product.sizes && product.sizes.length > 0 && (
                <div>
                  <div className="text-xs font-bold text-slate-700 mb-1.5">
                    সাইজ: <span className="text-orange-600 font-semibold">{selectedSize}</span>
                  </div>
                  <div className="flex gap-2">
                    {product.sizes.map((size) => (
                      <button
                        key={size}
                        onClick={() => setSelectedSize(size)}
                        className={`w-10 h-10 rounded-xl text-xs font-bold border transition-all ${
                          selectedSize === size
                            ? 'border-orange-500 bg-orange-500 text-white'
                            : 'border-slate-200 bg-white text-slate-700 hover:border-slate-400'
                        }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Quantity Selector */}
              <div className="flex items-center gap-3 pt-1">
                <span className="text-xs font-bold text-slate-700">পরিমাণ:</span>
                <div className="flex items-center border border-slate-200 rounded-xl overflow-hidden bg-white shadow-2xs">
                  <button
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    className="w-8 h-8 flex items-center justify-center text-slate-600 hover:bg-slate-100 font-bold transition-colors"
                  >
                    -
                  </button>
                  <span className="w-10 text-center font-bold text-sm text-[#0b1b36]">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity((q) => Math.min(product.stockCount, q + 1))}
                    className="w-8 h-8 flex items-center justify-center text-slate-600 hover:bg-slate-100 font-bold transition-colors"
                  >
                    +
                  </button>
                </div>
                <span className="text-xs text-slate-400">
                  মোট: <strong>৳{(product.price * quantity).toLocaleString('bn-BD')}</strong>
                </span>
              </div>

              {/* Action Buttons */}
              <div className="grid grid-cols-2 gap-3 pt-2">
                <button
                  onClick={() => {
                    onAddToCart(product, quantity, selectedColor, selectedSize);
                    onClose();
                  }}
                  className="bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold py-3 px-4 rounded-xl text-xs sm:text-sm flex items-center justify-center gap-2 border border-slate-300 transition-all cursor-pointer"
                >
                  <ShoppingCart className="w-4 h-4 text-slate-700" />
                  <span>কার্টে যোগ করুন</span>
                </button>

                <button
                  onClick={() => {
                    onBuyNow(product, quantity, selectedColor, selectedSize);
                    onClose();
                  }}
                  className="bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-bold py-3 px-4 rounded-xl text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md shadow-orange-500/20 transition-all cursor-pointer"
                >
                  <Zap className="w-4 h-4" />
                  <span>এখনই কিনুন</span>
                </button>
              </div>

              {/* Delivery Estimation Box */}
              <div className="p-3 bg-blue-50/60 border border-blue-100 rounded-2xl text-xs space-y-2">
                <div className="flex items-center justify-between font-bold text-slate-800">
                  <span className="flex items-center gap-1 text-blue-900">
                    <MapPin className="w-3.5 h-3.5 text-blue-600" />
                    ডেলিভারি এরিয়া ও সময়:
                  </span>
                  <div className="flex gap-2">
                    <button
                      onClick={() => setDeliveryLocation('dhaka')}
                      className={`px-2 py-0.5 rounded text-[11px] font-semibold ${
                        deliveryLocation === 'dhaka'
                          ? 'bg-blue-600 text-white'
                          : 'bg-white text-slate-600'
                      }`}
                    >
                      ঢাকা সিটি
                    </button>
                    <button
                      onClick={() => setDeliveryLocation('outside')}
                      className={`px-2 py-0.5 rounded text-[11px] font-semibold ${
                        deliveryLocation === 'outside'
                          ? 'bg-blue-600 text-white'
                          : 'bg-white text-slate-600'
                      }`}
                    >
                      ঢাকার বাইরে
                    </button>
                  </div>
                </div>

                <p className="text-slate-600 text-[11px]">
                  {deliveryLocation === 'dhaka'
                    ? '🚚 ঢাকা সিটির ভেতর মাত্র ২৪ থেকে ৪৮ ঘণ্টায় হোম ডেলিভারি (চার্জ ৬০ টাকা)।'
                    : '🚚 ঢাকার বাইরে সারা দেশে ২ থেকে ৩ দিনে হোম ডেলিভারি (চার্জ ১২০ টাকা)।'}
                </p>
              </div>

              {/* Technical Specifications Accordion */}
              {product.specifications && (
                <div className="border-t border-slate-100 pt-3">
                  <div className="text-xs font-bold text-slate-700 mb-2">প্রোডাক্ট স্পেসিফিকেশন:</div>
                  <div className="grid grid-cols-2 gap-2 text-[11px]">
                    {Object.entries(product.specifications).map(([key, val]) => (
                      <div key={key} className="bg-slate-50 p-2 rounded-lg border border-slate-100">
                        <span className="text-slate-400 block">{key}</span>
                        <span className="font-semibold text-slate-700">{val}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
