const filterIcon = key => `<svg ${kirejiIssueFilters.pointAttr()} viewBox="0 0 24 24" class="issue-filter-${key}"><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"></polygon></svg>`
const { by, descending } = kirejiIssueFilters.order.model
const dropdown = kirejiIssueFilters.dropdown.model

return (
 `<section class="issue-row header ${descending ? "descending" : "ascending"}">` + (
  `<span ${kirejiIssueFilters.pointAttr()} class="issue-title"${by === "title" ? " data-order" : ""}>Issue</span>` +
  `<span ${kirejiIssueFilters.pointAttr()} class="issue-priority"${by === "priority" ? " data-order" : ""} title="Priority">!</span>${filterIcon("priority")}` +
  `<span ${kirejiIssueFilters.pointAttr()} class="issue-status"${by === "status" ? " data-order" : ""}>Status</span>${filterIcon("status")}` +
  `<span ${kirejiIssueFilters.pointAttr()} class="issue-date"${by === "date" ? " data-order" : ""}>Created</span>` +
  kirejiIssueFilters.dropdown["part.html"]
 ) + "</section>"
)