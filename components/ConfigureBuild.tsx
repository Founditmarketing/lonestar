import React, { useState, useEffect, useMemo } from 'react';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import { ArrowLeft, ClipboardList, Send, Ruler, Tag, Sparkles, Share2, Check, Users, Palette, Calculator, DollarSign, Home, MapPin, AlertCircle, X, Percent, Lightbulb, ChevronUp, RotateCcw } from 'lucide-react';
import { AIAnalysisResult } from '../types';
import { DEALERSHIPS } from '../data/dealerships';

interface StyleConfig {
  key: string;
  label: string;
  mainImage: string;
  gallery: string[];
  description: string;
  basePrice: number;
}

// Fallback image in case a specific model image fails to load
const FALLBACK_IMAGE = '/images/real/scraped-32.jpeg';
const STORAGE_KEY = 'lonestar_shed_config';

// Updated mapping with Base Prices for RTO Estimations
const STYLE_GALLERY: Record<string, StyleConfig> = {
  // BARNS
  'lofted_barn': {
    key: 'lofted_barn',
    label: 'Lofted Barn',
    description: 'The iconic gambrel roof maximizes overhead space. Includes dual lofts for roughly 50% more storage.',
    mainImage: '/images/real/scraped-32.jpeg',
    basePrice: 3850,
    gallery: [
      '/images/real/scraped-23.jpeg',
      '/images/real/scraped-30.jpeg',
    ]
  },
  'low_wall_barn': {
    key: 'low_wall_barn',
    label: 'Low Wall Barn',
    description: 'Our most economical option. Classic barn style without the lofts, perfect for basic storage needs.',
    mainImage: '/images/real/scraped-24.jpeg',
    basePrice: 2950,
    gallery: []
  },

  // UTILITY
  'utility_standard': {
    key: 'utility_standard',
    label: 'Utility (End Entry)',
    description: 'Classic A-frame gable roof with doors on the end. Available in Painted LP, Hardie, or Dutchlap.',
    mainImage: '/images/real/scraped-22.jpeg',
    basePrice: 3100,
    gallery: [
      '/images/real/scraped-4.png'
    ]
  },
  'utility_side': {
    key: 'utility_side',
    label: 'Side Utility / Deluxe',
    description: 'A-frame design with entry doors on the side. Includes windows for natural light. A customer favorite.',
    mainImage: '/images/real/scraped-24.jpeg',
    basePrice: 4200,
    gallery: [
      '/images/real/scraped-30.jpeg'
    ]
  },

  // CABINS
  'cabin_lofted': {
     key: 'cabin_lofted',
     label: 'Lofted Cabin',
     description: 'Gambrel roof style with a front porch and overhead lofts. Ideal for a weekend getaway or tiny home.',
     mainImage: '/images/real/scraped-20.jpeg',
     basePrice: 5400,
     gallery: [
       '/images/real/scraped-19.jpeg'
     ]
  },
  'cabin_utility': {
    key: 'cabin_utility',
    label: 'Utility Cabin',
    description: 'Gable roof style with a 4ft or 6ft porch. A simple, elegant solution for a home office or studio.',
    mainImage: '/images/real/scraped-5.png',
    basePrice: 5100,
    gallery: []
 },

  // GARAGES
  'garage_lofted': {
    key: 'garage_lofted',
    label: 'Lofted Garage',
    description: 'Heavy duty floor (12" o.c.), roll-up door, AND overhead lofts. The ultimate workshop.',
    mainImage: '/images/real/scraped-30.jpeg',
    basePrice: 6800,
    gallery: [
      '/images/real/scraped-21.jpeg'
    ]
  },
  'garage_utility': {
    key: 'garage_utility',
    label: 'Utility Garage',
    description: 'Heavy duty floor (12" o.c.) with a roll-up door and classic gable roof profile.',
    mainImage: '/images/real/scraped-20.jpeg',
    basePrice: 6400,
    gallery: []
  },

  'default': {
    key: 'default',
    label: 'Custom Build',
    description: 'We can build to your exact specifications.',
    mainImage: '/images/real/scraped-5.png',
    basePrice: 0,
    gallery: []
  }
};

const MODEL_CATEGORIES = [
  { title: 'Barns', keys: ['lofted_barn', 'low_wall_barn'] },
  { title: 'Utility / Gable', keys: ['utility_standard', 'utility_side'] },
  { title: 'Cabins', keys: ['cabin_lofted', 'cabin_utility'] },
  { title: 'Garages', keys: ['garage_lofted', 'garage_utility'] },
];

const AVAILABLE_SIZES = [
  { id: '8x12', w: 8, l: 12, area: 96, priceMod: 0 },
  { id: '10x12', w: 10, l: 12, area: 120, priceMod: 650 },
  { id: '10x16', w: 10, l: 16, area: 160, priceMod: 1450 },
  { id: '12x16', w: 12, l: 16, area: 192, priceMod: 2250 },
  { id: '12x20', w: 12, l: 20, area: 240, priceMod: 3450 },
  { id: '12x24', w: 12, l: 24, area: 288, priceMod: 4450 },
  { id: '14x24', w: 14, l: 24, area: 336, priceMod: 6100 },
  { id: '14x32', w: 14, l: 32, area: 448, priceMod: 7800 },
  { id: '16x40', w: 16, l: 40, area: 640, priceMod: 11500 },
];

