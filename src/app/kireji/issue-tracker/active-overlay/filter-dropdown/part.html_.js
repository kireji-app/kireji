return `<div id=issue-filter-dropdown class="issue-filter-${thisKirejiFilterDropdown.key}">` + KirejiIssueFilters[thisKirejiFilterDropdown.key.split("-")[0]].map(boolean => (
 `<span ${boolean.pointAttr()} id="color-control" tabIndex=0 data-state="${boolean.model ? "enabled" : "disabled"}" class="toggle-control ${boolean.key}">` + (
  `<span class="label">${titleCase(boolean.key)}</span><flex-spacer></flex-spacer>` +
  `<span class="base"><span class="handle"></span></span>`
 ) + "</span>"
)).join("") + "</div>"