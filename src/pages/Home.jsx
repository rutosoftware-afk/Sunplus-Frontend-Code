import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import ScrollAnimWrapper from '../components/ScrollAnimWrapper';

const useCountUp = (end, duration = 2000) => {
  const [count, setCount] = useState(0);
  const [hasStarted, setHasStarted] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasStarted) {
          setHasStarted(true);
        }
      },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => {
      if (ref.current) observer.unobserve(ref.current);
    };
  }, [hasStarted]);

  useEffect(() => {
    if (!hasStarted) return;
    let startTimestamp = null;
    const step = (timestamp) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      setCount(Math.floor(progress * end));
      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };
    window.requestAnimationFrame(step);
  }, [hasStarted, end, duration]);

  return [count, ref];
};

const StatItem = ({ end, label, suffix = "+" }) => {
  const [count, ref] = useCountUp(end);
  return (
    <div ref={ref} className="text-center p-4">
      <h3 className="text-4xl md:text-5xl font-bold text-white mb-2">
        {count}{suffix}
      </h3>
      <p className="text-charcoal font-semibold uppercase tracking-wider text-sm">{label}</p>
    </div>
  );
};

const Home = () => {
  const navigate = useNavigate();
  
  const [testimonialIndex, setTestimonialIndex] = useState(0);
  const testimonials = [
    { text: "The quality of their step risers completely transformed our staircase. Exceptional finish!", name: "Rahul S., Architect" },
    { text: "Their golden border tiles gave our hotel lobby the exact premium look we were aiming for.", name: "Priya M., Interior Designer" },
    { text: "Reliable export partner. The quartz sinks arrived in perfect condition to our Dubai warehouse.", name: "Ahmed K., Importer" }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setTestimonialIndex((prev) => (prev + 1) % testimonials.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [testimonials.length]);

  const scrollToCategories = () => {
    document.getElementById('categories')?.scrollIntoView({ behavior: 'smooth' });
  };

  const heroHeadline = "Steps & Riser Tiles".split(" ");

  return (
    <div className="w-full">
      {/* Section 1 — Hero */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-gradient-to-br from-cyan-50 via-white to-cyan-100/50">
        <div className="absolute inset-0 floating-grid opacity-10"></div>
        <div className="container mx-auto px-6 relative z-10 text-center">
          <div className="flex flex-wrap justify-center mb-6">
            {heroHeadline.map((word, i) => (
              <span
                key={i}
                className="text-5xl md:text-7xl lg:text-8xl font-bold text-slate-800 mr-4 mb-2 tracking-tight drop-shadow-sm"
              >
                {word}
              </span>
            ))}
          </div>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1, duration: 0.5 }}
            className="text-xl md:text-3xl text-slate-600 max-w-3xl mx-auto mb-10 tracking-wide font-light"
          >
            India's Trusted Brand for Premium Step Riser Tiles
          </motion.p>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.4 }}
            className="flex flex-col sm:flex-row gap-6 justify-center items-center"
          >
            <button onClick={scrollToCategories} className="px-8 py-4 bg-gradient-to-r from-[#0ed3d3] to-[#018e9c] hover:from-[#0ac5c5] hover:to-[#017782] text-white font-bold rounded shadow-lg shadow-teal-500/30 hover-lift tracking-wider uppercase text-sm transition-all duration-300">
              Explore Collection
            </button>
            <button onClick={() => navigate('/find-dealer')} className="px-8 py-4 bg-white hover:bg-gray-50 text-slate-700 font-bold rounded shadow-md hover:shadow-lg hover-lift tracking-wider uppercase text-sm transition-all duration-300">
              Find Nearest Dealer
            </button>
          </motion.div>
        </div>
      </section>

      {/* Section 2 — Stats Bar */}
      <section className="bg-gold py-12">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 divide-x divide-charcoal/20">
            <StatItem end={500} label="Designs" />
            <StatItem end={15} label="Years" />
            <StatItem end={50} label="Countries" />
            <StatItem end={10000} label="Customers" suffix="+" />
          </div>
        </div>
      </section>

      {/* Section 3 — Product Categories */}
      <section id="categories" className="py-24 bg-cream">
        <div className="container mx-auto px-6">
          <ScrollAnimWrapper>
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-bold text-charcoal mb-4">Our Premium Collections</h2>
              <div className="w-24 h-1 bg-gold mx-auto rounded"></div>
            </div>
          </ScrollAnimWrapper>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
            {[
              { title: "Step Risers", url: "https://sunpluscera.com/product-category/step-riser/", icon: <svg xmlns="http://www.w3.org/2000/svg" className="w-12 h-12 inline-block text-gold" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 2v20"/><path d="M20 2v20"/><path d="M4 6h16"/><path d="M4 12h16"/><path d="M4 18h16"/></svg>, count: "120+ Designs" },
              { title: "Border Tiles", url: "https://sunpluscera.com/product-category/golden-silver-border/", icon: <svg xmlns="http://www.w3.org/2000/svg" className="w-12 h-12 inline-block text-gold" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/></svg>, count: "80+ Designs" },
              { title: "Golden & Silver Tiles", url: "https://sunpluscera.com/product-category/golden-silver-tiles/", icon: <svg xmlns="http://www.w3.org/2000/svg" className="w-12 h-12 inline-block text-gold" viewBox="0 0 24 24" fill="currentColor"><circle cx="12" cy="12" r="10"/></svg>, count: "150+ Designs" },
              { title: "Quartz Sinks", url: "https://sunpluscera.com/product-category/quartz-sink/", icon: <svg xmlns="http://www.w3.org/2000/svg" className="w-12 h-12 inline-block text-gold" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m12 14-4-4a4 4 0 1 1 8 0l-4 4z"/><path d="M3 22v-8h18v8"/></svg>, count: "40+ Designs" },
              { title: "Poster Tiles", url: "https://sunpluscera.com/product-category/scenery-and-posters/", icon: <svg xmlns="http://www.w3.org/2000/svg" className="w-12 h-12 inline-block text-gold" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="18" x="3" y="3" rx="2" ry="2"/><circle cx="9" cy="9" r="2"/><path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"/></svg>, count: "200+ Designs" }
            ].map((cat, idx) => (
              <ScrollAnimWrapper key={idx} className="h-full">
                <a href={cat.url} target="_blank" rel="noopener noreferrer" className="block h-full outline-none">
                  <div className="bg-charcoal rounded-xl p-8 text-center h-full flex flex-col items-center justify-center border border-charcoal hover:border-gold shadow-lg hover:shadow-gold/30 hover:-translate-y-2 transition-all duration-300 group cursor-pointer">
                    <div className="text-5xl mb-6 group-hover:scale-110 transition-transform duration-300">{cat.icon}</div>
                    <h3 className="text-xl font-bold text-cream mb-2">{cat.title}</h3>
                    <p className="text-gold/80 text-sm font-medium">{cat.count}</p>
                  </div>
                </a>
              </ScrollAnimWrapper>
            ))}
          </div>
        </div>
      </section>

      {/* Section 4 — Why Choose Us */}
      <section className="py-24 bg-white relative">
        <div className="container mx-auto px-6">
          <ScrollAnimWrapper>
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-bold text-charcoal mb-4">Why Choose Sunplus</h2>
              <div className="w-24 h-1 bg-gold mx-auto rounded"></div>
            </div>
          </ScrollAnimWrapper>
          
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={{
              hidden: {},
              visible: { transition: { staggerChildren: 0.2 } }
            }}
            className="grid grid-cols-1 md:grid-cols-3 gap-12"
          >
            {[
              { title: "Quality Certified", icon: <svg xmlns="http://www.w3.org/2000/svg" className="w-10 h-10 inline-block text-gold" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"/><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"/><path d="M4 22h16"/><path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"/><path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"/><path d="M18 2H6v7a6 6 0 0 0 12 0V2Z"/></svg>, desc: "Rigorous quality checks ensuring international standards for every tile and sink." },
              { title: "Made in Morbi", icon: <svg xmlns="http://www.w3.org/2000/svg" className="w-10 h-10 inline-block text-gold" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 20a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8l-7 5V8l-7 5V4a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2Z"/><path d="M17 18h1"/><path d="M12 18h1"/><path d="M7 18h1"/></svg>, desc: "Proudly manufactured in the ceramic capital of India with state-of-the-art machinery." },
              { title: "Pan-India Network", icon: <svg xmlns="http://www.w3.org/2000/svg" className="w-10 h-10 inline-block text-gold" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/><path d="M2 12h20"/></svg>, desc: "A robust network of dealers to ensure timely delivery across all Indian states." }
            ].map((feature, idx) => (
              <motion.div 
                key={idx}
                variants={{
                  hidden: { opacity: 0, y: 30 },
                  visible: { opacity: 1, y: 0 }
                }}
                className="text-center"
              >
                <div className="w-20 h-20 mx-auto bg-cream rounded-full flex items-center justify-center text-4xl mb-6 shadow-inner border border-gray-100">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-charcoal mb-3">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Section 5 — Testimonials */}
      <section className="py-24 bg-charcoal text-cream relative overflow-hidden">
        <div className="absolute inset-0 opacity-5 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-gold via-charcoal to-charcoal"></div>
        <div className="container mx-auto px-6 relative z-10 text-center">
          <h2 className="text-3xl font-bold mb-16">What Our Clients Say</h2>
          <div className="max-w-3xl mx-auto h-40 flex items-center justify-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={testimonialIndex}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.05 }}
                transition={{ duration: 0.5 }}
                className="px-4"
              >
                <p className="text-xl md:text-2xl font-light italic mb-8 text-cream/90">
                  "{testimonials[testimonialIndex].text}"
                </p>
                <h4 className="text-gold font-bold tracking-wide uppercase text-sm">
                  - {testimonials[testimonialIndex].name}
                </h4>
              </motion.div>
            </AnimatePresence>
          </div>
          <div className="flex justify-center mt-8 space-x-2">
            {testimonials.map((_, idx) => (
              <button 
                key={idx}
                onClick={() => setTestimonialIndex(idx)}
                className={`w-3 h-3 rounded-full transition-colors ${idx === testimonialIndex ? 'bg-gold' : 'bg-white/20'}`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Section 6 — CTA Banner */}
      <section className="py-16 bg-gradient-gold text-white text-center">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold mb-8 drop-shadow-md">Ready to Transform Your Space?</h2>
          <button 
            onClick={() => navigate('/find-dealer')}
            className="px-10 py-4 bg-charcoal hover:bg-black text-white font-bold rounded shadow-xl hover-lift tracking-wider uppercase"
          >
            Find a Dealer
          </button>
        </div>
      </section>
    </div>
  );
};

// Simple AnimatePresence inline for testimonials
const AnimatePresence = ({ children, mode }) => {
    return <motion.div className="w-full">{children}</motion.div>;
};

export default Home;
