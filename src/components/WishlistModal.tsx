import React from 'react';
import { X, Heart, ShoppingBag, Trash2 } from 'lucide-react';
import { Product } from '../types';

interface WishlistModalProps {
  isOpen: boolean;
  onClose: () => void;
  products: Product[];
  wishlistIds: string[];
  onRemoveFromWishlist: (productId: string) => void;
  onAddToCart: (product: Product) => void;
}

export const WishlistModal: React.FC<WishlistModalProps> = ({
  isOpen,
  onClose,
  products,
  wishlistIds,
  onRemoveFromWishlist,
  onAddToCart
}) => {
  if (!isOpen) return null;

  const wishlistedProducts = products.filter((p) => wishlistIds.includes(p.id));

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-xs">
      <div className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl overflow-hidden my-auto max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="bg-[#0b1b36] text-white px-5 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Heart className="w-5 h-5 text-rose-400 fill-rose-400" />
            <h2 className="text-base font-bold">
              আপনার পছন্দের তালিকা ({wishlistedProducts.length})
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-1 text-slate-300 hover:text-white rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="overflow-y-auto p-4 space-y-3 flex-1">
          {wishlistedProducts.length === 0 ? (
            <div className="text-center py-12 text-slate-500 space-y-2">
              <Heart className="w-12 h-12 mx-auto text-slate-300" />
              <p className="text-sm font-bold text-slate-700">আপনার পছন্দের তালিকা খালি</p>
              <p className="text-xs text-slate-400 max-w-xs mx-auto">
                পণ্যের কার্ডে থাকা হার্ট আইকনে ক্লিক করে পছন্দের পণ্য এখানে সংরক্ষণ করতে পারেন।
              </p>
            </div>
          ) : (
            wishlistedProducts.map((product) => (
              <div
                key={product.id}
                className="p-3 bg-slate-50 rounded-2xl border border-slate-200 flex items-center justify-between gap-3"
              >
                <img
                  src={product.thumbnail}
                  alt={product.name}
                  referrerPolicy="no-referrer"
                  className="w-14 h-14 object-cover rounded-xl bg-white border border-slate-200 flex-shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <h4 className="text-xs font-bold text-slate-800 truncate">{product.name}</h4>
                  <div className="text-xs font-extrabold text-orange-600 mt-1">
                    ৳{product.price.toLocaleString('bn-BD')}
                  </div>
                </div>

                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => {
                      onAddToCart(product);
                      onRemoveFromWishlist(product.id);
                    }}
                    className="bg-orange-500 hover:bg-orange-600 text-white text-xs font-bold px-3 py-1.5 rounded-xl flex items-center gap-1 transition-colors"
                  >
                    <ShoppingBag className="w-3.5 h-3.5" />
                    <span>কার্ট</span>
                  </button>
                  <button
                    onClick={() => onRemoveFromWishlist(product.id)}
                    className="p-2 text-slate-400 hover:text-rose-500 hover:bg-rose-50 rounded-xl transition-colors"
                    title="মুছে ফেলুন"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
