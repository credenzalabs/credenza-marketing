import { useReveal } from "@/hooks/useReveal";
import { PhotoCredit } from "@/components/ui/PhotoCredit";
import { withCredenzaUtm } from "@/utils/utm";

/**
 * Customer testimonial — the site's first piece of named vendor proof.
 *
 * PUBLISHED. Sister Parish approved the quote, name and title for publication
 * (2026-08-09); it renders on Home and on /resale-certificate-management.
 * Approval covers this wording — see the verbatim note below.
 *
 * Deliberately NOT marked up as schema.org Review. Google's review-snippet
 * policy excludes reviews a business publishes about itself, so Review markup
 * here would be ineligible for rich results at best and a policy problem at
 * worst. The quote earns its visibility as visible, attributed page text —
 * which is also what answer engines read.
 *
 * Two-column by design: the photograph keeps its full palette (a scrim heavy
 * enough to carry light type over this pale image flattens it), and a
 * 450-character quote gets a column narrow enough to read comfortably.
 *
 * Quoted verbatim. Do not trim or reword without Susan Crater's sign-off.
 */

const QUOTE =
  "As CEO of a textile company, one of my ongoing frustrations is overseeing the backlog of uploading designer resale numbers and verifying trade accounts. It is time-consuming, confusing, and a veritable nightmare! Issues like duplicate accounts, designers who can't supply the correct info . . . the list goes on and on and is a real hindrance to our order flow. Credenza is an answer to our dreams and will save real time and money for us and, most importantly, increase our orders!";

const ATTRIBUTION = {
  name: "Susan Crater",
  title: "Founder & CEO",
  company: "Sister Parish Design",
};

const IMAGE = {
  src: "/caitlin-kah-credenza.jpg",
  alt: "Interior by Caitlin Kah",
  credits: [
    { text: "© " },
    { text: "Abigail Mair", href: withCredenzaUtm("https://www.abigailmairphotography.com/", "photo-credit", "home-testimonial") },
    { text: " (design by " },
    { text: "Caitlin Kah", href: withCredenzaUtm("https://www.caitlinkah.com/", "designer-credit", "home-testimonial") },
    { text: ")" },
  ],
};

export function TestimonialSection() {
  const ref = useReveal();

  return (
    <section ref={ref} className="reveal bg-white">
      <div className="grid grid-cols-1 lg:grid-cols-2 items-stretch">
        <div className="relative overflow-hidden aspect-[4/5] lg:aspect-auto lg:min-h-[560px]">
          <img
            src={IMAGE.src}
            alt={IMAGE.alt}
            loading="lazy"
            className="absolute inset-0 w-full h-full object-cover"
            style={{ objectPosition: "center 55%" }}
          />
          <PhotoCredit separator="" credits={IMAGE.credits} />
        </div>

        <figure className="m-0 flex flex-col justify-center px-6 py-16 md:px-14 lg:px-16 xl:px-20">
          <blockquote
            className="font-freight text-charcoal m-0"
            style={{ fontSize: "clamp(1.2rem, 1.55vw, 1.5rem)", lineHeight: 1.5, letterSpacing: "-0.02em" }}
          >
            &ldquo;{QUOTE}&rdquo;
          </blockquote>

          <figcaption className="mt-10">
            <div className="w-10 h-px bg-sage-dark mb-7" />
            {/* The wordmark carries the brand, so the lines below name only the
                person — repeating "Sister Parish Design" would be redundant.
                The company still reaches assistants via the alt text. */}
            <img
              src="/logo-sister-parish.png"
              alt={ATTRIBUTION.company}
              loading="lazy"
              width={1782}
              height={239}
              className="h-auto"
              style={{ width: "168px" }}
            />
            <div
              className="text-charcoal mt-5"
              style={{ fontFamily: "Inter, sans-serif", fontSize: "0.85rem", fontWeight: 600, letterSpacing: "0.01em" }}
            >
              {ATTRIBUTION.name}
            </div>
            <div
              className="text-charcoal-soft mt-1"
              style={{ fontFamily: "Inter, sans-serif", fontSize: "0.8rem", lineHeight: 1.6 }}
            >
              {ATTRIBUTION.title}
            </div>
          </figcaption>
        </figure>
      </div>
    </section>
  );
}
