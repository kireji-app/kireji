Q("#issue-filter-dropdown")?.remove()

if (kirejiIssueFiltersDropdown.model === "none")
 return

Q(".issue-row.header").appendChild((() => {
 const offscreen = document.createElement("div")
 offscreen.innerHTML = kirejiIssueFiltersDropdown["part.html"]
 return offscreen.querySelector("#issue-filter-dropdown")
})())