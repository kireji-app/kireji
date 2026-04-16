const {
 order: { by, descending },
 priority,
 status
} = kirejiIssueFilters.model

const key = by === "date" ? "key" : by

return ISSUES
 .filter(issue => status[issue.status] && priority[issue.priority.toLowerCase()])
 .sort(({ [key]: a }, { [key]: b }) => {

  // Logic: Handle the 'key' (timestamp) as a number
  if (by === 'date') {
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