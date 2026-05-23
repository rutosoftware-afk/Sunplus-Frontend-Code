import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import ScrollAnimWrapper from '../components/ScrollAnimWrapper';

const About = () => {
  const timelineRef = useRef(null);
  const isInView = useInView(timelineRef, { once: true, margin: "-100px" });

  const milestones = [
    { year: "1998", title: "Foundation", desc: "Established in Morbi, Gujarat with a vision to revolutionize the ceramic industry." },
    { year: "2012", title: "Expansion", desc: "Launched our first exclusive range of Steps & Riser tiles." },
    { year: "2016", title: "Global Reach", desc: "Started exporting to over 20 countries, establishing a global footprint." },
    { year: "2020", title: "Innovation", desc: "Introduced premium Quartz Sinks." },
    { year: "2023", title: "Milestone", desc: "Crossed 50+ export countries and 10,000+ satisfied customers worldwide." }
  ];

  return (
    <div className="w-full bg-cream min-h-screen">
      {/* Hero */}
      <section className="pt-32 pb-20 bg-charcoal text-center px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 to-transparent"></div>
        <motion.h1
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-6xl font-bold text-white relative z-10 mb-6"
        >
          Our Story
        </motion.h1>
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="w-24 h-1 bg-gold mx-auto rounded relative z-10"
        ></motion.div>
      </section>

      {/* Company Story */}
      <section className="py-20 px-6">
        <div className="container mx-auto max-w-4xl text-center">
          <ScrollAnimWrapper>
            <p className="text-lg md:text-xl text-gray-700 leading-relaxed mb-8">
              <strong className="text-charcoal font-bold">Sunplus Cera LLP</strong>, located in the ceramic hub of Morbi, Gujarat, is a premium manufacturer of high-end ceramic products. We specialize in crafting exquisite <span className="text-gold font-medium">step risers, quartz sinks, golden & silver border tiles</span>, and scenery tiles.
            </p>
            <p className="text-lg md:text-xl text-gray-700 leading-relaxed">
              With over 15 years of excellence, our commitment to quality and innovation has made us a trusted name not just in India, but exported to <span className="font-bold text-charcoal">50+ countries worldwide</span>. "Crafting Spaces. Defining Elegance." is not just our tagline; it is the ethos that drives every tile we bake.
            </p>
          </ScrollAnimWrapper>
        </div>
      </section>

      {/* Values Grid */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <ScrollAnimWrapper>
            <h2 className="text-3xl md:text-4xl font-bold text-center text-charcoal mb-16">Our Core Values</h2>
          </ScrollAnimWrapper>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            {['Quality', 'Innovation', 'Sustainability', 'Customer First'].map((val, i) => (
              <ScrollAnimWrapper key={i} className="flex justify-center">
                <div className="hexagon-clip bg-gold w-48 h-56 flex items-center justify-center shadow-xl hover:bg-bronze transition-colors duration-300">
                  <span className="text-white font-bold text-xl tracking-wider uppercase text-center px-4">{val}</span>
                </div>
              </ScrollAnimWrapper>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-24 bg-charcoal text-cream overflow-hidden">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Our Journey</h2>
            <div className="w-16 h-1 bg-gold mx-auto rounded"></div>
          </div>

          <div className="relative max-w-4xl mx-auto" ref={timelineRef}>
            <div className={`absolute left-[20px] md:left-1/2 top-0 bottom-0 w-0.5 bg-white/10 ${isInView ? 'timeline-line' : ''}`}></div>

            <div className="space-y-12">
              {milestones.map((item, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.6, delay: idx * 0.1 }}
                  className={`relative flex items-center ${idx % 2 === 0 ? 'md:flex-row-reverse' : ''}`}
                >
                  <div className="hidden md:block w-1/2"></div>
                  <div className="absolute left-[20px] md:left-1/2 w-4 h-4 rounded-full bg-gold transform -translate-x-1/2 z-10 border-4 border-charcoal"></div>
                  <div className={`pl-12 md:pl-0 w-full md:w-1/2 ${idx % 2 === 0 ? 'md:pr-12 md:text-right' : 'md:pl-12'}`}>
                    <div className="bg-white/5 border border-white/10 p-6 rounded-lg backdrop-blur-sm hover:border-gold/50 transition-colors">
                      <span className="text-gold font-bold text-2xl block mb-2">{item.year}</span>
                      <h3 className="text-xl font-semibold text-white mb-2">{item.title}</h3>
                      <p className="text-cream/70 text-sm leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Manufacturing */}
      <section className="py-20 bg-cream">
        <div className="container mx-auto px-6 text-center max-w-3xl">
          <ScrollAnimWrapper>
            <h2 className="text-3xl font-bold text-charcoal mb-8">State of the Art Manufacturing</h2>
            <p className="text-gray-600 mb-8 leading-relaxed">
              Our massive facility in Morbi is equipped with the latest European machinery, ensuring zero-defect production. We possess a daily production capacity that enables us to fulfill bulk international and domestic orders with precision and speed.
            </p>
            <div className="inline-block p-4 border-2 border-gold text-gold font-bold uppercase tracking-widest rounded">
              100% Quality Assured
            </div>
          </ScrollAnimWrapper>
        </div>
      </section>
    </div>
  );
};

export default About;
