import { useEffect, useState } from "react";
import { Plus } from "lucide-react";
import { Nav } from "@/components/ui/Nav";
import { Footer } from "@/components/sections/home/Footer";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { PhotoCredit } from "@/components/ui/PhotoCredit";
import { IMAGES } from "@/components/sections/home/images";
import { JOIN_VENDOR_URL } from "@/lib/constants";
import { withCredenzaUtm } from "@/utils/utm";

const PAGE_TITLE = "The Interior Designer's Guide to Resale Certificates";
const PAGE_DESCRIPTION =
  "Everything interior designers need to know about resale certificates: what they are, why vendors require them, state-by-state requirements, common mistakes, and how to manage them across multiple states.";
const PAGE_URL = "https://usecredenza.com/resources/interior-designer-resale-certificate-guide";
const DATE_PUBLISHED = "2026-05-01";
const DATE_MODIFIED = "2026-05-01";
const CTA_HREF = "https://usecredenza.com/for-designers";

const TOC = [
  { id: "what-is", label: "What is a resale certificate" },
  { id: "why-need", label: "Why designers need them" },
  { id: "how-to-get", label: "How to get a resale certificate" },
  { id: "state-by-state", label: "State-by-state requirements" },
  { id: "common-mistakes", label: "Common mistakes" },
  { id: "manage-vendors", label: "Managing across vendors" },
  { id: "audits", label: "Audits & certificate quality" },
  { id: "credenza", label: "How Credenza helps" },
  { id: "faq", label: "FAQ" },
  { id: "summary", label: "Summary" },
];

const HOWTO_STEPS = [
  {
    name: "Register for a sales tax permit in your home state",
    text: "Before you can generate a resale certificate, you need a state tax ID—a sales tax registration number issued by your home state's department of revenue. Registration is generally free or low-cost and can be done online through your state's department of revenue website.",
  },
  {
    name: "Identify which states you need certificates in",
    text: "A resale certificate is a state-level document. Which certificate you need—and whether you need one at all—depends on the destination state of the transaction: where goods are shipped to, or where you pick them up in person.",
  },
  {
    name: "Generate state-specific certificates for each vendor",
    text: "Some states have their own required forms; others accept multi-state certificates; a handful of states issue a certificate to you that you then upload directly. Form requirements often differ by vendor based on where the vendor has nexus.",
  },
];

