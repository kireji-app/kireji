Pointer.handle({
 click() {
  if (TARGET_ELEMENT.hasAttribute("data-order")) {
   KirejiIssueFilters.order.descending.toggle()
   return
  }

  const className = TARGET_ELEMENT.classList.values().find(className => className.startsWith("issue-"))

  if (!className)
   throw error("Unexpected item passed to issue filter's pointer handler.")

  const key = className.split("-").pop()

  if (className.includes("filter")) {
   if (KirejiIssueFilters.dropdown.model === key)
    KirejiIssueFilters.dropdown.setModel("none")
   else
    KirejiIssueFilters.dropdown.setModel(key)
  } else {
   KirejiIssueFilters.order.descending.clear()
   KirejiIssueFilters.order.by.setModel(key)
  }
 },
 TARGET_ELEMENT,
 POINTER_EVENT
})