import { Eyebrow } from "@/components/ui/Eyebrow";
import { useReveal } from "@/hooks/useReveal";
import { useStagger } from "@/hooks/useStagger";

/**
 * Designer testimonials on the vendor page.
 *
 * The Sister Parish quote (TestimonialSection) is a vendor vouching for
 * Credenza. This is the other side of the same transaction: the designers
 * who went through a Credenza-run application, saying what it felt like.
 * For a vendor the argument is revenue, not sentiment—an applicant who is
 * approved the same day is an applicant who orders the same day. The
 * headline names the quotes for what they are; the lede carries the
 * argument, so "Approved in minutes" stays with the Hero, which already
 * owns that phrase.
 *
 * Placed immediately after CertSection so both quotes land as evidence for
 * claims the page has already made: VerificationSection promised same-day
 * decisions, CertSection promised generated certificates.
 *
 * Ivory band: page-white ground with white hairline cards, the same pairing
 * IntegrationsSection uses. A half-step off the white CertSection above,
 * enough to set the quotes apart without another dark block ahead of the
 * forest DataSection below.
 *
 * APPROVAL PENDING. Unlike the Sister Parish quote, neither designer has
 * signed off on publication yet. Confirm name + title + quote with each
 * before this ships.
 *
 * Title and firm sit on one attribution line so both cards carry the same
 * number of caption lines and their hairline rules align.
 *
 * Deliberately NOT marked up as schema.org Review—same reason as
 * TestimonialSection: Google's review-snippet policy excludes reviews a
 * business publishes about itself.
 *
 * Quoted verbatim, with two typographic normalizations only, both in Mary's
 * quote: "--" set as an em dash, and a sentence-initial capital. No wording
 * changed; don't trim or reword without the designer's sign-off.
 */

const QUOTES = [
  {
    quote:
      "It was so nice getting approved that quickly, and being able to put in a sample order the same day I applied for an account—that is almost unheard of! This is so exciting. 10/10 experience!",
    name: "Mary Swayze LeDoux",
    title: "Owner & Interior Designer",
    company: "LeDoux Atelier Interiors",
  },
  {
    quote:
      "I LOVED the auto generation of the resale certificates. That's the only time I've seen that done like that and it saved me some tedious work.",
    name: "Eleanor Hamilton",
    title: "Owner",
    company: "Eleanor Bowen Home Decor",
  },
];

export function DesignerVoicesSection() {
  const ref = useReveal();
  const cardsRef = useStagger(80);

  return (
    <section ref={ref} className="reveal py-14 md:py-20 bg-page-white">
      <div className="container">
        {/* Held narrower than the page container—two quotes read better in a
            column than stretched across the full grid. */}
        <div className="max-w-4xl mx-auto">
          <div className="max-w-2xl mb-10">
            <Eyebrow>In their words</Eyebrow>
            <h2
              className="font-freight text-charcoal"
              style={{ fontSize: "clamp(1.6rem, 2.35vw, 2.3rem)", lineHeight: 1.1, letterSpacing: "-0.02em" }}
            >
              What designers are saying
              <br />
              <span className="italic text-olive-mid">about their experience.</span>
            </h2>
            <p
              className="text-charcoal-mid mt-6"
              style={{ fontFamily: "Inter, sans-serif", fontSize: "0.95rem", lineHeight: 1.75 }}
            >
              The automation that clears your team's queue is what they feel on the other side of it—no paperwork, no delay, an open account while the project is still in front of them.
            </p>
          </div>

          <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {QUOTES.map((item) => (
              <figure
                key={item.name}
                data-stagger
                className="stagger-item m-0 flex flex-col p-6 md:p-7 border border-sage-dark bg-white"
              >
                <blockquote
                  className="font-freight text-charcoal m-0 flex-1"
                  style={{ fontSize: "clamp(1.05rem, 1.25vw, 1.2rem)", lineHeight: 1.55, letterSpacing: "-0.015em" }}
                >
                  &ldquo;{item.quote}&rdquo;
                </blockquote>

                <figcaption className="mt-6">
                  <div className="w-10 h-px bg-sage-dark mb-5" />
                  <div
                    className="text-charcoal"
                    style={{ fontFamily: "Inter, sans-serif", fontSize: "0.85rem", fontWeight: 600, letterSpacing: "0.01em" }}
                  >
                    {item.name}
                  </div>
                  <div
                    className="text-charcoal-soft mt-1"
                    style={{ fontFamily: "Inter, sans-serif", fontSize: "0.8rem", lineHeight: 1.6 }}
                  >
                    {item.company ? `${item.title}, ${item.company}` : item.title}
                  </div>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
