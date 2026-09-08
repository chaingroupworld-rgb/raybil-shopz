import React from 'react';
import { RaybilLogo } from './RaybilLogo';
import { Phone, Mail, MapPin, ShieldCheck, Truck, Lock, ArrowRight } from 'lucide-react';

interface FooterProps {
  onOpenTracking: () => void;
  onNavigateHome: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenTracking, onNavigateHome }) => {
  return (
    <footer className="bg-[#0b1b36] text-slate-300 pt-12 pb-8 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 pb-10 border-b border-slate-800/80">
          {/* Brand Column */}
          <div className="lg:col-span-2 space-y-4">
            <div className="cursor-pointer" onClick={onNavigateHome}>
              <RaybilLogo size="lg" textColor="text-white" />
            </div>
            <p className="text-xs sm:text-sm text-slate-400 max-w-sm leading-relaxed">
              Raybil — বাংলাদেশের অন্যতম প্রিমিয়াম অনলাইন শপিং প্ল্যাটফর্ম। আমরা নিশ্চিত করি ১০০% অথেন্টিক গ্যাজেট ও লাইফস্টাইল পণ্য, আধুনিকতম পেমেন্ট সিকিউরিটি এবং লাইভ রিয়েল-টাইম পার্সেল ট্র্যাকিং সুবিধা।
            </p>

            <div className="pt-2 flex flex-col gap-2 text-xs text-slate-300">
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-orange-400 flex-shrink-0" />
                <span>হটলাইন: ০৯৬১২-৩৪৫৬৭৮ (সকাল ৯টা - রাত ১১টা)</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-orange-400 flex-shrink-0" />
                <span>ইমেইল: support@raybil.com</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-orange-400 flex-shrink-0" />
                <span>হেড অফিস: লেভেল ৮, প্রগতি সরণি, গুলশান, ঢাকা-১২১২</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="text-white text-sm font-bold tracking-wider uppercase">প্রয়োজনীয় লিংক</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={onNavigateHome} className="hover:text-orange-400 transition-colors">
                  হোম পেজ
                </button>
              </li>
              <li>
                <button onClick={onOpenTracking} className="hover:text-orange-400 transition-colors flex items-center gap-1">
                  <Truck className="w-3.5 h-3.5 text-orange-400" />
                  <span>লাইভ অর্ডার ট্র্যাকিং</span>
                </button>
              </li>
              <li>
                <a href="#shop-section" className="hover:text-orange-400 transition-colors">
                  সকল প্রডাক্ট ও কালেকশন
                </a>
              </li>
              <li>
                <span className="hover:text-orange-400 transition-colors cursor-pointer">
                  হট ডিল ও মেগা ডিসকাউন্ট
                </span>
              </li>
            </ul>
          </div>

          {/* Customer Service & Policies */}
          <div className="space-y-3">
            <h4 className="text-white text-sm font-bold tracking-wider uppercase">গ্রাহক সেবা</h4>
            <ul className="space-y-2 text-xs">
              <li className="hover:text-orange-400 transition-colors cursor-pointer">
                ৭ দিনের রিটার্ন ও রিফান্ড পলিসি
              </li>
              <li className="hover:text-orange-400 transition-colors cursor-pointer">
                ওয়ারেন্টি ক্লেইম গাইড
              </li>
              <li className="hover:text-orange-400 transition-colors cursor-pointer">
                ডেলিভারি টার্মস ও কন্ডিশন
              </li>
              <li className="hover:text-orange-400 transition-colors cursor-pointer">
                প্রাইভেসি পলিসি ও সিকিউরিটি
              </li>
            </ul>
          </div>

          {/* Newsletter / Security Guarantee */}
          <div className="space-y-3">
            <h4 className="text-white text-sm font-bold tracking-wider uppercase">নিউজলেটার</h4>
            <p className="text-xs text-slate-400">
              নতুন অফার ও ডিসকাউন্ট ভাউচার পেতে আপনার ইমেইল দিন:
            </p>
            <div className="flex gap-2">
              <input
                type="email"
                placeholder="আপনার ইমেইল"
                className="w-full bg-slate-800/80 border border-slate-700 text-xs px-3 py-2 rounded-xl text-white outline-none focus:border-orange-500"
              />
              <button
                className="bg-orange-500 hover:bg-orange-600 text-white px-3 py-2 rounded-xl text-xs font-bold transition-all"
                title="সাবস্ক্রাইব"
              >
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            <div className="pt-2 flex items-center gap-2 text-[11px] text-emerald-400 font-medium">
              <ShieldCheck className="w-4 h-4" />
              <span>TLS 1.3 ও ২৫৬-বিট এনক্রিপ্টেড সুরক্ষিত শপ</span>
            </div>
          </div>
        </div>

        {/* Payment Methods Badges & Copyright */}
        <div className="pt-6 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <div>
            © {new Date().getFullYear()} <strong>Raybil Technologies Ltd.</strong> সর্বস্বত্ব সংরক্ষিত।
          </div>

          {/* Supported Payment Channels */}
          <div className="flex items-center flex-wrap gap-2 text-[11px]">
            <span className="text-slate-400 mr-1 flex items-center gap-1">
              <Lock className="w-3 h-3 text-emerald-400" />
              স্বীকৃত পেমেন্ট পার্টনার:
            </span>
            <span className="bg-white/10 px-2.5 py-1 rounded-md text-[#e2136e] font-bold border border-white/10">
              bKash
            </span>
            <span className="bg-white/10 px-2.5 py-1 rounded-md text-[#f7941d] font-bold border border-white/10">
              Nagad
            </span>
            <span className="bg-white/10 px-2.5 py-1 rounded-md text-purple-400 font-bold border border-white/10">
              Rocket
            </span>
            <span className="bg-white/10 px-2.5 py-1 rounded-md text-blue-400 font-bold border border-white/10">
              VISA
            </span>
            <span className="bg-white/10 px-2.5 py-1 rounded-md text-amber-400 font-bold border border-white/10">
              MasterCard
            </span>
            <span className="bg-white/10 px-2.5 py-1 rounded-md text-emerald-400 font-bold border border-white/10">
              Cash on Delivery
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};
