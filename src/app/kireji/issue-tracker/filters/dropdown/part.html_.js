const key = kirejiIssueFiltersDropdown.model

switch (key) {
 case "none":
  return ""

 case "priority":
 case "status":
  return `<div id=issue-filter-dropdown class="issue-filter-dropdown-${key}">` + kirejiIssueFilters[key].map(boolean => (
   `<span ${boolean.pointAttr()} id="color-control" tabIndex=0 data-state="${boolean.model ? "enabled" : "disabled"}" class="toggle-control ${boolean.key}">` + (
    `<span class="label">${key === "status" ? boolean.key : boolean.key.toUpperCase()}:</span><flex-spacer></flex-spacer>` +
    `<span class="base"><span class="handle"></span></span>`
   ) + "</span>"
  )).join("") + "</div>"
}