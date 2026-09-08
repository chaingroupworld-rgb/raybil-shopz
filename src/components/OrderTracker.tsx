import React, { useState, useEffect } from 'react';
import {
  Search,
  Truck,
  CheckCircle2,
  Clock,
  MapPin,
  Phone,
  Package,
  ShieldCheck,
  RefreshCw,
  FileText,
  User,
  ArrowLeft,
  Bike
} from 'lucide-react';
import { Order, OrderStatus } from '../types';

interface OrderTrackerProps {
  orders: Order[];
  activeOrderId?: string;
  onBackToShopping: () => void;
  onUpdateOrderStatus: (orderId: string, nextStatus: OrderStatus) => void;
}

export const OrderTracker: React.FC<OrderTrackerProps> = ({
  orders,
  activeOrderId,
  onBackToShopping,
  onUpdateOrderStatus
}) => {
  const [searchInput, setSearchInput] = useState<string>(activeOrderId || 'RB-84920');
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Set initial selected order
  useEffect(() => {
    if (activeOrderId) {
      const match = orders.find((o) => o.id.toLowerCase() === activeOrderId.toLowerCase());
      if (match) {
        setSelectedOrder(match);
        setSearchInput(activeOrderId);
        return;
      }
    }
    if (!selectedOrder && orders.length > 0) {
      setSelectedOrder(orders[0]);
    }
  }, [activeOrderId, orders]);

  const handleSearch = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const query = searchInput.trim().toLowerCase();
    if (!query) return;

    const found = orders.find(
      (o) =>
        o.id.toLowerCase() === query ||
        o.phone.replace(/[^0-9]/g, '').includes(query.replace(/[^0-9]/g, ''))
    );

    if (found) {
      setSelectedOrder(found);
    }
  };

  const simulateProgress = () => {
    if (!selectedOrder) return;
    setIsRefreshing(true);

    const statusOrder: OrderStatus[] = [
      'confirmed',
      'processing',
      'shipped',
      'out_for_delivery',
      'delivered'
    ];
    const currentIndex = statusOrder.indexOf(selectedOrder.orderStatus);
    const nextIndex = (currentIndex + 1) % statusOrder.length;
    const nextStatus = statusOrder[nextIndex];

    setTimeout(() => {
      onUpdateOrderStatus(selectedOrder.id, nextStatus);
      setIsRefreshing(false);
    }, 600);
  };

  return (
    <div className="max-w-6xl mx-auto px-3 sm:px-6 py-6 sm:py-10 space-y-6 animate-fadeIn">
      {/* Top Header & Breadcrumb */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-4">
        <div>
          <button
            onClick={onBackToShopping}
            className="inline-flex items-center gap-1.5 text-xs text-orange-600 hover:text-orange-700 font-bold mb-1 cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>শপিং-এ ফিরে যান</span>
          </button>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#0b1b36] flex items-center gap-2">
            <Truck className="w-7 h-7 text-orange-500" />
            <span>লাইভ রিয়েল-টাইম অর্ডার ট্র্যাকিং</span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            আপনার অর্ডারের বর্তমান অবস্থান ও ডেলিভারি স্ট্যাটাস সরাসরি ট্র্যাক করুন।
          </p>
        </div>

        {/* Quick Demo Pre-selected Buttons */}
        <div className="flex items-center flex-wrap gap-2 text-xs">
          <span className="text-slate-400 font-medium">ডেমো অর্ডার:</span>
          {orders.slice(0, 3).map((ord) => (
            <button
              key={ord.id}
              onClick={() => {
                setSearchInput(ord.id);
                setSelectedOrder(ord);
              }}
              className={`px-2.5 py-1 rounded-lg border font-mono font-bold transition-all ${
                selectedOrder?.id === ord.id
                  ? 'bg-orange-500 text-white border-orange-500 shadow-xs'
                  : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
              }`}
            >
              {ord.id}
            </button>
          ))}
        </div>
      </div>

      {/* Search Bar */}
      <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200 shadow-sm">
        <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="অর্ডার আইডি (উদাঃ RB-84920) অথবা মোবাইল নম্বর লিখুন..."
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm outline-none focus:bg-white focus:border-orange-500"
            />
          </div>
          <button
            type="submit"
            className="bg-[#0b1b36] hover:bg-[#142e54] text-white text-xs sm:text-sm font-bold px-6 py-2.5 rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer shadow"
          >
            <Search className="w-4 h-4 text-orange-400" />
            <span>অর্ডার খুঁজুন</span>
          </button>
        </form>
      </div>

      {/* Order Details & Tracking Interface */}
      {selectedOrder ? (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Column: Tracking Status & Live Timeline */}
          <div className="lg:col-span-8 space-y-6">
            {/* Live Status Banner */}
            <div className="bg-gradient-to-r from-[#0b1b36] to-[#12284b] text-white p-5 sm:p-6 rounded-3xl shadow-xl relative overflow-hidden">
              <div className="absolute top-0 right-0 -mt-8 -mr-8 w-48 h-48 bg-orange-500/20 rounded-full blur-2xl"></div>

              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 relative z-10">
                <div>
                  <div className="flex items-center gap-2 text-orange-400 text-xs font-bold uppercase tracking-wider mb-1">
                    <span className="relative flex h-2.5 w-2.5">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-orange-500"></span>
                    </span>
                    <span>লাইভ স্ট্যাটাস আপডেট</span>
                  </div>
                  <h2 className="text-xl sm:text-2xl font-extrabold text-white">
                    {selectedOrder.orderStatus === 'out_for_delivery'
                      ? 'ডেলিভারির জন্য বের হয়েছে (অন দ্য ওয়ে)'
                      : selectedOrder.orderStatus === 'delivered'
                      ? 'অর্ডার সফলভাবে ডেলিভারি সম্পন্ন'
                      : selectedOrder.orderStatus === 'shipped'
                      ? 'কুরিয়ারে হস্তান্তর সম্পন্ন'
                      : selectedOrder.orderStatus === 'processing'
                      ? 'প্যাকেজিং ও কোয়ালিটি চেকিং চলছে'
                      : 'অর্ডার নিশ্চিত হয়েছে'}
                  </h2>
                  <p className="text-xs text-slate-300 mt-1">
                    প্রত্যাশিত ডেলিভারি:{' '}
                    <strong className="text-amber-300">{selectedOrder.estimatedDeliveryDate}</strong>
                  </p>
                </div>

                {/* Simulation button */}
                <button
                  onClick={simulateProgress}
                  disabled={isRefreshing}
                  className="inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white text-xs font-bold px-3.5 py-2 rounded-xl transition-all shadow-md self-start sm:self-center disabled:opacity-50 cursor-pointer"
                  title="ডেমো স্টেজ পরিবর্তন"
                >
                  <RefreshCw className={`w-3.5 h-3.5 ${isRefreshing ? 'animate-spin' : ''}`} />
                  <span>স্টেজ পরিবর্তন (সিমুলেট)</span>
                </button>
              </div>

              {/* Order Meta Pills */}
              <div className="mt-5 pt-4 border-t border-white/10 grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                <div>
                  <span className="text-slate-400 block text-[11px]">অর্ডার নং:</span>
                  <span className="font-mono font-bold text-white text-sm">{selectedOrder.id}</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[11px]">অর্ডারের সময়:</span>
                  <span className="font-medium text-slate-200">{selectedOrder.date}</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[11px]">কুরিয়ার পার্টনার:</span>
                  <span className="font-medium text-slate-200">{selectedOrder.courierName}</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[11px]">পেমেন্ট পদ্ধতি:</span>
                  <span className="font-bold text-emerald-400 uppercase">
                    {selectedOrder.paymentMethod} (
                    {selectedOrder.paymentStatus === 'paid' ? 'পরিশোধিত' : 'ক্যাশ'})
                  </span>
                </div>
              </div>
            </div>

            {/* Interactive Visual Map Simulation */}
            <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm">
              <div className="px-5 py-3.5 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs font-bold text-slate-700">
                  <MapPin className="w-4 h-4 text-orange-600" />
                  <span>লাইভ ডেলিভারি রুট ও ম্যাপ ভিউ (Simulated GPS)</span>
                </div>
                <div className="text-[11px] text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md font-bold flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                  লাইভ স্যাটেলাইট সিগন্যাল
                </div>
              </div>

              {/* Graphical Simulated Route Map */}
              <div className="relative h-56 sm:h-64 bg-slate-100 overflow-hidden flex items-center justify-center p-4">
                {/* Map Grid Patterns */}
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#0000000a_1px,transparent_1px),linear-gradient(to_bottom,#0000000a_1px,transparent_1px)] bg-[size:24px_24px]"></div>

                {/* Simulated stylized roads & canals */}
                <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
                  {/* Highway */}
                  <path
                    d="M 20 180 Q 200 80, 450 140 T 900 60"
                    fill="none"
                    stroke="#cbd5e1"
                    strokeWidth="18"
                    strokeLinecap="round"
                  />
                  <path
                    d="M 20 180 Q 200 80, 450 140 T 900 60"
                    fill="none"
                    stroke="#ffffff"
                    strokeWidth="14"
                    strokeLinecap="round"
                  />
                  {/* Delivery Route Polyline */}
                  <path
                    d="M 60 170 Q 200 85, 420 135 T 750 75"
                    fill="none"
                    stroke="#f97316"
                    strokeWidth="4"
                    strokeDasharray="6 4"
                    className="animate-pulse"
                  />
                </svg>

                {/* Warehouse Location Marker */}
                <div className="absolute left-6 sm:left-12 bottom-8 z-10 flex flex-col items-center">
                  <div className="w-9 h-9 rounded-xl bg-[#0b1b36] text-white flex items-center justify-center shadow-lg ring-4 ring-white">
                    <Package className="w-4 h-4 text-orange-400" />
                  </div>
                  <span className="mt-1 bg-white/90 text-[#0b1b36] text-[10px] font-bold px-2 py-0.5 rounded shadow">
                    সেন্ট্রাল হাব
                  </span>
                </div>

                {/* Delivery Rider on Route (Animated) */}
                <div
                  className={`absolute z-20 flex flex-col items-center transition-all duration-700 ${
                    selectedOrder.orderStatus === 'delivered'
                      ? 'right-8 sm:right-16 top-10'
                      : selectedOrder.orderStatus === 'out_for_delivery'
                      ? 'left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2'
                      : 'left-1/4 bottom-16'
                  }`}
                >
                  <div className="relative">
                    <span className="absolute -inset-2 rounded-full bg-orange-400/40 animate-ping"></span>
                    <div className="w-10 h-10 rounded-full bg-orange-500 text-white flex items-center justify-center shadow-xl ring-4 ring-white">
                      <Bike className="w-5 h-5" />
                    </div>
                  </div>
                  <div className="mt-1 bg-orange-600 text-white text-[10px] font-extrabold px-2.5 py-0.5 rounded-full shadow flex items-center gap-1">
                    <span>রাইডার তানভীর</span>
                    {selectedOrder.orderStatus === 'out_for_delivery' && (
                      <span className="bg-white text-orange-600 rounded px-1 text-[9px]">
                        ২০ মি. বাকি
                      </span>
                    )}
                  </div>
                </div>

                {/* Customer Destination Marker */}
                <div className="absolute right-6 sm:right-16 top-8 z-10 flex flex-col items-center">
                  <div className="w-9 h-9 rounded-xl bg-emerald-600 text-white flex items-center justify-center shadow-lg ring-4 ring-white">
                    <MapPin className="w-5 h-5 text-white" />
                  </div>
                  <span className="mt-1 bg-white/90 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded shadow max-w-[100px] truncate text-center">
                    {selectedOrder.city}
                  </span>
                </div>
              </div>

              {/* Rider Info Strip */}
              {selectedOrder.rider && (
                <div className="p-4 bg-slate-50 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <img
                      src={selectedOrder.rider.photoUrl}
                      alt={selectedOrder.rider.name}
                      referrerPolicy="no-referrer"
                      className="w-11 h-11 rounded-full object-cover border-2 border-orange-400"
                    />
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="text-sm font-bold text-slate-800">
                          {selectedOrder.rider.name}
                        </h4>
                        <span className="text-[10px] bg-amber-100 text-amber-900 font-bold px-1.5 py-0.5 rounded">
                          ★ {selectedOrder.rider.rating}
                        </span>
                      </div>
                      <p className="text-xs text-slate-500">{selectedOrder.rider.vehicle}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <a
                      href={`tel:${selectedOrder.rider.phone}`}
                      className="inline-flex items-center gap-1.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold px-4 py-2 rounded-xl transition-all shadow"
                    >
                      <Phone className="w-3.5 h-3.5" />
                      <span>কল করুন ({selectedOrder.rider.phone})</span>
                    </a>
                  </div>
                </div>
              )}
            </div>

            {/* 5-Step Visual Timeline */}
            <div className="bg-white p-5 sm:p-7 rounded-3xl border border-slate-200 shadow-sm space-y-6">
              <h3 className="text-base font-bold text-slate-800 flex items-center gap-2 border-b border-slate-100 pb-3">
                <Clock className="w-4 h-4 text-orange-600" />
                ট্র্যাকিং টাইমলাইন হিস্ট্রি
              </h3>

              <div className="relative pl-6 sm:pl-8 space-y-8 before:absolute before:left-3 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-200">
                {selectedOrder.trackingTimeline.map((step, idx) => {
                  const isCurrent = step.status === selectedOrder.orderStatus;
                  const isPast =
                    ['confirmed', 'processing', 'shipped', 'out_for_delivery', 'delivered'].indexOf(
                      step.status
                    ) <=
                    ['confirmed', 'processing', 'shipped', 'out_for_delivery', 'delivered'].indexOf(
                      selectedOrder.orderStatus
                    );

                  return (
                    <div key={idx} className="relative">
                      {/* Step Indicator Pin */}
                      <div
                        className={`absolute -left-6 sm:-left-8 top-0 w-6 h-6 rounded-full flex items-center justify-center text-xs transition-all ${
                          isCurrent
                            ? 'bg-orange-500 text-white ring-4 ring-orange-200 shadow'
                            : isPast
                            ? 'bg-emerald-600 text-white ring-2 ring-white'
                            : 'bg-slate-200 text-slate-400'
                        }`}
                      >
                        {isPast ? <CheckCircle2 className="w-3.5 h-3.5" /> : idx + 1}
                      </div>

                      <div className="space-y-1">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                          <h4
                            className={`text-sm font-bold ${
                              isCurrent ? 'text-orange-600' : isPast ? 'text-slate-800' : 'text-slate-400'
                            }`}
                          >
                            {step.title}
                          </h4>
                          <span className="text-xs text-slate-400 font-mono">{step.timestamp}</span>
                        </div>
                        <p className="text-xs text-slate-600">{step.description}</p>
                        <div className="flex items-center gap-1 text-[11px] text-slate-400 mt-1">
                          <MapPin className="w-3 h-3 text-slate-400" />
                          <span>{step.location}</span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right Column: Order Items, Summary & Address */}
          <div className="lg:col-span-4 space-y-6">
            {/* Customer Details Card */}
            <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-sm space-y-3">
              <h3 className="text-sm font-bold text-slate-800 flex items-center gap-2 border-b border-slate-100 pb-2">
                <User className="w-4 h-4 text-orange-600" />
                গ্রাহক ও ডেলিভারি ঠিকানা
              </h3>

              <div className="text-xs space-y-2 text-slate-700">
                <div>
                  <span className="text-slate-400 block text-[11px]">নাম:</span>
                  <span className="font-bold text-slate-800">{selectedOrder.customerName}</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[11px]">মোবাইল:</span>
                  <span className="font-mono font-semibold">{selectedOrder.phone}</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[11px]">ঠিকানা:</span>
                  <span className="leading-relaxed">{selectedOrder.address}, {selectedOrder.city}</span>
                </div>
                {selectedOrder.notes && (
                  <div className="p-2 bg-amber-50 rounded-lg text-amber-900 text-[11px]">
                    <strong>নোট:</strong> {selectedOrder.notes}
                  </div>
                )}
              </div>
            </div>

            {/* Order Items List */}
            <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-sm space-y-3">
              <h3 className="text-sm font-bold text-slate-800 flex items-center gap-2 border-b border-slate-100 pb-2">
                <Package className="w-4 h-4 text-orange-600" />
                অর্ডারের পণ্যসমূহ ({selectedOrder.items.length})
              </h3>

              <div className="divide-y divide-slate-100 max-h-64 overflow-y-auto space-y-2">
                {selectedOrder.items.map((it, idx) => (
                  <div key={idx} className="pt-2 flex items-center gap-3">
                    <img
                      src={it.product.thumbnail}
                      alt={it.product.name}
                      referrerPolicy="no-referrer"
                      className="w-12 h-12 rounded-xl object-cover border border-slate-200 flex-shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <h5 className="text-xs font-bold text-slate-800 truncate">
                        {it.product.name}
                      </h5>
                      <div className="flex justify-between text-[11px] text-slate-500 mt-0.5">
                        <span>পরিমাণ: {it.quantity} টি</span>
                        <span className="font-bold text-slate-800">
                          ৳{(it.product.price * it.quantity).toLocaleString('bn-BD')}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Price Calculation */}
              <div className="border-t border-slate-100 pt-3 text-xs space-y-1.5 text-slate-600">
                <div className="flex justify-between">
                  <span>সাবটোটাল</span>
                  <span>৳{selectedOrder.subtotal.toLocaleString('bn-BD')}</span>
                </div>
                {selectedOrder.discount > 0 && (
                  <div className="flex justify-between text-emerald-600 font-medium">
                    <span>কুপন ছাড়</span>
                    <span>-৳{selectedOrder.discount.toLocaleString('bn-BD')}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>ডেলিভারি ফি</span>
                  <span>৳{selectedOrder.deliveryFee.toLocaleString('bn-BD')}</span>
                </div>
                <div className="flex justify-between text-sm font-extrabold text-[#0b1b36] border-t border-slate-200 pt-2">
                  <span>সর্বমোট পরিশোধিত</span>
                  <span className="text-orange-600 text-base">
                    ৳{selectedOrder.total.toLocaleString('bn-BD')}
                  </span>
                </div>
              </div>

              {/* Receipt Action */}
              <button
                onClick={() => window.print()}
                className="w-full mt-2 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold py-2.5 rounded-xl border border-slate-300 flex items-center justify-center gap-2 transition-colors cursor-pointer"
              >
                <FileText className="w-3.5 h-3.5 text-slate-600" />
                <span>রসিদ প্রিন্ট / ডাউনলোড করুন</span>
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-white p-12 text-center rounded-3xl border border-slate-200 text-slate-500 space-y-3">
          <Truck className="w-12 h-12 mx-auto text-slate-300" />
          <h3 className="font-bold text-slate-700 text-base">কোনো অর্ডার পাওয়া যায়নি</h3>
          <p className="text-xs max-w-sm mx-auto">
            দয়া করে সঠিক অর্ডার আইডি দিন অথবা উপরে ডেমো বাটনগুলোর একটিতে ক্লিক করুন।
          </p>
        </div>
      )}
    </div>
  );
};