const FAQ_ITEMS = [
  {
    q: "Do I need a separate resale certificate for each state?",
    a: "Generally, yes—each state has its own sales tax framework and its own certificate requirements. However, if both you and the vendor have nexus in states that accept the MTC Uniform Certificate or SST Certificate, a single multi-state form can cover multiple jurisdictions. Credenza determines the most efficient certificate strategy based on where you're registered, where goods are shipping, and the vendor's nexus states.",
  },
  {
    q: "How often do resale certificates expire?",
    a: "It varies significantly. Several states expect annual renewal; some are biennial or triennial; others have no expiration date and are valid until revoked, or only for as long as you continue purchasing from a specific vendor. Many vendors layer their own resubmission policies on top of state requirements. The only safe approach is to track renewal dates by vendor and state—or use a platform like Credenza that tracks them for you.",
  },
  {
    q: "Can I use a blanket certificate, or does it have to be vendor-specific?",
    a: "Most resale certificates can be issued as blanket certificates, covering all future purchases from a given vendor rather than a single transaction. Blanket is almost always preferable for ongoing vendor relationships. Vendors rarely require per-transaction certificates, though it does happen in specific circumstances.",
  },
  {
    q: "Do I need a resale certificate if I'm buying for myself or personal projects?",
    a: "No. If you're buying goods for personal use—not for resale to a client—the transaction isn't a resale transaction and isn't exempt. Using a resale certificate for personal purchases is tax fraud, with real penalties attached. This is also why vendors scrutinize applications carefully: they're looking for legitimate resellers, not buyers looking to save money.",
  },
  {
    q: "Is a resale certificate the same as tax-exempt status?",
    a: "Related, but not identical. Tax-exempt status typically refers to organizational exemptions—nonprofits, religious organizations, government entities—that are exempt from sales tax on purchases they make for their own use. A resale certificate is a transactional exemption: you're not exempt as an organization; you're exempt on these purchases because you're buying for resale. Designers use resale certificates, not tax-exempt status.",
  },
  {
    q: "What happens if my resale certificate expires while I'm actively buying?",
    a: "If you're purchasing under an expired certificate, the exemption technically isn't valid. The vendor may catch it during an audit and be assessed for the uncollected tax—or, under the good-faith rules, the state may pursue you directly. Some vendors catch expired certificates proactively and flag your account until you resubmit. Best practice: renew before expiration, not after.",
  },
  {
    q: "Can I use my federal EIN as my tax ID, or does it need to be a state ID?",
    a: "In nearly all cases, your state tax ID—a seller's permit number, certificate of authority number, or equivalent issued by the state's department of revenue—is what belongs on a resale certificate. Your federal EIN identifies your business entity to the IRS; it's a different number serving a different purpose. A handful of states do allow an EIN or other identifier as a fallback in specific circumstances, but as a general rule, you need a state registration number. If you haven't registered in a particular state, you need to do that before generating a valid certificate for it.",
  },
  {
    q: "What's the difference between a resale certificate and an exemption certificate?",
    a: "A resale certificate is one type of exemption certificate—specifically the one used when you're purchasing goods for resale. Other exemption certificates cover different exemption reasons: agricultural use, manufacturing, nonprofit status, and so on. For interior designers, \"resale certificate\" is almost always the correct term and the correct form.",
  },
  {
    q: "Do I need to monitor which states I have nexus in?",
    a: "Yes—and most designers underestimate this. Economic nexus rules mean that once you exceed a state's sales volume or transaction threshold, you may be required to register there even without a physical presence. If you're placing purchases for clients across multiple states, you could be crossing thresholds you're not tracking. A good CPA who works with design practices can help you stay ahead of this.",
  },
];

