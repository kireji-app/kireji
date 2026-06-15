const {
 order: { by, descending },
 priority,
 status
} = KirejiIssueFilters.model

const key = by === "date" ? "key" : by

return ISSUES
 .filter(issue => status[issue.status] && priority[issue.priority.toLowerCase()])
 .sort(({ [key]: a }, { [key]: b }) => {

  /** @type {IMix<IKirejiIssueFilters, IBoolean<IPartAny>>} */
  const filterPart = KirejiIssueFilters[by]

  if (Array.isArray(filterPart?.manifest.order)) {
   // If there is a custom order defined, just use that.
   a = filterPart.manifest.order.indexOf(a)
   b = filterPart.manifest.order.indexOf(b)
  } else if (by === 'date') {
   a = parseInt(a, 10)
   b = parseInt(b, 10)
  } else if (by === "title") {
   a = a.toLowerCase()
   b = b.toLowerCase()
  }

  if (a < b)
   return descending ? 1 : -1

  if (a > b)
   return descending ? -1 : 1

  return 0
 })