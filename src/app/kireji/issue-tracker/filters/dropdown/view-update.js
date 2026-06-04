Q("#issue-filter-dropdown")?.remove()

if (KirejiIssueFiltersDropdown.model === "none")
 return

Q(".issue-row.header").appendChild((() => {
 const offscreen = document.createElement("div")
 offscreen.innerHTML = KirejiIssueFiltersDropdown["part.html"]
 return offscreen.querySelector("#issue-filter-dropdown")
})())