const determineStyleKey = (styleInput: string): string => {
  const s = styleInput.toLowerCase();
  
  if (s.includes('garage')) {
    if (s.includes('loft')) return 'garage_lofted';
    return 'garage_utility';
  }
  
  if (s.includes('cabin') || s.includes('porch')) {
    if (s.includes('loft') || s.includes('barn')) return 'cabin_lofted';
    return 'cabin_utility';
  }

  if (s.includes('barn')) {
    if (s.includes('low')) return 'low_wall_barn';
    return 'lofted_barn';
  }

  if (s.includes('utility') || s.includes('gable')) {
    if (s.includes('side') || s.includes('deluxe')) return 'utility_side';
    return 'utility_standard';
  }
  
  // Fallbacks
  if (s.match(/modern|studio|office|lean/)) return 'utility_standard'; 
  
  return 'default';
};

const COLOR_IMAGE_MAP: Record<string, string> = {
  'Light Grey': '/images/real/scraped-32.jpeg',
  'Charcoal': '/images/real/scraped-30.jpeg',
  'White': '/images/real/scraped-4.png',
  'Barn Red': '/images/real/scraped-23.jpeg',
  'Buckskin': '/images/real/scraped-3.jpeg',
  'Taupe': '/images/real/scraped-2.jpeg',
};

const COLORS = {
  siding: [
    { name: 'Light Grey', class: 'bg-gray-300', previewImage: COLOR_IMAGE_MAP['Light Grey'] },
    { name: 'Charcoal', class: 'bg-slate-700', previewImage: COLOR_IMAGE_MAP['Charcoal'] },
    { name: 'White', class: 'bg-white border border-gray-200', previewImage: COLOR_IMAGE_MAP['White'] },
    { name: 'Barn Red', class: 'bg-red-800', previewImage: COLOR_IMAGE_MAP['Barn Red'] },
    { name: 'Buckskin', class: 'bg-yellow-700', previewImage: COLOR_IMAGE_MAP['Buckskin'] },
    { name: 'Taupe', class: 'bg-[#bcaaa4]', previewImage: COLOR_IMAGE_MAP['Taupe'] },
  ],
  trim: [
    { name: 'White', class: 'bg-white border border-gray-200' },
    { name: 'Black', class: 'bg-black' },
    { name: 'Dark Brown', class: 'bg-[#5d4037]' },
  ]
};

