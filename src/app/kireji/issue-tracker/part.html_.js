return kirejiIssueFilters["part.html"] + (
 // TODO: use filters here
 "<section class=issue-table>" + kirejiIssueTracker.scroller.wrap(kirejiIssueSections.issues.map(issue => issue["card.html"]).join("\n  ")) + "</section>" +
 `<section id=kireji-issue-modal>${kirejiIssueSections.arm["part.html"] ?? ""}</section>`
)