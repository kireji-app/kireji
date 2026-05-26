const scriptCharCount = new TextEncoder().encode(_["build.js"]).length
const sizeInMB = scriptCharCount / 10 ** 6
const sizeInKB = scriptCharCount / 10 ** 3
const maxSizeInMB = 5
const appNames = Object.keys(_.applications)
const longestHost = appNames.reduce((a, b) => (a.length >= b.length ? a : b))
const worstCaseURL = `https://${longestHost}/${_.version}/${encodeSegment(_.cardinality - 1n)}/`
const maxURLLength = 2000
const stateSizeInBits = toBits(_.cardinality - 1n, false)
const stateSizeInCharms = toCharms(_.cardinality - 1n, false)

return /* html */`
<h1>Demo Ecosystem</h1>
${_.parts.core.update["part.html"]}
<hr>
<span>Installed Apps: ${appNames.length}</span>
<br>
<span>JS Usage: ${Math.round(sizeInMB / maxSizeInMB * 100)}% (${Math.round(sizeInMB * 100) / 100} MB / ${maxSizeInMB} MB)</span>
<br>
<span>URL Usage: ${Math.round(worstCaseURL.length / maxURLLength * 100)}%  (${worstCaseURL.length} ch / ${maxURLLength} ch)</span>`