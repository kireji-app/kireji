const scriptCharCount = new TextEncoder().encode(_["build.js"]).length
const sizeInMB = scriptCharCount / 10 ** 6
const sizeInKB = scriptCharCount / 10 ** 3
const maxSizeInMB = 5
const appNames = Object.keys(_.applications)
const longestHost = appNames.reduce((a, b) => (a.length >= b.length ? a : b))
const worstCaseURL = `https://${longestHost}/${_.version}/${encodeSegment(_.cardinality - 1n)}/`
const maxURLLength = 2000
const stateSizeInBits = toBits(_.cardinality - 1n, false)

return /* html */`
<h1>Demo Ecosystem</h1>
${_.parts.core.update["part.html"]}
<ul>
 <li>Apps: ${appNames.length}</li>
 <li>JS Size: ${sizeInMB} MB (${sizeInKB} KB)</li>
 <li>JS Usage: ${sizeInMB / maxSizeInMB * 100}%</li>
 <li>State Size: ${stateSizeInBits} bits (${stateSizeInBits / 8000} KB)</li>
 <li>Worst URL: ${worstCaseURL.length} characters</li>
 <li>URL Usage: ${worstCaseURL.length / maxURLLength * 100}%</li>
</ul>`