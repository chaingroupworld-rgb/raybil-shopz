import React, { useState, useEffect } from 'react';
import { Product, CartItem, Order, OrderStatus } from './types';
import { PRODUCTS, INITIAL_ORDERS } from './data/products';
import { Navbar } from './components/Navbar';
import { HeroBanner } from './components/HeroBanner';
import { ProductSection } from './components/ProductSection';
import { ProductDetailModal } from './components/ProductDetailModal';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { OrderTracker } from './components/OrderTracker';
import { WishlistModal } from './components/WishlistModal';
import { Footer } from './components/Footer';
import {
  Home,
  Grid,
  ShoppingBag,
  Truck,
  Heart,
  CheckCircle2,
  Sparkles
} from 'lucide-react';

export default function App() {
  // Persistence states
  const [products] = useState<Product[]>(PRODUCTS);
  const [orders, setOrders] = useState<Order[]>(() => {
    try {
      const saved = localStorage.getItem('raybil_orders');
      if (saved) return JSON.parse(saved);
    } catch (e) {}
    return INITIAL_ORDERS;
  });

  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('raybil_cart');
      if (saved) return JSON.parse(saved);
    } catch (e) {}
    return [];
  });

  const [wishlistIds, setWishlistIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('raybil_wishlist');
      if (saved) return JSON.parse(saved);
    } catch (e) {}
    return ['rb-prod-1', 'rb-prod-2'];
  });

  // Navigation & Modals
  const [currentView, setCurrentView] = useState<'home' | 'tracking'>('home');
  const [activeTrackingOrderId, setActiveTrackingOrderId] = useState<string>('RB-84920');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [appliedDiscount, setAppliedDiscount] = useState(0);
  const [appliedCoupon, setAppliedCoupon] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  // Toast feedback
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 2800);
  };

  // Sync to local storage
  useEffect(() => {
    try {
      localStorage.setItem('raybil_orders', JSON.stringify(orders));
    } catch (e) {}
  }, [orders]);

  useEffect(() => {
    try {
      localStorage.setItem('raybil_cart', JSON.stringify(cart));
    } catch (e) {}
  }, [cart]);

  useEffect(() => {
    try {
      localStorage.setItem('raybil_wishlist', JSON.stringify(wishlistIds));
    } catch (e) {}
  }, [wishlistIds]);

  // Cart operations
  const handleAddToCart = (
    product: Product,
    quantity = 1,
    color?: string,
    size?: string,
    e?: React.MouseEvent
  ) => {
    if (e) e.stopPropagation();

    const chosenColor = color || product.colors?.[0];
    const chosenSize = size || product.sizes?.[0];

    setCart((prev) => {
      const existingIndex = prev.findIndex(
        (item) =>
          item.product.id === product.id &&
          item.selectedColor === chosenColor &&
          item.selectedSize === chosenSize
      );

      if (existingIndex > -1) {
        const next = [...prev];
        next[existingIndex].quantity += quantity;
        return next;
      } else {
        return [
          ...prev,
          {
            product,
            quantity,
            selectedColor: chosenColor,
            selectedSize: chosenSize
          }
        ];
      }
    });

    showToast(`"${product.name}" কার্টে যোগ করা হয়েছে!`);
  };

  const handleUpdateCartQuantity = (
    productId: string,
    quantity: number,
    color?: string,
    size?: string
  ) => {
    setCart((prev) =>
      prev
        .map((item) => {
          if (
            item.product.id === productId &&
            item.selectedColor === color &&
            item.selectedSize === size
          ) {
            return { ...item, quantity };
          }
          return item;
        })
        .filter((item) => item.quantity > 0)
    );
  };

  const handleRemoveFromCart = (productId: string, color?: string, size?: string) => {
    setCart((prev) =>
      prev.filter(
        (item) =>
          !(
            item.product.id === productId &&
            item.selectedColor === color &&
            item.selectedSize === size
          )
      )
    );
    showToast('পণ্যটি কার্ট থেকে সরানো হয়েছে।');
  };

  // Wishlist toggle
  const handleToggleWishlist = (productId: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setWishlistIds((prev) => {
      if (prev.includes(productId)) {
        showToast('পছন্দের তালিকা থেকে বাদ দেওয়া হয়েছে।');
        return prev.filter((id) => id !== productId);
      } else {
        showToast('পছন্দের তালিকায় সংরক্ষণ করা হয়েছে!');
        return [...prev, productId];
      }
    });
  };

  // Checkout flow
  const handleBuyNow = (
    product: Product,
    quantity = 1,
    color?: string,
    size?: string
  ) => {
    handleAddToCart(product, quantity, color, size);
    setIsCheckoutOpen(true);
  };

  const handleProceedToCheckout = (discount: number, coupon: string) => {
    setAppliedDiscount(discount);
    setAppliedCoupon(coupon);
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  const handleOrderPlaced = (newOrder: Order) => {
    setOrders((prev) => [newOrder, ...prev]);
    setCart([]);
    setActiveTrackingOrderId(newOrder.id);
    setCurrentView('tracking');
    window.scrollTo({ top: 0, behavior: 'smooth' });
    showToast(`অভিনন্দন! অর্ডার নং ${newOrder.id} সফলভাবে সম্পন্ন হয়েছে।`);
  };

  const handleUpdateOrderStatus = (orderId: string, nextStatus: OrderStatus) => {
    setOrders((prev) =>
      prev.map((ord) => {
        if (ord.id === orderId) {
          const updatedTimeline = ord.trackingTimeline.map((step) => {
            if (step.status === nextStatus) {
              return { ...step, completed: true, current: true };
            }
            return step;
          });
          return {
            ...ord,
            orderStatus: nextStatus,
            trackingTimeline: updatedTimeline
          };
        }
        return ord;
      })
    );
    showToast(`অর্ডারের স্ট্যাটাস আপডেট হয়েছে!`);
  };

  const cartTotal = cart.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  const cartItemCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 pb-16 md:pb-0">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-20 md:bottom-6 right-4 z-50 bg-[#0b1b36] text-white text-xs sm:text-sm font-semibold px-4 py-3 rounded-2xl shadow-2xl border border-white/20 flex items-center gap-2.5 animate-bounce">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Main Global Navbar */}
      <Navbar
        cartCount={cartItemCount}
        cartTotal={cartTotal}
        wishlistCount={wishlistIds.length}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenTracking={() => {
          setCurrentView('tracking');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onSelectProduct={(product) => setSelectedProduct(product)}
        onOpenWishlist={() => setIsWishlistOpen(true)}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        products={products}
        currentView={currentView}
        setCurrentView={setCurrentView}
      />

      {/* Main View Switcher */}
      <main className="flex-1">
        {currentView === 'home' ? (
          <div>
            {/* Hero Banner Section */}
            <HeroBanner
              onShopNow={() => {
                const el = document.getElementById('shop-section');
                el?.scrollIntoView({ behavior: 'smooth' });
              }}
              onOpenTracking={() => {
                setCurrentView('tracking');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            />

            {/* Product Section (PC: 3 columns x 3 rows = 9 items | Mobile: 4 products on screen) */}
            <ProductSection
              products={products}
              onSelectProduct={(p) => setSelectedProduct(p)}
              onAddToCart={(p, e) => handleAddToCart(p, 1, undefined, undefined, e)}
              onToggleWishlist={handleToggleWishlist}
              wishlistIds={wishlistIds}
            />

            {/* Quality & Brand Guarantee Section */}
            <section className="bg-white py-12 border-y border-slate-200">
              <div className="max-w-7xl mx-auto px-4 sm:px-6">
                <div className="text-center max-w-2xl mx-auto mb-8">
                  <span className="text-xs font-bold text-orange-600 uppercase tracking-widest flex items-center justify-center gap-1.5">
                    <Sparkles className="w-4 h-4" />
                    কেন Raybil বেছে নেবেন?
                  </span>
                  <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0b1b36] mt-1">
                    আধুনিক কেনাকাটার অনন্য নিশ্চয়তা
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-500 mt-1">
                    কাস্টমারদের সেরা সন্তুষ্টি ও সর্বোচ্চ নিরাপত্তাই Raybil-এর প্রথম অগ্রাধিকার।
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="p-6 rounded-3xl bg-slate-50 border border-slate-200 space-y-3">
                    <div className="w-12 h-12 rounded-2xl bg-orange-500/10 text-orange-600 flex items-center justify-center font-bold text-lg">
                      🔒
                    </div>
                    <h3 className="font-bold text-slate-800 text-base">
                      সর্বাধুনিক পেমেন্ট গেটওয়ে সিকিউরিটি
                    </h3>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      বিকাশ, নগদ, ভিসা ও মাস্টারকার্ডে রয়েছে ৩D সিকিউর ২.০ ও ২৫৬-বিট SSL এনক্রিপশন। আপনার আর্থিক তথ্যের সর্বোচ্চ সুরক্ষা নিশ্চিত।
                    </p>
                  </div>

                  <div className="p-6 rounded-3xl bg-slate-50 border border-slate-200 space-y-3">
                    <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 text-emerald-600 flex items-center justify-center font-bold text-lg">
                      📍
                    </div>
                    <h3 className="font-bold text-slate-800 text-base">
                      লাইভ জিপিএস পার্সেল ট্র্যাকিং
                    </h3>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      অর্ডার কনফার্ম থেকে শুরু করে আপনার বাসা পর্যন্ত প্রতিটি ধাপ লাইভ ম্যাপে দেখা যায়। রাইডারের সাথে সরাসরি যোগাযোগ করার অপশন।
                    </p>
                  </div>

                  <div className="p-6 rounded-3xl bg-slate-50 border border-slate-200 space-y-3">
                    <div className="w-12 h-12 rounded-2xl bg-blue-500/10 text-blue-600 flex items-center justify-center font-bold text-lg">
                      ⚡
                    </div>
                    <h3 className="font-bold text-slate-800 text-base">
                      সুপারফাস্ট এক্সপ্রেস ডেলিভারি
                    </h3>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      ঢাকা সিটিতে ২৪ ঘণ্টায় এবং ঢাকার বাইরে সারা দেশে ২-৩ দিনে আপনার দরজায় পণ্য পৌঁছে দেওয়া হয়।
                    </p>
                  </div>
                </div>
              </div>
            </section>
          </div>
        ) : (
          /* Live Real-Time Order Tracking View */
          <OrderTracker
            orders={orders}
            activeOrderId={activeTrackingOrderId}
            onBackToShopping={() => {
              setCurrentView('home');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onUpdateOrderStatus={handleUpdateOrderStatus}
          />
        )}
      </main>

      {/* Global Footer */}
      <Footer
        onOpenTracking={() => {
          setCurrentView('tracking');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onNavigateHome={() => {
          setCurrentView('home');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      />

      {/* Product Detail Modal */}
      <ProductDetailModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
        onAddToCart={(p, q, c, s) => handleAddToCart(p, q, c, s)}
        onBuyNow={handleBuyNow}
        isWishlisted={selectedProduct ? wishlistIds.includes(selectedProduct.id) : false}
        onToggleWishlist={handleToggleWishlist}
      />

      {/* Shopping Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cart}
        onUpdateQuantity={handleUpdateCartQuantity}
        onRemoveItem={handleRemoveFromCart}
        onProceedToCheckout={handleProceedToCheckout}
      />

      {/* Modern Secure Checkout Modal */}
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        items={cart}
        subtotal={cartTotal}
        discount={appliedDiscount}
        onOrderPlaced={handleOrderPlaced}
      />

      {/* Wishlist Modal */}
      <WishlistModal
        isOpen={isWishlistOpen}
        onClose={() => setIsWishlistOpen(false)}
        products={products}
        wishlistIds={wishlistIds}
        onRemoveFromWishlist={(id) => handleToggleWishlist(id)}
        onAddToCart={(p) => handleAddToCart(p, 1)}
      />

      {/* Mobile Sticky Bottom Navigation Bar for Smart Devices */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-slate-200 px-3 py-2 flex items-center justify-around shadow-2xl">
        <button
          onClick={() => {
            setCurrentView('home');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className={`flex flex-col items-center gap-0.5 text-[10px] font-bold ${
            currentView === 'home' ? 'text-orange-600' : 'text-slate-600 hover:text-[#0b1b36]'
          }`}
        >
          <Home className="w-5 h-5" />
          <span>হোম</span>
        </button>

        <button
          onClick={() => {
            setCurrentView('home');
            const el = document.getElementById('shop-section');
            el?.scrollIntoView({ behavior: 'smooth' });
          }}
          className="flex flex-col items-center gap-0.5 text-[10px] font-bold text-slate-600 hover:text-[#0b1b36]"
        >
          <Grid className="w-5 h-5" />
          <span>প্রোডাক্ট</span>
        </button>

        {/* Center Cart Badge Trigger */}
        <button
          onClick={() => setIsCartOpen(true)}
          className="relative -top-3 bg-gradient-to-tr from-orange-500 to-amber-500 text-white w-12 h-12 rounded-full flex items-center justify-center shadow-lg shadow-orange-500/40 border-2 border-white"
        >
          <ShoppingBag className="w-5 h-5" />
          {cartItemCount > 0 && (
            <span className="absolute -top-1 -right-1 bg-[#0b1b36] text-white text-[9px] font-extrabold rounded-full w-4 h-4 flex items-center justify-center border border-white">
              {cartItemCount}
            </span>
          )}
        </button>

        <button
          onClick={() => {
            setCurrentView('tracking');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className={`flex flex-col items-center gap-0.5 text-[10px] font-bold ${
            currentView === 'tracking' ? 'text-orange-600' : 'text-slate-600 hover:text-[#0b1b36]'
          }`}
        >
          <Truck className="w-5 h-5" />
          <span>ট্র্যাকিং</span>
        </button>

        <button
          onClick={() => setIsWishlistOpen(true)}
          className="relative flex flex-col items-center gap-0.5 text-[10px] font-bold text-slate-600 hover:text-[#0b1b36]"
        >
          <Heart className="w-5 h-5" />
          <span>পছন্দ</span>
          {wishlistIds.length > 0 && (
            <span className="absolute -top-1 right-2 bg-rose-500 text-white text-[8px] font-bold rounded-full w-3.5 h-3.5 flex items-center justify-center">
              {wishlistIds.length}
            </span>
          )}
        </button>
      </div>
    </div>
  );
}
