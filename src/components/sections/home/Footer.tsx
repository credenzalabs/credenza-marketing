import { LOGO_BLACK } from "@/lib/constants";

// ─── Footer ──────────────────────────────────────────────────────────────────────
export function Footer() {
  const prefix = window.location.pathname.startsWith("/preview") ? "/preview" : "";
  return (
    <footer className="border-t border-sage bg-white">
      <div className="container py-16">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-12">
          <div className="col-span-2">
            <img src={LOGO_BLACK} alt="Credenza" className="h-8 w-auto mb-4" />
            <p
              className="text-charcoal-soft max-w-[240px]"
              style={{ fontFamily: "Inter, sans-serif", fontSize: "0.82rem", lineHeight: 1.7 }}
            >
              The design trade's operating system.
            </p>
          </div>
          {[
            { heading: "Product", links: [{ label: "For Designers", href: `${prefix}/for-designers` }, { label: "For Vendors", href: `${prefix}/` }] },
            { heading: "Company", links: [{ label: "Blog", href: "/blog" }] },
            { heading: "Contact", links: [{ label: "info@usecredenza.com", href: "mailto:info@usecredenza.com" }] },
          ].map((col) => (
            <div key={col.heading}>
              <h4
                className="uppercase font-semibold text-charcoal-mid mb-4"
                style={{ fontFamily: "Inter, sans-serif", fontSize: "0.65rem", letterSpacing: "0.12em" }}
              >
                {col.heading}
              </h4>
              <div className="flex flex-col gap-2.5">
                {col.links.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    className="no-underline transition-colors duration-150 text-charcoal-soft hover:text-charcoal"
                    style={{ fontFamily: "Inter, sans-serif", fontSize: "0.85rem" }}
                  >
                    {link.label}
                  </a>
                ))}
              </div>
            </div>
          ))}
        </div>
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 pt-8 border-t border-sage">
          <p
            className="text-charcoal-soft"
            style={{ fontFamily: "Inter, sans-serif", fontSize: "0.75rem" }}
          >
            © 2026 Credenza Labs, Inc. All rights reserved.
          </p>
          <div className="flex gap-6">
            <button
              type="button"
              onClick={() => (document.getElementById('privacy-modal') as HTMLDialogElement)?.showModal()}
              className="no-underline cursor-pointer bg-transparent border-none p-0 text-charcoal-soft hover:text-charcoal"
              style={{ fontFamily: "Inter, sans-serif", fontSize: "0.75rem" }}
            >
              Privacy
            </button>
            <button
              type="button"
              onClick={() => (document.getElementById('terms-modal') as HTMLDialogElement)?.showModal()}
              className="no-underline cursor-pointer bg-transparent border-none p-0 text-charcoal-soft hover:text-charcoal"
              style={{ fontFamily: "Inter, sans-serif", fontSize: "0.75rem" }}
            >
              Terms
            </button>
          </div>

          {/* Privacy Policy Modal */}
          <dialog
            id="privacy-modal"
            className="backdrop:bg-black/40 p-0 max-w-2xl w-full max-h-[80vh] overflow-y-auto border border-sage-dark bg-white"
            onClick={(e) => { if (e.target === e.currentTarget) (e.target as HTMLDialogElement).close(); }}
          >
            <div className="p-10">
              <div className="flex items-center justify-between mb-8">
                <h2
                  className="font-freight text-charcoal"
                  style={{ fontSize: "1.5rem", letterSpacing: "-0.02em" }}
                >
                  Privacy Policy
                </h2>
                <button
                  type="button"
                  onClick={() => document.getElementById('privacy-modal')?.closest('dialog')?.close()}
                  className="bg-transparent border-none cursor-pointer text-lg text-charcoal-soft"
                >
                  ✕
                </button>
              </div>
              <div
                className="text-charcoal-mid"
                style={{ fontFamily: "Inter, sans-serif", fontSize: "0.85rem", lineHeight: 1.8 }}
              >
                <p className="text-charcoal-soft mb-6">Effective Date: November 8, 2025 · Last Updated: November 8, 2025</p>
                <p className="mb-4">Welcome to Credenza ("Credenza," "we," "our," or "us"). This Privacy Policy explains how we collect, use, and protect information when you visit usecredenza.com or use our related services (collectively, the "Platform").</p>

                <h3 className="font-freight mt-6 mb-3 text-charcoal" style={{ fontSize: "1.05rem" }}>1. Information We Collect</h3>
                <p className="mb-2">We may collect:</p>
                <ul className="mb-4 pl-5 list-disc">
                  <li className="mb-2">Account and contact information you provide—such as your name, company name, email address, and phone number—when you request a demo, create an account, or contact us.</li>
                  <li className="mb-2">Business and compliance information you upload or enter into the Platform, including resale certificates, tax IDs, or professional credentials.</li>
                  <li className="mb-2">Usage data automatically gathered through cookies, analytics tools, and log files (for example: IP address, browser type, and pages visited).</li>
                </ul>

                <h3 className="font-freight mt-6 mb-3 text-charcoal" style={{ fontSize: "1.05rem" }}>2. How We Use Information</h3>
                <p className="mb-2">We use your information to:</p>
                <ul className="mb-4 pl-5 list-disc">
                  <li className="mb-2">Provide, operate, and improve the Credenza Platform.</li>
                  <li className="mb-2">Verify business and professional information you submit.</li>
                  <li className="mb-2">Communicate with you about your account, compliance requirements, and product updates.</li>
                  <li className="mb-2">Analyze Platform performance and user engagement.</li>
                  <li className="mb-2">Comply with applicable laws and protect our rights.</li>
                </ul>

                <h3 className="font-freight mt-6 mb-3 text-charcoal" style={{ fontSize: "1.05rem" }}>3. Cookies and Analytics</h3>
                <p className="mb-4">We use cookies and similar technologies to recognize your browser, analyze traffic, and enhance your experience. You can adjust cookie settings in your browser, but some parts of the Platform may not function properly without them.</p>

                <h3 className="font-freight mt-6 mb-3 text-charcoal" style={{ fontSize: "1.05rem" }}>4. Sharing of Information</h3>
                <p className="mb-2">We do not sell or rent personal data. We may share information only with:</p>
                <ul className="mb-4 pl-5 list-disc">
                  <li className="mb-2">Service providers who help us host, process, or analyze data under confidentiality agreements.</li>
                  <li className="mb-2">Vendors or partners you choose to connect with through the Platform, to facilitate trade-program verification.</li>
                  <li className="mb-2">Legal authorities if required to comply with law or protect against misuse of the Platform.</li>
                </ul>

                <h3 className="font-freight mt-6 mb-3 text-charcoal" style={{ fontSize: "1.05rem" }}>5. Data Retention</h3>
                <p className="mb-4">We retain information as long as your account is active or as needed to provide our services, comply with legal obligations, or resolve disputes. You may request deletion of your data by contacting us.</p>

                <h3 className="font-freight mt-6 mb-3 text-charcoal" style={{ fontSize: "1.05rem" }}>6. Security</h3>
                <p className="mb-4">We employ reasonable technical and administrative safeguards to protect your data. However, no online system is completely secure, and we cannot guarantee absolute protection.</p>

                <h3 className="font-freight mt-6 mb-3 text-charcoal" style={{ fontSize: "1.05rem" }}>7. Your Rights</h3>
                <p className="mb-4">You may request access, correction, or deletion of your personal data by contacting us. Depending on your location, you may also have additional rights under local privacy laws.</p>

                <h3 className="font-freight mt-6 mb-3 text-charcoal" style={{ fontSize: "1.05rem" }}>8. Updates to This Policy</h3>
                <p className="mb-4">We may revise this Privacy Policy periodically. The most current version will always be posted on this page with the updated date.</p>

                <h3 className="font-freight mt-6 mb-3 text-charcoal" style={{ fontSize: "1.05rem" }}>9. Contact Us</h3>
                <p>If you have questions about this Privacy Policy or our data practices, please contact:</p>
                <p className="mt-2">Credenza<br />Email: <a href="mailto:info@usecredenza.com" className="text-teal-mid">info@usecredenza.com</a><br />Website: usecredenza.com</p>
              </div>
            </div>
          </dialog>

          {/* Terms of Use Modal */}
          <dialog
            id="terms-modal"
            className="backdrop:bg-black/40 p-0 max-w-2xl w-full max-h-[80vh] overflow-y-auto border border-sage-dark bg-white"
            onClick={(e) => { if (e.target === e.currentTarget) (e.target as HTMLDialogElement).close(); }}
          >
            <div className="p-10">
              <div className="flex items-center justify-between mb-8">
                <h2
                  className="font-freight text-charcoal"
                  style={{ fontSize: "1.5rem", letterSpacing: "-0.02em" }}
                >
                  Terms of Use
                </h2>
                <button
                  type="button"
                  onClick={() => document.getElementById('terms-modal')?.closest('dialog')?.close()}
                  className="bg-transparent border-none cursor-pointer text-lg text-charcoal-soft"
                >
                  ✕
                </button>
              </div>
              <div
                className="text-charcoal-mid"
                style={{ fontFamily: "Inter, sans-serif", fontSize: "0.85rem", lineHeight: 1.8 }}
              >
                <p className="text-charcoal-soft mb-6">Effective Date: November 8, 2025 · Last Updated: November 8, 2025</p>
                <p className="mb-4">Welcome to Credenza ("Credenza," "we," "our," or "us"). These Terms of Use ("Terms") govern your access to and use of usecredenza.com and any related services or applications (collectively, the "Platform").</p>
                <p className="mb-4">By accessing or using the Platform, you agree to these Terms. If you do not agree, please do not use Credenza.</p>

                <h3 className="font-freight mt-6 mb-3 text-charcoal" style={{ fontSize: "1.05rem" }}>1. Overview</h3>
                <p className="mb-4">Credenza provides identity verification and trade-program management services for the design industry. The Platform is currently in development, and functionality may change without notice.</p>

                <h3 className="font-freight mt-6 mb-3 text-charcoal" style={{ fontSize: "1.05rem" }}>2. Eligibility</h3>
                <p className="mb-4">You must be at least 18 years old and capable of entering into a binding contract to use the Platform. By using Credenza, you represent that you meet these requirements.</p>

                <h3 className="font-freight mt-6 mb-3 text-charcoal" style={{ fontSize: "1.05rem" }}>3. User Accounts</h3>
                <p className="mb-4">If you create an account, you are responsible for maintaining its confidentiality and for all activities under your account. Notify us immediately of any unauthorized use.</p>

                <h3 className="font-freight mt-6 mb-3 text-charcoal" style={{ fontSize: "1.05rem" }}>4. Acceptable Use</h3>
                <p className="mb-2">You agree not to:</p>
                <ul className="mb-4 pl-5 list-disc">
                  <li className="mb-2">Use the Platform for any unlawful purpose or in violation of these Terms.</li>
                  <li className="mb-2">Impersonate any person or entity, or falsely claim an affiliation.</li>
                  <li className="mb-2">Interfere with or disrupt the Platform's operation or servers.</li>
                  <li className="mb-2">Attempt to gain unauthorized access to any part of the Platform.</li>
                </ul>

                <h3 className="font-freight mt-6 mb-3 text-charcoal" style={{ fontSize: "1.05rem" }}>5. Intellectual Property</h3>
                <p className="mb-4">All content, trademarks, and data on the Platform—including text, graphics, logos, and software—are owned by Credenza or our licensors. You may not copy, modify, distribute, or create derivative works without our prior written consent.</p>

                <h3 className="font-freight mt-6 mb-3 text-charcoal" style={{ fontSize: "1.05rem" }}>6. User Content</h3>
                <p className="mb-4">By submitting information (e.g., documents, certificates, or profile details) to the Platform, you grant Credenza a non-exclusive, worldwide, royalty-free license to use, store, and display that content solely to provide and improve our services.</p>

                <h3 className="font-freight mt-6 mb-3 text-charcoal" style={{ fontSize: "1.05rem" }}>7. Disclaimers</h3>
                <p className="mb-4">The Platform is provided "as is" and "as available." We make no warranties, express or implied, regarding its operation, accuracy, or availability. We do not guarantee that the Platform will be error-free or uninterrupted.</p>

                <h3 className="font-freight mt-6 mb-3 text-charcoal" style={{ fontSize: "1.05rem" }}>8. Limitation of Liability</h3>
                <p className="mb-4">To the fullest extent permitted by law, Credenza and its affiliates, officers, employees, and agents shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising from your use of the Platform.</p>

                <h3 className="font-freight mt-6 mb-3 text-charcoal" style={{ fontSize: "1.05rem" }}>9. Termination</h3>
                <p className="mb-4">We reserve the right to suspend or terminate your access to the Platform at any time, with or without cause or notice, if we believe you have violated these Terms or engaged in conduct harmful to Credenza or other users.</p>

                <h3 className="font-freight mt-6 mb-3 text-charcoal" style={{ fontSize: "1.05rem" }}>10. Governing Law and Disputes</h3>
                <p className="mb-4">These Terms are governed by the laws of the State of Delaware, without regard to conflict-of-law principles. Any disputes shall be resolved in the state or federal courts located in Delaware.</p>

                <h3 className="font-freight mt-6 mb-3 text-charcoal" style={{ fontSize: "1.05rem" }}>11. Changes to These Terms</h3>
                <p className="mb-4">We may update these Terms from time to time. Continued use of the Platform after changes are posted constitutes your acceptance of the revised Terms.</p>

                <h3 className="font-freight mt-6 mb-3 text-charcoal" style={{ fontSize: "1.05rem" }}>12. Contact Information</h3>
                <p>For questions or concerns about these Terms, please contact us at:</p>
                <p className="mt-2">Credenza<br />Email: <a href="mailto:info@usecredenza.com" className="text-teal-mid">info@usecredenza.com</a><br />Website: usecredenza.com</p>
              </div>
            </div>
          </dialog>
        </div>
      </div>
    </footer>
  );
}
