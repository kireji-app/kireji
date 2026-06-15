Q(".issue-row.header").appendChild((() => {
 const offscreen = document.createElement("div")
 offscreen.innerHTML = thisKirejiFilterDropdown["part.html"]
 return offscreen.querySelector("#issue-filter-dropdown")
})())