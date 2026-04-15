return `
 <url>
  <loc>${kirejiIssue.canonicalURL}</loc>
  <lastmod>${new Date((kirejiIssue.editTimestamp ?? kirejiIssue.key) * 1000).toISOString()}</lastmod>
  <changefreq>monthly</changefreq>
  <priority>0.8</priority>
 </url>`