return KirejiIssueFilters["part.html"] + (
 "<section class=issue-table>" + KirejiIssueTracker.scroller.wrap(KirejiIssueTracker["issues.html"]) + "</section>" +
 `<section id=kireji-issue-modal>${KirejiIssuesSections.arm["part.html"] ?? ""}</section>`
)