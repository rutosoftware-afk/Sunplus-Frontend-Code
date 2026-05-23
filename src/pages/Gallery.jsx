import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { videoLinks, imageLinks } from '../data/galleryData';

const Gallery = () => {
  const [activeTab, setActiveTab] = useState('all'); // 'all', 'images', 'videos'
  const [selectedMedia, setSelectedMedia] = useState(null);
  const [visibleCount, setVisibleCount] = useState(12); // Pagination

  useEffect(() => {
    document.title = "Product Gallery | Sunplus Cera LLP";
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Explore our premium gallery of ceramic tiles, granite kitchen sinks, and step stones by Sunplus Cera.');
    }
  }, []);

  // Combine media and add type
  const allMedia = [
    ...videoLinks.map((v, i) => ({ ...v, type: 'video', id: `vid-${i}` })),
    ...imageLinks.map((img, i) => ({ ...img, type: 'image', id: `img-${i}` }))
  ];

  const filteredMedia = allMedia.filter(media => {
    if (activeTab === 'all') return true;
    if (activeTab === 'images') return media.type === 'image';
    if (activeTab === 'videos') return media.type === 'video';
    return false;
  });

  const displayedMedia = filteredMedia.slice(0, visibleCount);

  // Reset visible count when tab changes
  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setVisibleCount(12);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { duration: 0.5, ease: "easeOut" } }
  };

  // Helper to generate thumbnail URL from video URL
  const getVideoThumbnail = (url) => {
    if (url.includes('drive.google.com')) {
      const fileIdMatch = url.match(/\/d\/([a-zA-Z0-9_-]+)\//);
      if (fileIdMatch && fileIdMatch[1]) {
        return `https://drive.google.com/thumbnail?id=${fileIdMatch[1]}&sz=w500`;
      }
      const idMatch = url.match(/id=([a-zA-Z0-9_-]+)/);
      if (idMatch && idMatch[1]) {
        return `https://drive.google.com/thumbnail?id=${idMatch[1]}&sz=w500`;
      }
    }
    if (url.includes('cloudinary.com') && url.endsWith('.mp4')) {
      return url.replace('vc_h264,ac_aac,f_mp4/', '').replace('.mp4', '.jpg');
    }
    return url;
  };

  // Helper to optimize image thumbnails for the grid
  const getOptimizedImageUrl = (url, size = 500) => {
    if (url.includes('drive.google.com/thumbnail')) {
      return url.replace(/sz=w\d+/, `sz=w${size}`);
    }
    return url;
  };

  // Helper to generate embed URL for Google Drive videos
  const getEmbedUrl = (url) => {
    if (url.includes('drive.google.com')) {
      const fileIdMatch = url.match(/\/d\/([a-zA-Z0-9_-]+)\//);
      if (fileIdMatch && fileIdMatch[1]) {
        return `https://drive.google.com/file/d/${fileIdMatch[1]}/preview`;
      }
    }
    return url;
  };

  return (
    <section className="bg-charcoal min-h-screen pt-24 pb-24 relative overflow-hidden">
      {/* Background styling elements */}
      <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-black/40 to-transparent z-0"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-sm md:text-base text-gold tracking-[0.2em] uppercase mb-4 font-semibold">
            Our Collection
          </h2>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-cream mb-6">
            Product <span className="text-gradient-gold">Gallery</span>
          </h1>
          <div className="w-24 h-1 bg-gradient-gold mx-auto mb-8"></div>
        </motion.div>

        {/* Filters */}
        <div className="flex justify-center mb-12 space-x-4 md:space-x-8">
          {['all', 'images', 'videos'].map((tab) => (
            <button
              key={tab}
              onClick={() => handleTabChange(tab)}
              className={`px-6 py-2 rounded-full uppercase tracking-wider text-sm font-medium transition-all duration-300 ${
                activeTab === tab 
                  ? 'bg-gold text-charcoal shadow-[0_0_15px_rgba(201,168,76,0.4)]' 
                  : 'text-cream/70 hover:text-gold border border-white/10 hover:border-gold/50'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="show"
          key={activeTab + visibleCount} // re-trigger animation on tab or page change
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mb-12"
        >
          {displayedMedia.map((media) => (
            <motion.div 
              variants={itemVariants}
              key={media.id}
              className="relative group rounded-xl overflow-hidden glass-panel aspect-square cursor-pointer bg-white/5"
              onClick={() => setSelectedMedia(media)}
            >
              <div className="w-full h-full relative">
                <img 
                  src={media.type === 'video' ? getVideoThumbnail(media.link) : getOptimizedImageUrl(media.link, 500)} 
                  alt={media.type === 'video' ? 'Sunplus Cera product video thumbnail' : 'Sunplus Cera ceramic tile product'}
                  width="500"
                  height="500"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500 pointer-events-none"></div>
                
                {/* Play icon overlay for videos */}
                {media.type === 'video' && (
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <div className="bg-black/50 p-4 rounded-full backdrop-blur-sm group-hover:bg-gold/80 group-hover:scale-110 transition-all duration-300">
                      <svg className="w-8 h-8 text-gold group-hover:text-charcoal transition-colors duration-300 ml-1" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M4 4l12 6-12 6z" />
                      </svg>
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Load More Button */}
        {visibleCount < filteredMedia.length && (
          <div className="flex justify-center mt-8">
            <button
              onClick={() => setVisibleCount(prev => prev + 12)}
              className="px-8 py-3 bg-transparent border border-gold text-gold hover:bg-gold hover:text-charcoal transition-colors duration-300 rounded-full font-medium tracking-wide"
            >
              Load More
            </button>
          </div>
        )}
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedMedia && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-xl p-4 md:p-12"
            onClick={() => setSelectedMedia(null)}
          >
            <button 
              className="absolute top-6 right-6 text-white/70 hover:text-gold transition-colors z-[110]"
              onClick={() => setSelectedMedia(null)}
            >
              <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative max-w-5xl w-full max-h-full flex items-center justify-center"
              onClick={e => e.stopPropagation()} // Prevent modal close on content click
            >
              {selectedMedia.type === 'video' ? (
                selectedMedia.link.includes('drive.google.com') ? (
                  <iframe 
                    src={getEmbedUrl(selectedMedia.link)}
                    className="w-full aspect-video max-w-5xl rounded-lg shadow-2xl bg-black"
                    allow="autoplay; fullscreen"
                    frameBorder="0"
                    title="Google Drive Video Player"
                  ></iframe>
                ) : (
                  <video 
                    src={selectedMedia.direct_link || selectedMedia.link}
                    controls 
                    autoPlay 
                    playsInline
                    preload="auto"
                    className="w-full h-auto max-w-5xl max-h-[85vh] rounded-lg shadow-2xl bg-black/50" 
                  />
                )
              ) : (
                <img 
                  src={getOptimizedImageUrl(selectedMedia.link, 1200)} 
                  alt="Sunplus Cera product full size view" 
                  width="1200"
                  height="1200"
                  className="max-w-full max-h-[85vh] object-contain rounded-lg shadow-2xl"
                />
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Gallery;
