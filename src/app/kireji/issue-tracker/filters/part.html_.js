const filterIcon = key => `<svg ${KirejiIssueFilters.pointAttr()} viewBox="0 0 24 24" class="issue-filter-${key}"><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"></polygon></svg>`
const { by, descending } = KirejiIssueFilters.order.model
const dropdown = KirejiIssueFilters.dropdown.model

return (
 `<section class="issue-row header ${descending ? "descending" : "ascending"}">` + (
  `<span ${KirejiIssueFilters.pointAttr()} class="issue-title"${by === "title" ? " data-order" : ""}>Issue</span>` +
  `<span ${KirejiIssueFilters.pointAttr()} class="issue-priority"${by === "priority" ? " data-order" : ""} title="Priority">!</span>${filterIcon("priority")}` +
  `<span ${KirejiIssueFilters.pointAttr()} class="issue-status"${by === "status" ? " data-order" : ""}>Status</span>${filterIcon("status")}` +
  `<span ${KirejiIssueFilters.pointAttr()} class="issue-date"${by === "date" ? " data-order" : ""}>Created</span>` +
  KirejiIssueFilters.dropdown["part.html"]
 ) + "</section>"
)