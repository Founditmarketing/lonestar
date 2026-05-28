import React from 'react';

const DesignStudio: React.FC = () => {
  return (
    <div className="pt-24 pb-12 min-h-screen bg-wood-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-wood-100 p-2 md:p-4">
          <div className="map-responsive w-full">
            <iframe 
              title="Idea Room Design Studio"
              style={{ border: 0, width: '100%', height: '80vh', minHeight: '600px' }} 
              src="https://idearoom.lonestarshedsllc.com" 
              allowFullScreen
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DesignStudio;
