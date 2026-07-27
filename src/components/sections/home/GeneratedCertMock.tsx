/**
 * The generated-certificate preview, shown as a real screenshot of the product's
 * Resale Certificate Engine (public/cert-preview.png): the MTC certificate filled
 * from verified data, in the PDF viewer, with the review-and-sign footer.
 */
export function GeneratedCertMock() {
  return (
    <div
      className="bg-white pointer-events-none select-none overflow-hidden"
      style={{ border: "1px solid #e0dcd4", boxShadow: "0 12px 48px rgba(0,0,0,0.10), 0 2px 8px rgba(0,0,0,0.05)" }}
    >
      <img
        src="/cert-preview.png"
        alt="Credenza resale certificate preview — the filled MTC certificate, ready to review and sign"
        className="block w-full h-auto"
      />
    </div>
  );
}
