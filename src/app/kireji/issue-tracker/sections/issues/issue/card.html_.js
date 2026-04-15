return (
 `<a ${_.pointAttr()} href=${kirejiIssue.canonicalURL} class="issue-row" data-id="${kirejiIssue.key}" data-priority="${kirejiIssue.priority}" data-status="${kirejiIssue.status}">` + (
  // `<span class="issue-id">${issue.key}</span>` +
  `<span class="issue-title">${kirejiIssue.title}</span>` +
  `<span class="issue-priority">${kirejiIssue.priority}</span>` +
  `<span class="issue-status">${kirejiIssue.status}</span>`
 ) + "</a>"
)