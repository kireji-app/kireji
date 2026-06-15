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
   if (KirejiIssuesActiveOverlay.model === key + "-dropdown")
    KirejiIssuesActiveOverlay.setModel("command-palette")
   else
    KirejiIssuesActiveOverlay.setModel(key + "-dropdown")
  } else {
   KirejiIssueFilters.order.descending.clear()
   KirejiIssueFilters.order.by.setModel(key)
  }
 },
 TARGET_ELEMENT,
 POINTER_EVENT
})