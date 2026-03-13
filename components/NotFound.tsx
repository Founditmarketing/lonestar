import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Home, Compass } from 'lucide-react';

const NotFound: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-wood-50 flex items-center justify-center px-6">
      <div className="max-w-md w-full text-center">
        <div className="w-24 h-24 bg-wood-100 rounded-full flex items-center justify-center mx-auto mb-8 animate-pulse">
            <Compass size={48} className="text-wood-600" />
        </div>
        
        <h1 className="text-6xl font-serif font-bold text-slate-900 mb-4">404</h1>
        <h2 className="text-2xl font-bold text-slate-700 mb-6">Off The Map</h2>
        
        <p className="text-slate-500 mb-10 leading-relaxed">
          Looks like you've wandered a bit too far into the pasture. The page you're looking for doesn't exist.
        </p>
        
        <button 
            onClick={() => navigate('/')}
            className="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold py-4 rounded-xl transition-all shadow-lg flex items-center justify-center gap-2"
        >
            <Home size={20} />
            Return to Safety
        </button>
      </div>
    </div>
  );
};

export default NotFound;