return `
 <url>
  <loc>https://${kirejiIssueSummary.canonicalURL}/</loc>
  <lastmod>${new Date(kirejiIssues.subparts[kirejiIssues.length - 1].key * 1000).toISOString()}</lastmod>
  <changefreq>weekly</changefreq>
  <priority>1.0</priority>
 </url>`