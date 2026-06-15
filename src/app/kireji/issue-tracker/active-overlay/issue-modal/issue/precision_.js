// A simple heuristic that reserves scroller precision for issue modals known to have more content.

const controlLines = BigInt(7)
const affectsLines = BigInt(thisKirejiIssue.affects.length)
const linksLines = BigInt(thisKirejiIssue.links.length)
const descriptionLength = BigInt((thisKirejiIssue["description_.js"] ?? thisKirejiIssue["description"]).length)
const precisionPerLine = 8n
const minPrecision = 8n
const maxPrecision = 12_000n
const estimatedCharCountPerLine = 30n
const estimatedDescriptionLines = descriptionLength / estimatedCharCountPerLine
const estimatedTotalLines = controlLines + affectsLines + linksLines + estimatedDescriptionLines
const estimatedTotalPrecision = precisionPerLine * estimatedTotalLines

return KMath.clamp(estimatedTotalPrecision, minPrecision, maxPrecision)