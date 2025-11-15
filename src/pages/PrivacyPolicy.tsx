import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto bg-black/50 backdrop-blur-sm rounded-2xl shadow-2xl border border-[#d4af37]/30 p-8">
        <Link 
          to="/" 
          className="inline-flex items-center gap-2 text-[#d4af37] hover:text-yellow-400 transition-colors mb-6"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Dashboard
        </Link>
        
        <h1 className="text-4xl font-bold bg-gradient-to-r from-[#d4af37] via-yellow-400 to-[#d4af37] bg-clip-text text-transparent mb-8">
          Privacy Policy
        </h1>
        
        <p className="text-sm text-gray-400 mb-8">
          Last updated: November 15, 2025
        </p>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-[#d4af37] mb-4">1. Introduction</h2>
          <p className="text-gray-300 leading-relaxed">
            Sanztech Automation Solution ("we," "our," or "us") is committed to protecting your privacy. 
            This Privacy Policy explains how we collect, use, disclose, and safeguard your information 
            when you use our automation platform and services.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-[#d4af37] mb-4">2. Information We Collect</h2>
          <p className="text-gray-300 leading-relaxed mb-4">
            We collect information that you provide directly to us, including:
          </p>
          <ul className="list-disc list-inside text-gray-300 space-y-2 ml-4">
            <li>Account information (name, email address, password)</li>
            <li>Profile information and preferences</li>
            <li>Workflow and automation data you create</li>
            <li>Communication data when you contact our support</li>
            <li>Usage data and analytics</li>
            <li>TikTok integration data when you connect your TikTok account</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-[#d4af37] mb-4">3. How We Use Your Information</h2>
          <p className="text-gray-300 leading-relaxed mb-4">
            We use the information we collect to:
          </p>
          <ul className="list-disc list-inside text-gray-300 space-y-2 ml-4">
            <li>Provide, maintain, and improve our services</li>
            <li>Process your transactions and send related information</li>
            <li>Send you technical notices and support messages</li>
            <li>Respond to your comments and questions</li>
            <li>Monitor and analyze trends, usage, and activities</li>
            <li>Detect, prevent, and address technical issues</li>
            <li>Facilitate TikTok automation features you enable</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-[#d4af37] mb-4">4. Information Sharing</h2>
          <p className="text-gray-300 leading-relaxed mb-4">
            We do not sell, trade, or rent your personal information to third parties. 
            We may share your information only in the following circumstances:
          </p>
          <ul className="list-disc list-inside text-gray-300 space-y-2 ml-4">
            <li>With your explicit consent</li>
            <li>With service providers who assist in our operations (under strict confidentiality)</li>
            <li>With TikTok when you authorize integration with your TikTok account</li>
            <li>To comply with legal obligations</li>
            <li>To protect our rights and prevent fraud</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-[#d4af37] mb-4">5. Data Security</h2>
          <p className="text-gray-300 leading-relaxed">
            We implement appropriate technical and organizational measures to protect your 
            personal information against unauthorized access, alteration, disclosure, or destruction. 
            This includes encryption, secure servers, and regular security audits.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-[#d4af37] mb-4">6. Your Rights</h2>
          <p className="text-gray-300 leading-relaxed mb-4">
            Under applicable data protection laws (including GDPR and PDPA), you have the right to:
          </p>
          <ul className="list-disc list-inside text-gray-300 space-y-2 ml-4">
            <li>Access your personal information</li>
            <li>Correct inaccurate data</li>
            <li>Request deletion of your data</li>
            <li>Object to processing of your data</li>
            <li>Export your data (data portability)</li>
            <li>Withdraw consent at any time</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-[#d4af37] mb-4">7. Third-Party Services</h2>
          <p className="text-gray-300 leading-relaxed">
            Our service integrates with third-party services including TikTok, email providers, 
            CRM systems, and other automation tools. We are not responsible for the privacy 
            practices of these third parties. We encourage you to review their privacy policies. 
            When you connect third-party services, you authorize us to access data as permitted by those services.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-[#d4af37] mb-4">8. Data Retention</h2>
          <p className="text-gray-300 leading-relaxed">
            We retain your information for as long as necessary to provide our services, 
            comply with legal obligations, resolve disputes, and enforce our agreements. 
            You may request deletion of your account and data at any time through your account settings 
            or by contacting us.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-[#d4af37] mb-4">9. Children's Privacy</h2>
          <p className="text-gray-300 leading-relaxed">
            Our service is not intended for users under 18 years of age. We do not 
            knowingly collect information from children under 18. If you become aware that 
            a child has provided us with personal information, please contact us immediately.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-[#d4af37] mb-4">10. International Data Transfers</h2>
          <p className="text-gray-300 leading-relaxed">
            Your information may be transferred to and processed in countries other than Malaysia. 
            We ensure appropriate safeguards are in place to protect your data in accordance with 
            this Privacy Policy and applicable laws.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-[#d4af37] mb-4">11. Cookies and Tracking</h2>
          <p className="text-gray-300 leading-relaxed">
            We use cookies and similar tracking technologies to improve your experience, 
            analyze usage patterns, and provide personalized content. You can control cookie 
            preferences through your browser settings.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-[#d4af37] mb-4">12. Changes to This Policy</h2>
          <p className="text-gray-300 leading-relaxed">
            We may update this Privacy Policy from time to time. We will notify you of 
            any material changes by posting the new policy on this page and updating the 
            "Last updated" date. Your continued use of the service after changes constitutes acceptance.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-[#d4af37] mb-4">13. Contact Us</h2>
          <p className="text-gray-300 leading-relaxed mb-4">
            If you have questions about this Privacy Policy or wish to exercise your rights, please contact us:
          </p>
          <div className="mt-4 p-6 bg-gradient-to-br from-[#d4af37]/10 to-yellow-600/5 rounded-xl border border-[#d4af37]/30">
            <p className="text-gray-300 space-y-2">
              <strong className="text-[#d4af37]">Contact Person:</strong> Adam Sanz<br />
              <strong className="text-[#d4af37]">Email:</strong> <a href="mailto:sanztechsolution@gmail.com" className="hover:text-[#d4af37] transition-colors">sanztechsolution@gmail.com</a><br />
              <strong className="text-[#d4af37]">Phone:</strong> <a href="tel:+60116396924" className="hover:text-[#d4af37] transition-colors">011-6396 9241</a><br />
              <strong className="text-[#d4af37]">Website:</strong> <a href="https://www.sanztech.online" target="_blank" rel="noopener noreferrer" className="hover:text-[#d4af37] transition-colors">sanztech.online</a><br />
              <strong className="text-[#d4af37]">TikTok:</strong> <a href="https://www.tiktok.com/@adamsanzziy" target="_blank" rel="noopener noreferrer" className="hover:text-[#d4af37] transition-colors">@adamsanzziy</a><br />
              <strong className="text-[#d4af37]">Address:</strong> Keramat Wangsa, Kuala Lumpur, Malaysia
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}
