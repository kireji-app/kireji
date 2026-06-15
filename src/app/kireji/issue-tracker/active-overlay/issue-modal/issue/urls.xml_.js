return `
 <url>
  <loc>${thisKirejiIssue.canonicalURL}</loc>
  <lastmod>${new Date((thisKirejiIssue.editTimestamp ?? thisKirejiIssue.key) * 1000).toISOString()}</lastmod>
  <changefreq>monthly</changefreq>
  <priority>0.8</priority>
 </url>`