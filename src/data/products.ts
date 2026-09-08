import { Product, Order } from '../types';

export const PRODUCTS: Product[] = [
  {
    id: 'rb-prod-1',
    name: 'রেবিল আল্ট্রা সাউন্ডপড প্রো ২ (Raybil SoundPod Pro 2)',
    nameEn: 'Raybil SoundPod Pro 2 Wireless Earbuds',
    slug: 'raybil-soundpod-pro-2',
    category: 'audio',
    categoryName: 'অডিও ও মিউজিক',
    price: 2450,
    originalPrice: 3500,
    discountPercent: 30,
    rating: 4.9,
    reviewCount: 384,
    inStock: true,
    stockCount: 45,
    badge: 'সেরা বিক্রিত',
    thumbnail: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?auto=format&fit=crop&w=600&q=80',
    images: [
      'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1600294037681-c80b4cb5b434?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1572536147248-ac59a8abfa4b?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'অ্যাক্টিভ নয়েজ ক্যান্সেলেশন (ANC), ৪০ ঘণ্টার ব্যাটারি ব্যাকআপ এবং আল্ট্রা ক্রিস্টাল ক্লিয়ার কলিং এক্সপেরিয়েন্স সমৃদ্ধ প্রিমিয়াম ওয়্যারলেস ইয়ারবাডস।',
    features: [
      'অ্যাক্টিভ নয়েজ ক্যান্সেলেশন (ANC) সর্বোচ্চ ৩৫ ডেসিবেল পর্যন্ত',
      'এক চার্জে ৮ ঘণ্টা এবং কেস সহ ৪০ ঘণ্টার প্লে-টাইম',
      'IPX5 ওয়াটার ও সোয়েট রেজিস্ট্যান্স',
      'ব্লুটুথ ৫.৪ আল্ট্রা লো-লেটেন্সি গেমিং মোড',
      'স্মার্ট টাচ কন্ট্রোল ও ডাবল মাইক এনভায়রনমেন্টাল নয়েজ রিডাকশন'
    ],
    specifications: {
      'ড্রাইভার সাইজ': '১৩ মিমি ডায়নামিক টাইটানিয়াম',
      'কানেক্টিভিটি': 'Bluetooth 5.4',
      'ব্যাটারি ক্ষমতা': 'কেস: ৫০০ mAh, প্রতিটি বাড: ৪০ mAh',
      'চার্জিং পোর্ট': 'Type-C ফাস্ট চার্জিং',
      'ওয়ারেন্টি': '১ বছরের অফিসিয়াল রিপ্লেসমেন্ট ওয়ারেন্টি'
    },
    colors: ['ম্যাট ব্ল্যাক', 'পার্ল হোয়াইট', 'নেভি ব্লু']
  },
  {
    id: 'rb-prod-2',
    name: 'রেবিল ওয়াচ আল্ট্রা ২ অ্যামোলেড স্মার্টওয়াচ (Raybil Watch Ultra 2)',
    nameEn: 'Raybil Watch Ultra 2 AMOLED Smartwatch',
    slug: 'raybil-watch-ultra-2',
    category: 'smartwatch',
    categoryName: 'স্মার্ট ওয়াচ',
    price: 3890,
    originalPrice: 5200,
    discountPercent: 25,
    rating: 4.8,
    reviewCount: 512,
    inStock: true,
    stockCount: 32,
    badge: 'হট ডিল',
    thumbnail: 'https://images.unsplash.com/photo-1579586337278-3befd40fd17a?auto=format&fit=crop&w=600&q=80',
    images: [
      'https://images.unsplash.com/photo-1579586337278-3befd40fd17a?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=800&q=80'
    ],
    description: '২.০৪ ইঞ্চি HD অলওয়েজ-অন অ্যামোলেড ডিসপ্লে, ব্লুটুথ কলিং, হার্ট রেট ও SpO2 ট্র্যাকার সহ প্রিমিয়াম টাইটানিয়াম অ্যালয় ডিজাইনের স্মার্টওয়াচ।',
    features: [
      '২.০৪ ইঞ্চি উজ্জ্বল অলওয়েজ-অন অ্যামোলেড ডিসপ্লে',
      'হাই-ফাই লাউডস্পিকার ও মাইক সহ সরাসরি ব্লুটুথ কলিং',
      '১০০+ স্পোর্টস মোড এবং ফুল হেলথ ট্র্যাকিং (হার্টরেট, স্লিপ, SpO2)',
      'এক চার্জে ১০ দিন পর্যন্ত ব্যাটারি লাইফ',
      'IP68 ওয়াটারপ্রুফ রেটিং'
    ],
    specifications: {
      'ডিসপ্লে': '2.04" AMOLED 410x502 Resolution',
      'কেসিং মেটেরিয়াল': 'টাইটানিয়াম অ্যালয় ফ্রেম',
      'স্ট্র্যাপ': 'ওশান অরেঞ্জ ও প্রিমিয়াম সিলিকন',
      'ব্যাটারি': '৩৮০ mAh (ওয়্যারলেস ম্যাগনেটিক চার্জিং)',
      'ওয়ারেন্টি': '১ বছরের ওয়ারেন্টি'
    },
    colors: ['টাইটানিয়াম অরেঞ্জ', 'মিডনাইট ব্ল্যাক', 'সিলভার গ্রে']
  },
  {
    id: 'rb-prod-3',
    name: 'রেবিল ম্যাক্স চার্জ ৬৫ ওয়াট GaN সুপার ফাস্ট চার্জার',
    nameEn: 'Raybil 65W GaN Super Fast Charger with 3 Ports',
    slug: 'raybil-max-charge-65w',
    category: 'electronics',
    categoryName: 'ইলেকট্রনিক্স',
    price: 1850,
    originalPrice: 2400,
    discountPercent: 23,
    rating: 4.9,
    reviewCount: 220,
    inStock: true,
    stockCount: 60,
    badge: 'জনপ্রিয়',
    thumbnail: 'https://images.unsplash.com/photo-1583863788434-e58a36330cf0?auto=format&fit=crop&w=600&q=80',
    images: [
      'https://images.unsplash.com/photo-1583863788434-e58a36330cf0?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1618478594486-c65b899c4936?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'সর্বাধুনিক GaN প্রযুক্তি সম্বলিত ৬৫ ওয়াট দ্রুত চার্জার। ল্যাপটপ, ম্যাকবুক, আইফোন ও অ্যান্ড্রয়েড ফোনের জন্য যুগোপযোগী সমাধান।',
    features: [
      '৬৫W পাওয়ার ডেলিভারি (PD 3.0 & QC 4+)',
      '৩টি পোর্ট (২টি Type-C + ১টি USB-A) একসাথে চার্জিং',
      'GaN প্রযুক্তির কারণে কম গরম হয় ও আকারে ৫০% ছোট',
      'ওভার-ভোল্টেজ ও শর্ট-সার্কিট মাল্টিপল প্রোটেকশন'
    ],
    specifications: {
      'আউটপুট ওয়াট': '65W Max',
      'ইনপুট': 'AC 100-240V, 50/60Hz',
      'ওজন': '১১০ গ্রাম আল্ট্রা পোর্টেবল',
      'ওয়ারেন্টি': '১৮ মাসের রিপ্লেসমেন্ট গ্যারান্টি'
    },
    colors: ['ক্লাসিক হোয়াইট', 'ম্যাট ব্ল্যাক']
  },
  {
    id: 'rb-prod-4',
    name: 'রেবিল আরবান এক্সপ্লোরার ওয়াটারপ্রুফ ল্যাপটপ ব্যাকপ্যাক',
    nameEn: 'Raybil Urban Explorer Anti-Theft Laptop Backpack',
    slug: 'raybil-urban-backpack',
    category: 'lifestyle',
    categoryName: 'লাইফস্টাইল',
    price: 2190,
    originalPrice: 3200,
    discountPercent: 32,
    rating: 4.7,
    reviewCount: 165,
    inStock: true,
    stockCount: 28,
    badge: 'সেরা মান',
    thumbnail: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=600&q=80',
    images: [
      'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1622560480605-d83c853bc5c3?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'অ্যান্টি-থেফ্‌ট হিডেন জিপার, ওয়াটার রিপেলেন্ট অক্সফোর্ড ফেব্রিক, এবং এক্সটারনাল USB চার্জিং পোর্ট সম্বলিত স্মার্ট ট্রাভেল ও অফিস ব্যাকপ্যাক।',
    features: [
      '১৫.৬ ইঞ্চি ডেডিকেটেড কুশনড ল্যাপটপ স্লট',
      'হিডেন অ্যান্টি-থেফ্‌ট পকেট ও TSA সিকিউরিটি লক সাপোর্ট',
      'এক্সটারনাল USB চার্জিং পোর্ট সাপোর্ট',
      'শ্বাস-প্রশ্বাস উপযোগী এয়ার-মেশ ব্যাক প্যাডিং'
    ],
    specifications: {
      'ধারণক্ষমতা': '২৫ লিটার',
      'উপাদান': 'Waterproof Oxford 900D Nylon',
      'ওজন': '৭৫০ গ্রাম',
      'রং': 'কার্বন ব্ল্যাক, নেভি ব্লু'
    },
    colors: ['কার্বন ব্ল্যাক', 'নেভি ব্লু']
  },
  {
    id: 'rb-prod-5',
    name: 'রেবিল স্টুডিও প্রো নয়েজ-ক্যানসেলিং হেডফোন (ANC 50)',
    nameEn: 'Raybil Studio Pro ANC Wireless Headphones',
    slug: 'raybil-studio-pro-anc',
    category: 'audio',
    categoryName: 'অডিও ও মিউজিক',
    price: 4690,
    originalPrice: 6500,
    discountPercent: 28,
    rating: 4.9,
    reviewCount: 418,
    inStock: true,
    stockCount: 19,
    badge: 'প্রিমিয়াম',
    thumbnail: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=600&q=80',
    images: [
      'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1484704849700-f032a568e944?auto=format&fit=crop&w=800&q=80'
    ],
    description: '৪০ মিমি টাইটানিয়াম ড্রাইভার, হাই-রেজ অডিও সার্টিফিকেশন এবং ৬০ ঘণ্টার লং-লাস্টিং ব্যাটারি সম্বলিত প্রিমিয়াম ওভার-ইয়ার হেডফোন।',
    features: [
      'হাইব্রিড অ্যাক্টিভ নয়েজ ক্যান্সেলেশন',
      'এক চার্জে ৬০ ঘণ্টার একটানা মিউজিক প্লেব্যাক',
      'মেমরি ফোম কানের কুশন, দীর্ঘক্ষণ ব্যবহারে আরামদায়ক',
      'ওয়্যারলেস ও অক্স ক্যাবল ২ ভাবেই ব্যবহারযোগ্য'
    ],
    specifications: {
      'ফ্রিকোয়েন্সি রেঞ্জ': '20Hz - 40,000Hz (Hi-Res Audio)',
      'চার্জিং সময়': '২ ঘণ্টা (১০ মিনিট চার্জে ৫ ঘণ্টা প্লেব্যাক)',
      'কানেক্টিভিটি': 'Bluetooth 5.3 + 3.5mm Jack'
    },
    colors: ['ম্যাট ব্ল্যাক', 'মিডনাইট ব্লু', 'স্যাভানা গোল্ড']
  },
  {
    id: 'rb-prod-6',
    name: 'রেবিল মেকানিক্যাল আরজিবি ওয়্যারলেস কিবোর্ড (Raybil Pro K1)',
    nameEn: 'Raybil Pro K1 Tri-Mode RGB Mechanical Keyboard',
    slug: 'raybil-pro-k1-keyboard',
    category: 'electronics',
    categoryName: 'ইলেকট্রনিক্স',
    price: 3450,
    originalPrice: 4800,
    discountPercent: 28,
    rating: 4.8,
    reviewCount: 290,
    inStock: true,
    stockCount: 24,
    badge: 'গেমিং চয়েস',
    thumbnail: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=600&q=80',
    images: [
      'https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1595225476474-87563907a212?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'হট-সোয়াপ্যাবল রেড সুইচ, ট্রাই-মোড কানেক্টিভিটি (ব্লুটুথ, ২.৪ গিগাহার্টজ ওয়্যারলেস, এবং টাইপ-সি), ১৬.৮ মিলিয়ন আরজিবি লাইটিং।',
    features: [
      'হট-সোয়াপ্যাবল কাস্টম রেড সুইচ (স্মুথ ও সাইলেন্ট টাইপিং)',
      'ট্রাই-মোড কানেক্টিভিটি (PC, Mac, Tablet, Phone)',
      '৪০০০ mAh দীর্ঘস্থায়ী রিচার্জেবল ব্যাটারি',
      'সাউন্ড ড্যাম্পেনিং সিলিকন প্যাডিং'
    ],
    specifications: {
      'লে-আউট': '75% Compact (84 Keys)',
      'সুইচ টাইপ': 'Linear Red Switch',
      'ব্যাকলাইট': '16.8M RGB Custom Animations'
    },
    colors: ['ডার্ক সাইবার', 'রেট্রো গ্রে']
  },
  {
    id: 'rb-prod-7',
    name: 'রেবিল সিগনেচার প্রিমিয়াম হ্যান্ডক্রাফটেড লেদার ওয়ালেট',
    nameEn: 'Raybil Signature Genuine Leather RFID Blocking Wallet',
    slug: 'raybil-signature-leather-wallet',
    category: 'fashion',
    categoryName: 'ফ্যাশন ও অ্যাক্সেসরিজ',
    price: 1290,
    originalPrice: 1950,
    discountPercent: 34,
    rating: 4.9,
    reviewCount: 190,
    inStock: true,
    stockCount: 50,
    badge: '১০০% জেনুইন লেদার',
    thumbnail: 'https://images.unsplash.com/photo-1627123424574-724758594e93?auto=format&fit=crop&w=600&q=80',
    images: [
      'https://images.unsplash.com/photo-1627123424574-724758594e93?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?auto=format&fit=crop&w=800&q=80'
    ],
    description: '১০০% খাঁটি গরুর চামড়ায় তৈরি ফুল-গ্রেইন লেদার ওয়ালেট। ক্রেডিট কার্ড ডাটা চুরির হাত থেকে রক্ষা করার জন্য ইনবিল্ট RFID ব্লকিং প্রযুক্তি।',
    features: [
      '১০০% ফুল-গ্রেইন অরিজিনাল লেদার',
      'RFID ব্লকিং সিকিউরিটি চিপ স্তর',
      '৮টি কার্ড স্লট, ২টি বড় ক্যাশ কম্পার্টমেন্ট, ১টি আইডি উইন্ডো',
      'প্রিমিয়াম গিফট বক্স প্যাকিং'
    ],
    specifications: {
      'উপাদান': 'Full Grain Cowhide Leather',
      'সাইজ': '11.5 cm x 9.5 cm',
      'লাইফটাইম': '১০+ বছর স্থায়িত্বের গ্যারান্টি'
    },
    colors: ['ভিন্টেজ ব্রাউন', 'ক্লাসিক ব্ল্যাক', 'ট্যান অরেঞ্জ']
  },
  {
    id: 'rb-prod-8',
    name: 'রেবিল অ্যারো ড্রাইভ ২০,০০০ mAh ফাস্ট চার্জিং পাওয়ার ব্যাংক',
    nameEn: 'Raybil AeroDrive 20,000mAh 22.5W Power Bank',
    slug: 'raybil-aerodrive-20000mah',
    category: 'electronics',
    categoryName: 'ইলেকট্রনিক্স',
    price: 1990,
    originalPrice: 2800,
    discountPercent: 29,
    rating: 4.8,
    reviewCount: 340,
    inStock: true,
    stockCount: 40,
    badge: 'সুপার ফাস্ট',
    thumbnail: 'https://images.unsplash.com/photo-1609592426815-3844696144e5?auto=format&fit=crop&w=600&q=80',
    images: [
      'https://images.unsplash.com/photo-1609592426815-3844696144e5?auto=format&fit=crop&w=800&q=80'
    ],
    description: '২২.৫ ওয়াট টু-ওয়ে সুপার ফাস্ট চার্জিং, ডিজিটাল LED ডিসপ্লে ব্যাটারি পারসেন্টেজ ও বিমান যাত্রার অনুমোদিত ক্যাপাসিটি।',
    features: [
      '২২.৫W PD & QC ৩.০ সুপার ফাস্ট চার্জিং',
      'স্মার্ট ডিজিটাল LED ব্যাটারি পারসেন্টেজ ইনডিকেটর',
      'একসাথে ৩টি ডিভাইস চার্জ করার সুবিধা',
      'বিমানে বহনযোগ্য আন্তর্জাতিক মান সনদপ্রাপ্ত'
    ],
    specifications: {
      'ব্যাটারি ক্ষমতা': '20,000mAh Li-Polymer',
      'ইনপুট': 'Type-C & Micro 18W',
      'আউটপুট': 'Type-C 20W PD, 2x USB-A 22.5W'
    },
    colors: ['ম্যাট ব্ল্যাক', 'রয়্যাল হোয়াইট']
  },
  {
    id: 'rb-prod-9',
    name: 'রেবিল আলটিমেট পোলো টি-শার্ট (১০০% সুপিমা কটন)',
    nameEn: 'Raybil Ultimate Supima Cotton Classic Polo Shirt',
    slug: 'raybil-supima-cotton-polo',
    category: 'fashion',
    categoryName: 'ফ্যাশন ও অ্যাক্সেসরিজ',
    price: 990,
    originalPrice: 1550,
    discountPercent: 36,
    rating: 4.9,
    reviewCount: 460,
    inStock: true,
    stockCount: 75,
    badge: 'সেরা আরাম',
    thumbnail: 'https://images.unsplash.com/photo-1581655353564-df123a1eb820?auto=format&fit=crop&w=600&q=80',
    images: [
      'https://images.unsplash.com/photo-1581655353564-df123a1eb820?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1586363104862-3a5e2ab60d99?auto=format&fit=crop&w=800&q=80'
    ],
    description: '১০০% প্রিমিয়াম সুপিমা কটন, অ্যান্টি-রিংকেল টেকনোলজি এবং রয়্যাল ফিট ডিজাইনের আরামদায়ক লাক্সারি পোলো টি-শার্ট।',
    features: [
      '২৪০+ GSM প্রিমিয়াম সুপিমা কটন ফেব্রিক',
      'কালার লক টেকনোলজি (৫০ বার ওয়াশ করলেও রং ফ্যাকাসে হয় না)',
      'ডাবল স্টিচড কলার ও জেনুইন পার্ল বোতাম',
      'শ্বাস-প্রশ্বাস উপযোগী সফট ফিনিশিং'
    ],
    specifications: {
      'উপাদান': '100% Combed Supima Cotton',
      'জিএসএম': '240 GSM',
      'ফিটিং': 'Regular Smart Fit'
    },
    colors: ['নেভি ব্লু', 'অলিভ গ্রিন', 'বার্গান্ডি', 'জেট ব্ল্যাক'],
    sizes: ['M', 'L', 'XL', 'XXL']
  },
  {
    id: 'rb-prod-10',
    name: 'রেবিল স্মার্ট এয়ার পিউরিফায়ার ও হিউমিডিফায়ার',
    nameEn: 'Raybil Smart H13 HEPA Air Purifier with Aromatherapy',
    slug: 'raybil-smart-hepa-air-purifier',
    category: 'lifestyle',
    categoryName: 'লাইফস্টাইল',
    price: 5490,
    originalPrice: 7800,
    discountPercent: 30,
    rating: 4.8,
    reviewCount: 140,
    inStock: true,
    stockCount: 16,
    badge: 'স্বাস্থ্যকর পরিবেশ',
    thumbnail: 'https://images.unsplash.com/photo-1585771724684-38269d6639fd?auto=format&fit=crop&w=600&q=80',
    images: [
      'https://images.unsplash.com/photo-1585771724684-38269d6639fd?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'ট্রু H13 HEPA ফিল্টার যা ঘরের বাতাসের ৯৯.৯৭% ধুলোবালি, জীবাণু ও গন্ধ দূর করে। স্মার্ট মোবাইল অ্যাপ কানেক্টিভিটি।',
    features: [
      'H13 মেডিকেল গ্রেড HEPA ফিল্টারেশন',
      'রিয়েল-টাইম PM2.5 এয়ার কোয়ালিটি ডিজিটাল ইন্ডিকেটর',
      'অতি শান্ত স্লিপ মোড (মাত্র ২৪ ডেসিবেল শব্দ)',
      'এসেনশিয়াল অয়েল ও অ্যারোমাথেরাপি চেম্বার'
    ],
    specifications: {
      'কভারেজ এরিয়া': '৩৫০ স্কয়ার ফিট রুম',
      'কন্ট্রোল': 'Touch Panel + WiFi Mobile App',
      'পাওয়ার কনজাম্পশন': '28W ইকো সেভার'
    },
    colors: ['পিওর হোয়াইট']
  },
  {
    id: 'rb-prod-11',
    name: 'রেবিল ৪K আল্ট্রা-এইচডি স্ট্রিমিং ও ওয়েবক্যাম প্রো',
    nameEn: 'Raybil 4K Ultra HD AI Auto-Framing Streaming Webcam',
    slug: 'raybil-4k-pro-webcam',
    category: 'electronics',
    categoryName: 'ইলেকট্রনিক্স',
    price: 3250,
    originalPrice: 4500,
    discountPercent: 28,
    rating: 4.7,
    reviewCount: 98,
    inStock: true,
    stockCount: 22,
    badge: 'ওয়ার্ক ফ্রম হোম',
    thumbnail: 'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?auto=format&fit=crop&w=600&q=80',
    images: [
      'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?auto=format&fit=crop&w=800&q=80'
    ],
    description: '৪K 60FPS ক্রিস্টাল ক্লিয়ার ভিডিও, এআই অটো-ফোকাস ও ডুয়াল স্টুডিও নয়েজ-ক্যানসেলিং মাইক্রোফোন। অফিস মিটিং ও স্ট্রিমিংয়ের সেরা সঙ্গী।',
    features: [
      '4K Sony সেন্সর রেজোলিউশন',
      'এআই ফেয়ারনেস লাইটিং ও অটো ফোকাস',
      'প্রাইভেসি ফিজিক্যাল শাটার স্লাইডার',
      '৩৬০ ডিগ্রি রোটেটিং ট্রাইপড মাউন্ট'
    ],
    specifications: {
      'রেজোলিউশন': '3840 x 2160 @ 30fps / 1080p @ 60fps',
      'ফিল্ড অব ভিউ': '90° Wide Angle',
      'কানেক্টিভিটি': 'USB-C Plug and Play'
    },
    colors: ['ম্যাট ব্ল্যাক']
  },
  {
    id: 'rb-prod-12',
    name: 'রেবিল ক্লাসিক অটোমেটিক মেকানিক্যাল ওয়াচ (রয়্যাল এডিশন)',
    nameEn: 'Raybil Classic Royal Automatic Skeleton Mechanical Watch',
    slug: 'raybil-classic-automatic-watch',
    category: 'smartwatch',
    categoryName: 'স্মার্ট ওয়াচ',
    price: 6890,
    originalPrice: 9500,
    discountPercent: 27,
    rating: 5.0,
    reviewCount: 110,
    inStock: true,
    stockCount: 12,
    badge: 'এক্সক্লুসিভ লাক্সারি',
    thumbnail: 'https://images.unsplash.com/photo-1524805444758-089113d48a6d?auto=format&fit=crop&w=600&q=80',
    images: [
      'https://images.unsplash.com/photo-1524805444758-089113d48a6d?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1539185441755-769473a23570?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'হাতে খোদাইকৃত স্কেলিটন ডায়াল, সেলফ-ওয়াইন্ডিং জাপানি মেকানিক্যাল মুভমেন্ট, স্যাফায়ার ক্রিস্টাল গ্লাস ও স্টেইনলেস স্টিল স্ট্র্যাপ।',
    features: [
      'ব্যাটারি প্রয়োজন নেই (স্বয়ংক্রিয় হ্যান্ড মুভমেন্টে চলে)',
      'স্ক্র্যাচ-প্রুফ খাঁটি স্যাফায়ার ক্রিস্টাল গ্লাস',
      '50M ওয়াটার রেজিস্ট্যান্ট (সুইমিং ফ্রেন্ডলি)',
      'লুমিনাস রেডিয়েন্ট নাইট ভিউ সুই'
    ],
    specifications: {
      'মুভমেন্ট': 'Japan Automatic Miyota 8N24',
      'ডায়ামিটার': '41mm 316L Stainless Steel',
      'গ্যারান্টি': '২ বছরের অফিসিয়াল মেকানিক্যাল সার্ভিস'
    },
    colors: ['রয়্যাল সিলভার', 'অবসিডিয়ান গোল্ড']
  }
];

export const INITIAL_ORDERS: Order[] = [
  {
    id: 'RB-84920',
    date: 'আজ দুপুর ১২:৪৫',
    customerName: 'মুহাম্মদ শাকিল আহমেদ',
    phone: '01712-345678',
    email: 'shakil.ahmed@example.com',
    address: 'বাড়ি নং ৪২, রোড ৭, সেক্টর ৪, উত্তরা',
    city: 'ঢাকা',
    notes: 'গেটম্যানের কাছে রেখে যাবেন। আসার আগে ফোন দিন।',
    paymentMethod: 'bkash',
    paymentStatus: 'paid',
    orderStatus: 'out_for_delivery',
    items: [
      {
        product: PRODUCTS[0],
        quantity: 1,
        selectedColor: 'ম্যাট ব্ল্যাক'
      },
      {
        product: PRODUCTS[2],
        quantity: 1,
        selectedColor: 'ম্যাট ব্ল্যাক'
      }
    ],
    subtotal: 4300,
    deliveryFee: 60,
    discount: 300,
    total: 4060,
    estimatedDeliveryDate: 'আজ বিকেল ৫:০০ টার মধ্যে',
    courierName: 'Raybil এক্সপ্রেস ডেলিভারি',
    trackingTimeline: [
      {
        status: 'confirmed',
        title: 'অর্ডার নিশ্চিত হয়েছে',
        description: 'আপনার অর্ডারটি ভেরিফাই করা হয়েছে এবং পেমেন্ট সফল হয়েছে।',
        timestamp: 'আজ সকাল ০৯:৩০',
        completed: true,
        current: false,
        location: 'Raybil হেড অফিস, ঢাকা'
      },
      {
        status: 'processing',
        title: 'প্যাকেজিং ও কোয়ালিটি চেক সম্পন্ন',
        description: 'পণ্যগুলোর কোয়ালিটি ইন্সপেকশন শেষে বাবল র‍্যাপে সুরক্ষিত প্যাকিং করা হয়েছে।',
        timestamp: 'আজ সকাল ১১:১৫',
        completed: true,
        current: false,
        location: 'Raybil সেন্ট্রাল হাব, তেজগাঁও'
      },
      {
        status: 'shipped',
        title: 'এক্সপ্রেস কুরিয়ারে হস্তান্তর',
        description: 'পার্সেলটি আপনার লোকাল ডেলিভারি হাবে পৌঁছেছে।',
        timestamp: 'আজ দুপুর ১২:৩০',
        completed: true,
        current: false,
        location: 'উত্তরা ডিস্ট্রিবিউশন হাব'
      },
      {
        status: 'out_for_delivery',
        title: 'ডেলিভারির জন্য বের হয়েছে',
        description: 'রাইডার তানভীর আহমেদ আপনার পার্সেল নিয়ে রওনা দিয়েছেন। আনুমানিক ২০-৩০ মিনিটে পৌঁছাবে।',
        timestamp: 'আজ দুপুর ০১:৪৫',
        completed: false,
        current: true,
        location: 'সেক্টর ৪ এর কাছাকাছি (চলমান)'
      },
      {
        status: 'delivered',
        title: 'সফল ডেলিভারি',
        description: 'গ্রাহকের নিকট পার্সেল পৌঁছানো সম্পন্ন হবে।',
        timestamp: 'প্রত্যাশিত: বিকেল ০৫:০০',
        completed: false,
        current: false,
        location: 'গন্তব্য: উত্তরা, ঢাকা'
      }
    ],
    rider: {
      name: 'তানভীর আহমেদ',
      phone: '01892-887766',
      rating: 4.95,
      vehicle: 'হন্ডা ১২৫সিসি (ঢাকা মেট্রো-হ-৮৪২১)',
      photoUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
      etaMinutes: 20
    }
  },
  {
    id: 'RB-93821',
    date: 'গতকাল সন্ধ্যা ০৭:২০',
    customerName: 'নুসরাত জাহান রিয়া',
    phone: '01987-654321',
    email: 'nusrat.ria@example.com',
    address: 'ফ্ল্যাট ৪বি, গ্রিন টাওয়ার, ও আর নিজাম রোড',
    city: 'চট্টগ্রাম',
    paymentMethod: 'nagad',
    paymentStatus: 'paid',
    orderStatus: 'shipped',
    items: [
      {
        product: PRODUCTS[1],
        quantity: 1,
        selectedColor: 'টাইটানিয়াম অরেঞ্জ'
      }
    ],
    subtotal: 3890,
    deliveryFee: 120,
    discount: 200,
    total: 3810,
    estimatedDeliveryDate: 'আগামীকাল দুপুর ১২:০০ টার মধ্যে',
    courierName: 'Raybil ইন্টারসিটি এক্সপ্রেস',
    trackingTimeline: [
      {
        status: 'confirmed',
        title: 'অর্ডার নিশ্চিত হয়েছে',
        description: 'অর্ডার প্লেস করা হয়েছে এবং ডিজিটাল ইনভয়েস জেনারেট হয়েছে।',
        timestamp: 'গতকাল সন্ধ্যা ০৭:২০',
        completed: true,
        current: false,
        location: 'অনলাইন সিস্টেম'
      },
      {
        status: 'processing',
        title: 'প্যাকেজিং সম্পন্ন',
        description: 'চট্টগ্রাম ট্রান্সপোর্টের জন্য প্রস্তুত করা হয়েছে।',
        timestamp: 'গতকাল রাত ০৯:৫০',
        completed: true,
        current: false,
        location: 'সেন্ট্রাল হাব'
      },
      {
        status: 'shipped',
        title: 'চট্টগ্রাম রুটে কুরিয়ারে হস্তান্তর',
        description: 'পার্সেলটি হাইওয়ে ট্রান্সপোর্ট কার্গোতে রয়েছে।',
        timestamp: 'আজ সকাল ০৬:০০',
        completed: false,
        current: true,
        location: 'চট্টগ্রাম পোর্ট রোড ট্রানজিট হাব'
      },
      {
        status: 'out_for_delivery',
        title: 'ডেলিভারির জন্য বের হবে',
        description: 'লোকাল রাইডার পার্সেল সংগ্রহ করবে।',
        timestamp: 'প্রত্যাশিত: আগামীকাল সকাল ০৯:৩০',
        completed: false,
        current: false,
        location: 'ও আর নিজাম রোড, চট্টগ্রাম'
      },
      {
        status: 'delivered',
        title: 'সফল ডেলিভারি',
        description: 'গ্রাহকের নিকট হস্তান্তর',
        timestamp: 'প্রত্যাশিত: আগামীকাল দুপুর',
        completed: false,
        current: false,
        location: 'চট্টগ্রাম'
      }
    ]
  },
  {
    id: 'RB-47201',
    date: '৪ সেপ্টেম্বর ২০২৬',
    customerName: 'আরিফুল ইসলাম',
    phone: '01655-443322',
    email: 'arif.islam@example.com',
    address: 'রোড ২, ধানমন্ডি',
    city: 'ঢাকা',
    paymentMethod: 'card',
    paymentStatus: 'paid',
    orderStatus: 'delivered',
    items: [
      {
        product: PRODUCTS[4],
        quantity: 1,
        selectedColor: 'ম্যাট ব্ল্যাক'
      }
    ],
    subtotal: 4690,
    deliveryFee: 60,
    discount: 400,
    total: 4350,
    estimatedDeliveryDate: '৫ সেপ্টেম্বর ২০২৬',
    courierName: 'Raybil এক্সপ্রেস',
    trackingTimeline: [
      {
        status: 'confirmed',
        title: 'অর্ডার নিশ্চিত হয়েছে',
        description: 'পেমেন্ট অনুমোদিত।',
        timestamp: '৪ সেপ্টেম্বর সকাল ১০:০০',
        completed: true,
        current: false,
        location: 'ঢাকা'
      },
      {
        status: 'processing',
        title: 'প্যাকেজিং সম্পন্ন',
        description: 'নিরাপদ বাবল প্যাকিং সম্পন্ন।',
        timestamp: '৪ সেপ্টেম্বর দুপুর ০২:০০',
        completed: true,
        current: false,
        location: 'সেন্ট্রাল গুদাম'
      },
      {
        status: 'shipped',
        title: 'কুরিয়ারে হস্তান্তর',
        description: 'ধানমন্ডি ব্রাঞ্চে পৌঁছেছে।',
        timestamp: '৫ সেপ্টেম্বর সকাল ০৮:৩০',
        completed: true,
        current: false,
        location: 'ধানমন্ডি হাব'
      },
      {
        status: 'out_for_delivery',
        title: 'ডেলিভারির জন্য বের হয়েছে',
        description: 'রাইডার সুজন পার্সেল হ্যান্ডওভার করতে গিয়েছে।',
        timestamp: '৫ সেপ্টেম্বর দুপুর ০১:০০',
        completed: true,
        current: false,
        location: 'ধানমন্ডি'
      },
      {
        status: 'delivered',
        title: 'সফলভাবে গ্রাহকের হাতে ডেলিভারি সম্পন্ন',
        description: 'গ্রাহক পণ্যটি গ্রহণ করেছেন ও সন্তোষ প্রকাশ করেছেন।',
        timestamp: '৫ সেপ্টেম্বর দুপুর ০২:১৫',
        completed: true,
        current: true,
        location: 'গ্রাহকের ঠিকানা, ধানমন্ডি'
      }
    ]
  }
];
