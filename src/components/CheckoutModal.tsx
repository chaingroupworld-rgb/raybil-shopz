import React, { useState } from 'react';
import {
  X,
  ShieldCheck,
  Lock,
  CreditCard,
  Truck,
  CheckCircle2,
  AlertCircle,
  Smartphone,
  Check,
  KeyRound
} from 'lucide-react';
import { CartItem, Order, PaymentMethod } from '../types';
import confetti from 'canvas-confetti';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  subtotal: number;
  discount: number;
  onOrderPlaced: (order: Order) => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  items,
  subtotal,
  discount,
  onOrderPlaced
}) => {
  if (!isOpen) return null;

  // Form states
  const [customerName, setCustomerName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('ঢাকা');
  const [notes, setNotes] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('bkash');

  // Payment gateway simulation states
  const [bkashNumber, setBkashNumber] = useState('');
  const [bkashOtp, setBkashOtp] = useState('');
  const [bkashPin, setBkashPin] = useState('');
  const [bkashStep, setBkashStep] = useState<'phone' | 'otp' | 'pin'>('phone');

  // Card fields
  const [cardNumber, setCardNumber] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCvv, setCardCvv] = useState('');
  const [cardName, setCardName] = useState('');

  // Processing state
  const [isProcessing, setIsProcessing] = useState(false);
  const [formError, setFormError] = useState('');

  const deliveryFee = city === 'ঢাকা' ? 60 : 120;
  const total = Math.max(0, subtotal - discount + deliveryFee);

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    setFormError('');

    if (!customerName.trim()) {
      setFormError('দয়া করে আপনার নাম লিখুন।');
      return;
    }
    if (!phone.trim() || phone.length < 11) {
      setFormError('সঠিক ১১ ডিজিটের মোবাইল নম্বর দিন (যেমন: 01712345678)।');
      return;
    }
    if (!address.trim()) {
      setFormError('সম্পূর্ণ ডেলিভারি ঠিকানা লিখুন।');
      return;
    }

    // Payment validation
    if (paymentMethod === 'bkash' && bkashStep !== 'pin') {
      if (!bkashNumber || bkashNumber.length < 11) {
        setFormError('সঠিক ১১ ডিজিটের বিকাশ নম্বর দিন।');
        return;
      }
      setBkashStep('otp');
      return;
    }

    if (paymentMethod === 'bkash' && bkashStep === 'otp') {
      if (!bkashOtp || bkashOtp.length < 4) {
        setFormError('বিকাশ ওটিপি (যেমন: 123456) প্রদান করুন।');
        return;
      }
      setBkashStep('pin');
      return;
    }

    if (paymentMethod === 'bkash' && bkashStep === 'pin') {
      if (!bkashPin || bkashPin.length < 4) {
        setFormError('আপনার গোপন বিকাশ পিন দিন।');
        return;
      }
    }

    if (paymentMethod === 'card') {
      if (!cardNumber || cardNumber.replace(/\s/g, '').length < 16) {
        setFormError('সঠিক ১৬ ডিজিটের কার্ড নম্বর দিন।');
        return;
      }
      if (!cardExpiry || !cardCvv) {
        setFormError('কার্ডের মেয়াদ (MM/YY) ও CVV পূরণ করুন।');
        return;
      }
    }

    // Start payment processing simulation
    setIsProcessing(true);

    setTimeout(() => {
      setIsProcessing(false);

      // Generate unique Raybil Order ID
      const newOrderId = `RB-${Math.floor(10000 + Math.random() * 90000)}`;

      const newOrder: Order = {
        id: newOrderId,
        date: 'এখনই মাত্র প্লেস করা হয়েছে',
        customerName,
        phone,
        email: email || `${phone}@raybil-customer.com`,
        address,
        city,
        notes,
        paymentMethod,
        paymentStatus: paymentMethod === 'cod' ? 'pending' : 'paid',
        orderStatus: 'confirmed',
        items: [...items],
        subtotal,
        deliveryFee,
        discount,
        total,
        estimatedDeliveryDate:
          city === 'ঢাকা' ? 'আগামীকাল বিকেল ৫:০০ টার মধ্যে' : '২ থেকে ৩ দিনের মধ্যে',
        courierName: 'Raybil এক্সপ্রেস ডেলিভারি হাব',
        trackingTimeline: [
          {
            status: 'confirmed',
            title: 'অর্ডার নিশ্চিত হয়েছে ও পেমেন্ট অনুমোদিত',
            description: `${
              paymentMethod === 'cod' ? 'ক্যাশ অন ডেলিভারি ভেরিফাইড' : 'নিরাপদ গেটওয়েতে সম্পূর্ণ পরিশোধিত'
            }। আপনার ডিজিটাল চালান প্রস্তুত করা হয়েছে।`,
            timestamp: 'কয়েক সেকেন্ড আগে',
            completed: true,
            current: true,
            location: 'Raybil অনলাইন গেটওয়ে, ঢাকা'
          },
          {
            status: 'processing',
            title: 'প্যাকেজিং ও সিকিউরিটি সিল',
            description: 'সেন্ট্রাল ওয়ারহাউস থেকে মালামাল সংগ্রহ ও কোয়ালিটি চেকিং শুরু হচ্ছে।',
            timestamp: 'আসন্ন',
            completed: false,
            current: false,
            location: 'Raybil সেন্ট্রাল হাব'
          },
          {
            status: 'shipped',
            title: 'কুরিয়ারে হস্তান্তর',
            description: 'পার্সেলটি হাব থেকে আঞ্চলিক ডেলিভারি পয়েন্টে পাঠানো হবে।',
            timestamp: 'আসন্ন',
            completed: false,
            current: false,
            location: 'ডিস্ট্রিবিউশন হাব'
          },
          {
            status: 'out_for_delivery',
            title: 'ডেলিভারির জন্য বের হবে',
            description: 'ডেডিকেটেড রাইডার আপনার ঠিকানায় রওয়ানা হবে।',
            timestamp: 'আসন্ন',
            completed: false,
            current: false,
            location: address
          },
          {
            status: 'delivered',
            title: 'সফল ডেলিভারি সম্পন্ন',
            description: 'গ্রাহকের নিকট পার্সেল পৌঁছানো সম্পন্ন হবে।',
            timestamp: 'প্রত্যাশিত: ২৪ ঘণ্টার মধ্যে',
            completed: false,
            current: false,
            location: address
          }
        ],
        rider: {
          name: 'তানভীর আহমেদ',
          phone: '01892-887766',
          rating: 4.95,
          vehicle: 'হন্ডা ১২৫সিসি (ঢাকা মেট্রো-হ-৮৪২১)',
          photoUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
          etaMinutes: 30
        }
      };

      // Trigger celebratory confetti
      try {
        confetti({
          particleCount: 120,
          spread: 70,
          origin: { y: 0.6 }
        });
      } catch (err) {
        // Safe fallback
      }

      onOrderPlaced(newOrder);
      onClose();
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/60 backdrop-blur-sm overflow-y-auto">
      <div className="relative w-full max-w-3xl bg-white rounded-3xl shadow-2xl overflow-hidden my-auto max-h-[96vh] flex flex-col">
        {/* Header */}
        <div className="bg-[#0b1b36] text-white px-5 sm:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-orange-500/20 text-orange-400 flex items-center justify-center">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-bold">Raybil নিরাপদ চেকআউট</h2>
              <p className="text-[11px] text-slate-300 flex items-center gap-1.5">
                <Lock className="w-3 h-3 text-emerald-400" />
                <span>২৫৬-বিট এন্ড-টু-এন্ড এনক্রিপশন ও ৩D সিকিউর ২.০</span>
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-300 hover:text-white rounded-lg hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Security Assurance Banner */}
        <div className="bg-emerald-50 px-5 sm:px-8 py-2 border-b border-emerald-100 flex items-center justify-between text-xs text-emerald-800">
          <div className="flex items-center gap-2 font-medium">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
            <span>PCI-DSS লেভেল ১ সার্টিফাইড সুরক্ষিত পেমেন্ট গেটওয়ে</span>
          </div>
          <span className="text-[11px] bg-emerald-100 text-emerald-900 font-bold px-2 py-0.5 rounded">
            TLS 1.3 অ্যাক্টিভ
          </span>
        </div>

        {/* Body */}
        <form onSubmit={handlePlaceOrder} className="overflow-y-auto p-4 sm:p-6 md:p-8 space-y-6 flex-1">
          {formError && (
            <div className="p-3 bg-rose-50 border border-rose-200 text-rose-700 text-xs rounded-xl flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-rose-500 flex-shrink-0" />
              <span>{formError}</span>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
            {/* Left Form: Shipping Details */}
            <div className="md:col-span-7 space-y-4">
              <h3 className="text-sm font-bold text-slate-800 flex items-center gap-2 border-b border-slate-100 pb-2">
                <Truck className="w-4 h-4 text-orange-600" />
                ১. ডেলিভারির তথ্য (Shipping Address)
              </h3>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  আপনার সম্পূর্ণ নাম <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  placeholder="যেমন: মুহাম্মদ হাসান"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  className="w-full text-xs sm:text-sm px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-orange-500 outline-none"
                  required
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    মোবাইল নম্বর <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="tel"
                    placeholder="01712345678"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full text-xs sm:text-sm px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-orange-500 outline-none"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    শহর / জেলা <span className="text-rose-500">*</span>
                  </label>
                  <select
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="w-full text-xs sm:text-sm px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-orange-500 outline-none"
                  >
                    <option value="ঢাকা">ঢাকা (২৪-৪৮ ঘণ্টা ডেলিভারি)</option>
                    <option value="চট্টগ্রাম">চট্টগ্রাম</option>
                    <option value="সিলেট">সিলেট</option>
                    <option value="রাজশাহী">রাজশাহী</option>
                    <option value="খুলনা">খুলনা</option>
                    <option value="বরিশাল">বরিশাল</option>
                    <option value="রংপুর">রংপুর</option>
                    <option value="ময়মনসিংহ">ময়মনসিংহ</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  সম্পূর্ণ ঠিকানা (বাসা/রোড/এলাকা) <span className="text-rose-500">*</span>
                </label>
                <textarea
                  placeholder="বাড়ি নং, রোড নং, এলাকা বা ল্যান্ডমার্ক..."
                  rows={2}
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="w-full text-xs sm:text-sm px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-orange-500 outline-none"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  বিশেষ ডেলিভারি নোট (ঐচ্ছিক)
                </label>
                <input
                  type="text"
                  placeholder="যেমন: আসার আগে কল দিবেন / সিকিউরিটির কাছে রাখবেন"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="w-full text-xs px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-orange-500 outline-none"
                />
              </div>
            </div>

            {/* Right Form: Payment Methods with Modern Security */}
            <div className="md:col-span-5 space-y-4">
              <h3 className="text-sm font-bold text-slate-800 flex items-center gap-2 border-b border-slate-100 pb-2">
                <Lock className="w-4 h-4 text-emerald-600" />
                ২. নিরাপদ পেমেন্ট মাধ্যম
              </h3>

              {/* Payment Method Selector Pills */}
              <div className="grid grid-cols-2 gap-2">
                {/* bKash */}
                <button
                  type="button"
                  onClick={() => {
                    setPaymentMethod('bkash');
                    setBkashStep('phone');
                  }}
                  className={`p-2.5 rounded-xl border text-left flex items-center gap-2 transition-all ${
                    paymentMethod === 'bkash'
                      ? 'border-[#e2136e] bg-[#e2136e]/5 ring-2 ring-[#e2136e]/20'
                      : 'border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <div className="w-6 h-6 rounded-md bg-[#e2136e] text-white flex items-center justify-center font-bold text-xs">
                    ব
                  </div>
                  <div>
                    <div className="text-xs font-bold text-slate-800">বিকাশ (bKash)</div>
                    <div className="text-[10px] text-slate-500">অনলাইন গেটওয়ে</div>
                  </div>
                </button>

                {/* Nagad */}
                <button
                  type="button"
                  onClick={() => setPaymentMethod('nagad')}
                  className={`p-2.5 rounded-xl border text-left flex items-center gap-2 transition-all ${
                    paymentMethod === 'nagad'
                      ? 'border-[#f7941d] bg-[#f7941d]/5 ring-2 ring-[#f7941d]/20'
                      : 'border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <div className="w-6 h-6 rounded-md bg-[#f7941d] text-white flex items-center justify-center font-bold text-xs">
                    ন
                  </div>
                  <div>
                    <div className="text-xs font-bold text-slate-800">নগদ (Nagad)</div>
                    <div className="text-[10px] text-slate-500">ফাস্ট পে</div>
                  </div>
                </button>

                {/* Card */}
                <button
                  type="button"
                  onClick={() => setPaymentMethod('card')}
                  className={`p-2.5 rounded-xl border text-left flex items-center gap-2 transition-all ${
                    paymentMethod === 'card'
                      ? 'border-blue-600 bg-blue-50/50 ring-2 ring-blue-500/20'
                      : 'border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <CreditCard className="w-5 h-5 text-blue-600" />
                  <div>
                    <div className="text-xs font-bold text-slate-800">কার্ড (Visa/Master)</div>
                    <div className="text-[10px] text-slate-500">৩D সিকিউর</div>
                  </div>
                </button>

                {/* Cash on Delivery */}
                <button
                  type="button"
                  onClick={() => setPaymentMethod('cod')}
                  className={`p-2.5 rounded-xl border text-left flex items-center gap-2 transition-all ${
                    paymentMethod === 'cod'
                      ? 'border-slate-800 bg-slate-50 ring-2 ring-slate-800/20'
                      : 'border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <Truck className="w-5 h-5 text-slate-700" />
                  <div>
                    <div className="text-xs font-bold text-slate-800">ক্যাশ অন ডেলিভারি</div>
                    <div className="text-[10px] text-slate-500">হাতে পেয়ে টাকা</div>
                  </div>
                </button>
              </div>

              {/* Dynamic Gateway Interactive Panel */}
              {paymentMethod === 'bkash' && (
                <div className="p-3.5 bg-[#e2136e]/5 border border-[#e2136e]/20 rounded-2xl space-y-3">
                  <div className="flex items-center justify-between text-xs text-[#e2136e] font-bold">
                    <span className="flex items-center gap-1.5">
                      <Smartphone className="w-4 h-4" />
                      বিকাশ পেমেন্ট গেটওয়ে (অফিসিয়াল)
                    </span>
                    <span className="text-[10px] bg-[#e2136e] text-white px-2 py-0.5 rounded-full">
                      Secured
                    </span>
                  </div>

                  {bkashStep === 'phone' && (
                    <div className="space-y-2">
                      <label className="block text-[11px] text-slate-600">
                        আপনার বিকাশ একাউন্ট নম্বর দিন:
                      </label>
                      <input
                        type="tel"
                        placeholder="01XXXXXXXXX"
                        value={bkashNumber}
                        onChange={(e) => setBkashNumber(e.target.value)}
                        className="w-full text-xs px-3 py-2 bg-white border border-slate-300 rounded-xl outline-none focus:border-[#e2136e]"
                      />
                      <p className="text-[10px] text-slate-500">
                        * পরবর্তীতে একটি ৬ ডিজিটের সিক্রেট ওটিপি ভেরিফিকেশন কোড পাঠানো হবে।
                      </p>
                    </div>
                  )}

                  {bkashStep === 'otp' && (
                    <div className="space-y-2">
                      <div className="text-[11px] text-slate-600 flex justify-between">
                        <span>{bkashNumber}-এ পাঠানো ওটিপি দিন:</span>
                        <span className="text-[#e2136e] font-bold">ডেমো ওটিপি: 123456</span>
                      </div>
                      <input
                        type="text"
                        placeholder="৬ ডিজিটের OTP কোড"
                        value={bkashOtp}
                        onChange={(e) => setBkashOtp(e.target.value)}
                        className="w-full text-xs px-3 py-2 bg-white border border-[#e2136e] rounded-xl outline-none text-center font-mono tracking-widest text-sm"
                      />
                    </div>
                  )}

                  {bkashStep === 'pin' && (
                    <div className="space-y-2">
                      <label className="block text-[11px] text-slate-600">
                        আপনার গোপন বিকাশ পিন (PIN) দিন:
                      </label>
                      <input
                        type="password"
                        placeholder="• • • • •"
                        maxLength={5}
                        value={bkashPin}
                        onChange={(e) => setBkashPin(e.target.value)}
                        className="w-full text-xs px-3 py-2 bg-white border border-[#e2136e] rounded-xl outline-none text-center text-base tracking-widest"
                      />
                      <div className="flex items-center gap-1 text-[10px] text-slate-500">
                        <KeyRound className="w-3 h-3 text-emerald-600" />
                        <span>আপনার পিন সম্পূর্ণভাবে এনক্রিপ্টেড থাকে এবং কখনো সংরক্ষিত হয় না।</span>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {paymentMethod === 'card' && (
                <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-2xl space-y-2.5">
                  <div className="flex items-center justify-between text-xs font-bold text-slate-800">
                    <span>কার্ডের বিবরণ</span>
                    <span className="text-[10px] text-emerald-600 flex items-center gap-1 font-semibold">
                      <Lock className="w-3 h-3" /> Tokenized Security
                    </span>
                  </div>

                  <input
                    type="text"
                    placeholder="কার্ডে থাকা নাম (Cardholder Name)"
                    value={cardName}
                    onChange={(e) => setCardName(e.target.value)}
                    className="w-full text-xs px-3 py-2 bg-white border border-slate-300 rounded-xl outline-none"
                  />

                  <input
                    type="text"
                    placeholder="১৬ ডিজিটের কার্ড নম্বর (0000 0000 0000 0000)"
                    maxLength={19}
                    value={cardNumber}
                    onChange={(e) => setCardNumber(e.target.value)}
                    className="w-full text-xs px-3 py-2 bg-white border border-slate-300 rounded-xl outline-none font-mono"
                  />

                  <div className="grid grid-cols-2 gap-2">
                    <input
                      type="text"
                      placeholder="MM/YY"
                      maxLength={5}
                      value={cardExpiry}
                      onChange={(e) => setCardExpiry(e.target.value)}
                      className="w-full text-xs px-3 py-2 bg-white border border-slate-300 rounded-xl outline-none text-center"
                    />
                    <input
                      type="password"
                      placeholder="CVV / CVC (3 ডিজিট)"
                      maxLength={4}
                      value={cardCvv}
                      onChange={(e) => setCardCvv(e.target.value)}
                      className="w-full text-xs px-3 py-2 bg-white border border-slate-300 rounded-xl outline-none text-center"
                    />
                  </div>
                </div>
              )}

              {paymentMethod === 'cod' && (
                <div className="p-3.5 bg-amber-50 border border-amber-200 rounded-2xl text-xs text-amber-900 space-y-1">
                  <div className="font-bold flex items-center gap-1.5">
                    <Truck className="w-4 h-4 text-amber-600" />
                    <span>ক্যাশ অন ডেলিভারি নির্দেশিকা</span>
                  </div>
                  <p className="text-[11px] text-amber-800 leading-relaxed">
                    পণ্যটি হাতে পাওয়ার পর ডেলিভারি ম্যানের সামনে চেক করে সম্পূর্ণ মূল্য ক্যাশ বা তাৎক্ষণিক ডিজিটাল পে করতে পারবেন।
                  </p>
                </div>
              )}

              {/* Order Amount Summary Mini-Card */}
              <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200 text-xs space-y-1.5">
                <div className="flex justify-between text-slate-600">
                  <span>পণ্য সাবটোটাল ({items.length} আইটেম)</span>
                  <span>৳{subtotal.toLocaleString('bn-BD')}</span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-emerald-600 font-medium">
                    <span>ডিসকাউন্ট</span>
                    <span>-৳{discount.toLocaleString('bn-BD')}</span>
                  </div>
                )}
                <div className="flex justify-between text-slate-600">
                  <span>হোম ডেলিভারি চার্জ ({city})</span>
                  <span>৳{deliveryFee.toLocaleString('bn-BD')}</span>
                </div>
                <div className="flex justify-between text-sm font-extrabold text-[#0b1b36] border-t border-slate-200 pt-1.5">
                  <span>মোট প্রদেয় টাকা</span>
                  <span className="text-orange-600 text-base">
                    ৳{total.toLocaleString('bn-BD')}
                  </span>
                </div>
              </div>

              {/* Submit CTA */}
              <button
                type="submit"
                disabled={isProcessing}
                className="w-full bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-bold py-3.5 px-4 rounded-xl text-sm flex items-center justify-center gap-2 shadow-lg shadow-orange-500/20 transition-all cursor-pointer disabled:opacity-50"
              >
                {isProcessing ? (
                  <span className="flex items-center gap-2">
                    <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                    নিরাপদ গেটওয়ে প্রসেসিং হচ্ছে...
                  </span>
                ) : (
                  <>
                    <Lock className="w-4 h-4" />
                    <span>
                      {paymentMethod === 'bkash' && bkashStep === 'phone'
                        ? 'বিকাশ ওটিপি পাঠান'
                        : paymentMethod === 'bkash' && bkashStep === 'otp'
                        ? 'ওটিপি ভেরিফাই করুন'
                        : 'অর্ডার নিশ্চিত করুন (৳' + total.toLocaleString('bn-BD') + ')'}
                    </span>
                  </>
                )}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
