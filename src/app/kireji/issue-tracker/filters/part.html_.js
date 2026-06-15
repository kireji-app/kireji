const filterIcon = key => `<svg ${KirejiIssueFilters.pointAttr()} viewBox="0 0 24 24" class="issue-filter-${key}"><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"></polygon></svg>`
const { by, descending } = KirejiIssueFilters.order.model

return (
 `<div id=command-palette ${KirejiIssueCommandPalette.pointAttr()}>` + (
  "<span class=field>" + (
   "<span class=input>ex</span>" +
   "<span class=completion>ample</span>" +
   "<span class=placeholder>Show/hide issues by keyword</span>"
  ) + "</span>" +
  "<ul class=autocomplete>" + (
   "<li><span class=match>ex</span>ample</li>" +
   "<li><span class=match>ex</span>otic</li>"
  ) + "</ul>" +
  "<ul class=dropdown>" + (
   '<li class=selected>Show only issues containing "<span class=match>ex</span>"</li>' +
   '<li>Unhide issues containing "<span class=match>ex</span>"</li>' +
   '<li>Hide issues containing "<span class=match>ex</span>"</li>' +
   '<li>Hide issues not containing "<span class=match>ex</span>"</li>' +
   '<li>Show only issues not containing "<span class=match>ex</span>"</li>'
  ) + "</ul>"
 ) + "</div>" +
 `<section class="issue-row header ${descending ? "descending" : "ascending"}">` + (
  `<span ${KirejiIssueFilters.pointAttr()} class="issue-title"${by === "title" ? " data-order" : ""}>Issue</span>` +
  `<span ${KirejiIssueFilters.pointAttr()} class="issue-priority"${by === "priority" ? " data-order" : ""} title="Priority">!</span>${filterIcon("priority")}` +
  `<span ${KirejiIssueFilters.pointAttr()} class="issue-status"${by === "status" ? " data-order" : ""}>Status</span>${filterIcon("status")}` +
  `<span ${KirejiIssueFilters.pointAttr()} class="issue-date"${by === "date" ? " data-order" : ""}>Created</span>`
 ) + "</section>"
)