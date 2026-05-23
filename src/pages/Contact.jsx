import React, { useState } from 'react';
import { motion } from 'framer-motion';
import DealerCard from '../components/DealerCard';
import ScrollAnimWrapper from '../components/ScrollAnimWrapper';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone_number: '',
    city: '',
    pincode: '',
    state: 'Gujarat',
    requirement: ''
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  const [dealers, setDealers] = useState([]);

  const indianStates = [
    "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh",
    "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand", "Karnataka",
    "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur", "Meghalaya", "Mizoram",
    "Nagaland", "Odisha", "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu",
    "Telangana", "Tripura", "Uttar Pradesh", "Uttarakhand", "West Bengal"
  ];

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.phone_number || !formData.city || !formData.pincode) {
      setError("Please fill all required fields.");
      return;
    }
    if (formData.phone_number.length !== 10) {
      setError("Phone number must be exactly 10 digits.");
      return;
    }

    setLoading(true);
    setError('');
    setSuccess(false);

    try {
      const baseUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';
      const response = await fetch(`${baseUrl}/api/dealers/nearby-with-details`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (response.ok) {
        setSuccess(true);
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
        if (results.length > 0) {
          setTimeout(() => {
            const el = document.getElementById('dealers-results');
            if (el) {
              const y = el.getBoundingClientRect().top + window.scrollY - 100;
              window.scrollTo({ top: y, behavior: 'smooth' });
            }
          }, 150);
        }
      } else {
        throw new Error(data.message || 'Failed to fetch dealers');
      }
    } catch (err) {
      setError(err.message + " | Call us directly: +91 99132 22344");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full bg-cream min-h-screen pt-24 pb-12">
      <div className="container mx-auto px-6">

        <div className="text-center mb-12">
          <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-4xl font-bold text-charcoal mb-4"
          >
            Get In Touch
          </motion.h1>
          <p className="text-gray-600">Connect with us or find a dealer in your area.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 max-w-6xl mx-auto">
          {/* Form */}
          <div className="lg:col-span-2 bg-white rounded-xl shadow-lg p-8 border-t-4 border-gold">
            <h2 className="text-2xl font-semibold mb-6 text-charcoal">Send an Inquiry</h2>

            {success && (
              <div className="bg-green-50 text-green-800 p-4 rounded mb-6 border border-green-200">
                Inquiry submitted successfully! Check nearest dealers below.
              </div>
            )}

            {error && (
              <div className="bg-red-50 text-red-800 p-4 rounded mb-6 border border-red-200">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="floating-label-input">
                  <input type="text" name="name" id="name" placeholder=" " value={formData.name} onChange={handleChange} required />
                  <label htmlFor="name">Full Name *</label>
                </div>

                <div className="floating-label-input">
                  <input type="tel" name="phone_number" id="phone_number" placeholder=" " value={formData.phone_number} onChange={handleChange} required maxLength="10" />
                  <label htmlFor="phone_number">Phone Number *</label>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="floating-label-input">
                  <input type="text" name="city" id="city" placeholder=" " value={formData.city} onChange={handleChange} required />
                  <label htmlFor="city">City *</label>
                </div>

                <div className="floating-label-input">
                  <input type="text" name="pincode" id="pincode" placeholder=" " value={formData.pincode} onChange={handleChange} required />
                  <label htmlFor="pincode">Pincode *</label>
                </div>

                <div className="floating-label-input relative">
                  <select name="state" id="state" value={formData.state} onChange={handleChange} required>
                    {indianStates.map(st => <option key={st} value={st}>{st}</option>)}
                  </select>
                  <label htmlFor="state" className="!top-[-16px] !text-xs !text-gold bg-white px-1">State *</label>
                </div>
              </div>

              <div className="floating-label-input">
                <textarea name="requirement" id="requirement" rows="3" placeholder=" " value={formData.requirement} onChange={handleChange}></textarea>
                <label htmlFor="requirement">Your Requirement (Optional)</label>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-charcoal hover:bg-black text-white font-bold py-4 rounded shadow transition-colors flex justify-center items-center"
              >
                {loading ? (
                  <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                ) : "Submit & Find Dealers"}
              </button>
            </form>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            <div className="bg-charcoal text-cream rounded-xl shadow-lg p-8">
              <h3 className="text-xl font-bold mb-6 text-gold">Contact Info</h3>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <span className="text-gold mr-3"><svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 inline-block" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg></span>
                  <p>Survey No. 595 P2/P1/P1,<br />Opp Virat Nagar, At. Rangpar,<br />Jetpar Road, Morbi (363642),<br />Gujarat, India</p>
                </li>
                <li className="flex items-center">
                  <span className="text-gold mr-3"><svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 inline-block" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg></span>
                  <div>
                    <a href="tel:+919825314172" className="block hover:text-gold transition-colors">+91 98253 14172</a>
                    <a href="tel:+91825314126" className="block hover:text-gold transition-colors">+91 98253 14126</a>
                  </div>
                </li>
                <li className="flex items-center">
                  <span className="text-gold mr-3"><svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 inline-block" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg></span>
                  <a href="mailto:sunpluscera@gmail.com" className="hover:text-gold transition-colors">sunpluscera@gmail.com</a>
                </li>
              </ul>
            </div>
            <div className="rounded-xl overflow-hidden shadow-lg h-64 bg-gray-200">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3671.234!2d70.8905807!3d22.9334222!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39598bb7017a054d%3A0x19e8aded9733237c!2sSUNPLUS%20CERA%20LLP!5e0!3m2!1sen!2sin!4v1715970103759!5m2!1sen!2sin"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Sunplus Cera Location"
              ></iframe>
            </div>
          </div>
        </div>

        {/* Results Section */}
        {dealers.length > 0 && (
          <div id="dealers-results">
            <ScrollAnimWrapper className="mt-16">
              <h3 className="text-2xl font-bold text-charcoal mb-8 border-b pb-2 inline-block">Dealers Near You</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {dealers.map((dealer, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: idx * 0.1 }}
                  >
                    <DealerCard dealer={dealer} />
                  </motion.div>
                ))}
              </div>
            </ScrollAnimWrapper>
          </div>
        )}
      </div>
    </div>
  );
};

export default Contact;