export default function ResaleCertificateGuide() {
  useEffect(() => {
    const prevTitle = document.title;
    const descMeta = document.querySelector('meta[name="description"]');
    const prevDesc = descMeta?.getAttribute("content");
    document.title = `${PAGE_TITLE} | Credenza`;
    descMeta?.setAttribute("content", PAGE_DESCRIPTION);

    const articleSchema = document.createElement("script");
    articleSchema.type = "application/ld+json";
    articleSchema.text = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "Article",
      headline: PAGE_TITLE,
      description: PAGE_DESCRIPTION,
      datePublished: DATE_PUBLISHED,
      dateModified: DATE_MODIFIED,
      author: {
        "@type": "Organization",
        name: "Credenza Labs, Inc.",
        url: "https://usecredenza.com/",
      },
      publisher: {
        "@type": "Organization",
        name: "Credenza Labs, Inc.",
        logo: {
          "@type": "ImageObject",
          url: "https://usecredenza.com/credenza-brandmark.png",
        },
      },
      mainEntityOfPage: PAGE_URL,
    });
    document.head.appendChild(articleSchema);

    const howToSchema = document.createElement("script");
    howToSchema.type = "application/ld+json";
    howToSchema.text = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "HowTo",
      name: "How to get a resale certificate",
      description:
        "The three-step process for obtaining valid resale certificates as an interior designer.",
      step: HOWTO_STEPS.map((s, i) => ({
        "@type": "HowToStep",
        position: i + 1,
        name: s.name,
        text: s.text,
      })),
    });
    document.head.appendChild(howToSchema);

    const faqSchema = document.createElement("script");
    faqSchema.type = "application/ld+json";
    faqSchema.text = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: FAQ_ITEMS.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a },
      })),
    });
    document.head.appendChild(faqSchema);

    return () => {
      document.title = prevTitle;
      if (prevDesc) descMeta?.setAttribute("content", prevDesc);
      document.head.removeChild(articleSchema);
      document.head.removeChild(howToSchema);
      document.head.removeChild(faqSchema);
    };
  }, []);

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#FFFFFF" }}>
      <Nav forceSolid ctaHref={JOIN_VENDOR_URL} />

      {/* Full-bleed hero image */}
      <section className="relative overflow-hidden" style={{ minHeight: "60vh", maxHeight: "75vh" }}>
        <img
          src={IMAGES.nickOlsonReidRolls}
          alt="Elegant interior by Nick Olsen"
          loading="eager"
          className="absolute inset-0 w-full h-full object-cover"
          style={{ objectPosition: "center 70%" }}
        />
        <div className="relative" style={{ minHeight: "60vh" }} />
        <PhotoCredit
          separator=""
          credits={[
            { text: "© " },
            { text: "Reid Rolls", href: withCredenzaUtm("https://reidrolls.com/", "photo-credit", "resources-resale-certificate-guide") },
            { text: " (design by " },
            { text: "Nick Olsen", href: withCredenzaUtm("https://nickolsenstyle.com/", "designer-credit", "resources-resale-certificate-guide") },
            { text: ")" },
          ]}
        />
      </section>

      <div
        className="container pt-16 md:pt-20 pb-24 max-w-6xl"
        style={{ fontFamily: "Inter, sans-serif" }}
      >
        <div className="lg:grid lg:grid-cols-[1fr_220px] lg:gap-16">
          <main className="max-w-3xl">
        <div className="mb-10">
          <Eyebrow>Guide</Eyebrow>
        </div>
        <h1
          className="font-freight text-charcoal mb-4"
          style={{ fontSize: "clamp(2.25rem, 4vw, 3rem)", letterSpacing: "-0.025em", lineHeight: 1.1 }}
        >
          {PAGE_TITLE}
        </h1>
        <p
          className="text-charcoal-soft mb-8"
          style={{ fontFamily: "Inter, sans-serif", fontSize: "0.85rem", letterSpacing: "0.02em" }}
        >
          Credenza Team · May 1, 2026
        </p>
        <p
          className="text-charcoal-mid italic mb-12"
          style={{ fontFamily: "Inter, sans-serif", fontSize: "1.05rem", lineHeight: 1.6 }}
        >
          You've spent years perfecting your sourcing. Your clients trust your eye. The last thing you should be losing sleep over is paperwork.
        </p>

        <Prose>
          <p>
            You know the feeling. You finally have the right project for a brand you've admired for years. You decide to open a trade account. After about 15 fields of the application form, you see a box to upload your resale certificate. And suddenly the whole thing grinds to a halt.
          </p>
          <p>
            Resale certificates are one of those mundane-but-consequential pieces of the trade infrastructure that nobody explains properly when you're starting out. You're supposed to already know. But most designers cobble together their understanding over years of awkward email exchanges with vendor reps and the occasional rejection from an accounts department that does, in fact, check these things.
          </p>
          <p>
            This guide covers everything: what a resale certificate actually is, why vendors care so much, how to get one, and how to stop drowning in state-specific forms every time you expand your sourcing geography.
          </p>
        </Prose>

        <H2 id="what-is">What is a resale certificate?</H2>
        <Prose>
          <p>
            A resale certificate—also called a resale exemption certificate, a reseller's permit, or a tax exemption certificate—is a document that allows you to purchase goods for resale without paying sales tax at the point of purchase.
          </p>
          <p>
            The logic is straightforward: sales tax is a tax on the final consumer. If you're buying a set of dining chairs to sell to a client, you're not the final consumer—your client is. The vendor shouldn't collect sales tax from you; your client's state will collect it when the transaction reaches them. The resale certificate is how you tell the vendor that officially.
          </p>
          <p>
            For interior designers, this plays out in a specific way. When you purchase goods on behalf of a client—furniture, fabric, lighting, accessories—you are, in the eyes of the tax code, reselling those goods. You buy them at trade net; your client pays you at retail or a marked-up net. That spread is your margin, and that purchase is a resale transaction. The certificate documents your status as a reseller and exempts the purchase from sales tax.
          </p>
          <p>
            Without it, you're paying sales tax at purchase <em>and</em> potentially passing it along to the client, which creates an accounting tangle. More importantly, without it, most to-the-trade vendors simply won't open an account for you.
          </p>
        </Prose>

        <H2 id="why-need">Why interior designers need resale certificates</H2>
        <Prose>
          <p>
            Trade pricing and tax exemption are not quite the same thing, but they travel together. Most vendors bundle them: to get trade pricing, you need to demonstrate that you're a legitimate design professional, and part of that demonstration is a valid resale certificate. It signals that you're actually buying goods for resale, not exploiting trade access for personal purchasing.
          </p>
          <p>
            Vendors also require resale certificates for a reason that has nothing to do with you personally: <strong>their own audit liability.</strong> When a vendor sells goods tax-exempt, they're relying on your certificate to justify that exemption. If you give them a bad certificate—expired, wrong state, wrong entity name—and they get audited, they can be assessed for the uncollected sales tax themselves. Plus penalties and interest.
          </p>
          <p>
            The exposure isn't only on the vendor's side. If your certificate is invalid or expired and a vendor gets audited, most states have a good faith rule that can shift the liability to you for the unpaid tax plus interest. Intentional misuse—using a resale certificate for personal purchases or anything you're not reselling to a client—carries its own penalties in most states. If a vendor pays tax on your behalf during an audit because your certificate was invalid, don't be surprised to receive an invoice. Vendors have every incentive to recover that cost from you—though many will absorb it rather than sour the relationship. Either way, the underlying logic is the same: a resale certificate doesn't eliminate the tax obligation, it defers it. If the deferral turns out to be invalid, someone has to pay.
          </p>
          <p>
            That's why the good vendors are exacting about this. When Kravet or Holly Hunt's accounts team kicks back your application for a missing certificate or a form-field discrepancy, it's not bureaucratic fussiness—it's their tax counsel's guidance. A clean, current, properly-completed certificate protects everyone.
          </p>
        </Prose>

        <H2 id="how-to-get">How to get a resale certificate</H2>
        <Prose>
          <p>
            The process has three steps. The annoying part is that step three multiplies based on how many states you work in.
          </p>
          <H3>Step 1: Register for a sales tax permit in your home state.</H3>
          <p>
            Before you can generate a resale certificate, you need a state tax ID—a sales tax registration number issued by your home state's department of revenue. In New York, this is your Certificate of Authority number. In California, it's your Seller's Permit number. The name varies by state; the concept is the same.
          </p>
          <p>
            Registration is generally free or low-cost and can be done online through your state's department of revenue website. You'll provide your legal business name, EIN, business address, and a description of what you sell. Once registered, you'll receive your state tax ID—this is the number that goes on your resale certificates.
          </p>
          <p>
            You'll also be registered to collect and remit sales tax on transactions where you owe it (when you sell goods to clients in taxable situations), which is a separate but related obligation. Most designers work with a CPA who handles the periodic filing. But the registration itself is the prerequisite.
          </p>
          <H3>Step 2: Identify which states you need certificates in.</H3>
          <p>
            A resale certificate is a state-level document. Which certificate you need—and whether you need one at all—depends on the destination state of the transaction: where goods are shipped to, or where you pick them up in person.
          </p>
          <p>
            Five states have no statewide sales tax: Alaska, Delaware, Montana, New Hampshire, and Oregon. In most cases no certificate is needed—though Alaska and Montana allow local municipalities to impose their own taxes, which may apply depending on the delivery location.
          </p>
          <p>For every other state, if you want tax exemption, you'll need a certificate when the vendor has nexus in that state, and either of the following is true:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>A vendor ships goods to that state on your behalf, or</li>
            <li>You pick up goods in that state</li>
          </ul>
          <p>
            In practice, if you're a New York–based designer with a workroom in New Jersey and projects in Connecticut and Florida, you'll likely need certificates for each of those states—in addition to New York—when purchasing from vendors with nexus in those states.
          </p>
          <H3>Step 3: Generate state-specific certificates for each vendor.</H3>
          <p>
            Here's where things get complicated, and where most designers operating across multiple states lose an afternoon every time they open a new vendor account.
          </p>
          <p>
            Some states have their own required forms—official state documents that must be completed for the exemption to be valid. Others accept multi-state certificates. A handful of states issue a certificate to you that you then upload directly (more on that below). And the form requirements often differ by vendor, depending on where the vendor has nexus.
          </p>
        </Prose>

        <H2 id="state-by-state">State-by-state requirements: what you actually need to know</H2>
        <Prose>
          <p>
            The patchwork nature of US sales tax law means there is no single universal certificate. Here's how the landscape breaks down:
          </p>
          <p>
            <strong>The NOMAD states</strong> (New Hampshire, Oregon, Montana, Alaska, and Delaware): No statewide sales tax, no certificate required. Enjoy.
          </p>
          <p>
            <strong>Multi-state certificate states:</strong> Many states accept the <strong>MTC Uniform Sales &amp; Use Tax Exemption Certificate</strong>, issued by the Multistate Tax Commission, as a valid blanket resale certificate across member states. The <strong>Streamlined Sales Tax (SST) Certificate</strong> is accepted in the 24 SST member states. If you and the vendor both have nexus in states that accept these forms, one certificate can cover several jurisdictions at once. This is a meaningful time-saver, and it's the approach Credenza uses as the first-line strategy for multi-state plans. The MTC certificate's acceptance isn't uniform, though: some states allow in-state buyers to use it when buying in other member states but won't accept it from out-of-state buyers. Others accept it from out-of-state buyers but not from buyers registered in-state. The right certificate still depends on where you're registered, where the vendor has nexus, and the state rules for both—complexity that makes it easy to get wrong.
          </p>
          <p>
            <strong>States requiring their own forms:</strong> Many states require their own state-specific form for the exemption to be valid. These are official documents with specific fields, usually including your state tax registration number, your legal entity name, a description of the property being purchased, and the basis for exemption. The forms vary in length and complexity. Some are a half-page; most require a fresh completion for every new vendor. Notably, some states allow out-of-state buyers to use their own state-specific form rather than the MTC or SST, even if you're not registered in the vendor's state—another layer of nuance that can trip up even experienced designers.
          </p>
          <p>
            <strong>States that issue the certificate to you:</strong> A subset of states—notably Alabama, Florida, Louisiana, New Mexico, Tennessee, and Washington—issue a certificate of exemption directly to you via their tax portal. You then upload that document to the vendor. This means you can't generate this type of certificate yourself; you retrieve it from the state and provide a copy. Mississippi doesn't have its own form—vendors require your Mississippi sales tax ID, along with your legal business name and address. New Mexico requires a per-vendor NTTC (Nontaxable Transaction Certificate) issued through the TAP portal, which is its own particular adventure.
          </p>
          <p>
            Knowing which type of certificate a given state requires—and whether a given vendor accepts multi-state forms—is where most of the complexity lives.
          </p>
        </Prose>

        <H2 id="common-mistakes">Common mistakes (and how to avoid them)</H2>
        <Prose>
          <p>The errors that get certificates rejected tend to cluster around a few predictable failure points.</p>
          <p>
            <strong>Using the wrong form.</strong> If a state requires its own official form, submitting an MTC or SST certificate in its place may not be accepted. Some vendors' compliance teams will catch this and return it; others will flag it during an audit months later.
          </p>
          <p>
            <strong>Expired or lapsed certificates.</strong> Renewal cadences are inconsistent: several states expect annual renewal, some biennial or triennial, and others have no set expiration—they're valid until revoked, or only for as long as you continue doing business with that vendor. On top of that, many vendors have their own internal refresh policies that require resubmission on their schedule, regardless of the state standard. A certificate that was valid when you opened your account may now be expired without any notification.
          </p>
          <p>
            <strong>Entity name mismatches.</strong> The legal business name on your certificate should match the name registered with your state tax authority and ideally the name on your trade account. If you operate as "Jane Smith Design LLC" but your certificate says "Smith Interiors," expect a follow-up from the vendor.
          </p>
          <p>
            <strong>Missing or invalid state tax IDs.</strong> A certificate without a valid, active state registration number isn't valid. If you're expanding your business to new states, keep an eye on your own economic nexus thresholds—many states require registration once you hit a certain volume of sales there, even without a physical presence—and register before you need to generate certificates.
          </p>
          <p>
            <strong>Incomplete product category designations.</strong> When you designate what you're purchasing for resale, be comprehensive. If you're primarily buying furniture today but might source lighting or textiles from this vendor in the future, make sure your certificate covers all the product categories you might need. Going back to update a certificate later is avoidable friction.
          </p>
        </Prose>

        <InlineHook label="Credenza picks the right state form and pre-fills it correctly, every time" />

        <H2 id="manage-vendors">How to manage resale certificates across vendors</H2>
        <Prose>
          <p>
            The management problem compounds quickly. Even a lean practice sourcing from 20–30 vendors across just three states can be juggling dozens of certificate-state-vendor combinations—each with its own form requirements, submission history, and renewal date.
          </p>
          <p>
            <strong>Per-vendor vs. blanket certificates:</strong> Where a state allows blanket certificates, always use them. They cover all future purchases from that vendor in that state. Per-transaction certificates are rarely required and create significant unnecessary overhead.
          </p>
          <p>
            <strong>Tracking expirations:</strong> You may not be directly liable if your certificate lapses—but discovering a missed certificate at the moment you're about to place a purchase for a project deadline is not optimal timing. The only reliable way to stay ahead of it is a system. Renewal cadences vary by state: some annual, some biennial, some valid until revoked, with vendors layering their own policies on top. If you're managing this manually, a spreadsheet with vendor name, state, certificate date, and next renewal date is the minimum viable system.
          </p>
          <p>
            <strong>Monitor your business's nexus.</strong> If you're working across state lines—clients in multiple states, workrooms out of state, pickups at showrooms—keep track of where you may be crossing nexus thresholds. Once you hit a state's economic nexus threshold, you'll need to register there, and then you'll need to generate valid certificates for that state. This is an area where designers may underestimate scope until they're already behind.
          </p>
        </Prose>

        <InlineHook label="Skip the spreadsheet — Credenza tracks expirations and pre-fills renewals automatically" />

        <H2 id="audits">What happens during a vendor's audit—and why your cert quality matters</H2>
        <Prose>
          <p>
            This is worth understanding clearly, because it reframes why this paperwork matters—and clarifies that the risk isn't only on the vendor's side.
          </p>
          <p>
            When a state audits a vendor's sales tax records, the auditor reviews tax-exempt transactions—often a sample, which can expand if issues are found. For each one, the vendor must produce a valid exemption certificate. If they can't—or if the certificate has a deficiency—the liability can land in several different places.
          </p>
          <p>
            <strong>The vendor carries primary risk with a valid-but-disputed cert.</strong> Most states have a good faith rule: if a vendor accepts a certificate that is properly completed and seems reasonable on its face, the vendor is often relieved of liability even if the auditor later decides the transaction shouldn't have been exempt. If the auditor decides the transaction shouldn't have been tax-exempt but the vendor acted in good faith, the vendor is typically relieved of penalties—though they may still owe the tax, and will likely look to recover it from you.
          </p>
          <p>
            <strong>Misuse falls entirely on the designer.</strong> If you use a resale certificate to purchase items for personal use, or for items your firm will consume rather than resell (office equipment, supplies, anything you're not passing through to a client), you are liable for use tax on those purchases. During a vendor audit, an auditor who sees a suspicious pattern—a design firm that used a resale certificate for, say, a rug sample kit—may flag the buyer for a separate desk audit or investigation. Many states impose steep penalties for certificate misuse: Florida, California, and Texas, among others, can assess fines per instance, and intentional fraud can rise to criminal misdemeanor territory.
          </p>
          <p>
            <strong>Invalid certificates can come back to you.</strong> If a vendor is assessed for uncollected sales tax because your certificate was invalid—expired, revoked state tax ID, mismatched business name—they often have the legal right to back-bill you for the tax they had to pay the state. A certificate that seemed close enough is not close enough.
          </p>
          <p>
            When your certificates are clean, current, and precisely completed, you're not just protecting your own tax-exempt status—you're making yourself a lower-risk vendor partner. That matters for account maintenance, credit terms, and the quality of the relationship with your rep over time.
          </p>
        </Prose>

        <H2 id="credenza">How Credenza streamlines resale certificates</H2>
        <Prose>
          <p>
            Credenza was built specifically to remove this bottleneck from the trade application process—and we do so for any vendor you source from, not just those in the Credenza network.
          </p>
          <p>
            When you create a Credenza profile, you enter your information once: your legal business name, your state of registration, your tax ID, your business details. From that single verified profile, Credenza generates compliant resale certificates for any of the 46 sales-tax states—instantly, completely pre-filled with your information.
          </p>
          <p>
            The certificate engine follows the same priority logic an experienced tax attorney would apply: for states that accept multi-state forms, it generates an MTC or SST certificate where appropriate. For states requiring their own official forms, it generates those. For states that issue certificates to you directly, it tells you exactly where to retrieve yours and what to expect. And beyond the standard form logic, it's built around the edge cases—the state-specific rules, the per-vendor exceptions, the nuances that most designers never encounter until a cert gets rejected. You're never guessing which form to use, and you're covered for the scenarios most compliance tools miss.
          </p>
          <p>
            Need to generate a certificate for a vendor you've worked with for years, outside of Credenza entirely? You can do that too. If it's one of the 1,500+ vendors in our to-the-trade directory, your certificate generates instantly with the vendor's information pre-filled alongside yours. For any vendor not in the directory, just fill in their info and generate a clean, compliant cert in seconds and submit it yourself.
          </p>
          <p>
            When vendors join the Credenza network, your certificates will arrive pre-attached to every application. No emailing them under separate cover. No clunky tax tool wizards. The application arrives complete. Once approved, tax exemption gets applied in the vendor's system automatically, so you can shop tax-free at trade pricing fast.
          </p>
          <p>
            Credenza also tracks expirations and sends renewal reminders—so what you set up once doesn't quietly lapse when you're focused on a project. We'll even pre-fill your renewal so all you have to do is sign.
          </p>
          <p>
            <strong>Credenza is free for designers.</strong> The vendors pay for the compliance infrastructure; you benefit from it.
          </p>
        </Prose>

        <div className="my-10">
          <CTAButton href={CTA_HREF} label="Create your Credenza profile & generate certificates today" />
        </div>

        <H2 id="faq">Frequently asked questions</H2>
        <div className="border-t border-sage-dark mb-10">
          {FAQ_ITEMS.map((item) => (
            <FAQItem key={item.q} q={item.q} a={item.a} />
          ))}
        </div>

        <H2 id="summary">In summary</H2>
        <Prose>
          <p>Resale certificates aren't glamorous, but they're load-bearing infrastructure for a professional design practice. The short version:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong>Register in your home state</strong> to get your sales tax ID—the prerequisite for everything else</li>
            <li><strong>Know which states require certs</strong> based on where goods are shipping or being picked up, and where your vendors have nexus</li>
            <li><strong>Use the right form</strong> for each state: MTC or SST where accepted, state-specific forms where required, state-issued certificates where mandated</li>
            <li><strong>Keep certificates current</strong> and track renewal dates—lapsed certificates create exposure for you and your vendor partners</li>
            <li><strong>Monitor your nexus</strong> as your practice grows across state lines, and register before you need to generate certificates</li>
          </ul>
          <p>
            Credenza exists specifically to take this off your plate. One profile, compliant certificates for all 46 sales-tax states, for any vendor you work with—automatically submitted to every vendor you apply to in the Credenza network, and available on demand for everyone else. It's free for designers.
          </p>
        </Prose>

        <div className="my-10">
          <CTAButton href={CTA_HREF} label="Get Started — Free for Designers" />
        </div>

        <div className="mt-16 pt-10 border-t border-sage-dark">
          <h3
            className="font-freight text-charcoal mb-4"
            style={{ fontSize: "1.05rem", letterSpacing: "0.06em", textTransform: "uppercase" }}
          >
            Related resources
          </h3>
          <ul className="space-y-2" style={{ fontFamily: "Inter, sans-serif", fontSize: "0.95rem", lineHeight: 1.7 }}>
            <li><a href="/about" className="text-charcoal hover:text-olive-mid underline">About Credenza</a></li>
            <li><a href="/for-designers" className="text-charcoal hover:text-olive-mid underline">Credenza for Designers</a></li>
            <li>
              <a
                href="https://www.mtc.gov/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-charcoal hover:text-olive-mid underline"
              >
                Multistate Tax Commission
              </a>
            </li>
            <li>
              <a
                href="https://www.streamlinedsalestax.org/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-charcoal hover:text-olive-mid underline"
              >
                Streamlined Sales Tax Governing Board
              </a>
            </li>
          </ul>
        </div>
          </main>
          <aside className="hidden lg:block">
            <div className="sticky top-24">
              <TableOfContents />
            </div>
          </aside>
        </div>
      </div>
      <Footer />
    </div>
  );
}

