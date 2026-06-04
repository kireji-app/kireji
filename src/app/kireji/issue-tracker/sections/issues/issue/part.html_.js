const linkedIssues = thisKirejiIssue.links.map(linked => linked["card.html"]).join("")
return (
 `<h1>${thisKirejiIssue.title}</h1>` +
 `<button ${thisKirejiIssue.pointAttr("close")} class=exit-button>✕</button>` +
 `<p class=issue-description data-priority="${thisKirejiIssue.priority}" data-status="${thisKirejiIssue.status}">` + (
  `<b>Created:</b> <span class="issue-date">${thisKirejiIssue.key}</span>\n\n` +
  `<b>Priority:</b> <span class="issue-priority">${thisKirejiIssue.priority}</span>\n\n` +
  `<b>Status:</b> <span class="issue-status">${thisKirejiIssue.status}</span>\n\n` +
  `<b>Description:</b>\n${thisKirejiIssue.description}\n\n` +
  `<b>Affected Parts:</b>\n<span class="issue-affects">${thisKirejiIssue.affects.map(affected => affected === _ ? _.name : affected.host).join(", ") || "None"}</span>\n\n` +
  `<b>Linked Issues:</b>${linkedIssues ? `\n<span class="issue-links">${linkedIssues}</span>` : " None"}`
 ) + "</p>"
)