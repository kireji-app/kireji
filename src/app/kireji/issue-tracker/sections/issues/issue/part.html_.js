return (
 `<h1>${kirejiIssue.title}</h1>` +
 `<button ${kirejiIssue.pointAttr("close")} class=exit-button>✕</button>` +
 `<p class=issue-description data-priority="${kirejiIssue.priority}" data-status="${kirejiIssue.status}">` + (
  `<b>Created:</b> <span class="issue-date">${kirejiIssue.key}</span>\n\n` +
  `<b>Priority:</b> <span class="issue-priority">${kirejiIssue.priority}</span>\n\n` +
  `<b>Status:</b> <span class="issue-status">${kirejiIssue.status}</span>\n\n` +
  `<b>Description:</b>\n${kirejiIssue.description}\n\n` +
  `<b>Affected Parts:</b>\n<span class="issue-affects">${kirejiIssue.affects.map(affected => affected.host).join(", ") || "None"}</span>\n\n` +
  `<b>Linked Issues:</b>\n<span class="issue-links">${kirejiIssue.links.map(linked => linked["card.html"]).join("<br>") || "None"}</span>`
 ) + "</p>"
)