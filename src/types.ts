export type Category = 'all' | 'electronics' | 'fashion' | 'smartwatch' | 'audio' | 'lifestyle';

export interface Product {
  id: string;
  name: string;
  nameEn: string;
  slug: string;
  category: Category;
  categoryName: string;
  price: number;
  originalPrice: number;
  discountPercent: number;
  rating: number;
  reviewCount: number;
  inStock: boolean;
  stockCount: number;
  thumbnail: string;
  images: string[];
  badge?: string;
  description: string;
  features: string[];
  specifications: Record<string, string>;
  colors?: string[];
  sizes?: string[];
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedColor?: string;
  selectedSize?: string;
}

export type PaymentMethod = 'bkash' | 'nagad' | 'rocket' | 'card' | 'cod';

export type OrderStatus = 'confirmed' | 'processing' | 'shipped' | 'out_for_delivery' | 'delivered';

export interface TrackingStep {
  status: OrderStatus;
  title: string;
  description: string;
  timestamp: string;
  completed: boolean;
  current: boolean;
  location: string;
}

export interface RiderInfo {
  name: string;
  phone: string;
  rating: number;
  vehicle: string;
  photoUrl: string;
  etaMinutes: number;
}

export interface Order {
  id: string;
  date: string;
  customerName: string;
  phone: string;
  email: string;
  address: string;
  city: string;
  notes?: string;
  paymentMethod: PaymentMethod;
  paymentStatus: 'paid' | 'pending';
  orderStatus: OrderStatus;
  items: CartItem[];
  subtotal: number;
  deliveryFee: number;
  discount: number;
  total: number;
  estimatedDeliveryDate: string;
  courierName: string;
  trackingTimeline: TrackingStep[];
  rider?: RiderInfo;
}
