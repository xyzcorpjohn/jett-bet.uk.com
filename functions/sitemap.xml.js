export async function onRequest() {
  const base = "https://jett-bet.uk.com"; // <-- поставь свой реальный домен
  const today = new Date().toISOString().slice(0, 10);

  // страницы БЕЗ .html (канонические URL)
  const paths = [
    "/"
  ];

  const urls = paths.map((p) => {
    const loc = `${base}${p === "/" ? "" : p}`;
    return `
  <url>
    <loc>${escapeXml(loc)}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>daily</changefreq>
    <priority>${p === "/" ? "1.0" : "0.5"}</priority>
  </url>`;
  }).join("");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urls}
</urlset>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml; charset=UTF-8",
      "Cache-Control": "no-store, no-cache, must-revalidate, max-age=0",
      "Pragma": "no-cache",
      "Expires": "0",
    },
  });
}

function escapeXml(str) {
  return str
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&apos;");
}