const ConfigureBuild: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  // Helper to load config from localStorage
  const getSavedConfig = () => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) : null;
    } catch (e) {
      console.error("Error loading saved config", e);
      return null;
    }
  };

  const savedConfig = useMemo(() => getSavedConfig(), []);

  // Determine initial data
  const initialData = useMemo(() => {
    if (location.state?.result) {
      return location.state.result as AIAnalysisResult;
    }
    const style = searchParams.get('style');
    const size = searchParams.get('size');
    const price = searchParams.get('price');
    const reason = searchParams.get('reason');

    if (style && size && price && reason) {
      return {
        recommendedStyle: style,
        suggestedSize: size,
        estimatedPriceRange: price,
        reasoning: reason
      } as AIAnalysisResult;
    }
    return undefined;
  }, [location.state, searchParams]);
  
  // Initialize state with priority: savedConfig -> default.
  const [selectedStyleKey, setSelectedStyleKey] = useState<string>(() => savedConfig?.selectedStyleKey || 'default');
  const [selectedSizeId, setSelectedSizeId] = useState<string>(() => savedConfig?.selectedSizeId || '10x12');
  const [activeCategory, setActiveCategory] = useState<string>(() => savedConfig?.activeCategory || MODEL_CATEGORIES[0].title);
  const [activeImage, setActiveImage] = useState<string | null>(null);
  const [isCopied, setIsCopied] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [isMobilePreviewOpen, setIsMobilePreviewOpen] = useState(false);
  
  // New State for Customization
  const [sidingColor, setSidingColor] = useState(() => savedConfig?.sidingColor || 'Light Grey');
  const [trimColor, setTrimColor] = useState(() => savedConfig?.trimColor || 'White');
  const [roofType, setRoofType] = useState(() => savedConfig?.roofType || 'Metal');
  const [rtoTerm, setRtoTerm] = useState<36 | 60>(() => savedConfig?.rtoTerm || 36);
  const [selectedDealership, setSelectedDealership] = useState(() => savedConfig?.selectedDealership || '');

  // Form Data
  const [formData, setFormData] = useState({
    name: savedConfig?.formData?.name || '',
    email: savedConfig?.formData?.email || '',
    phone: savedConfig?.formData?.phone || '',
    notes: searchParams.get('notes') || savedConfig?.formData?.notes || (initialData ? `I'm interested in the ${initialData.recommendedStyle} (${initialData.suggestedSize}) you recommended.` : '')
  });

  // Sync selected style and category when initial data loads or changes
  useEffect(() => {
    if (initialData?.recommendedStyle) {
      const key = determineStyleKey(initialData.recommendedStyle);
      setSelectedStyleKey(key);
      const category = MODEL_CATEGORIES.find(cat => cat.keys.includes(key));
      if (category) {
        setActiveCategory(category.title);
      }
    }
    if (initialData?.suggestedSize) {
        const cleanSize = initialData.suggestedSize.replace(/\s/g, '').toLowerCase();
        const match = AVAILABLE_SIZES.find(s => cleanSize.includes(`${s.w}x${s.l}`) || s.id === cleanSize);
        if (match) setSelectedSizeId(match.id);
    }
  }, [initialData]);

  // Save changes to localStorage
  useEffect(() => {
    const config = {
      selectedStyleKey,
      selectedSizeId,
      activeCategory,
      sidingColor,
      trimColor,
      roofType,
      rtoTerm,
      selectedDealership,
      formData: {
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          notes: formData.notes
      },
      updatedAt: Date.now()
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(config));
  }, [selectedStyleKey, selectedSizeId, activeCategory, sidingColor, trimColor, roofType, rtoTerm, selectedDealership, formData]);


  const handleReset = () => {
    if (window.confirm("Are you sure you want to clear your current design and start over?")) {
       localStorage.removeItem(STORAGE_KEY);
       setSelectedStyleKey('default');
       setSelectedSizeId('10x12');
       setActiveCategory(MODEL_CATEGORIES[0].title);
       setSidingColor('Light Grey');
       setTrimColor('White');
       setRoofType('Metal');
       setRtoTerm(36);
       setSelectedDealership('');
       setFormData({ name: '', email: '', phone: '', notes: '' });
       navigate('/configure', { replace: true });
    }
  };

  const styleConfig = STYLE_GALLERY[selectedStyleKey] || STYLE_GALLERY['default'];
  const sizeConfig = AVAILABLE_SIZES.find(s => s.id === selectedSizeId) || AVAILABLE_SIZES[0];
  const totalPrice = styleConfig.basePrice > 0 ? styleConfig.basePrice + sizeConfig.priceMod : 0;
  const divisor = rtoTerm === 36 ? 21.6 : 24.0;
  const estimatedRtoPayment = totalPrice > 0 ? Math.round(totalPrice / divisor) : 0;
  const securityDeposit = rtoTerm === 60 ? 150 : 0;
  const dueToday = estimatedRtoPayment + securityDeposit;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Construct Email Body
    const dealer = DEALERSHIPS.find(d => d.id === selectedDealership);
    const subject = `New Quote Request: ${styleConfig.label} - ${sizeConfig.id}`;
    
    const body = `
New Custom Shed Quote Request

--- CUSTOMER INFO ---
Name: ${formData.name}
Phone: ${formData.phone}
Email: ${formData.email}
Preferred Dealer: ${dealer ? dealer.city : 'None Selected'}

--- BUILD SPECS ---
Model: ${styleConfig.label}
Size: ${sizeConfig.id}
Siding Color: ${sidingColor}
Trim Color: ${trimColor}
Roof: ${roofType}

--- PRICING (EST) ---
Cash Price: $${totalPrice.toLocaleString()}
RTO Term: ${rtoTerm} Months
Monthly Pmt: $${estimatedRtoPayment}

--- NOTES ---
${formData.notes}
    `.trim();

    // Open Mail Client
    window.location.href = `mailto:sales@lonestarsheds.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

    setTimeout(() => {
        setShowSuccessModal(true);
    }, 1000);
  };

  const closeSuccessModal = () => {
      localStorage.removeItem(STORAGE_KEY);
      setShowSuccessModal(false);
      navigate('/');
  };

  const handleShare = () => {
    const params = new URLSearchParams();
    if (initialData) {
      params.set('style', initialData.recommendedStyle);
      params.set('size', initialData.suggestedSize);
      params.set('price', initialData.estimatedPriceRange);
      params.set('reason', initialData.reasoning);
    }
    if (formData.notes) params.set('notes', formData.notes);
    
    const baseUrl = window.location.origin + window.location.pathname;
    const hashPath = window.location.hash.split('?')[0]; 
    const shareUrl = `${baseUrl}${hashPath}?${params.toString()}`;

    navigator.clipboard.writeText(shareUrl).then(() => {
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    });
  };

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    const target = e.currentTarget;
    if (target.src !== FALLBACK_IMAGE) {
        target.src = FALLBACK_IMAGE;
    }
  };

  const selectedColorImage = COLORS.siding.find(c => c.name === sidingColor)?.previewImage;
  const currentMainImage = activeImage || selectedColorImage || styleConfig.mainImage;
  const isAIRecommended = initialData && determineStyleKey(initialData.recommendedStyle) === selectedStyleKey;
  const isSharedView = !location.state?.result && !!searchParams.get('style');
  const selectedCategoryTitle = MODEL_CATEGORIES.find(c => c.keys.includes(selectedStyleKey))?.title || 'Custom Build';
  
  const currentCategoryModels = MODEL_CATEGORIES.find(c => c.title === activeCategory)?.keys || [];

  // Sidebar Component to be reused in Desktop Sidebar and Mobile Modal
  const BuildSummary = () => (
    <div className="flex flex-col h-full">
        <div className="flex items-center justify-between mb-6 text-wood-900">
          <div className="flex items-center gap-2">
            <ClipboardList size={24} />
            <h3 className="font-serif font-bold text-xl">Build Summary</h3>
          </div>
           <button 
             onClick={handleReset}
             className="text-slate-400 hover:text-wood-600 transition-colors p-1"
             title="Reset Build"
          >
             <RotateCcw size={16} />
          </button>
        </div>

        {initialData && !isAIRecommended && (
            <button
              onClick={() => {
                const key = determineStyleKey(initialData.recommendedStyle);
                setSelectedStyleKey(key);
                const cat = MODEL_CATEGORIES.find(c => c.keys.includes(key));
                if (cat) setActiveCategory(cat.title);
                setActiveImage(null);
              }}
              className="mb-6 w-full bg-wood-50 hover:bg-wood-100 border border-wood-200 text-wood-800 text-xs font-bold py-3 px-4 rounded-xl flex items-center justify-center gap-2 transition-all shadow-sm group"
            >
              <Sparkles size={14} className="text-wood-600 group-hover:animate-pulse" />
              Revert to Recommended
            </button>
        )}

        <div className="space-y-6 flex-1">
            <div className="bg-white rounded-2xl overflow-hidden border border-wood-100 shadow-sm group relative">
              {isAIRecommended && (
                  <div className="absolute top-3 left-3 z-20 bg-wood-600 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg flex items-center gap-1.5 border border-white/20 animate-fade-in ring-1 ring-black/10">
                    <Sparkles size={14} className="text-yellow-300" />
                    Recommended
                  </div>
              )}

              <div className="h-48 overflow-hidden relative">
                <img 
                  src={currentMainImage} 
                  alt={styleConfig.label}
                  className="w-full h-full object-cover transition-transform duration-700"
                  onError={handleImageError}
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent pointer-events-none"></div>
                <div className="absolute bottom-3 left-3 text-white">
                    <span className="text-[10px] font-bold uppercase tracking-wider opacity-80">{selectedCategoryTitle} Series</span>
                    <p className="font-serif font-bold text-lg leading-tight">
                      {styleConfig.label}
                    </p>
                </div>
              </div>
              
              {/* Image Gallery Thumbnails */}
              <div className="p-3 bg-white grid grid-cols-3 gap-2">
                <button 
                  onClick={() => setActiveImage(null)}
                  className={`relative h-14 rounded-lg overflow-hidden border-2 transition-all ${activeImage === null ? 'border-wood-600 ring-2 ring-wood-600' : 'border-transparent opacity-70 hover:opacity-100'}`}
                >
                    <img src={styleConfig.mainImage} className="w-full h-full object-cover" alt="Main" onError={handleImageError} loading="lazy" />
                </button>
                {styleConfig.gallery.map((img, idx) => (
                    <button 
                    key={idx}
                    onClick={() => setActiveImage(img)}
                    className={`relative h-14 rounded-lg overflow-hidden border-2 transition-all ${activeImage === img ? 'border-wood-600 ring-2 ring-wood-600' : 'border-transparent opacity-70 hover:opacity-100'}`}
                    >
                    <img src={img} className="w-full h-full object-cover" alt={`View ${idx + 1}`} onError={handleImageError} loading="lazy" />
                    </button>
                ))}
              </div>
              
              <div className="px-4 pb-4 pt-2 border-t border-slate-100 mt-2">
                <div className="grid grid-cols-2 gap-2 text-xs">
                    <div>
                      <span className="block text-slate-400 font-bold uppercase text-[10px]">Siding</span>
                      <span className="font-semibold text-slate-800 flex items-center gap-1">
                        <div className={`w-2 h-2 rounded-full ${COLORS.siding.find(c => c.name === sidingColor)?.class} shadow-sm border border-slate-200`}></div>
                        {sidingColor}
                      </span>
                    </div>
                    <div>
                      <span className="block text-slate-400 font-bold uppercase text-[10px]">Trim</span>
                      <span className="font-semibold text-slate-800 flex items-center gap-1">
                          <div className={`w-2 h-2 rounded-full ${COLORS.trim.find(c => c.name === trimColor)?.class} shadow-sm border border-slate-200`}></div>
                          {trimColor}
                      </span>
                    </div>
                    <div>
                      <span className="block text-slate-400 font-bold uppercase text-[10px]">Roof</span>
                      <span className="font-semibold text-slate-800">{roofType}</span>
                    </div>
                    <div>
                      <span className="block text-slate-400 font-bold uppercase text-[10px]">Dealer</span>
                      <span className="font-semibold text-slate-800 truncate">
                        {DEALERSHIPS.find(d => d.id === selectedDealership)?.city || 'Any'}
                      </span>
                    </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className={`bg-white p-4 rounded-xl border shadow-sm flex flex-col justify-center items-center text-center gap-2 relative overflow-hidden transition-all ${isAIRecommended ? 'border-wood-500 ring-1 ring-wood-500/20' : 'border-wood-100'}`}>
                {isAIRecommended && <div className="absolute top-0 right-0 w-3 h-3 bg-wood-500/20 rounded-bl-lg"></div>}
                <Ruler size={24} className="text-wood-500" />
                <div>
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Dimensions</label>
                  <p className="font-bold text-wood-900">
                    {sizeConfig.id}
                  </p>
                </div>
              </div>
              <div className="bg-white p-4 rounded-xl border border-wood-100 shadow-sm flex flex-col justify-center items-center text-center gap-2">
                <Tag size={24} className="text-wood-500" />
                <div>
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Est. RTO</label>
                  <p className="font-bold text-wood-800 text-sm">
                      {estimatedRtoPayment > 0 ? `$${estimatedRtoPayment}/mo` : 'Call for Pricing'}
                  </p>
                  <p className="text-[10px] text-slate-400">{rtoTerm} months</p>
                </div>
              </div>
            </div>

            {isAIRecommended && initialData?.reasoning && (
              <div className="mt-4 bg-sky-50 p-5 rounded-xl border border-sky-100 shadow-sm relative overflow-hidden group">
                  <div className="absolute right-0 top-0 p-4 opacity-10 pointer-events-none">
                      <Lightbulb size={60} className="text-sky-600" />
                  </div>
                  <div className="flex items-center gap-2 mb-3 relative z-10">
                      <div className="bg-white p-1.5 rounded-full border border-sky-200 shadow-sm text-sky-600">
                          <Sparkles size={14} /> 
                      </div>
                      <span className="text-xs font-bold text-sky-800 uppercase tracking-wider">Design Insight</span>
                  </div>
                  <p className="text-sm text-slate-700 leading-relaxed relative z-10 font-medium">
                      "{initialData.reasoning}"
                  </p>
              </div>
            )}
        </div>
    </div>
  );

  return (
    <div className="pt-20 pb-32 md:pb-16 min-h-screen bg-wood-50 relative">
      <div className="max-w-6xl mx-auto px-3 md:px-6">
        
        <div className="flex justify-between items-center mb-8">
            <button 
                onClick={() => navigate('/')}
                className="flex items-center gap-2 text-slate-500 hover:text-wood-500 transition-colors font-medium text-sm md:text-base"
            >
                <ArrowLeft size={20} /> <span className="hidden sm:inline">Back to Home</span> <span className="sm:hidden">Home</span>
            </button>

            {initialData && (
                <button
                    onClick={handleShare}
                    className="flex items-center gap-2 text-wood-600 hover:text-wood-800 transition-colors font-medium bg-white px-4 py-2 rounded-full shadow-sm border border-wood-100 hover:shadow-md text-sm"
                >
                    {isCopied ? <Check size={18} className="text-green-600" /> : <Share2 size={18} />}
                    {isCopied ? 'Copied!' : 'Share'}
                </button>
            )}
        </div>

        {/* Shared View Banner */}
        {isSharedView && (
          <div className="bg-blue-50 border border-blue-100 rounded-xl p-4 mb-8 flex items-center gap-3 text-blue-800 animate-fade-in">
             <div className="bg-blue-100 p-2 rounded-full shrink-0">
               <Users size={18} className="text-blue-600"/>
             </div>
             <div>
               <p className="font-bold text-sm">Shared Design Loaded</p>
               <p className="text-xs opacity-80">You are viewing a custom configuration.</p>
             </div>
          </div>
        )}

        {/* Main Card */}
        <div className="bg-white rounded-xl md:rounded-3xl shadow-lg md:shadow-xl border border-wood-100 flex flex-col overflow-hidden">
          {/* Header */}
          <div className="bg-wood-800 p-6 md:p-12 text-center relative overflow-hidden">
             <div className="absolute top-0 right-0 w-full h-full bg-wood-500/10 opacity-20" style={{ backgroundImage: 'radial-gradient(circle, #ffffff 1px, transparent 1px)', backgroundSize: '20px 20px' }}></div>
            <h1 className="text-2xl md:text-4xl font-serif font-bold text-white mb-2 md:mb-4 relative z-10">Configure Your Build</h1>
            <p className="text-sm md:text-base text-wood-200 relative z-10">Finalize your specifications.</p>
          </div>

          <div className="grid md:grid-cols-12 flex-1">
            {/* Desktop Sidebar Summary - Hidden on Mobile */}
            <div className="hidden md:block md:col-span-5 bg-wood-50 md:border-r border-wood-100">
               <div className="sticky top-32 p-8 max-h-[calc(100vh-8rem)] overflow-y-auto no-scrollbar">
                   <BuildSummary />
               </div>
            </div>

            {/* Form & Customization */}
            <div className="col-span-12 md:col-span-7 p-4 md:p-12">
              <form onSubmit={handleSubmit} className="space-y-6 md:space-y-12 pb-24 md:pb-0">
                
                {/* Step 1: Model Selection (Tabbed Interface) */}
                <div>
                   <h3 className="text-lg font-bold text-slate-900 mb-6 flex items-center gap-2">
                    <span className="w-8 h-8 rounded-full bg-wood-800 text-white flex items-center justify-center text-sm font-serif">1</span>
                    Select Your Model
                  </h3>
                  
                  {/* Tabs with edge-to-edge scrolling on mobile */}
                  <div className="flex gap-2 overflow-x-auto pb-4 mb-2 no-scrollbar scroll-smooth -mx-4 px-4 md:mx-0 md:px-0">
                    {MODEL_CATEGORIES.map((cat) => (
                      <button
                        key={cat.title}
                        type="button"
                        onClick={() => setActiveCategory(cat.title)}
                        className={`whitespace-nowrap px-4 py-2 md:px-5 md:py-2.5 rounded-full text-xs md:text-sm font-bold transition-all shadow-sm flex-shrink-0 ${
                          activeCategory === cat.title 
                          ? 'bg-wood-700 text-white ring-2 ring-wood-700 ring-offset-2' 
                          : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50 hover:border-slate-300'
                        }`}
                      >
                        {cat.title}
                      </button>
                    ))}
                  </div>

                  {/* Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 animate-fade-in">
                      {currentCategoryModels.map((key) => {
                        const style = STYLE_GALLERY[key];
                        const isSelected = selectedStyleKey === key;
                        return (
                          <button
                            key={key}
                            type="button"
                            onClick={() => {
                              setSelectedStyleKey(key);
                              setActiveImage(null);
                            }}
                            className={`group text-left rounded-2xl border-2 overflow-hidden transition-all duration-300 relative flex flex-col shadow-sm hover:shadow-xl ${
                              isSelected 
                                ? 'border-wood-600 ring-2 ring-wood-500/20 bg-white' 
                                : 'border-slate-100 hover:border-wood-300 bg-white'
                            }`}
                          >
                             {/* Selected Indicator */}
                             <div className={`absolute top-3 right-3 z-20 transition-all duration-300 ${isSelected ? 'scale-100 opacity-100' : 'scale-0 opacity-0'}`}>
                                <div className="bg-wood-600 text-white p-1.5 rounded-full shadow-lg">
                                  <Check size={16} strokeWidth={3} />
                                </div>
                             </div>

                            <div className="h-40 overflow-hidden w-full relative">
                                <div className={`absolute inset-0 bg-wood-900/10 z-10 transition-opacity ${isSelected ? 'opacity-0' : 'opacity-0 group-hover:opacity-10'}`}></div>
                                <img 
                                  src={style.mainImage} 
                                  alt={style.label} 
                                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                                  onError={handleImageError}
                                  loading="lazy"
                                />
                            </div>
                            <div className="p-4 md:p-5 flex-1 flex flex-col">
                                <div className="flex justify-between items-center mb-2">
                                  <h5 className={`font-serif font-bold text-lg ${isSelected ? 'text-wood-900' : 'text-slate-900'}`}>{style.label}</h5>
                                </div>
                                <p className="text-xs text-slate-500 leading-relaxed mb-4 line-clamp-2">{style.description}</p>
                                <div className="mt-auto pt-3 border-t border-slate-50 flex items-center justify-between">
                                  <div className="flex flex-col">
                                     <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Starting at</span>
                                     <span className="text-sm font-bold text-slate-700">${style.basePrice.toLocaleString()}</span>
                                  </div>
                                  <span className={`text-xs font-bold px-3 py-1.5 rounded-lg transition-colors ${isSelected ? 'bg-wood-100 text-wood-700' : 'bg-slate-50 text-slate-500 group-hover:bg-wood-50 group-hover:text-wood-600'}`}>
                                    {isSelected ? 'Selected' : 'Select'}
                                  </span>
                                </div>
                            </div>
                          </button>
                        );
                      })}
                  </div>
                </div>
                
                <div className="border-t border-slate-100 w-full"></div>

                {/* Step 2: Size Selection */}
                <div>
                   <h3 className="text-lg font-bold text-slate-900 mb-6 flex items-center gap-2">
                    <span className="w-8 h-8 rounded-full bg-wood-800 text-white flex items-center justify-center text-sm font-serif">2</span>
                    Choose Size & Layout
                  </h3>
                  
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 md:gap-3">
                    {AVAILABLE_SIZES.map((size) => {
                      const isSelected = selectedSizeId === size.id;
                      return (
                        <button
                          key={size.id}
                          type="button"
                          onClick={() => setSelectedSizeId(size.id)}
                          className={`relative p-3 md:p-4 rounded-xl border-2 transition-all flex flex-col items-center justify-center gap-1 ${
                            isSelected 
                            ? 'border-wood-600 bg-wood-50 text-wood-900 shadow-md ring-1 ring-wood-600' 
                            : 'border-slate-100 bg-white text-slate-600 hover:border-wood-200 hover:shadow-lg'
                          }`}
                        >
                          <span className="text-base md:text-lg font-bold">{size.w}' x {size.l}'</span>
                          <span className="text-xs opacity-60 font-medium">{size.area} sq. ft.</span>
                          
                          {size.priceMod > 0 && (
                            <span className="mt-1 text-[10px] font-bold bg-slate-100 text-slate-600 px-2 py-0.5 rounded-full">
                              +{size.priceMod.toLocaleString()}
                            </span>
                          )}
                          
                          {isSelected && (
                            <div className="absolute top-2 right-2 text-wood-600">
                              <Check size={14} strokeWidth={3} />
                            </div>
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div className="border-t border-slate-100 w-full"></div>

                {/* Step 3: Visual Customization Section */}
                <div>
                   <h3 className="text-lg font-bold text-slate-900 mb-6 flex items-center gap-2">
                    <span className="w-8 h-8 rounded-full bg-wood-800 text-white flex items-center justify-center text-sm font-serif">3</span>
                    Customize Look
                  </h3>
                  
                  <div className="grid md:grid-cols-2 gap-6 mb-6">
                     <div>
                       <label className="text-sm font-semibold text-slate-600 mb-3 block flex items-center gap-2">
                         <Palette size={16} /> Siding Color
                       </label>
                       <div className="grid grid-cols-3 gap-2 md:gap-3">
                          {COLORS.siding.map((color) => (
                            <button
                              key={color.name}
                              type="button"
                              onClick={() => setSidingColor(color.name)}
                              className={`flex flex-col items-center gap-2 p-2 rounded-xl border transition-all ${sidingColor === color.name ? 'border-wood-600 ring-1 ring-wood-600 bg-wood-50' : 'border-slate-100 hover:border-wood-200'}`}
                            >
                               <div className={`w-8 h-8 rounded-full ${color.class} shadow-sm border border-black/10`}></div>
                               <span className="text-[10px] font-medium text-slate-700">{color.name}</span>
                            </button>
                          ))}
                       </div>
                     </div>
                     
                     <div className="space-y-6">
                        <div>
                            <label className="text-sm font-semibold text-slate-600 mb-3 block">Trim Color</label>
                            <div className="grid grid-cols-3 gap-2 md:gap-3">
                                {COLORS.trim.map((color) => (
                                    <button
                                    key={color.name}
                                    type="button"
                                    onClick={() => setTrimColor(color.name)}
                                    className={`flex flex-col items-center gap-2 p-2 rounded-xl border transition-all ${trimColor === color.name ? 'border-wood-600 ring-1 ring-wood-600 bg-wood-50' : 'border-slate-100 hover:border-wood-200'}`}
                                    >
                                    <div className={`w-8 h-8 rounded-full ${color.class} shadow-sm border border-black/10`}></div>
                                    <span className="text-[10px] font-medium text-slate-700">{color.name}</span>
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div>
                           <label className="text-sm font-semibold text-slate-600 mb-3 block flex items-center gap-2">
                             <Home size={16} /> Roof Material
                           </label>
                           <div className="flex bg-slate-100 p-1 rounded-lg">
                              {['Metal', 'Shingle'].map((type) => (
                                <button
                                  key={type}
                                  type="button"
                                  onClick={() => setRoofType(type)}
                                  className={`flex-1 py-2 text-sm font-medium rounded-md transition-all ${roofType === type ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
                                >
                                  {type}
                                </button>
                              ))}
                           </div>
                        </div>
                     </div>
                  </div>
                </div>

                <div className="border-t border-slate-100 w-full"></div>

                {/* Step 4: Financing Section */}
                <div>
                   <h3 className="text-lg font-bold text-slate-900 mb-6 flex items-center gap-2">
                    <span className="w-8 h-8 rounded-full bg-wood-800 text-white flex items-center justify-center text-sm font-serif">4</span>
                    Payment & Financing
                  </h3>
                  
                  <div className="grid md:grid-cols-2 gap-6">
                    {/* Cash Option */}
                    <div 
                        onClick={() => setRtoTerm(36)}
                        className="bg-white p-6 rounded-2xl border border-slate-200 hover:border-slate-300 transition-all cursor-default"
                    >
                        <div className="flex justify-between items-start mb-4">
                            <div className="bg-green-100 text-green-700 p-2 rounded-lg">
                                <DollarSign size={24} />
                            </div>
                            <span className="bg-green-100 text-green-800 text-[10px] font-bold px-2 py-1 rounded-full uppercase tracking-wider">Best Value</span>
                        </div>
                        <h4 className="text-slate-500 font-bold text-sm uppercase tracking-wider mb-1">Cash Price</h4>
                        <p className="text-3xl font-serif font-bold text-slate-900 mb-2">${totalPrice.toLocaleString()}</p>
                        <p className="text-xs text-slate-500">Pay upfront. Accepted: Check, Cash, Credit Card (+3%).</p>
                    </div>

                    {/* RTO Calculator */}
                    <div className="bg-wood-50 p-6 rounded-2xl border border-wood-200 relative overflow-hidden">
                        <div className="flex items-center gap-2 mb-6 relative z-10">
                             <Calculator className="text-wood-600" size={20} />
                             <h4 className="font-bold text-wood-900">Rent-to-Own Calculator</h4>
                        </div>

                        {/* Term Toggle */}
                        <div className="flex bg-white p-1 rounded-xl border border-wood-100 mb-6 relative z-10">
                            {[36, 60].map((term) => (
                                <button
                                    key={term}
                                    type="button"
                                    onClick={() => setRtoTerm(term as 36 | 60)}
                                    className={`flex-1 py-2 text-sm font-bold rounded-lg transition-all ${rtoTerm === term ? 'bg-wood-500 text-white shadow-md' : 'text-slate-500 hover:text-wood-600'}`}
                                >
                                    {term} Months
                                </button>
                            ))}
                        </div>

                        {/* Calculation Display */}
                        <div className="space-y-3 relative z-10">
                            <div className="flex justify-between items-center pb-3 border-b border-wood-200/50">
                                <span className="text-sm text-wood-800 font-medium">Monthly Rental</span>
                                <span className="text-xl font-bold text-wood-900">${estimatedRtoPayment}</span>
                            </div>
                            <div className="flex justify-between items-center pb-3 border-b border-wood-200/50">
                                <span className="text-sm text-wood-800 font-medium">Security Deposit</span>
                                <span className="text-sm font-bold text-wood-900">{rtoTerm === 60 ? '$150 (Refundable)' : '$0.00'}</span>
                            </div>
                             <div className="flex justify-between items-center pt-1">
                                <span className="text-sm text-wood-900 font-extrabold uppercase">Due Today</span>
                                <span className="text-2xl font-serif font-bold text-wood-900">${dueToday}</span>
                            </div>
                        </div>
                        
                        {/* Background Decor */}
                        <div className="absolute -bottom-10 -right-10 text-wood-100/50 pointer-events-none">
                            <Percent size={120} />
                        </div>
                    </div>
                  </div>
                </div>

                <div className="border-t border-slate-100 w-full"></div>

                {/* Step 5: Contact Info */}
                <div>
                   <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
                    <span className="w-8 h-8 rounded-full bg-wood-800 text-white flex items-center justify-center text-sm font-serif">5</span>
                    Contact Information
                  </h3>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-semibold text-slate-600">Full Name</label>
                      <input 
                        required
                        type="text" 
                        placeholder="John Doe"
                        className="w-full p-3 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-wood-500 outline-none transition-all"
                        value={formData.name}
                        onChange={e => setFormData({...formData, name: e.target.value})}
                      />
                    </div>
                    <div className="space-y-2">
                       <label className="text-sm font-semibold text-slate-600">Phone Number</label>
                      <input 
                        required
                        type="tel" 
                        placeholder="(555) 555-5555"
                        className="w-full p-3 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-wood-500 outline-none transition-all"
                        value={formData.phone}
                        onChange={e => setFormData({...formData, phone: e.target.value})}
                      />
                    </div>
                    <div className="space-y-2 md:col-span-2">
                      <label className="text-sm font-semibold text-slate-600">Email Address</label>
                      <input 
                        required
                        type="email" 
                        placeholder="john@example.com"
                        className="w-full p-3 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-wood-500 outline-none transition-all"
                        value={formData.email}
                        onChange={e => setFormData({...formData, email: e.target.value})}
                      />
                    </div>
                    <div className="space-y-2 md:col-span-2">
                       <label className="text-sm font-semibold text-slate-600 flex items-center gap-2">
                         <MapPin size={16} /> Preferred Dealership / Delivery Hub
                       </label>
                       <select
                         className="w-full p-3 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-wood-500 outline-none transition-all appearance-none cursor-pointer"
                         value={selectedDealership}
                         onChange={(e) => setSelectedDealership(e.target.value)}
                       >
                         <option value="">-- Find Nearest Dealership --</option>
                         {DEALERSHIPS.map((d) => (
                           <option key={d.id} value={d.id}>
                             {d.city}, TX {d.contactName ? `- Ask for ${d.contactName}` : ''}
                           </option>
                         ))}
                       </select>
                       <p className="text-xs text-slate-400">Selecting a nearby dealership helps us estimate delivery times more accurately.</p>
                    </div>
                  </div>
                   <div className="space-y-2 mt-6">
                    <label className="text-sm font-semibold text-slate-600">Additional Notes & Requests</label>
                    <textarea 
                      rows={4}
                      className="w-full p-3 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-wood-500 outline-none resize-none transition-all"
                      value={formData.notes}
                      onChange={e => setFormData({...formData, notes: e.target.value})}
                      placeholder="I'd like to add a ramp, an extra window on the west side, and maybe upgrade the door..."
                    />
                  </div>
                </div>

                <button 
                  type="submit" 
                  className="w-full bg-gold-500 hover:bg-gold-400 text-slate-900 font-bold py-4 rounded-xl transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
                >
                  <Send size={20} />
                  Submit Custom Quote Request
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* Mobile Sticky Footer & Modal */}
        <div className="md:hidden">
            {/* Sticky Footer Bar */}
            <div className="fixed bottom-0 left-0 w-full bg-white border-t border-slate-200 p-4 z-40 shadow-[0_-5px_15px_rgba(0,0,0,0.1)] flex items-center justify-between">
                <div>
                    <p className="text-xs text-slate-500 uppercase font-bold tracking-wider">Estimated Total</p>
                    <p className="text-xl font-serif font-bold text-slate-900">${totalPrice.toLocaleString()}</p>
                </div>
                <button 
                    onClick={() => setIsMobilePreviewOpen(true)}
                    className="bg-wood-800 text-white px-5 py-2.5 rounded-lg font-bold text-sm flex items-center gap-2 shadow-md active:scale-95 transition-transform"
                >
                    View Build <ChevronUp size={16} />
                </button>
            </div>

            {/* Full Screen Preview Modal */}
            {isMobilePreviewOpen && (
                <div className="fixed inset-0 z-[60] flex flex-col bg-wood-50 animate-fade-in-up h-[100dvh]">
                    <div className="bg-white p-4 flex items-center justify-between border-b border-slate-200 shadow-sm sticky top-0 z-10">
                        <h3 className="font-serif font-bold text-lg text-slate-900">Your Build</h3>
                        <button 
                            onClick={() => setIsMobilePreviewOpen(false)}
                            className="bg-slate-100 p-2 rounded-full text-slate-600 hover:bg-slate-200"
                        >
                            <X size={20} />
                        </button>
                    </div>
                    <div className="p-4 overflow-y-auto pb-24">
                        <BuildSummary />
                    </div>
                </div>
            )}
        </div>

        {/* Success Modal */}
        {showSuccessModal && (
            <div className="fixed inset-0 z-[60] flex items-center justify-center p-6 bg-slate-900/80 backdrop-blur-sm animate-fade-in">
                <div className="bg-white w-full max-w-md rounded-3xl p-8 text-center shadow-2xl relative animate-fade-in-up">
                    <button onClick={closeSuccessModal} className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 transition-colors">
                        <X size={24} />
                    </button>
                    
                    <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                        <Check size={40} strokeWidth={3} />
                    </div>
                    
                    <h2 className="text-2xl font-serif font-bold text-slate-900 mb-2">Request Received!</h2>
                    <p className="text-slate-600 mb-8">
                        Thanks for choosing Lone Star Sheds. We have sent a confirmation email to <strong>{formData.email}</strong>. A sales representative will be in touch within 24 hours.
                    </p>
                    
                    <button 
                        onClick={closeSuccessModal}
                        className="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold py-3 rounded-xl transition-all"
                    >
                        Return to Home
                    </button>
                </div>
            </div>
        )}

      </div>
    </div>
  );
};

export default ConfigureBuild;