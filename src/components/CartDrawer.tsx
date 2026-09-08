import React, { useState } from 'react';
import { X, Trash2, Plus, Minus, ArrowRight, ShieldCheck, Tag, ShoppingBag } from 'lucide-react';
import { CartItem } from '../types';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (productId: string, quantity: number, color?: string, size?: string) => void;
  onRemoveItem: (productId: string, color?: string, size?: string) => void;
  onProceedToCheckout: (appliedDiscount: number, couponCode: string) => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onProceedToCheckout
}) => {
  if (!isOpen) return null;

  const [couponInput, setCouponInput] = useState('');
  const [couponDiscount, setCouponDiscount] = useState(0);
  const [couponError, setCouponError] = useState('');
  const [couponSuccess, setCouponSuccess] = useState('');

  const subtotal = items.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  const freeShippingThreshold = 5000;
  const isFreeShipping = subtotal >= freeShippingThreshold;
  const deliveryFee = items.length === 0 ? 0 : isFreeShipping ? 0 : 60;
  const total = Math.max(0, subtotal - couponDiscount + deliveryFee);

  const applyCoupon = () => {
    setCouponError('');
    setCouponSuccess('');
    const code = couponInput.trim().toUpperCase();
    if (!code) return;

    if (code === 'RAYBIL10') {
      const discount = Math.round(subtotal * 0.1);
      setCouponDiscount(discount);
      setCouponSuccess(`'RAYBIL10' সফলভাবে অ্যাপ্লাই হয়েছে! (৳${discount} ছাড়)`);
    } else if (code === 'RAYBIL50') {
      setCouponDiscount(50);
      setCouponSuccess(`'RAYBIL50' সফলভাবে অ্যাপ্লাই হয়েছে! (৳৫০ ছাড়)`);
    } else {
      setCouponError('অবৈধ কুপন কোড! "RAYBIL10" ব্যবহার করুন।');
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="absolute inset-0 bg-black/50 backdrop-blur-xs transition-opacity animate-fadeIn"
      />

      {/* Drawer Container */}
      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col">
          {/* Drawer Header */}
          <div className="px-5 py-4 bg-[#0b1b36] text-white flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-orange-400" />
              <h2 className="font-bold text-base sm:text-lg">
                আপনার শপিং কার্ট ({items.reduce((a, b) => a + b.quantity, 0)})
              </h2>
            </div>
            <button
              onClick={onClose}
              className="p-1 text-slate-300 hover:text-white rounded-lg transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Free Shipping Progress Indicator */}
          <div className="bg-orange-50 px-5 py-2.5 border-b border-orange-100 text-xs">
            {isFreeShipping ? (
              <div className="text-emerald-700 font-bold flex items-center gap-1.5">
                <span>🎉 অভিনন্দন! আপনি সারা দেশে ফ্রি ডেলিভারি পাচ্ছেন!</span>
              </div>
            ) : (
              <div className="space-y-1">
                <div className="flex justify-between text-slate-700">
                  <span>ফ্রি ডেলিভারি পেতে আর মাত্র:</span>
                  <strong className="text-orange-600">
                    ৳{(freeShippingThreshold - subtotal).toLocaleString('bn-BD')} বাকি
                  </strong>
                </div>
                <div className="w-full bg-orange-200 rounded-full h-1.5 overflow-hidden">
                  <div
                    className="bg-orange-500 h-full rounded-full transition-all duration-300"
                    style={{ width: `${Math.min(100, (subtotal / freeShippingThreshold) * 100)}%` }}
                  />
                </div>
              </div>
            )}
          </div>

          {/* Cart Item List */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-3">
            {items.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-6 text-slate-500">
                <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mb-3">
                  <ShoppingBag className="w-8 h-8 text-slate-400" />
                </div>
                <h3 className="font-bold text-slate-800 text-base mb-1">কার্ট বর্তমানে খালি</h3>
                <p className="text-xs text-slate-500 max-w-xs mb-4">
                  আপনার পছন্দের পণ্যগুলো কার্টে যোগ করে সহজেই কেনাকাটা সম্পন্ন করুন।
                </p>
                <button
                  onClick={onClose}
                  className="bg-orange-500 hover:bg-orange-600 text-white text-xs font-bold px-5 py-2.5 rounded-xl transition-all"
                >
                  শপিং করতে ফিরে যান
                </button>
              </div>
            ) : (
              items.map((item, idx) => (
                <div
                  key={`${item.product.id}-${item.selectedColor}-${item.selectedSize}-${idx}`}
                  className="p-3 bg-slate-50 rounded-2xl border border-slate-200/80 flex gap-3 items-center"
                >
                  <img
                    src={item.product.thumbnail}
                    alt={item.product.name}
                    loading="lazy"
                    referrerPolicy="no-referrer"
                    className="w-16 h-16 object-cover rounded-xl bg-white border border-slate-200 flex-shrink-0"
                  />

                  <div className="flex-1 min-w-0">
                    <h4 className="text-xs font-bold text-slate-800 truncate">
                      {item.product.name}
                    </h4>
                    {(item.selectedColor || item.selectedSize) && (
                      <div className="flex gap-2 text-[10px] text-slate-500 mt-0.5">
                        {item.selectedColor && <span>রং: {item.selectedColor}</span>}
                        {item.selectedSize && <span>সাইজ: {item.selectedSize}</span>}
                      </div>
                    )}

                    <div className="flex items-center justify-between mt-2">
                      <span className="text-xs font-extrabold text-orange-600">
                        ৳{(item.product.price * item.quantity).toLocaleString('bn-BD')}
                      </span>

                      {/* Quantity Controller */}
                      <div className="flex items-center border border-slate-300 rounded-lg bg-white overflow-hidden text-xs">
                        <button
                          onClick={() =>
                            onUpdateQuantity(
                              item.product.id,
                              Math.max(1, item.quantity - 1),
                              item.selectedColor,
                              item.selectedSize
                            )
                          }
                          className="px-2 py-0.5 text-slate-600 hover:bg-slate-100"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="px-2 font-bold text-slate-800 text-xs">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() =>
                            onUpdateQuantity(
                              item.product.id,
                              item.quantity + 1,
                              item.selectedColor,
                              item.selectedSize
                            )
                          }
                          className="px-2 py-0.5 text-slate-600 hover:bg-slate-100"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Remove Button */}
                  <button
                    onClick={() =>
                      onRemoveItem(item.product.id, item.selectedColor, item.selectedSize)
                    }
                    className="p-1.5 text-slate-400 hover:text-rose-500 rounded-lg hover:bg-rose-50 transition-colors self-start"
                    title="মুছে ফেলুন"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))
            )}
          </div>

          {/* Drawer Footer / Checkout summary */}
          {items.length > 0 && (
            <div className="border-t border-slate-200 p-4 sm:p-5 bg-white space-y-3 shadow-inner">
              {/* Coupon Code Box */}
              <div className="space-y-1">
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <Tag className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      placeholder="কুপন কোড (RAYBIL10)"
                      value={couponInput}
                      onChange={(e) => setCouponInput(e.target.value)}
                      className="w-full pl-8 pr-3 py-1.5 text-xs bg-slate-100 rounded-xl border border-slate-200 uppercase outline-none focus:border-orange-500"
                    />
                  </div>
                  <button
                    onClick={applyCoupon}
                    className="bg-slate-800 hover:bg-slate-900 text-white text-xs font-bold px-3 py-1.5 rounded-xl transition-all"
                  >
                    প্রয়োগ
                  </button>
                </div>
                {couponSuccess && (
                  <p className="text-[11px] text-emerald-600 font-medium">{couponSuccess}</p>
                )}
                {couponError && (
                  <p className="text-[11px] text-rose-500 font-medium">{couponError}</p>
                )}
              </div>

              {/* Price Calculation Summary */}
              <div className="space-y-1.5 text-xs text-slate-600 border-t border-slate-100 pt-2">
                <div className="flex justify-between">
                  <span>সাবটোটাল</span>
                  <span className="font-semibold text-slate-800">
                    ৳{subtotal.toLocaleString('bn-BD')}
                  </span>
                </div>

                {couponDiscount > 0 && (
                  <div className="flex justify-between text-emerald-600 font-medium">
                    <span>কুপন ডিসকাউন্ট</span>
                    <span>-৳{couponDiscount.toLocaleString('bn-BD')}</span>
                  </div>
                )}

                <div className="flex justify-between">
                  <span>ডেলিভারি চার্জ</span>
                  <span>
                    {isFreeShipping ? (
                      <strong className="text-emerald-600">ফ্রি</strong>
                    ) : (
                      `৳${deliveryFee.toLocaleString('bn-BD')}`
                    )}
                  </span>
                </div>

                <div className="flex justify-between text-sm font-extrabold text-[#0b1b36] border-t border-slate-200 pt-2">
                  <span>সর্বমোট প্রদেয়</span>
                  <span className="text-orange-600 text-base">
                    ৳{total.toLocaleString('bn-BD')}
                  </span>
                </div>
              </div>

              {/* Checkout Button */}
              <button
                onClick={() => {
                  onProceedToCheckout(couponDiscount, couponInput);
                  onClose();
                }}
                className="w-full bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-bold py-3 px-4 rounded-xl text-sm flex items-center justify-center gap-2 shadow-md shadow-orange-500/20 transition-all cursor-pointer"
              >
                <span>নিরাপদ চেকআউট করুন</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="flex items-center justify-center gap-1.5 text-[11px] text-slate-400">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
                <span>২৫৬-বিট এনক্রিপ্টেড ও ৩D সিকিউর পেমেন্ট</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
