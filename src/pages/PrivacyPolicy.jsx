import React from 'react';

const PrivacyPolicy = () => {
  return (
    <div className="bg-cream min-h-screen pt-32 pb-16">
      <div className="container mx-auto px-6 max-w-4xl">
        <h1 className="text-4xl md:text-5xl font-bold text-charcoal mb-8 text-center">Privacy Policy</h1>
        
        <div className="bg-white p-8 md:p-12 rounded-2xl shadow-sm text-slate-700 space-y-8">
          <section>
            <p className="leading-relaxed">
              Welcome to the official website of Sunplus Cera LLP. Your privacy is important to us. This Privacy Policy explains how we collect, use, and protect your personal information when you visit our website.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-charcoal mb-4">Information We Collect</h2>
            <p className="mb-4">When you visit our website, we may collect the following types of information:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong className="text-slate-800">Personal Information:</strong> Such as your name, email address, phone number, or other details that you provide voluntarily through forms (e.g., contact forms or inquiry forms).</li>
              <li><strong className="text-slate-800">Non-Personal Information:</strong> Includes your IP address, browser type, device information, and website usage data, collected through cookies or similar technologies.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-charcoal mb-4">How We Use Your Information</h2>
            <p className="mb-4">We use the information collected for the following purposes:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>To respond to inquiries or provide information about our products and services.</li>
              <li>To improve our website’s functionality and user experience.</li>
              <li>To send promotional emails or updates about our latest products, offers, or events (only if you opt-in).</li>
              <li>For internal analytics and research.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-charcoal mb-4">Cookies</h2>
            <p className="mb-4">
              Our website uses cookies to enhance your browsing experience. Cookies are small text files stored on your device. They help us understand user behavior and improve our website. By using our website, you agree to the use of cookies.
            </p>
            <p>
              You can manage or disable cookies through your browser settings, but doing so may affect the functionality of our website.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-charcoal mb-4">Sharing Your Information</h2>
            <p className="mb-4">We do not sell, rent, or trade your personal information to third parties. However, we may share your information with:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong className="text-slate-800">Service Providers:</strong> Trusted partners who assist us in operating our website or providing services (e.g., hosting, analytics).</li>
              <li><strong className="text-slate-800">Legal Authorities:</strong> If required by law or to protect our legal rights.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-charcoal mb-4">Data Security</h2>
            <p>
              We are committed to protecting your personal information. Our website employs appropriate technical and organizational measures to safeguard your data from unauthorized access, alteration, or disclosure.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-charcoal mb-4">Third-Party Links</h2>
            <p>
              Our website may contain links to third-party websites. We are not responsible for the privacy practices of these external sites. We encourage you to review their privacy policies.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-charcoal mb-4">Your Rights</h2>
            <p className="mb-4">Depending on your location, you may have the following rights regarding your personal data:</p>
            <ul className="list-disc pl-6 space-y-2 mb-4">
              <li>Access to your personal information.</li>
              <li>Correction of inaccurate or incomplete data.</li>
              <li>Deletion of your data upon request (subject to legal and contractual obligations).</li>
              <li>Opting out of receiving promotional communications.</li>
            </ul>
            <p>
              To exercise these rights, please contact us at <a href="mailto:sunpluscerallp@gmail.com" className="text-gold hover:underline font-medium">sunpluscerallp@gmail.com</a>.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-charcoal mb-4">Updates to This Policy</h2>
            <p>
              We may update this Privacy Policy periodically. Changes will be posted on this page with the updated effective date. We encourage you to review this policy regularly.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-charcoal mb-4">Contact Us</h2>
            <p className="mb-4">If you have any questions or concerns about this Privacy Policy or our data practices, please contact us:</p>
            <div className="bg-cream/50 p-6 rounded-lg border border-gold/20">
              <h3 className="font-bold text-slate-800 text-lg mb-2">Sunplus Cera LLP</h3>
              <p className="text-slate-600">
                Survey No 595 P2/P1/P1,<br />
                Village: Rangpar, Opp. ViratNagar,<br />
                Morbi, Gujarat, India.
              </p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
