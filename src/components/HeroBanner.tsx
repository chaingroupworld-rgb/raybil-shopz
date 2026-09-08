import React from 'react';
import { Zap, ShieldCheck, Truck, ArrowRight, RotateCcw, Award } from 'lucide-react';

interface HeroBannerProps {
  onShopNow: () => void;
  onOpenTracking: () => void;
}

export const HeroBanner: React.FC<HeroBannerProps> = ({ onShopNow, onOpenTracking }) => {
  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-[#0b1b36] via-[#112648] to-[#071326] text-white">
      {/* Subtle Background Lighting & Grid Texture */}
      <div className="absolute inset-0 bg-[radial-gradient(#ffffff0a_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none opacity-40"></div>
      <div className="absolute -top-24 -right-24 w-96 h-96 bg-orange-500/20 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 sm:py-16 lg:py-20 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Content Column */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-orange-500/20 border border-orange-500/40 text-orange-300 text-xs sm:text-sm font-semibold backdrop-blur-sm">
              <Zap className="w-4 h-4 text-orange-400 fill-orange-400" />
              <span>Raybil স্পিড ডেলিভারি ও আধুনিক পেমেন্ট সিকিউরিটি</span>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight sm:leading-none text-white">
              স্মার্ট জীবনের <br className="hidden sm:inline" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-amber-300 to-orange-500">
                বিশ্বসেরা কেনাকাটা
              </span>
            </h1>

            <p className="text-slate-300 text-sm sm:text-base md:text-lg max-w-2xl mx-auto lg:mx-0 leading-relaxed">
              Raybil-এ উপভোগ করুন প্রিমিয়াম গ্যাজেট, ফ্যাশন ও লাইফস্টাইল পণ্য। প্রতিটি অর্ডারের সাথে পাচ্ছেন লাইভ রিয়েল-টাইম ট্র্যাকিং, ৩D সিকিউর পেমেন্ট ও ৭ দিনের ফ্রি রিটার্ন সুবিধা।
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 sm:gap-4 pt-2">
              <button
                onClick={onShopNow}
                className="inline-flex items-center gap-2 bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-bold px-6 sm:px-8 py-3.5 rounded-xl shadow-lg shadow-orange-500/25 transition-all duration-300 hover:scale-[1.02] cursor-pointer"
              >
                <span>এখনই শপিং শুরু করুন</span>
                <ArrowRight className="w-5 h-5" />
              </button>

              <button
                onClick={onOpenTracking}
                className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white border border-white/20 font-semibold px-5 sm:px-6 py-3.5 rounded-xl backdrop-blur-sm transition-all duration-200 cursor-pointer"
              >
                <Truck className="w-5 h-5 text-orange-400" />
                <span>অর্ডার লাইভ ট্র্যাক করুন</span>
              </button>
            </div>

            {/* Customer Rating & Delivery Stat */}
            <div className="pt-4 border-t border-white/10 flex flex-wrap items-center justify-center lg:justify-start gap-6 text-xs sm:text-sm text-slate-300">
              <div className="flex items-center gap-2">
                <div className="flex -space-x-2">
                  <img
                    className="inline-block h-7 w-7 rounded-full ring-2 ring-[#0b1b36] object-cover"
                    src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80"
                    alt="Customer"
                    referrerPolicy="no-referrer"
                  />
                  <img
                    className="inline-block h-7 w-7 rounded-full ring-2 ring-[#0b1b36] object-cover"
                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&q=80"
                    alt="Customer"
                    referrerPolicy="no-referrer"
                  />
                  <img
                    className="inline-block h-7 w-7 rounded-full ring-2 ring-[#0b1b36] object-cover"
                    src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100&q=80"
                    alt="Customer"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <span>
                  <strong className="text-white">১২,০০০+</strong> সন্তুষ্ট কাস্টমার
                </span>
              </div>
              <div className="flex items-center gap-1.5 text-amber-300">
                <span>★★★★★</span>
                <span className="text-white font-semibold">৪.৯/৫ রেটিং</span>
              </div>
            </div>
          </div>

          {/* Right Visual Card Showcase */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-sm sm:max-w-md lg:max-w-none">
              {/* Product Hero Showcase Image */}
              <div className="relative rounded-3xl overflow-hidden border border-white/15 bg-white/5 backdrop-blur-xl shadow-2xl p-3 sm:p-4">
                <div className="relative rounded-2xl overflow-hidden aspect-[4/3] bg-slate-900">
                  <img
                    src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80"
                    alt="Raybil Studio Pro ANC"
                    loading="lazy"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                  />
                  <div className="absolute top-3 left-3 bg-orange-500 text-white text-xs font-extrabold px-2.5 py-1 rounded-full shadow">
                    ২৮% স্পেশাল ডিসকাউন্ট
                  </div>
                </div>

                <div className="mt-4 flex items-center justify-between">
                  <div>
                    <h3 className="font-bold text-white text-base sm:text-lg">Raybil Studio Pro ANC</h3>
                    <p className="text-xs text-slate-300">৬০ ঘণ্টার ব্যাটারি ও হাই-রেজ সাউন্ড</p>
                  </div>
                  <div className="text-right">
                    <span className="text-xs text-slate-400 line-through">৳৬,৫০০</span>
                    <div className="text-lg sm:text-xl font-extrabold text-orange-400">৳৪,৬৯০</div>
                  </div>
                </div>

                {/* Live Tracking Floating Badge */}
                <div className="mt-3 bg-slate-900/80 rounded-xl p-2.5 border border-white/10 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <span className="relative flex h-2.5 w-2.5">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
                    </span>
                    <span className="text-emerald-300 font-medium">লাইভ অর্ডার ট্র্যাকিং সক্রিয়</span>
                  </div>
                  <span className="text-slate-300 font-mono text-[11px]">ID: RB-84920</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Value Propositions / Trust Grid */}
        <div className="mt-12 sm:mt-16 grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-6 border-t border-white/10 pt-8">
          <div className="flex items-center gap-3 bg-white/5 p-3 sm:p-4 rounded-2xl border border-white/5">
            <div className="w-10 h-10 rounded-xl bg-orange-500/20 text-orange-400 flex items-center justify-center flex-shrink-0">
              <Truck className="w-5 h-5" />
            </div>
            <div>
              <div className="font-bold text-white text-xs sm:text-sm">সুপারফাস্ট ডেলিভারি</div>
              <div className="text-[11px] sm:text-xs text-slate-400">ঢাকাতে ২৪ ঘণ্টার মধ্যে</div>
            </div>
          </div>

          <div className="flex items-center gap-3 bg-white/5 p-3 sm:p-4 rounded-2xl border border-white/5">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center flex-shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <div className="font-bold text-white text-xs sm:text-sm">নিরাপদ পেমেন্ট</div>
              <div className="text-[11px] sm:text-xs text-slate-400">২৫৬-বিট এনক্রিপ্টেড গেটওয়ে</div>
            </div>
          </div>

          <div className="flex items-center gap-3 bg-white/5 p-3 sm:p-4 rounded-2xl border border-white/5">
            <div className="w-10 h-10 rounded-xl bg-blue-500/20 text-blue-400 flex items-center justify-center flex-shrink-0">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <div className="font-bold text-white text-xs sm:text-sm">১০০% আসল পণ্য</div>
              <div className="text-[11px] sm:text-xs text-slate-400">অফিসিয়াল ব্র্যান্ড ওয়ারেন্টি</div>
            </div>
          </div>

          <div className="flex items-center gap-3 bg-white/5 p-3 sm:p-4 rounded-2xl border border-white/5">
            <div className="w-10 h-10 rounded-xl bg-purple-500/20 text-purple-400 flex items-center justify-center flex-shrink-0">
              <RotateCcw className="w-5 h-5" />
            </div>
            <div>
              <div className="font-bold text-white text-xs sm:text-sm">৭ দিনের সহজ রিটার্ন</div>
              <div className="text-[11px] sm:text-xs text-slate-400">ঝামেলাহীন ক্যাশব্যাক</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