function Prose({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="text-charcoal-mid space-y-5 mb-10"
      style={{ fontFamily: "Inter, sans-serif", fontSize: "1rem", lineHeight: 1.75 }}
    >
      {children}
    </div>
  );
}

function H2({ id, children }: { id?: string; children: React.ReactNode }) {
  return (
    <h2
      id={id}
      className="font-freight text-charcoal mt-16 mb-6"
      style={{ fontSize: "clamp(1.5rem, 2.6vw, 1.85rem)", letterSpacing: "-0.02em", lineHeight: 1.2, scrollMarginTop: "100px" }}
    >
      {children}
    </h2>
  );
}

function TableOfContents() {
  return (
    <nav aria-label="Table of contents">
      <h4
        className="text-charcoal-soft mb-4"
        style={{ fontFamily: "Inter, sans-serif", fontSize: "0.65rem", letterSpacing: "0.12em", textTransform: "uppercase", fontWeight: 600 }}
      >
        On this page
      </h4>
      <ul className="space-y-2 border-l border-sage-dark">
        {TOC.map((item) => (
          <li key={item.id}>
            <a
              href={`#${item.id}`}
              className="block pl-4 -ml-px border-l border-transparent hover:border-olive-mid hover:text-charcoal transition-colors duration-150 text-charcoal-soft"
              style={{ fontFamily: "Inter, sans-serif", fontSize: "0.85rem", lineHeight: 1.5 }}
            >
              {item.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}

function H3({ children }: { children: React.ReactNode }) {
  return (
    <h3
      className="mt-10 mb-4"
      style={{
        fontFamily: "Inter, sans-serif",
        fontWeight: 600,
        fontSize: "0.78rem",
        letterSpacing: "0.12em",
        textTransform: "uppercase",
        lineHeight: 1.4,
        color: "#21353f",
      }}
    >
      {children}
    </h3>
  );
}

function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-sage-dark">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        className="w-full flex items-start justify-between gap-6 py-5 text-left cursor-pointer bg-transparent"
      >
        <h3 className="font-freight text-charcoal" style={{ fontSize: "1.1rem", letterSpacing: "-0.015em", lineHeight: 1.3 }}>
          {q}
        </h3>
        <div className={`shrink-0 mt-1 text-charcoal-soft transition-transform duration-200 ${open ? "rotate-45" : ""}`}>
          <Plus size={20} />
        </div>
      </button>
      {open && (
        <p
          className="pb-5 pr-10 text-charcoal-mid"
          style={{ fontFamily: "Inter, sans-serif", fontSize: "0.95rem", lineHeight: 1.75 }}
        >
          {a}
        </p>
      )}
    </div>
  );
}

function InlineHook({ label }: { label: string }) {
  return (
    <div className="my-8">
      <a
        href={CTA_HREF}
        className="inline-flex items-baseline gap-1.5 text-olive-mid hover:text-charcoal transition-colors no-underline"
        style={{ fontFamily: "Inter, sans-serif", fontSize: "0.95rem", lineHeight: 1.6 }}
      >
        <span className="underline decoration-olive-mid/40 underline-offset-4 hover:decoration-current">
          {label}
        </span>
        <span aria-hidden="true">→</span>
      </a>
    </div>
  );
}

function CTAButton({ href, label }: { href: string; label: string }) {
  return (
    <a
      href={href}
      className="no-underline block text-center py-3.5 px-6 transition-all duration-200 bg-teal hover:bg-[#99b8bd] text-forest rounded-none"
      style={{
        fontFamily: "Inter, sans-serif",
        fontSize: "0.78rem",
        fontWeight: 400,
        letterSpacing: "0.1em",
        textTransform: "uppercase",
        outline: "0.5px solid #99b8bd",
        outlineOffset: "2px",
      }}
    >
      {label}
    </a>
  );
}
