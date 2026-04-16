return kirejiIssueFilters["part.html"] + (
 "<section class=issue-table>" + kirejiIssueTracker.scroller.wrap(kirejiIssueTracker["issues.html"]) + "</section>" +
 `<section id=kireji-issue-modal>${kirejiIssueSections.arm["part.html"] ?? ""}</section>`
)