pointer.handle({
 click() {
  if (TARGET_ELEMENT.hasAttribute("data-order")) {
   kirejiIssueFilters.order.descending.toggle()
   return
  }

  const className = TARGET_ELEMENT.classList.values().find(className => className.startsWith("issue-"))

  if (!className)
   throw "Unexpected item passed to issue filter's pointer handler."

  const key = className.split("-").pop()

  if (className.includes("filter")) {
   if (kirejiIssueFilters.dropdown.model === key)
    kirejiIssueFilters.dropdown.setModel("none")
   else
    kirejiIssueFilters.dropdown.setModel(key)
  } else {
   kirejiIssueFilters.order.descending.clear()
   kirejiIssueFilters.order.by.setModel(key)
  }
 },
 TARGET_ELEMENT,
 POINTER_EVENT
})