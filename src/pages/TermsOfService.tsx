import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

export default function TermsOfService() {
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
          Terms of Service
        </h1>
        
        <p className="text-sm text-gray-400 mb-8">
          Last updated: November 15, 2025
        </p>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-[#d4af37] mb-4">1. Acceptance of Terms</h2>
          <p className="text-gray-300 leading-relaxed">
            By accessing and using Sanztech Automation Solution ("Service"), you accept and agree 
            to be bound by these Terms of Service. If you do not agree to these terms, 
            please do not use our Service. Your continued use constitutes acceptance of any updates to these terms.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-[#d4af37] mb-4">2. Description of Service</h2>
          <p className="text-gray-300 leading-relaxed">
            Sanztech provides workflow automation and integration services that enable users 
            to connect various applications (including TikTok), automate tasks, streamline business processes, 
            and manage digital workflows. The Service includes access to our platform, APIs, workflow builders, 
            AI agents, and related tools.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-[#d4af37] mb-4">3. User Accounts</h2>
          <p className="text-gray-300 leading-relaxed mb-4">
            To use our Service, you must:
          </p>
          <ul className="list-disc list-inside text-gray-300 space-y-2 ml-4">
            <li>Be at least 18 years old or have parental/guardian consent</li>
            <li>Provide accurate, current, and complete registration information</li>
            <li>Maintain the security of your account credentials</li>
            <li>Accept full responsibility for all activities under your account</li>
            <li>Notify us immediately of any unauthorized access or security breach</li>
            <li>Comply with all applicable laws and regulations in your jurisdiction</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-[#d4af37] mb-4">4. Acceptable Use</h2>
          <p className="text-gray-300 leading-relaxed mb-4">
            You agree NOT to:
          </p>
          <ul className="list-disc list-inside text-gray-300 space-y-2 ml-4">
            <li>Violate any laws, regulations, or third-party rights</li>
            <li>Infringe on intellectual property rights</li>
            <li>Transmit malware, viruses, or harmful code</li>
            <li>Attempt to gain unauthorized access to our systems or other users' accounts</li>
            <li>Interfere with other users' access to the Service</li>
            <li>Use the Service for spam, unsolicited communications, or phishing</li>
            <li>Scrape, harvest, or collect data without explicit permission</li>
            <li>Reverse engineer, decompile, or disassemble our platform</li>
            <li>Resell or redistribute the Service without authorization</li>
            <li>Use the Service to violate TikTok's or any third-party platform's terms of service</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-[#d4af37] mb-4">5. Intellectual Property</h2>
          <p className="text-gray-300 leading-relaxed">
            All content, features, functionality, designs, logos, and technology of the Service 
            are owned by Sanztech and are protected by international copyright, trademark, patent, 
            and other intellectual property laws. You retain ownership of content you create using 
            our Service, but grant us a license to host, store, and process it as necessary to provide the Service.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-[#d4af37] mb-4">6. Third-Party Integrations</h2>
          <p className="text-gray-300 leading-relaxed">
            Our Service integrates with third-party platforms including TikTok, email services, 
            CRM systems, databases, and other automation tools. Your use of these integrations 
            is subject to their respective terms of service and privacy policies. We are not 
            responsible for third-party services, their availability, functionality, or policies. 
            You are responsible for compliance with all third-party terms when using integrations.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-[#d4af37] mb-4">7. Fees and Payment</h2>
          <p className="text-gray-300 leading-relaxed">
            Certain features may require payment of fees. You agree to pay all applicable fees 
            as described at the time of purchase. Fees are non-refundable except as required by law 
            or as explicitly stated in our refund policy. We reserve the right to change pricing 
            with 30 days' advance notice to existing subscribers. Failure to pay may result in 
            suspension or termination of your account.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-[#d4af37] mb-4">8. Service Availability</h2>
          <p className="text-gray-300 leading-relaxed">
            While we strive for 99.9% uptime, we do not guarantee uninterrupted or error-free service. 
            The Service may be temporarily unavailable due to maintenance, updates, or circumstances 
            beyond our control. We are not liable for any losses resulting from service interruptions.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-[#d4af37] mb-4">9. Termination</h2>
          <p className="text-gray-300 leading-relaxed">
            We may suspend or terminate your access to the Service immediately, without prior notice, 
            for violation of these terms, fraudulent activity, non-payment, or for any other reason 
            at our sole discretion. You may terminate your account at any time through account settings. 
            Upon termination, your right to use the Service ceases immediately, and we may delete your 
            data after a reasonable retention period.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-[#d4af37] mb-4">10. Disclaimers and Warranties</h2>
          <p className="text-gray-300 leading-relaxed">
            THE SERVICE IS PROVIDED "AS IS" AND "AS AVAILABLE" WITHOUT WARRANTIES OF ANY KIND, 
            EITHER EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO IMPLIED WARRANTIES OF 
            MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, OR NON-INFRINGEMENT. We do not 
            warrant that the Service will be uninterrupted, secure, or error-free. We are not 
            liable for any data loss, corruption, or damages resulting from your use of the Service.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-[#d4af37] mb-4">11. Limitation of Liability</h2>
          <p className="text-gray-300 leading-relaxed">
            TO THE MAXIMUM EXTENT PERMITTED BY LAW, SANZTECH SHALL NOT BE LIABLE FOR ANY INDIRECT, 
            INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, INCLUDING BUT NOT LIMITED TO 
            LOSS OF PROFITS, DATA, USE, OR GOODWILL, ARISING FROM YOUR USE OF THE SERVICE, EVEN IF 
            ADVISED OF THE POSSIBILITY OF SUCH DAMAGES. OUR TOTAL LIABILITY SHALL NOT EXCEED THE 
            AMOUNT YOU PAID US IN THE 12 MONTHS PRECEDING THE CLAIM.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-[#d4af37] mb-4">12. Indemnification</h2>
          <p className="text-gray-300 leading-relaxed">
            You agree to indemnify, defend, and hold harmless Sanztech, its affiliates, officers, 
            directors, employees, and agents from any claims, damages, losses, liabilities, and 
            expenses (including legal fees) arising from your use of the Service, violation of 
            these terms, or infringement of any third-party rights.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-[#d4af37] mb-4">13. Changes to Terms</h2>
          <p className="text-gray-300 leading-relaxed">
            We reserve the right to modify these terms at any time. We will notify users of 
            material changes via email or through the Service. Changes become effective 30 days 
            after notification unless otherwise stated. Continued use after changes constitutes acceptance. 
            If you disagree with changes, you must stop using the Service.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-[#d4af37] mb-4">14. Governing Law and Disputes</h2>
          <p className="text-gray-300 leading-relaxed">
            These terms are governed by the laws of Malaysia, without regard to conflict of law principles. 
            Any disputes shall be resolved exclusively in the courts of Kuala Lumpur, Malaysia. 
            You agree to submit to the personal jurisdiction of these courts. For disputes under 
            RM50,000, parties agree to attempt mediation before litigation.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-[#d4af37] mb-4">15. Severability</h2>
          <p className="text-gray-300 leading-relaxed">
            If any provision of these terms is found to be invalid or unenforceable, the remaining 
            provisions shall remain in full force and effect. The invalid provision shall be modified 
            to the minimum extent necessary to make it valid and enforceable.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-[#d4af37] mb-4">16. Contact Information</h2>
          <p className="text-gray-300 leading-relaxed mb-4">
            For questions about these Terms or to report violations, contact us:
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
