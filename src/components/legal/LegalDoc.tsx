import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

/**
 * Renders a Credenza legal document (Vendor Agreement, DPA, EULA) from its
 * source markdown. The markdown under src/content/legal/ is copied verbatim
 * from the cert-tool repo's docs/legal/ — the same text vendors accept in the
 * in-app terms gate — so the public page and the accepted document stay
 * byte-identical. (The sibling Privacy/Terms pages are hand-authored JSX; these
 * are markdown-rendered specifically to preserve that source-of-truth match.)
 */

const docs = import.meta.glob("../../content/legal/*.md", {
  query: "?raw",
  import: "default",
  eager: true,
}) as Record<string, string>;

/**
 * Normalize the placeholder/source markdown for clean rendering and drop the
 * document's own title line (the page wrapper supplies the <h1>):
 *   - strip the leading title line + blank lines
 *   - leading tabs/spaces used for cosmetic indentation → removed
 *   - `•` glyph bullets → markdown list items
 *   - numbered section headers (`1\. Foo` / `**1\. Foo**`) → `## 1. Foo`
 *   - unescape `\.`
 * Only whitespace/markup is touched — never the legal wording.
 */
function normalize(raw: string): string {
  const lines = raw.split("\n");
  // Drop leading blanks, then the first non-empty line (the doc title).
  let i = 0;
  while (i < lines.length && lines[i].trim() === "") i++;
  if (i < lines.length) i++; // skip title line
  return lines
    .slice(i)
    .map((line) => {
      const s = line.replace(/^[\t ]+/, "");
      if (/^•\s*/.test(s)) return `- ${s.replace(/^•\s*/, "").replace(/\\\./g, ".")}`;
      const header = s.match(/^\*{0,2}(\d+)\\?\.\s+(.+?)\*{0,2}$/);
      if (header) return `## ${header[1]}. ${header[2].replace(/\\\./g, ".")}`;
      return s.replace(/\\\./g, ".");
    })
    .join("\n");
}

function load(slug: string): string {
  const entry = Object.entries(docs).find(([path]) => path.endsWith(`/${slug}.md`));
  return entry ? normalize(entry[1]) : "";
}

const COMPONENTS = {
  h1: ({ children }: { children?: React.ReactNode }) => (
    <h1 className="font-freight mt-10 mb-4 text-charcoal" style={{ fontSize: "1.6rem", letterSpacing: "-0.01em" }}>{children}</h1>
  ),
  h2: ({ children }: { children?: React.ReactNode }) => (
    <h2 className="font-freight mt-8 mb-3 text-charcoal" style={{ fontSize: "1.15rem" }}>{children}</h2>
  ),
  h3: ({ children }: { children?: React.ReactNode }) => (
    <h3 className="font-freight mt-6 mb-2 text-charcoal" style={{ fontSize: "1rem" }}>{children}</h3>
  ),
  p: ({ children }: { children?: React.ReactNode }) => <p className="mb-4">{children}</p>,
  ul: ({ children }: { children?: React.ReactNode }) => <ul className="mb-4 pl-5 list-disc">{children}</ul>,
  ol: ({ children }: { children?: React.ReactNode }) => <ol className="mb-4 pl-5 list-decimal">{children}</ol>,
  li: ({ children }: { children?: React.ReactNode }) => <li className="mb-2">{children}</li>,
  strong: ({ children }: { children?: React.ReactNode }) => <strong className="text-charcoal" style={{ fontWeight: 600 }}>{children}</strong>,
  a: ({ href, children }: { href?: string; children?: React.ReactNode }) => (
    <a href={href} className="underline text-charcoal hover:text-charcoal-mid" target="_blank" rel="noopener noreferrer">{children}</a>
  ),
  table: ({ children }: { children?: React.ReactNode }) => (
    <div className="overflow-x-auto mb-4"><table className="w-full border-collapse" style={{ fontSize: "0.8rem" }}>{children}</table></div>
  ),
  th: ({ children }: { children?: React.ReactNode }) => <th className="text-left p-2 border-b border-charcoal-soft/30" style={{ fontWeight: 600 }}>{children}</th>,
  td: ({ children }: { children?: React.ReactNode }) => <td className="p-2 align-top border-b border-charcoal-soft/15">{children}</td>,
};

export function LegalDoc({ slug }: { slug: string }) {
  return (
    <div className="text-charcoal-mid" style={{ fontFamily: "Inter, sans-serif", fontSize: "0.9rem", lineHeight: 1.8 }}>
      <ReactMarkdown remarkPlugins={[remarkGfm]} components={COMPONENTS}>
        {load(slug)}
      </ReactMarkdown>
    </div>
  );
}
