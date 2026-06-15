return (
 `<a ${_.pointAttr()} href=${thisKirejiIssue.canonicalURL} class="issue-row" data-id="${thisKirejiIssue.key}" data-priority="${thisKirejiIssue.priority}" data-status="${thisKirejiIssue.status}">` + (
  `<span class="issue-title">${thisKirejiIssue.title}</span>` +
  `<span class="issue-priority">${thisKirejiIssue.priority}</span>` +
  `<span class="issue-status">${thisKirejiIssue.status}</span>` +
  `<span class="issue-date">${thisKirejiIssue.niceDate(thisKirejiIssue.key)}</span>`
 ) + "</a>"
)