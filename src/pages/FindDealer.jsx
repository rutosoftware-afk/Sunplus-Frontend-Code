import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import useGeolocation from '../hooks/useGeolocation';
import DealerCard from '../components/DealerCard';
import ScrollAnimWrapper from '../components/ScrollAnimWrapper';

const FindDealer = () => {
  const { coords, error: geoError, loading: geoLoading, requestLocation } = useGeolocation();

  const [locationStatus, setLocationStatus] = useState('idle'); // idle, requesting, granted, denied, loading, done, error
  const [dealers, setDealers] = useState([]);
  const [showManualForm, setShowManualForm] = useState(false);
  const [apiError, setApiError] = useState('');

  const [formData, setFormData] = useState({
    name: '',
    phone_number: '',
    city: '',
    pincode: '',
    state: 'Gujarat',
    requirement: ''
  });

  const indianStates = [
    "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh",
    "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand", "Karnataka",
    "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur", "Meghalaya", "Mizoram",
    "Nagaland", "Odisha", "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu",
    "Telangana", "Tripura", "Uttar Pradesh", "Uttarakhand", "West Bengal"
  ];

  // Effect to handle geolocation result
  useEffect(() => {
    if (geoLoading) {
      setLocationStatus('requesting');
    } else if (geoError) {
      setLocationStatus('denied');
      setShowManualForm(true);
    } else if (coords) {
      setLocationStatus('granted');
      fetchDealersByCoords(coords);
    }
  }, [coords, geoError, geoLoading]);

  const fetchDealersByCoords = async (coordinates) => {
    setLocationStatus('loading');
    setApiError('');
    try {
      const baseUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';
      const response = await fetch(`${baseUrl}/api/dealers/nearby-by-coordinates`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ latitude: coordinates.latitude, longitude: coordinates.longitude })
      });
      const data = await response.json();
      if (response.ok) {
        let results = [];
        if (data.data && Array.isArray(data.data)) results = data.data;
        else if (Array.isArray(data)) results = data;
        else if (data.accountName || data.name) {
          results = [{
            name: data.accountName || data.name,
            address: [data.address1, data.address2, data.address3].filter(Boolean).join(", ") || data.address,
            city: data.city,
            state: data.state,
            pincode: data.pin || data.pincode,
            phone: data.contact1 || data.contact2 || data.phone,
            distance: data.distance
          }];
        }
        setDealers(results);
        setLocationStatus('done');
      } else {
        throw new Error(data.message || 'Failed to fetch dealers');
      }
    } catch (err) {
      setApiError(err.message);
      setLocationStatus('error');
      setShowManualForm(true);
    }
  };

  const handleManualSubmit = async (e) => {
    e.preventDefault();
    setLocationStatus('loading');
    setApiError('');

    try {
      const baseUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';
      const response = await fetch(`${baseUrl}/api/dealers/nearby-with-details`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      const data = await response.json();
      if (response.ok) {
        let results = [];
        if (data.data && Array.isArray(data.data)) results = data.data;
        else if (Array.isArray(data)) results = data;
        else if (data.accountName || data.name) {
          results = [{
            name: data.accountName || data.name,
            address: [data.address1, data.address2, data.address3].filter(Boolean).join(", ") || data.address,
            city: data.city,
            state: data.state,
            pincode: data.pin || data.pincode,
            phone: data.contact1 || data.contact2 || data.phone,
            distance: data.distance
          }];
        }
        setDealers(results);
        setLocationStatus('done');
        console.log("Response.............", data);
      } else {
        throw new Error(data.message || 'Failed to fetch dealers');
      }
    } catch (err) {
      setApiError(err.message);
      setLocationStatus('error');
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="w-full bg-cream min-h-screen pt-24 pb-20">
      <div className="container mx-auto px-6 max-w-4xl">

        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-charcoal mb-4">Find a Dealer</h1>
          <p className="text-gray-600">Locate authorized Sunplus Cera distributors near you.</p>
        </div>

        <AnimatePresence mode="wait">
          {/* Step 1: Initial State */}
          {locationStatus === 'idle' && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="bg-white rounded-2xl shadow-xl p-10 text-center border border-gray-100"
            >
              <div className="relative w-24 h-24 mx-auto mb-8">
                <div className="absolute inset-0 bg-gold/20 rounded-full animate-pulse_ring"></div>
                <div className="absolute inset-2 bg-gold/40 rounded-full animate-pulse_ring" style={{ animationDelay: '0.5s' }}></div>
                <div className="absolute inset-0 flex items-center justify-center text-gold"><svg xmlns="http://www.w3.org/2000/svg" className="w-10 h-10 inline-block" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg></div>
              </div>

              <h2 className="text-2xl font-bold text-charcoal mb-6">Discover Nearby Dealers Instantly</h2>

              <button
                onClick={requestLocation}
                className="w-full sm:w-auto px-8 py-4 bg-charcoal hover:bg-black text-white font-bold rounded-lg shadow-lg hover-lift tracking-wide mb-6 flex items-center justify-center mx-auto"
              >
                <span className="mr-2"><svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 inline-block" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg></span> Use My Location
              </button>

              <div>
                <button
                  onClick={() => setShowManualForm(true)}
                  className="text-gold hover:text-bronze font-semibold text-sm underline-offset-4 hover:underline transition-all"
                >
                  Or enter address manually →
                </button>
              </div>
            </motion.div>
          )}

          {/* Loading Overlay */}
          {(locationStatus === 'requesting' || locationStatus === 'loading') && (
            <motion.div
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="bg-white rounded-2xl shadow-xl p-16 text-center border border-gray-100 flex flex-col items-center"
            >
              <div className="w-12 h-12 border-4 border-charcoal/20 border-t-gold rounded-full animate-spin mb-6"></div>
              <p className="text-lg font-medium text-charcoal animate-pulse">
                {locationStatus === 'requesting' ? "Requesting location access..." : "Finding dealers near you..."}
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Manual Form Area */}
        <AnimatePresence>
          {showManualForm && (locationStatus === 'idle' || locationStatus === 'denied' || locationStatus === 'error') && (
            <motion.div
              key="manual-form"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              className="bg-white rounded-xl shadow-lg p-8 border-t-4 border-charcoal mt-8 overflow-hidden"
            >
              <h3 className="text-xl font-bold mb-6 text-charcoal">Enter Details to Search</h3>
              {geoError && <p className="text-red-500 text-sm mb-4">Location access denied. Please use the form.</p>}
              {apiError && <p className="text-red-500 text-sm mb-4">{apiError}</p>}

              <form onSubmit={handleManualSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="floating-label-input">
                    <input type="text" name="name" id="fd_name" placeholder=" " value={formData.name} onChange={handleChange} required />
                    <label htmlFor="fd_name">Full Name *</label>
                  </div>
                  <div className="floating-label-input">
                    <input type="tel" name="phone_number" id="fd_phone" placeholder=" " value={formData.phone_number} onChange={handleChange} required maxLength="10" />
                    <label htmlFor="fd_phone">Phone Number *</label>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="floating-label-input">
                    <input type="text" name="city" id="fd_city" placeholder=" " value={formData.city} onChange={handleChange} required />
                    <label htmlFor="fd_city">City *</label>
                  </div>
                  <div className="floating-label-input">
                    <input type="text" name="pincode" id="fd_pincode" placeholder=" " value={formData.pincode} onChange={handleChange} required />
                    <label htmlFor="fd_pincode">Pincode *</label>
                  </div>
                  <div className="floating-label-input relative">
                    <select name="state" id="fd_state" value={formData.state} onChange={handleChange} required>
                      {indianStates.map(st => <option key={st} value={st}>{st}</option>)}
                    </select>
                    <label htmlFor="fd_state" className="!top-[-16px] !text-xs !text-gold bg-white px-1">State *</label>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full bg-gold hover:bg-bronze text-white font-bold py-3 rounded shadow transition-colors"
                >
                  Search Dealers
                </button>
              </form>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Results */}
        {locationStatus === 'done' && (
          <ScrollAnimWrapper className="mt-12">
            <div className="flex items-center justify-between mb-8 border-b border-gray-200 pb-4">
              <h2 className="text-2xl font-bold text-charcoal">Dealers Near You</h2>
              <span className="bg-charcoal text-white px-3 py-1 rounded-full text-sm font-bold">
                {dealers.length} Found
              </span>
            </div>

            {dealers.length > 0 ? (
              <motion.div
                className="grid grid-cols-1 md:grid-cols-2 gap-6"
                initial="hidden"
                animate="visible"
                variants={{
                  hidden: { opacity: 0 },
                  visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
                }}
              >
                {dealers.map((dealer, idx) => (
                  <motion.div
                    key={idx}
                    variants={{
                      hidden: { opacity: 0, y: 20 },
                      visible: { opacity: 1, y: 0 }
                    }}
                  >
                    <DealerCard dealer={dealer} />
                  </motion.div>
                ))}
              </motion.div>
            ) : (
              <div className="bg-white p-10 rounded-xl shadow text-center border border-gray-100">
                <div className="mb-4 flex justify-center text-gray-400"><svg xmlns="http://www.w3.org/2000/svg" className="w-12 h-12 inline-block" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><path d="M16 16s-1.5-2-4-2-4 2-4 2"></path><line x1="9" y1="9" x2="9.01" y2="9"></line><line x1="15" y1="9" x2="15.01" y2="9"></line></svg></div>
                <h3 className="text-xl font-bold text-charcoal mb-2">No dealers found nearby</h3>
                <p className="text-gray-600 mb-6">We couldn't find any authorized dealers in your immediate area.</p>
                <a
                  href="tel:+919913222344"
                  className="inline-flex items-center justify-center px-6 py-3 bg-gold text-white font-bold rounded-lg shadow-md hover:bg-bronze transition-colors"
                >
                  <span className="mr-2"><svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 inline-block" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg></span> Call Us Direct: +91 99132 22344
                </a>
              </div>
            )}

            <div className="mt-10 text-center">
              <button
                onClick={() => {
                  setLocationStatus('idle');
                  setShowManualForm(false);
                  setDealers([]);
                }}
                className="text-gray-500 hover:text-charcoal font-medium underline underline-offset-4"
              >
                Start New Search
              </button>
            </div>
          </ScrollAnimWrapper>
        )}

      </div>
    </div>
  );
};

export default FindDealer;
