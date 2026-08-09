export function PrivacyPolicyContent() {
  return (
    <div
      className="text-charcoal-mid"
      style={{ fontFamily: "Inter, sans-serif", fontSize: "0.9rem", lineHeight: 1.8 }}
    >
      <p className="text-charcoal-soft mb-6">Effective Date: November 8, 2025 · Last Updated: August 9, 2026</p>
      <p className="mb-4">Credenza Labs, Inc. ("Credenza," "we," "our," or "us") provides this Privacy Policy to explain how we collect, use, and protect information when you visit usecredenza.com or use our related services (collectively, the "Platform").</p>

      <h2 className="font-freight mt-8 mb-3 text-charcoal" style={{ fontSize: "1.15rem" }}>1. Information We Collect</h2>
      <p className="mb-2">We may collect:</p>
      <ul className="mb-4 pl-5 list-disc">
        <li className="mb-2">Account and contact information you provide—such as your name, company name, email address, and phone number—when you request a demo, create an account, or contact us.</li>
        <li className="mb-2">Business and compliance information you upload or enter into the Platform, including resale certificates, tax IDs, or professional credentials.</li>
        <li className="mb-2">Usage data automatically gathered through cookies, analytics tools, and log files (for example: IP address, browser type, and pages visited).</li>
      </ul>

      <h2 className="font-freight mt-8 mb-3 text-charcoal" style={{ fontSize: "1.15rem" }}>2. How We Use Information</h2>
      <p className="mb-2">We use your information to:</p>
      <ul className="mb-4 pl-5 list-disc">
        <li className="mb-2">Provide, operate, and improve the Credenza Platform.</li>
        <li className="mb-2">Verify business and professional information you submit.</li>
        <li className="mb-2">Communicate with you about your account, compliance requirements, and product updates.</li>
        <li className="mb-2">Analyze Platform performance and user engagement.</li>
        <li className="mb-2">Comply with applicable laws and protect our rights.</li>
      </ul>

      <h2 className="font-freight mt-8 mb-3 text-charcoal" style={{ fontSize: "1.15rem" }}>3. Cookies and Analytics</h2>
      <p className="mb-4">We use cookies and similar technologies to recognize your browser, analyze traffic, and enhance your experience. We do not share any cookie analytics with third parties. You can adjust cookie settings in your browser, but some parts of the Platform may not function properly without them.</p>

      <h2 className="font-freight mt-8 mb-3 text-charcoal" style={{ fontSize: "1.15rem" }}>4. Browser Extension</h2>
      <p className="mb-4">The Credenza browser extension lets signed-in designers save vendors to their firms' trade accounts while browsing. It is scoped to this single purpose. The extension does not collect browsing history, track you across unrelated sites, read content on non-vendor pages, or share any data with advertisers.</p>
      <p className="mb-2">When you use the extension, we access:</p>
      <ul className="mb-4 pl-5 list-disc">
        <li className="mb-2">The URL and domain of the page you are viewing, used only to match that page against your firm's existing trade accounts and Credenza's vendor directory.</li>
        <li className="mb-2">Your Credenza session, read from usecredenza.com, so the extension can authenticate on your behalf. Your session information is only transmitted back to Credenza's own servers.</li>
        <li className="mb-2">Limited local browser storage, used to remember your trade account list and preferences between sessions.</li>
      </ul>
      <p className="mb-4">When you add or enrich a vendor bookmark, the page's domain and publicly available vendor information may be sent to our AI service provider, Anthropic, to extract basic details such as the vendor's name and category. This uses the same provider and safeguards described elsewhere in this policy.</p>

      <h2 className="font-freight mt-8 mb-3 text-charcoal" style={{ fontSize: "1.15rem" }}>5. Shopify Integration</h2>
      <p className="mb-4">When a vendor installs the Credenza app on their Shopify store, Credenza accesses and processes data from that store solely to verify trade customers, automate tax-exempt onboarding, and maintain the audit chain linking tax-exempt orders to the resale certificates that justify them.</p>
      <p className="mb-2">We access:</p>
      <ul className="mb-4 pl-5 list-disc">
        <li className="mb-2">Customer personal data (name, email, phone, shipping address) to match Shopify customers to verified Credenza designer profiles.</li>
        <li className="mb-2">Customer tags and tax-exemption fields, which we write to mark verified trade buyers and to enable tax-exempt checkout in the appropriate jurisdictions.</li>
        <li className="mb-2">Order data (order number, line items, shipping address, tax status) used to link tax-exempt trade orders to the resale certificate that justifies the exemption.</li>
        <li className="mb-2">Company records (for Shopify B2B merchants), used to mirror verification status and tax-exemption metafields onto the company entity.</li>
        <li className="mb-2">Store configuration to detect Shopify Plus and B2B capabilities so the app behaves correctly for each store type.</li>
      </ul>
      <p className="mb-4">We send transactional emails related to verification, approvals, certificate management, and orders linked to verified accounts.</p>
      <p className="mb-4">We do not sell or rent Shopify customer data. We do not use Shopify customer data for advertising, profiling, or any purpose outside the verification and tax-compliance use cases described above.</p>
      <p className="mb-2">In compliance with Shopify's Protected Customer Data requirements, Credenza responds to the three mandatory data-protection webhooks:</p>
      <ul className="mb-4 pl-5 list-disc">
        <li className="mb-2"><span className="font-medium">customers/data_request</span>—When a customer asks the merchant for their data, we collect every record we hold for that customer and make it available to the merchant for fulfillment within 30 days.</li>
        <li className="mb-2"><span className="font-medium">customers/redact</span>—When a customer asks the merchant to delete their data, we anonymize the corresponding Credenza records (the audit trail of verification events is preserved with the customer identifier removed, as required for tax-compliance recordkeeping).</li>
        <li className="mb-2"><span className="font-medium">shop/redact</span>—48 hours after a merchant uninstalls the Credenza app, we erase all Shopify-sourced data for that store.</li>
      </ul>
      <p className="mb-4">All webhook deliveries are authenticated using Shopify's HMAC-SHA256 signature. The merchant remains the data controller for their Shopify customer data; Credenza acts as a data processor on the merchant's behalf.</p>

      <h2 className="font-freight mt-8 mb-3 text-charcoal" style={{ fontSize: "1.15rem" }}>6. QuickBooks Integration</h2>
      <p className="mb-4">If you connect QuickBooks Online, Credenza accesses your QuickBooks company through Intuit's API using credentials you authorize.</p>
      <p className="mb-4">We read: customer records (name, company name, contact name, email, phone, billing and shipping addresses, resale certificate number, active status); invoices (number, date, totals, tax amounts, customer reference, memo, and line items); item records (name, SKU, type); and your company name.</p>
      <p className="mb-4">We write only to customer records, and only these fields: the taxable flag, the tax exemption reason, the resale certificate number, and a clearly delimited Credenza block within Notes. Any other text in Notes is preserved. No other QuickBooks record is modified, and we never create invoices, payments, or journal entries.</p>
      <p className="mb-4">QuickBooks data is used to keep resale exemption status accurate on your customers and to report your trade revenue back to you. It is not shared with other vendors, with designers, or with any AI service.</p>
      <p className="mb-4">Access tokens are stored encrypted at rest and are readable only by our servers; they are never sent to a browser. Disconnecting QuickBooks deletes those credentials. Customer and order records already imported into your Credenza account remain until you delete them or ask us to.</p>

      <h2 className="font-freight mt-8 mb-3 text-charcoal" style={{ fontSize: "1.15rem" }}>7. Klaviyo Integration</h2>
      <p className="mb-4">If you connect Klaviyo, Credenza can sync your approved trade clients to a list in your Klaviyo account, and read back email engagement to show in your Credenza activity feed.</p>
      <p className="mb-4">We send: the trade member's email address, first name and last name. We do not send certificates, tax identifiers, or order data.</p>
      <p className="mb-4">Marketing consent is captured on the trade application. Where a member has not given it, Credenza never asserts consent to Klaviyo—they are synced as not subscribed, and it is your responsibility as the list owner to honor that status.</p>
      <p className="mb-4">The Klaviyo account is yours, not Credenza's, and data sent there is governed by Klaviyo's terms and your agreement with them. Credenza does not send marketing email on your behalf. A trade member who wishes to stop receiving a vendor's marketing can unsubscribe using the link in those emails or by contacting the vendor directly; Credenza cannot manage that subscription for them.</p>

      <h2 className="font-freight mt-8 mb-3 text-charcoal" style={{ fontSize: "1.15rem" }}>8. Sharing of Information</h2>
      <p className="mb-2">We do not sell or rent personal data. We may share information only with:</p>
      <ul className="mb-4 pl-5 list-disc">
        <li className="mb-2">Service providers who help us host, process, or analyze data under confidentiality agreements.</li>
        <li className="mb-2">Vendors or partners you choose to connect with through the Platform, to facilitate trade-program verification.</li>
        <li className="mb-2">Third-party systems a vendor has connected to their own Credenza account—their Shopify store, QuickBooks company, or Klaviyo account—limited to the data described in the integration sections above, and only for that vendor's own trade members.</li>
        <li className="mb-2">Legal authorities if required to comply with law or protect against misuse of the Platform.</li>
      </ul>
      <p className="mb-4">We use AI services from Anthropic and OpenAI to extract information from the documents you submit and to check public business information during verification. We do not use your data to train any AI model, and our agreements with these providers do not permit them to use it to train their models. Accounting data obtained from QuickBooks—customers, invoices, items, and revenue figures—is never sent to an AI service.</p>
      <p className="mb-4">A complete, current list of our sub-processors, including each one's purpose and processing location, is maintained in Annex III of our <a href="/dpa" className="text-teal-mid">Data Processing Addendum</a>.</p>

      <h2 className="font-freight mt-8 mb-3 text-charcoal" style={{ fontSize: "1.15rem" }}>9. Data Retention</h2>
      <p className="mb-2">We retain information as long as your account is active or as needed to provide our services, comply with legal obligations, or resolve disputes. You may request deletion of your data by contacting us. We may retain your data for certain permissible reasons, including:</p>
      <ul className="mb-4 pl-5 list-disc">
        <li className="mb-2">To complete a transaction or service requested by you.</li>
        <li className="mb-2">To detect security breaches.</li>
        <li className="mb-2">To repair errors or bugs.</li>
        <li className="mb-2">To comply with applicable laws or legal obligations.</li>
        <li className="mb-2">For internal, lawful use compatible with the context in which you provided the information.</li>
      </ul>

      <h2 className="font-freight mt-8 mb-3 text-charcoal" style={{ fontSize: "1.15rem" }}>10. Security and Data Location</h2>
      <p className="mb-4">Credenza data is stored in the United States, in Amazon Web Services' us-west-2 region.</p>
      <p className="mb-2">Our safeguards include:</p>
      <ul className="mb-4 pl-5 list-disc">
        <li className="mb-2">Encryption in transit (TLS) and encryption at rest for stored data, including uploaded certificates and documents.</li>
        <li className="mb-2">Row-level access scoping, so each vendor's records are readable only within that vendor's account and each designer sees only their own firm's data.</li>
        <li className="mb-2">Secrets and third-party access tokens—including Shopify, QuickBooks, and Klaviyo credentials—stored encrypted and readable only by our servers, never exposed to a browser.</li>
        <li className="mb-2">Authenticated, signature-verified webhooks for all inbound platform events.</li>
      </ul>
      <p className="mb-4">No online system is completely secure, and we cannot guarantee absolute protection.</p>

      <h2 className="font-freight mt-8 mb-3 text-charcoal" style={{ fontSize: "1.15rem" }}>11. Your Rights</h2>
      <p className="mb-4">You may request access, correction, or deletion of your personal data by contacting us. Depending on your location, you may also have additional rights under local privacy laws.</p>

      <h2 className="font-freight mt-8 mb-3 text-charcoal" style={{ fontSize: "1.15rem" }}>12. Updates to This Policy</h2>
      <p className="mb-4">We may revise this Privacy Policy periodically. The most current version will always be posted on this page with the updated date.</p>

      <h2 className="font-freight mt-8 mb-3 text-charcoal" style={{ fontSize: "1.15rem" }}>13. Contact Us</h2>
      <p>If you have questions about this Privacy Policy or our data practices, please contact:</p>
      <p className="mt-2">Credenza Labs, Inc.<br />Email: <a href="mailto:info@usecredenza.com" className="text-teal-mid">info@usecredenza.com</a><br />Website: usecredenza.com</p>
    </div>
  );
}
