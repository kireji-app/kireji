const scriptByteCount = new TextEncoder().encode(_["build.js"]).length
const sizeInMB = scriptByteCount / 10 ** 6
const sizeInKB = scriptByteCount / 10 ** 3
const maxSizeInMB = 5
const maxSizeInKB = maxSizeInMB * 10 ** 3

const appNames = _.publicHosts.split(" ")
const longestHost = appNames.reduce((a, b) => (a.length >= b.length ? a : b))
const worstCaseURL = `https://${longestHost}/${_.version}/${RID.toHash(_.cardinality - 1n)}/`
const maxURLLength = 2000

const swPct = Math.round(sizeInMB / maxSizeInMB * 100)
const urlPct = Math.round(worstCaseURL.length / maxURLLength * 100)

function meterColor(pct) {
 if (pct >= 85) return "var(--accent-dark-er)"   // danger — deep red-adjacent
 if (pct >= 65) return "var(--accent-un-dark)"    // warning — muted
 return "var(--accent-un)"                        // nominal
}

function meterBox(label, pct, reading, sub) {
 return `<div class="meter-box">
  <div class="meter-label">${label}</div>
  <div class="meter-reading">${reading}</div>
  <div class="meter-track">
    <div class="meter-fill" style="width:${pct}%;background:${meterColor(pct)}"></div>
  </div>
  <div class="meter-subline">${sub}</div>
</div>`
}

return /* html */`
<div class="meters">
  ${meterBox(
 "Service Worker",
 swPct,
 `${swPct}% <span>of ${maxSizeInMB} MB</span>`,
 `<span>${(Math.round(sizeInMB * 100) / 100).toFixed(2)} MB used</span><span>${(Math.round((maxSizeInMB - sizeInMB) * 100) / 100).toFixed(2)} MB free</span>`
)}
  ${meterBox(
 "URL Space",
 urlPct,
 `${urlPct}% <span>of ${maxURLLength} ch</span>`,
 `<span>${worstCaseURL.length} ch used</span><span>${maxURLLength - worstCaseURL.length} ch free</span>`
)}
</div>
${Update["part.html"]}
<span>Installed Apps: ${appNames.length}</span>`