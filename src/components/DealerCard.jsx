import React from 'react';

const DealerCard = React.memo(({ dealer }) => {
  if (!dealer) return null;

  const address = `${dealer.address || ''} ${dealer.city || ''} ${dealer.state || ''} ${dealer.pincode || ''}`.trim();
  const mapQuery = encodeURIComponent(address || dealer.name || 'Sunplus Cera Dealer');

  return (
    <div className="bg-white border-l-4 border-gold shadow-md hover:shadow-xl transition-shadow duration-300 rounded-r-lg p-5 flex flex-col h-full">
      <h3 className="text-xl font-bold text-charcoal mb-2">{dealer.name || 'Authorized Dealer'}</h3>
      
      <div className="text-gray-600 text-sm mb-4 flex-grow space-y-1">
        {dealer.address && <p>{dealer.address}</p>}
        <p>
          {dealer.city && <span>{dealer.city}, </span>}
          {dealer.state && <span>{dealer.state} </span>}
          {dealer.pincode && <span>- {dealer.pincode}</span>}
        </p>
        {dealer.distance && (
          <p className="text-bronze font-medium mt-2">
            Distance: {parseFloat(dealer.distance).toFixed(2)} km away
          </p>
        )}
      </div>

      <div className="flex flex-col sm:flex-row gap-3 mt-auto pt-4 border-t border-gray-100">
        {dealer.phone && (
          <a
            href={`tel:${dealer.phone}`}
            className="flex-1 bg-gold hover:bg-bronze text-white text-center py-2 px-4 rounded transition-colors font-medium text-sm flex items-center justify-center"
          >
            <span className="mr-2"><svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 inline-block" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg></span> Call Now
          </a>
        )}
        <a
          href={`https://www.google.com/maps/search/?api=1&query=${mapQuery}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 bg-charcoal hover:bg-black text-white text-center py-2 px-4 rounded transition-colors font-medium text-sm flex items-center justify-center"
        >
          <span className="mr-2"><svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 inline-block" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="3 6 9 3 15 6 21 3 21 18 15 21 9 18 3 21"></polygon><line x1="9" y1="3" x2="9" y2="18"></line><line x1="15" y1="6" x2="15" y2="21"></line></svg></span> Get Directions
        </a>
      </div>
    </div>
  );
});

export default DealerCard;
