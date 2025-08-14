import React from 'react';

const PrivacyPolicy = () => {
  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">Privacy Policy</h1>

      <p className="mb-4">
        At BOOKTOWN, your privacy is very important to us. This Privacy Policy explains how we collect, use, and protect your personal information when you use our website.
      </p>

      <h2 className="text-2xl font-semibold mt-6 mb-2">1. Information We Collect</h2>
      <ul className="list-disc pl-6 mb-4">
        <li>Personal details (name, email, address, phone number) when creating an account or placing an order</li>
        <li>Payment information (handled securely by third-party services)</li>
        {/* <li>Browsing and usage data (pages visited, time spent, etc.)</li> */}
      </ul>

      <h2 className="text-2xl font-semibold mt-6 mb-2">2. How We Use Your Information</h2>
      <ul className="list-disc pl-6 mb-4">
        <li>To process and deliver your book orders</li>
        <li>To provide customer support</li>
        <li>To improve our website and user experience</li>
        <li>To send updates or promotional emails (you can unsubscribe anytime)</li>
      </ul>

      <h2 className="text-2xl font-semibold mt-6 mb-2">3. Sharing Your Information</h2>
      <p className="mb-4">
        We do not sell your personal data. We may share it with trusted third parties (like payment gateways and delivery services) only to complete your orders or improve our service.
      </p>

      <h2 className="text-2xl font-semibold mt-6 mb-2">4. Data Security</h2>
      <p className="mb-4">
        We use modern security tools and encryption to protect your information. However, no online service is completely secure, so please use strong passwords and keep them safe.
      </p>

      <h2 className="text-2xl font-semibold mt-6 mb-2">5. Your Rights</h2>
      <p className="mb-4">
        You can request to view, edit, or delete your personal data at any time. Contact us through the support page for assistance.
      </p>

      <h2 className="text-2xl font-semibold mt-6 mb-2">6. Changes to This Policy</h2>
      <p className="mb-4">
        We may update this Privacy Policy from time to time. Changes will be posted here with a new "last updated" date.
      </p>

      <p className="text-sm text-gray-500 mt-8">Last updated: July 9, 2025</p>
    </div>
  );
};

export default PrivacyPolicy;
