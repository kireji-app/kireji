client.promise.then(() => {

 document.addEventListener('pointerdown', pointerEvent => {
  const key = kirejiIssueFilters.dropdown.model
  if (key !== "none" && !inRect(pointerEvent, Q("#issue-filter-dropdown").getBoundingClientRect())) {

   if (inRect(pointerEvent, Q("#issue-tracker_kireji_app .issue-table").getBoundingClientRect()) || inRect(pointerEvent, Q(`#issue-tracker_kireji_app .header>.issue-filter-${key}`).getBoundingClientRect())) {
    pointerEvent.stopPropagation()
    pointerEvent.preventDefault()
   }

   kirejiIssueFilters.dropdown.setModel("none")
  }
 }, { capture: true })
})