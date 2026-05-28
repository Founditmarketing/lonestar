import React, { useState, useEffect, useCallback, useRef } from 'react';
import { ChevronLeft, ChevronRight, ZoomIn, ZoomOut, Maximize2, Minimize2, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

// Import brochure page images - these will be generated from the PDF
const getPageImages = (): string[] => {
  const pages: string[] = [];
  const totalPages = PAGE_COUNT;
  for (let i = 1; i <= totalPages; i++) {
    pages.push(`/brochure/page-${i}.jpg`);
  }
  return pages;
};

// This will be updated after PDF conversion
const PAGE_COUNT = 2;

const Brochure: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [loadedPages, setLoadedPages] = useState<Set<number>>(new Set());
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  
  const pages = getPageImages();
  const totalPages = pages.length;

  // Preload adjacent pages
  useEffect(() => {
    const preloadPages = [currentPage - 1, currentPage, currentPage + 1, currentPage + 2];
    preloadPages.forEach(idx => {
      if (idx >= 0 && idx < totalPages) {
        const img = new Image();
        img.onload = () => {
          setLoadedPages(prev => new Set(prev).add(idx));
        };
        img.src = pages[idx];
      }
    });
  }, [currentPage, totalPages]);

  // Check first page loaded
  useEffect(() => {
    const img = new Image();
    img.onload = () => {
      setIsLoading(false);
      setLoadedPages(prev => new Set(prev).add(0));
    };
    img.onerror = () => {
      setIsLoading(false);
    };
    img.src = pages[0];
  }, []);

  const goToPage = useCallback((page: number) => {
    if (page >= 0 && page < totalPages) {
      setCurrentPage(page);
    }
  }, [totalPages]);

  const nextPage = useCallback(() => {
    goToPage(Math.min(currentPage + 1, totalPages - 1));
  }, [currentPage, totalPages, goToPage]);

  const prevPage = useCallback(() => {
    goToPage(Math.max(currentPage - 1, 0));
  }, [currentPage, goToPage]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === ' ') {
        e.preventDefault();
        nextPage();
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        prevPage();
      } else if (e.key === 'Escape') {
        if (isFullscreen) setIsFullscreen(false);
        else if (isZoomed) setIsZoomed(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [nextPage, prevPage, isFullscreen, isZoomed]);

  // Touch/swipe support
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.touches[0].clientX);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStart === null) return;
    const touchEnd = e.changedTouches[0].clientX;
    const diff = touchStart - touchEnd;
    if (Math.abs(diff) > 50) {
      if (diff > 0) nextPage();
      else prevPage();
    }
    setTouchStart(null);
  };

  // Fullscreen toggle
  const toggleFullscreen = () => {
    if (!isFullscreen) {
      containerRef.current?.requestFullscreen?.();
    } else {
      document.exitFullscreen?.();
    }
    setIsFullscreen(!isFullscreen);
  };

  useEffect(() => {
    const handleFSChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener('fullscreenchange', handleFSChange);
    return () => document.removeEventListener('fullscreenchange', handleFSChange);
  }, []);

  const progress = ((currentPage + 1) / totalPages) * 100;

  return (
    <div 
      ref={containerRef}
      className={`min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 pt-28 pb-16 px-4 ${isFullscreen ? 'pt-4' : ''}`}
    >
      {/* Header */}
      {!isFullscreen && (
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-5xl mx-auto text-center mb-8"
        >
          <h1 className="font-serif text-4xl sm:text-5xl font-bold text-white mb-3">
            Digital Brochure
          </h1>
          <p className="text-slate-400 text-lg">
            Browse our complete catalog of premium handcrafted buildings
          </p>
        </motion.div>
      )}

      {/* Main Viewer */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2 }}
        className="max-w-5xl mx-auto"
      >
        {/* Controls Bar */}
        <div className="flex items-center justify-between bg-slate-800/80 backdrop-blur-sm rounded-t-2xl px-4 sm:px-6 py-3 border border-slate-700/50 border-b-0">
          <div className="flex items-center gap-2">
            <button
              onClick={() => navigate(-1)}
              className="text-slate-400 hover:text-white transition-colors p-2 rounded-lg hover:bg-slate-700/50"
              title="Go back"
            >
              <X size={18} />
            </button>
            <span className="text-slate-400 text-sm font-medium hidden sm:block">
              Lone Star Sheds Catalog
            </span>
          </div>
          
          <div className="flex items-center gap-1 bg-slate-700/50 rounded-full px-3 py-1.5">
            <span className="text-white font-bold text-sm">{currentPage + 1}</span>
            <span className="text-slate-400 text-sm">/</span>
            <span className="text-slate-400 text-sm">{totalPages}</span>
          </div>

          <div className="flex items-center gap-1">
            <button
              onClick={() => setIsZoomed(!isZoomed)}
              className="text-slate-400 hover:text-white transition-colors p-2 rounded-lg hover:bg-slate-700/50"
              title={isZoomed ? 'Zoom out' : 'Zoom in'}
            >
              {isZoomed ? <ZoomOut size={18} /> : <ZoomIn size={18} />}
            </button>
            <button
              onClick={toggleFullscreen}
              className="text-slate-400 hover:text-white transition-colors p-2 rounded-lg hover:bg-slate-700/50"
              title={isFullscreen ? 'Exit fullscreen' : 'Fullscreen'}
            >
              {isFullscreen ? <Minimize2 size={18} /> : <Maximize2 size={18} />}
            </button>
          </div>
        </div>

        {/* Page Display */}
        <div 
          className="relative bg-slate-900 border-x border-slate-700/50 overflow-hidden"
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          {/* Page Content */}
          <div className={`relative flex items-center justify-center transition-all duration-500 ${
            isZoomed ? 'min-h-[80vh] cursor-zoom-out' : 'min-h-[60vh] sm:min-h-[70vh] cursor-zoom-in'
          }`}
            onClick={() => setIsZoomed(!isZoomed)}
          >
            {isLoading ? (
              <div className="flex flex-col items-center gap-4">
                <div className="w-12 h-12 border-3 border-gold-500 border-t-transparent rounded-full animate-spin" />
                <p className="text-slate-400 text-sm">Loading brochure...</p>
              </div>
            ) : (
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentPage}
                  initial={{ opacity: 0, rotateY: -8, x: 40 }}
                  animate={{ opacity: 1, rotateY: 0, x: 0 }}
                  exit={{ opacity: 0, rotateY: 8, x: -40 }}
                  transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  className="w-full flex items-center justify-center p-2 sm:p-4"
                  style={{ perspective: '1200px' }}
                >
                  <img
                    src={pages[currentPage]}
                    alt={`Brochure page ${currentPage + 1}`}
                    className={`shadow-2xl shadow-black/50 rounded-lg transition-all duration-500 select-none ${
                      isZoomed 
                        ? 'max-h-[90vh] w-auto max-w-full' 
                        : 'max-h-[60vh] sm:max-h-[68vh] w-auto max-w-full'
                    }`}
                    draggable={false}
                    loading="lazy"
                  />
                </motion.div>
              </AnimatePresence>
            )}

            {/* Navigation Arrows */}
            {!isLoading && (
              <>
                <button
                  onClick={(e) => { e.stopPropagation(); prevPage(); }}
                  disabled={currentPage === 0}
                  className={`absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 p-2 sm:p-3 rounded-full transition-all
                    ${currentPage === 0 
                      ? 'opacity-0 cursor-default' 
                      : 'bg-white/10 hover:bg-white/20 text-white backdrop-blur-sm shadow-lg hover:scale-110'
                    }`}
                >
                  <ChevronLeft size={24} />
                </button>
                <button
                  onClick={(e) => { e.stopPropagation(); nextPage(); }}
                  disabled={currentPage === totalPages - 1}
                  className={`absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 p-2 sm:p-3 rounded-full transition-all
                    ${currentPage === totalPages - 1 
                      ? 'opacity-0 cursor-default' 
                      : 'bg-white/10 hover:bg-white/20 text-white backdrop-blur-sm shadow-lg hover:scale-110'
                    }`}
                >
                  <ChevronRight size={24} />
                </button>
              </>
            )}
          </div>

          {/* Progress Bar */}
          <div className="h-1 bg-slate-800">
            <motion.div 
              className="h-full bg-gradient-to-r from-gold-500 to-gold-600 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>
        </div>

        {/* Thumbnail Strip */}
        <div className="bg-slate-800/80 backdrop-blur-sm rounded-b-2xl border border-slate-700/50 border-t-0 p-3 sm:p-4">
          <div className="flex gap-2 overflow-x-auto no-scrollbar pb-1 px-1">
            {pages.map((page, idx) => (
              <button
                key={idx}
                onClick={() => goToPage(idx)}
                className={`flex-shrink-0 rounded-lg overflow-hidden transition-all duration-300 border-2 ${
                  idx === currentPage 
                    ? 'border-gold-500 shadow-lg shadow-gold-500/20 scale-105' 
                    : 'border-transparent opacity-50 hover:opacity-80 hover:border-slate-500'
                }`}
              >
                <img
                  src={page}
                  alt={`Page ${idx + 1}`}
                  className="h-14 sm:h-16 w-auto object-cover"
                  loading="lazy"
                  draggable={false}
                />
              </button>
            ))}
          </div>
          
          {/* Keyboard hints */}
          <div className="hidden sm:flex items-center justify-center gap-4 mt-3 text-slate-500 text-xs">
            <span className="flex items-center gap-1">
              <kbd className="bg-slate-700 px-1.5 py-0.5 rounded text-slate-400">←</kbd>
              <kbd className="bg-slate-700 px-1.5 py-0.5 rounded text-slate-400">→</kbd>
              Navigate
            </span>
            <span className="flex items-center gap-1">
              <kbd className="bg-slate-700 px-1.5 py-0.5 rounded text-slate-400">Space</kbd>
              Next
            </span>
            <span className="flex items-center gap-1">
              <kbd className="bg-slate-700 px-1.5 py-0.5 rounded text-slate-400">Esc</kbd>
              Exit
            </span>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Brochure;
